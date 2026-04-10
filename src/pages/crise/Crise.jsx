import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const etapes = [
  {
    title: '1. STOP — Arrête-toi',
    action: 'Respire 3 fois profondément. Tu es en sécurité.',
    bonne: 'Je vois que c\'est difficile pour toi. Je suis là.',
    mauvaise: 'Arrête ton caprice tout de suite !',
  },
  {
    title: '2. OBSERVE — Regarde ce qui se passe',
    action: 'Nomme l\'émotion que tu observes chez ton enfant.',
    bonne: 'Tu as l\'air très en colère. C\'est normal de ressentir ça.',
    mauvaise: 'Tu n\'as aucune raison d\'être en colère !',
  },
  {
    title: '3. AGIS — Propose une alternative',
    action: 'Offre un choix concret pour reprendre le contrôle.',
    bonne: 'Tu veux aller te calmer dans ta chambre ou sur le canapé ?',
    mauvaise: 'Si tu continues, tu seras puni(e) !',
  },
  {
    title: '4. RECONNECTE — Après la tempête',
    action: 'Quand le calme revient, reconnecte avec ton enfant.',
    bonne: 'Je suis fier(e) de toi. On a réussi ensemble.',
    mauvaise: 'Tu vois, c\'était pas si grave !',
  },
]

const stepColors = ['var(--orange)', 'var(--yellow)', 'var(--teal)', 'var(--mint)']

export default function Crise() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const etape = etapes[step]

  return (
    <div style={styles.container}>
      {/* Progress bar */}
      <div style={styles.progressWrap}>
        <div style={styles.progressTrack}>
          {etapes.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '100%',
                background: i <= step ? stepColors[i] : 'rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-full)',
                transition: 'background 0.4s',
              }}
            />
          ))}
        </div>
        <span style={styles.progressLabel}>Étape {step + 1}/{etapes.length}</span>
      </div>

      {/* Content */}
      <div key={step} className="fade-up" style={styles.content}>
        <h1 style={styles.title}>{etape.title}</h1>
        <p style={styles.action}>{etape.action}</p>

        {/* Phrase à dire */}
        <div style={styles.phraseGood}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            ✅ Dis plutôt
          </span>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: 6 }}>
            « {etape.bonne} »
          </p>
        </div>

        {/* Phrase à éviter */}
        <div style={styles.phraseBad}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            ❌ Évite
          </span>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: 6, textDecoration: 'line-through' }}>
            « {etape.mauvaise} »
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div style={styles.buttons}>
        {step > 0 ? (
          <button className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setStep(step - 1)}>
            ← Retour
          </button>
        ) : (
          <button className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => navigate('/')}>
            ✕ Fermer
          </button>
        )}
        {step < etapes.length - 1 ? (
          <button className="btn btn-teal" onClick={() => setStep(step + 1)}>
            Étape suivante →
          </button>
        ) : (
          <button className="btn btn-teal" onClick={() => navigate('/')}>
            ✅ Terminé
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100dvh',
    background: 'var(--navy)',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--sp-md)',
    paddingTop: 'var(--sp-2xl)',
  },
  progressWrap: {
    marginBottom: 'var(--sp-xl)',
  },
  progressTrack: {
    display: 'flex',
    gap: 4,
    height: 6,
    marginBottom: 8,
  },
  progressLabel: {
    color: 'var(--gray-400)',
    fontSize: '0.75rem',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-lg)',
  },
  title: {
    color: 'var(--white)',
    fontSize: '1.5rem',
  },
  action: {
    color: 'var(--mint)',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  phraseGood: {
    background: 'rgba(13, 147, 115, 0.2)',
    border: '1px solid var(--teal)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--sp-md)',
    color: 'var(--mint)',
  },
  phraseBad: {
    background: 'rgba(255, 107, 74, 0.15)',
    border: '1px solid var(--orange)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--sp-md)',
    color: '#FF9A85',
  },
  buttons: {
    display: 'flex',
    gap: 'var(--sp-md)',
    paddingTop: 'var(--sp-lg)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
}
