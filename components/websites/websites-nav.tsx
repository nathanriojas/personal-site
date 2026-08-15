"use client"

/**
 * Header for /websites — warm and quiet, restrained by design. The wordmark
 * returns to the true top of /websites itself (this page's "home"). Not the
 * portfolio's scrollspy TopNav.
 *
 * "Portfolio" used to sit in this nav pointing at the engineering site, but on
 * a page about building *other people's* websites a visitor could reasonably
 * read it as "Nathan's portfolio of client sites." Explicit, unambiguous
 * engineering links already exist in the intro ("See my engineering work")
 * and the footer, so this nav doesn't carry a third, vaguer one.
 *
 * Responsive split (md = 768px):
 *   ≥ md  brand · Examples · Pricing · FAQ · [Start a project]
 *   < md  brand · [menu]   — section links AND the CTA move into the panel.
 *
 * Below md the CTA pill is deliberately NOT kept in the header row: brand +
 * three links + a filled pill could not fit on a ~375px screen without
 * wrapping "Nathan Riojas" onto two lines, which looked broken. Dropping the
 * pill from the bar costs nothing, because the hero immediately below carries
 * a prominent "Start a project" CTA — so the action is still one screen away
 * at all times. Inside the panel it keeps its filled treatment so it stays the
 * obvious primary action.
 *
 * The panel is always in the DOM (visibility toggled via CSS, not
 * mounted/unmounted) so `aria-controls` always resolves to a real element.
 */
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { cn } from "@/lib/utils"
import { websitesNav } from "@/content"

export function WebsitesNav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Escape closes the panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3.5 sm:px-8">
        <ScrollToTop
          // `whitespace-nowrap` keeps "Nathan Riojas" on one line at narrow
          // widths; the smaller "Websites" qualifier is allowed to drop away
          // below 380px rather than forcing the brand to wrap or shrink.
          className="inline-flex items-baseline gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-80"
          ariaLabel={`${websitesNav.brand} — ${websitesNav.context}, back to top`}
        >
          <span className="font-display text-lg font-medium tracking-tight text-foreground">
            {websitesNav.brand}
          </span>
          <span className="hidden text-xs text-muted-foreground min-[380px]:inline">
            {websitesNav.context}
          </span>
        </ScrollToTop>

        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label={websitesNav.navLabel} className="hidden items-center gap-1 md:flex">
            {websitesNav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={websitesNav.ctaHref}
            className="hidden items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
          >
            {websitesNav.cta}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="websites-mobile-nav"
            aria-label={open ? websitesNav.menuClose : websitesNav.menuOpen}
            className="-mr-1.5 inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="websites-mobile-nav"
        aria-label={websitesNav.navLabel}
        className={cn("border-t border-border md:hidden", open ? "block" : "hidden")}
      >
        <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-3 sm:px-8">
          {websitesNav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-1">
            <a
              href={websitesNav.ctaHref}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {websitesNav.cta}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
