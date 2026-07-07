// Navigation + page chrome copy: the top-nav items, per-section heading/accent
// metadata for the home page, and small site-wide labels (resume, skip link,
// footer credit).

/** In-page nav items (also drives the scrollspy). `id` must match a section id. */
export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const

/**
 * Per-section metadata for the home page: the heading label, the restrained
 * accent tint, and which side the depth glow anchors to. These are edited
 * together, so they live together. `page.tsx` reads this to render each Section.
 */
export const sections = {
  about: { label: "About", accent: "oklch(0.72 0.13 165)", glowSide: "right" },
  projects: { label: "Projects", accent: "oklch(0.72 0.11 230)", glowSide: "left" },
  experience: { label: "Experience", accent: "oklch(0.78 0.12 80)", glowSide: "right" },
  skills: { label: "Skills", accent: "oklch(0.74 0.1 195)", glowSide: "left" },
  contact: { label: "Contact", accent: "oklch(0.72 0.13 18)", glowSide: "right" },
} as const

/** Small labels reused across the site chrome. */
export const chrome = {
  resume: "Resume",
  skipToContent: "Skip to content",
  // Rendered as: `${footerCredit} ${site.name}.`
  footerCredit: "Designed, built, and occasionally over-engineered by",
} as const
