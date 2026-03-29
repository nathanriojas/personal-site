import { projects } from "../../data/projects";
import ProjectCard from "../../components/projects/ProjectCard";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Projects</h1>
        <p className={styles.description}>
          A selection of academic, research, and technical projects from my
          portfolio.
        </p>
      </header>

      <section className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}