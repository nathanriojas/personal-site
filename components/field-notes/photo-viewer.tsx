"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { photos, photoDate } from "@/lib/field-notes"

type PhotoViewerProps = {
  /** Index into `photos`, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * A premium, near-fullscreen viewing experience. The image is the focus; the
 * interface all but disappears into deep charcoal. ESC closes, arrow keys and
 * on-screen chevrons navigate, and horizontal swipes work on touch.
 */
export function PhotoViewer({ index, onClose, onNavigate }: PhotoViewerProps) {
  const open = index !== null
  const photo = open ? photos[index] : null
  const touchStartX = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  // Zoom + pan state. scale === 1 is the default "fit" view; clicking the photo
  // toggles a magnified view, which can then be dragged to pan.
  const ZOOM = 2.5
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [dragging, setDragging] = useState(false)
  const figureRef = useRef<HTMLElement | null>(null)
  const drag = useRef({ active: false, sx: 0, sy: 0, btx: 0, bty: 0, moved: false })

  // Reset the zoom whenever the photo changes (navigation) so each image opens
  // fresh at fit.
  useEffect(() => {
    setScale(1)
    setTx(0)
    setTy(0)
  }, [index])

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + photos.length) % photos.length)
  }, [index, onNavigate])

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % photos.length)
  }, [index, onNavigate])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose, goPrev, goNext])

  // Lock body scroll while open and move focus into the dialog.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open || !photo) return null

  function onTouchStart(e: React.TouchEvent) {
    if (scale > 1) return // zoomed: the photo pans instead of navigating
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (scale > 1 || touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev()
      else goNext()
    }
    touchStartX.current = null
  }

  // Keep the panned image from drifting past its own edges: the pan is clamped so
  // the magnified photo always covers the stage in whichever axis it overflows.
  function clampPan(nx: number, ny: number, s: number, imgW: number, imgH: number) {
    const fig = figureRef.current
    const stageW = fig?.clientWidth ?? 0
    const stageH = fig?.clientHeight ?? 0
    const maxX = Math.max(0, (imgW * s - stageW) / 2)
    const maxY = Math.max(0, (imgH * s - stageH) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, nx)),
      y: Math.min(maxY, Math.max(-maxY, ny)),
    }
  }

  // Click the photo to toggle zoom. A click that followed a pan-drag is swallowed
  // so panning never accidentally zooms out. stopPropagation so the photo itself
  // never closes the viewer — only the dark space around it does.
  function onImageClick(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation()
    if (drag.current.moved) {
      drag.current.moved = false
      return
    }
    if (scale > 1) {
      setScale(1)
      setTx(0)
      setTy(0)
      return
    }
    const img = e.currentTarget
    const w = img.offsetWidth
    const h = img.offsetHeight
    // Never magnify past the file's native resolution.
    const maxScale = Math.min(photo!.width / w, photo!.height / h)
    if (maxScale <= 1.1) return // already near native — nothing to gain
    const s = Math.min(ZOOM, maxScale)
    // Zoom toward the point clicked, then clamp within the image's edges.
    const rect = img.getBoundingClientRect()
    const cx = e.clientX - (rect.left + rect.width / 2)
    const cy = e.clientY - (rect.top + rect.height / 2)
    const { x, y } = clampPan(-cx * (s - 1), -cy * (s - 1), s, w, h)
    setScale(s)
    setTx(x)
    setTy(y)
  }

  function onImagePointerDown(e: React.PointerEvent<HTMLImageElement>) {
    if (scale <= 1) return
    drag.current = {
      active: true,
      sx: e.clientX,
      sy: e.clientY,
      btx: tx,
      bty: ty,
      moved: false,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragging(true)
  }

  function onImagePointerMove(e: React.PointerEvent<HTMLImageElement>) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.sx
    const dy = e.clientY - drag.current.sy
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true
    const img = e.currentTarget
    const { x, y } = clampPan(
      drag.current.btx + dx,
      drag.current.bty + dy,
      scale,
      img.offsetWidth,
      img.offsetHeight,
    )
    setTx(x)
    setTy(y)
  }

  function onImagePointerUp(e: React.PointerEvent<HTMLImageElement>) {
    if (!drag.current.active) return
    drag.current.active = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    setDragging(false)
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.location}, ${photo.place}`}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex animate-viewer-in flex-col bg-[oklch(0.11_0.004_240)]/95 outline-none backdrop-blur-xl"
    >
      {/* Top bar: counter + close — clicks here shouldn't dismiss the viewer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-5 py-4 sm:px-8"
      >
        <span className="font-mono text-xs tabular-nums tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-muted-foreground/40">/</span>{" "}
          {String(photos.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close (Esc)"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Image stage — the photograph claims the whole area between the top bar
          and the caption. Modest padding (room for the chevrons) so a landscape
          nearly fills the width and a portrait nearly fills the height. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-4 sm:px-20 sm:py-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="Previous photograph"
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-muted-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground sm:block"
        >
          <ChevronLeft className="size-7" />
        </button>

        {/* The print rests stable in the dark. The figure has NO click handler,
            so clicking the dark space around the photo closes the viewer. When
            magnified it clips the overflow to the stage so the image never covers
            the top bar or caption. */}
        <figure
          ref={figureRef}
          // size-full gives the figure the stage's DEFINITE height, so the
          // image's max-h-full below can actually resolve against it (a percentage
          // max-height needs a definite parent height in flex layouts).
          className="flex size-full items-center justify-center"
          style={{ overflow: scale > 1 ? "hidden" : "visible" }}
        >
          {/* Zoom/pan lives on this wrapper so it never collides with the image's
              own entrance-reveal transform. */}
          <div
            className="flex size-full items-center justify-center"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transition: dragging
                ? "none"
                : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              key={photo.id}
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 92vw, 100vw"
              priority
              quality={90}
              onClick={onImageClick}
              onPointerDown={onImagePointerDown}
              onPointerMove={onImagePointerMove}
              onPointerUp={onImagePointerUp}
              onPointerCancel={onImagePointerUp}
              draggable={false}
              // Grow as large as the stage allows in BOTH orientations — a portrait
              // fills the height, a landscape fills the width — while NEVER
              // upscaling past native pixels and NEVER cropping or distorting.
              // min(nativePx, 100%) caps each axis at the smaller of the file's true
              // resolution and the available stage (the wrapper is size-full, so
              // 100% is definite); object-contain preserves the aspect ratio.
              style={{
                maxWidth: `min(${photo.width}px, 100%)`,
                maxHeight: `min(${photo.height}px, 100%)`,
              }}
              className={`h-auto w-auto animate-image-reveal rounded-xl object-contain shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85)] ${
                scale > 1
                  ? dragging
                    ? "cursor-grabbing touch-none"
                    : "cursor-grab touch-none"
                  : "cursor-zoom-in"
              }`}
            />
          </div>
        </figure>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="Next photograph"
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-muted-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground sm:block"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>

      {/* Museum plaque — sits snug beneath the print, quiet and centered, never
          competing with the photograph. No negative margin so it can never
          overlap the image on short viewports. */}
      <figcaption
        onClick={(e) => e.stopPropagation()}
        className="px-6 pb-8 pt-1 text-center sm:pb-10"
      >
        {/* Title resolves immediately with the photo. */}
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">
          {photo.location}
        </h2>
        {/* Location + date follow a beat later. Keyed by photo so it restarts. */}
        <p
          key={`${photo.id}-meta`}
          className="mt-1 animate-word-in text-xs text-muted-foreground"
          style={{ animationDelay: "0.12s" }}
        >
          {photo.place} · {photoDate(photo)}
        </p>
        {photo.observation ? (
          // The observation is written out word-by-word, like a field note. The
          // photo.id key forces a remount on every navigation, so an in-flight
          // reveal is cancelled and the new caption starts cleanly from word one.
          <p
            key={`${photo.id}-note`}
            className="mx-auto mt-2.5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground/80"
          >
            {photo.observation.split(" ").map((word, i, words) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="animate-word-in"
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  // Words begin after the meta line, spread across ~0.9s total.
                  animationDelay: `${0.28 + i * Math.min(0.07, 0.9 / words.length)}s`,
                }}
              >
                {i < words.length - 1 ? `${word} ` : word}
              </span>
            ))}
          </p>
        ) : null}
      </figcaption>
    </div>
  )
}
