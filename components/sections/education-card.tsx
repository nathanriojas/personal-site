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
      className="edu-card relative flex items-baseline justify-between gap-4 overflow-hidden rounded-lg border border-border bg-card p-4"
      style={{ "--edu-accent": entry.accent } as React.CSSProperties}
    >
      {/* Soft radial glow from the upper-left, revealed on hover. */}
      <span className="edu-glow" aria-hidden="true" />

      <div className="relative">
        <p className="edu-title font-medium text-foreground">
          {entry.degree} {entry.field}
        </p>
        {entry.notes?.map((note) => (
          <p key={note} className="mt-0.5 text-sm text-muted-foreground">
            {note}
          </p>
        ))}
      </div>
      <p className="relative shrink-0 text-right text-sm text-muted-foreground">
        {entry.school}
      </p>
    </li>
  )
}
