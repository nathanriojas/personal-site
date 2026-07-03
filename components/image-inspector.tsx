"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const MIN_SCALE = 1
const MAX_SCALE = 6

type Point = { x: number; y: number }

/**
 * Full-viewport inspection mode for project imagery. Renders above the project
 * modal (which stays mounted underneath), dims — but does not hide — the modal,
 * and lets the user zoom (wheel / trackpad / pinch) and pan a figure at its
 * native resolution. Left/Right navigate between the project's images; Esc,
 * an outside click, or the close button dismiss it. Designed to feel like
 * studying figures in a technical paper, not a generic photo lightbox.
 */
export function ImageInspector({
  images,
  index,
  title,
  onPrev,
  onNext,
  onClose,
}: {
  images: string[]
  index: number
  title: string
  onPrev: () => void
  onNext: () => void
  onClose: () => void
}) {
  const src = images[index]
  const hasMultiple = images.length > 1

  const rootRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 })
  // Native pixel size of the current image, used to never upscale past it.
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)

  // Active pointers for drag-pan and pinch-zoom.
  const pointers = useRef<Map<number, Point>>(new Map())
  const panStart = useRef<{ pointer: Point; translate: Point } | null>(null)
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null)
  // Tracks whether the pointer moved meaningfully, so a pan/pinch release isn't
  // mistaken for a background click that would close the inspector.
  const movedRef = useRef(false)

  const reset = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  // Reset zoom/pan whenever the displayed image changes.
  useEffect(() => {
    reset()
    setNatural(null)
  }, [src, reset])

  // Center offset of the stage, used to zoom toward the cursor.
  function centerOffset(clientX: number, clientY: number): Point {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
    }
  }

  const zoomTo = useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale))
      setScale((prev) => {
        if (clamped === prev) return prev
        const c = centerOffset(clientX, clientY)
        setTranslate((t) => {
          if (clamped <= MIN_SCALE) return { x: 0, y: 0 }
          const ratio = clamped / prev
          return {
            x: c.x - ratio * (c.x - t.x),
            y: c.y - ratio * (c.y - t.y),
          }
        })
        return clamped
      })
    },
    [],
  )

  // Non-passive wheel zoom (so we can prevent page scroll).
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const factor = Math.exp(-e.deltaY * 0.0015)
      setScale((prev) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * factor))
        const c = centerOffset(e.clientX, e.clientY)
        setTranslate((t) => {
          if (next <= MIN_SCALE) return { x: 0, y: 0 }
          const ratio = next / prev
          return {
            x: c.x - ratio * (c.x - t.x),
            y: c.y - ratio * (c.y - t.y),
          }
        })
        return next
      })
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    movedRef.current = false
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinchStart.current = { dist: distance(a, b), scale }
      panStart.current = null
    } else if (scale > 1) {
      panStart.current = {
        pointer: { x: e.clientX, y: e.clientY },
        translate,
      }
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = distance(a, b)
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
      const next = pinchStart.current.scale * (dist / pinchStart.current.dist)
      movedRef.current = true
      zoomTo(next, mid.x, mid.y)
      return
    }

    if (panStart.current) {
      const dx = e.clientX - panStart.current.pointer.x
      const dy = e.clientY - panStart.current.pointer.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) movedRef.current = true
      setTranslate({
        x: panStart.current.translate.x + dx,
        y: panStart.current.translate.y + dy,
      })
    }
  }

  function endPointer(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) panStart.current = null
  }

  function onDoubleClick(e: React.MouseEvent) {
    if (scale > 1) reset()
    else zoomTo(2.5, e.clientX, e.clientY)
  }

  // Cap the rendered size at the image's native resolution so it is never
  // upscaled, while still fitting within ~90% of the viewport.
  const sizeStyle: React.CSSProperties = natural
    ? {
        maxWidth: `min(${natural.w}px, 90vw)`,
        maxHeight: `min(${natural.h}px, 90vh)`,
      }
    : { maxWidth: "90vw", maxHeight: "90vh" }

  const isSvg = src.endsWith(".svg")
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm")

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-[2px] animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image ${index + 1} of ${images.length}`}
    >
      {/* Zoom / pan stage. Clicking the darkened background (anywhere that is
          not the image itself) closes the inspector — matching the X and Esc.
          A click that follows a pan/pinch is ignored via movedRef. */}
      <div
        ref={rootRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={onDoubleClick}
        onClick={(e) => {
          if (e.target === e.currentTarget && !movedRef.current) onClose()
        }}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          cursor: scale > 1 ? "grab" : "zoom-out",
          touchAction: "none",
        }}
      >
        <div
          className="transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          }}
        >
          {isVideo ? (
            <video
              key={src}
              src={src}
              loop
              muted
              autoPlay
              playsInline
              draggable={false}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget
                if (v.videoWidth > 0) {
                  setNatural({ w: v.videoWidth, h: v.videoHeight })
                }
              }}
              style={sizeStyle}
              className="select-none rounded-lg object-contain shadow-2xl animate-in fade-in duration-300"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src || "/placeholder.svg"}
              alt={`${title} — figure ${index + 1}`}
              draggable={false}
              onLoad={(e) => {
                const img = e.currentTarget
                if (img.naturalWidth > 0 && !isSvg) {
                  setNatural({ w: img.naturalWidth, h: img.naturalHeight })
                }
              }}
              style={sizeStyle}
              className={`select-none rounded-lg object-contain shadow-2xl animate-in fade-in duration-300 ${
                isSvg ? "bg-white p-4" : ""
              }`}
            />
          )}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        <X className="size-4" />
      </button>

      {hasMultiple && (
        <>
          <InspectorArrow
            direction="prev"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
          />
          <InspectorArrow
            direction="next"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          />
          <span className="pointer-events-none absolute bottom-5 right-5 z-10 rounded-full bg-background/70 px-3 py-1 font-mono text-xs text-foreground backdrop-blur">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  )
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function InspectorArrow({
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
      className={`absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
    >
      <Icon className="size-5" />
    </button>
  )
}
