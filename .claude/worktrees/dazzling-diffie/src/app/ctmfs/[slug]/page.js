import { notFound } from 'next/navigation';
import { getCtmfBySlug, getCtmfSlugs } from '@/lib/content';
import StrandTag from '@/components/StrandTag/StrandTag';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  return getCtmfSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const ctmf = await getCtmfBySlug(params.slug);
  if (!ctmf) return {};
  return {
    title: `${ctmf.name} — CTMFs — Engineering Portfolio`,
    description: ctmf.explanation?.substring(0, 160),
  };
}

export default async function CtmfPage({ params }) {
  const ctmf = await getCtmfBySlug(params.slug);
  if (!ctmf) notFound();

  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">CTMF Entry</p>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>{ctmf.name}</h1>
            <StrandTag strand={ctmf.strand} />
          </div>
          {ctmf.projects?.length > 0 && (
            <div className={styles.projectLinks}>
              <span className={styles.usedIn}>Used in:</span>
              {ctmf.projects.map((p) => (
                <Link href={`/projects/${p}`} key={p} className={styles.projectLink}>{p}</Link>
              ))}
            </div>
          )}
        </ScrollReveal>

        <div className={styles.content}>
          {[
            { num: '01', label: 'Explanation',          body: ctmf.explanation       },
            { num: '02', label: 'Evidence of Use',       body: ctmf.evidence          },
            { num: '03', label: 'Assessment of Utility', body: ctmf.utilityAssessment },
            { num: '04', label: 'Fit with My Practice',  body: ctmf.fitAssessment     },
          ].map(({ num, label, body }, i) => (
            <ScrollReveal key={num} delay={100 + i * 60}>
              <section className={styles.field}>
                <h2 className={styles.fieldTitle}>
                  <span className={styles.fieldNum}>{num}</span>
                  {label}
                </h2>
                <p className={styles.fieldBody}>{body}</p>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={350}>
          <div className={styles.backLink}>
            <Link href="/ctmfs">← Back to all CTMFs</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
