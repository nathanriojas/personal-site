/**
 * "You own what I build." — the key trust signal, given a deep forest contrast
 * treatment inside the otherwise-light page. `.ws-invert` flips the design
 * tokens dark so the usual utilities render on a warm charcoal-green ground.
 */
import { Check } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesOwnership } from "@/content"

export function Ownership() {
  return (
    <section id="ownership" className="scroll-mt-24 py-14 sm:py-20">
      <ScrollReveal>
        <div className="ws-invert relative overflow-hidden rounded-3xl bg-background px-8 py-12 text-foreground sm:px-12 sm:py-14">
          {/* Soft sage glow for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {websitesOwnership.heading}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {websitesOwnership.lede}
            </p>

            {/* Given more visual weight than the plain bullets below — full
                foreground contrast, a bold lead-in, and a highlighted vs.
                struck-through domain pair so the difference reads instantly
                without needing to parse a sentence. */}
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-foreground">
              <span className="font-medium">{websitesOwnership.domain.label}.</span>{" "}
              Your site can live at{" "}
              <code className="whitespace-nowrap rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-primary">
                {websitesOwnership.domain.good}
              </code>{" "}
              — not{" "}
              <code className="whitespace-nowrap rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-muted-foreground line-through decoration-muted-foreground/60">
                {websitesOwnership.domain.bad}
              </code>{" "}
              or a Nathan Riojas subdomain. The domain is registered in an account you control.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {websitesOwnership.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-9 max-w-2xl border-t border-border pt-6 text-pretty leading-relaxed text-muted-foreground">
              {websitesOwnership.reassurance}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
