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
          const dotBg = isDone ? '#2A9490' : isCurrent ? '#F5E06D' : '#E5E5E5'
          const dotColor = isDone ? '#fff' : isCurrent ? '#1C1B2E' : '#999'

          return (
            <button
              key={l.id}
              onClick={() => navigate(`/formation/${l.id}`)}
              className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{
                ...s.lessonRow,
                borderColor: isCurrent ? 'rgba(245,224,109,0.6)' : 'rgba(28,27,46,0.06)',
                background: isCurrent ? 'rgba(245,224,109,0.1)' : '#FFFFFF',
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
              <span style={{ color: '#999', fontSize: 18 }}>›</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#FAFAF5' },
  header: { padding: '40px 20px 18px' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#1C1B2E', margin: 0 },
  sub: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', lineHeight: 1.55, margin: '8px 0 18px' },
  globalBar: {
    height: 6,
    background: '#E5E5E5',
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
    color: '#64748B',
    marginTop: 8,
  },
  body: { padding: '8px 20px 40px' },
  lessonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid rgba(28,27,46,0.06)',
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
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
    color: '#1C1B2E',
    margin: 0,
    lineHeight: 1.3,
  },
  lessonMeta: {
    fontSize: 11,
    color: '#64748B',
  },
}
