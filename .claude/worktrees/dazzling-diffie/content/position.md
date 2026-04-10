---
title: "Position Statement"
youtubeVideoId: "JYUHDenGcJY"
---

My position in engineering design started with how I built the Minecraft 3x3 mechanical door in my original statement: break a complex system into smaller circuits, use reference designs instead of reinventing everything, test repeatedly, and adjust based on observed behavior. That is still my baseline approach, but Praxis II made it more intentional in how I frame and scope real problems.

In Praxis II, our team began with a broad opportunity in FPV drone pre-flight diagnostics, then narrowed the scope to motor fault detection after comparing technical feasibility and workflow constraints. That experience clarified a major part of my practice: I value solving a credible problem end-to-end more than proposing an over-ambitious solution that cannot be built or verified. The most important shift for me was not technical complexity by itself, but disciplined scope control tied to stakeholder reality. Meaning, understanding what I am capable of and not over promising something that I cannot confidently deliver while still addressing the stakeholder's problem at hand.

Praxis II clarified that my understanding improves most when I verify each core function to its real implemented limits before full integration. For current-analysis testing, we split the concept into sensing and analysis. We first assumed analysis worked and stress-tested sensing in simulation by tuning noise toward realistic conditions. Then we assumed sensing worked and tested analysis using a representative current signal matching sensor output, so the software could be validated independently. That staged verification gave me confidence to move into integration. I do not like integrating when component behavior is still uncertain, because once everything is coupled, failures become harder to isolate and debug.

My position is still evolving, but right now it is this: breakdown problem complexity, test assumptions early, and let evidence drive each next decision.
