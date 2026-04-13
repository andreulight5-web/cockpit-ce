import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LECONS } from '../../data/lecons'
import { useSwipe } from '../../hooks/useSwipe'

import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'
import cortexPassionne from '../../assets/characters/cortex/cortex-passionne.webp'
import cortexPerplexe from '../../assets/characters/cortex/cortex-perplexe.webp'

const cortexMap = { bienveillant: cortexBienveillant, passionne: cortexPassionne, perplexe: cortexPerplexe }
const XP_KEY = 'cockpit_progress'

export default function Lecon() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lecon = LECONS.find((l) => l.id === Number(id))
  const [cardIdx, setCardIdx] = useState(0)
  const [showAfter, setShowAfter] = useState(false)

  // Quiz state
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const totalCards = lecon ? lecon.cartes.length : 0

  const goNext = () => {
    if (cardIdx < totalCards - 1) setCardIdx((i) => i + 1)
    else setShowAfter(true)
  }
  const goPrev = () => {
    if (showAfter) { setShowAfter(false); return }
    if (cardIdx > 0) setCardIdx((i) => i - 1)
  }

  const swipe = useSwipe({ onLeft: goNext, onRight: goPrev })

  if (!lecon) return <div style={{ background: '#0F172A', color: '#fff', minHeight: '100dvh', padding: 40 }}>Leçon introuvable</div>

  const color = lecon.moduleColor
  const cortex = cortexMap[lecon.cortexImage] || cortexBienveillant

  const handleChoice = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === lecon.quiz[qIdx].correct) setScore((s) => s + 1)
  }

  const nextQ = () => {
    if (qIdx < lecon.quiz.length - 1) { setQIdx((q) => q + 1); setSelected(null) }
    else {
      setQuizDone(true)
      try {
        const raw = localStorage.getItem(XP_KEY)
        const data = raw ? JSON.parse(raw) : { xp: 0, done: [] }
        if (!data.done.includes(lecon.id)) {
          data.done.push(lecon.id)
          data.xp = (data.xp || 0) + lecon.xp
          localStorage.setItem(XP_KEY, JSON.stringify(data))
        }
      } catch { /* ignore */ }
    }
  }

  const nextLecon = LECONS.find((l) => l.id === lecon.id + 1)

  // ─── RENDER ───
  return (
    <div style={{ background: '#0F172A', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Header bar */}
      <div style={{ ...S.header, background: color }}>
        <button onClick={() => navigate('/cours')} style={S.backBtn}>‹</button>
        <span style={S.headerLabel}>Leçon {lecon.id}/13</span>
        {!showAfter && <span style={S.cardCount}>{cardIdx + 1}/{totalCards}</span>}
        {showAfter && <span style={S.cardCount}>Fin</span>}
      </div>

      {/* Card area */}
      {!showAfter && (
        <div {...swipe} style={S.cardArea}>
          <div key={cardIdx} className="fade-up" style={S.cardContainer}>
            <RenderCard carte={lecon.cartes[cardIdx]} color={color} cortex={cortex} />
          </div>
          {/* Navigation */}
          <div style={S.navRow}>
            <button onClick={goPrev} style={{ ...S.navBtn, opacity: cardIdx > 0 ? 1 : 0.25 }}>←</button>
            <div style={S.dots}>
              {lecon.cartes.map((_, i) => (
                <span key={i} style={{ ...S.dot, background: i === cardIdx ? '#fff' : 'rgba(255,255,255,0.25)' }} />
              ))}
            </div>
            <button onClick={goNext} style={S.navBtn}>→</button>
          </div>
        </div>
      )}

      {/* After cards: scenario + quiz */}
      {showAfter && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 80px' }}>
          {/* Back to cards */}
          <button onClick={goPrev} style={{ ...S.backBtn, color: '#A8DED1', marginBottom: 20 }}>← Revoir les cartes</button>

          {/* Scenario */}
          <Scenario scenario={lecon.scenario} color={color} />

          {/* Quiz */}
          <div style={{ marginTop: 32 }}>
            <h3 style={S.sectionTitle}>Quiz rapide ⚡</h3>
            {!quizDone ? (
              <div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 6 }}>Question {qIdx + 1}/3</p>
                <h4 style={S.quizQ}>{lecon.quiz[qIdx].question}</h4>
                {lecon.quiz[qIdx].choix.map((c, i) => {
                  const answered = selected !== null
                  const isCorrect = i === lecon.quiz[qIdx].correct
                  const isSel = i === selected
                  let bg = 'rgba(255,255,255,0.08)', border = 'rgba(255,255,255,0.15)'
                  if (answered && isCorrect) { bg = 'rgba(13,147,115,0.2)'; border = '#0D9373' }
                  else if (answered && isSel) { bg = 'rgba(212,83,126,0.2)'; border = '#D4537E' }
                  return <button key={i} onClick={() => handleChoice(i)} style={{ ...S.choiceBtn, background: bg, borderColor: border }}>{answered && isCorrect && '✓ '}{answered && isSel && !isCorrect && '✗ '}{c}</button>
                })}
                {selected !== null && (
                  <div style={S.explBox}>
                    <p style={S.expl}>{lecon.quiz[qIdx].explication}</p>
                    <button onClick={nextQ} style={{ ...S.btn, background: color, marginTop: 14 }}>{qIdx < 2 ? 'Suivante' : 'Résultat'}</button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <p style={{ color: '#E2E8F0', fontSize: 48, fontWeight: 800 }}>{score}/3</p>
                <p className="fade-up" style={{ color: '#FFE17B', fontSize: 20, fontWeight: 700, margin: '8px 0 24px' }}>+{lecon.xp} XP ⚡</p>
                {nextLecon && <button onClick={() => { navigate(`/cours/${nextLecon.id}`); setCardIdx(0); setShowAfter(false); setQIdx(0); setSelected(null); setScore(0); setQuizDone(false) }} style={{ ...S.btn, background: color }}>Leçon suivante →</button>}
                <button onClick={() => navigate('/cours')} style={{ ...S.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', marginTop: 10 }}>Retour au programme</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═════════════════════════ Card renderer ═════════════════════════ */

function RenderCard({ carte, color, cortex }) {
  const c = carte
  switch (c.type) {
    case 'intro':
      return (
        <div style={{ ...S.cardFull, background: c.couleur, justifyContent: 'center', textAlign: 'center', padding: '40px 28px' }}>
          <span style={{ fontSize: 80, marginBottom: 20 }}>{c.emoji}</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>{c.titre}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{c.texte}</p>
        </div>
      )
    case 'fact':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 24px', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, color: '#A8DED1', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{c.label}</span>
          <span style={{ fontSize: 48, margin: '16px 0' }}>{c.icone}</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, color: '#fff', margin: '0 0 12px' }}>{c.titre}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#E2E8F0', lineHeight: 1.65 }}>{c.texte}</p>
          {c.detail && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: color, fontStyle: 'italic', marginTop: 16 }}>{c.detail}</p>}
        </div>
      )
    case 'cortex':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 24px', justifyContent: 'center', textAlign: 'center' }}>
          <img src={cortex} alt="Cortex" style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 16px' }} draggable={false} />
          <span style={{ fontSize: 11, color: '#FF6B4A', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Pr. Cortex dit...</span>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, color: '#fff', fontStyle: 'italic', lineHeight: 1.6, margin: '16px 0' }}>{c.citation}</p>
          <span style={{ fontSize: 11, color: '#64748B' }}>{c.source}</span>
        </div>
      )
    case 'contraste':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 20px', justifyContent: 'center' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#A8DED1', textAlign: 'center', marginBottom: 20 }}>{c.titre}</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            {[c.gauche, c.droite].map((side, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 14 }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{side.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#E2E8F0', lineHeight: 1.5 }}>{side.texte}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'verbatim':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 28px', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: 60, color: color, opacity: 0.4, lineHeight: 1 }}>"</span>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, color: '#fff', fontStyle: 'italic', lineHeight: 1.6, margin: '8px 0 20px' }}>{c.texte}</p>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A8DED1' }}>{c.auteur}</span>
        </div>
      )
    case 'action':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 24px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{c.numero}</span>
            <span style={{ background: `${color}33`, color, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 1 }}>{c.tag}</span>
          </div>
          <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16 }}>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#fff', marginBottom: 10 }}>{c.titre}</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#E2E8F0', lineHeight: 1.65 }}>{c.texte}</p>
          </div>
        </div>
      )
    case 'memo':
      return (
        <div style={{ ...S.cardFull, background: '#0F172A', padding: '40px 24px', justifyContent: 'center' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#fff', marginBottom: 20, textAlign: 'center' }}>{c.titre}</h3>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 18 }}>
            {c.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < c.items.length - 1 ? 14 : 0 }}>
                <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#E2E8F0', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}

/* ═════════════════════════ Scenario ═════════════════════════ */

function Scenario({ scenario, color }) {
  return (
    <div>
      <h3 style={S.sectionTitle}>📅 {scenario.titre}</h3>
      <div style={S.scenarioCard}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: '#A8DED1', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>La situation</p>
          <p style={{ fontSize: 14, color: '#E2E8F0', fontStyle: 'italic', lineHeight: 1.6 }}>{scenario.situation}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, color, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>Son cerveau</p>
          <p style={{ fontSize: 14, color, lineHeight: 1.6 }}>{scenario.cerveau_enfant}</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>Ton cerveau</p>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{scenario.cerveau_parent}</p>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: '#A8DED1', fontWeight: 600, marginBottom: 10 }}>Demain, essaie ça :</p>
        {scenario.demain.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: `${color}26`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
            <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.5, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═════════════════════════ Styles ═════════════════════════ */

const S = {
  header: { position: 'sticky', top: 0, zIndex: 20, height: 60, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: '4px 8px', fontWeight: 300 },
  headerLabel: { flex: 1, textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  cardCount: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', minWidth: 36, textAlign: 'right' },

  cardArea: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', userSelect: 'none' },
  cardContainer: { flex: 1, display: 'flex', overflow: 'hidden' },
  cardFull: { width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' },

  navRow: { display: 'flex', alignItems: 'center', padding: '12px 20px 24px', gap: 16 },
  navBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  dots: { flex: 1, display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' },
  dot: { width: 6, height: 6, borderRadius: '50%', transition: 'background 0.2s' },

  sectionTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12 },
  scenarioCard: { background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 18 },

  quizQ: { fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.4 },
  choiceBtn: { display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 12, border: '1.5px solid', fontSize: 14, color: '#E2E8F0', fontFamily: 'Inter, sans-serif', marginBottom: 8, cursor: 'pointer', background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' },
  explBox: { background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 16, marginTop: 12 },
  expl: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8DED1', lineHeight: 1.5, margin: 0 },
  btn: { display: 'inline-block', padding: '14px 28px', borderRadius: 999, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', border: 'none', cursor: 'pointer' },
}
