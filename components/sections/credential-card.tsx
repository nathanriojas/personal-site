import { ArrowUpRight } from "lucide-react"
import { about, type Credential } from "@/content"

/**
 * A single credential — a sibling of EducationCard, sharing its card shell and
 * the same contained accent illumination on hover (`.edu-card` in globals.css,
 * which already respects prefers-reduced-motion).
 *
 * The difference is that this card is a link: a credential only means something
 * if a visitor can check it, so the whole card opens the issuer's public badge
 * page and carries the same ArrowUpRight affordance the publications list uses.
 */
export function CredentialCard({ entry }: { entry: Credential }) {
  return (
    <li>
      <a
        href={entry.link}
        target="_blank"
        rel="noopener noreferrer"
        className="edu-card relative grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4"
        style={{ "--edu-accent": entry.accent } as React.CSSProperties}
      >
        {/* Soft radial glow from the upper-left, revealed on hover. */}
        <span className="edu-glow" aria-hidden="true" />

        {/* Name and issuer share the first row on wide screens; on mobile the
            grid collapses to one column so the long badge name wraps instead of
            being clipped by the card's overflow. */}
        <p className="edu-title relative font-medium text-foreground sm:col-start-1 sm:row-start-1">
          {entry.name}
        </p>
        <p className="relative mt-0.5 text-sm text-muted-foreground sm:col-start-2 sm:row-start-1 sm:mt-0 sm:text-right">
          {entry.issuer}
        </p>
        <p className="relative mt-1 inline-flex items-center gap-1 text-sm text-primary sm:col-start-1">
          {about.verifyLabel}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </p>
      </a>
    </li>
  )
}
