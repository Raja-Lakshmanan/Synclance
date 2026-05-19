const SOUND_MUTED_KEY = "sound-muted";
const LEGACY_SOUND_KEY = "tamiztron-sound-enabled";
const CLICK_VOLUME = 0.6;

const clickSoundModules = import.meta.glob("../assets/audio/click.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});

const clickSoundFile = clickSoundModules["../assets/audio/click.mp3"];

let clickAudio;
let audioContext;

export const isSoundEnabled = () => {
  if (typeof window === "undefined") return false;
  localStorage.removeItem(LEGACY_SOUND_KEY);
  return localStorage.getItem(SOUND_MUTED_KEY) !== "true";
};

export const setSoundEnabled = (enabled) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_MUTED_KEY, String(!enabled));
};

export const initClickSound = () => {
  if (typeof window === "undefined" || !clickSoundFile || clickAudio) return;

  clickAudio = new Audio(clickSoundFile);
  clickAudio.volume = CLICK_VOLUME;
  clickAudio.preload = "auto";
};

const playFallbackClick = () => {
  if (typeof window === "undefined") return;

  const ToneContext = window.AudioContext || window.webkitAudioContext;
  if (!ToneContext) return;

  audioContext = audioContext || new ToneContext();

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(520, now);
  oscillator.frequency.exponentialRampToValueAtTime(280, now + 0.055);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.11, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.09);
};

export const playClickSound = () => {
  if (typeof window === "undefined" || !isSoundEnabled()) return;

  initClickSound();

  if (!clickAudio) {
    playFallbackClick();
    return;
  }

  try {
    clickAudio.currentTime = 0;
    clickAudio.volume = CLICK_VOLUME;
    clickAudio.play().catch((error) => {
      console.log("Click sound blocked or failed:", error);
      playFallbackClick();
    });
  } catch (error) {
    console.log("Click sound error:", error);
    playFallbackClick();
  }
};

export const playUiSound = () => {
  playClickSound();
};

export const soundStorageKey = SOUND_MUTED_KEY;
export const clickSoundFound = Boolean(clickSoundFile);
export const clickSoundVolume = CLICK_VOLUME;
