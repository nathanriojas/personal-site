import type { Metadata } from "next"
import { site, education } from "@/content"

// ---------------------------------------------------------------------------
// Centralized SEO architecture.
//
// Every page builds its metadata through `buildMetadata()` so titles,
// canonical URLs, Open Graph, and Twitter cards stay consistent and future
// pages (new projects, Field Notes collections) inherit correct defaults with
// a single call. Structured data is assembled by the `jsonLd*` helpers.
// ---------------------------------------------------------------------------

/** Canonical production origin. Override per-environment via NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nathanriojas.com"
).replace(/\/$/, "")

export const siteName = `${site.name} — ${site.title}`

export const defaultDescription =
  "Nathan Riojas is a Staff Forward Deployed Engineer in Dallas, TX who builds reliable data systems and deploys software where it gets used. Mechanical engineer turned software developer with an M.S. in Computer Science from Georgia Tech."

/** Absolute URL helper — accepts a root-relative path and returns a full URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path
  return `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`
}

type BuildMetadataInput = {
  title?: string
  description?: string
  /** Root-relative path, e.g. "/field-notes". Drives the canonical URL. */
  path?: string
  /** Root-relative or absolute image used for OG/Twitter; defaults to the home OG route. */
  image?: string
  /** "website" (default) or "article" for richer pages. */
  type?: "website" | "article" | "profile"
  /** Set true on pages that should not be indexed (e.g. drafts). */
  noindex?: boolean
}

/**
 * Build a complete Metadata object for a page. Only `title`/`description`/`path`
 * are typically needed; everything else inherits sensible site-wide defaults.
 */
export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image,
  type = "website",
  noindex = false,
}: BuildMetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path)
  const ogImage = image ? absoluteUrl(image) : undefined

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url: canonical,
      siteName: siteName,
      title: title ?? siteName,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteName,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

// --- Structured data (JSON-LD) ---------------------------------------------

/** schema.org Person — describes Nathan for knowledge-panel eligibility. */
export function jsonLdPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: defaultDescription,
    url: siteUrl,
    image: absoluteUrl(site.photo),
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    sameAs: Object.values(site.socials),
  }
}

/** schema.org WebSite — names the site for sitelinks. */
export function jsonLdWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    author: { "@type": "Person", name: site.name },
  }
}

/** schema.org BreadcrumbList from an ordered list of {name, path}. */
export function jsonLdBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
