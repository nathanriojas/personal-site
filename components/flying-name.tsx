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

      // Measure the two invisible anchors by their GLYPH boxes (via a Range),
      // not their element boxes. An inline span's box and the block overlay's
      // line box position letters at different heights, so element-box matching
      // left the two name halves visibly uneven. Glyph-to-glyph is exact.
      const heroRange = document.createRange()
      heroRange.selectNodeContents(heroAnchor)
      const heroG = heroRange.getBoundingClientRect()
      const navRange = document.createRange()
      navRange.selectNodeContents(navAnchor)
      const navG = navRange.getBoundingClientRect()

      const startFs = Number.parseFloat(getComputedStyle(heroAnchor).fontSize)
      const endFs = Number.parseFloat(getComputedStyle(navAnchor).fontSize)
      const scale = (startFs + (endFs - startFs) * eased) / startFs

      // Target letter position, interpolated hero → nav.
      const targetLeft = heroG.left + (navG.left - heroG.left) * eased
      const targetTop = heroG.top + (navG.top - heroG.top) * eased

      overlay.style.fontSize = `${startFs}px`
      overlay.style.opacity = "1"
      // Place at target, then read the overlay's own glyph box and correct by
      // the residual so the letters land exactly on target, whatever the font
      // metrics or line-height happen to be. (translate is in screen px, so a
      // single correction is exact even with the scale applied.)
      overlay.style.transform = `translate(${targetLeft}px, ${targetTop}px) scale(${scale})`
      const ovRange = document.createRange()
      ovRange.selectNodeContents(overlay)
      const ovG = ovRange.getBoundingClientRect()
      const x = targetLeft + (targetLeft - ovG.left)
      const y = targetTop + (targetTop - ovG.top)
      overlay.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
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
      className="pointer-events-none fixed left-0 top-0 z-[60] whitespace-nowrap font-mono font-semibold leading-none tracking-tight text-foreground will-change-transform"
    >
      {firstName}
      <span ref={dotRef} className="text-primary" style={{ opacity: 0 }}>
        .
      </span>
    </div>
  )
}
