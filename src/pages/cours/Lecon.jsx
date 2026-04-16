import { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LECONS, ANNEXES } from '../../data/lecons'
import { useSwipe } from '../../hooks/useSwipe'
import { AppContext } from '../../lib/AppContext'

import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'
import cortexPassionne from '../../assets/characters/cortex/cortex-passionne.webp'
import cortexPerplexe from '../../assets/characters/cortex/cortex-perplexe.webp'

const cortexMap = { bienveillant: cortexBienveillant, passionne: cortexPassionne, perplexe: cortexPerplexe }

function LeconInner({ id }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { appData, saveData } = useContext(AppContext)
  const isAnnexe = location.pathname.startsWith('/annexes')
  const dataset = isAnnexe ? ANNEXES : LECONS
  const backPath = isAnnexe ? '/annexes' : '/cours'
  const doneKey = isAnnexe ? 'annexes_done' : 'lecons_done'
  const lecon = dataset.find((l) => String(l.id) === id)
  const [cardIdx, setCardIdx] = useState(0)
  const [showAfter, setShowAfter] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)

  // Mark the current lesson as done in appData (idempotent)
  const markDone = () => {
    if (!lecon || !saveData) return
    const current = appData?.[doneKey] || []
    if (current.some((x) => String(x) === String(lecon.id))) return
    saveData({ [doneKey]: [...current, lecon.id] })
  }

  const totalCards = lecon ? lecon.cartes.length : 0
  const goNext = () => { if (cardIdx < totalCards - 1) setCardIdx((i) => i + 1); else setShowAfter(true) }
  const goPrev = () => { if (showAfter) { setShowAfter(false); return } if (cardIdx > 0) setCardIdx((i) => i - 1) }
  const swipe = useSwipe({ onLeft: goNext, onRight: goPrev })

  if (!lecon) return <div style={{ background: '#1C1B2E', color: '#fff', minHeight: '100dvh', padding: 40 }}>Lecon introuvable</div>

  const color = lecon.moduleColor
  const cortex = cortexMap[lecon.cortexImage] || cortexBienveillant
  const currentIdx = dataset.findIndex((l) => l.id === lecon.id)
  const nextLecon = dataset[currentIdx + 1]

  return (
    <div style={{ background: '#1C1B2E', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={S.header}>
        <button onClick={() => navigate(backPath)} style={S.backCircle}>‹</button>
        <div style={{ flex: 1 }} />
        <div style={S.headerRight}>
          <span style={S.cardCount}>{showAfter ? 'Fin' : `${cardIdx + 1}/${totalCards}`}</span>
          {!showAfter && <div style={S.headerDots}>{lecon.cartes.map((_, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i <= cardIdx ? '#fff' : 'rgba(255,255,255,0.2)' }} />)}</div>}
        </div>
      </div>

      {!showAfter && (
        <div {...swipe} style={S.cardArea}>
          <div key={cardIdx} className="fade-up" style={S.cardContainer}>
            <RenderCard carte={lecon.cartes[cardIdx]} color={color} cortex={cortex} lecon={lecon} onShowScenario={() => { markDone(); setShowAfter(true) }} onComplete={markDone} basePath={backPath} />
          </div>
          <div style={S.navRow}>
            <button onClick={goPrev} style={{ ...S.navBtn, opacity: cardIdx > 0 ? 1 : 0.25 }}>←</button>
            <div style={S.dots}>{lecon.cartes.map((_, i) => <span key={i} style={{ ...S.dot, background: i === cardIdx ? '#fff' : 'rgba(255,255,255,0.25)' }} />)}</div>
            <button onClick={goNext} style={S.navBtn}>→</button>
          </div>
        </div>
      )}

      {showAfter && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 80px' }}>
          <button onClick={goPrev} style={{ ...S.backBtn, color: '#2A9490', marginBottom: 20 }}>← Revoir les cartes</button>
          <Scenario scenario={lecon.scenario} color={color} openAccordion={openAccordion} setOpenAccordion={setOpenAccordion} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            {nextLecon && <button onClick={() => { markDone(); navigate(`${backPath}/${nextLecon.id}`) }} style={{ ...S.btn, background: color, color: color === '#2A9490' || color === '#F5E06D' ? '#1C1B2E' : '#fff' }}>Lecon suivante →</button>}
            <button onClick={() => navigate(backPath)} style={{ ...S.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>Retour au programme</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Lecon() {
  const { id } = useParams()
  // Keying on id forces a fresh component instance when the route changes,
  // resetting cardIdx/showAfter/openAccordion cleanly without effects.
  return <LeconInner key={id} id={id} />
}

/* ═══════ Card Renderer ═══════ */
function RenderCard({ carte: c, color, cortex, lecon, onShowScenario, onComplete, basePath }) {
  const nav = useNavigate()
  switch (c.type) {
    case 'intro': {
      const apercu = lecon.apercu || c.points || []
      return (
        <div style={{ ...S.cardFull, background: '#1C1B2E', justifyContent: 'space-between', padding: '60px 0 0 0' }}>
          {/* Color band + badge */}
          <div>
            <div style={{ padding: '0 24px' }}>
              <span style={{ display: 'inline-block', background: `${color}33`, border: `1px solid ${color}66`, borderRadius: 20, padding: '5px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color, fontWeight: 600 }}>{lecon.moduleLabel}</span>
            </div>
          </div>
          {/* Center: Cortex image + text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <img src={cortex} alt="Cortex" className="sway" style={{ height: 200, objectFit: 'contain' }} draggable={false} />
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center', margin: '24px 0 0', padding: '0 8px' }}>{c.titre}</h2>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.5, margin: '8px 0 0', padding: '0 16px' }}>{c.texte}</p>
          </div>
          {/* Bottom card */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderTop: '1px solid rgba(255,255,255,0.10)', padding: '16px 24px 32px' }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, color, fontWeight: 600, marginBottom: 12 }}>DANS CETTE LECON</p>
            {apercu.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: `${color}99`, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#E2E8F0', lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginTop: 14 }} />
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.40)', textAlign: 'center', marginTop: 10 }}>
              ⏱ {lecon.duree} · {lecon.cartes.length} cartes  →  Tape pour commencer
            </p>
          </div>
        </div>
      )
    }
    case 'fact': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 0 80px 0' }}>
        <div style={{ background: color, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>{c.label}</span><h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, color: '#fff', margin: '4px 0 0', fontWeight: 700 }}>{c.titre}</h3></div>
          <span style={{ fontSize: 36 }}>{c.icone}</span>
        </div>
        <div style={{ padding: 20, flex: 1 }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, color: '#E2E8F0', lineHeight: 1.65, marginBottom: 14 }}>{c.texte}</p>
          {c.detail && <><div style={S.thinSep} /><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, margin: '14px 0 6px' }}>En pratique :</p><p style={{ fontSize: 15, color, fontStyle: 'italic', lineHeight: 1.5 }}>{c.detail}</p></>}
          {c.exemple && <div style={{ ...S.exCard, borderColor: color, background: `${color}1a` }}><p style={{ fontSize: 14, color: '#2A9490', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>{c.exemple}</p></div>}
        </div>
      </div>
    )
    case 'fact2col': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 16px 80px' }}>
        {c.titre && <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, color: '#2A9490', textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center', marginBottom: 16 }}>{c.titre}</h3>}
        <div style={{ display: 'flex', gap: 12, flex: 1, alignItems: 'stretch' }}>
          {c.colonnes.map((col, i) => (
            <div key={i} style={{ flex: 1, minHeight: 200, background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16, borderTop: `3px solid ${col.couleur || color}`, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 10, color: col.couleur || color, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>{col.label}</span>
              <span style={{ fontSize: 36, margin: '8px 0' }}>{col.icone}</span>
              <h4 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 15, color: '#fff', fontWeight: 700, margin: '0 0 6px' }}>{col.titre}</h4>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{col.texte}</p>
              {col.action && <><div style={{ ...S.thinSep, marginTop: 10 }} /><p style={{ fontSize: 13, color: col.couleur || color, fontStyle: 'italic', margin: '8px 0 0' }}>→ {col.action}</p></>}
            </div>
          ))}
        </div>
      </div>
    )
    case 'cortex': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 20px 80px', alignItems: 'center' }}>
        <img src={cortex} alt="Cortex" style={{ width: 80, height: 80, objectFit: 'contain' }} draggable={false} />
        <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#F5E06D', fontWeight: 700, marginTop: 8 }}>Pr. Cortex</span>
        <div style={{ background: 'rgba(245,224,109,0.08)', border: '1px solid rgba(245,224,109,0.15)', borderRadius: 20, padding: 24, marginTop: 16, width: '100%', textAlign: 'center' }}>
          <span style={{ fontSize: 48, color: '#F5E06D', opacity: 0.4, lineHeight: 1 }}>"</span>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 17, color: '#fff', fontStyle: 'italic', lineHeight: 1.7, margin: '4px 0 12px' }}>{c.citation}</p>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{c.source}</span>
        </div>
        {c.importance && <p style={{ fontSize: 15, color: '#2A9490', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}><strong>Pourquoi c'est important :</strong> {c.importance}</p>}
      </div>
    )
    case 'contraste': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 20px 80px', justifyContent: 'center' }}>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, color: '#2A9490', textAlign: 'center', marginBottom: 20 }}>{c.titre}</h3>
        <div style={{ ...S.contCard, borderColor: '#C0506A', background: 'rgba(212,83,126,0.10)' }}>
          <span style={{ fontSize: 10, color: '#C0506A', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{c.gauche.label}</span>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, color: '#fff', fontStyle: 'italic', lineHeight: 1.5, margin: '8px 0 0' }}>{c.gauche.texte}</p>
        </div>
        <div style={{ ...S.contCard, borderColor: '#2A9490', background: 'rgba(42,148,144,0.10)', marginTop: 10 }}>
          <span style={{ fontSize: 10, color: '#2A9490', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{c.droite.label}</span>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, color: '#fff', fontStyle: 'italic', lineHeight: 1.5, margin: '8px 0 0' }}>{c.droite.texte}</p>
        </div>
        {c.difference && <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}>{c.difference}</p>}
      </div>
    )
    case 'verbatim': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 20px 80px', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: `${color}4d`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff', fontWeight: 700 }}>{c.auteur?.[0] || 'P'}</div>
        <span style={{ fontSize: 60, color, opacity: 0.3, lineHeight: 1, marginTop: 8 }}>"</span>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, color: '#fff', fontStyle: 'italic', lineHeight: 1.8, margin: '4px 20px 16px', maxWidth: 340 }}>{c.texte}</p>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#2A9490' }}>{c.auteur}</span>
        <div style={S.parentBadge}>Parent Cerveaux Electriques</div>
        {c.takeaway && <div style={{ ...S.exCard, borderColor: color, background: `${color}1a`, marginTop: 16, width: '100%', textAlign: 'left' }}><p style={{ fontSize: 14, color, margin: 0, lineHeight: 1.5 }}><strong>Ce que ca change :</strong> {c.takeaway}</p></div>}
      </div>
    )
    case 'action': return (
      <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 20px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: color, color: color === '#2A9490' ? '#1C1B2E' : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{c.numero}</span>
            <span style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginTop: 2 }}>ACTION</span>
          </div>
          <div><span style={{ ...S.tagPill, background: `${color}33`, color }}>{c.tag}</span><h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, color: '#fff', margin: '6px 0 0' }}>{c.titre}</h3></div>
        </div>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, color: '#E2E8F0', lineHeight: 1.7, marginBottom: 14 }}>{c.texte}</p>
        {c.resultat && <><div style={S.thinSep} /><div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 14, marginTop: 12 }}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>Resultat attendu</p><p style={{ fontSize: 15, color: '#2A9490', margin: 0, lineHeight: 1.5 }}>{c.resultat}</p></div></>}
        {c.exemple && <div style={{ ...S.exCard, borderColor: color, background: `${color}1a`, marginTop: 10 }}><p style={{ fontSize: 14, color: '#fff', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>{c.exemple}</p></div>}
      </div>
    )
    case 'memo': {
      const nextL = LECONS.find((l) => l.id === lecon.id + 1)
      return (
        <div style={{ ...S.cardFull, background: '#1C1B2E', padding: '72px 20px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${color}33`, border: `2px solid ${color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color }}>✓</div>
            <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 12 }}>A retenir</h3>
          </div>
          {c.items.map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: `3px solid ${color}`, borderRadius: 12, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color, fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#E2E8F0', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 24, width: '100%' }}>
            {nextL && <button onClick={() => { if (onComplete) onComplete(); nav(`${basePath}/${nextL.id}`) }} style={{ ...S.btn, background: '#F5E06D', color: '#1C1B2E', width: '100%', borderRadius: 50, padding: '14px 28px' }}>Lecon suivante →</button>}
            {!nextL && <button onClick={() => { if (onComplete) onComplete(); nav(basePath) }} style={{ ...S.btn, background: '#F5E06D', color: '#1C1B2E', width: '100%', borderRadius: 50, padding: '14px 28px' }}>Retour au programme</button>}
            {lecon.scenario && onShowScenario && <button onClick={onShowScenario} style={{ ...S.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', width: '100%', borderRadius: 50, padding: '12px 28px', marginTop: 8 }}>Scenario du jour</button>}
          </div>
        </div>
      )
    }
    default: return null
  }
}

/* ═══════ Scenario ═══════ */
function Scenario({ scenario, color, openAccordion, setOpenAccordion }) {
  const sections = [
    { key: 'situation', icon: '🎬', label: 'La situation', content: scenario.situation, style: { fontStyle: 'italic', color: '#E2E8F0' } },
    { key: 'cerveau', icon: '🧠', label: 'Son cerveau', content: scenario.cerveau_enfant, style: { color } },
    { key: 'demain', icon: '💡', label: 'Demain, essaie ca', content: null },
  ]
  return (
    <div>
      <div style={{ background: 'rgba(245,224,109,0.06)', borderRadius: 16, padding: '14px 18px', marginBottom: 12 }}>
        <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 700, color: '#F5E06D', margin: 0 }}>📅 Scenario du jour</h3>
      </div>
      {sections.map((sec) => {
        const open = openAccordion === sec.key
        return (
          <button key={sec.key} onClick={() => setOpenAccordion(open ? null : sec.key)} style={S.accBtn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{sec.icon}</span>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, color: '#fff' }}>{sec.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 14, color: 'rgba(255,255,255,0.4)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
            </div>
            {open && (
              <div style={{ marginTop: 10 }}>
                {sec.content && <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, margin: 0, ...sec.style }}>{sec.content}</p>}
                {sec.key === 'cerveau' && scenario.cerveau_parent && <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#94A3B8', lineHeight: 1.6, marginTop: 8 }}>Toi : {scenario.cerveau_parent}</p>}
                {sec.key === 'demain' && scenario.demain.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: `${color}26`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.5, margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ═══════ Styles ═══════ */
const S = {
  header: { position: 'fixed', top: 0, left: 0, right: 0, maxWidth: 430, margin: '0 auto', zIndex: 10, display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'linear-gradient(to bottom, rgba(28,27,46,0.95) 0%, rgba(28,27,46,0) 100%)' },
  backCircle: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter,sans-serif', flexShrink: 0 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: '4px 8px', fontWeight: 300 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 8 },
  headerDots: { display: 'flex', gap: 3 },
  cardCount: { fontFamily: 'Inter,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  cardArea: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', userSelect: 'none' },
  cardContainer: { flex: 1, display: 'flex', overflow: 'hidden' },
  cardFull: { width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflowY: 'auto' },
  navRow: { display: 'flex', alignItems: 'center', padding: '12px 20px 24px', gap: 16 },
  navBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  dots: { flex: 1, display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' },
  dot: { width: 6, height: 6, borderRadius: '50%', transition: 'background 0.2s' },
  btn: { display: 'block', width: '100%', textAlign: 'center', padding: '14px 28px', borderRadius: 999, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' },
  modPill: { display: 'inline-block', background: 'rgba(0,0,0,0.2)', borderRadius: 99, padding: '4px 12px', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1.5, color: '#fff', fontWeight: 600 },
  introCard: { background: 'rgba(0,0,0,0.25)', borderRadius: 16, padding: 16, width: '100%' },
  thinSep: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '2px 0' },
  exCard: { borderLeft: '3px solid', borderRadius: 12, padding: 12, marginTop: 10 },
  contCard: { borderLeft: '3px solid', borderRadius: 14, padding: '14px 16px' },
  parentBadge: { display: 'inline-block', marginTop: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99, padding: '3px 10px', fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 },
  tagPill: { display: 'inline-block', borderRadius: 99, padding: '3px 10px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 },
  accBtn: { display: 'block', width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', marginBottom: 8, cursor: 'pointer', textAlign: 'left' },
}
