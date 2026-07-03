"use client"

/**
 * Experience timeline: a vertical list of roles with an engineering-drawing rail
 * and an amber glow that drifts toward the entry being read. Data comes from
 * content/experience.ts.
 */
import { useRef, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { experience } from "@/content"
import { cn } from "@/lib/utils"

export function ExperienceSection() {
  const [active, setActive] = useState<number | null>(null)
  const [glowY, setGlowY] = useState<number | null>(null)
  const listRef = useRef<HTMLOListElement | null>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  function activate(i: number) {
    setActive(i)
    const list = listRef.current
    const el = itemRefs.current[i]
    if (list && el) {
      const lr = list.getBoundingClientRect()
      const er = el.getBoundingClientRect()
      setGlowY(er.top - lr.top + er.height / 2)
    }
  }

  return (
    <ol
      ref={listRef}
      className="relative flex flex-col gap-4"
      onMouseLeave={() => setActive(null)}
    >
      {/* Amber glow that drifts toward the chapter being read. Extremely slow
          and low-opacity — felt more than noticed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-10 h-64 -translate-y-1/2 transition-[top,opacity] duration-[1200ms] ease-out"
        style={{
          top: glowY ?? "50%",
          opacity: active !== null ? 0.16 : 0,
          background:
            "radial-gradient(ellipse 55% 50% at 35% 50%, var(--accent), transparent 70%)",
        }}
      />

      {experience.map((job, i) => {
        const isActive = active === i
        const dimmed = active !== null && !isActive
        const isLast = i === experience.length - 1

        return (
          <ScrollReveal as="li" key={job.company} delay={i * 60}>
            <article
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              onMouseEnter={() => activate(i)}
              onFocusCapture={() => activate(i)}
              className={cn(
                "group relative rounded-lg p-5 transition-all duration-300 ease-out sm:grid sm:grid-cols-[7rem_2rem_1fr] sm:gap-x-2",
                isActive && "bg-card",
                dimmed ? "opacity-70" : "opacity-100",
              )}
            >
              {/* Period / year — illuminates to the accent hue when active */}
              <p
                className={cn(
                  "mb-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300 sm:mb-0 sm:pt-1 sm:text-right",
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-muted-foreground",
                )}
              >
                {job.period}
              </p>

              {/* Timeline rail — engineering-drawing line + node */}
              <div className="relative hidden sm:block" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300",
                    isActive ? "bg-[var(--accent)]/50" : "bg-border",
                  )}
                  style={{
                    top: i === 0 ? "0.8rem" : "-1rem",
                    bottom: isLast ? "calc(100% - 0.8rem)" : "-1rem",
                  }}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-[0.8rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300",
                    isActive
                      ? "scale-110 border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_12px_2px_var(--accent)]"
                      : "border-border bg-card",
                  )}
                />
              </div>

              <div>
                <h3 className="font-medium leading-snug">
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-foreground" : "text-foreground/90",
                    )}
                  >
                    {job.role}
                  </span>
                  <span className="text-muted-foreground"> · </span>
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-primary" : "text-primary/85",
                    )}
                  >
                    {job.company}
                  </span>
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm transition-colors duration-300",
                    isActive ? "text-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {job.summary}
                </p>
                <ul className="mt-3 flex list-none flex-col gap-2">
                  {job.points.map((point, j) => (
                    <li
                      key={j}
                      className={cn(
                        "relative pl-5 text-sm leading-relaxed transition-colors duration-300",
                        isActive
                          ? "text-foreground/75"
                          : "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-2 size-1.5 rounded-full transition-colors duration-300",
                          isActive ? "bg-primary" : "bg-primary/70",
                        )}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-300",
                        isActive
                          ? "border-primary/40 bg-primary/20 text-primary"
                          : "border-primary/20 bg-primary/10 text-primary/90",
                      )}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollReveal>
        )
      })}
    </ol>
  )
}
