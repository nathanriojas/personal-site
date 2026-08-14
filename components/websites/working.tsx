/**
 * "Working with me" — three human reasons, replacing the earlier six-item
 * consultancy grid. Plain editorial layout, minimal chrome.
 */
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesWorking } from "@/content"

export function Working() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
      {websitesWorking.points.map((point, i) => (
        <ScrollReveal key={point.title} delay={i * 80}>
          <div className="flex flex-col border-t border-border pt-5">
            <span className="font-mono text-xs text-muted-foreground/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-foreground">
              {point.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {point.body}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
