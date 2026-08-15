/**
 * Footer for /websites: a link to the engineering portfolio (worded so it
 * makes sense whether or not the visitor arrived from there), a true
 * back-to-top control, and the quiet credit line.
 */
import Link from "next/link"
import { ArrowLeft, ArrowUp } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { site, websitesFooter } from "@/content"

export function WebsitesFooter() {
  return (
    <footer className="mt-8 border-t border-border py-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          {websitesFooter.engineeringLink}
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <ScrollToTop className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            {websitesFooter.backToTop}
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </ScrollToTop>
          <p className="text-sm text-muted-foreground/70">
            {websitesFooter.credit} {site.name}.
          </p>
        </div>
      </div>
    </footer>
  )
}
