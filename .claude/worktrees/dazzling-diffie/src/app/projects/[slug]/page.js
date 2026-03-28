import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs, getAllCtmfs } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import StrandTag from '@/components/StrandTag/StrandTag';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Engineering Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const [project, allCtmfs] = await Promise.all([
    getProjectBySlug(params.slug),
    getAllCtmfs(),
  ]);

  if (!project) notFound();

  const projectCtmfs = allCtmfs.filter(
    (c) => project.ctmfs && project.ctmfs.includes(c.slug)
  );

  return (
    <article>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={`container ${styles.heroContent}`}>
          <ScrollReveal>
            <p className="section-label">Design Project</p>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <span className={styles.typeTag}>{project.type}</span>
          </ScrollReveal>
        </div>
      </div>

      <div className="container">
        {/* Two-column summary */}
        <ScrollReveal delay={100}>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryLeft}>
              <p className="section-label">Context</p>
              <p className={styles.summaryText}>{project.summary}</p>
            </div>
            <div className={styles.summaryRight}>
              <p className="section-label">Details</p>
              <dl className={styles.meta}>
                <dt>Type</dt><dd>{project.type}</dd>
                <dt>Date</dt><dd>{project.date}</dd>
                <dt>CTMFs</dt><dd>{projectCtmfs.length} documented</dd>
              </dl>
            </div>
          </div>
        </ScrollReveal>

        {/* Process Annotation */}
        <ScrollReveal delay={150}>
          <div className={styles.annotationSection}>
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerLabel}>Process &amp; Reflection</span>
              <div className={styles.dividerLine} />
            </div>
            <MarkdownContent html={project.htmlContent} />
          </div>
        </ScrollReveal>

        {/* CTMFs Used */}
        {projectCtmfs.length > 0 && (
          <ScrollReveal delay={200}>
            <div className={styles.ctmfsSection}>
              <p className="section-label">CTMFs Applied</p>
              <h2 className={styles.ctmfsHeading}>Concepts, Tools, Models &amp; Frameworks</h2>
              <div className={styles.ctmfsGrid}>
                {projectCtmfs.map((ctmf) => (
                  <Link href={`/ctmfs/${ctmf.slug}`} key={ctmf.slug} className={styles.ctmfCard}>
                    <div className={styles.ctmfCardTop}>
                      <span className={styles.ctmfName}>{ctmf.name}</span>
                      <StrandTag strand={ctmf.strand} />
                    </div>
                    <p className={styles.ctmfExcerpt}>
                      {ctmf.explanation?.substring(0, 110)}…
                    </p>
                    <span className={styles.ctmfLink}>View full entry →</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={250}>
          <div className={styles.backLink}>
            <Link href="/projects">← Back to all projects</Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
