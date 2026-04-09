# Hasnain Heryani — Season 01 Portfolio

Personal engineering design portfolio for ESC102 Praxis II, University of Toronto Engineering Science.

---

## Viewing the Site

**Option 1 — VS Code Live Server (recommended)**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

**Option 2 — Python**
```bash
python -m http.server 5500
```
Then open `http://localhost:5500` in your browser.

> Do not open `index.html` as a `file://` URL — Google Fonts and some browser APIs require HTTP.

---

## Site Structure

```
/
├── index.html          Homepage — rain photo, visor animation, HUD panels
├── systems.html        Projects — Praxis I, CIV102 Bridge, Praxis II
├── driver.html         About Me — profile, background, skills, contact
├── driver-dna.html     Position Statement — origin video, beliefs, evolution
├── logbook.html        CTMFs — 11 cards, filterable by strand
├── references.html     APA reference list
└── assets/
    ├── css/
    │   ├── tokens.css      Design tokens (colors, fonts, spacing)
    │   ├── base.css        Reset and base styles
    │   ├── nav.css         Persistent HUD nav bar
    │   └── transitions.css Page transitions and W04 car
    ├── js/
    │   ├── audio.js        Howler.js sound system (off by default)
    │   ├── visor.js        Scroll-triggered visor animation (GSAP)
    │   ├── hud.js          HUD panel interactions and breathing glow
    │   └── transitions.js  Directional page transitions and W04 return car
    ├── images/
    │   ├── rain-bg.jpg     Mercedes W04 trackside rain photo (Layer 1)
    │   ├── cockpit.png     Mercedes cockpit interior — mix-blend-mode: multiply (Layer 2)
    │   └── w04-car.jpg     W04 cutout — mix-blend-mode: multiply, right edge of inner pages
    └── sounds/
        ├── v8-idle.mp3     Short V8 engine idle
        ├── visor-close.mp3 Visor whoosh
        ├── panel-hover.mp3 HUD panel tick
        └── transition.mp3  Page transition swoosh
```

---

## Content Placeholders

All locations requiring Hasnain's personal content are marked with `[PLACEHOLDER: ...]`. Open each file and search for `PLACEHOLDER` to find them.

| Page | What to fill in |
|---|---|
| `systems.html` | Project titles, summaries, case study details, team credit, CTMF links, project images |
| `driver.html` | Personal background paragraph, GitHub/LinkedIn URLs, email address, skill levels |
| `driver-dna.html` | YouTube video ID, core belief quotes, evolution reflections, current position statement |
| `logbook.html` | All 11 CTMF names, definitions, where-used, and assessments |
| `references.html` | All APA references |

### Adding the YouTube video (driver-dna.html)
Find `VIDEO_ID_PLACEHOLDER` and replace with your video ID.
If your URL is `https://www.youtube.com/watch?v=abc123`, use `abc123`.

### Adding project images
Create `assets/images/projects/` and drop images there.
Then update the `<img>` tags in `systems.html` (currently showing placeholder text).

---

## Sound Files

The site uses Howler.js for audio. Sound is **off by default** — the user must click the 🔇 toggle to enable it. If the sound files are missing, Howler fails silently and everything else works fine.

Source free audio at [freesound.org](https://freesound.org) or record your own. Place files at:
- `assets/sounds/v8-idle.mp3`
- `assets/sounds/visor-close.mp3`
- `assets/sounds/panel-hover.mp3`
- `assets/sounds/transition.mp3`

---

## Tech Stack

- **HTML / CSS / JavaScript** — vanilla, no frameworks
- **GSAP 3** (CDN) — all animations
- **Howler.js** (CDN) — audio
- **Google Fonts** (CDN) — Orbitron, Rajdhani, Share Tech Mono, Inter
- No build tools required. No localStorage used.

---

## Course Requirements Checklist (ESC102 Praxis II)

- [ ] Position statement page exists and iterates on January 2026 original
- [ ] Original position video embedded
- [ ] One-page summary for Praxis I project
- [ ] One-page summary for CIV102 Bridge project
- [ ] One-page summary for Praxis II project
- [ ] Each project has a position annotation
- [ ] Each project links to at least 3 CTMFs
- [ ] At least 9 distinct CTMFs total
- [ ] CTMFs cover all four strands: Frame, Diverge, Converge, Represent
- [ ] Team credit present on all group project pages
- [ ] References page exists with APA citations
- [ ] Submit PDF to Quercus (URL + screenshots of all main pages)

---

## Design Notes

The aesthetic is 2013 Mercedes Silver Arrows. The only accent colour is **Petronas teal `#00d2be`**. Do not introduce other accent colours. All design decisions are governed by `PLAN.md` and `AGENTS.md` at the project root.
