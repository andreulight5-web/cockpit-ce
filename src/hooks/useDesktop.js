import { useEffect, useState } from 'react'

// Hook qui retourne `true` quand la viewport est ≥ minPx (1024 par défaut).
// Écoute les changements de taille via matchMedia, sans listener `resize` global.
export function useDesktop(minPx = 1024) {
  const query = `(min-width: ${minPx}px)`
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
