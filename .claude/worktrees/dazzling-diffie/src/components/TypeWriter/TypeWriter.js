'use client';

import { useState, useEffect } from 'react';
import styles from './TypeWriter.module.css';

export default function TypeWriter({ text, speed = 80, startDelay = 400 }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={styles.typewriter}>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
