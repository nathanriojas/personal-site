/**
 * FAQ — native <details>/<summary> accordions: keyboard-accessible, zero client
 * JS. Restyled for the light page. Data from content/websites.ts.
 */
import { Plus } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesFaq } from "@/content"

export function Faq() {
  return (
    <ul className="flex flex-col border-t border-border">
      {websitesFaq.items.map((item, i) => (
        <ScrollReveal as="li" key={item.q} delay={i * 35}>
          <details className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              <span className="text-[17px] font-medium">{item.q}</span>
              <Plus
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-2xl pb-6 text-pretty leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        </ScrollReveal>
      ))}
    </ul>
  )
}
