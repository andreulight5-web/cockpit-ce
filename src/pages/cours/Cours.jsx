import { useState } from 'react'
import { Link } from 'react-router-dom'

const lecons = [
  { id: 1, title: 'Comprendre le TDAH', status: 'done' },
  { id: 2, title: 'Les fonctions exécutives', status: 'done' },
  { id: 3, title: 'L\'autorégulation émotionnelle', status: 'current' },
  { id: 4, title: 'Adapter l\'environnement', status: 'locked' },
  { id: 5, title: 'La discipline bienveillante', status: 'locked' },
]

const situations = [
  { emoji: '🌅', label: 'Matin' },
  { emoji: '📚', label: 'Devoirs' },
  { emoji: '🛒', label: 'Supermarché' },
  { emoji: '📱', label: 'Écrans' },
  { emoji: '🌙', label: 'Coucher' },
  { emoji: '👨‍👧‍👦', label: 'Fratrie' },
  { emoji: '🚗', label: 'Voiture' },
  { emoji: '🍽️', label: 'Repas' },
]

const statusStyles = {
  done: { bg: 'var(--mint)', color: 'var(--navy)', icon: '✅' },
  current: { bg: 'var(--teal)', color: 'var(--white)', icon: '▶️' },
  locked: { bg: 'var(--gray-200)', color: 'var(--gray-400)', icon: '🔒' },
}

export default function Cours() {
  const [mode, setMode] = useState('maman')

  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <Link to="/" style={styles.back}>← Retour</Link>
        <div style={styles.bannerRow}>
          <div style={styles.cortexCircle}>
            <span style={{ fontSize: '1.75rem' }}>🧠</span>
          </div>
          <div>
            <h1 style={{ color: 'var(--white)', fontSize: '1.5rem' }}>Cours Barkley</h1>
            <p style={{ color: '#FF6B4A', fontSize: '0.8125rem', fontWeight: 600 }}>
              Avec Professeur Cortex 🔬
            </p>
          </div>
        </div>
        {/* Cortex banner */}
        <div style={styles.cortexBanner}>
          <span style={{ fontSize: '0.8125rem' }}>
            🧠 « Le TDAH n'est pas un manque de volonté, c'est un cerveau câblé différemment. » — Barkley
          </span>
        </div>
      </div>

      <div className="page-content">
        {/* Mode selector */}
        <div style={styles.modeSelector} className="fade-up">
          <button
            className="btn"
            style={{
              background: mode === 'maman' ? 'var(--teal)' : 'var(--gray-200)',
              color: mode === 'maman' ? 'var(--white)' : 'var(--gray-600)',
              flex: 1,
            }}
            onClick={() => setMode('maman')}
          >
            👩 Mode Maman
          </button>
          <button
            className="btn"
            style={{
              background: mode === 'duo' ? 'var(--teal)' : 'var(--gray-200)',
              color: mode === 'duo' ? 'var(--white)' : 'var(--gray-600)',
              flex: 1,
            }}
            onClick={() => setMode('duo')}
          >
            👩👨 Mode Duo
          </button>
        </div>

        {/* Leçons */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }} className="fade-up fade-up-d1">
          Leçons {mode === 'duo' ? '(Duo)' : ''}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {lecons.map((l, i) => {
            const s = statusStyles[l.status]
            return (
              <div
                key={l.id}
                className={`card fade-up fade-up-d${Math.min(i + 1, 4)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-md)',
                  padding: 'var(--sp-md)',
                  opacity: l.status === 'locked' ? 0.5 : 1,
                }}
              >
                <span style={{
                  width: 40, height: 40,
                  borderRadius: 'var(--radius-full)',
                  background: s.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.125rem',
                }}>
                  {s.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <h4>{l.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                    Leçon {l.id}
                  </p>
                </div>
                {l.status === 'current' && (
                  <span className="badge" style={{ background: 'var(--teal)', color: 'var(--white)' }}>
                    En cours
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Situations */}
        <h2 style={{ margin: 'var(--sp-lg) 0 var(--sp-md)' }}>Situations du quotidien</h2>
        <div className="scroll-row">
          {situations.map((s) => (
            <div key={s.label} style={styles.situationCard}>
              <span style={{ fontSize: '2rem' }}>{s.emoji}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'var(--navy)',
    padding: '48px 16px 20px',
    borderRadius: '0 0 16px 16px',
  },
  back: {
    color: 'var(--mint)',
    fontSize: '0.875rem',
    textDecoration: 'none',
    display: 'block',
    marginBottom: 16,
  },
  bannerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  cortexCircle: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'rgba(255,107,74,0.2)',
    border: '2px solid #FF6B4A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cortexBanner: {
    background: 'rgba(255,107,74,0.15)',
    border: '1px solid rgba(255,107,74,0.3)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#FFE17B',
    lineHeight: 1.4,
  },
  modeSelector: {
    display: 'flex',
    gap: 'var(--sp-sm)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-full)',
    padding: 4,
  },
  situationCard: {
    minWidth: 90,
    flexShrink: 0,
    background: 'var(--white)',
    borderRadius: 12,
    padding: '14px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    boxShadow: 'var(--shadow-card)',
  },
}
