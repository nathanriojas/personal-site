"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectGallery } from "@/components/project-gallery"
import { ImageInspector } from "@/components/image-inspector"
import { projectImages, projectsUi, type Project } from "@/content"

export function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const images = projectImages(project)
  const [imageIndex, setImageIndex] = useState(0)
  const [inspecting, setInspecting] = useState(false)

  // When switching projects the reset effect below runs after this render, so
  // for one frame imageIndex can exceed the new project's image count. Clamp it
  // here so the gallery/inspector never receive an out-of-bounds index.
  const safeIndex = Math.min(imageIndex, images.length - 1)

  // Returning to a different project resets to its first image and exits
  // inspection — so the gallery never opens on a stale figure.
  useEffect(() => {
    setImageIndex(0)
    setInspecting(false)
  }, [project.slug])

  const goImage = useCallback(
    (delta: number) => {
      setImageIndex((prev) => (prev + delta + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (images.length <= 1 || inspecting) return

    const interval = window.setInterval(() => {
      goImage(1)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [goImage, images.length, inspecting])

  // Context-aware keyboard handling, with a single source of truth so project
  // and image navigation never both respond to one key press:
  //   - Image inspection open → Left/Right navigate the current project's
  //     images (the on-screen carousel arrows handle this in the normal modal).
  //   - Normal project modal → Left/Right navigate between projects, even when
  //     the project has multiple carousel images.
  // j/k always move between projects. Esc exits inspection first, then closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault()
        if (inspecting) setInspecting(false)
        else onClose()
      } else if (e.key === "j" || e.key === "J") {
        e.preventDefault()
        onNext()
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault()
        onPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        if (inspecting) goImage(1)
        else onNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        if (inspecting) goImage(-1)
        else onPrev()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose, onNext, onPrev, goImage, inspecting])

  // Lock body scroll while open.
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // Move focus into the dialog on open.
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Simple focus trap.
  const handleTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onKeyDown={handleTab}
    >
      {/* Backdrop */}
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        tabIndex={-1}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Media */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-border bg-secondary">
          <ProjectGallery
            images={images}
            index={safeIndex}
            title={project.title}
            onPrev={() => goImage(-1)}
            onNext={() => goImage(1)}
            onInspect={() => setInspecting(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>

          <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
            {project.category}
          </span>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2
              id="project-modal-title"
              className="font-mono text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              {project.title}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">
            {project.role}
          </p>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>

          <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-foreground">
            {projectsUi.highlights}
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
            >
              {projectsUi.viewProject}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        {/* Footer nav */}
        <div className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3">
          <NavButton
            direction="prev"
            onClick={onPrev}
            label="Previous project"
          />
          <span className="font-mono text-xs text-muted-foreground">
            {index + 1} / {total}
          </span>
          <NavButton direction="next" onClick={onNext} label="Next project" />
        </div>
      </div>

      {/* Inspection mode renders above the modal, which stays mounted (and at
          its exact scroll position) underneath so closing returns the user
          right where they left off. */}
      {inspecting && (
        <ImageInspector
          images={images}
          index={safeIndex}
          title={project.title}
          onPrev={() => goImage(-1)}
          onNext={() => goImage(1)}
          onClose={() => setInspecting(false)}
        />
      )}
    </div>
  )
}

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next"
  onClick: () => void
  label: string
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary",
        direction === "next" && "flex-row-reverse",
      )}
    >
      <Icon className="size-4" />
      {direction === "prev" ? "Prev" : "Next"}
    </button>
  )
}
