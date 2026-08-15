/**
 * "Who I work with" — two clean, editorial pathways aimed at emotional
 * recognition ("that's me") rather than a feature matrix. Each path is gently
 * differentiated: a sage marker for individuals, a clay marker for businesses.
 */
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesWho, type Pathway } from "@/content"

function PathBlock({ path, accent }: { path: Pathway; accent: "clay" | "sage" }) {
  const markerColor = accent === "clay" ? "var(--clay)" : "var(--primary)"
  return (
    <div className="flex flex-col">
      <span
        className="h-1 w-10 rounded-full"
        style={{ backgroundColor: markerColor }}
        aria-hidden="true"
      />
      <p
        className="mt-4 text-sm font-medium"
        style={{ color: markerColor }}
      >
        {path.tag}
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-foreground">
        {path.headline}
      </h3>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        {path.body}
      </p>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        {path.secondary}
      </p>
      <p className="mt-5 text-sm text-muted-foreground/80">{path.examples}</p>
    </div>
  )
}

export function Who() {
  return (
    <div className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-14">
      <ScrollReveal>
        <PathBlock path={websitesWho.pathways[0]} accent="clay" />
      </ScrollReveal>
      <ScrollReveal delay={90}>
        <PathBlock path={websitesWho.pathways[1]} accent="sage" />
      </ScrollReveal>
    </div>
  )
}
