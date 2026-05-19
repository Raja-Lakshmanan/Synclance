const SOUND_STORAGE_KEY = 'tamiztron-sound-enabled'

const SOUND_PATHS = {
  open: '/audio/menu-open.mp3',
  close: '/audio/menu-close.mp3',
  click: '/audio/click.mp3',
}

const FALLBACK_TONES = {
  open: { frequency: 520, duration: 0.07 },
  close: { frequency: 320, duration: 0.06 },
  click: { frequency: 430, duration: 0.045 },
}

let audioContext

export const isSoundEnabled = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SOUND_STORAGE_KEY) !== 'false'
}

export const setSoundEnabled = (enabled) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(SOUND_STORAGE_KEY, String(enabled))
}

const playFallbackTone = (type) => {
  const ToneContext = window.AudioContext || window.webkitAudioContext
  if (!ToneContext) return

  audioContext = audioContext || new ToneContext()
  const tone = FALLBACK_TONES[type] || FALLBACK_TONES.click
  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(tone.frequency, audioContext.currentTime)
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + tone.duration)

  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  oscillator.start()
  oscillator.stop(audioContext.currentTime + tone.duration)
}

export const playUiSound = (type = 'click') => {
  if (typeof window === 'undefined' || !isSoundEnabled()) return

  const soundPath = SOUND_PATHS[type] || SOUND_PATHS.click
  const audio = new Audio(soundPath)
  audio.volume = 0.16

  audio.play().catch(() => {
    playFallbackTone(type)
  })
}

export const soundStorageKey = SOUND_STORAGE_KEY
