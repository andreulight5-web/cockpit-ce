import { useRef } from 'react'

const THRESHOLD = 50

export function useSwipe({ onLeft, onRight }) {
  const startX = useRef(0)

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX.current
    if (diff > THRESHOLD && onRight) onRight()
    else if (diff < -THRESHOLD && onLeft) onLeft()
  }

  return { onTouchStart, onTouchEnd }
}
