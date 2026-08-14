// CONCEPT SITE COPY — "Ashford & Vale", a fictional boutique strategy &
// operations advisory used as a design sample on /websites.
//
// Everything here is invented. The engagements are deliberately generic and
// name no real company; no regulated credentials, license numbers, or
// verifiable claims are fabricated. The email and offices are placeholders.
//
// Layout, palette, and typography live in the page component
// (app/websites/examples/professional-services/page.tsx).

export const ashfordVale = {
  brand: { first: "Ashford", amp: "&", second: "Vale" },

  // Order matches the page's actual scroll order.
  nav: [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Work", href: "#work" },
    { label: "Insights", href: "#insights" },
  ],
  navCta: "Get in touch",

  hero: {
    eyebrow: "Strategy & Operations Advisory",
    headline: "Clearer decisions for companies at an inflection point.",
    body: "We're a small advisory practice that works closely with leadership teams facing consequential choices, about strategy, structure, and how the business is actually run.",
    primaryCta: "Start a conversation",
    secondaryCta: "How we work",
  },

  positioning:
    "Most firms this size are generalists. We're deliberately narrow: a few senior people, working on a small number of engagements at a time, close enough to the details to be genuinely useful.",

  services: {
    eyebrow: "What we do",
    items: [
      { n: "01", name: "Strategy", desc: "Where to focus, what to stop, and how to allocate capital and attention when the path forward isn't obvious." },
      { n: "02", name: "Operations", desc: "Turning strategy into an operating model: the structure, cadence, and metrics that make good decisions repeatable." },
      { n: "03", name: "Transformation", desc: "Guiding leadership teams through growth, restructuring, or integration without losing what made the business work." },
      { n: "04", name: "Diligence", desc: "Clear-eyed assessment ahead of an investment, acquisition, or major commitment: the risks and the real upside." },
    ],
  },

  approach: {
    eyebrow: "Our approach",
    items: [
      { title: "Senior attention", body: "You work with the people who do the thinking, not a rotating cast of juniors." },
      { title: "A small number of clients", body: "We take on few engagements at once, so yours gets real focus." },
      { title: "Useful, not just right", body: "Advice you can act on Monday morning, not a deck that sits on a shelf." },
    ],
  },

  work: {
    eyebrow: "Representative work",
    note: "Illustrative of the kind of engagements we take on. Details are generalized to protect confidentiality.",
    engagements: [
      { sector: "Healthcare services", text: "Helped a regional provider group rebuild its operating rhythm ahead of a period of rapid expansion." },
      { sector: "Manufacturing", text: "Worked with a family-owned manufacturer to plan a leadership transition and modernize how the business was run." },
      { sector: "Consumer", text: "Advised a founder-led brand on where to focus after several years of unfocused growth." },
    ],
  },

  insights: {
    eyebrow: "Insights",
    // Illustrative index only — no full pieces exist behind these, so the page
    // renders them as non-interactive list items rather than dead links.
    items: [
      { title: "The quiet cost of a strategy nobody can repeat", date: "Spring 2025" },
      { title: "Operating cadence: the most underrated leadership tool", date: "Winter 2024" },
      { title: "What good diligence actually looks for", date: "Autumn 2024" },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    heading: "Tell us what you're weighing.",
    body: "The best engagements start with a candid conversation. No pitch, just a discussion of where you are and whether we can help.",
    emailLabel: "Email",
    email: "hello@ashfordvale-example.com",
    officesLabel: "Offices",
    offices: "Dallas & Chicago",
    cta: "Start a conversation",
  },

  footer: { creditLink: "A concept site by Nathan Riojas — Website services →" },
} as const
