"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { photos, type Photo } from "@/lib/field-notes"
import { fieldNotes } from "@/content"
import { PhotoViewer } from "@/components/field-notes/photo-viewer"

// Responsive column count derived from the wall's own width. Wider monitors
// gain MORE columns rather than enlarging the prints — quality over size.
function columnsForWidth(w: number): number {
  if (w < 640) return 1
  if (w < 1024) return 2
  if (w < 1440) return 3
  if (w < 1920) return 4
  if (w < 2400) return 5
  return 6
}

// ---------------------------------------------------------------------------
// Hand-placed feel. A curated wall, not a Pinterest feed. The grid is broken by
// four independent, DETERMINISTIC scatters keyed off each print's stable index.
// Every sequence length is coprime with the 1–6 column counts, so the scatters
// never phase-lock into a visible repeating pattern — and because they're keyed
// (not random), the wall is identical on every render and never jumps.
// ---------------------------------------------------------------------------

// How much of its column a print occupies. Most prints run nearly full-width so
// their true ASPECT RATIO drives their size (tall portraits get tall, wide
// landscapes stay wide); a deliberate sprinkle of narrower "insets" adds rhythm
// and — paired with the alignment scatter below — scatters the left/right edges
// so the eye stops reading rigid columns.
const FILL = [1, 0.82, 1, 0.75, 0.95, 1, 0.8, 0.9, 1, 0.72, 0.96]

// Where a narrower print sits inside its column slot. Full-width prints ignore
// this. Mixing left/right/centre is what actually dissolves the column edges.
const ALIGN: ("c" | "l" | "r")[] = ["c", "l", "r", "c", "r", "l", "c"]

// A few pixels of horizontal drift — some prints breach the invisible column
// boundary by a hair. Kept tiny so images never collide across the gutter.
const SHIFT_X = [0, 10, -8, 0, 7, -13, 0, 9, -6, 0, 12, -9, 5]

// Barely-there tilt on the occasional print, as if nudged by hand on the wall.
const ROTATIONS = [0, 0, 0, -0.7, 0, 0, 0, 0, 0.8, 0, 0]

// Uneven vertical breathing room beneath each print so stacks never feel evenly
// engineered.
const BOTTOM_MARGINS = [40, 56, 44, 64, 40, 52, 48]

// Each column starts at a slightly different height so the TOP row never lines
// up into an obvious grid — the single most column-revealing moment on load.
// Column 0 stays at 0 because it is anchored by the intro block. Indexed by
// column, so it is stable regardless of how many columns are on screen.
const COLUMN_TOP = [0, 56, 24, 72, 16, 44]

// Relative-height bookkeeping for the balancer (all in column-width units).
const MARGIN_UNIT = 0.13 // ≈ the average gap beneath a print, in column widths
const INTRO_UNIT = 0.7 // the intro block's measured height (~250px) in column widths
const CW_ESTIMATE = 340 // px, to fold the pixel COLUMN_TOP offsets into units

// Fraction of its column a print fills. An explicit `scale` in the data wins;
// otherwise it comes straight from FILL. Kept intentionally free of any
// aspect-ratio special-casing so the balancer's height model and the rendered
// width are computed from the EXACT same number — tall portraits stay dramatic.
function widthFraction(photo: Photo, i: number): number {
  if (typeof photo.scale === "number") return photo.scale
  return FILL[i % FILL.length]
}

type Cell =
  | { type: "intro" }
  | { type: "photo"; photo: Photo; index: number }

type Item = { photo: Photo; index: number; h: number }

/** A print's height relative to a full column width (ratio-driven), plus its gap. */
function relHeight(photo: Photo, index: number): number {
  return (photo.height / photo.width) * widthFraction(photo, index) + MARGIN_UNIT
}

// The leading prints stay in reading order to anchor the first impression (the
// `order`-tagged images the author chose to feature land at the column tops);
// everything after is placed by the balancer below.
const PINNED = 8

/**
 * Deterministically distribute the intro + photos into N columns so the wall
 * reads as a curated collage with a balanced ending.
 *
 * 1. The intro anchors column 0; each column is seeded with its top offset so the
 *    pack accounts for the staggered starts.
 * 2. The first PINNED prints are placed in reading order (shortest-column-first),
 *    keeping the featured images at the tops.
 * 3. The rest are placed tallest-first into the currently shortest column (the
 *    Longest-Processing-Time rule). Because the biggest prints are committed while
 *    there is the most room to absorb them and the smallest settle last, the
 *    columns converge to within a fraction of a print of one another — the wall no
 *    longer ends with one column trailing hundreds of pixels behind, at ANY column
 *    count.
 *
 * All heights come from the data (never measured at runtime), so the layout is
 * stable on first paint — it cannot jump or leave packing holes once images load.
 */
function buildColumns(columnCount: number): Cell[][] {
  const columns = Array.from({ length: columnCount }, (_, c) => ({
    cells: [] as Cell[],
    height: COLUMN_TOP[c % COLUMN_TOP.length] / CW_ESTIMATE,
  }))

  // Intro anchors column 0 (upper-left); photos flow beside and beneath it.
  columns[0].cells.push({ type: "intro" })
  columns[0].height += INTRO_UNIT

  const place = (it: Item) => {
    let shortest = 0
    for (let c = 1; c < columnCount; c++) {
      if (columns[c].height < columns[shortest].height) shortest = c
    }
    columns[shortest].cells.push({ type: "photo", photo: it.photo, index: it.index })
    columns[shortest].height += it.h
  }

  const items: Item[] = photos.map((photo, index) => ({
    photo,
    index,
    h: relHeight(photo, index),
  }))

  items.slice(0, PINNED).forEach(place)
  items
    .slice(PINNED)
    .sort((a, b) => b.h - a.h)
    .forEach(place)

  return columns.map((c) => c.cells)
}

export function EditorialGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [columns, setColumns] = useState(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setColumns(columnsForWidth(el.clientWidth))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const columnCells = columns ? buildColumns(columns) : [buildColumns(1)[0]]

  return (
    <section
      aria-label="Photographs"
      // overflow-x-clip lets prints drift a few px into the gutters without ever
      // producing a horizontal scrollbar.
      className="mx-auto max-w-[150rem] overflow-x-clip px-6 pb-32 pt-24 sm:px-10 sm:pt-28"
    >
      <div ref={containerRef} className="flex items-start gap-10">
        {columnCells.map((cells, ci) => (
          <div
            key={ci}
            className="flex min-w-0 flex-1 flex-col"
            style={{ marginTop: COLUMN_TOP[ci % COLUMN_TOP.length] }}
          >
            {cells.map((cell) =>
              cell.type === "intro" ? (
                <IntroCell key="intro" />
              ) : (
                <GalleryItem
                  key={cell.photo.id}
                  delay={(cell.index % 4) * 80}
                  rotation={ROTATIONS[cell.index % ROTATIONS.length]}
                  marginBottom={
                    BOTTOM_MARGINS[cell.index % BOTTOM_MARGINS.length]
                  }
                >
                  <PrintFrame
                    fraction={widthFraction(cell.photo, cell.index)}
                    align={ALIGN[cell.index % ALIGN.length]}
                    shiftX={SHIFT_X[cell.index % SHIFT_X.length]}
                  >
                    <PrintButton
                      photo={cell.photo}
                      onOpen={() => setOpenIndex(cell.index)}
                    />
                  </PrintFrame>
                </GalleryItem>
              ),
            )}
          </div>
        ))}
      </div>

      <PhotoViewer
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}

/**
 * The Field Notes title, living INSIDE the collage as the first cell of the
 * upper-left column rather than as a centered page header. Photos appear next
 * to it (other columns) and beneath it (rest of this column).
 */
function IntroCell() {
  return (
    <header className="mb-12 pr-2">
      <p className="animate-intro font-mono text-xs uppercase tracking-[0.3em] text-primary/80">
        {fieldNotes.eyebrow}
      </p>
      <h1
        className="mt-4 animate-intro text-balance font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        style={{ animationDelay: "120ms" }}
      >
        {fieldNotes.title}
      </h1>
      <p
        className="mt-5 animate-intro text-pretty text-base leading-relaxed text-muted-foreground"
        style={{ animationDelay: "220ms" }}
      >
        {fieldNotes.lede}
      </p>
    </header>
  )
}

/**
 * Positions a print within its column slot: its fill width, its left/right/centre
 * alignment, and a few pixels of horizontal drift. This is the layer that breaks
 * the column edges — kept on its own element so its transform never collides with
 * the entrance/hover transforms nested inside it.
 */
function PrintFrame({
  children,
  fraction,
  align,
  shiftX,
}: {
  children: React.ReactNode
  fraction: number
  align: "c" | "l" | "r"
  shiftX: number
}) {
  const full = fraction >= 0.999
  return (
    <div
      style={{
        width: `${Math.round(fraction * 100)}%`,
        marginLeft: full || align === "l" ? 0 : "auto",
        marginRight: full || align === "r" ? 0 : "auto",
        transform: shiftX ? `translateX(${shiftX}px)` : undefined,
      }}
    >
      {children}
    </div>
  )
}

/** A single print: the image, native-resolution cap, and hover caption. */
function PrintButton({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${photo.location}, ${photo.place}`}
      className="group relative block w-full overflow-hidden rounded-lg outline-none transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Image
        src={photo.src || "/placeholder.svg"}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        // Never request more than the print can give: cap the rendered width at
        // the image's native pixel resolution.
        style={{ maxWidth: photo.width, margin: "0 auto" }}
        sizes="(min-width: 2400px) 16vw, (min-width: 1920px) 20vw, (min-width: 1440px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        // Only the IMAGE scales on hover — the caption is never transformed, so
        // its text stays perfectly sharp.
        className="h-auto w-full scale-100 brightness-[0.93] transition-[filter,box-shadow,transform] duration-500 ease-out group-hover:scale-[1.015] group-hover:brightness-105 group-hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)]"
      />
      {/* Hover caption — a soft dark gradient confined to the lower band gives
          the white text a consistent, readable backing on ANY photo, however
          bright. No blur, no card-like box; opacity + a 1px rise only. */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-1 items-end bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-3.5 pt-12 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white antialiased [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
          {photo.location}
        </span>
      </span>
    </button>
  )
}

/**
 * Wraps each print with a slow, restrained reveal as it scrolls into view, plus
 * a fixed hand-placed tilt and varied spacing beneath it. The tilt uses the
 * standalone `rotate` property and the reveal uses `transform`, so neither
 * collides with the horizontal drift applied by PrintFrame inside it.
 */
function GalleryItem({
  children,
  rotation,
  marginBottom,
  delay,
}: {
  children: React.ReactNode
  rotation: number
  marginBottom: number
  delay: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }
    // Pre-reveal anything already in — or peeking just below — the first
    // viewport so the opening screen reads as a continuous wall that clearly
    // continues below the fold, rather than a block that ends cleanly on load.
    // Prints deeper down keep the scroll-triggered reveal below.
    if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        // `rotate` is its own CSS property, so the static tilt never collides
        // with the entrance translate or the hover transform below it.
        rotate: `${rotation}deg`,
        marginBottom: `${marginBottom}px`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}
