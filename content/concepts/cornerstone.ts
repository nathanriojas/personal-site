// CONCEPT SITE COPY — "Cornerstone Exteriors", a fictional roofing / siding /
// gutters contractor used as a design sample on /websites.
//
// Everything here is invented: the company, the phone number (555), the
// license number, the reviews, the stats, and the service area. Nothing is a
// real business or a real customer testimonial.
//
// Icons, layout, and palette live in the page component
// (app/websites/examples/local-service/page.tsx). Only words live here — icons
// are referenced by a string key the page maps to a lucide component, so this
// file stays free of React imports.

export type CornerstoneIcon =
  | "home"
  | "wrench"
  | "rain"
  | "panel"
  | "ruler"
  | "shield"
  | "star"
  | "award"

export const cornerstone = {
  brand: "Cornerstone",
  brandFull: "Cornerstone Exteriors",

  utilityBar: {
    hours: "Serving the North Dallas metroplex · Mon–Sat 7am–7pm",
    phoneLabel: "(972) 555-0188",
    phoneHref: "+19725550188",
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#work" },
    { label: "Reviews", href: "#reviews" },
    { label: "Areas", href: "#areas" },
  ],
  navCta: "Free Quote",

  hero: {
    eyebrow: "Roofing · Siding · Gutters",
    headlineLine1: "A roof done right",
    headlineLine2: "the first time.",
    body: "Straight answers, fair fixed pricing, and crews that treat your home like their own. Family-owned and serving North Dallas for 20+ years.",
    primaryCta: "Get a free quote",
  },

  quoteCard: {
    heading: "Free, no-pressure quote",
    note: "Most quotes back same day.",
  },

  badges: [
    { icon: "shield" as CornerstoneIcon, label: "Licensed & Insured" },
    { icon: "star" as CornerstoneIcon, label: "4.9★ on Google" },
    { icon: "award" as CornerstoneIcon, label: "25-Year Warranty" },
    { icon: "home" as CornerstoneIcon, label: "Local & Family-Owned" },
  ],

  services: {
    eyebrow: "What we do",
    heading: "Exterior work, handled",
    items: [
      { icon: "home" as CornerstoneIcon, name: "Roof Replacement", desc: "Full tear-off and installation with premium architectural shingles." },
      { icon: "wrench" as CornerstoneIcon, name: "Roof Repair", desc: "Fast, lasting fixes for leaks, missing shingles, and flashing." },
      { icon: "rain" as CornerstoneIcon, name: "Storm Damage", desc: "Insurance-claim help and rapid repairs after hail and wind." },
      { icon: "panel" as CornerstoneIcon, name: "Siding", desc: "Fiber-cement and vinyl siding that lifts your whole exterior." },
      { icon: "ruler" as CornerstoneIcon, name: "Gutters", desc: "Seamless gutters and guards that actually move the water." },
      { icon: "shield" as CornerstoneIcon, name: "Inspections", desc: "Honest, no-pressure roof inspections with a written report." },
    ],
  },

  stats: [
    { value: "20+", label: "Years in business" },
    { value: "2,000+", label: "Roofs installed" },
    { value: "4.9★", label: "Average rating" },
    { value: "100%", label: "Written warranties" },
  ],

  work: {
    eyebrow: "Recent work",
    heading: "Roofs we're proud of",
    // `tint` is the gradient base for each placeholder tile (no photos on hand).
    items: [
      { label: "Architectural shingle · Plano", tint: "#334a63" },
      { label: "Metal standing seam · Frisco", tint: "#25405c" },
      { label: "Full re-side · Allen", tint: "#3a5169" },
      { label: "Storm restoration · McKinney", tint: "#2b4661" },
      { label: "New gutters · Richardson", tint: "#33506d" },
      { label: "Inspection · Wylie", tint: "#294763" },
    ],
  },

  reviews: {
    eyebrow: "Reviews",
    heading: "Neighbors who trust us",
    ratingSummary: "4.9 · 300+ reviews",
    items: [
      { name: "Marcus T.", city: "Plano, TX", text: "Crew showed up on time, finished our roof in a day, and left the yard cleaner than they found it. The quote was the final price — no surprises." },
      { name: "Dana R.", city: "Richardson, TX", text: "After the spring hail storm they walked us through the whole insurance claim. Genuinely felt like they were on our side." },
      { name: "Eli P.", city: "Frisco, TX", text: "Got three bids. Cornerstone wasn't the cheapest, but they were the clearest about what we were paying for. No regrets." },
    ],
  },

  areas: {
    eyebrow: "Service area",
    heading: "Proudly serving North Dallas",
    towns: ["Plano", "Frisco", "Richardson", "Allen", "McKinney", "Garland", "Wylie", "Murphy", "Sachse"],
    note: "Don't see your town? Call us — we probably cover it.",
    mapCaption: "North Dallas metroplex",
  },

  ctaBand: {
    heading: "Ready for a roof you can forget about?",
    body: "Get a free, honest quote today. No pressure, no gimmicks — just a fair price and a firm handshake.",
    primaryCta: "Get my free quote",
  },

  footer: {
    tagline: "Roofing, siding & gutters for North Dallas since 2004.",
    license: "TX Lic. #RC-000000 · Licensed & Insured",
    contactHeading: "Contact",
    email: "hello@cornerstone-example.com",
    hours: "Mon–Sat · 7am–7pm",
    linksHeading: "Quick links",
    links: [
      { label: "Services", href: "#services" },
      { label: "Free quote", href: "#quote" },
    ],
    creditLink: "Concept site by Nathan Riojas →",
  },

  stickyBar: { call: "Call now", quote: "Free quote" },

  /** The concept quote form (components/samples/cornerstone-quote-form.tsx). */
  form: {
    namePlaceholder: "Full name",
    phonePlaceholder: "Phone number",
    servicePlaceholder: "What do you need?",
    serviceOptions: [
      "Roof replacement",
      "Roof repair",
      "Storm / hail damage",
      "Siding or gutters",
      "Not sure — need an inspection",
    ],
    submit: "Request my quote",
    disclaimer: "No spam. We'll call to confirm details.",
    // Shown after submit: this concept has no lead-capture backend, so the
    // form is honest about being representational rather than silently no-op.
    confirmation:
      "This is a concept form, so nothing was actually sent. On a real Cornerstone site, this would notify the team right away.",
  },
} as const
