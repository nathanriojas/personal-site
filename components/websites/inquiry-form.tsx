"use client"

/**
 * Project-inquiry form for the /websites service page.
 *
 * Rather than standing up a second API + email pipeline, this reuses the
 * existing, hardened /api/contact route: the richer inquiry fields are composed
 * into a structured `subject` + `message`, so the server's validation, spam
 * checks, rate limiting, and Resend delivery all apply unchanged. No new
 * credentials or infrastructure are required.
 *
 * Copy comes from content/websites.ts; control styling is shared with the
 * contact form via components/ui/field.
 */
import { useRef, useState, type FormEvent } from "react"
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Field } from "@/components/ui/field"
import { EMAIL_RE } from "@/lib/contact"
import { websitesInquiry } from "@/content"

/** Light-theme control styling (token-based) for the warm /websites page. */
function controlClass(hasError?: boolean) {
  return cn(
    "w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground shadow-sm shadow-black/[0.03] outline-none transition-[color,background-color,border-color,box-shadow] duration-300 placeholder:text-muted-foreground/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-destructive/50 focus:border-destructive/60 focus:ring-destructive/15"
      : "border-border hover:border-muted-foreground/40 focus:border-primary/60 focus:ring-primary/15",
  )
}

type Status = "idle" | "sending" | "success" | "error"
type ClientType = "individual" | "business"

type Fields = {
  name: string
  email: string
  type: ClientType
  company: string
  currentWebsite: string
  goal: string
  functionality: string
  inspiration: string
  timeline: string
  budget: string
  domain: string
  notes: string
}

type FieldErrors = Partial<Record<"name" | "email" | "goal", string>>

const EMPTY: Fields = {
  name: "",
  email: "",
  type: "individual",
  company: "",
  currentWebsite: "",
  goal: "",
  functionality: "",
  inspiration: "",
  timeline: websitesInquiry.timelineOptions[0],
  budget: websitesInquiry.budgetOptions[0],
  domain: websitesInquiry.domainOptions[0],
  notes: "",
}

/** Build the human-readable subject + message sent to the contact API. */
function compose(fields: Fields): { subject: string; message: string } {
  const isBusiness = fields.type === "business"
  const who = isBusiness
    ? `Business${fields.company.trim() ? `: ${fields.company.trim()}` : ""}`
    : "Individual / professional"
  const subject = `${websitesInquiry.subjectPrefix} — ${who}`

  const L = websitesInquiry.labels
  const lines: string[] = [
    `Type: ${isBusiness ? "Business" : "Individual / professional"}`,
  ]
  if (isBusiness && fields.company.trim())
    lines.push(`${L.company}: ${fields.company.trim()}`)
  if (fields.currentWebsite.trim())
    lines.push(`${L.currentWebsite}: ${fields.currentWebsite.trim()}`)
  lines.push("", `${L.goal}`, fields.goal.trim())
  if (fields.functionality.trim())
    lines.push("", `${L.functionality}`, fields.functionality.trim())
  if (fields.inspiration.trim())
    lines.push("", `${L.inspiration}: ${fields.inspiration.trim()}`)
  lines.push(
    "",
    `${L.timeline}: ${fields.timeline}`,
    `${L.budget}: ${fields.budget}`,
    `${L.domain}: ${fields.domain}`,
  )
  if (fields.notes.trim()) lines.push("", `${L.notes}`, fields.notes.trim())

  return { subject, message: lines.join("\n") }
}

export function InquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [statusMessage, setStatusMessage] = useState("")

  // Anti-spam, invisible to real users — mirrors the contact form and is
  // verified by the same server-side checks.
  const honeypotRef = useRef<HTMLInputElement>(null)
  const mountedAtRef = useRef<number>(Date.now())

  const sending = status === "sending"

  function update<K extends keyof Fields>(field: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [field]: value }))
    if (field in errors && errors[field as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }))
    }
    if (status === "error" || status === "success") {
      setStatus("idle")
      setStatusMessage("")
    }
  }

  function validate(): boolean {
    const m = websitesInquiry.errors
    const next: FieldErrors = {}
    if (!fields.name.trim()) next.name = m.name
    if (!fields.email.trim()) next.email = m.email
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = m.emailInvalid
    if (!fields.goal.trim()) next.goal = m.goal
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
      const { subject, message } = compose(fields)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          subject,
          message,
          website: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - mountedAtRef.current,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        fieldErrors?: Record<string, string>
      }

      if (!res.ok) {
        // Map any server field errors back onto the two fields the visitor
        // controls directly (name/email); everything else is composed by us.
        if (data.fieldErrors) {
          setErrors({
            name: data.fieldErrors.name,
            email: data.fieldErrors.email,
            goal: data.fieldErrors.message,
          })
        }
        setStatus("error")
        setStatusMessage(data.error || websitesInquiry.errors.sendFailed)
        return
      }

      setStatus("success")
      setStatusMessage(websitesInquiry.success)
      setFields(EMPTY)
      setErrors({})
    } catch {
      setStatus("error")
      setStatusMessage(websitesInquiry.errors.network)
    }
  }

  const L = websitesInquiry.labels
  const P = websitesInquiry.placeholders

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8">
      {/* Honeypot — hidden from real users, dropped server-side if filled. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input
          id="inquiry-website"
          type="text"
          name="website"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Name + email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inq-name" label={L.name} error={errors.name}>
          <input
            id="inq-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "inq-name-error" : undefined}
            placeholder={P.name}
            className={controlClass(!!errors.name)}
          />
        </Field>
        <Field id="inq-email" label={L.email} error={errors.email}>
          <input
            id="inq-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "inq-email-error" : undefined}
            placeholder={P.email}
            className={controlClass(!!errors.email)}
          />
        </Field>
      </div>

      {/* Individual vs business — segmented control */}
      <fieldset className="mt-5">
        <legend className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {L.type}
        </legend>
        <div className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
          {websitesInquiry.typeOptions.map((opt) => {
            const active = fields.type === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("type", opt.value as ClientType)}
                aria-pressed={active}
                disabled={sending}
                className={cn(
                  "cursor-pointer rounded-md px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Company — only relevant for businesses */}
      {fields.type === "business" && (
        <div className="mt-5">
          <Field id="inq-company" label={L.company} optional>
            <input
              id="inq-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={120}
              value={fields.company}
              onChange={(e) => update("company", e.target.value)}
              disabled={sending}
              placeholder={P.company}
              className={controlClass()}
            />
          </Field>
        </div>
      )}

      {/* Current website */}
      <div className="mt-5">
        <Field id="inq-current" label={L.currentWebsite} optional>
          <input
            id="inq-current"
            name="currentWebsite"
            type="text"
            inputMode="url"
            maxLength={200}
            value={fields.currentWebsite}
            onChange={(e) => update("currentWebsite", e.target.value)}
            disabled={sending}
            placeholder={P.currentWebsite}
            className={controlClass()}
          />
        </Field>
      </div>

      {/* Goal — the one required free-text field */}
      <div className="mt-5">
        <Field id="inq-goal" label={L.goal} error={errors.goal}>
          <textarea
            id="inq-goal"
            name="goal"
            rows={5}
            maxLength={2000}
            value={fields.goal}
            onChange={(e) => update("goal", e.target.value)}
            disabled={sending}
            aria-invalid={!!errors.goal}
            aria-describedby={errors.goal ? "inq-goal-error" : undefined}
            placeholder={P.goal}
            className={cn(controlClass(!!errors.goal), "resize-y min-h-28")}
          />
        </Field>
      </div>

      {/* Functionality */}
      <div className="mt-5">
        <Field id="inq-func" label={L.functionality} optional>
          <input
            id="inq-func"
            name="functionality"
            type="text"
            maxLength={300}
            value={fields.functionality}
            onChange={(e) => update("functionality", e.target.value)}
            disabled={sending}
            placeholder={P.functionality}
            className={controlClass()}
          />
        </Field>
      </div>

      {/* Inspiration */}
      <div className="mt-5">
        <Field id="inq-inspo" label={L.inspiration} optional>
          <input
            id="inq-inspo"
            name="inspiration"
            type="text"
            maxLength={300}
            value={fields.inspiration}
            onChange={(e) => update("inspiration", e.target.value)}
            disabled={sending}
            placeholder={P.inspiration}
            className={controlClass()}
          />
        </Field>
      </div>

      {/* Timeline + budget + domain — three quick selects */}
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Field id="inq-timeline" label={L.timeline}>
          <select
            id="inq-timeline"
            name="timeline"
            value={fields.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            disabled={sending}
            className={cn(controlClass(), "cursor-pointer")}
          >
            {websitesInquiry.timelineOptions.map((o) => (
              <option key={o} value={o} className="bg-card text-foreground">
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="inq-budget" label={L.budget}>
          <select
            id="inq-budget"
            name="budget"
            value={fields.budget}
            onChange={(e) => update("budget", e.target.value)}
            disabled={sending}
            className={cn(controlClass(), "cursor-pointer")}
          >
            {websitesInquiry.budgetOptions.map((o) => (
              <option key={o} value={o} className="bg-card text-foreground">
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="inq-domain" label={L.domain}>
          <select
            id="inq-domain"
            name="domain"
            value={fields.domain}
            onChange={(e) => update("domain", e.target.value)}
            disabled={sending}
            className={cn(controlClass(), "cursor-pointer")}
          >
            {websitesInquiry.domainOptions.map((o) => (
              <option key={o} value={o} className="bg-card text-foreground">
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Notes */}
      <div className="mt-5">
        <Field id="inq-notes" label={L.notes} optional>
          <textarea
            id="inq-notes"
            name="notes"
            rows={3}
            maxLength={1500}
            value={fields.notes}
            onChange={(e) => update("notes", e.target.value)}
            disabled={sending}
            placeholder={P.notes}
            className={cn(controlClass(), "resize-y min-h-20")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {websitesInquiry.submitting}
            </>
          ) : (
            <>
              <Send
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              {websitesInquiry.submit}
            </>
          )}
        </button>
      </div>

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
