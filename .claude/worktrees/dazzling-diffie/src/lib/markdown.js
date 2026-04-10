import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export function parseFrontmatter(fileContent) {
  const { data, content } = matter(fileContent);
  return { frontmatter: data, rawContent: content };
}

export async function markdownToHtml(markdownContent) {
  const result = await remark().use(html).process(markdownContent);
  const htmlOutput = result.toString();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  if (!basePath) {
    return htmlOutput;
  }

  return htmlOutput
    .replace(/src="\/(?!\/)/g, `src="${basePath}/`)
    .replace(/href="\/(?!\/)/g, `href="${basePath}/`);
}
