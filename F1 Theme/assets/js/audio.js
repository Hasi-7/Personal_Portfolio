/**
 * audio.js — Howler.js sound management
 * Sound is OFF by default. User must enable explicitly.
 * State stored in JS variable (no localStorage).
 */

// Global sound state — off by default
var soundEnabled = false;

// Sound definitions are lazy-loaded so missing files do not 404 on page load.
var soundConfig = {
  v8: {
    src: ['./assets/sounds/v8-idle.mp3'],
    volume: 0.25,
    loop: false
  },
  visor: {
    src: ['./assets/sounds/visor-close.mp3'],
    volume: 0.25
  },
  hover: {
    src: ['./assets/sounds/panel-hover.mp3'],
    volume: 0.15
  },
  transition: {
    src: ['./assets/sounds/transition.mp3'],
    volume: 0.30
  }
};

var sounds = {};

function getSound(key) {
  if (!soundConfig[key] || typeof Howl === 'undefined') return null;
  if (!sounds[key]) {
    sounds[key] = new Howl(soundConfig[key]);
  }
  return sounds[key];
}

/**
 * Play a sound by key — only if soundEnabled.
 * @param {string} key — one of: 'v8', 'visor', 'hover', 'transition'
 */
function playSound(key) {
  if (!soundEnabled) return;
  var sound = getSound(key);
  if (sound) {
    sound.play();
  }
}

/**
 * Toggle sound on/off. Updates all toggle buttons on the page.
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundToggles();
}

/**
 * Sync all sound toggle buttons to current state.
 */
function updateSoundToggles() {
  var toggles = document.querySelectorAll('.sound-toggle, #sound-toggle-hero');
  toggles.forEach(function(btn) {
    if (soundEnabled) {
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Toggle sound on');
      btn.setAttribute('title', 'Sound is on — click to disable');
      btn.textContent = '🔊';
    } else {
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Toggle sound off');
      btn.setAttribute('title', 'Sound is off — click to enable');
      btn.textContent = '🔇';
    }
  });
}

// Wire up all sound toggles on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  var toggles = document.querySelectorAll('.sound-toggle, #sound-toggle-hero');
  toggles.forEach(function(btn) {
    btn.addEventListener('click', toggleSound);
  });
});
