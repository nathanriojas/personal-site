/**
 * About section: portrait + bio paragraphs, an Education list, and a Research &
 * Publications list. All content comes from content/about.ts.
 */
import Image from "next/image"
import { GraduationCap, FileText, ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { EducationCard } from "@/components/sections/education-card"
import { about, education, publications, site } from "@/content"

export function AboutSection() {
  return (
    <>
      <ScrollReveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary sm:mx-0 sm:w-44">
            <Image
              src={site.photo || "/placeholder.svg"}
              alt={`Portrait of ${site.name}`}
              fill
              quality={100}
              sizes="(min-width: 640px) 176px, 160px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="mt-10">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            {about.headings.education}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {education.map((e) => (
              <EducationCard key={`${e.degree}-${e.field}`} entry={e} />
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="mt-10">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <FileText className="size-4 text-primary" aria-hidden="true" />
            {about.headings.publications}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {publications.map((pub) => (
              <li key={pub.title}>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-colors ${
                    pub.featured
                      ? "border-primary/40 hover:border-primary/70"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="min-w-0">
                    {/* Role badge + a quiet "Featured" marker for authored work */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                          pub.role === "Co-Author"
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-secondary/60 text-muted-foreground"
                        }`}
                      >
                        {pub.role}
                      </span>
                      {pub.featured ? (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
                          {about.headings.featured}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-pretty font-medium text-foreground">
                      {pub.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <span className="text-primary">{pub.venue}</span>
                      {pub.year ? ` · ${pub.year}` : ""}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </>
  )
}
