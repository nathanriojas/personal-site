/**
 * Example-work showcase for /websites. Large, alternating preview rows — each a
 * browser-framed screenshot of a real, navigable concept site (see
 * app/websites/examples/*), linking out so a visitor can explore it. This is one
 * of the strongest visual moments on the page and is honest about being concept
 * work. Screenshots live in /public/samples and are easy to refresh.
 */
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesExamples, type ExampleWork } from "@/content"

function fauxDomain(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
}

function Preview({ item }: { item: ExampleWork }) {
  return (
    <Link
      href={item.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View the ${item.title} sample site (opens in a new tab)`}
      className="group/preview block overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/[0.06] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto rounded bg-background/70 px-3 py-0.5 text-[11px] text-muted-foreground">
          {fauxDomain(item.title)}
        </span>
      </div>
      {item.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={item.image}
            alt={`${item.title} — concept site preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] w-full bg-muted" />
      )}
    </Link>
  )
}

export function ExampleWork() {
  return (
    <div>
      <div className="flex flex-col gap-16 sm:gap-20">
        {websitesExamples.items.map((item: ExampleWork, i) => {
          const imageRight = i % 2 === 1
          return (
            <ScrollReveal key={item.title} delay={i * 40}>
              <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-14">
                <div className={imageRight ? "lg:order-last" : undefined}>
                  <Preview item={item} />
                </div>
                <div>
                  <span
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--clay)" }}
                  >
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                    {item.blurb}
                  </p>
                  <Link
                    href={item.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {websitesExamples.cta}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <ScrollReveal>
        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-muted-foreground/70">
          {websitesExamples.note}
        </p>
      </ScrollReveal>
    </div>
  )
}
