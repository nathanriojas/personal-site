// Field Notes copy: the gallery's intro block and the /field-notes page's SEO
// description. The photo data itself lives in public/field-notes/manifest.json
// and is loaded by lib/field-notes.ts.
export const fieldNotes = {
  /** Quiet label that sits above the title. */
  eyebrow: "A second notebook",
  title: "Field Notes",
  /** Calm, editorial lede — the antithesis of the dense portfolio. */
  lede: "These aren't meant to be professional photographs. They're moments that caught my attention while traveling, all captured on the camera that happened to be in my pocket.",
} as const

export const fieldNotesPage = {
  metaDescription:
    "A photography journal by Nathan Riojas — places, light, and the occasional long way around, from Iceland to Vietnam.",
} as const
