"use client"

/**
 * Fixed, full-viewport ambient lighting behind the whole site: soft radial
 * glows, slow-drifting aurora ribbons, and a scroll-tracked spotlight. The
 * accent hue cross-fades to match the section currently in view. Decorative.
 */
import { useEffect, useRef } from "react"

// Per-section accent hues. Mirrors the section accents in content/navigation.ts
// so the ambient lighting shifts color in sync with the section you're viewing.
const SECTION_ACCENTS: Record<string, string> = {
  top: "oklch(0.72 0.13 165)", // hero — emerald (brand)
  about: "oklch(0.72 0.13 165)", // emerald
  projects: "oklch(0.72 0.11 230)", // muted blue
  experience: "oklch(0.78 0.12 80)", // amber
  skills: "oklch(0.74 0.1 195)", // teal
  contact: "oklch(0.72 0.13 18)", // soft rose
}

const SECTION_IDS = Object.keys(SECTION_ACCENTS)

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  // (3 / color) Track the active section and cross-fade the lighting hue.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    let active = "top"
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id !== active && SECTION_ACCENTS[id]) {
              active = id
              root.style.setProperty("--ambient-accent", SECTION_ACCENTS[id])
            }
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // (3) Move the spotlight vertically with scroll progress (rAF-throttled).
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      root.style.setProperty("--ambient-y", "35%")
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      // Spotlight drifts from 22% (top) down to 78% (bottom) of the viewport.
      const y = 22 + progress * 56
      root.style.setProperty("--ambient-y", `${y}%`)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={rootRef} className="ambient-bg" aria-hidden="true">
      {/* (1) Ambient radial edge lighting */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-bottom" />
      {/* Aurora gradient mesh — slow drifting ribbons that add depth */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      {/* (3) Scroll-tracked spotlight */}
      <div className="ambient-spotlight" />
    </div>
  )
}
