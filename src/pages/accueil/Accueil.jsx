import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'
import { LECONS } from '../../data/lecons'
import { BADGES, getLevel } from '../../lib/gamification'
import logoCE from '../../assets/logo-ce.webp'
import phrasesStopImg from '../../assets/outils/phrases-stop.jpg'
import thermoImg      from '../../assets/outils/thermometre.jpg'
import cardsImg       from '../../assets/outils/cards-emotions.jpg'
import quizImg        from '../../assets/outils/quiz-emotions.jpg'

const TOTAL_LECONS = LECONS.length

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

  const prenomParent = appData?.onboarding?.prenomParent || ''
  const prenomEnfant = appData?.onboarding?.prenomEnfant || 'Lucas'
  const leconsDone = (appData?.lecons_done || []).map(Number).filter((id) => LECONS.some((l) => l.id === id))
  const formationPct = Math.round((leconsDone.length / TOTAL_LECONS) * 100)

  const nextLecon = useMemo(() => {
    const ordered = [...LECONS].sort((a, b) => a.id - b.id)
    return ordered.find((l) => !leconsDone.includes(l.id)) || ordered[ordered.length - 1]
  }, [leconsDone])

  const isFormationDone = leconsDone.length >= TOTAL_LECONS

  const xpTotal = appData?.xp_total || 0
  const level = getLevel(xpTotal)
  const earnedBadgeIds = appData?.badges || []
  const earnedBadges = BADGES.filter((b) => earnedBadgeIds.includes(b.id))

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <img src={logoCE} alt="Cerveau Électrique" style={s.logo} />
        <div>
          <div style={s.brandSmall}>Cerveau <span style={{ color: '#2A9490' }}>Électrique</span></div>
          <div style={s.brandBig}>Cockpit Crises ⚡</div>
        </div>
      </header>

      <div style={s.body}>
        {/* Salutation manuscrite + titre prénom enfant */}
        {prenomParent && (
          <p style={s.greeting}>Bienvenue {prenomParent}</p>
        )}
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

        {/* Carte XP / Niveau / Badges */}
        <section style={s.xpCard} className="fade-up">
          <div style={s.xpHead}>
            <div>
              <div style={s.xpLevelLabel}>⚡ Niveau {level.num}</div>
              <div style={s.xpLevelName}>{level.name}</div>
            </div>
            <div style={s.xpTotal}>{xpTotal} XP</div>
          </div>
          <div style={s.xpBar}>
            <div style={{ ...s.xpFill, width: `${level.pct}%` }} />
          </div>
          <div style={s.xpMeta}>
            {level.max === Infinity
              ? 'Niveau maximum atteint — bravo !'
              : `${level.max - xpTotal} XP avant le niveau ${level.num + 1}`}
          </div>

          {earnedBadges.length > 0 ? (
            <div style={s.badgesRow}>
              {earnedBadges.map((b) => (
                <div key={b.id} style={s.badgePill} title={b.desc}>
                  <span style={s.badgePillIcon}>{b.icon}</span>
                  <span style={s.badgePillLabel}>{b.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={s.badgesEmpty}>
              Tes badges apparaîtront ici quand tu compléteras des quiz.
            </div>
          )}
        </section>

        {/* Quiz Émotions — CTA dédié, activité enfant */}
        <button
          onClick={() => navigate('/quiz')}
          style={s.quizCard}
          className="fade-up"
        >
          <div style={s.quizThumbWrap}>
            <img src={quizImg} alt="" style={s.quizThumb} draggable={false} />
          </div>
          <div style={{ flex: 1, textAlign: 'left', minWidth: 0, padding: '14px 14px 14px 14px' }}>
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
            {[
              { img: phrasesStopImg, label: 'Phrases STOP',   color: '#7A2040', onClick: () => navigate('/outils') },
              { img: thermoImg,      label: 'Thermomètre',    color: '#FF6B4A', onClick: () => triggerDownload('/pdfs/thermometre-emotions.pdf') },
              { img: cardsImg,       label: 'Cards Émotions', color: '#C0506A', onClick: () => triggerDownload('/pdfs/cards-emotions.pdf') },
            ].map((it) => (
              <button
                key={it.label}
                onClick={it.onClick}
                className="formation-card"
                style={{ ...s.quickCard, borderColor: it.color }}
              >
                <div style={s.quickThumbWrap}>
                  <img src={it.img} alt="" style={s.quickThumb} draggable={false} />
                </div>
                <div style={s.quickBody}>
                  <span style={s.quickLabel}>{it.label}</span>
                </div>
              </button>
            ))}
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
  page: { minHeight: '100dvh', background: '#FAFAF5' },
  header: {
    padding: '40px 20px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: { width: 40, height: 40, objectFit: 'contain', flexShrink: 0 },
  brandSmall: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 11,
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  brandBig: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeight: 800,
    color: '#1C1B2E',
    marginTop: 2,
  },

  body: { padding: '8px 20px 32px' },

  greeting: {
    fontFamily: "'Caveat', cursive",
    fontSize: 28,
    fontWeight: 700,
    color: '#2A9490',
    margin: '12px 0 -4px',
    lineHeight: 1.1,
  },
  titlePrenom: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
    fontWeight: 700,
    color: '#1C1B2E',
    margin: '8px 0 6px',
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 1.55,
    margin: 0,
  },

  progressCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(28,27,46,0.06)',
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
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
    color: '#1C1B2E',
  },
  progressPct: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    color: '#2A9490',
  },
  progressBar: {
    height: 6,
    background: '#E5E5E5',
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
    color: '#64748B',
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

  /* XP / Niveau / Badges */
  xpCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(28,27,46,0.06)',
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },
  xpHead: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  xpLevelLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: '#1C1B2E',
  },
  xpLevelName: {
    fontFamily: "'Caveat', cursive",
    fontSize: 18,
    color: '#2A9490',
    lineHeight: 1.1,
    marginTop: 2,
  },
  xpTotal: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 20,
    fontWeight: 800,
    color: '#F5E06D',
    background: '#1C1B2E',
    padding: '4px 12px',
    borderRadius: 99,
  },
  xpBar: {
    height: 8,
    background: 'rgba(28,27,46,0.08)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2A9490, #F5E06D)',
    borderRadius: 99,
    transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  xpMeta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'right',
  },
  badgesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  badgePill: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: 'rgba(245,224,109,0.18)',
    border: '1px solid rgba(245,224,109,0.55)',
    borderRadius: 99,
    padding: '4px 10px 4px 6px',
  },
  badgePillIcon: { fontSize: 14 },
  badgePillLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 10,
    color: '#1C1B2E',
    letterSpacing: 0.3,
  },
  badgesEmpty: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
  },

  quizCard: {
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    background: '#FFFFFF',
    border: '2px solid #3E8E5E',
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
    borderRadius: 16,
    padding: 0,
    cursor: 'pointer',
    marginTop: 16,
    color: '#1C1B2E',
    overflow: 'hidden',
    textAlign: 'left',
    fontFamily: 'Inter, sans-serif',
  },
  quizThumbWrap: {
    width: 96,
    flexShrink: 0,
    background: '#E5E5E5',
  },
  quizThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  quizLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 15,
    fontWeight: 700,
    color: '#1C1B2E',
    lineHeight: 1.2,
  },
  quizSub: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  quizArrow: {
    fontSize: 22,
    color: '#999',
    marginRight: 14,
    alignSelf: 'center',
    flexShrink: 0,
  },

  sectionTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: '#1C1B2E',
    margin: '0 0 4px',
  },
  sectionSub: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#64748B',
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
  quickThumbWrap: {
    width: '100%',
    aspectRatio: '4 / 3',
    background: '#E5E5E5',
  },
  quickThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  quickBody: {
    padding: '8px 10px 10px',
  },
  quickLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 12,
    fontWeight: 600,
    color: '#1C1B2E',
    lineHeight: 1.25,
    textAlign: 'left',
  },

  allTools: {
    width: '100%',
    background: 'transparent',
    border: '1px solid #E5E5E5',
    borderRadius: 50,
    padding: '12px 16px',
    color: '#64748B',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    marginTop: 24,
    cursor: 'pointer',
  },
}
