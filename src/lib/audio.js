// Audio playback helper — bundled via Vite asset imports.
// Sounds must be triggered by a user gesture (click/tap) to bypass
// browser autoplay policy.

import pop1Src from '../assets/sounds/soundreality-pop-423717.mp3'
import pop2Src from '../assets/sounds/dragon-studio-pop-402324.mp3'
import pop3Src from '../assets/sounds/creatorshome-pop-cartoon-328167.mp3'
import successSrc from '../assets/sounds/meldix-success-340660.mp3'

const sources = {
  pop1: pop1Src,
  pop2: pop2Src,
  pop3: pop3Src,
  tap: pop2Src,
  success: successSrc,
}

const popKeys = ['pop1', 'pop2', 'pop3']

// Cache one Audio per sound name. Cloning before play allows overlapping plays.
const cache = {}

export function playSound(name, { volume = 0.7 } = {}) {
  const src = sources[name]
  if (!src) return
  try {
    if (!cache[name]) cache[name] = new Audio(src)
    const audio = cache[name].cloneNode()
    audio.volume = volume
    // Slight random pitch via playbackRate (0.9–1.2)
    audio.playbackRate = 0.9 + Math.random() * 0.3
    const promise = audio.play()
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => { /* autoplay blocked */ })
    }
  } catch {
    // ignore
  }
}

export function playRandomPop({ volume = 0.4 } = {}) {
  const name = popKeys[Math.floor(Math.random() * popKeys.length)]
  playSound(name, { volume })
}
