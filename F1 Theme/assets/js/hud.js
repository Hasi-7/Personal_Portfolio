/**
 * hud.js — HUD panel interactions and breathing glow.
 */

(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * startHudGlow — called by visor.js after panels appear.
   * Adds breathing glow to all panel borders.
   */
  window.startHudGlow = function() {
    if (prefersReducedMotion) return;

    var panels = document.querySelectorAll('.hud-panel');
    panels.forEach(function(panel) {
      gsap.to(panel, {
        boxShadow: '0 0 20px rgba(0, 210, 190, 0.35)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });
  };

  // Panel hover sound + interactions
  document.addEventListener('DOMContentLoaded', function() {
    var panels = document.querySelectorAll('.hud-panel');

    panels.forEach(function(panel) {
      panel.addEventListener('mouseenter', function() {
        playSound('hover');
      });

      // Intercept click for transition animation
      panel.addEventListener('click', function(e) {
        e.preventDefault();
        var href      = this.getAttribute('href');
        var direction = this.getAttribute('data-direction');
        if (href && typeof navigateTo === 'function') {
          navigateTo(href, direction);
        } else if (href) {
          window.location.href = href;
        }
      });

      // Keyboard: Enter / Space trigger the click handler
      panel.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  });

})();
