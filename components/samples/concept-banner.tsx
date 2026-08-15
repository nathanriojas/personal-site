import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * A slim, honest strip shown at the very top of every sample/concept site,
 * making clear it's a design concept — not a real business — with a way back to
 * the examples gallery specifically (not just the top of /websites), so someone
 * can browse Restaurant → Back to examples → Contractor → … without losing
 * their place each time. Styling is passed per concept so the strip fits each
 * design instead of breaking its mood. It scrolls away with the page (not
 * sticky), so it never fights the experience.
 */
export function ConceptBanner({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-4 py-2 text-center text-[12px] leading-tight",
        className,
      )}
    >
      <span>Concept site — a sample design by Nathan Riojas, not a real business.</span>
      <Link
        href="/websites#examples"
        className={cn(
          "rounded-sm font-medium underline underline-offset-2 outline-none transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          linkClassName,
        )}
      >
        ← Back to examples
      </Link>
    </div>
  )
}
