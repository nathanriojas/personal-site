// Hero section copy. The name, title, tagline, and location come from `site`;
// these are the hero-specific bits of text and the accessible labels.
export const hero = {
  greeting: "Hi, I'm",
  scrollLabel: "Scroll",
  scrollAriaLabel: "Scroll to about section",
  imageAlt: "Nathan walking across the reflective Uyuni salt flats at sunset",
  /** Accessible labels for the hero social/resume icons. */
  aria: {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
  },
} as const

/**
 * The hero photograph's "museum plaque" — the quiet caption on the Uyuni photo
 * that doubles as the entry point into Field Notes. It titles this one specific
 * image, so its copy lives here rather than in the generic photo manifest.
 */
export const heroCaption = {
  title: "Uyuni Salt Flats",
  meta: "Bolivia · January 2024",
  cta: "Field Notes",
  ariaLabel: "Field Notes — a photography journal by Nathan Riojas",
} as const
