// About section content: the prose, the sub-section headings, plus the
// education and publications data rendered within it.

export const about = {
  paragraphs: [
    "Engineering has never been about one field for me. I've worked on semiconductor robotics, biomechanics research, healthcare data platforms, aviation software, and AI applications, but the motivation has always been the same: understand how a system works, then improve it.",
    "Today I build software as a Forward Deployed Engineer, partnering closely with customers to design applications and data systems that solve practical problems. I enjoy the intersection of software engineering, data, and product thinking, where technical decisions have an immediate impact on how people work.",
    "Outside of work, you'll usually find me traveling, photographing places that make me stop for a moment, experimenting with a new side project, or learning about something I knew nothing about the week before. Curiosity has shaped most of my career, and it's still the thing that keeps me building.",
  ],
  highlights: [{ label: "Based in", value: "Dallas, TX" }],
  /** Headings for the sub-sections within About. */
  headings: {
    education: "Education",
    publications: "Research & Publications",
    /** Small marker on authored (vs. contributor) publications. */
    featured: "Featured",
  },
} as const

export type Education = {
  degree: string
  field: string
  school: string
  notes?: string[]
  /** Brand color used for the understated hover shimmer on the card. */
  accent: string
}

export const education: Education[] = [
  {
    degree: "M.S.",
    field: "Computer Science",
    school: "Georgia Institute of Technology",
    notes: ["Specialization: Robotics & Computational Perception"],
    // Georgia Tech gold
    accent: "#B3A369",
  },
  {
    degree: "B.S.",
    field: "Mechanical Engineering",
    school: "The University of Texas at Austin",
    notes: ["Specialization: Robotics", "Minor: Computer Science"],
    // UT Austin burnt orange
    accent: "#BF5700",
  },
]

export type Publication = {
  title: string
  /** Honest contribution level — kept deliberately transparent. */
  role: "Co-Author" | "Engineering Contributor"
  venue: string
  year?: string
  link: string
  /** The authored work is given slightly more prominence. */
  featured?: boolean
}

export const publications: Publication[] = [
  {
    title: "Low-Cost Automated Wafer Loading System",
    role: "Co-Author",
    venue: "ASME Journal of Micro- and Nano-Manufacturing",
    year: "2016",
    link: "https://asmedigitalcollection.asme.org/micronanomanufacturing/article-abstract/4/4/041006/380416/A-Low-Cost-Automated-Wafer-Loading-System-With?redirectedFrom=fulltext",
    featured: true,
  },
  {
    title: "Adaptable Robotic Gait Rehabilitation System",
    role: "Engineering Contributor",
    venue: "ASME Journal of Mechanisms and Robotics",
    link: "https://asmedigitalcollection.asme.org/mechanismsrobotics/article-abstract/10/4/044503/366608/Design-of-a-Single-Degree-of-Freedom-Adaptable?redirectedFrom=fulltext",
  },
  {
    title: "Biaxial Tissue Testing System for Mitral Valve Biomechanics",
    role: "Engineering Contributor",
    venue: "Comprehensive Physiology",
    link: "https://pubmed.ncbi.nlm.nih.gov/27783858/",
  },
]
