import { Link } from 'react-router-dom'
import Character from '../../components/ui/Character'

const personnages = [
  { name: 'maman', label: 'Maman', mood: 'neutre' },
  { name: 'papa', label: 'Papa', mood: 'neutre' },
  { name: 'cortex', label: 'Cortex', mood: 'neutre' },
  { name: 'monstre', label: 'Monstre', mood: 'neutre' },
]

const cards = [
  {
    to: '/cours',
    character: 'cortex',
    mood: 'passionne',
    iconBg: 'rgba(255,255,255,0.25)',
    title: 'Cours Barkley',
    sub: 'Avec Professeur Cortex',
    desc: 'Comprends le TDAH et apprends à adapter ton quotidien.',
    progress: 4,
    total: 13,
    progressLabel: '4/13 leçons',
    bg: '#0D9373',
    color: '#FFFFFF',
    progressTrack: 'rgba(255,255,255,0.2)',
    progressFill: '#FFFFFF',
  },
  {
    to: '/quiz',
    character: 'monstre',
    mood: 'malicieux',
    iconBg: 'rgba(75,21,40,0.15)',
    title: 'Quiz & XP',
    sub: 'Avec Le Monstre',
    desc: 'Teste tes connaissances et gagne des points d\'expérience !',
    progress: 3,
    total: 6,
    progressLabel: '3/6 quiz',
    bg: '#F2B8C6',
    color: '#4B1528',
    progressTrack: 'rgba(75,21,40,0.12)',
    progressFill: '#4B1528',
  },
  {
    to: '/ressources',
    icon: '📚',
    iconBg: 'rgba(255,255,255,0.15)',
    title: 'Ressources',
    sub: 'Sources validées',
    desc: 'Outils pratiques, fiches urgence et références scientifiques.',
    progress: 2,
    total: 8,
    progressLabel: '2/8 fiches lues',
    bg: '#0F172A',
    color: '#FFFFFF',
    progressTrack: 'rgba(255,255,255,0.15)',
    progressFill: '#A8DED1',
  },
]

export default function Portal() {
  return (
    <div className="page">
      {/* Hero */}
      <div style={styles.hero}>
        {/* Top row: logo + avatar */}
        <div style={styles.topRow} className="fade-up">
          <div style={styles.logo}>⚡ CE</div>
          <div style={styles.avatarRow}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Salut, Maman !
              </p>
              <p style={{ color: 'var(--mint)', fontSize: '0.75rem' }}>
                Prête pour aujourd'hui ?
              </p>
            </div>
            <div style={styles.avatarCircle}>
              <Character name="maman" mood="neutre" size={32} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="fade-up fade-up-d1">
          <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', marginBottom: 4 }}>
            Bonjour Marie 👋
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.625rem',
            color: 'var(--white)',
            lineHeight: 1.15,
            margin: 0,
          }}>
            Ton Cockpit ⚡<br />
            <span style={{ color: '#FFE17B' }}>Crises</span>
          </h1>
        </div>

        {/* Personnages chips */}
        <div style={styles.chipRow} className="fade-up fade-up-d2">
          {personnages.map((p) => (
            <div key={p.label} style={styles.chip}>
              <div style={styles.chipEmoji}>
                <Character name={p.name} mood={p.mood} size={22} />
              </div>
              <span style={{ color: 'var(--white)', fontSize: '0.6875rem', fontWeight: 500 }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress + streak row */}
        <div style={{ width: '100%' }} className="fade-up fade-up-d3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: 'var(--mint)', fontSize: '0.75rem', fontWeight: 600 }}>
              Semaine 2/4
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={styles.streakPill}>
                🔥 4 jours
              </div>
              <span style={{ color: 'var(--mint)', fontSize: '0.75rem', fontWeight: 600 }}>
                35%
              </span>
            </div>
          </div>
          <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.12)', height: 6 }}>
            <div className="progress-bar-fill" style={{ width: '35%', background: 'var(--mint)' }} />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="page-content">
        {cards.map((c, i) => (
          <Link
            key={c.to}
            to={c.to}
            className={`fade-up fade-up-d${Math.min(i + 1, 4)}`}
            style={{
              display: 'block',
              background: c.bg,
              color: c.color,
              borderRadius: 16,
              padding: 18,
              marginBottom: 10,
              textDecoration: 'none',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 46, height: 46,
                borderRadius: '50%',
                background: c.iconBg,
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.375rem',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                {c.character ? (
                  <Character name={c.character} mood={c.mood} size={36} />
                ) : (
                  c.icon
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: c.color, fontSize: '1rem', margin: 0 }}>{c.title}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0 }}>{c.sub}</p>
              </div>
              <span style={{ fontSize: '1.25rem', opacity: 0.5, flexShrink: 0, fontWeight: 300, lineHeight: 1 }}>›</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.8125rem', opacity: 0.85, lineHeight: 1.4, marginBottom: 12 }}>
              {c.desc}
            </p>

            {/* Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, opacity: 0.7 }}>
                  {c.progressLabel}
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, opacity: 0.7 }}>
                  {Math.round((c.progress / c.total) * 100)}%
                </span>
              </div>
              <div style={{
                height: 5,
                background: c.progressTrack,
                borderRadius: 999,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(c.progress / c.total) * 100}%`,
                  background: c.progressFill,
                  borderRadius: 999,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'var(--navy)',
    padding: '48px 16px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    borderRadius: '0 0 16px 16px',
  },
  topRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1.25rem',
    color: 'var(--orange)',
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(168,222,209,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    display: 'flex',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    padding: '6px 12px 6px 6px',
  },
  chipEmoji: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakPill: {
    background: 'rgba(13,147,115,0.3)',
    color: 'var(--mint)',
    fontSize: '0.6875rem',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: 999,
  },
}
