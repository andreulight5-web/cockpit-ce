import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LECONS } from '../../data/lecons'
import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'

const MODULES = [
  { key: '1', label: 'Gérer les crises', color: '#C0506A', badge: 'URGENT' },
  { key: '2', label: 'Comprendre le TDAH', color: '#2A9490' },
  { key: '3', label: 'Les 5 Piliers Barkley', color: '#A8DED1' },
]

const statusStyle = {
  done: { bg: '#2A9490', color: '#fff' },
  current: { bg: '#F5E06D', color: '#1C1B2E' },
  locked: { bg: 'rgba(255,255,255,0.08)', color: '#475569' },
}

export default function Cours() {
  const navigate = useNavigate()
  // Read progress from localStorage
  const [progress] = useState(() => {
    try {
      const raw = localStorage.getItem('cockpit_progress')
      return raw ? JSON.parse(raw) : { xp: 0, done: [] }
    } catch { return { xp: 0, done: [] } }
  })

  // Derive status per lesson from progress
  const getStatus = (id) => {
    if (progress.done.includes(id)) return 'done'
    // First undone lesson is current, rest locked
    const firstUndone = LECONS.find((l) => !progress.done.includes(l.id))
    if (firstUndone && firstUndone.id === id) return 'current'
    return 'locked'
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
            <h1 style={s.title}>Méthode Barkley</h1>
            <p style={s.sub}>13 leçons · Pr. Cortex</p>
          </div>
          <img src={cortexBienveillant} alt="Cortex" style={{ width: 50, height: 50, objectFit: 'contain', flexShrink: 0, marginTop: 28 }} draggable={false} />
        </div>
      </div>

      {/* Modules */}
      <div style={s.body}>
        {MODULES.map((mod) => {
          const items = LECONS.filter((l) => l.module === mod.key)
          const doneCount = items.filter((l) => getStatus(l.id) === 'done').length
          return (
            <div key={mod.key} style={{ marginBottom: 28 }}>
              {/* Module header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ ...s.modBadge, background: mod.color, color: mod.color === '#A8DED1' ? '#1C1B2E' : '#fff' }}>{mod.badge || mod.key}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={s.modTitle}>{mod.label}</h2>
                  <span style={s.modCount}>{doneCount}/{items.length} leçons</span>
                </div>
              </div>

              {/* Lesson items */}
              {items.map((l, i) => {
                const status = getStatus(l.id)
                const st = statusStyle[status]
                const clickable = status !== 'locked'
                return (
                  <button
                    key={l.id}
                    onClick={clickable ? () => navigate(`/cours/${l.id}`) : undefined}
                    className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}
                    style={{
                      ...s.lessonRow,
                      opacity: status === 'locked' ? 0.4 : 1,
                      cursor: clickable ? 'pointer' : 'default',
                    }}
                  >
                    <span style={{ ...s.numCircle, background: st.bg, color: st.color }}>{status === 'done' ? '✓' : l.id}</span>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <p style={s.lessonTitle}>{l.titre}</p>
                      <span style={s.lessonMeta}>{l.duree}{status === 'done' ? ' · Terminé' : status === 'current' ? ' · En cours' : ''}</span>
                    </div>
                    {clickable && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>›</span>}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E' },
  header: { padding: '48px 20px 20px' },
  back: { background: 'none', border: 'none', color: '#A8DED1', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12, fontFamily: 'Inter, sans-serif' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  sub: { fontFamily: "'Caveat', cursive", fontSize: 18, color: '#F5E06D', marginTop: 4 },
  body: { padding: '20px 20px 40px' },
  modBadge: { width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 },
  modTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 },
  modCount: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  lessonRow: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', marginBottom: 8, fontFamily: 'Inter, sans-serif' },
  numCircle: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 },
  lessonTitle: { fontSize: 14, fontWeight: 600, color: '#E2E8F0', margin: 0, lineHeight: 1.3 },
  lessonMeta: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
}
