export const pid = {
  slug: "rocket-pid",
  title: "Rocket PID",

  media: {
    thumbnail: "/src/assets/images/projects/pid/PID.jpg",
    hero: "/src/assets/images/projects/pid/PID.jpg",
    gallery: ["/src/assets/images/projects/pid/PID.jpg"],
  },

  metadata: {
    category: "PID Control",
    projectType: "Academic",
    organization: "Georgia Tech",
    date: "2020-11",
    displayDate: "November, 2020",
    languages: ["Python"],
  },

  overview: {
    short:
      "Built a Python PID controller for rocket landing based on target velocity tracking.",
    full:
      "This project implemented a PID controller in Python to match a required velocity curve using rocket fuel and oxidizer pressure inputs so the vehicle could land safely within the required time window.",
  },

  content: {
    problem:
      "The rocket had to follow a target descent profile closely enough to achieve a safe landing.",
    approach:
      "I used PID control logic to continuously adjust the system based on the difference between the desired and actual velocity behavior.",
    outcome:
      "The controller provided a structured feedback mechanism for bringing the rocket toward the desired landing behavior.",
    learnings:
      "This project helped connect control theory concepts with practical implementation details in simulation.",
  },

  links: {
    github: "",
    liveDemo: "",
    writeup: "",
  },

  tags: ["Python", "PID Control", "Controls", "Simulation", "Academic"],
  featured: false,
};