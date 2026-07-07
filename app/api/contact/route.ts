import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  buildContactEmail,
  spamCheck,
  validateContact,
  type ContactPayload,
} from "@/lib/contact"
import { getClientIp, limitContact } from "@/lib/rate-limit"
import { contact } from "@/content/contact"

// App Router Route Handler for the contact form.
//
// This code runs ONLY on the server: RESEND_API_KEY is read from the environment
// here and never reaches the browser bundle. Forced onto the Node.js runtime so
// the Resend SDK (which expects Node APIs) works reliably.
export const runtime = "nodejs"
// Never cache — every submission is a fresh side effect.
export const dynamic = "force-dynamic"

// Destination + sender. These aren't secrets, but are env-overridable so they
// can differ per environment without a code change. Defaults match production.
// NOTE: the sending domain (nathanriojas.com) must be verified in Resend, and
// the from-address must belong to it.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "me@nathanriojas.com"
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Nathan Riojas <contact@nathanriojas.com>"

export async function POST(request: Request) {
  // 1. Parse the body defensively — malformed JSON must not throw a 500.
  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json(
      { error: contact.api.invalidBody },
      { status: 400 },
    )
  }

  // 2a. Silent bot check (honeypot + submit timing). If it trips, pretend the
  //     message went through — a real 200 with no email sent — so bots get no
  //     signal to adapt. Logged server-side so real delivery issues stay visible.
  const spam = spamCheck(payload)
  if (spam.spam) {
    console.warn("[contact] dropped likely spam:", spam.reason)
    return NextResponse.json({ ok: true })
  }

  // 2. Server-authoritative validation + sanitization. This is the real guard;
  //    the client mirrors these rules only for a nicer experience. It also
  //    rejects empty submissions and strips control chars / header-injection.
  const result = validateContact(payload)
  if (!result.ok) {
    return NextResponse.json(
      {
        error: contact.api.validationFailed,
        fieldErrors: result.fieldErrors,
      },
      { status: 422 },
    )
  }

  // 2b. Per-IP rate limit (before Resend, so abusive requests never send email).
  //     Conservative: 3 per IP per 10 minutes. Disabled gracefully if Upstash
  //     isn't configured. If the limiter itself errors, fail OPEN rather than
  //     block a legitimate visitor.
  try {
    const rate = await limitContact(getClientIp(request))
    if (rate && !rate.success) {
      const retryAfter = Math.max(1, Math.ceil((rate.reset - Date.now()) / 1000))
      return NextResponse.json(
        { error: contact.api.rateLimited },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      )
    }
  } catch (err) {
    console.error("[contact] Rate limiter error (allowing request):", err)
  }

  // 3. Fail clearly (and only server-side) if the key is missing, rather than
  //    leaking a vendor error to the client or crashing.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set")
    return NextResponse.json(
      { error: contact.api.notConfigured },
      { status: 500 },
    )
  }

  const email = buildContactEmail(result.data)

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: email.subject,
      text: email.text, // plain-text version
      html: email.html, // rich HTML version
      // Reply-To is the visitor's address, so pressing "Reply" in Gmail responds
      // to them — not to the website@ sender.
      replyTo: result.data.email,
    })

    if (error) {
      // Log the real vendor error; return a generic, friendly message.
      console.error("[contact] Resend error:", error)
      return NextResponse.json(
        { error: contact.api.sendFailed },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] Unexpected error:", err)
    return NextResponse.json(
      { error: contact.api.unexpected },
      { status: 500 },
    )
  }
}

// Any non-POST method gets a clean 405 rather than a framework default.
export function GET() {
  return NextResponse.json({ error: contact.api.methodNotAllowed }, { status: 405 })
}
