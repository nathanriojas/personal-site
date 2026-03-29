import { Link } from "react-router-dom";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <main className={styles.notFound}>
        <h1>Project not found</h1>
        <p>The project you requested does not exist.</p>
        <Link to="/" className={styles.backLink}>
          ← Back to projects
        </Link>
      </main>
    );
  }

  const { title, media, metadata, overview, content, links, tags } = project;

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to projects
      </Link>

      <h1 className={styles.title}>{title}</h1>

      {media?.hero && (
        <div className={styles.heroWrapper}>
          <img
            src={media.hero}
            alt={title}
            className={styles.heroImage}
          />
        </div>
      )}

      <div className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          {overview?.full && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.bodyText}>{overview.full}</p>
            </section>
          )}

          {content?.problem && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Problem</h2>
              <p className={styles.bodyText}>{content.problem}</p>
            </section>
          )}

          {content?.approach && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Approach</h2>
              <p className={styles.bodyText}>{content.approach}</p>
            </section>
          )}

          {content?.outcome && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Outcome</h2>
              <p className={styles.bodyText}>{content.outcome}</p>
            </section>
          )}

          {content?.learnings && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Learnings</h2>
              <p className={styles.bodyText}>{content.learnings}</p>
            </section>
          )}

          {media?.gallery?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Gallery</h2>
              <div className={styles.galleryGrid}>
                {media.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${title} gallery ${index + 1}`}
                    className={styles.galleryImage}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sideColumn}>
          {metadata && (
            <section className={styles.metaCard}>
              <h2 className={styles.sectionTitle}>Project Info</h2>
              <ul className={styles.metaList}>
                {metadata.category && (
                  <li className={styles.metaItem}>
                    <strong>Category:</strong> {metadata.category}
                  </li>
                )}

                {metadata.projectType && (
                  <li className={styles.metaItem}>
                    <strong>Type:</strong> {metadata.projectType}
                  </li>
                )}

                {metadata.organization && (
                  <li className={styles.metaItem}>
                    <strong>Organization:</strong> {metadata.organization}
                  </li>
                )}

                {metadata.displayDate && (
                  <li className={styles.metaItem}>
                    <strong>Date:</strong> {metadata.displayDate}
                  </li>
                )}

                {metadata.languages?.length > 0 && (
                  <li className={styles.metaItem}>
                    <strong>Languages:</strong> {metadata.languages.join(", ")}
                  </li>
                )}
              </ul>
            </section>
          )}

          {links && (links.github || links.liveDemo || links.writeup) && (
            <section className={styles.metaCard}>
              <h2 className={styles.sectionTitle}>Links</h2>
              <div className={styles.linksList}>
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.linkButton}
                  >
                    GitHub
                  </a>
                )}

                {links.liveDemo && (
                  <a
                    href={links.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.linkButton}
                  >
                    Live Demo
                  </a>
                )}

                {links.writeup && (
                  <a
                    href={links.writeup}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.linkButton}
                  >
                    Writeup
                  </a>
                )}
              </div>
            </section>
          )}

          {tags?.length > 0 && (
            <section className={styles.metaCard}>
              <h2 className={styles.sectionTitle}>Tags</h2>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}