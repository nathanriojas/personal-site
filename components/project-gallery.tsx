"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectMedia } from "@/components/project-media"

function isInspectable(_src: string) {
  // All project media — images and looping video alike — can be opened in
  // inspection mode.
  return true
}

/**
 * The media area inside the project modal. With a single source it behaves
 * exactly as before. With several it adds understated on-image arrows, a quiet
 * counter, keyboard/swipe support (handled by the modal), and a soft crossfade
 * between figures — closer to flipping through figures in a paper than a
 * gallery. Clicking an inspectable image opens full inspection mode.
 */
export function ProjectGallery({
  images,
  index,
  title,
  onPrev,
  onNext,
  onInspect,
}: {
  images: string[]
  index: number
  title: string
  onPrev: () => void
  onNext: () => void
  onInspect: () => void
}) {
  const src = images[index]
  const hasMultiple = images.length > 1
  const inspectable = isInspectable(src)

  return (
    <>
      {/* Crossfade: the keyed wrapper remounts per image so it fades in. */}
      <button
        key={src}
        type="button"
        onClick={inspectable ? onInspect : undefined}
        aria-label={inspectable ? `Inspect ${title} image` : undefined}
        tabIndex={inspectable ? 0 : -1}
        className={`absolute inset-0 animate-in fade-in duration-300 ${
          inspectable ? "cursor-zoom-in" : "cursor-default"
        }`}
      >
        <ProjectMedia
          src={src}
          alt={`${title} preview ${index + 1}`}
          sizes="(max-width: 768px) 100vw, 672px"
          priority
        />
      </button>

      {hasMultiple && (
        <>
          <GalleryArrow
            direction="prev"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
          />
          <GalleryArrow
            direction="next"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[10px] tracking-widest text-foreground backdrop-blur">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </>
  )
}

function GalleryArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: (e: React.MouseEvent) => void
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary ${
        direction === "prev" ? "left-3" : "right-3"
      }`}
    >
      <Icon className="size-4" />
    </button>
  )
}
