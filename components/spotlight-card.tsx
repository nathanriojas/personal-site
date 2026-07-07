"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

/**
 * A card wrapper that renders a subtle emerald spotlight following the cursor,
 * plus an optional magnetic 3D tilt. Pointer effects are disabled for users
 * who prefer reduced motion.
 */
export function SpotlightCard({
  children,
  className,
  as = "div",
  tilt = false,
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "article"
  tilt?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reducedRef = useRef<boolean | null>(null)

  function prefersReduced() {
    if (reducedRef.current === null) {
      reducedRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    }
    return reducedRef.current
  }

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--spot-x", `${x}px`)
    el.style.setProperty("--spot-y", `${y}px`)

    if (tilt && !prefersReduced()) {
      const px = x / rect.width - 0.5
      const py = y / rect.height - 0.5
      // Gentle tilt; max ~6deg.
      el.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`)
      el.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`)
    }
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  const Component = as as React.ElementType

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? {
              transform:
                "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
              transition: "transform 200ms ease-out",
            }
          : undefined
      }
      className={cn("group/spot relative overflow-hidden", className)}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), oklch(0.72 0.13 165 / 0.12), transparent 70%)",
        }}
      />
      {/* Glowing border that tracks the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), oklch(0.72 0.13 165 / 0.35), transparent 60%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  )
}
