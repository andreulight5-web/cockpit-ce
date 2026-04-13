import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playSound } from '../../lib/audio'

// === Asset imports — ASCII names only (Linux NFC/NFD safe) ===
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreSurexcite from '../../assets/characters/monstre~/monstre-surexcite.webp'
import monstreChuchote from '../../assets/characters/monstre~/monstre-chuchote.webp'
import monstreMalicieux from '../../assets/characters/monstre~/Malicieux.webp'
import monstreTriste from '../../assets/characters/monstre~/monstre-triste.webp'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'

import mamanComplice from '../../assets/characters/maman/maman-complice.webp'
import mamanInquiete from '../../assets/characters/maman/maman-inquiete.webp'
import mamanMain from '../../assets/characters/maman/maman-main-tendue.webp'

import papaEncourageant from '../../assets/characters/papa/encourageant.webp'

const STORAGE_KEY = 'cockpit_onboarding'
const TRANSITION_MS = 400
const TOTAL_STEPS = 6

const BG = ['#0F172A', '#0F172A', '#0D9373', '#F2B8C6', '#0F172A', '#FFE17B']

/* ==============================================================
   MAIN
   ============================================================== */
export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState('in')

  const [type, setType] = useState(null)
  const [prenomEnfant, setPrenomEnfant] = useState('')
  const [age, setAge] = useState(8)
  const [prenomParent, setPrenomParent] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw && JSON.parse(raw)?.onboardingDone) {
        navigate('/login?mode=signup', { replace: true })
      }
    } catch { /* ignore */ }
  }, [navigate])

  const goTo = (target) => {
    if (phase === 'out') return
    playSound('pop')
    setPhase('out')
    setTimeout(() => { setStep(target); setPhase('in') }, TRANSITION_MS)
  }
  const next = () => goTo(step + 1)

  const finish = () => {
    const payload = { type, prenomEnfant: prenomEnfant.trim(), age, prenomParent: prenomParent.trim(), onboardingDone: true }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch { /* ignore */ }
    navigate('/login?mode=signup', { replace: true })
  }

  const screenClass = phase === 'out' ? 'screen-out' : 'screen-in'
  const progress = ((step + 1) / TOTAL_STEPS) * 100
  const nextBg = BG[Math.min(step + 1, TOTAL_STEPS - 1)]

  return (
    <div style={styles.root}>
      <style>{css}</style>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress}%`, background: nextBg === '#0F172A' ? '#FFE17B' : nextBg }} />
      </div>
      <div key={step} className={screenClass} style={styles.screen}>
        {step === 0 && <Screen1Intro onNext={next} />}
        {step === 1 && <Screen2Histoire onNext={next} />}
        {step === 2 && <Screen3Choose type={type} setType={setType} onNext={next} />}
        {step === 3 && <Screen4Enfant prenomEnfant={prenomEnfant} setPrenomEnfant={setPrenomEnfant} age={age} setAge={setAge} onNext={next} />}
        {step === 4 && <Screen5Parent prenomParent={prenomParent} setPrenomParent={setPrenomParent} onNext={next} />}
        {step === 5 && <Screen6Final prenomParent={prenomParent} prenomEnfant={prenomEnfant} onFinish={finish} />}
      </div>
    </div>
  )
}

/* ==============================================================
   BubbleBackground — colorful random floating bubbles
   ============================================================== */
const BUBBLE_PALETTE = ['#FFE17B', '#A8DED1', '#F2B8C6', '#FF6B4A', '#FFFFFF', '#0D9373']

function randPct() { return Math.random() * 100 }

function BubbleBackground() {
  const idRef = useRef(null)
  if (!idRef.current) idRef.current = `bb-${Math.random().toString(36).slice(2, 8)}`
  const id = idRef.current

  const [bubbles] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => {
      // 4 random waypoints (x%, y%) for a unique trajectory
      const wp = Array.from({ length: 4 }).map(() => [randPct(), randPct()])
      return {
        name: `${id}-${i}`,
        size: 20 + Math.random() * 80,
        color: BUBBLE_PALETTE[Math.floor(Math.random() * BUBBLE_PALETTE.length)],
        opacity: 0.04 + Math.random() * 0.06,
        duration: 12 + Math.random() * 13,
        delay: Math.random() * 15,
        startX: randPct(),
        startY: randPct(),
        wp,
      }
    })
  )

  // Inject unique keyframes for each bubble on mount
  useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-bubbles', id)
    const rules = bubbles.map((b) => {
      const [w0, w1, w2, w3] = b.wp
      return `@keyframes ${b.name} {
  0%   { transform: translate(0,0) scale(1) }
  25%  { transform: translate(${(w0[0] - b.startX).toFixed(1)}vw, ${(w0[1] - b.startY).toFixed(1)}vh) scale(1.12) }
  50%  { transform: translate(${(w1[0] - b.startX).toFixed(1)}vw, ${(w1[1] - b.startY).toFixed(1)}vh) scale(1) }
  75%  { transform: translate(${(w2[0] - b.startX).toFixed(1)}vw, ${(w2[1] - b.startY).toFixed(1)}vh) scale(1.15) }
  100% { transform: translate(${(w3[0] - b.startX).toFixed(1)}vw, ${(w3[1] - b.startY).toFixed(1)}vh) scale(1) }
}`
    })
    styleEl.textContent = rules.join('\n')
    document.head.appendChild(styleEl)
    return () => { document.head.removeChild(styleEl) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={styles.bubbleLayer}>
      {bubbles.map((b) => (
        <div
          key={b.name}
          style={{
            position: 'absolute',
            left: `${b.startX}%`,
            top: `${b.startY}%`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: b.color,
            opacity: b.opacity,
            pointerEvents: 'none',
            animation: `${b.name} ${b.duration}s ${b.delay}s ease-in-out infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

/* ==============================================================
   SCREEN 1 — "Le Monstre apparaît"
   ============================================================== */
function Screen1Intro({ onNext }) {
  const phrases = [
    { text: 'Psst... t\'es là ?', img: monstreCalin },
    { text: 'Je m\'appelle Le Monstre ⚡', img: monstreChuchote },
    { text: 'Je suis le TDAH de ton enfant.', img: monstreMalicieux },
  ]
  const [idx, setIdx] = useState(0)
  const [hopKey, setHopKey] = useState(0)

  useEffect(() => {
    if (idx >= phrases.length - 1) return
    const duration = phrases[idx].text.length * 60 + 1500
    const t = setTimeout(() => { playSound('pop', { volume: 0.4 }); setIdx((i) => i + 1) }, duration)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const showButton = idx === phrases.length - 1
  const phrase = phrases[idx]
  const handleMonstreTap = () => { playSound('tap'); setHopKey((k) => k + 1) }

  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'flex-end', paddingBottom: 100 }}>
      <BubbleBackground />
      <div style={{ ...styles.bubbleWrap, zIndex: 1 }}>
        <div key={idx} className="bubble-pop" style={styles.bubble}>
          <Typewriter text={phrase.text} />
          <div style={styles.bubbleTail} />
        </div>
      </div>
      <div className="enter-from-bottom" style={{ marginTop: 16, display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1 }}>
        <img
          key={`monstre-${idx}-${hopKey}`}
          src={phrase.img}
          alt="Le Monstre"
          onClick={handleMonstreTap}
          className="bounce-loop hop-on-tap"
          style={{ height: 280, maxWidth: '80%', objectFit: 'contain', cursor: 'pointer', userSelect: 'none' }}
          draggable={false}
        />
      </div>
      <div style={{ height: 32, zIndex: 1 }} />
      {showButton ? (
        <button onClick={onNext} className="fade-in btn-pulse" style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF', zIndex: 1 }}>
          Je t'écoute →
        </button>
      ) : (
        <div style={{ height: 56 }} />
      )}
    </section>
  )
}

/* ==============================================================
   SCREEN 2 — "L'histoire" (3 micro-scènes)
   ============================================================== */
function Screen2Histoire({ onNext }) {
  const [scene, setScene] = useState(0)
  const advance = () => { if (scene < 2) { playSound('pop', { volume: 0.4 }); setScene((s) => s + 1) } }

  const renderScene = () => {
    if (scene === 0) return <SceneCard key="A" characters={[{ src: monstreTriste, alt: 'Monstre triste' }]} bubble="Moi aussi j'ai du mal... je sais pas me contrôler." />
    if (scene === 1) return <SceneCard key="B" characters={[{ src: mamanInquiete, alt: 'Maman inquiète' }]} bubble="Ta maman ne sait plus quoi faire." />
    return <SceneCard key="C" characters={[{ src: monstreCalin, alt: 'Monstre câlin' }, { src: mamanComplice, alt: 'Maman complice' }]} bubble="Mais ensemble... on peut y arriver !" confetti />
  }

  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'center', cursor: 'pointer' }} onClick={scene < 2 ? advance : undefined}>
      <BubbleBackground />
      <div style={{ zIndex: 1 }}>{renderScene()}</div>
      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        {scene < 2 ? (
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic' }}>Tape pour continuer</p>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onNext() }} className="fade-in btn-pulse" style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF', maxWidth: 280 }}>
            On commence ?
          </button>
        )}
      </div>
    </section>
  )
}

function SceneCard({ characters, bubble, confetti }) {
  return (
    <div className="fade-in-slow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={styles.bubble}>
        <Typewriter text={bubble} />
        <div style={styles.bubbleTail} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
        {characters.map((c, i) => (
          <img key={i} src={c.src} alt={c.alt} className="enter-from-bottom" style={{ height: 260, maxWidth: characters.length > 1 ? '42vw' : '65vw', objectFit: 'contain', animationDelay: `${i * 0.15}s` }} draggable={false} />
        ))}
      </div>
      {confetti && <LightConfetti />}
    </div>
  )
}

function LightConfetti() {
  const [items] = useState(() =>
    Array.from({ length: 14 }).map(() => ({
      emoji: ['🎉', '⭐', '✨'][Math.floor(Math.random() * 3)],
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2 + Math.random() * 1.2,
    }))
  )
  return (
    <div style={styles.confettiLayer}>
      {items.map((c, i) => (
        <span key={i} className="confetti" style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s`, fontSize: 18 }}>{c.emoji}</span>
      ))}
    </div>
  )
}

/* ==============================================================
   SCREEN 3 — "C'est toi qui décides !" (role selection)
   ============================================================== */
function Screen3Choose({ type, setType, onNext }) {
  const handleSelect = (kind) => { playSound('tap'); setType(kind) }
  return (
    <section style={{ ...styles.section, background: '#0D9373' }}>
      <BubbleBackground />
      <div style={{ textAlign: 'center', zIndex: 1, marginBottom: 8 }}>
        <h2 className="enter-from-top" style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, margin: '0 0 6px' }}>
          C'est toi qui décides !
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: 14, margin: 0 }}>
          Je suis le TDAH de...
        </p>
      </div>

      {/* Two role cards */}
      <div style={{ display: 'flex', gap: 14, width: '100%', justifyContent: 'center', zIndex: 1, flex: 1, alignItems: 'center' }}>
        <RoleCard img={mamanComplice} label="Maman" selected={type === 'maman'} onSelect={() => handleSelect('maman')} enterClass="enter-left" />
        <RoleCard img={papaEncourageant} label="Papa" selected={type === 'papa'} onSelect={() => handleSelect('papa')} enterClass="enter-right" />
      </div>

      {/* Monstre chuchote between cards */}
      <div style={{ position: 'absolute', bottom: '38%', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
        <div style={{ ...styles.bubble, fontSize: 13, padding: '8px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          Choisis !
          <div style={styles.bubbleTail} />
        </div>
        <img src={monstreChuchote} alt="Monstre" style={{ height: 80, objectFit: 'contain', marginTop: 6 }} draggable={false} />
      </div>

      {type && (
        <button onClick={onNext} className="fade-in btn-pulse" style={{ ...styles.btnBase, background: '#0A6B54', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.25)', zIndex: 1 }}>
          C'est moi !
        </button>
      )}
    </section>
  )
}

function RoleCard({ img, label, selected, onSelect, enterClass }) {
  return (
    <button
      onClick={onSelect}
      className={enterClass}
      style={{
        width: '48%',
        maxWidth: 180,
        padding: 16,
        borderRadius: 20,
        border: selected ? '3px solid #FFE17B' : '2px solid rgba(255,255,255,0.3)',
        background: selected ? 'rgba(255,225,123,0.12)' : 'rgba(255,255,255,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.25s, border 0.2s, background 0.2s',
        boxShadow: selected ? '0 8px 24px rgba(255,225,123,0.25)' : 'none',
      }}
    >
      <img src={img} alt={label} style={{ height: 180, objectFit: 'contain', borderRadius: 14 }} draggable={false} />
      <span style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700 }}>{label}</span>
    </button>
  )
}

/* ==============================================================
   SCREEN 4 — Ton enfant (prénom + âge) — no maman image
   ============================================================== */
function Screen4Enfant({ prenomEnfant, setPrenomEnfant, age, setAge, onNext }) {
  const [bouncing, setBouncing] = useState(false)
  const bounceTimer = useRef(null)
  const handleAgeChange = (v) => {
    setAge(v); setBouncing(true)
    if (bounceTimer.current) clearTimeout(bounceTimer.current)
    bounceTimer.current = setTimeout(() => setBouncing(false), 300)
  }
  useEffect(() => () => bounceTimer.current && clearTimeout(bounceTimer.current), [])

  const monstreByAge = age <= 6 ? monstreCalin : age <= 10 ? monstreRigole : monstreSurexcite
  const canAdvance = prenomEnfant.trim().length > 0

  return (
    <section style={{ ...styles.section, background: '#F2B8C6', justifyContent: 'flex-start', paddingTop: 48 }}>
      <BubbleBackground />
      <div style={{ ...styles.bubble, alignSelf: 'center', zIndex: 1 }}>
        <Typewriter text="Et ton petit monstre, il s'appelle ?" />
        <div style={styles.bubbleTail} />
      </div>

      <input
        type="text"
        value={prenomEnfant}
        onChange={(e) => setPrenomEnfant(e.target.value)}
        placeholder="Lucas, Emma..."
        className="glow-input glow-input-pink"
        style={{ ...styles.nameInputDark, zIndex: 1 }}
      />

      <div style={{ marginTop: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 1 }}>
        <img
          key={`age-${age <= 6 ? 'a' : age <= 10 ? 'b' : 'c'}`}
          src={monstreByAge}
          alt="Monstre"
          className="fade-in"
          style={{ height: 200, objectFit: 'contain' }}
          draggable={false}
        />
        <div className={bouncing ? 'bounce-value' : ''} style={{ color: '#4B1528', fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 800, display: 'inline-block' }}>
          {age} <span style={{ fontSize: 14, fontWeight: 500 }}>ans</span>
        </div>
        <input type="range" min={4} max={15} value={age} onChange={(e) => handleAgeChange(Number(e.target.value))} className="age-slider" style={{ width: '70%' }} />
      </div>

      <div style={{ flex: 1 }} />
      {canAdvance && (
        <button onClick={onNext} className="fade-in btn-pulse" style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF', zIndex: 1 }}>
          Suivant →
        </button>
      )}
    </section>
  )
}

/* ==============================================================
   SCREEN 5 — Et toi ? (prénom parent)
   ============================================================== */
function Screen5Parent({ prenomParent, setPrenomParent, onNext }) {
  const canAdvance = prenomParent.trim().length > 0
  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'flex-start', paddingTop: 56 }}>
      <BubbleBackground />
      <div style={{ ...styles.bubble, marginBottom: 16, alignSelf: 'center', zIndex: 1 }}>
        <Typewriter text="Et toi, comment tu t'appelles ?" />
        <div style={styles.bubbleTail} />
      </div>
      <img src={mamanMain} alt="Maman qui tend la main" className="sway" style={{ height: 280, objectFit: 'contain', alignSelf: 'center', zIndex: 1 }} draggable={false} />
      <p style={{ color: '#A8DED1', fontFamily: 'Inter, sans-serif', fontSize: 14, textAlign: 'center', margin: '20px 0 24px', zIndex: 1 }}>
        Pour qu'on s'adresse à toi comme il faut
      </p>
      <div style={{ position: 'relative', width: '80%', margin: '0 auto', zIndex: 1 }}>
        <input type="text" value={prenomParent} onChange={(e) => setPrenomParent(e.target.value)} placeholder="Marie, Sophie..." className="glow-input glow-input-navy" style={styles.nameInputLight} />
        {!prenomParent && <span className="blink-cursor">|</span>}
      </div>
      <div style={{ flex: 1 }} />
      {canAdvance && (
        <button onClick={onNext} className="fade-in btn-pulse" style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF', zIndex: 1 }}>
          C'est parti →
        </button>
      )}
    </section>
  )
}

/* ==============================================================
   SCREEN 6 — Explosion finale
   ============================================================== */
function Screen6Final({ prenomParent, prenomEnfant, onFinish }) {
  const [confetti] = useState(() => {
    const emojis = ['🎉', '⚡', '⭐', '🧡']
    return Array.from({ length: 30 }).map((_, i) => ({
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.2 + Math.random() * 1.6,
      size: 18 + Math.random() * 14,
    }))
  })
  useEffect(() => { playSound('success', { volume: 0.6 }) }, [])

  return (
    <section style={{ ...styles.section, background: '#FFE17B', position: 'relative', overflow: 'hidden' }}>
      <BubbleBackground />
      <div style={styles.confettiLayer}>
        {confetti.map((c, i) => (
          <span key={i} className="confetti" style={{ left: `${c.left}%`, fontSize: c.size, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s` }}>{c.emoji}</span>
        ))}
      </div>
      <div style={{ ...styles.imageWrap, zIndex: 1 }}>
        <img src={monstreSurexcite} alt="Le Monstre surexcité" className="spin-once bounce-fast" style={{ height: 300, maxWidth: '85%', objectFit: 'contain' }} draggable={false} />
      </div>
      <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: 24, zIndex: 1 }}>
        <h1 style={{ color: '#412402', fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>
          C'est parti{prenomParent ? ` ${prenomParent}` : ''} !
        </h1>
        <p style={{ color: '#633806', fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.5, margin: '0 0 6px' }}>
          Ton Cockpit est prêt ⚡
        </p>
        {prenomEnfant && (
          <p style={{ color: '#633806', fontFamily: 'Inter, sans-serif', fontSize: 14, fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
            {prenomEnfant} et toi, vous n'êtes plus seuls.
          </p>
        )}
      </div>
      <button onClick={onFinish} className="shimmer-btn" style={{ ...styles.btnBase, color: '#FFFFFF', zIndex: 1 }}>
        Entrer dans mon Cockpit
      </button>
    </section>
  )
}

/* ==============================================================
   Helpers
   ============================================================== */
function Typewriter({ text, delay = 0 }) {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <span key={i} className="tw-char" style={{ animationDelay: `${delay + i * 35}ms` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

/* ==============================================================
   Styles
   ============================================================== */
const styles = {
  root: { position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#0F172A' },
  progressTrack: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.12)', zIndex: 50 },
  progressFill: { height: '100%', transition: 'width 0.4s ease, background 0.4s ease' },
  screen: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  section: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '48px 24px 96px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' },
  imageWrap: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' },
  bubbleWrap: { width: '100%', display: 'flex', justifyContent: 'center' },
  bubble: { background: 'rgba(255,255,255,0.92)', color: '#0F172A', borderRadius: 20, padding: '14px 20px', width: 'auto', minWidth: 180, maxWidth: '82%', fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.25)', position: 'relative', textAlign: 'center', lineHeight: 1.5, wordBreak: 'normal', overflowWrap: 'normal', whiteSpace: 'normal', hyphens: 'none', lineBreak: 'auto' },
  bubbleTail: { position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid rgba(255,255,255,0.92)' },
  btnBase: { border: 'none', borderRadius: 999, padding: '16px 32px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%', maxWidth: 320, transition: 'transform 0.15s, opacity 0.15s' },
  nameInputDark: { width: '80%', margin: '24px auto 0', background: 'transparent', border: 'none', borderBottom: '2px solid #4B1528', padding: '12px 4px', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#4B1528', textAlign: 'center', outline: 'none', display: 'block', transition: 'box-shadow 0.25s, border-color 0.25s' },
  nameInputLight: { width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #FFFFFF', padding: '12px 4px', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#FFFFFF', textAlign: 'center', outline: 'none', display: 'block', transition: 'box-shadow 0.25s, border-color 0.25s' },
  confettiLayer: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 },
  bubbleLayer: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' },
}

/* ==============================================================
   CSS keyframes
   ============================================================== */
const css = `
/* Screen transitions */
@keyframes screenOut { from { transform: translateX(0); opacity: 1 } to { transform: translateX(-30%); opacity: 0 } }
@keyframes screenIn  { from { transform: translateX(30%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
.screen-out { animation: screenOut 0.4s ease forwards }
.screen-in  { animation: screenIn 0.4s ease forwards }

/* Element entries */
@keyframes enterBottom { from { transform: translateY(80px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes enterTop    { from { transform: translateY(-60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes enterLeft   { from { transform: translateX(-60px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes enterRight  { from { transform: translateX(60px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
.enter-from-bottom { animation: enterBottom 0.8s ease-out both }
.enter-from-top    { animation: enterTop 0.5s ease-out both }
.enter-left        { animation: enterLeft 0.5s ease-out both }
.enter-right       { animation: enterRight 0.5s ease-out both }

/* Bubble pop */
@keyframes bubblePop { from { transform: scale(0.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }
.bubble-pop { animation: bubblePop 0.25s ease-out }

/* Bounce loops */
@keyframes bounceLoop { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes bounceFast { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
.bounce-loop { animation: bounceLoop 1.8s ease-in-out infinite }
.bounce-fast { animation: bounceFast 0.4s ease-in-out infinite }
.enter-from-bottom.bounce-loop { animation: enterBottom 0.8s ease-out, bounceLoop 1.8s ease-in-out 0.8s infinite }

/* Hop on tap */
@keyframes hopOnTap { 0% { transform: scale(1) } 40% { transform: scale(1.2) } 100% { transform: scale(1) } }
.hop-on-tap { animation: hopOnTap 0.3s ease-out, bounceLoop 1.8s ease-in-out 0.3s infinite }

/* Spin once */
@keyframes spinOnce { from { transform: rotate(0) } to { transform: rotate(360deg) } }
.spin-once { animation: spinOnce 0.6s ease-out }
.spin-once.bounce-loop { animation: spinOnce 0.6s ease-out, bounceLoop 1.8s ease-in-out 0.6s infinite }
.spin-once.bounce-fast { animation: spinOnce 0.6s ease-out, bounceFast 0.4s ease-in-out 0.6s infinite }

/* Sway */
@keyframes sway { 0%,100% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } }
.sway { animation: sway 3s ease-in-out infinite }

/* Pulse button */
@keyframes btnPulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }
.btn-pulse { animation: btnPulse 2s ease-in-out infinite }
.btn-pulse:active { transform: scale(0.96) }

/* Typewriter */
@keyframes twChar { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
.tw-char { display: inline-block; opacity: 0; animation: twChar 0.22s ease-out forwards }

/* Glow inputs */
.glow-input-pink:focus { box-shadow: 0 6px 20px -6px rgba(168,222,209,0.7); border-color: #0D9373 !important }
.glow-input-navy:focus { box-shadow: 0 6px 20px -6px rgba(168,222,209,0.6); border-color: #A8DED1 !important }

/* Bounce value */
@keyframes bounceValue { 0%,100% { transform: scale(1) } 50% { transform: scale(1.18) } }
.bounce-value { animation: bounceValue 0.3s ease-out }

/* Age slider */
.age-slider { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; background: rgba(75,21,40,0.25); outline: none }
.age-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #4B1528; border: 3px solid #fff; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.25) }
.age-slider::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #4B1528; border: 3px solid #fff; cursor: pointer }

/* Blinking cursor */
@keyframes blink { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }
.blink-cursor { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); font-size: 28px; color: #fff; pointer-events: none; animation: blink 1s steps(1) infinite }

/* Shimmer button */
@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
.shimmer-btn { background: linear-gradient(100deg, #0F172A 0%, #0F172A 38%, #1E3050 50%, #0F172A 62%, #0F172A 100%); background-size: 200% 100%; animation: shimmer 2.5s linear infinite }

/* Confetti fall */
@keyframes confettiFall { 0% { transform: translateY(-20vh) rotate(0); opacity: 1 } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0 } }
.confetti { position: absolute; top: 0; font-size: 22px; animation: confettiFall linear forwards }

/* Fade in */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
.fade-in { animation: fadeIn 0.4s ease-out both }
@keyframes fadeInSlow { from { opacity: 0 } to { opacity: 1 } }
.fade-in-slow { animation: fadeInSlow 0.6s ease-out both }

`
