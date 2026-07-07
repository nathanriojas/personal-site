// ---------------------------------------------------------------------------
// Shared contact-form logic: types, validation, sanitization, and the email
// templates. This lives outside the route (framework-agnostic) so the API stays
// thin, the client can reuse the exact same email regex / length caps, and the
// rules can be unit-tested in isolation.
//
// The server treats this module as the source of truth — the client mirrors it
// only for instant UX feedback.
// ---------------------------------------------------------------------------

import { contact } from "@/content/contact"

export type ContactField = "name" | "email" | "subject" | "message"

/** The raw, untrusted shape that arrives on the wire. Values are `unknown`
 *  because a caller can send anything; validation narrows them. */
export type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  // Anti-spam fields (not part of the message). `website` is a honeypot that
  // real users never see or fill; `elapsedMs` is how long the form was on screen
  // before submit. Both are best-effort bot deterrents, not hard security.
  website?: unknown
  elapsedMs?: unknown
}

export type CleanContact = {
  name: string
  email: string
  subject: string
  message: string
}

/** Per-field length caps. They bound the payload (basic abuse protection) and
 *  keep the delivered email tidy. The client uses the same values for maxLength. */
export const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254, // RFC 5321 maximum email length
  subject: 150,
  message: 5000,
}

/** Pragmatic email pattern: rejects the obviously invalid without over-policing
 *  valid-but-unusual addresses. Actual deliverability is confirmed by Resend. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** A genuine submission takes at least a few seconds to fill; anything faster is
 *  almost certainly an automated script. */
export const MIN_SUBMIT_MS = 3000

/** Remove control characters (code point < 32, or DEL) by scanning code points.
 *  When `keepWhitespace` is true, newline (10) and tab (9) are preserved so
 *  multiline message bodies keep their formatting. Done numerically to avoid
 *  embedding raw control bytes in source. */
function stripControlChars(value: string, keepWhitespace: boolean): string {
  let out = ""
  for (const ch of value) {
    const code = ch.codePointAt(0) as number
    if (code < 32 || code === 127) {
      if (keepWhitespace && (code === 10 || code === 9)) out += ch
      continue
    }
    out += ch
  }
  return out
}

/** Single-line field: fold any CR/LF/tab to a space (so a value can never be
 *  used to smuggle extra email headers), strip remaining control chars, trim,
 *  and cap the length. */
function cleanLine(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  const singleLine = value.replace(/[\r\n\t]+/g, " ")
  return stripControlChars(singleLine, false).trim().slice(0, max)
}

/** Multiline field (message): normalize line endings, keep newlines/tabs, strip
 *  other control chars, trim, and cap. */
function cleanBlock(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  const normalized = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  return stripControlChars(normalized, true).trim().slice(0, max)
}

export type ValidationResult =
  | { ok: true; data: CleanContact }
  | { ok: false; fieldErrors: Partial<Record<ContactField, string>> }

/** Sanitize and validate an incoming payload. Always returns cleaned values on
 *  success, so callers never touch the raw input again. */
export function validateContact(payload: ContactPayload): ValidationResult {
  const data: CleanContact = {
    name: cleanLine(payload.name, LIMITS.name),
    email: cleanLine(payload.email, LIMITS.email).toLowerCase(),
    subject: cleanLine(payload.subject, LIMITS.subject),
    message: cleanBlock(payload.message, LIMITS.message),
  }

  const messages = contact.form.errors
  const fieldErrors: Partial<Record<ContactField, string>> = {}
  if (!data.name) fieldErrors.name = messages.name
  if (!data.email) fieldErrors.email = messages.email
  else if (!EMAIL_RE.test(data.email)) fieldErrors.email = messages.emailInvalid
  if (!data.subject) fieldErrors.subject = messages.subject
  if (!data.message) fieldErrors.message = messages.message

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors }
  return { ok: true, data }
}

/**
 * Best-effort bot detection using two silent signals:
 *   1. Honeypot — a hidden `website` field no human can see or tab to. If it has
 *      any value, a script filled it.
 *   2. Timing — a genuine visitor takes seconds to fill the form; a submit under
 *      MIN_SUBMIT_MS almost never comes from a person.
 *
 * Deliberately lenient: a missing/invalid `elapsedMs` is NOT treated as spam, so
 * a stale client or a privacy tool never blocks a real message. Returns a reason
 * only for server-side logging — the caller should drop spam silently.
 */
export function spamCheck(payload: ContactPayload): {
  spam: boolean
  reason?: string
} {
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : ""
  if (honeypot) return { spam: true, reason: "honeypot" }

  const elapsed =
    typeof payload.elapsedMs === "number"
      ? payload.elapsedMs
      : Number(payload.elapsedMs)
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
    return { spam: true, reason: "too-fast" }
  }

  return { spam: false }
}

/** Escape the HTML-significant characters so visitor input can never inject
 *  markup into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export type BuiltEmail = { subject: string; text: string; html: string }

/**
 * Build the plain-text and HTML versions of the notification email. Styling is
 * fully inlined (email clients strip <style> blocks) and echoes the site: deep
 * charcoal, a single emerald accent, restrained hairline borders. The timestamp
 * is rendered in Central Time to match where Nathan is based.
 */
export function buildContactEmail(
  data: CleanContact,
  sentAt: Date = new Date(),
): BuiltEmail {
  const timestamp =
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Chicago",
    }).format(sentAt) + " CT"

  const subject = `Portfolio message from ${data.name}: ${data.subject}`

  const text = [
    "New message from your portfolio contact form",
    "",
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "—",
    `Received: ${timestamp}`,
    "Reply to this email to respond directly to the sender.",
  ].join("\n")

  // Escape first, then restore the visitor's line breaks as <br>.
  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>")

  const metaRow = (label: string, value: string) => `
      <tr>
        <td style="padding:6px 0;width:92px;vertical-align:top;color:#8a8f98;font:600 11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.12em;text-transform:uppercase;">${label}</td>
        <td style="padding:6px 0;color:#e7e8ea;font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${value}</td>
      </tr>`

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#141518;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#1b1c20;border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:22px 26px;border-bottom:1px solid rgba(255,255,255,0.07);">
          <div style="font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.22em;text-transform:uppercase;color:#34d3a6;">New contact message</div>
          <div style="margin-top:6px;font:400 13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#8a8f98;">via nathanriojas.com</div>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 26px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${metaRow("Name", escapeHtml(data.name))}
            ${metaRow(
              "Email",
              `<a href="mailto:${escapeHtml(data.email)}" style="color:#34d3a6;text-decoration:none;">${escapeHtml(data.email)}</a>`,
            )}
            ${metaRow("Subject", escapeHtml(data.subject))}
          </table>
          <div style="margin:18px 0 8px;color:#8a8f98;font:600 11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.12em;text-transform:uppercase;">Message</div>
          <div style="padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;color:#e7e8ea;font:400 14px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${messageHtml}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 26px 22px;color:#6c7079;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          Received ${timestamp}<br>
          Reply to this email to respond directly to ${escapeHtml(data.name)}.
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, text, html }
}
