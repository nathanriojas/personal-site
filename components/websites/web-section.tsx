import type { ReactNode } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

/**
 * Editorial section wrapper for /websites. Unlike the portfolio's mono-labelled
 * `Section`, this leads with a normal, human heading (warm display serif) and
 * generous whitespace — no accent glow, dot, or long horizontal rule. A small
 * `kicker` is available but used sparingly.
 */
export function WebSection({
  id,
  title,
  kicker,
  lead,
  children,
  className,
  headingClassName,
}: {
  id?: string
  title?: string
  kicker?: string
  lead?: string
  children: ReactNode
  className?: string
  headingClassName?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 sm:py-20", className)}>
      {(kicker || title || lead) && (
        <ScrollReveal>
          <div className="max-w-2xl">
            {kicker && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
                {kicker}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl",
                  kicker && "mt-3",
                  headingClassName,
                )}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {lead}
              </p>
            )}
          </div>
        </ScrollReveal>
      )}
      <div className={cn(title || lead ? "mt-10" : undefined)}>{children}</div>
    </section>
  )
}
