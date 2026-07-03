"use client"

import { useEffect } from "react"

/**
 * Restores the portfolio scroll position when a visitor returns from Field
 * Notes via the return bookmark. The position is saved when they entered Field
 * Notes (from the hero caption); we only restore when the bookmark sets the
 * "pf-return" intent flag, so a normal fresh visit always starts at the top.
 *
 * This runs as a one-shot, module-scoped routine rather than inside the effect
 * body so React Strict Mode's dev-only double-invoke (mount → cleanup → mount)
 * can't clear the stored intent or cancel the restore mid-flight.
 */
function runRestore() {
  let returning: string | null = null
  let saved: string | null = null
  try {
    returning = sessionStorage.getItem("pf-return")
    saved = sessionStorage.getItem("pf-scroll")
  } catch {
    return
  }
  if (returning !== "1" || saved === null) return

  const target = Number.parseInt(saved, 10)
  // Consume the intent so a manual reload doesn't re-trigger a jump.
  try {
    sessionStorage.removeItem("pf-return")
    sessionStorage.removeItem("pf-scroll")
  } catch {
    // ignore
  }
  if (Number.isNaN(target)) return

  // Take over scroll handling so the browser doesn't fight the restore.
  const prevRestoration =
    typeof history !== "undefined" && "scrollRestoration" in history
      ? history.scrollRestoration
      : undefined
  if (typeof history !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }

  // The page (hero, images, sections) may not be laid out on the first frame,
  // which would clamp the scroll to a tiny value. Keep nudging toward the
  // target until it's reachable and applied, or a time budget elapses.
  const start = performance.now()
  const BUDGET_MS = 1500

  const tick = (now: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const goal = Math.min(target, Math.max(maxScroll, 0))
    // "instant" forces a synchronous jump, overriding the global CSS
    // `scroll-behavior: smooth` (which would otherwise animate the restore).
    window.scrollTo({ top: goal, behavior: "instant" as ScrollBehavior })

    const reached = Math.abs(window.scrollY - target) <= 2
    const docTallEnough = maxScroll >= target
    if ((reached && docTallEnough) || now - start > BUDGET_MS) {
      if (
        typeof history !== "undefined" &&
        "scrollRestoration" in history &&
        prevRestoration
      ) {
        history.scrollRestoration = prevRestoration
      }
      return
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export function ScrollRestorer() {
  useEffect(() => {
    runRestore()
  }, [])

  return null
}
