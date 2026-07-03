// ---------------------------------------------------------------------------
// Field Notes — editable photo metadata.
//
// This is the single source of truth for the /field-notes experience. Field
// Notes is intentionally NOT organized into countries or collections: every
// photograph is treated as an individual moment. To add a new one, drop the
// image into /public/field-notes (or later an S3/CloudFront URL) and append a
// Photo below. Images can be stored in country subfolders, such as
// /public/field-notes/iceland/ or /public/field-notes/vietnam/, and the
// `src` paths in `lib/field-notes.ts` should reflect those folders.
// The editorial layout and SEO metadata adapt automatically — no
// redesign or extra configuration required.
//
// Each photo only needs: image, location, month, year, and an optional
// one-sentence observation. `width`/`height` are the intrinsic pixel
// dimensions so the layout can always respect the original composition
// (portrait, landscape, panoramic) and never crop to fit a uniform grid.
// ---------------------------------------------------------------------------

export type Photo = {
  /** Stable id used for React keys and deep links (?photo=id). */
  id: string
  /** Path under /public (or an absolute CDN URL once migrated to S3). */
  src: string
  /** Accessible description of the photograph. */
  alt: string
  /** Reads like the title of the photograph, e.g. "Leap Castle". */
  location: string
  /** Where it sits in the world, e.g. "County Offaly, Ireland". */
  place: string
  /** Capture month, e.g. "April". */
  month: string
  /** Capture year, e.g. "2023". */
  year: string
  /** Optional single sentence of observation shown in the viewer. */
  observation?: string
  /** Intrinsic dimensions, used to preserve aspect ratio. */
  width: number
  height: number
  /**
   * Optional layout hint (0.6–1). How much of its column the print fills in the
   * collage — lower = more breathing room around it. Omit and a sensible value
   * is derived from the aspect ratio. This is the ONLY layout knob; everything
   * else (column placement, spacing, tilt) is handled automatically.
   */
  scale?: number
}

// The gallery's intro copy (eyebrow / title / lede) lives in
// `content/field-notes.ts`. This module owns only the photo DATA + loader.

// Ordered for an editorial first impression: aspect ratios are interleaved so
// the scattered layout breathes. Order here == order in the viewer.
//
// To control ordering programmatically, add an optional numeric `order` field
// to entries in `public/field-notes/manifest.json`. Lower numbers appear earlier.
// If no `order` values are present this file preserves the JSON order.
import fieldNotesData from "../public/field-notes/manifest.json"

// `public/field-notes/manifest.json` is the authoritative photo metadata for the
// gallery so the site stays aligned with the file you edit in the public folder.
export const photos: Photo[] = (() => {
  const list = fieldNotesData as Photo[]
  // Preserve JSON order unless at least one `order` is present.
  const hasOrder = list.some((p) => typeof (p as any).order === "number")
  if (!hasOrder) return list

  const originalIndex = new Map(list.map((p, i) => [p.id, i]))
  return list
    .slice()
    .sort((a, b) => {
      const ao = typeof (a as any).order === "number" ? (a as any).order : Number.POSITIVE_INFINITY
      const bo = typeof (b as any).order === "number" ? (b as any).order : Number.POSITIVE_INFINITY
      if (ao !== bo) return ao - bo
      return (originalIndex.get(a.id) ?? 0) - (originalIndex.get(b.id) ?? 0)
    })
})()

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id)
}

/** "April 2023" — convenience for viewer + structured data. */
export function photoDate(photo: Photo): string {
  return `${photo.month} ${photo.year}`
}
