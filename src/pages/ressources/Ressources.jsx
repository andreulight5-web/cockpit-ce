import { Link } from 'react-router-dom'

const outils = [
  { emoji: '🚨', title: 'Cartes urgence', desc: 'Fiches réflexes pour les crises' },
  { emoji: '📓', title: 'Journal émotionnel', desc: 'Suivi des humeurs et progrès' },
  { emoji: '💬', title: 'Phrases Barkley', desc: 'Scripts de communication validés' },
]

const situationsRes = [
  { emoji: '🌅', label: 'Matin' },
  { emoji: '📚', label: 'Devoirs' },
  { emoji: '🛒', label: 'Supermarché' },
  { emoji: '📱', label: 'Écrans' },
  { emoji: '🌙', label: 'Coucher' },
  { emoji: '🍽️', label: 'Repas' },
]

const sources = [
  { title: 'Russell A. Barkley, PhD', desc: 'Taking Charge of ADHD (4th Edition)' },
  { title: 'Thomas E. Brown, PhD', desc: 'ADHD Comorbidities Handbook' },
  { title: 'HAS France', desc: 'Recommandations TDAH 2024' },
]

export default function Ressources() {
  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <Link to="/" style={styles.back}>← Retour</Link>
        <h1 style={{ color: 'var(--navy)' }}>Ressources</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginTop: 'var(--sp-sm)' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.8125rem' }}>
            Professeur Cortex valide chaque source
          </p>
        </div>
      </div>

      <div className="page-content">
        {/* Outils parents */}
        <h2 style={{ marginBottom: 'var(--sp-md)' }}>Outils parents</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {outils.map((o, i) => (
            <div
              key={o.title}
              className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-md)', padding: 'var(--sp-md)' }}
            >
              <span style={{ fontSize: '2rem' }}>{o.emoji}</span>
              <div>
                <h4>{o.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Situations */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }}>Par situation</h2>
        <div style={styles.grid}>
          {situationsRes.map((s) => (
            <div
              key={s.label}
              className="card"
              style={{ padding: 'var(--sp-md)', textAlign: 'center' }}
            >
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: 4 }}>{s.emoji}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Sources scientifiques */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }}>Sources scientifiques</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {sources.map((s, i) => (
            <div
              key={s.title}
              className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{
                padding: 'var(--sp-md)',
                borderLeft: '4px solid var(--teal)',
              }}
            >
              <h4>{s.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'var(--yellow)',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--sp-sm)',
  },
}
