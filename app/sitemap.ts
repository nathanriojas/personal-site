import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/seo"

/**
 * XML sitemap. Built from a small route table so future top-level pages (new
 * project case studies, Field Notes collections) only need a new entry here to
 * be discovered. Photo deep links live as ?photo= params on /field-notes and
 * are intentionally not enumerated (they resolve to the same indexable page).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/field-notes", priority: 0.8, changeFrequency: "monthly" },
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
