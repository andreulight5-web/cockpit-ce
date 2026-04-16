import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'

import mamanFiere from '../../assets/characters/maman/maman-fiere.webp'
import papaEncourageant from '../../assets/characters/papa/encourageant.webp'
import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'
import logoCE from '../../assets/logo-ce.png'

const personnages = [
  { label: 'Maman', img: mamanFiere },
  { label: 'Papa', img: papaEncourageant },
  { label: 'Cortex', img: cortexBienveillant },
  { label: 'Monstre', img: monstreCalin },
]

const TOTAL_LECONS = 5 // Module 1 "Gestion des crises"

export default function Portal() {
  const { appData } = useContext(AppContext)
  const prenomParent = appData?.onboarding?.prenomParent || ''
  const leconsDone = (appData?.lecons_done || []).filter((id) => Number(id) >= 1 && Number(id) <= 5)
  const formationPct = Math.round((leconsDone.length / TOTAL_LECONS) * 100)

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerRow}>
          <span style={s.headerTitle}>Cockpit Crises</span>
          <img src={logoCE} alt="Cerveaux Électriques" style={s.logoImg} draggable={false} />
        </div>
        <div className="fade-up" style={{ marginTop: 20 }}>
          <p style={s.greeting}>Bonjour {prenomParent || 'parent'} 👋</p>
          <h1 style={s.title}>
            Ton Cockpit <span style={{ color: '#F5E06D' }}>Crises ⚡</span>
          </h1>
        </div>
      </div>

      <div style={s.separator} />

      {/* 3 Modules */}
      <div style={s.modules}>
        {/* Module 1 — Formation */}
        <Link to="/cours" className="fade-up" style={{ ...s.card, background: 'linear-gradient(135deg, #C0506A 0%, #7A2040 100%)' }}>
          <div style={s.cardTop}>
            <div style={{ ...s.cardCircle, background: 'rgba(255,255,255,0.15)' }}>
              <img src={cortexBienveillant} alt="" style={s.cardCircleImg} draggable={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={s.cardTag}>FORMATION</span>
              <h3 style={s.cardTitle}>Gestion des crises</h3>
            </div>
            <span style={s.cardArrow}>›</span>
          </div>
          <p style={s.cardSub}>Prépare tes réflexes · 5 leçons · 4 min</p>
          <div style={s.progressWrap}>
            <div style={s.progressLabels}>
              <span>{leconsDone.length}/{TOTAL_LECONS} leçons</span>
              <span>{formationPct}%</span>
            </div>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${formationPct}%` }} />
            </div>
          </div>
        </Link>

        {/* Module 2 — Quiz Émotions */}
        <Link to="/quiz" className="fade-up fade-up-d1" style={{ ...s.card, background: 'linear-gradient(135deg, #2A9490 0%, #1A5F5C 100%)' }}>
          <div style={s.cardTop}>
            <div style={{ ...s.cardCircle, background: 'rgba(255,255,255,0.15)' }}>
              <img src={monstreRigole} alt="" style={s.cardCircleImg} draggable={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={s.cardTag}>POUR LUCAS</span>
              <h3 style={s.cardTitle}>Quiz Émotions</h3>
            </div>
            <span style={s.cardArrow}>›</span>
          </div>
          <p style={s.cardSub}>Apprend à reconnaître tes émotions · 3 min</p>
        </Link>

        {/* Module 3 — Mes Outils */}
        <Link to="/ressources" className="fade-up fade-up-d2" style={{ ...s.card, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,224,109,0.3)' }}>
          <div style={s.cardTop}>
            <div style={{ ...s.cardCircle, background: 'rgba(245,224,109,0.15)', fontSize: 32 }}>🛠️</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ ...s.cardTag, color: 'rgba(245,224,109,0.8)' }}>BUNDLE</span>
              <h3 style={s.cardTitle}>Mes Outils</h3>
            </div>
            <span style={s.cardArrow}>›</span>
          </div>
          <p style={s.cardSub}>Cards · Affiches · Journal à imprimer</p>
        </Link>
      </div>

      {/* Personnages strip */}
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
        <div style={s.streakPill}>🔥 4 jours · Semaine 2/4 · {formationPct}%</div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E', paddingBottom: 100 },
  header: { padding: '20px 20px 0' },
  headerRow: { display: 'flex', alignItems: 'center' },
  headerTitle: { fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.5)' },
  logoImg: { height: 38, width: 'auto', borderRadius: '50%', marginLeft: 'auto', flexShrink: 0 },
  greeting: { fontFamily: "'Caveat', cursive", fontSize: 22, color: '#F5E06D', margin: '0 0 4px' },
  title: { fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 32, color: '#FFFFFF', margin: 0, lineHeight: 1.15 },
  streakPill: { display: 'inline-block', background: 'rgba(42,148,144,0.2)', border: '1px solid rgba(42,148,144,0.4)', borderRadius: 20, padding: '6px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#2A9490' },
  stripRow: { display: 'flex', gap: 10, padding: '20px 20px 0', justifyContent: 'flex-start' },
  stripItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  stripCircle: { width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 },
  stripImg: { width: '100%', height: '100%', objectFit: 'cover' },
  stripLabel: { fontFamily: 'Inter, sans-serif', fontSize: 8, color: '#64748B' },
  separator: { margin: '24px 20px 0', height: 1, background: 'rgba(255,255,255,0.08)' },
  modules: { padding: '20px 16px 0' },
  card: { display: 'block', borderRadius: 20, padding: 20, marginBottom: 12, textDecoration: 'none', color: '#fff' },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12 },
  cardCircle: { width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardCircleImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cardTag: { fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: 1.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block' },
  cardTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: 0 },
  cardArrow: { fontSize: 22, opacity: 0.4, flexShrink: 0, fontWeight: 300, lineHeight: 1 },
  cardSub: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '6px 0 0' },
  progressWrap: { marginTop: 14 },
  progressLabels: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  progressTrack: { height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#FFFFFF', borderRadius: 999, transition: 'width 0.5s ease' },
}
