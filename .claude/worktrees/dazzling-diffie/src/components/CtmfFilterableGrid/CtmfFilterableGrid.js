'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import StrandTag from '@/components/StrandTag/StrandTag';
import { STRANDS } from '@/lib/constants';
import styles from './CtmfFilterableGrid.module.css';

export default function CtmfFilterableGrid({ ctmfs, projects }) {
  const [activeStrand, setActiveStrand] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const filtered = useMemo(() => ctmfs.filter((ctmf) => {
    const strandOk = !activeStrand || ctmf.strand === activeStrand;
    const projectOk = !activeProject || (ctmf.projects && ctmf.projects.includes(activeProject));
    return strandOk && projectOk;
  }), [ctmfs, activeStrand, activeProject]);

  return (
    <div>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Strand</span>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.btn} ${!activeStrand ? styles.btnActive : ''}`}
              onClick={() => setActiveStrand(null)}
            >All</button>
            {Object.entries(STRANDS).map(([key, { label, color }]) => (
              <button
                key={key}
                className={`${styles.btn} ${activeStrand === key ? styles.btnActive : ''}`}
                style={activeStrand === key ? { borderColor: color, color } : {}}
                onClick={() => setActiveStrand(activeStrand === key ? null : key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Project</span>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.btn} ${!activeProject ? styles.btnActive : ''}`}
              onClick={() => setActiveProject(null)}
            >All</button>
            {projects.map((p) => (
              <button
                key={p.slug}
                className={`${styles.btn} ${activeProject === p.slug ? styles.btnActive : ''}`}
                onClick={() => setActiveProject(activeProject === p.slug ? null : p.slug)}
              >
                {p.title.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.count}>Showing {filtered.length} of {ctmfs.length} CTMFs</p>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((ctmf) => (
          <Link href={`/ctmfs/${ctmf.slug}`} key={ctmf.slug} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>{ctmf.name}</h3>
              <StrandTag strand={ctmf.strand} />
            </div>
            <p className={styles.cardExcerpt}>
              {ctmf.explanation?.substring(0, 130)}…
            </p>
            <div className={styles.pills}>
              {ctmf.projects?.map((p) => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No CTMFs match the selected filters.</p>
      )}
    </div>
  );
}
