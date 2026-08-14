/**
 * Starting prices — an editorial price list rather than symmetrical SaaS cards.
 * Three columns divided by hairlines, each with a short summary and a few plain
 * inclusions (no checkmark inventory). Emphasis stays on "starting" + the
 * fixed-price promise.
 */
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesPricing } from "@/content"

export function Pricing() {
  return (
    <div>
      <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-card/60 md:grid-cols-3 md:divide-x md:divide-y-0">
        {websitesPricing.tiers.map((tier, i) => (
          <ScrollReveal key={tier.name} delay={i * 70}>
            <div className="flex h-full flex-col p-6 sm:p-7">
              {/* Reserves height for up to two lines (text-lg's own 1.75rem
                  line-height × 2) so the price row below starts at the same
                  vertical position in every card regardless of whether a
                  given title wraps — "Custom Websites & Applications" wraps
                  at this column width, the other two don't. Only applied at
                  md+, where the three cards actually sit side by side. */}
              <h3 className="font-display text-lg font-medium tracking-tight text-foreground md:min-h-14">
                {tier.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-sm text-muted-foreground">
                  {tier.priceNote}
                </span>
                <span className="font-display text-3xl font-medium tracking-tight text-foreground">
                  {tier.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tier.summary}
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {tier.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/75"
                  >
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--clay)" }}
                      aria-hidden="true"
                    />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {websitesPricing.note}
          </p>
          <a
            href="#inquiry"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Start a project
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </ScrollReveal>
    </div>
  )
}
