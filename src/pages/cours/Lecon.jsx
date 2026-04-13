import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LECONS } from '../../data/lecons'

import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'
import cortexPassionne from '../../assets/characters/cortex/cortex-passionne.webp'
import cortexPerplexe from '../../assets/characters/cortex/cortex-perplexe.webp'

const cortexByModule = { A: cortexBienveillant, B: cortexPassionne, C: cortexPerplexe }

const XP_KEY = 'cockpit_progress'

export default function Lecon() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lecon = LECONS.find((l) => l.id === Number(id))

  const scrollRef = useRef(null)
  const [scrollPct, setScrollPct] = useState(0)

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handle = () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setScrollPct(Math.min(1, Math.max(0, pct)))
    }
    el.addEventListener('scroll', handle, { passive: true })
    return () => el.removeEventListener('scroll', handle)
  }, [])

  if (!lecon) return <div style={{ background: '#0F172A', color: '#fff', minHeight: '100dvh', padding: 40 }}>Leçon introuvable</div>

  const color = lecon.moduleColor
  const cortex = cortexByModule[lecon.module]

  const handleChoice = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === lecon.quiz[qIdx].correct) setScore((s) => s + 1)
  }

  const nextQuestion = () => {
    if (qIdx < lecon.quiz.length - 1) {
      setQIdx((q) => q + 1)
      setSelected(null)
    } else {
      setFinished(true)
      // Persist XP
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

  return (
    <div style={{ background: '#0F172A', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Scroll progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 50, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ height: '100%', width: `${scrollPct * 100}%`, background: color, transition: 'width 0.1s' }} />
      </div>

      {/* Header */}
      <div style={{ background: color, padding: '48px 20px 20px', flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ flex: 1 }}>
          <button onClick={() => navigate('/cours')} style={s.back}>‹ Retour</button>
          <span style={s.badge}>{lecon.moduleLabel}</span>
          <h1 style={s.hTitle}>{lecon.titre}</h1>
          <span style={s.hDuree}>{lecon.duree}</span>
        </div>
        <img src={cortex} alt="Cortex" style={{ width: 60, height: 60, objectFit: 'contain', flexShrink: 0, marginTop: 24 }} draggable={false} />
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 60px' }}>
        {/* Sections */}
        {lecon.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            {sec.type === 'text' && (
              <>
                {sec.titre && <h4 style={s.secLabel}>{sec.titre}</h4>}
                <p style={s.secText}>{sec.contenu}</p>
              </>
            )}
            {sec.type === 'cortex' && (
              <div style={s.cortexCard}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <img src={cortexPassionne} alt="Cortex" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} draggable={false} />
                  <p style={s.cortexText}>{sec.contenu}</p>
                </div>
              </div>
            )}
            {sec.type === 'verbatim' && (
              <div style={s.verbatimCard}>
                <span style={{ fontSize: 24, lineHeight: 1 }}>"</span>
                <p style={s.verbatimText}>{sec.contenu}</p>
              </div>
            )}
            {sec.type === 'actions' && (
              <>
                {sec.titre && <h4 style={s.secLabel}>{sec.titre}</h4>}
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {sec.items.map((item, j) => (
                    <li key={j} style={s.actionItem}>
                      <span style={{ ...s.actionNum, background: color }}>{j + 1}</span>
                      <p style={s.secText}>{item}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {sec.type === 'memo' && (
              <div style={s.memoCard}>
                <h4 style={{ ...s.secLabel, marginBottom: 10 }}>Mémo rapide</h4>
                {sec.items.map((item, j) => (
                  <div key={j} style={s.memoItem}>
                    <span style={{ color: '#0D9373' }}>✓</span>
                    <span style={{ color: '#E2E8F0', fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Quiz section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, marginTop: 12 }}>
          {!quizStarted && !finished && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={s.quizTitle}>Quiz rapide</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 20 }}>3 questions · +{lecon.xp} XP</p>
              <button onClick={() => setQuizStarted(true)} style={{ ...s.btn, background: color }}>Commencer le quiz</button>
            </div>
          )}

          {quizStarted && !finished && (
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 6 }}>Question {qIdx + 1}/3</p>
              <h3 style={s.quizQ}>{lecon.quiz[qIdx].question}</h3>
              {lecon.quiz[qIdx].choices.map((c, i) => {
                const answered = selected !== null
                const isCorrect = i === lecon.quiz[qIdx].correct
                const isSelected = i === selected
                let bg = 'rgba(255,255,255,0.08)'
                let border = 'rgba(255,255,255,0.15)'
                if (answered && isCorrect) { bg = 'rgba(13,147,115,0.2)'; border = '#0D9373' }
                else if (answered && isSelected && !isCorrect) { bg = 'rgba(212,83,126,0.2)'; border = '#D4537E' }
                return (
                  <button key={i} onClick={() => handleChoice(i)} style={{ ...s.choiceBtn, background: bg, borderColor: border }}>
                    {answered && isCorrect && '✓ '}{answered && isSelected && !isCorrect && '✗ '}{c}
                  </button>
                )
              })}
              {selected !== null && (
                <div style={s.explWrap}>
                  <p style={s.expl}>{lecon.quiz[qIdx].explication}</p>
                  <button onClick={nextQuestion} style={{ ...s.btn, background: color, marginTop: 14 }}>
                    {qIdx < lecon.quiz.length - 1 ? 'Question suivante' : 'Voir résultat'}
                  </button>
                </div>
              )}
            </div>
          )}

          {finished && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={s.quizTitle}>{score === 3 ? 'Parfait !' : score >= 2 ? 'Bien joué !' : 'Continue !'}</h2>
              <p style={{ color: '#E2E8F0', fontSize: 48, fontWeight: 800, margin: '12px 0' }}>{score}/3</p>
              <p style={{ color: '#FFE17B', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>+{lecon.xp} XP ⚡</p>
              {nextLecon ? (
                <button onClick={() => navigate(`/cours/lecon/${nextLecon.id}`)} style={{ ...s.btn, background: color }}>
                  Leçon suivante →
                </button>
              ) : (
                <button onClick={() => navigate('/cours')} style={{ ...s.btn, background: color }}>
                  Retour aux leçons
                </button>
              )}
              <button onClick={() => navigate('/cours')} style={{ ...s.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', marginTop: 10 }}>
                Retour au programme
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  back: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 10, fontFamily: 'Inter, sans-serif' },
  badge: { display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '3px 10px', fontSize: 10, fontWeight: 600, color: '#fff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  hTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', lineHeight: 1.25 },
  hDuree: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' },

  secLabel: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A8DED1', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, fontWeight: 600 },
  secText: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#E2E8F0', lineHeight: 1.65, margin: 0 },

  cortexCard: { background: 'rgba(255,107,74,0.12)', borderLeft: '3px solid #FF6B4A', borderRadius: 12, padding: 16 },
  cortexText: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFB89A', fontStyle: 'italic', lineHeight: 1.6, margin: 0 },

  verbatimCard: { background: 'rgba(168,222,209,0.10)', borderLeft: '3px solid #A8DED1', borderRadius: 12, padding: 16, display: 'flex', gap: 6, alignItems: 'flex-start', color: '#A8DED1' },
  verbatimText: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8DED1', fontStyle: 'italic', lineHeight: 1.6, margin: 0 },

  actionItem: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 },
  actionNum: { width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 },

  memoCard: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 },
  memoItem: { display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 },

  quizTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px' },
  quizQ: { fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.4 },
  choiceBtn: { display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 12, border: '1.5px solid', fontSize: 14, color: '#E2E8F0', fontFamily: 'Inter, sans-serif', marginBottom: 8, cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' },
  explWrap: { background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 16, marginTop: 12 },
  expl: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8DED1', lineHeight: 1.5, margin: 0 },
  btn: { display: 'inline-block', padding: '14px 28px', borderRadius: 999, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', border: 'none', cursor: 'pointer', transition: 'transform 0.15s' },
}
