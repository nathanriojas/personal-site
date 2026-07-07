"use client"

/**
 * Projects section: category filter chips + a grid of project cards that open a
 * detail modal with a media gallery / inspection mode. Data comes from
 * content/projects.ts.
 */
import { useMemo, useState } from "react"
import { Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SpotlightCard } from "@/components/spotlight-card"
import { ProjectMedia } from "@/components/project-media"
import { ProjectModal } from "@/components/project-modal"
import {
  projectImages,
  projects,
  projectsUi,
  type ProjectCategory,
} from "@/content"

type Filter = "All" | ProjectCategory

const filters = projectsUi.filters

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("All")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  const openProject = openIndex !== null ? visible[openIndex] : null

  function go(delta: number) {
    setOpenIndex((prev) => {
      if (prev === null) return prev
      return (prev + delta + visible.length) % visible.length
    })
  }

  return (
    <>
      <ScrollReveal>
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-6 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(f)
                  setOpenIndex(null)
                }}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                  isActive
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
                )}
              >
                {f}
              </button>
            )
          })}
        </div>
      </ScrollReveal>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {visible.map((project, i) => (
          <ScrollReveal as="li" key={project.slug} delay={i * 60}>
            <SpotlightCard
              as="div"
              tilt
              className="h-full rounded-xl border border-border bg-card transition-colors duration-300 hover:border-primary/40"
            >
              <button
                onClick={() => setOpenIndex(i)}
                aria-label={`View details for ${project.title}`}
                className="flex h-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
              >
                {/* Media */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-secondary">
                  <ProjectMedia
                    src={projectImages(project)[0]}
                    alt={`${project.title} preview`}
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="transition-transform duration-500 ease-out group-hover/spot:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />
                  <span className="absolute left-3 top-3 rounded-full border border-primary/40 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover/spot:opacity-100">
                    <Maximize2 className="size-3" />
                    {projectsUi.details}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-medium text-foreground">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </ul>

      {openProject && openIndex !== null && (
        <ProjectModal
          project={openProject}
          index={openIndex}
          total={visible.length}
          onClose={() => setOpenIndex(null)}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </>
  )
}
