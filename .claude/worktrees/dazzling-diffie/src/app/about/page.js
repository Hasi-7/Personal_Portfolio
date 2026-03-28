import { getAbout } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'About — Engineering Portfolio',
  description: 'About [YOUR NAME] — Engineering Science at the University of Toronto.',
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="section">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <ScrollReveal>
              <p className="section-label">About</p>
              <h1 className={styles.pageTitle}>About Me</h1>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className={styles.content}>
                {about?.htmlContent
                  ? <MarkdownContent html={about.htmlContent} />
                  : <p>About content — update <code>content/about.md</code>.</p>
                }
              </div>
            </ScrollReveal>
          </div>

          <aside className={styles.sidebar}>
            <ScrollReveal delay={150}>
              <div className={styles.card}>
                <p className="section-label">Quick Info</p>
                <dl className={styles.infoList}>
                  <dt>Program</dt>   <dd>Engineering Science</dd>
                  <dt>Year</dt>      <dd>First Year (EngSci)</dd>
                  <dt>University</dt><dd>University of Toronto</dd>
                  <dt>Context</dt>   <dd>ESC102 — Praxis II</dd>
                </dl>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <div className={styles.card}>
                <p className="section-label">Interests</p>
                <ul className={styles.interestList}>
                  {[
                    'Hardware / Software Intersection',
                    'Engineering Design Methodology',
                    'Structural Analysis',
                    'Embedded Systems',
                    'Human-Centred Design',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
