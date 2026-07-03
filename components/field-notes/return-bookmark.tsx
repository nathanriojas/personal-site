"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

/**
 * A thin vertical "bookmark" tucked against the left edge of the viewport —
 * like a ribbon sticking out of a hardcover photography book. It fades in
 * after the visitor scrolls into Field Notes, slides out on hover, and on
 * click fades to charcoal before returning to the portfolio, restoring the
 * exact scroll position the visitor left from.
 */
export function ReturnBookmark() {
  const router = useRouter()
  const [shown, setShown] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // Reveal immediately on mount (one tick later so the slide-in entrance still
  // plays) and keep it fixed throughout — visitors always see the way back.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  function handleReturn() {
    try {
      // Signal the portfolio to restore the saved scroll position on arrival.
      sessionStorage.setItem("pf-return", "1")
    } catch {
      // ignore storage failures
    }
    setLeaving(true)
    // Let the fade play, then navigate back to the portfolio. `scroll: false`
    // keeps Next.js from resetting to the top so ScrollRestorer can take over.
    window.setTimeout(() => router.push("/", { scroll: false }), 320)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleReturn}
        aria-label="Return to the engineering portfolio"
        className={`group fixed left-0 top-1/2 z-[80] flex -translate-y-1/2 items-center justify-center gap-0 rounded-r-lg border border-l-0 border-primary/30 bg-background/80 py-2.5 pl-1 pr-1.5 shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-500 ease-out hover:bg-background/90 sm:gap-2 sm:rounded-r-xl sm:py-4 sm:pl-2 sm:pr-3 sm:hover:pr-4 ${
          shown
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <ArrowLeft className="size-4 shrink-0 text-primary transition-transform duration-500 group-hover:-translate-x-0.5" />
        {/* Vertical label that reads bottom-to-top like a book spine. Hidden on
            mobile so only the arrow shows, keeping the photos unobstructed. */}
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-500 [writing-mode:vertical-rl] group-hover:text-foreground sm:inline-block">
          Portfolio
        </span>
      </button>

      {/* Cinematic fade to charcoal on the way out */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[130] bg-background transition-opacity duration-300 ${
          leaving ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  )
}
