/**
 * "How it works" — four plain, reassuring steps. Simple numbered layout, no
 * enterprise-methodology framing.
 */
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesProcess } from "@/content"

export function Process() {
  return (
    <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {websitesProcess.steps.map((step, i) => (
        <ScrollReveal as="li" key={step.title} delay={i * 70}>
          <div className="flex h-full flex-col">
            <span
              className="inline-flex size-9 items-center justify-center rounded-full font-display text-base text-primary"
              style={{ backgroundColor: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
            >
              {i + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </ol>
  )
}
