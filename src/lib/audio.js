// Audio playback helper — bundled via Vite asset imports.
// Sounds must be triggered by a user gesture (click/tap) to bypass
// browser autoplay policy.

import popSrc from '../assets/sounds/soundreality-pop-423717.mp3'
import tapSrc from '../assets/sounds/dragon-studio-pop-402324.mp3'
import successSrc from '../assets/sounds/meldix-success-340660.mp3'

const sources = {
  pop: popSrc,
  tap: tapSrc,
  success: successSrc,
}

// Cache one Audio per sound name. Cloning before play allows overlapping plays.
const cache = {}

export function playSound(name, { volume = 0.7 } = {}) {
  const src = sources[name]
  if (!src) return
  try {
    if (!cache[name]) cache[name] = new Audio(src)
    const audio = cache[name].cloneNode()
    audio.volume = volume
    const promise = audio.play()
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => {
        // autoplay blocked or other; silently ignore
      })
    }
  } catch {
    // ignore
  }
}
