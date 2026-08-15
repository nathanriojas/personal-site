/**
 * Hero for /websites: the value proposition in a few warm lines, plus the two
 * primary actions. Editorial display heading, restrained motion.
 */
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesHero } from "@/content"

export function WebsitesHero() {
  return (
    <section aria-label="Introduction" className="pt-16 pb-8 sm:pt-24 sm:pb-12">
      <ScrollReveal>
        <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span
            className="inline-block size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {websitesHero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {websitesHero.headline}
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-xl leading-relaxed text-foreground/80">
          {websitesHero.lead}
        </p>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {websitesHero.sub}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#inquiry"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {websitesHero.primaryCta}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#examples"
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-foreground underline decoration-border decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {websitesHero.secondaryCta}
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
