import { Link } from 'react-router-dom'

const entries = [
  { date: 'Aujourd\'hui', emoji: '😊', note: 'Bonne journée, les devoirs se sont bien passés.' },
  { date: 'Hier', emoji: '😤', note: 'Crise au supermarché, utilisé la fiche urgence.' },
  { date: 'Lundi', emoji: '😌', note: 'Matin calme, nouvelle routine testée.' },
]

export default function Journal() {
  return (
    <div className="page">
      <div style={styles.header}>
        <h1 style={{ color: 'var(--navy)' }}>📓 Journal</h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '0.8125rem' }}>
          Ton suivi émotionnel au quotidien
        </p>
      </div>

      <div className="page-content">
        <button className="btn btn-teal" style={{ width: '100%', marginBottom: 'var(--sp-lg)' }}>
          + Nouvelle entrée
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {entries.map((e, i) => (
            <div
              key={i}
              className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-md)', padding: 'var(--sp-md)' }}
            >
              <span style={{ fontSize: '2rem' }}>{e.emoji}</span>
              <div>
                <h4>{e.date}</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', marginTop: 4 }}>{e.note}</p>
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
    background: 'var(--white)',
    padding: 'var(--sp-2xl) var(--sp-md) var(--sp-lg)',
    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
    boxShadow: 'var(--shadow-card)',
  },
}
