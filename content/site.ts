// Site identity — the core facts about who this is and where to reach them.
// Referenced across the whole site (hero, nav, SEO, contact, footer).
export const site = {
  name: "Nathan Riojas",
  title: "Forward Deployed Engineer",
  tagline:
    "I enjoy understanding how things work, then making them work a little better.",
  location: "Dallas, TX",
  email: "me@nathanriojas.com",
  resumeUrl: "/nathan-riojas-resume.pdf",
  photo: "/nathan-portrait.jpg",
  heroImage: "/hero-portrait.jpg",
  socials: {
    github: "https://github.com/nathanriojas",
    linkedin: "https://www.linkedin.com/in/nathanriojas",
  },
} as const
