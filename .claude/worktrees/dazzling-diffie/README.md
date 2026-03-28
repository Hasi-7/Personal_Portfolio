# [YOUR NAME] — Engineering Portfolio

Personal engineering design portfolio. Built with Next.js 14 for ESC102 (Praxis II) at the University of Toronto, designed to grow as a long-term project portfolio.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site hot-reloads on file changes.

---

## How to Add a New Project

1. Create a new file in `content/projects/` — e.g., `content/projects/my-project.md`
2. Add the following frontmatter:

```yaml
---
title: "My Project Title"
slug: "my-project"          # must match the filename (without .md)
type: "Project Type"        # e.g., "Structural Design", "Software"
date: "2026-09-01"          # ISO date — used for sorting (newest first)
description: "One sentence shown on the project card."
summary: "2–3 sentence summary for the project detail page."
ctmfs:                      # list of CTMF slugs used in this project
  - stakeholder-mapping
  - brainstorming
---

## Your markdown content here
```

3. That's it. The project card appears automatically on `/projects` and the detail page is at `/projects/my-project`.

---

## How to Add a New CTMF

1. Create a new file in `content/ctmfs/` — e.g., `content/ctmfs/journey-mapping.md`
2. Add the following frontmatter:

```yaml
---
name: "Journey Mapping"
slug: "journey-mapping"     # must match the filename (without .md)
strand: "frame"             # one of: frame | diverge | converge | represent
projects:                   # list of project slugs where this CTMF was used
  - praxis-i
explanation: "What this CTMF is and how it works."
evidence: "How and where you used it specifically."
utilityAssessment: "How useful you found it and why."
fitAssessment: "How well it fits your personal design practice."
---
```

3. The CTMF card appears automatically on `/ctmfs` (filterable). Its detail page is at `/ctmfs/journey-mapping`.

---

## How to Update the Position Statement

Open `content/position.md`:

```yaml
---
title: "Position Statement"
youtubeVideoId: "YOUR_VIDEO_ID"    # ← replace with your YouTube video ID
---

Your annotation text here as markdown.
```

- **YouTube video ID**: the part after `watch?v=` in a YouTube URL (e.g., `dQw4w9WgXcQ`)
- The video is embedded with `youtube-nocookie.com` (privacy-enhanced mode — no white borders)
- The annotation appears below the video as a readable prose block

---

## Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Vercel auto-detects Next.js — leave all settings as defaults
4. Click **Deploy**

Your site goes live at `https://your-repo-name.vercel.app` within ~2 minutes. Every push to `main` triggers an automatic redeploy.

---

## Adding a Custom Domain on Vercel

1. Purchase your domain from any registrar (Namecheap, Cloudflare, etc.)
2. In your Vercel project → **Settings → Domains** → **Add Domain**
3. Enter your domain (e.g., `yourname.dev`)
4. Add these DNS records at your registrar:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | `@`  | `76.76.21.21`          |
| CNAME | `www`| `cname.vercel-dns.com` |

5. DNS propagates in 5–30 minutes. Vercel automatically provisions SSL (HTTPS).

No code changes are needed to add a custom domain.

---

## Exporting to PDF (Academic Submission)

1. `npm run dev` → open the page you want in your browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Set destination to **Save as PDF**, margins to **Default**
4. Save

The print stylesheet automatically switches to a light background with dark text, removes the navbar, and disables all animations — producing a clean, readable document.

---

## Placeholders to Replace

| Placeholder | Location | What to change |
|---|---|---|
| `[YOUR NAME]` | `src/components/Navbar/Navbar.js`, `src/components/Footer/Footer.js`, `src/app/layout.js`, hero `TypeWriter` text in `src/app/page.js` | Your full name |
| `YOUR_VIDEO_ID` | `content/position.md` frontmatter | Your unlisted YouTube video ID |
| `[placeholder: ...]` | All three project markdown files | Your actual project details |

---

## Project Structure

```
content/
  position.md          # YouTube video ID + annotation text
  about.md             # About page markdown
  projects/            # One .md file per project
  ctmfs/               # One .md file per CTMF (12 included)
src/
  app/                 # Next.js App Router pages
  components/          # Reusable React components
  lib/                 # Content parsing utilities (markdown.js, content.js, constants.js)
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, full static export)
- **Styling:** CSS Modules + CSS custom properties (no Tailwind)
- **Content:** Markdown files with gray-matter + remark
- **Fonts:** Inter + JetBrains Mono (self-hosted via next/font/google)
- **Deployment:** Vercel (free tier)
