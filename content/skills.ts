// Skills section content: grouped technologies, each with a short framing and
// concrete ways it's used (not ratings).

export type Skill = {
  name: string
  /** Short framing of how the technology fits into the work — not a rating. */
  context: string
  /** Concrete ways the technology is actually used. */
  uses: string[]
}

export type SkillGroup = {
  name: string
  items: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    items: [
      {
        name: "Python",
        context: "Primary Language",
        uses: [
          "Production ETL and healthcare data pipelines",
          "Serverless AWS services and ingestion automation",
          "AIP and LLM-backed application logic",
          "Reusable internal libraries and integrations",
          "Graduate ML and algorithms coursework",
        ],
      },
      {
        name: "SQL",
        context: "Data Engineering",
        uses: [
          "Modeling clinical and claims data into analytics layers",
          "Complex transformations with CTEs and window functions",
          "Query tuning across Snowflake and Postgres",
          "Ontology-backed datasets in Foundry",
        ],
      },
      {
        name: "TypeScript",
        context: "Application Development",
        uses: [
          "Operational React applications on Palantir Foundry",
          "Type-safe data access through the OSDK",
          "AI and crew-scheduling interfaces",
          "Forward-deployed internal tooling",
        ],
      },
      {
        name: "JavaScript",
        context: "Frontend Development",
        uses: [
          "Interactive UI and browser applications",
          "Automation test frameworks for engineering software",
          "Prototyping ahead of TypeScript adoption",
        ],
      },
      {
        name: "MATLAB",
        context: "Engineering Research",
        uses: [
          "Robotics control and mechatronics research",
          "Signal processing and system simulation",
          "Undergraduate and graduate engineering work",
        ],
      },
    ],
  },
  {
    name: "Data & Platform Engineering",
    items: [
      {
        name: "Palantir Foundry",
        context: "Enterprise Platform",
        uses: [
          "Ontology modeling, actions, and OSDK-backed apps",
          "Pipeline Builder and code repositories for ETL",
          "Operational applications for clinical and aviation teams",
          "AIP for LLM-driven operational workflows",
          "Data expectations and governance",
        ],
      },
      {
        name: "Spark / PySpark",
        context: "Distributed Processing",
        uses: [
          "Large-scale healthcare ETL and transformations",
          "Batch pipelines over HL7, FHIR, and claims data",
          "Data-quality and validation workflows",
        ],
      },
      {
        name: "REST APIs",
        context: "Systems Integration",
        uses: [
          "Bidirectional Avinode Marketplace integration",
          "Enterprise interoperability via webhooks and events",
          "Internal services and third-party automation",
        ],
      },
      {
        name: "Snowflake",
        context: "Cloud Warehouse",
        uses: [
          "Analytics layer for enterprise healthcare data",
          "Warehouse design and performance tuning",
          "Self-serve datasets for downstream teams",
        ],
      },
    ],
  },
  {
    name: "Cloud & Tooling",
    items: [
      {
        name: "AWS",
        context: "Cloud Infrastructure",
        uses: [
          "Serverless ingestion on Lambda and API Gateway",
          "DocumentDB, S3, and EventBridge pipelines",
          "Infrastructure defined with AWS SAM",
          "CloudWatch monitoring and alerting",
        ],
      },
      {
        name: "Git",
        context: "Version Control",
        uses: [
          "Feature-branch workflows and code review",
          "Release management across teams",
          "CI-backed collaboration",
        ],
      },
      {
        name: "Linux",
        context: "Development Environment",
        uses: [
          "WSL and bash-based development",
          "CLI tooling and shell automation",
          "Server and deployment workflows",
        ],
      },
    ],
  },
  {
    name: "AI & Data Science",
    items: [
      {
        name: "Claude API",
        context: "AI Applications",
        uses: [
          "Crew recommendations in a fatigue-scoring app",
          "Tool-calling and agent workflows",
          "Prompt engineering for operational automation",
          "RAG and semantic search over clinical data",
        ],
      },
      {
        name: "scikit-learn",
        context: "Machine Learning",
        uses: [
          "Classification and regression modeling",
          "Feature engineering and model evaluation",
          "Applied coursework and prototyping",
        ],
      },
      {
        name: "Pandas",
        context: "Data Analysis",
        uses: [
          "Exploration and cleaning of messy healthcare data",
          "Feature engineering for modeling",
          "Ad hoc analytics and reporting",
        ],
      },
      {
        name: "NumPy",
        context: "Scientific Computing",
        uses: [
          "Vectorized numerical computing",
          "Matrix operations for ML and algorithms",
        ],
      },
      {
        name: "PyTorch",
        context: "Natural Language Processing Coursework",
        uses: [
          "Neural networks and NLP projects",
          "Graduate NLP coursework",
        ],
      },
    ],
  },
  {
    name: "Engineering",
    items: [
      {
        name: "Robotics",
        context: "Engineering Research",
        uses: [
          "Autonomous systems and mechatronics",
          "Rehabilitation robotics research",
          "Computational perception",
        ],
      },
      {
        name: "Manufacturing Automation",
        context: "Precision Engineering",
        uses: [
          "Automated wafer-loading system (published)",
          "Submicron precision positioning",
          "Machine design for nanomanufacturing",
        ],
      },
      {
        name: "Biomechanics",
        context: "Medical Research",
        uses: [
          "Biaxial tissue-testing systems (published)",
          "Mitral valve mechanics instrumentation",
          "Medical device prototyping",
        ],
      },
      {
        name: "CAD",
        context: "Mechanical Design",
        uses: [
          "SolidWorks modeling and assemblies",
          "Prototype development for research builds",
        ],
      },
    ],
  },
]
