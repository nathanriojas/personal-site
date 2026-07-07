/**
 * Section shell for the home page: a titled band with a mono heading, a soft
 * per-section accent glow, and a scroll reveal. Wraps each page section (About,
 * Projects, …) with consistent chrome and spacing.
 */
import type { CSSProperties, ReactNode } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Section({
  id,
  label,
  accent,
  glowSide = "right",
  children,
}: {
  id: string
  label: string
  /** Per-section accent color (any CSS color). Drives the glow band and chrome. */
  accent: string
  /** Side the secondary depth glow anchors to. Alternated per section. */
  glowSide?: "left" | "right"
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-label={label}
      style={{ "--accent": accent } as CSSProperties}
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      {/* Soft accent glow band that fades into the background */}
      <div className="accent-glow" aria-hidden="true" />
      {/* Secondary side glow for vertical depth in the dark canvas */}
      <div
        className={`accent-glow-2 ${glowSide === "left" ? "is-left" : "is-right"}`}
        aria-hidden="true"
      />

      <div className="relative">
        <ScrollReveal>
          <header className="mb-10 flex items-center gap-3">
            <span
              className="size-2 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              {label}
            </h2>
            <span
              className="h-px flex-1 bg-gradient-to-r from-[var(--accent)]/40 to-transparent"
              aria-hidden="true"
            />
          </header>
        </ScrollReveal>

        {children}
      </div>
    </section>
  )
}
