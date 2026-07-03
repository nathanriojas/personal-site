"use client"

/**
 * Fixed top navigation: a scroll-progress bar, the docked "Nathan." logo slot,
 * in-page anchor links with active-section scrollspy, and a Resume button. Nav
 * items and labels come from content/navigation.ts.
 */
import { useEffect, useRef, useState } from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { nav, site, chrome } from "@/content"

export function TopNav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string>("top")
  const listRef = useRef<HTMLUListElement | null>(null)

  // Scroll progress bar.
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scrollspy. Include the hero ("top") so the logo highlights on the banner.
  useEffect(() => {
    const sections = ["top", ...nav.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Keep the active chip in view within the scrollable nav (mobile).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector<HTMLElement>(`[data-nav="${active}"]`)
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" })
  }, [active])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress */}
      <div className="h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-12">
          <a
            href="#top"
            aria-current={active === "top" ? "true" : undefined}
            className={cn(
              "relative shrink-0 rounded-full px-3 py-1.5 font-mono text-sm font-semibold tracking-tight transition-colors duration-300",
              active === "top" ? "text-primary" : "text-foreground",
            )}
            aria-label={`${site.name.split(" ")[0]} — back to top`}
          >
            {/* Highlight pill fades in with the flying name's dock progress,
                so there's no empty capsule before "Nathan." arrives. */}
            <span
              className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
              style={{ opacity: "var(--nav-name-dock, 0)" }}
              aria-hidden="true"
            />
            {/* Dock target for the flying-name overlay. Kept invisible so the
                overlay's "Nathan." lands exactly here; reserves layout width. */}
            <span id="nav-name-anchor" className="relative" style={{ opacity: 0 }}>
              {site.name.split(" ")[0]}
              <span className="text-primary">.</span>
            </span>
          </a>

          <nav
            aria-label="In-page navigation"
            className="min-w-0 flex-1"
          >
            <ul
              ref={listRef}
              className="flex items-center gap-1 overflow-x-auto sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {nav.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={`#${item.id}`}
                      data-nav={item.id}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive ? (
                        <span
                          className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors duration-300 hover:bg-primary/20 sm:inline-flex"
          >
            <FileText className="size-3.5" />
            {chrome.resume}
          </a>
        </div>
      </div>
    </header>
  )
}
