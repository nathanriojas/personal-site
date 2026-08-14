"use client"

/**
 * Cornerstone Exteriors' "free quote" form. This concept site has no real
 * lead-capture backend (out of scope — see AGENTS notes on the /websites
 * concept sites), so a silent no-op submit button would be worse than no form
 * at all: a prospective customer could genuinely try to use it. Submitting
 * instead shows a clear, honest inline confirmation that this is a concept
 * form and nothing was sent — representational rather than either broken or
 * (falsely) functional.
 */
import { useState, type FormEvent } from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { cornerstone } from "@/content/concepts"

const f = cornerstone.form

export function CornerstoneQuoteForm({
  headingFontClassName,
}: {
  /** The concept's own display-font className, so the button matches. */
  headingFontClassName?: string
}) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-5 flex items-start gap-3 rounded border border-[#f26a1b]/25 bg-[#fff4ec] p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#f26a1b]" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-[#33465a]">{f.confirmation}</p>
      </div>
    )
  }

  return (
    <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={f.namePlaceholder}
        autoComplete="name"
        className="w-full rounded border border-[#d3dbe4] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#f26a1b] focus:ring-2 focus:ring-[#f26a1b]/20"
      />
      <input
        type="tel"
        placeholder={f.phonePlaceholder}
        autoComplete="tel"
        className="w-full rounded border border-[#d3dbe4] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#f26a1b] focus:ring-2 focus:ring-[#f26a1b]/20"
      />
      <select
        defaultValue=""
        className="w-full cursor-pointer rounded border border-[#d3dbe4] bg-[#f8fafc] px-4 py-3 text-sm text-[#10202e] outline-none focus:border-[#f26a1b] focus:ring-2 focus:ring-[#f26a1b]/20"
      >
        <option value="" disabled>
          {f.servicePlaceholder}
        </option>
        {f.serviceOptions.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <button
        type="submit"
        className={cn(
          headingFontClassName,
          "mt-1 w-full cursor-pointer rounded bg-[#f26a1b] px-6 py-3.5 text-base uppercase tracking-wide text-white transition-colors hover:bg-[#d95810]",
        )}
      >
        {f.submit}
      </button>
      <p className="text-center text-xs text-[#8695a4]">{f.disclaimer}</p>
    </form>
  )
}
