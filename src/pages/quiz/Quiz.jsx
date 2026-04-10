import { Link } from 'react-router-dom'
import Character from '../../components/ui/Character'

const quizzes = [
  { id: 1, title: 'Les bases du TDAH', status: 'done' },
  { id: 2, title: 'Émotions & réactions', status: 'done' },
  { id: 3, title: 'Fonctions exécutives', status: 'done' },
  { id: 4, title: 'Situations du quotidien', status: 'next' },
  { id: 5, title: 'Discipline positive', status: 'locked' },
  { id: 6, title: 'Mode duo avancé', status: 'locked' },
]

const miniJeux = [
  { emoji: '🌋', title: 'Volcan', desc: 'Gère la colère !' },
  { emoji: '🌙', title: 'LUNA', desc: 'Apaise le coucher' },
  { emoji: '🎯', title: 'Chasse', desc: 'Trouve les solutions' },
]

const statusIcon = { done: '✅', next: '▶️', locked: '🔒' }

export default function Quiz() {
  const xp = 380
  const xpMax = 500
  const level = 3

  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <Link to="/" style={styles.back}>← Retour</Link>
        <h1 style={{ color: 'var(--navy)' }}>Quiz & Mini-Jeux</h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '0.8125rem' }}>
          Apprends en t'amusant avec Le Monstre !
        </p>
      </div>

      <div className="page-content">
        {/* Le Monstre card */}
        <div className="card fade-up" style={styles.monstreCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-md)' }}>
            <Character name="monstre" mood="surexcite" size={56} />
            <div style={{ flex: 1 }}>
              <h3>Le Monstre</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                Niveau {level} — Glacier
              </p>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--gray-400)', marginBottom: 4 }}>
                  <span>{xp} XP</span>
                  <span>{xpMax} XP</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${(xp / xpMax) * 100}%`, background: 'var(--orange)' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="badge" style={{ background: 'var(--mint)', color: 'var(--navy)', marginTop: 'var(--sp-md)' }}>
            <Character name="maman" mood="fiere" size={16} />
            Validé par Maman
          </div>
        </div>

        {/* Quiz grid */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }}>Quiz</h2>
        <div style={styles.grid}>
          {quizzes.map((q, i) => (
            <div
              key={q.id}
              className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{
                padding: 'var(--sp-md)',
                opacity: q.status === 'locked' ? 0.45 : 1,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 6 }}>
                {statusIcon[q.status]}
              </span>
              <h4 style={{ fontSize: '0.8125rem' }}>{q.title}</h4>
            </div>
          ))}
        </div>

        {/* Mini-jeux */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }}>Mini-Jeux</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {miniJeux.map((mj, i) => (
            <div
              key={mj.title}
              className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-md)',
                padding: 'var(--sp-md)',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{mj.emoji}</span>
              <div>
                <h4>{mj.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{mj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'var(--pink)',
    padding: 'var(--sp-2xl) var(--sp-md) var(--sp-lg)',
    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
  },
  back: {
    color: 'var(--navy)',
    fontSize: '0.875rem',
    textDecoration: 'none',
    display: 'block',
    marginBottom: 'var(--sp-md)',
  },
  monstreCard: {
    borderLeft: '4px solid var(--orange)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--sp-sm)',
  },
}
