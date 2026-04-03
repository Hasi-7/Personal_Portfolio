import { getAbout } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'About — Engineering Portfolio',
  description: 'About Muhammad Hasnain Heryani — Engineering Science at the University of Toronto.',
};

export default async function AboutPage() {
  const about = await getAbout();
  const technicalSkills = [
    {
      title: 'AI/ML Core',
      items: [
        'Supervised & Unsupervised Learning',
        'Deep Learning (Transformers, CNNs, RLHF)',
        'LLM Fine-Tuning (LLaMA 2, Mistral)',
        'Retrieval-Augmented Generation (RAG)',
        'Hyperparameter Tuning (Optuna)',
        'AI Agent Development',
      ],
    },
    {
      title: 'AI Frameworks & Tools',
      items: [
        'LangChain',
        'LangGraph',
        'Hugging Face',
        'OpenAI API',
        'CrewAI',
        'MLflow',
        'Cursor IDE',
      ],
    },
    {
      title: 'Programming & Deployment',
      items: [
        'Python',
        'C',
        'SQL',
        'FastAPI',
        'Docker',
        'Git',
        'Model Deployment',
      ],
    },
  ];

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
                </dl>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <div className={styles.card}>
                <p className="section-label">Interests</p>
                <ul className={styles.interestList}>
                  {[
                    'Machine Learning/AI',
                    'Robotics',
                    'Embedded Systems',
                    'Hardware and Software Integration',
                    'Human-Centred Design',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={290}>
              <div className={`${styles.card} ${styles.skillsCard}`}>
                <p className="section-label">Technical Skills</p>
                <p className={styles.skillsIntro}>Technologies and tools I work with</p>

                <div className={styles.skillGroups}>
                  {technicalSkills.map((group) => (
                    <section key={group.title} className={styles.skillGroup}>
                      <h2 className={styles.skillGroupTitle}>{group.title}</h2>
                      <div className={styles.skillChips}>
                        {group.items.map((item) => (
                          <span key={item} className={styles.skillChip}>{item}</span>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
