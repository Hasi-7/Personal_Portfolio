/**
 * transitions.js — Directional page transitions + W04 car return mechanic.
 *
 * Directions:
 *   forward (SYSTEMS)   — panels scale/fade, new page fades in
 *   left    (DRIVER)    — current slides left, new from right
 *   down    (DRIVER DNA)— current slides down, new from top
 *   right   (LOGBOOK)  — current slides right, new from left
 *
 * W04 car appears at arrival edge; clicking returns to index.html
 * via reverse animation.
 */

(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = 0.67; // seconds

  // Map direction → {x, y} exit delta for current page
  var exitMap = {
    forward: { x:    0,   y:    0,   scale: 1.06 }, // scale out
    left:    { x: -110,   y:    0,   scale: 1    },
    down:    { x:    0,   y:  110,   scale: 1    },
    right:   { x:  110,   y:    0,   scale: 1    }
  };

  // Map direction → W04 car position on arrival page
  var carPositionMap = {
    forward: 'bottom',
    left:    'right',
    down:    'top',
    right:   'left'
  };

  /**
   * Navigate to a new page with a directional transition.
   * Direction is passed via URL query param (no localStorage).
   * @param {string} href
   * @param {string} direction — 'forward'|'left'|'down'|'right'
   */
  window.navigateTo = function(href, direction) {
    playSound('transition');

    // Encode direction in URL so it survives the redirect
    var separator = href.indexOf('?') === -1 ? '?' : '&';
    var target = href + separator + 'from=' + direction;

    if (prefersReducedMotion) {
      window.location.href = target;
      return;
    }

    var overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
      window.location.href = target;
      return;
    }

    var exit = exitMap[direction] || exitMap['forward'];

    var tl = gsap.timeline({
      onComplete: function() {
        window.location.href = target;
      }
    });

    // Fade overlay in
    tl.to(overlay, {
      opacity: 1,
      duration: DURATION / 2,
      ease: 'power2.in'
    });

    if (exit.scale !== 1) {
      tl.to(document.body, {
        scale: exit.scale,
        opacity: 0,
        duration: DURATION / 2,
        ease: 'power2.in'
      }, '<');
    } else {
      tl.to(document.body, {
        x: exit.x + '%',
        y: exit.y + '%',
        opacity: 0,
        duration: DURATION / 2,
        ease: 'power2.in'
      }, '<');
    }
  };

  /**
   * On page load — page entrance animation.
   * Reads direction from URL query param ?from=direction (survives redirect).
   */
  function runPageEntrance() {
    var overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    var params    = new URLSearchParams(window.location.search);
    var direction = params.get('from') || 'forward';
    // Clean URL without reloading
    if (params.has('from')) {
      var cleanUrl = window.location.pathname + window.location.hash;
      history.replaceState(null, '', cleanUrl);
    }

    // Map direction → entry origin (opposite of exit)
    var entryMap = {
      forward: { x:   0,   y:   0,   scale: 0.96 },
      left:    { x:  30,   y:   0,   scale: 1    },
      down:    { x:   0,   y: -30,   scale: 1    },
      right:   { x: -30,   y:   0,   scale: 1    }
    };

    var entry = entryMap[direction] || entryMap['forward'];

    if (prefersReducedMotion) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      return;
    }

    // Set initial position
    gsap.set(document.body, {
      x: entry.x + '%',
      y: entry.y + '%',
      scale: entry.scale || 1,
      opacity: 0
    });

    gsap.set(overlay, { opacity: 1 });

    var tl = gsap.timeline();

    // Fade overlay out
    tl.to(overlay, {
      opacity: 0,
      duration: DURATION / 2,
      ease: 'power2.out'
    });

    // Slide body in
    tl.to(document.body, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: DURATION,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }, '<');

    tl.call(function() {
      overlay.style.pointerEvents = 'none';
    });
  }

  /**
   * Return to index.html (HUD) — car is always on the right, so slide right.
   */
  function returnToHUD() {
    playSound('transition');

    if (prefersReducedMotion) {
      window.location.href = './index.html#return';
      return;
    }

    var overlay = document.getElementById('page-transition-overlay');

    // Slide page out to the right (car is on the right — feels like it drove off)
    var exit = { x: 30, y: 0, scale: 1 };

    var tl = gsap.timeline({
      onComplete: function() {
        window.location.href = './index.html#return';
      }
    });

    tl.to(overlay, {
      opacity: 1,
      duration: DURATION / 2,
      ease: 'power2.in'
    });

    tl.to(document.body, {
      x: exit.x + '%',
      y: exit.y + '%',
      scale: exit.scale || 1,
      opacity: 0,
      duration: DURATION / 2,
      ease: 'power2.in'
    }, '<');
  }

  // ── Init ───────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    // Run entrance animation on any inner page (has the transition overlay but not the visor)
    var overlay = document.getElementById('page-transition-overlay');
    var isInnerPage = overlay && !document.getElementById('visor');
    if (isInnerPage) {
      runPageEntrance();
    }

    // On index.html: if returning from inner page, ensure HUD is visible
    if (window.location.hash === '#return') {
      // Remove hash cleanly
      history.replaceState(null, '', window.location.pathname);
      // Visor is already closed from previous visit — show HUD instantly
      var visor = document.getElementById('visor');
      var hudPanels = document.querySelectorAll('.hud-panel');
      var hudGrid = document.getElementById('hud-grid');
      var cockpitOverlay = document.getElementById('cockpit-overlay');
      var rainBg = document.getElementById('rain-bg');

      if (visor) {
        visor.style.transform = 'translateY(0)';
        visor.style.transition = 'none';
      }
      if (cockpitOverlay) cockpitOverlay.style.opacity = '1';
      if (rainBg) {
        rainBg.style.filter = 'brightness(0.55) saturate(0.8) blur(6px)';
        rainBg.style.transform = 'scale(1.05)';
      }
      if (hudGrid) hudGrid.style.pointerEvents = 'auto';
      if (hudPanels) {
        hudPanels.forEach(function(p) { p.style.opacity = '1'; });
      }

      // Fade the overlay out
      var overlay = document.getElementById('page-transition-overlay');
      if (overlay && !prefersReducedMotion) {
        gsap.set(overlay, { opacity: 1 });
        gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power1.out' });
      }

      // Tell visor.js not to fire again
      window._visorFiredOnReturn = true;
    }
  });

})();
