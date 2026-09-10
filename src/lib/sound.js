/**
 * Sound engine — GTA San Andreas-style menu blips, synthesized with the
 * Web Audio API. No audio assets: two short square-wave glides
 * (navigate/blip + select/confirm). AudioContext is created lazily and
 * only resumed after a user gesture, so it never autoplays.
 */

let ctx = null;
let muted = false;

try {
  muted = localStorage.getItem("portfolio.sound.muted") === "1";
} catch {
  /* storage unavailable — default unmuted */
}

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function ensureRunning() {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume();
  return c;
}

function blip({ start = 660, end = 330, duration = 0.07, volume = 0.05 } = {}) {
  if (muted) return;
  const c = ensureRunning();
  if (!c || c.state !== "running") return;

  const osc = c.createOscillator();
  const gain = c.createGain();
  const now = c.currentTime;

  osc.type = "square";
  osc.frequency.setValueAtTime(start, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(end, 1), now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain).connect(c.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/** Menu hover — short high→low tick. */
export function playScroll() {
  blip({ start: 720, end: 380, duration: 0.065, volume: 0.05 });
}

/** Menu select — deeper, slightly longer confirm. */
export function playSelect() {
  blip({ start: 500, end: 240, duration: 0.13, volume: 0.06 });
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
  if (!muted) {
    blip({ start: 640, end: 320, duration: 0.09, volume: 0.05 });
  }
  return muted;
}