import { useState } from 'react'

// Eagerly resolve all character images so Vite bundles them.
// Supports png, webp, jpg, jpeg, svg.
const images = import.meta.glob(
  '../../assets/characters/**/*.{png,webp,jpg,jpeg,svg}',
  { eager: true, import: 'default' }
)

const fallbackEmoji = {
  maman: '👩',
  papa: '👨',
  cortex: '🧠',
  monstre: '🐾',
}

// Find image whose path matches `{name}/{name}-{mood}.<ext>` (case-insensitive).
function resolveImage(name, mood) {
  const target = `/${name}/${name}-${mood}.`.toLowerCase()
  for (const path in images) {
    if (path.toLowerCase().includes(target)) return images[path]
  }
  return null
}

export default function Character({
  name,
  mood = 'neutre',
  size = 48,
  className = '',
  style = {},
}) {
  const [errored, setErrored] = useState(false)
  const src = resolveImage(name, mood)

  const baseStyle = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...style,
  }

  if (!src || errored) {
    return (
      <span
        className={className}
        style={{ ...baseStyle, fontSize: Math.round(size * 0.7), lineHeight: 1 }}
        aria-label={name}
        role="img"
      >
        {fallbackEmoji[name] || '❓'}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} ${mood}`}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className={className}
      style={{ ...baseStyle, objectFit: 'contain' }}
    />
  )
}
