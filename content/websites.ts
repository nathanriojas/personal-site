// Content for the /websites service offering: a website design & development
// service for small businesses and individuals. All copy and data live here so
// the page stays a thin, presentational shell. The voice is deliberately warm,
// plain, and first-person — a real person offering to work directly with you.

export const websitesMeta = {
  // Renders as "… · Nathan Riojas" via the title template in app/layout.tsx,
  // so this stays short enough that the full title survives SERP truncation
  // (49 chars here, 65 rendered). Leads with the service, then the audience.
  metaTitle: "Website Design & Development for Small Businesses",
  // ~159 chars: long enough to carry the offer, short enough not to be cut.
  // Deliberately more explicit than the visible hero copy, which stays human.
  metaDescription:
    "Professional websites for small businesses and individuals, from simple modern sites to custom web applications. Work directly with the engineer who builds it.",
  /** Alt text for the generated Open Graph card (app/websites/opengraph-image.tsx). */
  ogAlt: "Website design and development for small businesses — Nathan Riojas",
} as const

export const websitesNav = {
  brand: "Nathan Riojas",
  context: "Websites",
  // Primary nav is deliberately just these three section jumps — the page
  // isn't long enough to need more, and "Portfolio" (which used to sit here,
  // pointing at the engineering site) read as ambiguous on a page about
  // building *other people's* websites. Explicit engineering-portfolio links
  // already exist in the intro and footer; this nav doesn't need a third.
  links: [
    { label: "Examples", href: "#examples" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Start a project",
  ctaHref: "#inquiry",
  // Announced to screen readers on the small-screen menu toggle.
  menuOpen: "Open menu",
  menuClose: "Close menu",
  /** Accessible name for the nav landmark itself. */
  navLabel: "Section",
} as const

export const websitesHero = {
  eyebrow: "Website design & development",
  headline: "A better presence online.",
  lead: "Professional websites for small businesses and individuals who want their online presence to better reflect who they are and what they do.",
  sub: " I design and build everything directly, from simple, fast websites to custom applications when a project needs more.",
  primaryCta: "Start a project",
  secondaryCta: "See examples",
} as const

export const websitesIntro = {
  heading: "Hi, I'm Nathan.",
  portraitAlt: "Nathan Riojas",
  // Background (mechanical engineering → computer science/software
  // engineering) is folded into the first paragraph rather than called out
  // as a separate credential line — matches content/about.ts, where the
  // M.S. Computer Science (Georgia Tech) and B.S. Mechanical Engineering
  // (UT Austin) are both represented as completed, not in progress.
  paragraphs: [
    "I spend most of my professional life building software and solving technical problems. I started in mechanical engineering before moving into computer science and software engineering, and that background has taught me to care as much about how something works in practice as how it’s built.",
    "I’ve seen plenty of great small businesses and talented people whose online presence doesn’t reflect the quality of their work. A professional website shouldn’t require an agency-sized budget. By handling the design and engineering directly, I can keep the process simple and the cost reasonable while still building something polished and genuinely professional.",
    "You'll work directly with me from our first conversation through launch.",
  ],
  portfolio: {
    text: "Software engineering is my day job.",
    linkLabel: "See my engineering work",
    href: "/",
  },
} as const

export type Pathway = {
  tag: string
  headline: string
  body: string
  secondary: string
  examples: string
}

export const websitesWho = {
  label: "Who I work with",
  intro:
    "I'm especially interested in working with two kinds of clients. You might see yourself in one of them.",
  pathways: [
    {
      tag: "Small businesses",
      headline: "Your website should match the quality of your business.",
      body: "For established local businesses, independent firms, restaurants, trades, practices, and other businesses that have outgrown their current online presence.",
      secondary:
        "Whether your current site feels dated, is hard to use, or just doesn't represent the business you've built, I can help modernize it.",
      examples: "Restaurants · Contractors · Clinics · Consultants · Family businesses",
    },
    {
      tag: "Individuals & professionals",
      headline: "Give your work somewhere better to live.",
      body: "For professionals who want more than a résumé and a LinkedIn page to tell their story, establish credibility, or stand out.",
      secondary:
        "Your experience, projects, writing, and accomplishments deserve a place you actually control.",
      examples: "Consultants · Founders · Engineers · Academics · Career changers",
    },
  ] satisfies Pathway[],
} as const

export type ExampleWork = {
  variant: "business" | "professional" | "restaurant" | "personal"
  category: string
  title: string
  blurb: string
  /** When a real demo exists later, drop in a screenshot and/or a live link. */
  image?: string
  href?: string
}

export const websitesExamples = {
  label: "A few examples",
  intro:
    "Original concept sites I built to show different styles and the kinds of projects I take on, not client work. Click into any of them and look around.",
  note: "These are original concept websites, made to demonstrate range. They aren't real businesses, people, or commissioned client work.",
  cta: "View sample site",
  items: [
    {
      variant: "restaurant",
      category: "Restaurant & hospitality",
      title: "Ember & Rye",
      blurb:
        "A neighborhood spot focused on wood-fired cooking, good wine, and a menu that changes with the season.",
      image: "/samples/restaurant.png",
      href: "/websites/examples/restaurant",
    },
    {
      variant: "business",
      category: "Local service business",
      title: "Cornerstone Exteriors",
      blurb:
        "A local roofing company built around clear communication, dependable work, and an easy quote process.",
      image: "/samples/local-service.png",
      href: "/websites/examples/local-service",
    },
    {
      variant: "professional",
      category: "Professional services",
      title: "Ashford & Vale",
      blurb: "An independent advisory firm helping leadership teams work through strategy, growth, and operational challenges.",
      image: "/samples/professional-services.png",
      href: "/websites/examples/professional-services",
    },
    {
      variant: "personal",
      category: "Individual professional",
      title: "Maya Ellison",
      blurb: "A personal site that brings together a designer’s work, background, writing, and professional identity.",
      image: "/samples/personal.png",
      href: "/websites/examples/personal",
    },
  ] satisfies ExampleWork[],
} as const

export type WorkingPoint = { title: string; body: string }

export const websitesWorking = {
  label: "Working with me",
  points: [
    {
      title: "You work with me.",
      body: "There's no salesperson, account manager, or handoff to someone you've never met. We talk about what you need, I build it, and we work through it together.",
    },
    {
      title: "I'll build what actually makes sense.",
      body: "Sometimes the right answer is a simple site with very little to maintain. Sometimes a project needs real software behind it. I won't add complexity or an agency-sized process when the project doesn't need either.",
    },
    {
      title: "I can take it further when you need to.",
      body: "My background is in software engineering, so if the work grows into integrations, automation, databases, dashboards, or custom features, you won't have to start over with someone new.",
    },
  ] satisfies WorkingPoint[],
} as const

export type ServiceTier = {
  name: string
  price: string
  priceNote: string
  summary: string
  includes: string[]
}

export const websitesPricing = {
  label: "Starting prices",
  intro:
    "Real starting points, so you have an idea of cost upfront. Once we’ve talked through what you need, I’ll give you a fixed price before any work begins.",
  tiers: [
    {
      name: "Personal Presence",
      price: "$1,250",
      priceNote: "from",
      summary:
        "A polished personal or professional site that puts your work and story in one place.",
      includes: [
        "Custom design that's yours",
        "A few well-crafted pages",
        "Your own domain, set up",
        "Live, fast, and mobile-first",
      ],
    },
    {
      name: "Small Business Modernization",
      price: "$2,000",
      priceNote: "from",
      summary:
        "A complete, credible site that helps an established business compete online.",
      includes: [
        "Everything in Personal Presence",
        "Services, story, and reviews",
        "Contact, maps, and location",
        "Content help along the way",
      ],
    },
    {
      name: "Custom Websites & Applications",
      price: "$4,000",
      priceNote: "from",
      summary:
        "When you need real software behind the site: features, data, and integrations.",
      includes: [
        "Custom functionality, built for you",
        "Accounts, dashboards, or booking",
        "Databases, APIs, and automation",
        "Room to grow over time",
      ],
    },
  ] satisfies ServiceTier[],
  note: "These are starting points, not fixed packages. Final pricing depends on scope. Every project is quoted at a single fixed price before we begin, so you always know the full cost up front.",
} as const

export const websitesOwnership = {
  label: "Ownership",
  heading: "You own what I build.",
  lede: "No proprietary platform, and no paying me every month just to keep your website online.",
  // Called out with more visual weight than the plain bullets below — this is
  // the single most common worry prospective clients have ("is my URL going
  // to look like it belongs to some builder, or to Nathan?"), so it gets an
  // explicit, visually contrasted yourbusiness.com vs. platform-subdomain
  // comparison instead of one line buried in a list. Kept to one sentence;
  // the fuller explanation (buy vs. connect, who pays for what) lives in the
  // FAQ, not here — see websitesFaq "Will my website have its own domain?".
  domain: {
    label: "A real domain that's yours",
    good: "yourbusiness.com",
    bad: "yourbusiness.someplatform.com",
  },
  points: [
    "Your hosting and accounts",
    "Your source code",
    "Your data",
    "No mandatory monthly fee",
    "Free to work with someone else later",
  ],
  // Deliberately describes handoff, not an ongoing relationship: this is a
  // new offering with no existing website-service clients, so the copy
  // shouldn't imply a maintenance subscription or a standing service model
  // that hasn't actually been offered yet. See websitesFaq for the matching
  // language in "Do I have to pay you every month?" and "What happens after
  // launch?".
  reassurance:
    "Once the site is live, you can manage it yourself, work with another developer, or come back to me for future changes. Any additional work after the original project would be scoped and quoted separately.",
} as const

export type ProcessStep = { title: string; body: string }

export const websitesProcess = {
  label: "How it works",
  steps: [
    {
      title: "Talk it through",
      body: "We start with a short, no-pressure conversation about what you need and what you're hoping for.",
    },
    {
      title: "A fixed-price quote",
      body: "I scope the work and send one clear price up front. You approve it before anything starts.",
    },
    {
      title: "Design & build",
      body: "I design and build the site, sharing progress so you can weigh in as it comes together.",
    },
    {
      title: "Launch & handoff",
      body: "We go live on your accounts, and I hand over everything: the domain, code, and hosting.",
    },
  ] satisfies ProcessStep[],
} as const

export type Faq = { q: string; a: string }

export const websitesFaq = {
  label: "Common questions",
  items: [
    {
      q: "How much will my project cost?",
      a: "It depends on what you need, which is why I quote a single fixed price up front before any work begins. The starting prices above are an honest guide for each kind of project.",
    },
    {
      q: "How long does it take?",
      a: "Straightforward personal and small-business sites can sometimes be ready in as little as a week once I have the content and information I need. More involved projects naturally take longer. If you're working toward a specific launch date, tell me upfront and I'll let you know what's realistic and work around it where I can.",
    },
    {
      q: "Do I own the website?",
      a: "Yes, completely. Your domain, code, hosting, and data are all in your name, and you're never locked into me to keep it online.",
    },
    {
      q: "Will my website have its own domain?",
      a: "Yes. Your finished site can use a normal domain such as yourbusiness.com, not a subdomain branded around me or another website platform. If you already own a domain, I'll connect it to the new site. If you don't, I'll help you purchase one in an account you control. I can also help set up professional email addresses such as you@yourbusiness.com or inquiries@yourbusiness.com. Any ongoing third-party costs for the domain or email stay in your account, so you remain in control.",
    },
    {
      q: "Do I have to pay you every month?",
      a: "No. There's no required monthly payment to me after launch. You may have normal third-party costs, such as your domain, business email, or any paid services your site uses, and those stay in accounts you control. If you want additional changes later, that's scoped and quoted separately.",
    },
    {
      q: "Can I update it myself?",
      a: "That depends on the site. For something that rarely changes, keeping it simple is usually the better option. If you need to update content often, I can set the site up with an appropriate editor or CMS. Either way, you're not dependent on me to keep the site running.",
    },
    {
      q: "What if I need something more complicated than a normal website?",
      a: "Then we build it. I'm a software engineer, so accounts, dashboards, integrations, automation, and other custom features are all on the table when a project calls for them.",
    },
    {
      q: "How is the site hosted and secured?",
      a: "I use modern hosting and deployment practices, HTTPS, appropriate access controls, and secure handling of credentials and configuration. If your project involves customer accounts, payments, data, or backend functionality, I'll design the security around those requirements.",
    },
    {
      // Previously implied a base of repeat clients ("plenty of people do")
      // that doesn't exist yet — this is a new offering. Rewritten to
      // describe the handoff model itself rather than any track record.
      q: "What happens after launch?",
      a: "Once the site is live, I hand over the domain, code, hosting, accounts, and anything else that belongs with the project. From there, you can manage it yourself or work with another developer. If you'd like additional changes later, you're welcome to reach out, and I'll quote that work separately.",
    },
  ] satisfies Faq[],
} as const

export const websitesInquiry = {
  label: "Tell me what you're thinking.",
  intro:
    "You don't need a technical spec. Tell me a little about yourself or your business, what isn't working today, and what you'd like to change. I'll take it from there.",
  subjectPrefix: "WEBSITE INQUIRY ALERT",
  labels: {
    name: "Your name",
    email: "Email",
    type: "Are you reaching out as…",
    company: "What's your business called?",
    currentWebsite: "Do you have a website now?",
    goal: "What would you like to build or improve?",
    functionality: "Anything specific it needs to do?",
    inspiration: "Any sites or examples you like?",
    timeline: "When are you hoping to start?",
    budget: "Rough budget in mind?",
    domain: "Do you already own a domain name?",
    notes: "Anything else you'd like me to know?",
  },
  placeholders: {
    name: "Name",
    email: "you@example.com",
    company: "Business name",
    currentWebsite: "example.com, or leave blank",
    goal: "A few sentences in plain language is perfect. What do you do, and what would you like your site to do for you?",
    functionality: "Online booking, a store, a client login (optional)",
    inspiration: "Links or names of sites you like (optional)",
    notes: "Optional",
  },
  typeOptions: [
    { value: "individual", label: "Myself / an individual" },
    { value: "business", label: "A business" },
  ],
  timelineOptions: [
    "Not sure yet",
    "As soon as I can",
    "In the next month",
    "In the next few months",
    "Just exploring for now",
  ],
  budgetOptions: [
    "Not sure yet",
    "Under $2,000",
    "$2,000 – $4,000",
    "$4,000 – $8,000",
    "$8,000+",
  ],
  domainOptions: ["Not sure", "Yes, I have one", "No, I'll need one"],
  submit: "Send it over",
  submitting: "Sending…",
  success:
    "Thanks! This is on its way to me. I'll reply personally, usually within a day or two.",
  errors: {
    name: "Please add your name.",
    email: "Please add your email.",
    emailInvalid: "That email doesn't look quite right.",
    goal: "Tell me a little about what you're thinking.",
    sendFailed: "That didn't go through. Please try again.",
    network: "Network hiccup. Please check your connection and try again.",
  },
} as const

export const websitesFooter = {
  // Visitor-neutral: someone may land on /websites directly (search, a shared
  // link, a referral) rather than by coming from the engineering portfolio, so
  // this doesn't assume "back" — it explains why the link is worth following.
  engineeringLink: "See my engineering work",
  backToTop: "Back to top",
  credit: "Designed and built by",
} as const

/** Compact entry point rendered on the home page, before the Contact section. */
export const websitesHomeTeaser = {
  eyebrow: "Working directly with people & small businesses",
  heading: "I also build for individuals and small businesses.",
  body: "I help people create a stronger presence online — from polished personal and small-business websites to custom web applications.",
  cta: "Explore website services",
  footerLink: "Website services",
} as const
