export const marsGlider = {
  slug: "mars-glider",
  title: "Mars Glider",

  media: {
    thumbnail: "/src/assets/images/projects/mars-glider/MarsGlider.gif",
    hero: "/src/assets/images/projects/mars-glider/MarsGlider.gif",
    gallery: ["/src/assets/images/projects/mars-glider/MarsGlider.gif"],
  },

  metadata: {
    category: "Sequential Monte Carlo Method",
    projectType: "Academic",
    organization: "Georgia Tech",
    date: "2020-10",
    displayDate: "October, 2020",
    languages: ["Python"],
  },

  overview: {
    short:
      "Used particle filters in Python to localize a glider over unfamiliar Martian terrain for safe landing.",
    full:
      "This project implemented particle filters in Python to estimate the position of a glider dropped into unfamiliar Martian terrain and improve localization over time so it could land in a required area.",
  },

  content: {
    problem:
      "The glider needed to determine its location in an unfamiliar environment using noisy sensor information before landing.",
    approach:
      "I used a Sequential Monte Carlo approach where sensor data at each time step informed particle generation and iterative localization updates.",
    outcome:
      "The resulting filter improved the glider’s position estimate over time and supported the landing objective.",
    learnings:
      "This project reinforced my understanding of probabilistic localization, particle filtering, and state estimation under uncertainty.",
  },

  links: {
    github: "",
    liveDemo: "",
    writeup: "",
  },

  tags: [
    "Python",
    "Particle Filter",
    "Localization",
    "Sequential Monte Carlo",
    "Academic",
  ],
  featured: false,
};