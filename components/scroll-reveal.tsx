"use client"

/**
 * Reveals its children with a gentle fade/rise the first time they scroll into
 * view (IntersectionObserver). Honors prefers-reduced-motion by showing them
 * immediately; an optional `delay` staggers grouped items.
 */
import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li" | "article"
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Component = Tag as React.ElementType

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        visible
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-6 scale-[0.97] opacity-0 blur-[3px] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:blur-0",
        className,
      )}
    >
      {children}
    </Component>
  )
}
