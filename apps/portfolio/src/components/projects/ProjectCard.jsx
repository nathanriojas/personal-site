import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  const { slug, title, media, metadata, overview, tags } = project;

  return (
    <article className={styles.card}>
      <Link to={`/projects/${slug}`} className={styles.link}>
        {media?.thumbnail && (
          <img
            src={media.thumbnail}
            alt={title}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          {overview?.short && (
            <p className={styles.summary}>{overview.short}</p>
          )}

          <div className={styles.meta}>
            {metadata?.category && (
              <p className={styles.metaItem}>
                <strong>Category:</strong> {metadata.category}
              </p>
            )}

            {metadata?.organization && (
              <p className={styles.metaItem}>
                <strong>Organization:</strong> {metadata.organization}
              </p>
            )}

            {metadata?.displayDate && (
              <p className={styles.metaItem}>
                <strong>Date:</strong> {metadata.displayDate}
              </p>
            )}
          </div>

          {tags?.length > 0 && (
            <div className={styles.tags}>
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}