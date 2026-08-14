// CONCEPT SITE COPY — "Maya Ellison", a fictional individual professional
// (product designer / design engineer) used as a design sample on /websites.
//
// Maya is invented. No real person, portrait, employer, or profile is used:
// the work entries name fictional products, the email is a placeholder, and
// the social links are decorative (rendered aria-hidden, not linked). The
// avatar is an abstract monogram rather than a fabricated photo of a person.
//
// Layout, palette, and typography live in the page component
// (app/websites/examples/personal/page.tsx).

export const mayaEllison = {
  name: "Maya Ellison",
  monogram: "ME",

  nav: [
    { label: "work", href: "#work" },
    { label: "about", href: "#about" },
    { label: "writing", href: "#writing" },
    { label: "contact", href: "#contact" },
  ],
  availability: "open to work",

  hero: {
    eyebrow: "Product Designer & Design Engineer — San Francisco",
    headlineLine1: "I design and build",
    headlineLine2Pre: "things people ",
    headlineAccent: "actually",
    headlineLine2Post: " use.",
    body: "Fifteen years turning fuzzy product ideas into interfaces that ship, equally at home in Figma and a codebase.",
    primaryCta: "See the work",
    secondaryCta: "Get in touch",
  },

  capabilities: [
    "Product Design",
    "Design Systems",
    "Prototyping",
    "React & TypeScript",
    "Research",
    "Strategy",
  ],

  work: {
    heading: "Selected work",
    range: "2022 — 2025",
    // Illustrative case-study index — no real destinations exist for this
    // concept, so entries render as non-interactive rather than dead links.
    items: [
      { n: "01", title: "Ledger", role: "Lead Product Designer", year: "2024", desc: "Rebuilt the core money-movement flow for a fintech app used by 400k people, cutting a 9-step transfer to 3.", tint: "#2b46ff" },
      { n: "02", title: "Fieldkit", role: "Design Engineer", year: "2023", desc: "Designed and shipped an offline-first tool for field researchers, from prototype to production React.", tint: "#141317" },
      { n: "03", title: "Northwind Health", role: "Product Design Consultant", year: "2022", desc: "Led the design system that unified twelve disconnected patient-facing products.", tint: "#c8471f" },
    ],
  },

  about: {
    eyebrow: "About",
    paragraphs: [
      "I'm Maya, a designer who codes, or an engineer who designs, depending on the day. I've spent my career in the space between the two, where the interesting problems usually live.",
      "I care about the small moments: the empty state, the error message, the thing that loads a half-second faster than you expected. That's where products earn trust.",
    ],
  },

  writing: {
    heading: "Writing & talks",
    items: [
      { title: "Designing for the offline moment", meta: "Essay · 2025" },
      { title: "Why I still prototype in code", meta: "Essay · 2024" },
      { title: "The design-engineer's toolkit", meta: "Talk · 2024" },
    ],
  },

  contact: {
    eyebrow: "Contact",
    headingLine1: "Let's make",
    headingLine2: "something good.",
    email: "hey@mayaellison-example.com",
    // Decorative only — no real profiles exist for this fictional person.
    socials: ["LinkedIn", "Are.na", "Read.cv"],
  },

  footer: {
    copyright: "© 2025 Maya Ellison — a fictional concept",
    creditLink: "Concept site by Nathan Riojas → Website services",
  },
} as const
