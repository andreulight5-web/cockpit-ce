import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LECONS } from '../../data/lecons'
import { AppContext } from '../../lib/AppContext'
import { useDesktop } from '../../hooks/useDesktop'
import module1Thumb from '../../assets/formation/module-1-phases-crise.jpg'
import module2Thumb from '../../assets/formation/module-2-stop.jpg'
import module3Thumb from '../../assets/formation/module-3-valider.jpg'
import module4Thumb from '../../assets/formation/module-4-coin-calme.jpg'
import module5Thumb from '../../assets/formation/module-5-apres-crise.jpg'
import module6Thumb from '../../assets/formation/module-6-matin.jpg'
import module7Thumb from '../../assets/formation/module-7-devoirs.jpg'
import module8Thumb from '../../assets/formation/module-8-ecrans.jpg'
import module9Thumb from '../../assets/formation/module-9-coucher.jpg'
import module10Thumb from '../../assets/formation/module-10-crise-public.jpg'

// Thumbnails par id de leçon. Si absent → fallback cercle numéro.
const THUMBS = {
  1: module1Thumb,
  2: module2Thumb,
  3: module3Thumb,
  4: module4Thumb,
  5: module5Thumb,
  6: module6Thumb,
  7: module7Thumb,
  8: module8Thumb,
  9: module9Thumb,
  10: module10Thumb,
}

export default function Formation() {
  const navigate = useNavigate()
  const { appData } = useContext(AppContext)
  const isWide = useDesktop(640)  // ≥ 640px : grille, sinon liste mobile
  const done = (appData?.lecons_done || []).map(Number)

  const ordered = [...LECONS].sort((a, b) => a.id - b.id)
  const currentId = ordered.find((l) => !done.includes(l.id))?.id

  const doneCount = ordered.filter((l) => done.includes(l.id)).length
  const totalPct  = Math.round((doneCount / ordered.length) * 100)

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.title}>Formation</h1>
        <p style={s.sub}>{ordered.length} leçons pour installer les bons réflexes à froid.</p>

        <div style={s.globalBar}>
          <div style={{ ...s.globalFill, width: `${totalPct}%` }} />
        </div>
        <div style={s.globalMeta}>{doneCount}/{ordered.length} leçons · {totalPct}%</div>
      </header>

      {isWide ? (
        /* ─── GRILLE (tablette + desktop) ─── */
        <div style={s.grid}>
          {ordered.map((l, i) => {
            const isDone = done.includes(l.id)
            const isCurrent = l.id === currentId
            return (
              <button
                key={l.id}
                onClick={() => navigate(`/formation/${l.id}`)}
                className={`fade-up fade-up-d${Math.min(i + 1, 4)} formation-card`}
                style={{
                  ...s.gridCard,
                  borderColor: isCurrent ? '#2A9490' : 'rgba(28,27,46,0.08)',
                  borderWidth: isCurrent ? 2 : 1,
                }}
              >
                <div style={s.gridThumbWrap}>
                  {THUMBS[l.id] ? (
                    <img src={THUMBS[l.id]} alt="" style={s.gridThumb} draggable={false} />
                  ) : (
                    <div style={s.gridThumbFallback}>
                      <span style={s.gridThumbNum}>{l.id}</span>
                    </div>
                  )}
                  {isDone && <span style={s.gridDoneBadge}>Terminée ✓</span>}
                </div>
                <div style={s.gridBody}>
                  <p style={s.gridTitle}>{l.titre}</p>
                  <span style={s.gridMeta}>
                    {l.duree}
                    {isCurrent && !isDone && ' · En cours'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        /* ─── LISTE (mobile < 640px) ─── */
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
                {THUMBS[l.id] ? (
                  <div style={s.thumbWrap}>
                    <img src={THUMBS[l.id]} alt="" style={s.thumb} draggable={false} />
                    {isDone && <span style={s.thumbDoneBadge}>✓</span>}
                  </div>
                ) : (
                  <span style={{ ...s.numCircle, background: dotBg, color: dotColor }}>
                    {isDone ? '✓' : l.id}
                  </span>
                )}
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
      )}
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

  /* LISTE MOBILE */
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
  thumbWrap: { position: 'relative', width: 60, height: 60, flexShrink: 0 },
  thumb: { width: 60, height: 60, borderRadius: 8, objectFit: 'cover', display: 'block' },
  thumbDoneBadge: {
    position: 'absolute', bottom: -4, right: -4,
    width: 22, height: 22, borderRadius: '50%',
    background: '#2A9490', color: '#fff',
    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid #FFFFFF',
    boxShadow: '0 1px 4px rgba(28,27,46,0.15)',
  },
  lessonTitle: { fontSize: 14, fontWeight: 600, color: '#1C1B2E', margin: 0, lineHeight: 1.3 },
  lessonMeta:  { fontSize: 11, color: '#64748B' },

  /* GRILLE TABLETTE/DESKTOP */
  grid: {
    padding: '8px 20px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  },
  gridCard: {
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    border: '1px solid rgba(28,27,46,0.08)',
    borderRadius: 12,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
    textAlign: 'left',
    fontFamily: 'Inter, sans-serif',
  },
  gridThumbWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 3',
    background: '#E5E5E5',
  },
  gridThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  gridThumbFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #E5E5E5, #F0F0F0)',
  },
  gridThumbNum: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 40,
    fontWeight: 800,
    color: '#999',
  },
  gridDoneBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    background: '#2A9490',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 10,
    fontWeight: 700,
    padding: '5px 10px',
    borderRadius: 99,
    letterSpacing: 0.5,
    boxShadow: '0 2px 6px rgba(42,148,144,0.35)',
  },
  gridBody: {
    padding: '12px 14px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  gridTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    color: '#1C1B2E',
    margin: 0,
    lineHeight: 1.3,
  },
  gridMeta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#64748B',
  },
}
