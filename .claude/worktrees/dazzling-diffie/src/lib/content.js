import fs from 'fs';
import path from 'path';
import { parseFrontmatter, markdownToHtml } from './markdown';

const contentDir = path.join(process.cwd(), 'content');

function getMarkdownFiles(subdir) {
  const dir = path.join(contentDir, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.md$/, ''), filePath: path.join(dir, f) }));
}

async function readMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, rawContent } = parseFrontmatter(raw);
  const htmlContent = await markdownToHtml(rawContent);
  return { frontmatter, htmlContent };
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function getAllProjects() {
  const files = getMarkdownFiles('projects');
  const projects = await Promise.all(
    files.map(async ({ slug, filePath }) => {
      const { frontmatter, htmlContent } = await readMarkdownFile(filePath);
      return { slug, ...frontmatter, htmlContent };
    })
  );
  return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getProjectBySlug(slug) {
  const fp = path.join(contentDir, 'projects', `${slug}.md`);
  if (!fs.existsSync(fp)) return null;
  const { frontmatter, htmlContent } = await readMarkdownFile(fp);
  return { slug, ...frontmatter, htmlContent };
}

export function getProjectSlugs() {
  return getMarkdownFiles('projects').map(({ slug }) => slug);
}

// ── CTMFs ─────────────────────────────────────────────────────────────────────

export async function getAllCtmfs() {
  const files = getMarkdownFiles('ctmfs');
  const ctmfs = await Promise.all(
    files.map(async ({ slug, filePath }) => {
      const { frontmatter, htmlContent } = await readMarkdownFile(filePath);
      return { slug, ...frontmatter, htmlContent };
    })
  );
  return ctmfs.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function getCtmfBySlug(slug) {
  const fp = path.join(contentDir, 'ctmfs', `${slug}.md`);
  if (!fs.existsSync(fp)) return null;
  const { frontmatter, htmlContent } = await readMarkdownFile(fp);
  return { slug, ...frontmatter, htmlContent };
}

export function getCtmfSlugs() {
  return getMarkdownFiles('ctmfs').map(({ slug }) => slug);
}

// ── Single files ──────────────────────────────────────────────────────────────

export async function getPosition() {
  const fp = path.join(contentDir, 'position.md');
  if (!fs.existsSync(fp)) return null;
  const { frontmatter, htmlContent } = await readMarkdownFile(fp);
  return { ...frontmatter, htmlContent };
}

export async function getAbout() {
  const fp = path.join(contentDir, 'about.md');
  if (!fs.existsSync(fp)) return null;
  const { frontmatter, htmlContent } = await readMarkdownFile(fp);
  return { ...frontmatter, htmlContent };
}
