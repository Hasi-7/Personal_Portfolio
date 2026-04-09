# AGENTS.md — Build Rules for Claude Code / Codex

These rules are non-negotiable. Read them fully before writing any code.

---

## Identity & Narrative

- This portfolio represents **Season 1** of Hasnain's engineering journey at UofT. In 2013, Hamilton joined Mercedes looking for a new challenge — he had just begun his journey at McLaren and made a leap of faith. In the same way, Hasnain is making his own leap into UofT Engineering Science. This portfolio is the start of the new life ahead of him. The F1 metaphor is the soul of the site, not a decoration.
- If in doubt about a creative choice, ask: *does this feel like the start of something great, or does it feel like a template?*

---

## Protected Files — DO NOT TOUCH

- **`.claude/`** — do not read, modify, delete, or create any files inside this folder
- **`Old/`** — do not read, modify, delete, or create any files inside this folder
- These folders belong to a previous version of the site and must be left completely untouched
- All new files must be created at the root level or inside a new `assets/` folder only

## Tech Rules

### Stack (Hard Limits)
- **Vanilla HTML, CSS, JavaScript only.** No React, Vue, Svelte, or any JS framework.
- **Allowed libraries (CDN only):** GSAP + ScrollTrigger, Howler.js
- **Fonts:** Google Fonts CDN only — Orbitron, Rajdhani, Share Tech Mono, Inter
- **No localStorage or sessionStorage** — the site runs in sandboxed environments that block storage. Use in-memory JS variables for all state.
- **No server-side code.** Static files only.
- **No build tools** required. All files must work when opened directly.

### Image Assets (Critical)
- `assets/images/rain-bg.jpg` — Mercedes W04 trackside rain photo. **Layer 1.** Always visible. Darkened via CSS `brightness(0.35) saturate(0.8)`. On visor close: GSAP zooms it to `scale(1.15)` then CSS transitions to `blur(6px) brightness(0.5)`.
- `assets/images/cockpit.jpg` — Mercedes cockpit interior, **white background**. **Layer 2.** `mix-blend-mode: multiply` — white becomes transparent, rain photo shows through all white gaps in the image. Opacity 0 initially, fades to 1 after visor closes.
- **DO NOT** swap these blend modes. `multiply` only on `cockpit.jpg`. `rain-bg.jpg` uses no blend mode.
- **DO NOT** try to remove the white background with canvas or JS — `mix-blend-mode: multiply` handles it entirely in CSS.

### File Rules
- All paths must be relative (`./assets/css/tokens.css`, not `/assets/...`)
- All external links must use `target="_blank" rel="noopener noreferrer"`
- No inline styles except for dynamic values set by JavaScript (e.g., GSAP transforms)
- CSS custom properties (tokens) must be used for all colors, spacing, and fonts — never hardcoded hex or px values except inside `tokens.css`

---

## Design Rules

### Scene 1 — Restraint is Mandatory
- Scene 1 has **no panels, no boxes, no cards, no borders, no HUD chrome** of any kind.
- The only visible elements before scroll: the rain photo, the name, the subtitle, the scroll prompt, and the 🔊 toggle.
- Do not add anything else. The emptiness is intentional. The reveal is the payoff.
- Do not add a teal border, a panel, a display screen, or any decorative element to Scene 1.

### Colors
- The only accent color is **Petronas teal: `#00d2be`**
- The only secondary highlight is **amber: `#f5a623`** — used only for STATUS indicators and warnings
- Background must stay dark: `#0d0e10` base, `#1a1c20` for surfaces
- **Do not add purple, pink, blue, green, or any other accent colors.** Not even subtly.
- Glow effects use teal only, sparingly: max 2 glow effects visible at once on any screen

### Typography
- **Orbitron** — display only, headings at `--text-xl` and above
- **Rajdhani Bold uppercase** — HUD labels, nav links, panel headers, tags
- **Share Tech Mono** — all data/telemetry readouts, the steering wheel display content
- **Inter** — all body copy, annotations, paragraph text
- Never use Orbitron below 24px
- All label text: uppercase, letter-spacing 0.08-0.12em

### Layout
- Left-aligned as default. Do NOT center all headings and text.
- HUD panels: 2x2 grid, no exceptions
- Inner page content: max-width `960px`, centered with `margin-inline: auto`
- Section padding: `clamp(var(--space-8), 6vw, var(--space-24))`

### Anti-Patterns — NEVER Do These
- No purple/indigo/violet gradients anywhere
- No glowing orbs or abstract blob backgrounds
- No gradient buttons — use solid teal fill for CTAs
- No thick colored side-borders on cards (1px teal border on all sides, or none)
- No icons inside colored circles
- No centered text blocks for body copy or card content
- No emoji used as design elements
- No generic placeholder copy like "Lorem ipsum" or "Project Title Here" in the final build
- The site must not look like a Webflow template or AI-generated portfolio

---

## Animation Rules

- **All animations use GSAP.** Do not use CSS `@keyframes` for primary animations.
- **Visor sequence order is strict:** (1) rain-bg zoom → (2) visor panel slides down → (3) glare sweep → (4) cockpit overlay fade in + rain-bg blur → (5) HUD panels stagger in. Do not reorder.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for all smooth cinematic transitions
- Visor close: 1.4s total, cinematic (see PLAN.md timeline)
- Page transitions: 0.65-0.7s, directional
- Hover states: `var(--transition-fast)` = 180ms
- Car float: 2.5s sine ease, yoyo, infinite
- Breathing glow: 2s sine ease, yoyo, infinite
- **Always respect `prefers-reduced-motion`:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Never animate layout properties (width, height, top, left) — use `transform` and `opacity` only

---

## Sound Rules

- **Sound is OFF by default.** User must explicitly enable it.
- All sound calls must check `soundEnabled` variable before playing
- Sound toggle: small 🔊 icon in top-right of nav bar, teal when on, muted gray when off
- Use Howler.js for all audio management
- Do not autoplay audio on page load (the V8 idle is triggered 1.5s after load only if `soundEnabled === true`)

---

## Accessibility Rules

- Semantic HTML only: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- One `<h1>` per page. Heading hierarchy: h1 → h2 → h3, never skip levels.
- Every `<img>` must have `alt`, `width`, `height`, `loading="lazy"`
- Every icon-only button must have `aria-label`
- All interactive elements reachable via Tab key
- Visible `:focus-visible` ring: `outline: 2px solid var(--color-accent); outline-offset: 3px;`
- Touch targets minimum 44x44px
- WCAG AA contrast: body text 4.5:1, large text 3:1 minimum

---

## Content Rules

- **Never invent or fabricate project content.** If project details are not provided, use clearly marked placeholder text: `[PLACEHOLDER: Hasnain to fill in]`
- **Never invent CTMF names.** Use clearly marked placeholders: `[CTMF NAME — Hasnain to fill in]`
- **Never invent quotes or position statement text.** Use placeholders.
- Do not write Hasnain's personal reflections — mark them as placeholders
- Team credit sections on project pages must exist with placeholder: `[PLACEHOLDER: List teammates and their contributions]`
- References page must exist with placeholder: `[PLACEHOLDER: Hasnain to supply references in APA format]`

---

## Course Compliance Rules

These are hard requirements from the ESC102 assignment. The site must satisfy all of them:

1. Position statement page (DRIVER DNA) must exist and show evolution from original
2. One-page summaries for all three projects (Praxis I, CIV102 Bridge, Praxis II) must be present
3. Each project must have an annotation linking process to position
4. Each project must connect to at least 3 CTMFs
5. At least 9 distinct CTMFs total across all projects
6. CTMFs must span all four strands: Frame, Diverge, Converge, Represent
7. References page must exist
8. Team credit must appear on all group project pages

See `course_project_requirements.md` for full details.

---

## Build Process Rules

1. **Build in order.** Follow the Build Order in PLAN.md exactly. Do not skip ahead.
2. **Tokens and base CSS first.** Nothing else gets written until `tokens.css` and `base.css` are complete.
3. **Homepage before inner pages.** The cockpit/visor/HUD must work before any inner page is built.
4. **Transitions last (after all pages exist).** The W04 car mechanic requires all pages to be present.
5. **Sound last.** Add Howler.js integration only after all visual and interaction work is complete.
6. **Test at 1280px minimum.** Mobile is out of scope for this version.
7. **Do not add features not in PLAN.md** without checking first. Scope creep is the enemy given the 2-day deadline.

---

## What Success Looks Like

A grader opening this portfolio should think:
> *"I've never seen a student portfolio like this. I immediately understand who this person is, how they think, and what they've built. The design is confident and personal. Everything is easy to find. The writing sounds like a real person."*

A recruiter opening this portfolio should think:
> *"This person is technical, creative, and intentional. The site itself is a demonstration of their skills."*

