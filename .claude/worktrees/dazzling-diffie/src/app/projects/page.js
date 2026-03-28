import { getAllProjects } from '@/lib/content';
import Card from '@/components/Card/Card';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'Projects — Engineering Portfolio',
  description: 'Design projects including Praxis I, CIV102 Bridge, and Praxis II.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">Design Projects</p>
          <h1 className={styles.pageTitle}>My Work</h1>
          <p className={styles.intro}>
            A collection of engineering design projects spanning human-centred design,
            structural engineering, and systems design.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 80}>
              <Card
                title={project.title}
                description={project.description}
                href={`/projects/${project.slug}`}
                tags={[{ label: project.type }]}
                variant="project"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
