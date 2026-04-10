---
title: "Motor Fault Detection via Sound Analysis for Professional FPV Drone Operations"
slug: "praxis-ii"
type: "Systems Design"
date: "2026-01 - 2026-04"
description: "In ESC102 Praxis II, our team designed and prototyped a pre-flight motor diagnostic tool for professional FPV drone operations, replacing subjective audio checks with FFT-based analysis and actionable pass/warn/fail outputs."
summary: "Worked with D.Vision Aerials to rescope a broad drone diagnostics opportunity into a buildable motor-health solution, then designed and tested a sound-analysis prototype that balanced feasibility, repeatability, and diagnostic value within first-year constraints."
teamCredits:
  - "Praxis II was completed with my ESC102 project team: Muhammed Ali Bhanji, Michael Lin, and Frank Yin."
  - "Opportunity framing, NGO development, convergence analysis, and prototype decisions were completed collaboratively."
  - "My main implementation contributions were the final sound-dampening test enclosure and software integration for the diagnostic pipeline."
ctmfs:
  - stakeholder-mapping
  - requirements-list
  - prototypes
---

## Summary

In ESC102 Praxis II, our team worked with the professional FPV drone cinematography community in the GTA through interviews and consultation with D.Vision Aerials. The core problem was that pre-flight motor health was being assessed subjectively by ear, even though operations occur in high-risk, high-pressure environments with major liability exposure and tight setup windows.

The original framing covered motor, battery, carbon-fiber frame, and radio-frequency diagnostics. After divergence, feasibility checks, and convergence analysis, we narrowed scope to motor fault detection so we could deliver a field-relevant prototype in the available timeline. This let us focus on one high-impact failure pathway while respecting stakeholder constraints around setup speed, repeatability, and non-invasive testing.

## Outcomes

![Praxis II one-pager summary](/images/projects/praxis-ii/figure-1.png)
*Figure 1: One-pager summary of the opportunity framing, design decisions, and next steps for the motor diagnostic concept.*

![Praxis II concept and architecture](/images/projects/praxis-ii/figure-2.png)
*Figure 2: Concept diagram and software workflow used for the sound-analysis motor diagnostic prototype.*

![Praxis II verification outputs](/images/projects/praxis-ii/figure-3.png)
*Figure 3: Verification outputs showing spectral indicators used to flag likely imbalance and misalignment behavior.*

We designed a pre-flight motor diagnostic prototype that uses sound analysis to support objective go/no-go decisions. The system tests one motor at a time, records audio in a sound-dampening enclosure, computes FFT-based features, and compares them against a healthy baseline profile.

The final workflow extracts frequency-domain indicators such as dominant frequency/amplitude, harmonic ratios, significant peak count, and band energy spread. It then classifies each motor into a simplified status output (Ready to Fly, Warning, or Do Not Fly) so results are actionable without requiring raw-signal interpretation on set.

During convergence, we compared this concept against vibration-based analysis (blackbox/IMU) and motor current signature analysis (MCSA). Sound analysis was selected because it had the simplest practical workflow, did not require a test flight, and did not require invasive access to motor terminals. It also provided broader diagnostic coverage in our evaluation (up to 8 fault types, versus 5 for vibration and 1 for current analysis). Vibration was harder to repeat reliably because each run depended on flight conditions, and current-based analysis was harder to stabilize because battery voltage fluctuations directly shifted the measured current profile.

## Key outcomes included:

- Rescoped a broad pre-flight diagnostics opportunity into a buildable motor-health problem with explicit needs, goals, and measurable objectives
- Built and demonstrated a working sound-analysis prototype integrating enclosure design, acquisition workflow, FFT feature extraction, and 3-state diagnostic output
- Used comparative convergence tools (measurement matrix + multi-reference Pugh analysis) to evaluate sound, vibration, and MCSA pathways before selecting a final direction
- Verified that the integrated app and diagnostic pipeline could run end-to-end within the project's practical time constraints
- Identified the main remaining gap as fault-verification rigor, with future work focused on larger labeled datasets and stronger repeatability/fault-injection testing

## Reflection

The biggest turning point for me was when our final app worked end-to-end and integrated all of our ideas into a single prototype. That moment made the project feel real. Up to that point, a lot of our work was still fragmented across separate analyses and partial tests, but once the full pipeline ran cleanly, we could finally evaluate the concept as an actual tool rather than disconnected parts.

The hardest part of the process was trying to validate the current-analysis route through simulation. Hardware and software integration was much more difficult than expected, and we eventually found a practical limitation in our Arduino setup, which was not powerful enough for the level of acquisition and processing we needed. That forced a key tradeoff decision: avoid both over-simplifying the problem and over-engineering beyond first-year scope. We had to choose a level of complexity that still produced a usable product while remaining buildable within course constraints.

My biggest contribution was building the final prototype itself, especially constructing the sound-dampening box and developing the software workflow that interfaced with the drone and ran diagnostics. The final solution still fell short in one important area: fault-detection confidence. While secondary research supports the diagnostic logic, proving reliability requires much more rigorous fault-injection and repeatability testing than we could complete in this cycle.

If I repeated this project, I would put more structure around team communication from the start, with regular progress checkpoints and explicit follow-up when updates stall. The strongest technical ideas only become useful when the team stays synchronized enough to integrate and verify them early.
