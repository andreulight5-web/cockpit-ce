import { useState } from 'react'
import { Link } from 'react-router-dom'

import mamanFiere from '../../assets/characters/maman/maman-fiere.webp'
import papaEncourageant from '../../assets/characters/papa/encourageant.webp'
import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'
import cortexPerplexe from '../../assets/characters/cortex/cortex-perplexe.webp'
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'
import logoCE from '../../assets/logo-ce.png'

const STORAGE_KEY = 'cockpit_onboarding'

const personnages = [
  { label: 'Maman', img: mamanFiere },
  { label: 'Papa', img: papaEncourageant },
  { label: 'Cortex', img: cortexBienveillant },
  { label: 'Monstre', img: monstreCalin },
]

const modules = [
  {
    to: '/cours',
    img: cortexBienveillant,
    tag: 'MODULE 1',
    title: 'Cours Barkley',
    sub: 'Méthode scientifique · Pr. Cortex',
    progress: 4,
    total: 13,
    bg: 'linear-gradient(135deg, #0D9373 0%, #085041 100%)',
    border: 'none',
  },
  {
    to: '/quiz',
    img: monstreRigole,
    tag: 'MODULE 2',
    title: 'Quiz & XP',
    sub: 'Le Monstre t\'accompagne',
    progress: 3,
    total: 6,
    bg: 'linear-gradient(135deg, #D4537E 0%, #4B1528 100%)',
    border: 'none',
  },
  {
    to: '/ressources',
    img: cortexPerplexe,
    tag: 'MODULE 3',
    title: 'Ressources',
    sub: 'Outils · Scripts · Sources HAS',
    progress: 2,
    total: 8,
    bg: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
]

export default function Portal() {
  const [prenomParent] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data?.prenomParent) return data.prenomParent
      }
    } catch { /* ignore */ }
    return ''
  })

  return (
    <div style={s.page}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.headerRow}>
          <span style={s.headerTitle}>Cockpit Crises</span>
          <img src={logoCE} alt="Cerveaux Électriques" style={s.logoImg} draggable={false} />
        </div>

        <div className="fade-up" style={{ marginTop: 20 }}>
          <p style={s.greeting}>Bonjour {prenomParent || 'parent'} 👋</p>
          <h1 style={s.title}>
            Ton Cockpit <span style={{ color: '#FFE17B' }}>Crises ⚡</span>
          </h1>
        </div>
      </div>

      {/* SEPARATOR */}
      <div style={s.separator} />

      {/* MODULES */}
      <div style={s.modules}>
        {modules.map((m, i) => {
          const pct = Math.round((m.progress / m.total) * 100)
          return (
            <Link
              key={m.to}
              to={m.to}
              className={`fade-up fade-up-d${i + 1}`}
              style={{ ...s.card, background: m.bg, border: m.border, textDecoration: 'none', color: '#FFFFFF' }}
            >
              <div style={s.cardTop}>
                <div style={s.cardCircle}>
                  <img src={m.img} alt="" style={s.cardCircleImg} draggable={false} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={s.cardTag}>{m.tag}</span>
                  <h3 style={s.cardTitle}>{m.title}</h3>
                </div>
                <span style={s.cardArrow}>›</span>
              </div>
              <p style={s.cardSub}>{m.sub}</p>
              <div style={s.progressWrap}>
                <div style={s.progressLabels}>
                  <span>{m.progress}/{m.total} {m.to === '/cours' ? 'leçons' : m.to === '/quiz' ? 'quiz' : 'outils'}</span>
                  <span>{pct}%</span>
                </div>
                <div style={s.progressTrack}>
                  <div style={{ ...s.progressFill, width: `${pct}%` }} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* PERSONNAGES STRIP + STREAK */}
      <div className="fade-up fade-up-d4" style={s.stripRow}>
        {personnages.map((p) => (
          <div key={p.label} style={s.stripItem}>
            <div style={s.stripCircle}>
              <img src={p.img} alt={p.label} style={s.stripImg} draggable={false} />
            </div>
            <span style={s.stripLabel}>{p.label}</span>
          </div>
        ))}
      </div>
      <div className="fade-up fade-up-d4" style={{ padding: '8px 20px 0' }}>
        <div style={s.streakPill}>🔥 4 jours · Semaine 2/4 · 35%</div>
      </div>

    </div>
  )
}

const s = {
  page: {
    minHeight: '100dvh',
    background: '#0F172A',
    paddingBottom: 100,
  },

  /* Header */
  header: { padding: '20px 20px 0' },
  headerRow: { display: 'flex', alignItems: 'center' },
  headerTitle: { fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: '#A8DED1' },
  logoImg: { height: 38, width: 'auto', borderRadius: '50%', marginLeft: 'auto', flexShrink: 0 },

  greeting: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8DED1', margin: '0 0 4px' },
  title: { fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 32, color: '#FFFFFF', margin: 0, lineHeight: 1.15 },

  /* Streak */
  streakPill: {
    display: 'inline-block',
    marginTop: 12,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '6px 14px',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: '#A8DED1',
  },

  /* Personnages strip */
  stripRow: { display: 'flex', gap: 10, padding: '20px 20px 0', justifyContent: 'flex-start' },
  stripItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  stripCircle: { width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 },
  stripImg: { width: '100%', height: '100%', objectFit: 'cover' },
  stripLabel: { fontFamily: 'Inter, sans-serif', fontSize: 8, color: '#64748B' },

  /* Separator */
  separator: { margin: '24px 20px 0', height: 1, background: 'rgba(255,255,255,0.08)' },

  /* Modules */
  modules: { padding: '20px 16px 0' },
  card: {
    display: 'block',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    transition: 'transform 0.15s',
  },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12 },
  cardCircle: { width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.15)' },
  cardCircleImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cardTag: { fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: 1.5, color: 'rgba(168,222,209,0.6)', textTransform: 'uppercase', display: 'block' },
  cardTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: 0 },
  cardArrow: { fontSize: 22, opacity: 0.4, flexShrink: 0, fontWeight: 300, lineHeight: 1 },
  cardSub: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '6px 0 0' },

  progressWrap: { marginTop: 14 },
  progressLabels: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 },
  progressTrack: { height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#FFFFFF', borderRadius: 999, transition: 'width 0.5s ease' },

}
