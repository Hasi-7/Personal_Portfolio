import { STRANDS } from '@/lib/constants';
import styles from './StrandTag.module.css';

export default function StrandTag({ strand }) {
  const info = STRANDS[strand];
  if (!info) return null;
  return (
    <span className={styles.tag} style={{ color: info.color, borderColor: info.color }}>
      {info.label}
    </span>
  );
}
