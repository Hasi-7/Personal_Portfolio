/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgPagesRepo = repoName.endsWith('.github.io');
const basePath = isGithubActions && !isUserOrOrgPagesRepo ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
