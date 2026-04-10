---
title: "CIV102 — Structural Bridge Design"
slug: "civ102-bridge"
type: "Structural Engineering"
date: "2025-11"
description: "Designed and built a model bridge to meet specific load requirements, applying structural analysis principles and material science fundamentals."
summary: "Designed, analysed, and built a matboard box-girder bridge through multiple quantified design iterations, balancing buckling risk, shear demand, and material constraints before converging on a buildable final geometry."
teamCredits:
  - "This bridge was completed as a team project in CIV102."
  - "Team members: Aditi Datla, Samantha Chang, Perry Xu."
  - "Analysis, construction, and testing activities were distributed across the team and integrated into a shared final design."
ctmfs:
  - iterative-design
  - mathematical-modelling
  - technical-drawing
---

## Summary

CIV102 (Structures and Materials) culminates in a bridge design project where teams design and construct a matboard bridge under strict geometric and material constraints [3]. The bridge had to span a 1200 mm support distance (minimum built length 1250 mm), use only the provided matboard and contact cement, and carry a moving train load that increased until failure during testing [8].

The work combined structural analysis and physical fabrication. We used shear-force and bending-moment envelopes, thin-plate buckling checks, glue and matboard shear checks, and repeated cross-section redesign to increase the minimum factor of safety while staying buildable [8], [9].

## Outcomes

![CAD model of final bridge design](/images/projects/civ102-bridge/figure-1.png)
*Figure 1: CAD Model of the Final Bridge Design [8]*

![Final bridge after construction](/images/projects/civ102-bridge/figure-2.png)
*Figure 2: Final Bridge Built [9]*

Our final bridge was a thin-walled box-girder style beam, approximately 1256 mm long, with a double-layer top deck, two vertical walls, an internal top spine through the high-moment region, and 16 diaphragms distributed along the span [8]. Diaphragms were spaced quadratically, denser near supports where shear demand was higher and wider near midspan to reduce unnecessary material.

The CAD model (Figure 1) helped us lock geometry, diaphragm strategy, and splice planning before fabrication, and the constructed bridge (Figure 2) shows how closely the final build followed that design intent [8], [9]. The design process was highly iterative. We moved through major cross-section families (Design 0, modified Design 0, I-section variants, U- and box-like variants, and two Pi-symbol iterations), using calculations and code output each time to identify governing failure modes and decide what to change next [8].

Key design decisions included:

- converging to a box-like/Pi-style cross-section to reduce torsional vulnerability and improve stiffness efficiency relative to I-section concepts
- prioritizing balance between compressive and shear-buckling factors of safety instead of maximizing one metric at the expense of others
- using quadratic diaphragm spacing and planned splice locations to reinforce high-demand regions while preserving material for the full build
- using a double-layer top deck and an internal spine to improve local stability in the most critical bending region

<div class="md-clear"></div>

![Final Pi-style bridge cross-section dimensions](/images/projects/civ102-bridge/figure-7.png)
*Figure 3: Dimensions of Bridge Cross Section in mm with spine spanning 355mm across center of bridge [8]*

## Key outcomes included:

- Produced a complete, buildable bridge geometry with matching engineering drawings, cut layout, splice plan, and documented construction process [8], [9]
- Final converged iteration used a 120 mm by 118 mm Pi-style cross-section with 16 diaphragms and balanced critical FOS values (including compressive and local shear-buckling checks) [8]
- Analysis and coding workflow supported evidence-based elimination of weaker iterations and convergence on a design that met project constraints [8]
- Team construction process translated the analytical design into a physical bridge using controlled gluing, staged drying/clamping, and documented quality-control adjustments [9]

## Reflection

What I am most proud of is our final build quality with limited resources. Our bridge failed earlier than predicted because we underestimated splice weakness and did not reinforce that region enough, but outside of that oversight, the build quality was strong and the overall geometry performed as intended [8], [9].

The biggest turning point was fixing our matboard cut-layout problem. A measurement error made it look like the bridge would not fit without major compromises, which caused a lot of panic. Once Perry found workable tradeoffs using Aditi's optimization algorithm, we regained confidence and moved forward with a design that was both buildable and promising [8], [9].

Early on, we eliminated Design 0-adjacent concepts, especially base-heavy options, because modelling showed they used material inefficiently: tensile capacity became too strong while compression still governed [8]. The key tradeoff was compression versus shear, so we tuned height-to-thickness ratios to balance both in code. The hardest part was then executing the build, which took about 20 hours of sustained precision [9]. That made one lesson clear for me: a theoretically stronger bridge is not better if it is too difficult to build cleanly. If I repeated this project, I would start cross-section optimization earlier and enforce stricter team cross-checking, because even strong contributors are human and early verification prevents costly mistakes.
