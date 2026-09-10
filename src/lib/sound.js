/**
 * Sound engine — the real GTA San Andreas menu click
 * (public/audio/menu.mp3, the Zedge ringtone).
 *
 * Autoplay policy: browsers only allow programmatic play() after a user
 * gesture on the page, so a one-time, silent warm-up play is triggered on
 * the first pointer/key/touch interaction. Hover sounds then fire freely.
 */

let audio = null;
let muted = false;
let unlocked = false;

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

function unlock() {
  if (unlocked) return;
  unlocked = true;
  try {
    const a = getAudio();
    a.volume = 0.0001;
    a.play()
      .then(() => {
        a.pause();
        a.currentTime = 0;
        a.volume = muted ? 0 : 1;
      })
      .catch(() => {
        a.volume = muted ? 0 : 1;
      });
  } catch {
    /* audio unavailable */
  }
}

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, unlock, { once: true, passive: true });
});

function playSound(volume) {
  if (muted) return;
  try {
    const a = getAudio();
    a.volume = volume;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch {
    /* audio unavailable */
  }
}

/** Menu hover / HoverFill hover — the SA menu click. */
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
  if (!muted) playSound(0.7);
  return muted;
}