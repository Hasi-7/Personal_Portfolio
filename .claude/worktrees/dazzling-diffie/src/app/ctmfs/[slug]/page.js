import { notFound } from 'next/navigation';
import { getCtmfBySlug, getCtmfSlugs } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import StrandTag from '@/components/StrandTag/StrandTag';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import Link from 'next/link';
import styles from './page.module.css';

function wrapCtmfFigures(html) {
  const inlineFigure = html.replace(
    /<p>\s*(<img[^>]*>)\s*<em>(Figure\s+\d+:[\s\S]*?)<\/em>\s*<\/p>/g,
    '<figure class="ctmf-figure-right">$1<figcaption>$2</figcaption></figure>'
  );

  return inlineFigure.replace(
    /<p>\s*(<img[^>]*>)\s*<\/p>\s*<p>\s*<em>(Figure\s+\d+:[\s\S]*?)<\/em>\s*<\/p>/g,
    '<figure class="ctmf-figure-right">$1<figcaption>$2</figcaption></figure>'
  );
}

function moveFiguresToTop(html) {
  const figureRegex = /<figure class="ctmf-figure-right">[\s\S]*?<\/figure>\s*/g;
  const figures = [...html.matchAll(figureRegex)].map((match) => match[0].trim());

  if (figures.length === 0) {
    return html;
  }

  const bodyWithoutFigures = html.replace(figureRegex, '').trim();
  return `${figures.join('')}${bodyWithoutFigures}`;
}

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

  const fields = await Promise.all(
    [
      { num: '01', label: 'Explanation', body: ctmf.explanation },
      { num: '02', label: 'Evidence of Use', body: ctmf.evidence },
      { num: '03', label: 'Assessment of Utility', body: ctmf.utilityAssessment },
      { num: '04', label: 'Fit with My Practice', body: ctmf.fitAssessment },
    ].map(async ({ num, label, body }) => {
      const wrappedHtml = wrapCtmfFigures(await markdownToHtml(body || ''));
      const positionedHtml = label === 'Evidence of Use'
        ? moveFiguresToTop(wrappedHtml)
        : wrappedHtml;

      return {
      num,
      label,
      html: positionedHtml,
      };
    })
  );

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
          {fields.map(({ num, label, html }, i) => (
            <ScrollReveal key={num} delay={100 + i * 60}>
              <section className={styles.field}>
                <h2 className={styles.fieldTitle}>
                  <span className={styles.fieldNum}>{num}</span>
                  {label}
                </h2>
                <div className={styles.fieldBody} dangerouslySetInnerHTML={{ __html: html }} />
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
