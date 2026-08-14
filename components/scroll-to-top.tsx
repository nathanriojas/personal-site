"use client"

/**
 * A "return to true top" control, used for the brand/logo on /websites and
 * every concept site, plus the /websites footer's "Back to top."
 *
 * Deliberately NOT an href="#top" anchor. This site sets a global
 * `scroll-padding-top` on <html> (globals.css) so in-page anchors land below
 * the main portfolio's fixed nav — but that reserved offset doesn't match
 * every page's own header height (the concept sites in particular vary a lot),
 * so anchor-based "top" links left a stray gap of empty background above the
 * content on some pages. A direct `scrollTo({ top: 0 })` sidesteps that
 * mismatch entirely: it always reaches pixel 0, independent of any anchor
 * offset math, sticky-header compensation, or per-page layout.
 *
 * Rendered as a <button>, not a link — this performs an action on the current
 * page rather than navigating to a resource, so a button is the correct
 * semantic + keyboard-accessible element (and avoids polluting the URL with a
 * bare `#`).
 */
import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ScrollToTop({
  children,
  className,
  style,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Set when the visible children are multiple text nodes that would
   *  otherwise concatenate without a separator for assistive tech. */
  ariaLabel?: string
}) {
  function handleClick() {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    // Explicit "instant" (not "auto") — this site sets `scroll-behavior: smooth`
    // globally on <html>, and "auto" defers to that CSS property rather than
    // forcing a jump, so it wouldn't actually respect reduced-motion. "instant"
    // always overrides the CSS behavior, per spec.
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      // A native <button> doesn't get `cursor: pointer` or a visible focus
      // ring for free the way an <a> does — every caller of this component
      // (the /websites nav brand, its footer "Back to top," and each concept
      // site's wordmark) was otherwise indistinguishable from static text.
      // The outline (not a ring) is deliberate: this component is used both
      // inside `.websites-theme` (where design tokens exist) and inside the
      // concept pages (plain hex colors, no tokens), so `currentColor` via
      // `outline` reads correctly in every context without per-caller tuning.
      className={cn(
        "cursor-pointer rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
