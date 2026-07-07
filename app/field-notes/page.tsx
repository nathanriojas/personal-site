import type { Metadata } from "next"
import { EditorialGallery } from "@/components/field-notes/editorial-gallery"
import { ReturnBookmark } from "@/components/field-notes/return-bookmark"
import { JsonLd } from "@/components/json-ld"
import { photos } from "@/lib/field-notes"
import {
  buildMetadata,
  absoluteUrl,
  jsonLdBreadcrumbs,
  siteUrl,
} from "@/lib/seo"
import { site, fieldNotes, fieldNotesPage } from "@/content"

export const metadata: Metadata = buildMetadata({
  title: fieldNotes.title,
  description: fieldNotesPage.metaDescription,
  path: "/field-notes",
})

/** ImageGallery + each photo as an ImageObject, plus breadcrumbs. */
function fieldNotesJsonLd() {
  const gallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${fieldNotes.title} — ${site.name}`,
    description: fieldNotes.lede,
    url: absoluteUrl("/field-notes"),
    author: { "@type": "Person", name: site.name, url: siteUrl },
    image: photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(p.src),
      name: p.location,
      description: p.observation ?? p.alt,
      contentLocation: p.place,
      width: p.width,
      height: p.height,
    })),
  }
  const breadcrumbs = jsonLdBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Field Notes", path: "/field-notes" },
  ])
  return [gallery, breadcrumbs]
}

export default function FieldNotesPage() {
  return (
    <main className="relative min-h-screen">
      <JsonLd data={fieldNotesJsonLd()} />
      {/* Atmosphere, ~10% richer than before — same design language, more depth.
          Dot-grid is a touch stronger and now fades toward the viewport edges
          (radial mask) so the canvas feels deeper rather than flat. */}
      <div
        className="pointer-events-none fixed inset-0 bg-dots opacity-90 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_40%,black_55%,transparent_100%)]"
        aria-hidden="true"
      />
      {/* Soft overhead emerald glow + a deeper one behind the content body. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] opacity-[0.09] [background:radial-gradient(ellipse_55%_50%_at_50%_0%,var(--color-primary),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] [background:radial-gradient(ellipse_60%_50%_at_50%_45%,var(--color-primary),transparent_75%)]"
        aria-hidden="true"
      />
      {/* An almost imperceptible extra grain layer, on top of the site-wide one. */}
      <div className="grain-overlay !opacity-[0.03]" aria-hidden="true" />

      <div className="relative">
        {/* The title block now lives inside the collage (upper-left column). */}
        <EditorialGallery />
      </div>

      <ReturnBookmark />
    </main>
  )
}
