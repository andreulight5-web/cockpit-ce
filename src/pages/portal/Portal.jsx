import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'
import { CAS_DU_JOUR } from '../../data/cas-du-jour'
import { useDesktop } from '../../hooks/useDesktop'

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

const TOTAL_LECONS = 5
const TOTAL_QUIZ = 5

export default function Portal() {
  const { appData } = useContext(AppContext)
  const navigate = useNavigate()
  const isDesktop = useDesktop(1024)

  const prenomParent = appData?.onboarding?.prenomParent || ''
  const leconsDone = (appData?.lecons_done || []).filter((id) => Number(id) >= 1 && Number(id) <= 5)
  const formationPct = Math.round((leconsDone.length / TOTAL_LECONS) * 100)

  const [installDate] = useState(() => {
    const existing = localStorage.getItem('cockpit_install_date')
    if (existing) return existing
    const d = new Date().toISOString()
    localStorage.setItem('cockpit_install_date', d)
    return d
  })
  const dayIndex = Math.floor((Date.now() - new Date(installDate).getTime()) / 86400000) % 30
  const casJour = CAS_DU_JOUR[dayIndex]
  const [casExpanded, setCasExpanded] = useState(false)

  const quizDone = (() => {
    try { return JSON.parse(localStorage.getItem('cockpit_quiz_done') || '[]') } catch { return [] }
  })()
  const quizPct = Math.round((quizDone.length / TOTAL_QUIZ) * 100)

  const heroProps = { prenomParent, formationPct, leconsDone, quizDone }
  const casProps = { casJour, dayIndex, casExpanded, setCasExpanded, navigate }
  const modulesProps = { leconsDone, formationPct, quizDone, quizPct }

  if (isDesktop) {
    return <PortalDesktop {...heroProps} {...casProps} {...modulesProps} />
  }
  return <PortalMobile {...heroProps} {...casProps} {...modulesProps} />
}

/* ═══════════════════ DESKTOP ═══════════════════ */
function PortalDesktop({ prenomParent, formationPct, leconsDone, quizDone, quizPct, casJour, dayIndex, casExpanded, setCasExpanded, navigate }) {
  return (
    <div style={d.page}>
      <div style={d.container}>
        {/* HERO */}
        <header style={d.hero} className="fade-up">
          <div>
            <p style={d.greeting}>Bonjour {prenomParent || 'parent'} 👋</p>
            <h1 style={d.title}>Ton Cockpit <span style={{ color: '#F5E06D' }}>Crises ⚡</span></h1>
            <p style={d.heroSub}>Prépare tes réflexes à froid. Les bons automatismes seront déjà là quand ça arrive.</p>
          </div>
          <div style={d.heroStats}>
            <StatPill label="Formation" value={`${formationPct}%`} sub={`${leconsDone.length}/${TOTAL_LECONS} leçons`} color="#C0506A" />
            <StatPill label="Quiz" value={`${quizPct}%`} sub={`${quizDone.length}/${TOTAL_QUIZ} situations`} color="#2A9490" />
            <StatPill label="Streak" value="4j" sub="Semaine 2/4" color="#F5E06D" />
          </div>
        </header>

        {/* GRID 2 COLS — left big (cas + carousel personnages) ; right (3 modules) */}
        <div style={d.grid}>
          {/* COL GAUCHE */}
          <div style={d.colLeft}>
            <CasDuJourCard
              variant="desktop"
              casJour={casJour}
              dayIndex={dayIndex}
              expanded={casExpanded}
              setExpanded={setCasExpanded}
              navigate={navigate}
            />

            {/* Personnages strip in same column for visual balance */}
            <div style={d.personsCard} className="fade-up fade-up-d2">
              <div style={d.personsHeadRow}>
                <h3 style={d.cardSubHead}>Tes alliés</h3>
                <span style={d.cardSubHint}>Personnages du Kit</span>
              </div>
              <div style={d.personsRow}>
                {personnages.map((p) => (
                  <div key={p.label} style={d.personCell}>
                    <div style={d.personCircle}>
                      <img src={p.img} alt={p.label} style={d.personImg} draggable={false} />
                    </div>
                    <span style={d.personLabel}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COL DROITE — 3 modules */}
          <div style={d.colRight}>
            <h3 style={d.cardSubHead}>Modules</h3>

            <Link to="/cours" style={{ ...d.module, background: 'linear-gradient(135deg, #C0506A 0%, #7A2040 100%)' }} className="fade-up fade-up-d1">
              <div style={d.modTop}>
                <div style={d.modIcon}><img src={cortexBienveillant} alt="" style={d.modIconImg} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={d.modTag}>FORMATION</span>
                  <h4 style={d.modTitle}>Gestion des crises</h4>
                </div>
                <span style={d.modArrow}>›</span>
              </div>
              <p style={d.modSub}>Prépare tes réflexes · 5 leçons · 4 min</p>
              <div style={{ marginTop: 12 }}>
                <div style={d.modProgRow}>
                  <span>{leconsDone.length}/{TOTAL_LECONS} leçons</span>
                  <span>{formationPct}%</span>
                </div>
                <div style={d.modProgTrack}><div style={{ ...d.modProgFill, width: `${formationPct}%` }} /></div>
              </div>
            </Link>

            <Link to="/quiz" style={{ ...d.module, background: 'linear-gradient(135deg, #2A9490 0%, #1A5F5C 100%)' }} className="fade-up fade-up-d2">
              <div style={d.modTop}>
                <div style={d.modIcon}><img src={monstreRigole} alt="" style={d.modIconImg} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={d.modTag}>5 SITUATIONS</span>
                  <h4 style={d.modTitle}>Quiz Situations</h4>
                </div>
                <span style={d.modArrow}>›</span>
              </div>
              <p style={d.modSub}>Réagis aux scènes du quotidien · 3 min/quiz</p>
              <div style={{ marginTop: 12 }}>
                <div style={d.modProgRow}>
                  <span>{quizDone.length}/{TOTAL_QUIZ} quiz</span>
                  <span>{quizPct}%</span>
                </div>
                <div style={d.modProgTrack}><div style={{ ...d.modProgFill, width: `${quizPct}%` }} /></div>
              </div>
            </Link>

            <Link to="/ressources" style={{ ...d.module, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,224,109,0.3)' }} className="fade-up fade-up-d3">
              <div style={d.modTop}>
                <div style={{ ...d.modIcon, background: 'rgba(245,224,109,0.15)', fontSize: 26 }}>🛠️</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ ...d.modTag, color: 'rgba(245,224,109,0.8)' }}>BUNDLE</span>
                  <h4 style={d.modTitle}>Mes Outils</h4>
                </div>
                <span style={d.modArrow}>›</span>
              </div>
              <p style={d.modSub}>11 outils imprimables · Cards · Affiches · Journal</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value, sub, color }) {
  return (
    <div style={d.statPill}>
      <div style={d.statLabel}>{label}</div>
      <div style={{ ...d.statValue, color }}>{value}</div>
      <div style={d.statSub}>{sub}</div>
    </div>
  )
}

/* ═══════════════════ MOBILE (inchangé visuellement) ═══════════════════ */
function PortalMobile({ prenomParent, formationPct, leconsDone, quizDone, quizPct, casJour, dayIndex, casExpanded, setCasExpanded, navigate }) {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerRow}>
          <span style={s.headerTitle}>Cockpit Crises</span>
          <img src={logoCE} alt="Cerveau Électrique" style={s.logoImg} draggable={false} />
        </div>
        <div className="fade-up" style={{ marginTop: 20 }}>
          <p style={s.greeting}>Bonjour {prenomParent || 'parent'} 👋</p>
          <h1 style={s.title}>Ton Cockpit <span style={{ color: '#F5E06D' }}>Crises ⚡</span></h1>
        </div>
      </div>

      <div className="fade-up" style={s.casWrap}>
        <CasDuJourCard
          variant="mobile"
          casJour={casJour}
          dayIndex={dayIndex}
          expanded={casExpanded}
          setExpanded={setCasExpanded}
          navigate={navigate}
        />
      </div>

      <div style={s.separator} />

      <div style={s.modules}>
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
            <div style={s.progressLabels}><span>{leconsDone.length}/{TOTAL_LECONS} leçons</span><span>{formationPct}%</span></div>
            <div style={s.progressTrack}><div style={{ ...s.progressFill, width: `${formationPct}%` }} /></div>
          </div>
        </Link>

        <Link to="/quiz" className="fade-up fade-up-d1" style={{ ...s.card, background: 'linear-gradient(135deg, #2A9490 0%, #1A5F5C 100%)' }}>
          <div style={s.cardTop}>
            <div style={{ ...s.cardCircle, background: 'rgba(255,255,255,0.15)' }}>
              <img src={monstreRigole} alt="" style={s.cardCircleImg} draggable={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={s.cardTag}>POUR LUCAS</span>
              <h3 style={s.cardTitle}>Quiz Situations</h3>
            </div>
            <span style={s.cardArrow}>›</span>
          </div>
          <p style={s.cardSub}>Réagis aux scènes du quotidien · 3 min</p>
          <div style={s.progressWrap}>
            <div style={s.progressLabels}><span>{quizDone.length}/{TOTAL_QUIZ} quiz</span><span>{quizPct}%</span></div>
            <div style={s.progressTrack}><div style={{ ...s.progressFill, width: `${quizPct}%` }} /></div>
          </div>
        </Link>

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

/* ═══════════════════ CAS DU JOUR (partagé) ═══════════════════ */
function CasDuJourCard({ variant, casJour, dayIndex, expanded, setExpanded, navigate }) {
  const isDesk = variant === 'desktop'
  const card = isDesk ? d.casCard : s.casCard
  return (
    <div style={card}>
      <div style={isDesk ? d.casHead : s.casHead}>
        <span style={isDesk ? d.casBadge : s.casBadge}>📅 CAS DU JOUR · Jour {dayIndex + 1}/30</span>
        <span style={isDesk ? d.casTag : s.casTag}>{casJour.tag}</span>
      </div>
      <p style={isDesk ? d.casPrenom : s.casPrenom}>{casJour.prenom}, parent de Lucas {casJour.age_enfant} ans</p>

      {!expanded && (
        <>
          <p style={{ ...(isDesk ? d.casSituation : s.casSituation), display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {casJour.situation}
          </p>
          <button onClick={() => setExpanded(true)} style={isDesk ? d.casOpenBtn : s.casOpenBtn}>Voir la résolution →</button>
        </>
      )}

      {expanded && (
        <>
          <p style={isDesk ? d.casSituation : s.casSituation}>{casJour.situation}</p>

          <div style={isDesk ? d.casSep : s.casSep} />
          <p style={isDesk ? d.casLabelMuted : s.casLabelMuted}>❌ Ce qui a été essayé</p>
          <p style={isDesk ? d.casText : s.casText}>{casJour.essaye}</p>

          <div style={isDesk ? d.casSep : s.casSep} />
          <p style={isDesk ? d.casLabelTeal : s.casLabelTeal}>✅ Ce qui a marché</p>
          <p style={isDesk ? d.casText : s.casText}>{casJour.solution}</p>

          <div style={isDesk ? d.casSep : s.casSep} />
          <p style={isDesk ? d.casLabelYellow : s.casLabelYellow}>💡 La leçon</p>
          <p style={{ ...(isDesk ? d.casText : s.casText), color: '#F5E06D', fontStyle: 'italic' }}>{casJour.lecon}</p>

          <div style={isDesk ? d.casFooter : s.casFooter}>
            {casJour.lecon_liee && (
              <button onClick={() => navigate(`/cours/${casJour.lecon_liee}`)} style={isDesk ? d.casLeconBtn : s.casLeconBtn}>→ Revoir leçon {casJour.lecon_liee}</button>
            )}
            <button onClick={() => setExpanded(false)} style={isDesk ? d.casCloseBtn : s.casCloseBtn}>Réduire ↑</button>
          </div>
        </>
      )}
    </div>
  )
}

/* ═══════════════════ STYLES MOBILE (existants) ═══════════════════ */
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
  separator: { margin: '20px 20px 0', height: 1, background: 'rgba(255,255,255,0.08)' },
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
  casWrap: { padding: '20px 20px 0' },
  casCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,224,109,0.2)', borderRadius: 16, padding: 16, marginBottom: 16 },
  casHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10, flexWrap: 'wrap' },
  casBadge: { display: 'inline-block', background: 'rgba(245,224,109,0.15)', color: '#F5E06D', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, padding: '4px 10px', borderRadius: 99 },
  casTag: { display: 'inline-block', background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 11, padding: '4px 10px', borderRadius: 99 },
  casPrenom: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', margin: '0 0 8px' },
  casSituation: { fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.5, margin: '0 0 10px' },
  casSep: { height: 1, background: 'rgba(255,255,255,0.08)', margin: '12px 0' },
  casLabelMuted: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', fontWeight: 600, margin: '0 0 4px' },
  casLabelTeal: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#2A9490', fontWeight: 700, margin: '0 0 4px' },
  casLabelYellow: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#F5E06D', fontWeight: 600, fontStyle: 'italic', margin: '0 0 4px' },
  casText: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#E2E8F0', lineHeight: 1.55, margin: 0 },
  casOpenBtn: { background: 'transparent', border: '1px solid rgba(245,224,109,0.4)', color: '#F5E06D', borderRadius: 20, padding: '8px 16px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  casCloseBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: 20, padding: '8px 16px', fontFamily: 'Inter, sans-serif', fontSize: 12, cursor: 'pointer' },
  casLeconBtn: { background: 'rgba(42,148,144,0.18)', border: '1px solid rgba(42,148,144,0.4)', color: '#2A9490', borderRadius: 20, padding: '8px 16px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  casFooter: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 },
}

/* ═══════════════════ STYLES DESKTOP ═══════════════════ */
const d = {
  page: { minHeight: '100vh', background: '#1C1B2E', backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.08), transparent 40%), radial-gradient(circle at 100% 30%, rgba(42,148,144,0.08), transparent 50%)' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '36px 40px 60px' },

  hero: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'flex-end', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  greeting: { fontFamily: "'Caveat', cursive", fontSize: 26, color: '#F5E06D', margin: '0 0 4px' },
  title: { fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 44, color: '#FFFFFF', margin: 0, lineHeight: 1.1, letterSpacing: -0.5 },
  heroSub: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: '12px 0 0', maxWidth: 560, lineHeight: 1.55 },
  heroStats: { display: 'flex', gap: 12, alignItems: 'flex-end' },

  statPill: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', minWidth: 110 },
  statLabel: { fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, textTransform: 'uppercase' },
  statValue: { fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 800, lineHeight: 1, marginTop: 4 },
  statSub: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 },

  grid: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 24, alignItems: 'flex-start' },
  colLeft: { display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 },
  colRight: { display: 'flex', flexDirection: 'column', gap: 12 },

  cardSubHead: { fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: '0 0 4px' },
  cardSubHint: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' },

  // Cas du jour desktop
  casCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,224,109,0.2)', borderRadius: 18, padding: 24 },
  casHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12, flexWrap: 'wrap' },
  casBadge: { display: 'inline-block', background: 'rgba(245,224,109,0.15)', color: '#F5E06D', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, padding: '5px 12px', borderRadius: 99 },
  casTag: { display: 'inline-block', background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 12, padding: '5px 12px', borderRadius: 99 },
  casPrenom: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', margin: '0 0 10px' },
  casSituation: { fontFamily: 'Inter, sans-serif', fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1.55, margin: '0 0 12px' },
  casSep: { height: 1, background: 'rgba(255,255,255,0.08)', margin: '14px 0' },
  casLabelMuted: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#94A3B8', fontWeight: 600, margin: '0 0 6px' },
  casLabelTeal: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#2A9490', fontWeight: 700, margin: '0 0 6px' },
  casLabelYellow: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F5E06D', fontWeight: 600, fontStyle: 'italic', margin: '0 0 6px' },
  casText: { fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#E2E8F0', lineHeight: 1.6, margin: 0 },
  casOpenBtn: { background: 'transparent', border: '1px solid rgba(245,224,109,0.4)', color: '#F5E06D', borderRadius: 99, padding: '9px 18px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 6 },
  casCloseBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: 99, padding: '9px 18px', fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer' },
  casLeconBtn: { background: 'rgba(42,148,144,0.18)', border: '1px solid rgba(42,148,144,0.4)', color: '#2A9490', borderRadius: 99, padding: '9px 18px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  casFooter: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 },

  // Modules
  module: { display: 'block', borderRadius: 18, padding: 20, textDecoration: 'none', color: '#fff', transition: 'transform 0.15s' },
  modTop: { display: 'flex', alignItems: 'center', gap: 12 },
  modIcon: { width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modIconImg: { width: '100%', height: '100%', objectFit: 'cover' },
  modTag: { fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: 1.5, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', display: 'block' },
  modTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '2px 0 0' },
  modArrow: { fontSize: 22, opacity: 0.4, flexShrink: 0, fontWeight: 300 },
  modSub: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '8px 0 0' },
  modProgRow: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  modProgTrack: { height: 4, background: 'rgba(0,0,0,0.25)', borderRadius: 99, overflow: 'hidden' },
  modProgFill: { height: '100%', background: '#fff', borderRadius: 99, transition: 'width 0.5s' },

  // Personnages bloc desktop
  personsCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 16 },
  personsHeadRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  personsRow: { display: 'flex', gap: 14, justifyContent: 'flex-start' },
  personCell: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  personCircle: { width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' },
  personImg: { width: '100%', height: '100%', objectFit: 'cover' },
  personLabel: { fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.55)' },
}
