import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LECONS } from '../../data/lecons'
import { AppContext } from '../../lib/AppContext'

export default function Formation() {
  const navigate = useNavigate()
  const { appData } = useContext(AppContext)
  const done = (appData?.lecons_done || []).map(Number)

  const ordered = [...LECONS].sort((a, b) => a.id - b.id)
  const currentId = ordered.find((l) => !done.includes(l.id))?.id

  const totalPct = Math.round((done.filter((id) => id >= 1 && id <= 5).length / ordered.length) * 100)

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.title}>Formation</h1>
        <p style={s.sub}>5 leçons pour installer les bons réflexes à froid.</p>

        <div style={s.globalBar}>
          <div style={{ ...s.globalFill, width: `${totalPct}%` }} />
        </div>
        <div style={s.globalMeta}>{done.filter((id) => id >= 1 && id <= 5).length}/{ordered.length} leçons · {totalPct}%</div>
      </header>

      <div style={s.body}>
        {ordered.map((l, i) => {
          const isDone = done.includes(l.id)
          const isCurrent = l.id === currentId
          const dotBg = isDone ? '#2A9490' : isCurrent ? '#F5E06D' : 'rgba(255,255,255,0.08)'
          const dotColor = isDone ? '#fff' : isCurrent ? '#1C1B2E' : '#475569'

          return (
            <button
              key={l.id}
              onClick={() => navigate(`/formation/${l.id}`)}
              className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{
                ...s.lessonRow,
                borderColor: isCurrent ? 'rgba(245,224,109,0.5)' : 'rgba(255,255,255,0.06)',
                background: isCurrent ? 'rgba(245,224,109,0.06)' : 'rgba(255,255,255,0.04)',
              }}
            >
              <span style={{ ...s.numCircle, background: dotBg, color: dotColor }}>
                {isDone ? '✓' : l.id}
              </span>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <p style={s.lessonTitle}>{l.titre}</p>
                <span style={s.lessonMeta}>
                  {l.duree}
                  {isDone && ' · Terminée'}
                  {isCurrent && !isDone && ' · En cours'}
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>›</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E' },
  header: { padding: '48px 20px 24px' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  sub: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', lineHeight: 1.55, margin: '8px 0 18px' },
  globalBar: {
    height: 6,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  globalFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #C0506A, #F5E06D)',
    transition: 'width 0.6s',
  },
  globalMeta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },
  body: { padding: '8px 20px 40px' },
  lessonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: '14px 16px',
    marginBottom: 10,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
  },
  numCircle: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#E2E8F0',
    margin: 0,
    lineHeight: 1.3,
  },
  lessonMeta: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
}
