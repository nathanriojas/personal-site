// CONCEPT SITE COPY — "Ember & Rye", a fictional wood-fired neighborhood
// restaurant used as a design sample on /websites.
//
// Everything here is invented. There is no real Ember & Rye: the address,
// phone number, hours, and email are placeholders (555 number, -example.com
// domain) and must stay obviously fictional.
//
// Layout, palette, and typography live in the page component
// (app/websites/examples/restaurant/page.tsx). Only words live here.

export const emberRye = {
  brand: { first: "Ember", amp: "&", second: "Rye" },

  nav: [
    { label: "Story", href: "#story" },
    { label: "Menu", href: "#menu" },
    { label: "Visit", href: "#visit" },
  ],
  navCta: "Reserve",

  hero: {
    eyebrow: "Neighborhood kitchen & wine bar · Est. 2019",
    headline: "Wood-fired cooking, a few blocks from home.",
    body: "Seasonal plates from the hearth, a short natural-wine list, and a warm room that fills up with regulars most nights of the week.",
    primaryCta: "Reserve a table",
    secondaryCta: "See the menu",
    badge: { title: "Open Wed–Sun", note: "5pm — late" },
  },

  story: {
    eyebrow: "Our story",
    heading: "One fire, whatever's in season.",
    paragraphs: [
      "We started Ember & Rye with a wood-burning oven, a chalkboard menu, and the idea that dinner out should feel like being cooked for by a friend who happens to be very good at it.",
      "The menu changes with what the farms bring us, but the fire never goes out. Come hungry, stay a while, and let us pour you something you haven't tried.",
    ],
  },

  menu: {
    eyebrow: "From the fire",
    heading: "A few favorites",
    note: "A sample of the current menu. It changes weekly with the season.",
    dishes: [
      { name: "Hearth Focaccia", note: "cultured butter, rosemary salt, olive oil", price: "9" },
      { name: "Charred Little Gems", note: "smoked buttermilk, pickled shallot, breadcrumb", price: "14" },
      { name: "Wood-Fired Half Chicken", note: "confit potato, salsa verde, pan drippings", price: "29" },
      { name: "Rye Pappardelle", note: "braised short rib, black pepper, aged pecorino", price: "26" },
      { name: "Whole Roasted Trout", note: "brown butter, capers, grilled lemon", price: "31" },
      { name: "Ember Chocolate Tart", note: "smoked cream, cocoa nib, sea salt", price: "12" },
    ],
  },

  visit: {
    eyebrow: "Visit",
    heading: "Find us on the corner.",
    details: [
      { label: "Hours", lines: ["Wednesday – Sunday · 5:00pm – late", "Closed Monday & Tuesday"] },
      { label: "Address", lines: ["418 Grove Street", "Bishop Arts, TX"] },
      { label: "Reservations", lines: ["(214) 555–0142"] },
    ],
    cta: "Get directions",
    mapCaption: "Bishop Arts · Dallas",
  },

  reserve: {
    eyebrow: "A table's waiting",
    heading: "Join us this week.",
    body: "Walk-ins are always welcome at the bar, and reservations open two weeks out for the dining room.",
    primaryCta: "Reserve a table",
    secondaryCta: "or email us",
    // No dial/mailto strings: these controls are intercepted as demo-only
    // actions (components/samples/demo-action.tsx). The address below is
    // display text only.
    email: "hello@emberandrye-example.com",
  },

  footer: {
    address: "418 Grove Street · Bishop Arts, TX",
    // Decorative only — no real accounts exist for this fictional restaurant.
    socials: ["Instagram", "Facebook"],
    creditLink: "A concept site by Nathan Riojas — Website services →",
  },
} as const
