"use client"

import Link from "next/link"
import { heroCaption } from "@/content"

/**
 * The hero photograph's "museum plaque" — the only intentional entry point
 * into Field Notes. It quietly titles the Uyuni photo and offers a secondary
 * invitation to explore, rewarding curiosity rather than demanding attention.
 *
 * On click it records the current scroll position so the return "bookmark"
 * inside Field Notes can drop the visitor back exactly where they left.
 */
export function HeroCaption() {
  function rememberScroll() {
    try {
      sessionStorage.setItem("pf-scroll", String(window.scrollY))
    } catch {
      // sessionStorage can be unavailable (private mode); navigation still works.
    }
  }

  return (
    <Link
      href="/field-notes"
      onClick={rememberScroll}
      aria-label={heroCaption.ariaLabel}
      className="group absolute bottom-8 right-6 z-10 max-w-[11rem] animate-plaque-in border-l border-border/60 pl-3 text-right sm:bottom-10 sm:right-10"
    >
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/85 sm:text-[11px]">
        {heroCaption.title}
      </span>
      <span className="mt-0.5 block text-[10px] text-muted-foreground/80 sm:text-[11px]">
        {heroCaption.meta}
      </span>
      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] tracking-wide text-primary/80">
        {heroCaption.cta}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  )
}
