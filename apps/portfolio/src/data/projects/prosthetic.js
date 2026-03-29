export const prosthetic = {
  slug: "passive-prosthetic-finger",
  title: "Passive Prosthetic Finger",

  media: {
    thumbnail: "/src/assets/images/projects/prosthetic/Prosthetic Finger.gif",
    hero: "/src/assets/images/projects/prosthetic/Prosthetic Finger.gif",
    gallery: [
      "/src/assets/images/projects/prosthetic/Matlab.gif",
      "/src/assets/images/projects/prosthetic/Prosthetic Finger.gif",
    ],
  },

  metadata: {
    category: "Robot Mechanism Design",
    projectType: "Research",
    organization: "REWIRE Laboratory",
    date: "2015-09",
    displayDate: "Fall, 2015",
    languages: ["MATLAB"],
  },

  overview: {
    short:
      "Designed and simulated a passive prosthetic finger using a dual four-bar linkage mechanism.",
    full:
      "This project focused on creating a prosthetic finger prototype based on a dual four-bar linkage design to reproduce the motion path of a curling finger, especially for an amputation above the PIP joint.",
  },

  content: {
    problem:
      "Most prosthetic finger designs were not suited to the amputation level this case required, creating a need for a more specialized mechanism.",
    approach:
      "Before building the prototype, I worked with a team to simulate the mechanism’s motion path in MATLAB and then moved toward the physical design concept.",
    outcome:
      "The project produced a prosthetic finger prototype concept tailored to a less common amputation scenario.",
    learnings:
      "This work strengthened my experience in mechanism design, simulation, and translating motion requirements into a physical prosthetic concept.",
  },

  links: {
    github: "",
    liveDemo: "",
    writeup: "",
  },

  tags: [
    "MATLAB",
    "Mechanism Design",
    "Prosthetics",
    "Simulation",
    "Research",
  ],
  featured: false,
};