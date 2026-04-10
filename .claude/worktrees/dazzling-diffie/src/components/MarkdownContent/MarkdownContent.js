import styles from './MarkdownContent.module.css';

export default function MarkdownContent({ html }) {
  const withInlineFigureBlocks = html.replace(
    /<p>\s*(<img[^>]*>)\s*<em>(Figure\s+\d+:[\s\S]*?)<\/em>\s*<\/p>/g,
    '<figure class="md-figure-right">$1<figcaption>$2</figcaption></figure>'
  );

  const figureWrappedHtml = withInlineFigureBlocks.replace(
    /<p>\s*(<img[^>]*>)\s*<\/p>\s*<p>\s*<em>(Figure\s+\d+:[\s\S]*?)<\/em>\s*<\/p>/g,
    '<figure class="md-figure-right">$1<figcaption>$2</figcaption></figure>'
  );

  const outcomesLaidOutHtml = figureWrappedHtml.replace(
    /(<h2>Outcomes<\/h2>\s*)((?:<figure class="md-figure-right">[\s\S]*?<\/figure>\s*){3,5})/,
    (fullMatch, headingHtml, figuresHtml) => {
      const figures = [...figuresHtml.matchAll(/<figure class="md-figure-right">[\s\S]*?<\/figure>/g)].map((m) => m[0]);
      if (figures.length < 3 || figures.length > 5) return fullMatch;

      const leftColumn = figures.length === 3
        ? `${figures[0]}`
        : figures.length === 4
          ? `${figures[0]}${figures[2]}`
          : `${figures[0]}${figures[3]}`;

      const rightColumn = figures.length === 3
        ? `${figures[1]}${figures[2]}`
        : figures.length === 4
          ? `${figures[1]}${figures[3]}`
          : `${figures[1]}${figures[2]}${figures[4]}`;

      return `${headingHtml}<div class="md-outcomes-media"><div class="md-outcomes-grid"><div class="md-outcomes-column">${leftColumn}</div><div class="md-outcomes-column">${rightColumn}</div></div></div>`;
    }
  );

  const withOutcomesClear = outcomesLaidOutHtml.replace(
    /<h2>Process Annotation<\/h2>/,
    '<div class="md-outcomes-clear"></div><h2>Process Annotation</h2>'
  );

  return (
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: withOutcomesClear }} />
  );
}
