"use client"

/**
 * The contact form: client-side validation mirroring the server, a hidden
 * honeypot + submit-timing bot deterrent, loading/success/error states, and a
 * POST to /api/contact. All copy and validation messages come from
 * content/contact.ts.
 */
import { useRef, useState, type FormEvent } from "react"
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { EMAIL_RE, LIMITS, type ContactField } from "@/lib/contact"
import { contact } from "@/content"

type Status = "idle" | "sending" | "success" | "error"
type Fields = Record<ContactField, string>
type FieldErrors = Partial<Record<ContactField, string>>

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" }

/** Shared control styling: no heavy borders or white boxes — a barely-there
 *  surface that lifts on hover and picks up the emerald accent on focus. */
function controlClass(hasError?: boolean) {
  return cn(
    "w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-sm text-foreground shadow-sm shadow-black/20 outline-none transition-[color,background-color,border-color,box-shadow] duration-300 placeholder:text-muted-foreground/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-destructive/50 focus:border-destructive/60 focus:ring-destructive/15"
      : "border-white/10 hover:border-white/20 hover:bg-white/[0.035] focus:border-primary/50 focus:bg-white/[0.05] focus:ring-primary/15",
  )
}

/** A labelled field: mono uppercase label, the control, and an inline error. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive/90">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [statusMessage, setStatusMessage] = useState("")

  // Anti-spam, invisible to real users: a honeypot field bots tend to fill, and
  // the moment the form first rendered (to reject implausibly fast submits).
  // Both are verified server-side.
  const honeypotRef = useRef<HTMLInputElement>(null)
  const mountedAtRef = useRef<number>(Date.now())

  const sending = status === "sending"

  function update(field: ContactField, value: string) {
    setFields((f) => ({ ...f, [field]: value }))
    // Clear a field's error the moment the visitor starts correcting it, and
    // dismiss any lingering banner so the form feels responsive.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (status === "error" || status === "success") {
      setStatus("idle")
      setStatusMessage("")
    }
  }

  // Mirror the server's rules for instant feedback (the server re-validates).
  function validate(): boolean {
    const messages = contact.form.errors
    const next: FieldErrors = {}
    if (!fields.name.trim()) next.name = messages.name
    if (!fields.email.trim()) next.email = messages.email
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = messages.emailInvalid
    if (!fields.subject.trim()) next.subject = messages.subject
    if (!fields.message.trim()) next.message = messages.message
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (sending) return
    if (!validate()) return

    setStatus("sending")
    setStatusMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          // Anti-spam signals (ignored by the message itself).
          website: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - mountedAtRef.current,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        fieldErrors?: FieldErrors
      }

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors)
        setStatus("error")
        setStatusMessage(data.error || contact.form.errors.sendFailed)
        return
      }

      // Success: reset the form so it's ready for the next note.
      setStatus("success")
      setStatusMessage(contact.form.success)
      setFields(EMPTY)
      setErrors({})
    } catch {
      setStatus("error")
      setStatusMessage(contact.form.errors.network)
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8">
      {/* Honeypot — hidden from real users (off-screen via sr-only, not focusable,
          removed from the accessibility tree). Only bots fill it; the server
          silently drops any submission where it has a value. Not a real field. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name + Email sit side-by-side on desktop, stack on mobile. */}
        <Field id="name" label={contact.form.labels.name} error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder={contact.form.placeholders.name}
            className={controlClass(!!errors.name)}
          />
        </Field>
        <Field id="email" label={contact.form.labels.email} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder={contact.form.placeholders.email}
            className={controlClass(!!errors.email)}
          />
        </Field>
      </div>

      {/* Subject spans full width. */}
      <div className="mt-5">
        <Field id="subject" label={contact.form.labels.subject} error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            maxLength={LIMITS.subject}
            value={fields.subject}
            onChange={(e) => update("subject", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            placeholder={contact.form.placeholders.subject}
            className={controlClass(!!errors.subject)}
          />
        </Field>
      </div>

      {/* Message: larger multiline textarea, full width. */}
      <div className="mt-5">
        <Field id="message" label={contact.form.labels.message} error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            maxLength={LIMITS.message}
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder={contact.form.placeholders.message}
            className={cn(controlClass(!!errors.message), "resize-y min-h-32")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {contact.form.submitting}
            </>
          ) : (
            <>
              <Send
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              {contact.form.submit}
            </>
          )}
        </button>
      </div>

      {/* Status region — polite live updates, tinted to the site's palette
          rather than loud banner colors. */}
      <div aria-live="polite" className="mt-4 empty:mt-0">
        {status === "success" ? (
          <p
            role="status"
            className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/[0.07] px-4 py-3 text-sm text-primary"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{statusMessage}</span>
          </p>
        ) : status === "error" ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/[0.07] px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{statusMessage}</span>
          </p>
        ) : null}
      </div>
    </form>
  )
}
