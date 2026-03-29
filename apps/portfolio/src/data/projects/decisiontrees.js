export const decisiontrees = {
  slug: "decision-tree-learners",
  title: "Decision Tree Learners",

  media: {
    thumbnail: "/src/assets/images/projects/decisiontrees/decision.png",
    hero: "/src/assets/images/projects/decisiontrees/decision.png",
    gallery: [
      "/src/assets/images/projects/decisiontrees/decision.png",
      "/src/assets/images/projects/decisiontrees/forest.png",
      "/src/assets/images/projects/decisiontrees/time.png",
      "/src/assets/images/projects/decisiontrees/comparison.png",
    ],
  },

  metadata: {
    category: "Decision Tree Learners",
    projectType: "Academic",
    organization: "Georgia Tech",
    date: "2021-02",
    displayDate: "February, 2021",
    languages: ["Python"],
  },

  overview: {
    short:
      "Implemented and evaluated multiple regression tree-based learning algorithms in Python.",
    full:
      "This project focused on building four learning algorithms as Python classes: a Decision Tree Learner, Random Tree Learner, Bootstrap Aggregating Learner, and Insane Learner.",
  },

  content: {
    problem:
      "The goal was to build and compare tree-based learners for regression tasks rather than the more common classification setting.",
    approach:
      "I implemented the tree structures using NumPy ndarrays, based on JR Quinlan’s decision tree algorithm and a related variation for random trees.",
    outcome:
      "The project produced a set of reusable learner implementations and comparative outputs across the different approaches.",
    learnings:
      "This work deepened my understanding of tree-based algorithms, ensemble methods, data structures for model representation, and experimental evaluation.",
  },

  links: {
    github: "",
    liveDemo: "",
    writeup: "",
  },

  tags: [
    "Python",
    "Machine Learning",
    "Decision Trees",
    "Random Trees",
    "Bagging",
    "Academic",
  ],
  featured: false,
};