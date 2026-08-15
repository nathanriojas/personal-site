import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Shared form-control styling and the labelled `Field` wrapper, used by both the
 * contact form and the website-inquiry form so the two stay visually identical.
 *
 * The control surface is deliberately barely-there — no heavy borders or white
 * boxes — lifting on hover and picking up the emerald accent on focus.
 */
export function controlClass(hasError?: boolean) {
  return cn(
    "w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-sm text-foreground shadow-sm shadow-black/20 outline-none transition-[color,background-color,border-color,box-shadow] duration-300 placeholder:text-muted-foreground/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-destructive/50 focus:border-destructive/60 focus:ring-destructive/15"
      : "border-white/10 hover:border-white/20 hover:bg-white/[0.035] focus:border-primary/50 focus:bg-white/[0.05] focus:ring-primary/15",
  )
}

/** A labelled field: mono uppercase label, the control, and an inline error. */
export function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
        {optional ? (
          <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/60">
            optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive/90">
          {error}
        </p>
      ) : null}
    </div>
  )
}
