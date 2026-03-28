import { getAllCtmfs, getAllProjects } from '@/lib/content';
import CtmfFilterableGrid from '@/components/CtmfFilterableGrid/CtmfFilterableGrid';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'CTMFs — Engineering Portfolio',
  description: 'Concepts, Tools, Models, and Frameworks used across design projects.',
};

export default async function CtmfsPage() {
  const [allCtmfs, allProjects] = await Promise.all([getAllCtmfs(), getAllProjects()]);

  const ctmfsData = allCtmfs.map(({ slug, name, strand, projects, explanation }) => ({
    slug, name, strand, projects, explanation,
  }));
  const projectsData = allProjects.map(({ slug, title }) => ({ slug, title }));

  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">Design Vocabulary</p>
          <h1 className={styles.pageTitle}>
            Concepts, Tools, Models &amp; Frameworks
          </h1>
          <p className={styles.intro}>
            The CTMFs I&apos;ve applied across my design projects, organised by strand:
            Frame, Diverge, Converge, and Represent. Filter by strand or project.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <CtmfFilterableGrid ctmfs={ctmfsData} projects={projectsData} />
        </ScrollReveal>
      </div>
    </div>
  );
}
