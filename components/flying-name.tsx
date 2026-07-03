"use client"

import { useEffect, useRef } from "react"
import { site } from "@/content"

const firstName = site.name.split(" ")[0]

/**
 * Scroll-scrubbed name transition.
 *
 * Paints a single fixed "Nathan." that, at the top of the page, sits exactly
 * over the hero headline's first name. As the user scrolls past the hero it
 * travels and shrinks until it docks precisely over the nav logo slot,
 * becoming the pinned "Nathan." reference. Position/size are interpolated
 * live from the two invisible anchors (#hero-name-anchor / #nav-name-anchor),
 * so it works across breakpoints and reverses on scroll up.
 */
export function FlyingName() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const dot = dotRef.current
    if (!overlay || !dot) return

    let frame = 0

    const update = () => {
      frame = 0
      const heroAnchor = document.getElementById("hero-name-anchor")
      const navAnchor = document.getElementById("nav-name-anchor")
      if (!heroAnchor || !navAnchor) {
        overlay.style.opacity = "0"
        return
      }

      // Progress: 0 at the top of the hero, 1 once docked in the nav.
      const dock = window.innerHeight * 0.55
      const p = Math.min(Math.max(window.scrollY / dock, 0), 1)
      // Ease for a smoother settle near the dock.
      const eased = 1 - Math.pow(1 - p, 3)

      const hero = heroAnchor.getBoundingClientRect()
      const navRect = navAnchor.getBoundingClientRect()

      const startFs = Number.parseFloat(getComputedStyle(heroAnchor).fontSize)
      const endFs = Number.parseFloat(getComputedStyle(navAnchor).fontSize)
      const scale = (startFs + (endFs - startFs) * eased) / startFs

      const x = hero.left + (navRect.left - hero.left) * eased
      const y = hero.top + (navRect.top - hero.top) * eased

      overlay.style.fontSize = `${startFs}px`
      overlay.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      overlay.style.opacity = "1"
      // The period fades in as the full name ("... Riojas") scrolls away.
      const docked = Math.min(Math.max((p - 0.55) / 0.45, 0), 1)
      dot.style.opacity = `${docked}`
      // Publish dock progress so the nav highlight pill fades in exactly as
      // the name settles into its slot (no empty capsule on the hero).
      document.documentElement.style.setProperty("--nav-name-dock", `${docked}`)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    // Re-measure after fonts settle to avoid first-paint misalignment.
    const t = window.setTimeout(update, 250)
    if (document.fonts?.ready) document.fonts.ready.then(update).catch(() => {})

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.clearTimeout(t)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{ transformOrigin: "top left", opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[60] whitespace-nowrap font-mono font-semibold tracking-tight text-foreground will-change-transform"
    >
      {firstName}
      <span ref={dotRef} className="text-primary" style={{ opacity: 0 }}>
        .
      </span>
    </div>
  )
}
