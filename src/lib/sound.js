/**
 * Sound engine — the real GTA San Andreas menu click
 * (public/audio/menu.mp3, the Zedge ringtone).
 *
 * One-shot hover sound:
 * A single <audio> is preloaded (hidden, silent-running while muted to
 * satisfy the browser autoplay graph) ONLY so the audible hit can start
 * instantly on the very first hover — no click-first warm-up wait.
 *
 * Audible play: restarts from the top and stops cleanly the moment the
 * pointer leaves the element (onMouseLeave). No looping, no lingering.
 */

let audio = null;
let muted = false;
let primed = false;
let armed = false;

try {
  muted = localStorage.getItem("portfolio.sound.muted") === "1";
} catch {
  /* storage unavailable — default unmuted */
}

function getAudio() {
  if (!audio) {
    audio = new Audio("/audio/menu.mp3");
    audio.preload = "auto";
  }
  return audio;
}

function prime() {
  if (primed) return;
  primed = true;
  try {
    const a = getAudio();
    a.muted = true;
    a.loop = true;
    a.volume = 1;
    a.play().catch(() => {});
  } catch {
    /* audio unavailable */
  }
}

["pointermove", "mousemove", "mouseover", "keydown", "touchstart"].forEach(
  (eventName) => {
    window.addEventListener(eventName, prime, { once: true, passive: true });
  }
);

function playSound() {
  if (muted) return;
  try {
    prime();
    const a = getAudio();
    a.loop = false; // one-shot for the audible bit
    a.muted = false;
    a.volume = 0.6;
    a.currentTime = 0;
    a.play().catch(() => {});
    armed = true;
  } catch {
    /* audio unavailable */
  }
}

function stopSound() {
  try {
    const a = getAudio();
    if (armed && !a.paused) {
      a.pause();
      a.muted = true;
      a.currentTime = 0;
    }
    armed = false;
  } catch {
    /* ignore */
  }
}

/**
 * Start the click on hover-enter and stop it on hover-leave.
 * Wire both to the same element: onMouseEnter + onMouseLeave.
 */
export function playScroll() {
  playSound();
}

export function stopScroll() {
  stopSound();
}

export function isSoundMuted() {
  return muted;
}

export function toggleSound() {
  muted = !muted;
  try {
    localStorage.setItem("portfolio.sound.muted", muted ? "1" : "0");
  } catch {
    /* ignore */
  }
  try {
    const a = getAudio();
    if (muted) {
      a.muted = true;
      a.pause();
      armed = false;
    } else {
      prime();
      a.muted = false;
      a.loop = false;
      a.volume = 0.6;
      a.currentTime = 0;
      a.play().catch(() => {});
    }
  } catch {
    /* ignore */
  }
  return muted;
}