# PLAN.md — Hasnain Heryani Portfolio: Season 1
## Full Build Plan for Claude Code / Codex

---

## The Narrative

> *In 2013, Hamilton joined Mercedes looking for a new challenge in his career. He had just begun his journey at McLaren and made a leap of faith into something new. In the same way, Hasnain is making his own leap into UofT Engineering Science. With the start of this journey, this portfolio shows Season 1 of the new life ahead.*

This story must thread through every design decision. The F1 metaphor is not decoration — it is the identity of the portfolio.

---

## Overview

A personal engineering design portfolio for ESC102 (UofT Engineering Science Praxis II), built as an interactive website with an F1 cockpit HUD as the homepage experience. The site blends 2013 Mercedes Silver Arrows aesthetic with modern cinematic web interaction.

**Stack:** Vanilla HTML, CSS, JavaScript only  
**Libraries:** GSAP + ScrollTrigger, Howler.js  
**Fonts:** Google Fonts CDN (Orbitron, Rajdhani, Share Tech Mono, Inter)  
**No frameworks, no localStorage, no build tools required**

---

## File Structure

```
portfolio/
├── index.html               ← Homepage (cockpit + visor + HUD)
├── systems.html             ← Projects page
├── driver.html              ← About Me page
├── driver-dna.html          ← Position Statement page
├── logbook.html             ← CTMFs page
├── references.html          ← References page
├── assets/
│   ├── css/
│   │   ├── tokens.css       ← Design tokens (colors, fonts, spacing)
│   │   ├── base.css         ← Reset + base styles
│   │   ├── nav.css          ← Persistent HUD nav bar
│   │   └── transitions.css  ← Page transition animations
│   ├── js/
│   │   ├── audio.js         ← Howler.js sound management
│   │   ├── visor.js         ← Scroll-triggered visor animation (GSAP)
│   │   ├── transitions.js   ← Page navigation transitions (GSAP)
│   │   └── hud.js           ← HUD panel interactions
│   ├── sounds/
│   │   ├── v8-idle.mp3      ← Short V8 engine idle (2-3s)
│   │   ├── visor-close.mp3  ← Visor whoosh sound
│   │   ├── panel-hover.mp3  ← Subtle tick on panel hover
│   │   └── transition.mp3   ← Page transition swoosh
│   └── images/
│       ├── cockpit-bg.jpg   ← Real F1 cockpit night/rain photo (sourced separately)
│       ├── w04-car.png      ← Mercedes W04 PNG cutout (transparent bg)
│       └── projects/        ← Project images and diagrams
```

---

## Page 1: index.html — The Cockpit Homepage

### Scene 1: Minimal Name + Scroll Prompt (Initial State)

- Full-viewport background: rain-bg.jpg, brightness(0.35) saturate(0.8), cover, center 40%
- Cockpit overlay hidden — NOT visible until after visor closes
- No panels, no boxes, no UI chrome. The photo does all the work.
- Center of screen — two lines of text only:

    HASNAIN HERYANI              ← Orbitron Bold, --text-2xl, white, dead center
    Engineering Science · Season 01  ← Rajdhani, --text-sm, muted gray, letter-spaced

- Both lines centered: position absolute, top 50%, left 50%, translate(-50%,-50%), text-align center
- Name fades in on load: opacity 0 → 1, 1.2s ease-out, delay 0.3s (GSAP)
- Subtitle fades in: opacity 0 → 1, 0.8s, delay 1.0s (GSAP)
- Bottom center scroll prompt:

    ↓  SCROLL TO BEGIN   ← Rajdhani, --text-xs, muted gray, uppercase, letter-spacing 0.15em

  - Fade in delay 2.0s, 0.6s duration
  - Infinite gentle bounce: translateY 0px → 6px → 0px, 2s sine ease, yoyo, GSAP
  - No border, no box — plain text only

### Scene 1: Audio on Load
- 1.5s after load: V8 idle plays (if audio enabled)
- Sound OFF by default
- Small 🔊 toggle top-right corner — the ONLY interactive element before scroll

### Scene 2: Visor Close (Scroll Trigger)

Trigger: First scroll input detected (any amount). Scroll consumed by animation — page does not scroll.

Animation timeline (GSAP):
```
0ms      → Scroll detected. Dark visor panel begins sliding from top edge.
0-600ms  → Visor descends over cockpit. ease: cubic-bezier(0.16, 1, 0.3, 1)
600ms    → Glare sweep: thin diagonal gradient sweeps left→right in 200ms
           (linear-gradient: transparent → rgba(255,255,255,0.15) → transparent)
800ms    → Visor fully closed. Rain specks begin fading in on visor surface.
800ms    → Visor-close.mp3 plays (if audio on)
800-1000ms → HUD panels fade in sequentially:
             Top-left (SYSTEMS) at 800ms
             Top-right (DRIVER) at 850ms  
             Bottom-left (DRIVER DNA) at 900ms
             Bottom-right (LOGBOOK) at 950ms
             Each: opacity 0 → 1, translateY(8px) → 0
1400ms   → All panels visible. Teal glow fades in on all borders.
```

Visor surface:
- Background: `#0d0e10`
- Cool blue tint overlay: `rgba(168, 196, 212, 0.08)`
- CSS rain: small white dots (2-4px), varying opacity (0.3-0.8), slow downward drift with slight x-axis drift, 40-60 particles
- One subtle glare: static top-right elliptical highlight at 4% opacity

### Scene 3: HUD Menu (On Visor)

Four panels in a 2x2 grid. Centered on visor. Max-width 900px.

Each panel structure:
```html
<div class="hud-panel" data-direction="forward|left|down|right">
  <div class="panel-corners">  ← targeting bracket corners (CSS only)
  <span class="panel-label">SYSTEMS</span>
  <span class="panel-sublabel">Projects</span>
</div>
```

Panel styles:
- Background: `#1a1c20`, border: 1px solid `#00d2be`
- Corner accents: 2 perpendicular lines in each corner (CSS pseudo-elements), teal
- Label: Rajdhani Bold, uppercase, teal, `--text-xl`
- Sublabel: Inter, muted gray (`#7a8090`), `--text-sm`
- Hover: border brightens to full teal, background shifts to `#252830`, corner accents pulse, panel-hover.mp3 plays
- Transition: 180ms ease

Four panels:
| Position | Label | Sublabel | Link | Direction |
|---|---|---|---|---|
| Top-left | SYSTEMS | Projects | systems.html | zoom forward |
| Top-right | DRIVER | About Me | driver.html | pan left |
| Bottom-left | DRIVER DNA | Position Statement | driver-dna.html | pan down |
| Bottom-right | LOGBOOK | CTMFs | logbook.html | pan right |

Small teal line divider between the 2x2 grid sections (cross-hair style).

---

## Page Transition System

### Click → New Page (HUD panel click)

Duration: 0.65-0.7s, directional.

Directions:
- SYSTEMS (forward): panels scale up slightly and fade, new page fades in
- DRIVER (left): current page slides left off-screen, new page slides in from right
- DRIVER DNA (down): current page slides down, new page slides in from top
- LOGBOOK (right): current page slides right, new page slides in from left

After transition completes:
- The W04 car PNG appears at the edge corresponding to where it "came from":
  - SYSTEMS page: car at bottom-center (came from behind)
  - DRIVER page: car at right edge (came from the right)
  - DRIVER DNA page: car at top-center (came from above)
  - LOGBOOK page: car at left edge (came from the left)
- Car is small (80-100px wide), slightly transparent (70% opacity), with a subtle idle animation (very slow float)
- Car is clickable — clicking reverses the transition animation and returns to HUD
- transition.mp3 plays on click (if audio on)

### Car Click → Return to HUD

- Reverse of the entry animation
- transition.mp3 plays (reversed or same)
- Returns to visor state (HUD visible, cockpit behind)

---

## Persistent Nav Bar (All Inner Pages)

Present on all pages except the homepage.

Structure:
```
[◈ mark] HASNAIN HERYANI    SYSTEMS · DRIVER · DRIVER DNA · LOGBOOK · REFS    [🔊] [↩ COCKPIT]
```

Styles:
- Background: `#0d0e10`, border-bottom: 1px solid `#00d2be`
- Logo mark: custom SVG, teal, 24px
- Name: Rajdhani Bold, white, uppercase, `--text-sm`
- Nav links: Rajdhani, uppercase, muted gray, teal on hover, `--text-xs`, letter-spacing 0.1em
- Sound toggle: 🔊, teal when on, muted gray when off
- Cockpit button: Rajdhani, teal, "↩ COCKPIT", triggers reverse transition on click
- Height: 56px, sticky top

---

## Page 2: systems.html — Projects (SYSTEMS)

Header section:
- Panel-style header: "SYSTEMS" in Orbitron, large, teal border frame
- Subtitle: "Selected Design Work — Season 01"

Three required project cards (full-width, stacked):

### Card Structure (each project)
```
┌─────────────────────────────────────────────────┐
│ [PROJECT IMAGE/DIAGRAM — 40% width, left side]  │
│                          [Project title — right]│
│                          [Tags: team, term, role]│
│                          [One paragraph summary] │
│                          [→ VIEW CASE STUDY]    │
└─────────────────────────────────────────────────┘
```

Card styles:
- Background: `#1a1c20`
- Thin teal left accent: a 1px teal line on the left edge of the title only (NOT a thick colored left border on the whole card)
- Tags: small pills, Rajdhani, uppercase, dark bg + teal border
- Arrow CTA: teal, Rajdhani, with a `→` that animates on hover

Three required project entries:
1. **Praxis I Project** — from Fall 2025 semester
2. **CIV102 Bridge Project** — structural design project
3. **Praxis II Project** — current semester (in progress if needed)

Each project card expands or links to a case study section/page with:
- Context and stakeholders
- Design process followed
- Key decisions made
- Final outcome or prototype
- Team credit (names of teammates, what they contributed)
- Annotation: how this project reflects your position as an engineering designer
- At least 3 CTMFs used (linked to LOGBOOK entries)

---

## Page 3: driver.html — About Me (DRIVER)

Minimal, personal, warm — the simplest page visually.

Sections:
1. **DRIVER PROFILE** — name, role, team (UofT EngSci), photo if desired
2. **BACKGROUND** — short paragraph: where you're from, how you got into engineering, and the 2013 parallel — Hamilton made a leap of faith from McLaren to Mercedes looking for a new challenge; Hasnain is making the same kind of leap into UofT Engineering Science. This portfolio is Season 1.
3. **INTERESTS** — tag cloud or labeled list: F1, FPV Drones, AI/ML, Robotics, Gaming, Sci-Fi, Fantasy, Minecraft
4. **TECHNICAL SYSTEMS** — skills listed as HUD-style readouts (e.g., "PYTHON ████████░░", "ROS ██████░░░░") — progress bar style, teal fill
5. **CONTACT / LINKS** — GitHub, LinkedIn, Email — simple teal icon links

---

## Page 4: driver-dna.html — Position Statement (DRIVER DNA)

This is the most important page academically. It must show evolution.

### Section 1: Origin
- Heading: "WHERE I STARTED"
- Embed the original Minecraft YouTube video (full width or near-full)
- Short text below: "In January 2026, before the season began, this is where I stood. This is my engineering origin story."
- Brief 2-3 sentence summary of what the video communicates about your original position

### Section 2: The Position (Original)
- Pull out 3-4 core beliefs from the video, presented as styled quote panels or cards:
  - e.g., "Engineering is building systems that solve real problems"
  - e.g., "I learn best by doing, then reflecting"
  - e.g., "The best designs come from understanding the person who uses them"
- Each panel: teal left indicator line, quote in Orbitron italic, source note below

### Section 3: Evolution — Season 01
- Heading: "HOW THE SEASON CHANGED ME"
- 3-4 reflection paragraphs tied to specific experiences this semester:
  - Praxis I: what it taught you about design thinking
  - CIV102: what structural constraints taught you about tradeoffs
  - Praxis II: how your approach to teamwork and process has evolved
  - Personal: any moment from drones/research/design team that shifted your thinking
- Tone: honest, direct, personal — written in your voice, not academic

### Section 4: Current Position
- A short, clear statement of your position TODAY as an engineering designer
- 1 paragraph max
- This is your "updated position statement" for the portfolio requirement

---

## Page 5: logbook.html — CTMFs (LOGBOOK)

### Header
"LOGBOOK" in Orbitron, subtitle: "Concepts, Tools, Models & Frameworks — Season 01"

### Filter Bar
Four filter buttons: FRAME | DIVERGE | CONVERGE | REPRESENT
Clicking filters which CTMF cards are visible. All shown by default.

### CTMF Cards (minimum 9)

Each card:
```
┌─────────────────────────────────────────────────┐
│ [FDCR TAG]  CTMF NAME                           │
│ ─────────────────────────────────────────────── │
│ WHAT IT IS                                      │
│ One sentence definition.                        │
│                                                 │
│ WHERE I USED IT                                 │
│ Project name + specific context                 │
│                                                 │
│ MY ASSESSMENT                                   │
│ When to use it, when not to, what you gained    │
└─────────────────────────────────────────────────┘
```

Card styles:
- Background: `#1a1c20`, thin teal border
- FDCR tag: colored pill — FRAME: amber, DIVERGE: teal, CONVERGE: silver, REPRESENT: muted blue
- Section labels: Rajdhani, uppercase, muted gray, tiny, letter-spaced
- Content: Inter, `--text-base`

Minimum CTMF distribution:
- At least 3 CTMFs tagged FRAME
- At least 3 tagged DIVERGE
- At least 3 tagged CONVERGE
- At least 2 tagged REPRESENT
- Each of the 3 required projects must connect to at least 3 CTMFs
- (Hasnain to fill in actual CTMF names and content — Claude builds the card structure with placeholder content)

---

## Page 6: references.html — References

Simple, clean page.

"REFERENCES" heading, subtitle: "All cited works in Praxis embedded extract format (APA)"

Plain list of references, formatted per Praxis requirements. Inter body font. Teal section dividers.

(Hasnain to supply actual references — Claude builds the structure)

---

## Design Tokens (tokens.css)

```css
:root {
  /* Colors */
  --color-bg:              #0d0e10;
  --color-surface:         #1a1c20;
  --color-surface-raised:  #252830;
  --color-border:          #00d2be;
  --color-border-muted:    rgba(0, 210, 190, 0.3);
  --color-text:            #e8eaf0;
  --color-text-muted:      #7a8090;
  --color-text-faint:      #3d4050;
  --color-accent:          #00d2be;   /* Petronas teal */
  --color-accent-hover:    #00f5e0;
  --color-amber:           #f5a623;   /* Status/warning */
  --color-rain-tint:       rgba(168, 196, 212, 0.08);

  /* Typography */
  --font-display:  'Orbitron', sans-serif;
  --font-hud:      'Rajdhani', sans-serif;
  --font-mono:     'Share Tech Mono', monospace;
  --font-body:     'Inter', sans-serif;

  /* Type Scale */
  --text-xs:    clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:    clamp(0.875rem, 0.8rem  + 0.35vw, 1rem);
  --text-base:  clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
  --text-lg:    clamp(1.125rem, 1rem    + 0.75vw, 1.5rem);
  --text-xl:    clamp(1.5rem,   1.2rem  + 1.25vw, 2.25rem);
  --text-2xl:   clamp(2rem,     1.2rem  + 2.5vw,  3.5rem);
  --text-hero:  clamp(2.5rem,   1rem    + 4vw,    5rem);

  /* Spacing */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;

  /* Transitions */
  --transition-fast: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 1400ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Shadows */
  --shadow-teal-sm: 0 0 8px rgba(0, 210, 190, 0.15);
  --shadow-teal-md: 0 0 20px rgba(0, 210, 190, 0.25);

  /* Content widths */
  --content-default: 960px;
  --content-wide:    1200px;
}
```

---

## Animation Spec

### Visor Close (visor.js)
```javascript
// GSAP ScrollTrigger — fire once on first scroll
// visor panel: position fixed, top: -100vh initially
// on scroll: gsap.to(visor, { top: 0, duration: 0.6, ease: "power2.inOut" })
// then: glare sweep, rain fade-in, HUD panel stagger
```

### Rain Effect (canvas)
- 50 particles, random x position, random y start
- Speed: 1.5-3px per frame, slight x drift
- Size: 1.5-3px circle, opacity 0.3-0.7
- Canvas overlay on visor element only

### Breathing Glow (hud.js)
```javascript
// Repeating GSAP tween on steering wheel border
// gsap.to(border, { boxShadow: "0 0 20px rgba(0,210,190,0.6)", 
//   duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" })
```

### Car Float Animation (transitions.js)
```javascript
// Idle float on car PNG
// gsap.to(car, { y: -6, duration: 2.5, yoyo: true, repeat: -1, ease: "sine.inOut" })
```

---

## Sound System (audio.js)

```javascript
// Howler.js
const sounds = {
  v8:         new Howl({ src: ['assets/sounds/v8-idle.mp3'],   volume: 0.25 }),
  visor:      new Howl({ src: ['assets/sounds/visor-close.mp3'], volume: 0.25 }),
  hover:      new Howl({ src: ['assets/sounds/panel-hover.mp3'], volume: 0.15 }),
  transition: new Howl({ src: ['assets/sounds/transition.mp3'], volume: 0.30 })
};

// Mute state stored in JS variable (not localStorage)
let soundEnabled = false;

// Toggle button updates soundEnabled and visual state
// All sound.play() calls check soundEnabled first
```

---

## Accessibility & Performance

- `prefers-reduced-motion`: disables all GSAP animations, visor still closes but instantly
- All images: `loading="lazy"`, `alt` text, `width`/`height` set
- All nav links keyboard accessible, visible `:focus-visible` ring (teal, 2px)
- Sound off by default (user must enable)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- One `<h1>` per page, heading hierarchy respected
- Touch targets minimum 44x44px
- External links: `target="_blank" rel="noopener noreferrer"`

---

## Build Order

1. `tokens.css` + `base.css` (design system foundation)
2. `index.html` — Scene 1 (steering wheel display, static, no animation)
3. `index.html` — Scene 2 (visor.js, GSAP scroll trigger)
4. `index.html` — Scene 3 (HUD panels, hover states)
5. `transitions.js` (page transition system + W04 car mechanic)
6. `nav.css` + nav bar HTML component (add to all inner pages)
7. `systems.html` (all three project cards + case study structure)
8. `driver.html`
9. `driver-dna.html`
10. `logbook.html` (card structure with placeholder CTMFs)
11. `references.html`
12. `audio.js` + sound toggle (add last, test on all pages)
13. Full QA pass: desktop 1280px+, verify all transitions, verify all links

