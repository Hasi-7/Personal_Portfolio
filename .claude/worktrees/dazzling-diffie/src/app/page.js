import Link from 'next/link';
import TypeWriter from '@/components/TypeWriter/TypeWriter';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <ScrollReveal>
          <p className={`section-label ${styles.greeting}`}>Hello, I&apos;m</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className={styles.name}>
            <TypeWriter text="[YOUR NAME]" speed={90} />
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className={styles.subtitle}>
            Engineering Science @ University of Toronto
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className={styles.statement}>
            Exploring the intersection of rigorous analysis and human-centred design.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className={styles.ctas}>
            <Link href="/projects" className={styles.ctaPrimary}>
              View My Work
            </Link>
            <Link href="/position" className={styles.ctaSecondary}>
              My Design Approach
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollLine} />
        </div>
      </div>
    </div>
  );
}
