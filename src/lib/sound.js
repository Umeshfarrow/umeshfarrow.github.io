/**
 * Sound engine — the real GTA San Andreas menu click
 * (public/audio/menu.mp3, the Zedge ringtone).
 *
 * Zero-wait hover sound:
 * Browsers block *unmuted* play() until a user gesture, but muted
 * autoplay is always allowed. So we start the track playing silently
 * (muted, looped) the instant the pointer moves — by the time the
 * cursor reaches anything, the file is loaded, decoded and already
 * running. A hover then only needs to unmute and re-seek: that is not
 * treated as autoplay, so it fires instantly and without any
 * click-first "warm-up" wait.
 */

let audio = null;
let muted = false;
let primed = false;

try {
  muted = localStorage.getItem("portfolio.sound.muted") === "1";
} catch {
  /* storage unavailable — default unmuted */
}

function getAudio() {
  if (!audio) {
    audio = new Audio("/audio/menu.mp3");
    audio.preload = "auto";
    audio.loop = true; // keep it silently running so blips can start instantly
    audio.muted = true; // never makes noise on its own
  }
  return audio;
}

function prime() {
  if (primed) return;
  primed = true;
  try {
    const a = getAudio();
    a.muted = true;
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

function playSound(volume) {
  if (muted) return;
  try {
    const a = getAudio();
    prime();
    if (a.paused) a.play().catch(() => {});
    a.muted = false;
    a.volume = volume;
    a.currentTime = 0;
  } catch {
    /* audio unavailable */
  }
}

/** Menu hover / orange-hover elements — the SA menu click. */
export function playScroll() {
  playSound(0.5);
}

/** Selection — same click, slightly louder. */
export function playSelect() {
  playSound(0.7);
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
    } else {
      prime();
      a.muted = false;
      a.volume = 0.7;
      a.currentTime = 0;
      a.play().catch(() => {});
    }
  } catch {
    /* ignore */
  }
  return muted;
}