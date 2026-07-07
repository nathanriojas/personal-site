"use client"

/**
 * Skills section: grouped technology cards where one item expands at a time to
 * reveal how it's used. Data comes from content/skills.ts.
 */
import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { skillGroups, type Skill } from "@/content"
import { cn } from "@/lib/utils"

export function SkillsSection() {
  // Section-wide active key so only ONE technology is ever expanded at a time,
  // even across separate cards.
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {skillGroups.map((group, i) => (
        <ScrollReveal key={group.name} delay={i * 60}>
          <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40">
            <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              {group.name}
            </h3>
            <ul className="flex flex-col">
              {group.items.map((item) => {
                const key = `${group.name}-${item.name}`
                return (
                  <SkillItem
                    key={key}
                    skill={item}
                    expanded={active === key}
                    onActivate={() => setActive(key)}
                    onCollapse={() =>
                      setActive((cur) => (cur === key ? null : cur))
                    }
                  />
                )
              })}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}

function SkillItem({
  skill,
  expanded,
  onActivate,
  onCollapse,
}: {
  skill: Skill
  expanded: boolean
  onActivate: () => void
  onCollapse: () => void
}) {
  return (
    <li
      onMouseEnter={onActivate}
      onMouseLeave={onCollapse}
      className="border-b border-border/40 last:border-b-0"
    >
      <button
        type="button"
        aria-expanded={expanded}
        onFocus={onActivate}
        onBlur={onCollapse}
        onClick={() => (expanded ? onCollapse() : onActivate())}
        className="group flex w-full items-center justify-between gap-3 py-2.5 text-left outline-none"
      >
        <span
          className={cn(
            "text-sm transition-colors duration-300",
            expanded
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground/80 group-focus-visible:text-foreground/80",
          )}
        >
          {skill.name}
        </span>
        {/* Small green indicator that fades in LAST on expand (delayed), and
            fades out immediately on collapse. */}
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full transition-all duration-200 ease-out",
            expanded
              ? "scale-100 bg-primary opacity-100 delay-200"
              : "scale-75 bg-muted-foreground/40 opacity-0 group-hover:opacity-60",
          )}
        />
      </button>

      {/* Expandable context — grid-rows trick gives a smooth height transition
          without measuring. Only one item is ever open at a time. The accent
          line grows downward, the details fade in, and the dot (above) lands
          last for a calm, staggered reveal. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative pb-3 pl-3">
            {/* Left accent line, scaled from the top so it appears to draw
                downward as the panel opens. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 h-full w-px origin-top bg-primary/40 transition-transform duration-300 ease-out",
                expanded ? "scale-y-100" : "scale-y-0",
              )}
            />
            <div
              className={cn(
                "transition-opacity ease-out",
                expanded
                  ? "opacity-100 duration-200 delay-100"
                  : "opacity-0 duration-150",
              )}
            >
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-primary">
                {skill.context}
              </p>
              <ul className="flex flex-col gap-1.5">
                {skill.uses.map((use) => (
                  <li
                    key={use}
                    className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60"
                      aria-hidden="true"
                    />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
