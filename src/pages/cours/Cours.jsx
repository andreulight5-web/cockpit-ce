import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LECONS } from '../../data/lecons'
import { AppContext } from '../../lib/AppContext'

const MODULES = [
  { key: '1', label: 'Les crises TDAH', color: '#C0506A', badge: 'URGENT' },
  { key: '2', label: 'Le quotidien', color: '#2A9490' },
]

const statusStyle = {
  done: { bg: '#2A9490', color: '#fff' },
  current: { bg: '#F5E06D', color: '#1C1B2E' },
  locked: { bg: 'rgba(255,255,255,0.08)', color: '#475569' },
}

export default function Cours() {
  const navigate = useNavigate()
  const { appData } = useContext(AppContext)
  const done = (appData?.lecons_done || []).map(Number)

  const getStatus = (id) => {
    if (done.includes(id)) return 'done'
    const first = LECONS.find((l) => !done.includes(l.id))
    if (first && first.id === id) return 'current'
    return 'locked'
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
        <h1 style={s.title}>Formation</h1>
        <p style={s.sub}>Prépare tes réflexes avant la tempête</p>
        <p style={s.desc}>5 leçons pour installer les bons réflexes à froid. Tu ne pourras pas lire un protocole pendant la crise — mais tu peux t'y préparer.</p>
      </div>

      <div style={s.body}>
        {MODULES.map((mod) => {
          const items = LECONS.filter((l) => l.module === mod.key)
          const doneCount = items.filter((l) => getStatus(l.id) === 'done').length
          const pct = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0
          return (
            <div key={mod.key} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ ...s.modBadge, background: mod.color, color: '#fff' }}>{mod.badge || mod.key}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={s.modTitle}>{mod.label}</h2>
                  <span style={s.modCount}>{doneCount}/{items.length} leçons · {pct}%</span>
                </div>
              </div>
              {items.map((l, i) => {
                const status = getStatus(l.id)
                const st = statusStyle[status]
                const clickable = status !== 'locked'
                return (
                  <button key={l.id} onClick={clickable ? () => navigate(`/cours/${l.id}`) : undefined} className={`fade-up fade-up-d${Math.min(i + 1, 4)}`} style={{ ...s.lessonRow, opacity: status === 'locked' ? 0.4 : 1, cursor: clickable ? 'pointer' : 'default' }}>
                    <span style={{ ...s.numCircle, background: st.bg, color: st.color }}>{status === 'done' ? '✓' : l.id}</span>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <p style={s.lessonTitle}>{l.titre}</p>
                      <span style={s.lessonMeta}>{l.duree}{status === 'done' ? ' · Terminée' : status === 'current' ? ' · En cours' : ''}</span>
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
  back: { background: 'none', border: 'none', color: '#2A9490', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12, fontFamily: 'Inter, sans-serif' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  sub: { fontFamily: "'Caveat', cursive", fontSize: 18, color: '#F5E06D', marginTop: 4 },
  desc: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginTop: 10 },
  body: { padding: '20px 20px 40px' },
  modBadge: { minWidth: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, padding: '0 8px' },
  modTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 },
  modCount: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8' },
  lessonRow: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', marginBottom: 8, fontFamily: 'Inter, sans-serif' },
  numCircle: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 },
  lessonTitle: { fontSize: 14, fontWeight: 600, color: '#E2E8F0', margin: 0, lineHeight: 1.3 },
  lessonMeta: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
}
