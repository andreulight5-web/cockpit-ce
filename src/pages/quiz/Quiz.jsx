import { useNavigate } from 'react-router-dom'
import { QUIZ } from '../../data/quiz'

export default function Quiz() {
  const navigate = useNavigate()
  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
        <h1 style={s.title}>Quiz Émotions</h1>
        <p style={s.sub}>Pour Lucas — découvre tes émotions</p>
      </div>
      <div style={s.body}>
        {QUIZ.map((q) => (
          <button
            key={q.id}
            onClick={() => navigate(`/quiz/${q.id}`)}
            style={{ ...s.card, borderLeft: `3px solid ${q.couleur}` }}
          >
            <span style={{ fontSize: 40 }}>{q.emoji}</span>
            <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <h3 style={s.cardTitle}>{q.titre}</h3>
              <p style={s.cardSub}>🎬 Vidéo · 3 questions · ⭐ 30 XP</p>
              {!q.video.disponible && <span style={s.soon}>Bientôt</span>}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, flexShrink: 0 }}>›</span>
          </button>
        ))}
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
  body: { padding: '12px 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 },
  card: { display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 16, cursor: 'pointer', fontFamily: 'Inter, sans-serif' },
  cardTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 },
  cardSub: { fontSize: 12, color: '#94A3B8', margin: '4px 0 0' },
  soon: { display: 'inline-block', marginTop: 6, background: 'rgba(245,224,109,0.15)', color: '#F5E06D', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 1 },
}
