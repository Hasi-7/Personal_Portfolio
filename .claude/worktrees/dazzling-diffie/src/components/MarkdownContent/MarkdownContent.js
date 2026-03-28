import styles from './MarkdownContent.module.css';

export default function MarkdownContent({ html }) {
  return (
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
