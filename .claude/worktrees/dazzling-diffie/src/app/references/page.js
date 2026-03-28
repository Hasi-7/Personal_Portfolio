import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

const REFERENCES = [
  {
    id: 1,
    citation: 'Dorst, K. (2011). The core of "design thinking" and its application. *Design Studies*, *32*(6), 521–532. https://doi.org/10.1016/j.destud.2011.07.006',
    context: 'Framing the nature of design thinking and abductive reasoning in engineering design; used to contextualise the problem-framing approach in Praxis I and II.',
  },
  {
    id: 2,
    citation: 'Pugh, S. (1991). *Total design: Integrated methods for successful product engineering*. Addison-Wesley.',
    context: 'Source of the Pugh Concept Selection Matrix methodology applied during convergence phases in both Praxis projects.',
  },
  {
    id: 3,
    citation: 'IDEO.org. (2015). *The field guide to human-centered design* (1st ed.). IDEO.org. https://www.designkit.org/resources/1',
    context: 'Reference for human-centred design principles and stakeholder engagement techniques used in Praxis I.',
  },
  {
    id: 4,
    citation: 'Cross, N. (2011). *Design thinking: Understanding how designers think and work*. Berg Publishers.',
    context: 'Theoretical grounding for design cognition and the diverge–converge model of the design process.',
  },
  {
    id: 5,
    citation: 'Hibbeler, R. C. (2018). *Structural analysis* (10th ed.). Pearson.',
    context: 'Primary reference for structural analysis methods applied in the CIV102 bridge project, including shear force and bending moment calculations.',
  },
  {
    id: 6,
    citation: 'University of Toronto. (2025). *ESC102: Praxis II course notes and design toolkit*. Faculty of Applied Science & Engineering.',
    context: 'Source of the CTMF framework and design process model used throughout all documented projects.',
  },
];

function renderCitation(text) {
  return text.replace(/\*(.*?)\*/g, '<em>$1</em>');
}

export const metadata = {
  title: 'References — Engineering Portfolio',
  description: 'Reference list in APA format using Praxis embedded extract style.',
};

export default function ReferencesPage() {
  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">Bibliography</p>
          <h1 className={styles.pageTitle}>References</h1>
          <p className={styles.intro}>
            References cited throughout this portfolio in APA 7th edition format,
            using the Praxis embedded extract convention — each entry includes the
            citation followed by the context in which the source was used.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.list}>
            {REFERENCES.map((ref) => (
              <div key={ref.id} className={styles.entry}>
                <span className={styles.num}>{String(ref.id).padStart(2, '0')}</span>
                <div className={styles.entryContent}>
                  <p
                    className={styles.citation}
                    dangerouslySetInnerHTML={{ __html: renderCitation(ref.citation) }}
                  />
                  <p className={styles.context}>
                    <span className={styles.contextLabel}>Embedded context: </span>
                    {ref.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className={styles.note}>
            <strong>Note:</strong> These are placeholder references. Replace with your
            actual sources. Use APA 7th edition with Praxis embedded extract style
            (citation + context of use).
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
