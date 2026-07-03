// Projects section content: the project entries plus the small UI labels used
// by the projects grid, cards, and detail modal.

export type ProjectCategory = "System Design" | "AI & Robotics" | "Research"

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  year: string
  role: string
  /** Short blurb shown on the card. */
  description: string
  /** Longer write-up shown in the detail modal. */
  longDescription: string
  /** Notable outcomes / details shown as a list in the modal. */
  highlights: string[]
  /**
   * Preview media. A single source, or an array for an image gallery (the
   * first entry is used as the card preview). Supports .svg/.png/.jpg/.gif and
   * .mp4/.webm. Swap any of these for real assets later.
   */
  media: string | string[]
  tags: string[]
  link?: string
}

/** Normalize a project's media into an array of one or more sources. */
export function projectImages(project: Project): string[] {
  return Array.isArray(project.media) ? project.media : [project.media]
}

/** Visible UI copy for the projects grid / card / modal. */
export const projectsUi = {
  /** Category filter chips ("All" + each ProjectCategory). */
  filters: ["All", "System Design", "AI & Robotics", "Research"] as const,
  /** Hover badge on a card. */
  details: "Details",
  /** Heading above the outcomes list in the detail modal. */
  highlights: "Highlights",
  /** External link at the bottom of the modal. */
  viewProject: "View project",
} as const

export const projects: Project[] = [
  {
    slug: "patient-risk-tier-classification",
    title: "Patient Risk Tier Classification",
    category: "System Design",
    year: "2024",
    role: "Forward Deployed Engineer",
    description:
      "A configurable risk classification pipeline that evaluates incoming records against business rules and assigns risk tiers through a modular processing architecture.",
    longDescription:
      "Designed a configurable risk classification pipeline that evaluates incoming records against business rules and assigns risk tiers through a modular processing architecture. The system separates orchestration, rule evaluation, and downstream actions to improve extensibility, operational visibility, and long-term maintainability.",
    highlights: [
      "Built a configurable rule engine that scores incoming records and assigns risk tiers.",
      "Separated orchestration, rule evaluation, and downstream actions into modular components.",
      "Improved extensibility, operational visibility, and long-term maintainability.",
    ],
    // To add real project images later, add more paths to this array — the
    // gallery arrows, counter, and inspection mode all adapt automatically with
    // no UI changes. (A plain string still works for single-image projects.)
    // NOTE: the duplicate below is a TEMPORARY gallery test — the same image
    // listed twice. Replace the second path with a real image when ready.
    media: [
      "/projects/patient-risk-tier-architecture.svg"
    ],
    tags: [
      "System Design",
      "Data Pipelines",
      "Rule Engine",
      "Workflow Orchestration",
      "Architecture",
      "Palantir Foundry",
      "PySpark",
      "AI FDE",
      "OSDK",
      "React",
    ],
  },
  {
    slug: "clinical-screening-vaccination-engine",
    title: "Clinical Screening & Vaccination Engine",
    category: "System Design",
    year: "2024",
    role: "Forward Deployed Engineer",
    description:
      "A redesigned large-scale validation pipeline that processes continuously changing patient data against configurable healthcare requirements.",
    longDescription:
      "Redesigned a large-scale validation pipeline that processes continuously changing patient data against configurable healthcare requirements. Replaced multiple duplicated workflows with a modular codebase featuring centralized orchestration, automated testing, and robust operational monitoring, improving reliability while reducing compute costs by 80%.",
    highlights: [
      "Replaced multiple duplicated workflows with a single modular codebase.",
      "Centralized orchestration with automated testing and robust operational monitoring.",
      "Improved reliability while reducing compute costs by 80%.",
    ],
    media: "/projects/clinical-screening-architecture.svg",
    tags: [
      "System Design",
      "Workflow Orchestration",
      "ETL",
      "PySpark",
      "Observability",
      "Healthcare",
    ],
  },
  {
    slug: "mars-glider",
    title: "Mars Glider",
    category: "AI & Robotics",
    year: "2021",
    role: "Georgia Tech · AI for Robotics",
    description: "Applied particle filter for localization on Martian terrain.",
    longDescription:
      "An autonomous glider is dropped over unknown Martian terrain and has to figure out where it is using only noisy elevation readings. I implemented a particle filter that maintains thousands of hypotheses about the glider's position, reweights them against incoming measurements, and resamples toward the most likely state.",
    highlights: [
      "Implemented the full predict / update / resample particle-filter loop.",
      "Tuned measurement noise models and resampling to avoid particle deprivation.",
      "Added steering control on top of the estimated state to reach a target zone.",
    ],
    media: "/projects/mars-glider.gif",
    tags: ["Python", "Particle Filter", "AI for Robotics"],
  },
    {
    slug: "rocket-feed-system",
    title: "Rocket Feed System",
    category: "AI & Robotics",
    year: "2021",
    role: "Controls project",
    description: "Applied PID controller for feed-system regulation.",
    longDescription:
      "A control-systems project applying a PID controller to regulate a rocket propellant feed system. I tuned the proportional, integral, and derivative terms to achieve a stable, well-damped response that tracks the target setpoint without excessive overshoot.",
    highlights: [
      "Designed and tuned a PID control loop for the feed system.",
      "Balanced overshoot, settling time, and steady-state error.",
      "Validated the controller response against the target setpoint.",
    ],
    media: "/projects/rocket-pid.jpg",
    tags: ["Control Systems", "PID", "Simulation"],
  },
  {
    slug: "gem-finder",
    title: "Gem Finder",
    category: "AI & Robotics",
    year: "2021",
    role: "Georgia Tech · AI for Robotics",
    description: "Applied SLAM algorithm for mapping and localization.",
    longDescription:
      "Gem Finder applies simultaneous localization and mapping (SLAM) so a robot can build a map of its surroundings while tracking its own position within it. Every motion and measurement becomes a constraint, and solving the combined system recovers both the trajectory and the locations of observed landmarks.",
    highlights: [
      "Applied a SLAM formulation to estimate pose and map jointly.",
      "Combined motion and measurement constraints into one system.",
      "Recovered landmark positions from relative observations.",
    ],
    media: "/projects/gem-finder.gif",
    tags: ["Python", "SLAM", "AI for Robotics"],
  },
  {
    slug: "asteroid-navigation",
    title: "Asteroid Navigation",
    category: "AI & Robotics",
    year: "2021",
    role: "Georgia Tech · AI for Robotics",
    description: "Applied Kalman filter for tracking and state estimation.",
    longDescription:
      "Asteroid Navigation uses a Kalman filter to track moving objects and estimate their state from noisy observations. The filter fuses a motion model with incoming measurements, continuously predicting and correcting to maintain accurate estimates of position and velocity over time.",
    highlights: [
      "Implemented the Kalman filter predict / update cycle.",
      "Fused a motion model with noisy measurements for robust tracking.",
      "Estimated object position and velocity over time.",
    ],
    media: "/projects/asteroid-navigation.mp4",
    tags: ["Python", "Kalman Filter", "AI for Robotics"],
  },
  {
    slug: "autonomous-robot-navigation",
    title: "Autonomous Robot Navigation",
    category: "AI & Robotics",
    year: "2022",
    role: "Georgia Tech · Cyber-Physical Systems",
    description:
      "Nonlinear feedback controller that autonomously drives a differential-drive robot to a target pose in the Robotarium simulator.",
    longDescription:
      "Designed and implemented a nonlinear feedback controller for a differential-drive robot in Python using the Robotarium simulator. The controller autonomously navigates a robot to a target pose while respecting realistic motion constraints and ensuring smooth convergence in both position and orientation. Developed as part of Georgia Tech's Cyber-Physical Systems coursework with a focus on robotics, control systems, and autonomous navigation.",
    highlights: [
      "Implemented a nonlinear feedback controller for a differential-drive robot.",
      "Respected realistic motion constraints while navigating to a target pose.",
      "Achieved smooth convergence in both position and orientation.",
    ],
    media: "/projects/autonomous-robot-navigation.mp4",
    tags: ["Python", "Control Systems", "Robotarium"],
  },
  {
    slug: "tree-learning-algorithms",
    title: "Implementation of Tree Learning Algorithms",
    category: "AI & Robotics",
    year: "2021",
    role: "Georgia Tech · Machine Learning",
    description:
      "Analysis of overfitting and a comparison of accuracy and performance across tree-based learning algorithms.",
    longDescription:
      "An implementation and empirical study of tree-based learning algorithms, focused on how model complexity drives overfitting. I compared accuracy and runtime performance across configurations to understand the bias–variance trade-offs that show up as trees grow deeper.",
    highlights: [
      "Implemented tree learning algorithms from the ground up.",
      "Analyzed overfitting as a function of model complexity.",
      "Compared accuracy and performance across configurations.",
    ],
    media: "/projects/tree-comparison.png",
    tags: ["Python", "Machine Learning", "Decision Trees"],
  },
  {
    slug: "wafer-loading-robot",
    title: "Low Cost Automated Wafer Loading Robot",
    category: "Research",
    year: "2016",
    role: "Research · UT Austin",
    description: "Automated wafer loading with submicron alignment accuracy.",
    longDescription:
      "A low-cost automated wafer-loading system built for nanomanufacturing and nanometrology applications, achieving submicron alignment accuracy. This work was published in the ASME Journal of Micro- and Nano-Manufacturing.",
    highlights: [
      "Achieved submicron alignment accuracy at low cost.",
      "Designed for nanomanufacturing and nanometrology workflows.",
      "Published in the ASME Journal of Micro- and Nano-Manufacturing.",
    ],
    media: ["/projects/wafer-solidworks.jpg", "/projects/wafer-top-view.png"],
    tags: ["SolidWorks", "Mechatronics", "Precision Alignment"],
    link: "https://asmedigitalcollection.asme.org/micronanomanufacturing/article-abstract/4/4/041006/380416/A-Low-Cost-Automated-Wafer-Loading-System-With",
  },
  {
    slug: "passive-prosthetic-finger",
    title: "Passive Prosthetic Finger",
    category: "Research",
    year: "2016",
    role: "Mechanical Engineering · UT Austin",
    description:
      "Design of a passive, mechanically actuated prosthetic finger.",
    longDescription:
      "A mechanical design project developing a passive prosthetic finger that articulates through linkages and tendon routing rather than active motors. The design recreates natural grasping motion using only the wearer's residual movement.",
    highlights: [
      "Designed an articulated linkage mechanism for natural motion.",
      "Used passive tendon routing to drive the finger joints.",
      "Modeled the assembly in CAD for fabrication.",
    ],
    media: ["/projects/prosthetic-finger.mp4", "/projects/prosthetic-finger-matlab.mp4"],
    tags: ["SolidWorks", "Mechanical Design", "Biomechanics"],
  },
  {
    slug: "biaxial-tissue-tester",
    title: "Biaxial Heart Tissue Testing System",
    category: "Research",
    year: "2016",
    role: "Mechanical Engineering · UT Austin",
    description:
      "A system for biaxial mechanical testing of heart tissue samples.",
    longDescription:
      "A mechanical testing rig that applies controlled, biaxial loads to heart tissue samples to characterize their mechanical properties. Four actuators stretch the sample along two axes simultaneously while measuring the resulting force and deformation.",
    highlights: [
      "Designed a two-axis actuation frame for tissue samples.",
      "Enabled simultaneous loading along both axes.",
      "Supported characterization of soft-tissue mechanical properties.",
    ],
    media: ["/projects/biaxial-solidworks.png", "/projects/biaxial-comparison.png", "/projects/biaxial-actual.png"],
    tags: ["SolidWorks", "Biomechanics", "Test Rig Design"],
  },
  {
    slug: "gait-trainer-robot",
    title: "Low Cost Gait Trainer Robot",
    category: "Research",
    year: "2016",
    role: "Mechanical Engineering · UT Austin",
    description:
      "A low-cost gait trainer for post-stroke and spinal cord injury patients.",
    longDescription:
      "A low-cost robotic gait trainer designed to assist rehabilitation for post-stroke and spinal cord injury patients. The mechanism guides the lower limbs through a natural walking trajectory to support repetitive, assisted gait therapy.",
    highlights: [
      "Designed an affordable lower-limb gait-training mechanism.",
      "Targeted post-stroke and spinal cord injury rehabilitation.",
      "Guided limbs through a natural walking trajectory.",
    ],
    media: ["/projects/gait-solidworks.png", "/projects/gait-actual.png"],
    tags: ["SolidWorks", "Rehabilitation Robotics", "Mechanical Design"],
  },
]
