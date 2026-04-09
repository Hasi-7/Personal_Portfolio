/**
 * visor.js — Scroll-triggered visor close animation (GSAP).
 *
 * Sequence (per PLAN.md + AGENTS.md):
 *   1. rain-bg zoom → scale(1.15)           [0ms]
 *   2. visor panel slides down              [0–600ms]
 *   3. glare sweep across visor             [600–800ms]
 *   4. cockpit overlay fades in + rain blur [800ms]
 *   5. HUD panels stagger in               [800–1400ms]
 *
 * Fires once. After firing, body is unlocked for inner-page scroll.
 */

(function() {
  'use strict';

  var visorFired = false;

  // Respect prefers-reduced-motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runVisorSequence() {
    if (visorFired) return;
    visorFired = true;

    var rainBg        = document.getElementById('rain-bg');
    var visor         = document.getElementById('visor');
    var visorGlare    = document.getElementById('visor-glare');
    var rainCanvas    = document.getElementById('rain-canvas');
    var cockpitOverlay= document.getElementById('cockpit-overlay');
    var hudGrid       = document.getElementById('hud-grid');
    var hudPanels     = document.querySelectorAll('.hud-panel');
    var scene1Content = document.getElementById('scene-1-content');
    var scrollPrompt  = document.getElementById('scroll-prompt');

    if (prefersReducedMotion) {
      // Instant close — skip all animation
      visor.style.transform = 'translateY(0)';
      cockpitOverlay.style.opacity = '1';
      rainBg.style.filter = 'brightness(0.55) saturate(0.8) blur(6px)';
      rainBg.style.transform = 'scale(1.05)';
      hudGrid.style.pointerEvents = 'auto';
      hudPanels.forEach(function(p) { p.style.opacity = '1'; });
      startRainCanvas(rainCanvas, visor);
      return;
    }

    // Set initial GSAP state before building timeline
    gsap.set(visor, { y: '-100%' });
    gsap.set(hudPanels, { y: 8, opacity: 0 });

    var tl = gsap.timeline();

    // Step 1: zoom rain-bg to scale(1.05) — final resting scale
    tl.to(rainBg, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.inOut'
    });

    // Step 2: visor slides down (0.6s)
    tl.to(visor, {
      y: '0%',
      duration: 0.6,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }, '<');

    // Fade out scene 1 text while visor drops
    tl.to([scene1Content, scrollPrompt], {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.in'
    }, '<');

    // Step 3: glare sweep (600ms mark)
    tl.to(visorGlare, {
      opacity: 1,
      duration: 0.1
    });
    tl.to(visorGlare, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out'
    });

    // Play visor sound
    tl.call(function() {
      playSound('visor');
    });

    // Step 4: rain canvas fades in alongside glare
    tl.to(rainCanvas, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.out'
    }, '<');

    // rain-bg settles to final state: blur(6px) brightness(0.55) scale(1.05)
    tl.call(function() {
      rainBg.style.transition = 'filter 0.6s ease';
      rainBg.style.filter = 'brightness(0.55) saturate(0.8) blur(6px)';
    });

    // Cockpit PNG fades in immediately when visor animation completes
    tl.call(function() {
      gsap.to(cockpitOverlay, { opacity: 1, duration: 0.4, ease: 'power1.out' });
    });

    // Step 5: HUD panels stagger in (800ms mark onward)
    tl.to(hudPanels[0], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '+=0');

    tl.to(hudPanels[1], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '<+=0.05');

    tl.to(hudPanels[2], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '<+=0.05');

    tl.to(hudPanels[3], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '<+=0.05');

    // Enable pointer events on HUD after panels appear
    tl.call(function() {
      hudGrid.style.pointerEvents = 'auto';
      // Start breathing glow (driven by hud.js)
      if (typeof startHudGlow === 'function') startHudGlow();
    });

    // Start rain particle canvas
    startRainCanvas(rainCanvas, visor);
  }

  /**
   * Rain particle canvas — 50 particles on visor surface.
   */
  function startRainCanvas(canvas, container) {
    if (!canvas || !container) return;

    canvas.width  = container.offsetWidth  || window.innerWidth;
    canvas.height = container.offsetHeight || window.innerHeight;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = 70; // 60-80 per spec

    for (var i = 0; i < count; i++) {
      particles.push(makeParticle(canvas, true));
    }

    // scatter initial y across the full canvas height so they don't all start at top
    function makeParticle(c, scatter) {
      return {
        x:      Math.random() * c.width,
        y:      scatter ? Math.random() * c.height : -28,
        height: 12 + Math.random() * 16,        // 12–28px streak length
        opacity: 0.3 + Math.random() * 0.4,     // 0.3–0.7
        speedY:  3 + Math.random() * 5,          // 3–8px per frame
        driftX: (Math.random() - 0.5) * 0.6     // ±0.3px per frame
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function(p) {
        // Vertical streak — 1px wide, height randomized per drop
        ctx.fillStyle = 'rgba(200, 220, 255, ' + p.opacity + ')';
        ctx.fillRect(p.x, p.y, 1, p.height);

        p.y += p.speedY;
        p.x += p.driftX;

        // Reset when drop exits bottom
        if (p.y > canvas.height + 28) {
          var fresh = makeParticle(canvas, false);
          p.x      = fresh.x;
          p.y      = fresh.y;
          p.height = fresh.height;
          p.opacity= fresh.opacity;
          p.speedY = fresh.speedY;
          p.driftX = fresh.driftX;
        }
      });
      requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
      draw();
    }

    // Resize canvas on window resize
    window.addEventListener('resize', function() {
      canvas.width  = container.offsetWidth  || window.innerWidth;
      canvas.height = container.offsetHeight || window.innerHeight;
    });
  }

  // ── Entry animations (Scene 1) ──────────────────────────────────────
  window.addEventListener('load', function() {
    // If returning from an inner page, transitions.js already handled the state
    if (window._visorFiredOnReturn) return;

    var heroName    = document.getElementById('hero-name');
    var heroSub     = document.getElementById('hero-subtitle');
    var scrollPrompt= document.getElementById('scroll-prompt');

    if (prefersReducedMotion) {
      heroName.style.opacity    = '1';
      heroSub.style.opacity     = '1';
      scrollPrompt.style.opacity= '1';
    } else {
      // Name fade in
      gsap.to(heroName, { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 });
      // Subtitle fade in
      gsap.to(heroSub,  { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.0 });
      // Scroll prompt fade in + bounce
      gsap.to(scrollPrompt, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 2.0,
        onComplete: function() {
          gsap.to(scrollPrompt, {
            y: 6,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }
      });

      // V8 idle — 1.5s after load if sound enabled
      setTimeout(function() {
        playSound('v8');
      }, 1500);
    }

    // ── Scroll / wheel listener (fires visor once) ──────────────────
    var scrollOptions = { passive: true };

    function onFirstScroll(e) {
      runVisorSequence();
      // Remove listeners after firing
      window.removeEventListener('wheel',     onFirstScroll, scrollOptions);
      window.removeEventListener('touchmove', onFirstScroll, scrollOptions);
      window.removeEventListener('keydown',   onFirstKeydown);
    }

    function onFirstKeydown(e) {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        runVisorSequence();
        window.removeEventListener('wheel',     onFirstScroll, scrollOptions);
        window.removeEventListener('touchmove', onFirstScroll, scrollOptions);
        window.removeEventListener('keydown',   onFirstKeydown);
      }
    }

    window.addEventListener('wheel',     onFirstScroll, scrollOptions);
    window.addEventListener('touchmove', onFirstScroll, scrollOptions);
    window.addEventListener('keydown',   onFirstKeydown);
  });

})();
