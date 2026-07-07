// Experience section content: one entry per role, newest first.

export type Experience = {
  company: string
  role: string
  period: string
  summary: string
  points: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    company: "Foxtrot Services",
    role: "Staff Forward Deployed Engineer",
    period: "Jun 2026 — Present",
    summary:
      "Build production software on Palantir Foundry for enterprise clients — configurable applications, reusable platform components, AI, and integrations rather than one-off implementations.",
    points: [
      "Modernized a Part 135 aviation operator's flight management system, delivering scalable applications, ontology actions, and platform integrations on Foundry.",
      "Built bidirectional integrations with the Avinode Marketplace via reusable writeback APIs and ontology actions, keeping Foundry applications and external aviation systems in sync.",
      "Shipped an AI-powered crew fatigue and scheduling app in React and TypeScript on AI FDE and AIP, with custom fatigue scoring and Claude-driven crew recommendations.",
    ],
    stack: [
      "Palantir Foundry",
      "OSDK",
      "TypeScript",
      "React",
      "AI FDE",
      "AIP",
      "Python",
      "REST APIs",
    ],
  },
  {
    company: "Hopscotch Primary Care",
    role: "Senior Data Engineer",
    period: "Apr 2023 — Jun 2026",
    summary:
      "Platform engineering inside healthcare: architected interoperability solutions, reusable frameworks, and clinician-facing AI applications, and led strategic technical initiatives.",
    points: [
      "Architected healthcare platforms, AI-enabled applications, and interoperability solutions on Foundry, PySpark, TypeScript, React, and AWS supporting clinical operations across multiple products.",
      "Served as technical lead for strategic initiatives — owning solution architecture, mentoring engineers, leading engineering reviews, and running technical due diligence on prospective vendors.",
      "Established reusable frameworks, shared libraries, and ontology-driven data models that standardized development, strengthened governance, and accelerated delivery across teams.",
      "Delivered production AI applications with AIP, Azure AI OCR, LLMs, semantic search, and RAG, turning structured and unstructured data into clinician-facing operational workflows.",
      "Engineered enterprise interoperability across HIE, ADT, HL7, FHIR, claims, and third-party systems through APIs, webhooks, SFTP, and event-driven architectures.",
      "Cut production compute utilization by 80% by replacing no-code implementations with scalable code.",
    ],
    stack: [
      "Palantir Foundry",
      "PySpark",
      "TypeScript",
      "React",
      "AWS",
      "SQL",
      "HL7",
      "FHIR",
      "AIP",
    ],
  },
  {
    company: "Nomi Health",
    role: "Data Science Engineer",
    period: "Mar 2021 — Apr 2023",
    summary:
      "Bridged backend software and data engineering, building scalable cloud systems and reusable infrastructure for enterprise healthcare analytics.",
    points: [
      "Designed serverless AWS ingestion services and APIs on Lambda, DocumentDB, Snowflake, and S3 for enterprise healthcare analytics.",
      "Engineered scalable ingestion pipelines over SFTP and cloud storage, and authored reusable Python libraries that standardized EDI integrations across internal applications.",
      "Modernized data platforms by evolving Protocol Buffer schemas and automating regulatory codeset updates with Python and BeautifulSoup, improving consistency and reducing manual maintenance.",
    ],
    stack: [
      "Python",
      "AWS",
      "Lambda",
      "Snowflake",
      "DocumentDB",
      "S3",
      "APIs",
    ],
  },
  {
    company: "Codeware",
    role: "Software Development Engineer in Test",
    period: "Mar 2017 — Nov 2020",
    summary:
      "Engineering validation and computational software quality — the start of my transition from mechanical engineering into software engineering.",
    points: [
      "Developed Python and JavaScript automation frameworks that validated proprietary ASME engineering software.",
      "Designed automated verification tools that improved computational model accuracy while reducing manual validation.",
    ],
    stack: ["Python", "JavaScript", "Automation", "Engineering Software"],
  },
]
