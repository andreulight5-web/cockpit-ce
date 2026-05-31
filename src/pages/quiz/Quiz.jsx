import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUIZ } from '../../data/quiz'
import { AppContext } from '../../lib/AppContext'
import { useDesktop } from '../../hooks/useDesktop'
import quiz1Thumb from '../../assets/quiz/quiz-1-matin.jpg'
import quiz2Thumb from '../../assets/quiz/quiz-2-soir.jpg'
import quiz3Thumb from '../../assets/quiz/quiz-3-imprevus.jpg'
import quiz4Thumb from '../../assets/quiz/quiz-4-ecrans.jpg'
import quiz5Thumb from '../../assets/quiz/quiz-5-sorties.jpg'

const THUMBS = {
  1: quiz1Thumb,
  2: quiz2Thumb,
  3: quiz3Thumb,
  4: quiz4Thumb,
  5: quiz5Thumb,
}

export default function Quiz() {
  const navigate = useNavigate()
  const { appData } = useContext(AppContext)
  const isWide = useDesktop(640)
  const done = (appData?.quiz_done || []).map(Number)

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
        <h1 style={s.title}>Quiz Situations</h1>
        <p style={s.sub}>Réagis aux scènes du quotidien</p>
        <p style={s.intro}>5 quiz · 3 situations chacun · 10 min total. Tu choisis, tu reçois un feedback neuro-validé immédiat.</p>
      </div>

      <div style={isWide ? s.gridDesktop : s.gridMobile}>
        {QUIZ.map((q, i) => {
          const isDone = done.includes(q.id)
          return (
            <button
              key={q.id}
              onClick={() => navigate(`/quiz/${q.id}`)}
              className={`fade-up fade-up-d${Math.min(i + 1, 4)} formation-card`}
              style={{ ...s.card, borderColor: q.couleur }}
            >
              <div style={s.thumbWrap}>
                {THUMBS[q.id] ? (
                  <img src={THUMBS[q.id]} alt="" style={s.thumb} draggable={false} />
                ) : (
                  <div style={s.thumbFallback}>
                    <span style={{ fontSize: 36 }}>{q.emoji}</span>
                  </div>
                )}
                {isDone && <span style={s.doneBadge}>Terminé ✓</span>}
              </div>
              <div style={s.body}>
                <p style={s.cardTitle}>{q.titre}</p>
                <span style={s.cardMeta}>5 questions · ⭐ {q.xp} XP</span>
              </div>
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
  back: { background: 'none', border: 'none', color: '#2A9490', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12, fontFamily: 'Inter, sans-serif' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#1C1B2E', margin: 0 },
  sub: { fontFamily: "'Caveat', cursive", fontSize: 18, color: '#2A9490', marginTop: 4 },
  intro: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B', marginTop: 10, lineHeight: 1.55 },

  gridMobile: {
    padding: '8px 20px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
  },
  gridDesktop: {
    padding: '8px 20px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    border: '2px solid',
    borderRadius: 12,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
    textAlign: 'left',
    fontFamily: 'Inter, sans-serif',
  },
  thumbWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 3',
    background: '#E5E5E5',
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    display: 'block',
  },
  thumbFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #E5E5E5, #F0F0F0)',
  },
  doneBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    background: '#2A9490',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 9,
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: 99,
    letterSpacing: 0.5,
    boxShadow: '0 2px 6px rgba(42,148,144,0.35)',
  },
  body: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  cardTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: '#1C1B2E',
    margin: 0,
    lineHeight: 1.25,
  },
  cardMeta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    color: '#64748B',
  },
}
