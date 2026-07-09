import type { Education } from "@/content"

/**
 * A single education entry. On hover the card is softly illuminated by the
 * university's colors — an immediate, identity-driven treatment (border glow,
 * radial inner glow, faint background tint, and gentle title brightening) with
 * no movement, scaling, or sweeping animation. The accent color is passed to
 * CSS via a custom property; all hover styling lives in `.edu-card` so it can
 * react to `:hover` directly and respect reduced-motion. See globals.css.
 */
export function EducationCard({ entry }: { entry: Education }) {
  return (
    <li
      className="edu-card relative grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-card p-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4"
      style={{ "--edu-accent": entry.accent } as React.CSSProperties}
    >
      {/* Soft radial glow from the upper-left, revealed on hover. */}
      <span className="edu-glow" aria-hidden="true" />

      {/* Degree/field and school share the first row on wide screens; on mobile
          the grid collapses to one column so the school name wraps instead of
          being clipped by the card's overflow. */}
      <p className="edu-title relative font-medium text-foreground sm:col-start-1 sm:row-start-1">
        {entry.degree} {entry.field}
      </p>
      <p className="relative mt-0.5 text-sm text-muted-foreground sm:col-start-2 sm:row-start-1 sm:mt-0 sm:text-right">
        {entry.school}
      </p>
      {entry.notes?.map((note) => (
        <p
          key={note}
          className="relative mt-0.5 text-sm text-muted-foreground sm:col-start-1"
        >
          {note}
        </p>
      ))}
    </li>
  )
}
