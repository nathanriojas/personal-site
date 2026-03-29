export const gem = {
  slug: "gem-finder",
  title: "Gem Finder",

  media: {
    thumbnail: "/src/assets/images/projects/gem/GemFinder.gif",
    hero: "/src/assets/images/projects/gem/GemFinder.gif",
    gallery: ["/src/assets/images/projects/gem/GemFinder.gif"],
  },

  metadata: {
    category: "Simultaneous Localization and Mapping",
    projectType: "Academic",
    organization: "Georgia Tech",
    date: "2020-11",
    displayDate: "November, 2020",
    languages: ["Python"],
  },

  overview: {
    short:
      "Applied an online SLAM algorithm in Python to locate a robot and collect target gems in an unknown environment.",
    full:
      "This project used an Online SLAM approach in Python where a robot had to localize itself in an unmapped environment and navigate to a set of gems within a reasonable time budget.",
  },

  content: {
    problem:
      "The robot needed to estimate its position while simultaneously mapping an unknown environment and collecting specified targets.",
    approach:
      "I implemented an online SLAM method that used incoming observations to improve localization and support path planning toward the gems.",
    outcome:
      "The result was a working localization-and-navigation solution for a constrained robotic collection task.",
    learnings:
      "This project helped build intuition for online estimation, mapping under uncertainty, and robotics problem formulation.",
  },

  links: {
    github: "",
    liveDemo: "",
    writeup: "",
  },

  tags: ["Python", "SLAM", "Robotics", "Localization", "Academic"],
  featured: false,
};