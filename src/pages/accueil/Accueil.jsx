import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'
import { LECONS } from '../../data/lecons'
import logoCE from '../../assets/logo-ce.png'

const TOTAL_LECONS = 5

const triggerDownload = async (url) => {
  const filename = url.split('/').pop()
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('fetch failed')
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

export default function Accueil() {
  const { appData } = useContext(AppContext)
  const navigate = useNavigate()

  const prenomEnfant = appData?.onboarding?.prenomEnfant || 'Lucas'
  const leconsDone = (appData?.lecons_done || []).map(Number).filter((id) => id >= 1 && id <= 5)
  const formationPct = Math.round((leconsDone.length / TOTAL_LECONS) * 100)

  const nextLecon = useMemo(() => {
    const ordered = [...LECONS].sort((a, b) => a.id - b.id)
    return ordered.find((l) => !leconsDone.includes(l.id)) || ordered[ordered.length - 1]
  }, [leconsDone])

  const isFormationDone = leconsDone.length >= TOTAL_LECONS

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <img src={logoCE} alt="Cerveau Électrique" style={s.logo} />
        <div>
          <div style={s.brandSmall}>Cerveau <span style={{ color: '#F5E06D' }}>Électrique</span></div>
          <div style={s.brandBig}>Cockpit Crises ⚡</div>
        </div>
      </header>

      <div style={s.body}>
        {/* Titre prénom enfant */}
        <h1 style={s.titlePrenom}>Le cockpit de {prenomEnfant}</h1>
        <p style={s.subtitle}>Tu prépares les bons réflexes à froid. Le moment venu, ils seront déjà là.</p>

        {/* Progression formation */}
        <section style={s.progressCard} className="fade-up">
          <div style={s.progressHead}>
            <span style={s.progressLabel}>Formation</span>
            <span style={s.progressPct}>{formationPct}%</span>
          </div>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${formationPct}%` }} />
          </div>
          <div style={s.progressMeta}>{leconsDone.length}/{TOTAL_LECONS} leçons terminées</div>

          {!isFormationDone ? (
            <button
              onClick={() => navigate(`/formation/${nextLecon.id}`)}
              style={s.ctaPrimary}
            >
              Reprendre la formation →
            </button>
          ) : (
            <div style={s.formationDone}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <span>Formation complétée. Bravo !</span>
            </div>
          )}
        </section>

        {/* Quiz Émotions — CTA dédié, activité enfant */}
        <button
          onClick={() => navigate('/quiz')}
          style={s.quizCard}
          className="fade-up"
        >
          <span style={{ fontSize: 32, marginRight: 14, flexShrink: 0 }}>🎯</span>
          <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
            <div style={s.quizLabel}>Quiz Émotions</div>
            <div style={s.quizSub}>Lance une session avec ton enfant — 10 min</div>
          </div>
          <span style={s.quizArrow}>›</span>
        </button>

        {/* Outils rapides */}
        <section style={{ marginTop: 28 }}>
          <h2 style={s.sectionTitle}>Tes outils rapides</h2>
          <p style={s.sectionSub}>3 outils prêts en 5 minutes chrono.</p>

          <div style={s.quickGrid}>
            <button
              onClick={() => navigate('/outils')}
              style={{ ...s.quickCard, background: '#7A2040' }}
            >
              <span style={s.quickEmoji}>✋</span>
              <span style={s.quickLabel}>Phrases STOP</span>
              <span style={s.quickHint}>10 PDFs</span>
            </button>

            <button
              onClick={() => triggerDownload('/pdfs/thermometre-emotions.pdf')}
              style={{ ...s.quickCard, background: '#FF6B4A' }}
            >
              <span style={s.quickEmoji}>🌡️</span>
              <span style={s.quickLabel}>Thermomètre</span>
              <span style={s.quickHint}>📥 Télécharger</span>
            </button>

            <button
              onClick={() => triggerDownload('/pdfs/cards-emotions.pdf')}
              style={{ ...s.quickCard, background: '#C0506A' }}
            >
              <span style={s.quickEmoji}>🃏</span>
              <span style={s.quickLabel}>Cards Émotions</span>
              <span style={s.quickHint}>📥 Télécharger</span>
            </button>
          </div>
        </section>

        {/* Lien vers tous les outils */}
        <button onClick={() => navigate('/outils')} style={s.allTools}>
          Voir tous les outils →
        </button>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E' },
  header: {
    padding: '48px 20px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: { width: 40, height: 40, objectFit: 'contain', flexShrink: 0 },
  brandSmall: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 11,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  brandBig: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeight: 800,
    color: '#fff',
    marginTop: 2,
  },

  body: { padding: '8px 20px 32px' },

  titlePrenom: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
    fontWeight: 700,
    color: '#fff',
    margin: '8px 0 6px',
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 1.55,
    margin: 0,
  },

  progressCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },
  progressHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
  },
  progressPct: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    color: '#F5E06D',
  },
  progressBar: {
    height: 6,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #C0506A, #F5E06D)',
    borderRadius: 99,
    transition: 'width 0.6s',
  },
  progressMeta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },
  ctaPrimary: {
    display: 'block',
    width: '100%',
    background: '#F5E06D',
    color: '#1C1B2E',
    border: 'none',
    borderRadius: 50,
    padding: '14px 18px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    marginTop: 16,
    cursor: 'pointer',
  },
  formationDone: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: '#2A9490',
    fontWeight: 600,
  },

  quizCard: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: 'linear-gradient(135deg, #3E8E5E, #2A6F47)',
    border: 'none',
    borderRadius: 16,
    padding: '16px 18px',
    cursor: 'pointer',
    marginTop: 16,
    color: '#fff',
  },
  quizLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
  },
  quizSub: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
  },
  quizArrow: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 8,
    flexShrink: 0,
  },

  sectionTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 4px',
  },
  sectionSub: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#94A3B8',
    margin: '0 0 14px',
  },

  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  quickCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: '16px 8px',
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    minHeight: 110,
    color: '#fff',
  },
  quickEmoji: { fontSize: 28, lineHeight: 1, marginBottom: 4 },
  quickLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 11.5,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  quickHint: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 2,
  },

  allTools: {
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 50,
    padding: '12px 16px',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    marginTop: 24,
    cursor: 'pointer',
  },
}
