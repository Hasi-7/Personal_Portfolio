import Link from 'next/link';
import styles from './Card.module.css';

export default function Card({ title, description, href, tags = [], variant = 'project' }) {
  return (
    <Link href={href} className={`${styles.card} ${styles[variant]} card`}>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span
            key={tag.label}
            className={styles.tag}
            style={tag.color ? { color: tag.color, borderColor: tag.color } : {}}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.viewLink}>
        {variant === 'project' ? 'View Project' : 'View Details'} →
      </span>
    </Link>
  );
}
