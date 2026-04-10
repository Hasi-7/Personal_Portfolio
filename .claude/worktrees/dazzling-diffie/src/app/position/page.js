import { getPosition } from '@/lib/content';
import YouTubeEmbed from '@/components/YouTubeEmbed/YouTubeEmbed';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'Position Statement — Engineering Portfolio',
  description: 'My position as an engineering designer — values, approach, and beliefs.',
};

export default async function PositionPage() {
  const position = await getPosition();

  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">Position Statement</p>
          <h1 className={styles.pageTitle}>My Engineering Design Position</h1>
          <p className={styles.intro}>
            A video reflection on my identity as an engineering designer — my values,
            approach, and how my experiences have shaped my practice.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.videoSection}>
            <YouTubeEmbed videoId={position?.youtubeVideoId || 'YOUR_VIDEO_ID'} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className={styles.annotationSection}>
            <div className={styles.annotationHeader}>
              <div className={styles.dividerLine} />
              <span className={styles.annotationLabel}>Annotation</span>
              <div className={styles.dividerLine} />
            </div>

            {/* SVG design-process diagram — satisfies "at least one visual representation" */}
            <div className={styles.graphicContainer} aria-hidden="true">
              <svg
                className={styles.designGraphic}
                viewBox="0 -20 420 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60"  cy="40" r="24" stroke="var(--color-strand-frame)"     strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="60"  y="44" textAnchor="middle" fontSize="9" fill="var(--color-strand-frame)"     fontFamily="monospace">Frame</text>

                <line x1="88" y1="40" x2="112" y2="40" stroke="var(--color-border)" strokeWidth="1" />
                <polygon points="112,36 120,40 112,44" fill="var(--color-border)" />

                <circle cx="152" cy="40" r="24" stroke="var(--color-strand-diverge)"   strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="152" y="44" textAnchor="middle" fontSize="9" fill="var(--color-strand-diverge)"   fontFamily="monospace">Diverge</text>

                <line x1="180" y1="40" x2="204" y2="40" stroke="var(--color-border)" strokeWidth="1" />
                <polygon points="204,36 212,40 204,44" fill="var(--color-border)" />

                <circle cx="244" cy="40" r="24" stroke="var(--color-strand-converge)"  strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="244" y="44" textAnchor="middle" fontSize="9" fill="var(--color-strand-converge)"  fontFamily="monospace">Converge</text>

                <line x1="272" y1="40" x2="296" y2="40" stroke="var(--color-border)" strokeWidth="1" />
                <polygon points="296,36 304,40 296,44" fill="var(--color-border)" />

                <circle cx="352" cy="40" r="30" stroke="var(--color-strand-represent)" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="352" y="44" textAnchor="middle" fontSize="9" fill="var(--color-strand-represent)" fontFamily="monospace">Represent</text>

                {/* Feedback loop arrow */}
                <path d="M 352 12 Q 206 -14 60 12" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <polygon points="63,8 55,12 63,16" fill="var(--color-accent)" />
              </svg>
            </div>

            <div className={styles.annotationBody}>
              {position?.htmlContent
                ? <MarkdownContent html={position.htmlContent} />
                : <p>Annotation placeholder — replace with your written reflection in <code>content/position.md</code>.</p>
              }
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
