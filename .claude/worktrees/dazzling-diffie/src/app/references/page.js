import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

const REFERENCES = [
  {
    id: 1,
    citation: '[1] University of Toronto, "ESC101 20259 Praxis I assignment documentation set (Process Analysis, Design Brief, Alpha Release, and Design Report documents with associated IATs)," course handouts and assessment documents, 2025.',
    context: 'Primary assignment-level reference set used across Praxis I project summaries and CTMF evaluations.',
  },
  {
    id: 2,
    citation: '[2] University of Toronto, "ESC102 20261 Praxis II assignment documentation set (Student Engineer Design Portfolio brief and IAT)," course handouts and assessment documents, 2026.',
    context: 'Primary assignment-level reference set used for Praxis II portfolio framing, CTMF structure, and evaluation criteria.',
  },
  {
    id: 3,
    citation: '[3] University of Toronto, "CIV102 bridge assignment documentation set (bridge project handout and team deliverables)," course assignment materials, 2025.',
    context: 'Assignment-level source set used throughout the CIV102 bridge project and associated CTMF entries.',
  },
  {
    id: 4,
    citation: '[4] M. H. Heryani, "Position Statement Video," YouTube video, 2026.',
    context: 'Video source referenced in the Position Statement page as primary evidence of design-position articulation.',
  },
  {
    id: 5,
    citation: '[5] Praxis I Team, "Rescoped Design Brief," ESC101 Praxis I, 2025.',
    context: 'Primary Praxis I framing source used for opportunity interpretation, scope refinement, and requirement direction.',
  },
  {
    id: 6,
    citation: '[6] Praxis I Team, "Design Report (Roller Support to Prevent Left-Handed Whiteboard Smudging)," ESC101 Praxis I, 2025.',
    context: 'Primary Praxis I evidence source for convergence logic, requirement outcomes, testing summaries, and final recommendation.',
  },
  {
    id: 7,
    citation: '[7] Praxis I Team, "Alpha Release Brainstorming," ESC101 Praxis I, 2025.',
    context: 'Primary evidence source for Praxis I diverging methods, concept generation, and pre-convergence records.',
  },
  {
    id: 16,
    citation: '[16] Praxis I Team, "Opportunity Scoping," ESC101 Praxis I, 2025.',
    context: 'Supporting source for early opportunity selection and narrowing decisions in Praxis I.',
  },
  {
    id: 17,
    citation: '[17] Praxis I Team, "Pairwise Comparison Matrix Arguments," ESC101 Praxis I, 2025.',
    context: 'Supporting convergence source used to justify tradeoffs between competing concept directions in Praxis I.',
  },
  {
    id: 8,
    citation: '[8] Team 509, "CIV102 Project Team 509 Design Report," course project report, 2025.',
    context: 'Primary technical source for CIV102 bridge analysis choices, iteration history, and final design rationale.',
  },
  {
    id: 9,
    citation: '[9] Team 509, "CIV102 Project Team 509 Engineering Assembly," course project assembly documentation, 2025.',
    context: 'Primary construction and assembly source for fabrication sequence, quality control, and final build evidence.',
  },
  {
    id: 10,
    citation: '[10] Praxis II Team, "Beta release document," ESC102 Praxis II, 2026.',
    context: 'Source for Praxis II beta-stage prototype integration, decision records, and readiness evidence.',
  },
  {
    id: 11,
    citation: '[11] Praxis II Team, "RFP - Ice Removal" (project context document), ESC102 Praxis II, 2026.',
    context: 'Used as contextual evidence for early opportunity-space comparison in Praxis II before final scope convergence.',
  },
  {
    id: 12,
    citation: '[12] Praxis II Team, "One Pager (Brochure)," ESC102 Praxis II, 2026.',
    context: 'Primary communication source for final concept summary and stakeholder-facing project representation.',
  },
  {
    id: 13,
    citation: '[13] Praxis II Team, "Poster," ESC102 Praxis II, 2026.',
    context: 'Primary visual communication source for condensed presentation of project evidence and conclusions.',
  },
  {
    id: 14,
    citation: '[14] Praxis II Team, "RFP I - FPV Drone Diagnostics," ESC102 Praxis II, 2026.',
    context: 'Primary requirements and context source for FPV diagnostics framing and stakeholder-aligned scoping.',
  },
  {
    id: 15,
    citation: '[15] Praxis II Team, "Verification Processes," ESC102 Praxis II, 2026.',
    context: 'Primary verification-method source for diagnostics testing logic and evidence of prototype assessment.',
  },
];

function renderCitation(text) {
  return text.replace(/\*(.*?)\*/g, '<em>$1</em>');
}

export const metadata = {
  title: 'References — Engineering Portfolio',
  description: 'Reference list in IEEE format using Praxis embedded extract style.',
};

export default function ReferencesPage() {
  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">Bibliography</p>
          <h1 className={styles.pageTitle}>References</h1>
          <p className={styles.intro}>
            References cited throughout this portfolio in IEEE format,
            using the Praxis embedded extract convention — each entry includes the
            citation followed by the context in which the source was used.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.list}>
            {[...REFERENCES].sort((a, b) => a.id - b.id).map((ref) => (
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
            <strong>Note:</strong> Entries are formatted in IEEE style with embedded
            context to show where each source supports claims in the portfolio.
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
