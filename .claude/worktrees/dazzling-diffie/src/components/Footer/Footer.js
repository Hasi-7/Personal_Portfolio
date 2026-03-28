import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.name}>[YOUR NAME]</span>
          <span className={styles.sep}>·</span>
          <span className={styles.program}>Engineering Science, University of Toronto</span>
        </div>
        <div className={styles.right}>
          <span className={styles.label}>ESC102 Design Portfolio</span>
        </div>
      </div>
    </footer>
  );
}
