import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playSound } from '../../lib/audio'

// === Asset imports — ASCII names only (Linux NFC/NFD safe) ===
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreSurexcite from '../../assets/characters/monstre~/monstre-surexcite.webp'
import monstreChuchote from '../../assets/characters/monstre~/monstre-chuchote.webp'
import monstreMalicieux from '../../assets/characters/monstre~/Malicieux.webp'
import monstreTriste from '../../assets/characters/monstre~/monstre-triste.webp'
import monstreCache from '../../assets/characters/monstre~/monstre-cache.webp'
import monstreDecouvert from '../../assets/characters/monstre~/monstre-decouvert.webp'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'

import mamanFiere from '../../assets/characters/maman/maman-fiere.webp'
import mamanComplice from '../../assets/characters/maman/maman-complice.webp'
import mamanInquiete from '../../assets/characters/maman/maman-inquiete.webp'
import mamanMain from '../../assets/characters/maman/maman-main-tendue.webp'

import papaEncourageant from '../../assets/characters/papa/encourageant.webp'

const STORAGE_KEY = 'cockpit_onboarding'
const TRANSITION_MS = 400
const TOTAL_STEPS = 6

// Background colors per screen (used by progress bar to colorize current step)
const BG = ['#0F172A', '#0F172A', '#0D9373', '#F2B8C6', '#0F172A', '#FFE17B']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState('in') // 'in' | 'out'

  const [type, setType] = useState(null)
  const [prenomEnfant, setPrenomEnfant] = useState('')
  const [age, setAge] = useState(8)
  const [prenomParent, setPrenomParent] = useState('')

  // Skip if already done
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw && JSON.parse(raw)?.onboardingDone) {
        navigate('/login?mode=signup', { replace: true })
      }
    } catch {
      // ignore
    }
  }, [navigate])

  const goTo = (target) => {
    if (phase === 'out') return
    playSound('pop')
    setPhase('out')
    setTimeout(() => {
      setStep(target)
      setPhase('in')
    }, TRANSITION_MS)
  }

  const next = () => goTo(step + 1)

  const finish = () => {
    const payload = {
      type,
      prenomEnfant: prenomEnfant.trim(),
      age,
      prenomParent: prenomParent.trim(),
      onboardingDone: true,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    navigate('/login?mode=signup', { replace: true })
  }

  const screenClass = phase === 'out' ? 'screen-out' : 'screen-in'
  const progress = ((step + 1) / TOTAL_STEPS) * 100
  const nextBg = BG[Math.min(step + 1, TOTAL_STEPS - 1)]

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Top progress bar */}
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
            background: nextBg === '#0F172A' ? '#FFE17B' : nextBg,
          }}
        />
      </div>

      <div key={step} className={screenClass} style={styles.screen}>
        {step === 0 && <Screen1Intro onNext={next} />}
        {step === 1 && <Screen2Histoire onNext={next} />}
        {step === 2 && <Screen3CacheCache type={type} setType={setType} onNext={next} />}
        {step === 3 && (
          <Screen4Enfant
            prenomEnfant={prenomEnfant}
            setPrenomEnfant={setPrenomEnfant}
            age={age}
            setAge={setAge}
            onNext={next}
          />
        )}
        {step === 4 && (
          <Screen5Parent
            prenomParent={prenomParent}
            setPrenomParent={setPrenomParent}
            onNext={next}
          />
        )}
        {step === 5 && <Screen6Final prenomParent={prenomParent} prenomEnfant={prenomEnfant} onFinish={finish} />}
      </div>
    </div>
  )
}

/* ============================================================
   SCREEN 1 — "Le Monstre apparaît"
   ============================================================ */
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
    // Estimate typewriter duration: 60ms per char + 800ms read pause
    const duration = phrases[idx].text.length * 60 + 1500
    const t = setTimeout(() => {
      playSound('pop', { volume: 0.4 })
      setIdx((i) => i + 1)
    }, duration)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const showButton = idx === phrases.length - 1
  const phrase = phrases[idx]

  const handleMonstreTap = () => {
    playSound('tap')
    setHopKey((k) => k + 1)
  }

  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'flex-end', paddingBottom: 100 }}>
      {/* Speech bubble */}
      <div style={styles.bubbleWrap}>
        <div key={idx} className="bubble-pop" style={styles.bubble}>
          <Typewriter text={phrase.text} />
          <div style={styles.bubbleTail} />
        </div>
      </div>

      {/* Monstre */}
      <div className="enter-from-bottom" style={{ marginTop: 16, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img
          key={`monstre-${idx}-${hopKey}`}
          src={phrase.img}
          alt="Le Monstre"
          onClick={handleMonstreTap}
          className="bounce-loop hop-on-tap"
          style={{
            maxHeight: '40vh',
            maxWidth: '70%',
            objectFit: 'contain',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          draggable={false}
        />
      </div>

      <div style={{ height: 32 }} />

      {showButton ? (
        <button
          onClick={onNext}
          className="fade-in btn-pulse"
          style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
        >
          Je t'écoute →
        </button>
      ) : (
        <div style={{ height: 56 }} />
      )}
    </section>
  )
}

/* ============================================================
   SCREEN 2 — "L'histoire" (3 micro-scènes)
   ============================================================ */
function Screen2Histoire({ onNext }) {
  const [scene, setScene] = useState(0) // 0=A, 1=B, 2=C

  const advance = () => {
    if (scene < 2) {
      playSound('pop', { volume: 0.4 })
      setScene((s) => s + 1)
    }
  }

  const renderScene = () => {
    if (scene === 0) {
      return (
        <SceneCard
          key="A"
          characters={[{ src: monstreTriste, alt: 'Monstre triste' }]}
          bubble="Moi aussi j'ai du mal... je sais pas me contrôler."
          bubbleSide="top"
        />
      )
    }
    if (scene === 1) {
      return (
        <SceneCard
          key="B"
          characters={[{ src: mamanInquiete, alt: 'Maman inquiète' }]}
          bubble="Ta maman ne sait plus quoi faire."
          bubbleSide="top"
        />
      )
    }
    return (
      <SceneCard
        key="C"
        characters={[
          { src: monstreCalin, alt: 'Monstre câlin' },
          { src: mamanComplice, alt: 'Maman complice' },
        ]}
        bubble="Mais ensemble... on peut y arriver, ensemble !"
        bubbleSide="top"
        confetti
      />
    )
  }

  return (
    <section
      style={{ ...styles.section, background: '#0F172A', justifyContent: 'center', cursor: 'pointer' }}
      onClick={scene < 2 ? advance : undefined}
    >
      {renderScene()}

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        {scene < 2 ? (
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic' }}>
            Tape pour continuer ✨
          </p>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="fade-in btn-pulse"
            style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF', maxWidth: 280 }}
          >
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
          <img
            key={i}
            src={c.src}
            alt={c.alt}
            className="enter-from-bottom"
            style={{
              maxHeight: '34vh',
              maxWidth: characters.length > 1 ? '40vw' : '60vw',
              objectFit: 'contain',
              animationDelay: `${i * 0.15}s`,
            }}
            draggable={false}
          />
        ))}
      </div>
      {confetti && <LightConfetti />}
    </div>
  )
}

function LightConfetti() {
  const [items] = useState(() =>
    Array.from({ length: 14 }).map(() => ({
      emoji: ['🎉', '⭐', '💛', '✨'][Math.floor(Math.random() * 4)],
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2 + Math.random() * 1.2,
    }))
  )
  return (
    <div style={styles.confettiLayer}>
      {items.map((c, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            fontSize: 18,
          }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  )
}

/* ============================================================
   SCREEN 3 — Mini-jeu cache-cache + sélection rôle
   ============================================================ */
function Screen3CacheCache({ type, setType, onNext }) {
  const [found, setFound] = useState(false)
  const [showCards, setShowCards] = useState(false)

  const handleMamanTap = () => {
    if (found) return
    playSound('tap')
    setFound(true)
    setTimeout(() => setShowCards(true), 800)
  }

  const handleCardSelect = (kind) => {
    playSound('pop')
    setType(kind)
  }

  return (
    <section style={{ ...styles.section, background: '#0D9373', justifyContent: 'flex-start', paddingTop: 56 }}>
      <h2
        className="enter-from-top"
        style={{
          color: '#FFFFFF',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        {found ? 'Trouvé ! 🎉' : 'Trouve Le Monstre !'}
      </h2>

      {/* Vertically centered content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 20 }}>
        {!found && (
          <div style={styles.parentRow}>
            <div style={styles.parentSlot} onClick={handleMamanTap}>
              <img
                src={monstreCache}
                alt="Monstre caché"
                className="peekaboo"
                style={styles.hiddenMonstre}
                draggable={false}
              />
              <img src={mamanComplice} alt="Maman" style={styles.parentImg} draggable={false} />
              <span style={styles.parentLabel}>Maman</span>
            </div>
            <div style={styles.parentSlot}>
              <img src={papaEncourageant} alt="Papa" style={styles.parentImg} draggable={false} />
              <span style={styles.parentLabel}>Papa</span>
            </div>
          </div>
        )}

        {found && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
            <div style={styles.bubble}>
              <Typewriter text="Tu m'as trouvé ! 😄 Et toi, t'es..." />
              <div style={styles.bubbleTail} />
            </div>
            <img
              src={monstreDecouvert}
              alt="Monstre découvert"
              className="spin-once bounce-loop"
              style={{ height: 220, maxWidth: '70%', objectFit: 'contain' }}
              draggable={false}
            />
            <LightConfetti />
          </div>
        )}

        {showCards && (
          <div className="fade-in" style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center' }}>
            <ChoiceCard
              kind="maman"
              label="👩 Maman"
              selected={type === 'maman'}
              onSelect={handleCardSelect}
            />
            <ChoiceCard
              kind="papa"
              label="👨 Papa"
              selected={type === 'papa'}
              onSelect={handleCardSelect}
            />
          </div>
        )}
      </div>

      {showCards && type && (
        <button
          onClick={onNext}
          className="fade-in btn-pulse"
          style={{ ...styles.btnBase, background: '#FFE17B', color: '#0F172A' }}
        >
          C'est moi !
        </button>
      )}
    </section>
  )
}

function ChoiceCard({ kind, label, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(kind)}
      style={{
        flex: 1,
        maxWidth: 130,
        padding: '14px 12px',
        borderRadius: 14,
        border: selected ? '2px solid #FFE17B' : '2px solid rgba(255,255,255,0.2)',
        background: selected ? 'rgba(255,225,123,0.15)' : 'rgba(255,255,255,0.08)',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.25s, border 0.2s, background 0.2s',
      }}
    >
      {label}
    </button>
  )
}

/* ============================================================
   SCREEN 4 — Ton enfant (prénom + âge)
   ============================================================ */
function Screen4Enfant({ prenomEnfant, setPrenomEnfant, age, setAge, onNext }) {
  const [bouncing, setBouncing] = useState(false)
  const bounceTimer = useRef(null)

  const handleAgeChange = (v) => {
    setAge(v)
    setBouncing(true)
    if (bounceTimer.current) clearTimeout(bounceTimer.current)
    bounceTimer.current = setTimeout(() => setBouncing(false), 300)
  }

  useEffect(() => () => bounceTimer.current && clearTimeout(bounceTimer.current), [])

  // Pick monstre by age range
  const monstreByAge =
    age <= 6 ? monstreCalin : age <= 10 ? monstreRigole : monstreSurexcite
  const monstreSize =
    age <= 6 ? '20vh' : age <= 10 ? '22vh' : '24vh'

  const canAdvance = prenomEnfant.trim().length > 0

  return (
    <section style={{ ...styles.section, background: '#F2B8C6', justifyContent: 'flex-start', paddingTop: 40 }}>
      <img
        src={mamanFiere}
        alt="Maman fière"
        className="enter-from-top"
        style={{ maxHeight: '20vh', objectFit: 'contain', alignSelf: 'center' }}
        draggable={false}
      />
      <div style={{ ...styles.bubble, marginTop: 16, alignSelf: 'center' }}>
        <Typewriter text="Et ton petit monstre, il s'appelle ?" />
        <div style={styles.bubbleTail} />
      </div>

      <input
        type="text"
        value={prenomEnfant}
        onChange={(e) => setPrenomEnfant(e.target.value)}
        placeholder="Lucas, Emma..."
        className="glow-input glow-input-pink"
        style={styles.nameInputDark}
      />

      <div style={{ marginTop: 28, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <img
          key={`age-${age <= 6 ? 'a' : age <= 10 ? 'b' : 'c'}`}
          src={monstreByAge}
          alt="Monstre"
          className="fade-in"
          style={{ height: monstreSize, objectFit: 'contain' }}
          draggable={false}
        />
        <div
          className={bouncing ? 'bounce-value' : ''}
          style={{ color: '#4B1528', fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 800, display: 'inline-block' }}
        >
          {age} <span style={{ fontSize: 14, fontWeight: 500 }}>ans</span>
        </div>
        <input
          type="range"
          min={4}
          max={15}
          value={age}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          className="age-slider"
          style={{ width: '70%' }}
        />
      </div>

      <div style={{ flex: 1 }} />
      {canAdvance && (
        <button
          onClick={onNext}
          className="fade-in btn-pulse"
          style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
        >
          Suivant →
        </button>
      )}
    </section>
  )
}

/* ============================================================
   SCREEN 5 — Et toi ? (prénom parent)
   ============================================================ */
function Screen5Parent({ prenomParent, setPrenomParent, onNext }) {
  const canAdvance = prenomParent.trim().length > 0
  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'flex-start', paddingTop: 56 }}>
      <div style={{ ...styles.bubble, marginBottom: 16, alignSelf: 'center' }}>
        <Typewriter text="Et toi, comment tu t'appelles ?" />
        <div style={styles.bubbleTail} />
      </div>
      <img
        src={mamanMain}
        alt="Maman qui tend la main"
        className="sway"
        style={{ maxHeight: '30vh', objectFit: 'contain', alignSelf: 'center' }}
        draggable={false}
      />
      <p style={{ color: '#A8DED1', fontFamily: 'Inter, sans-serif', fontSize: 14, textAlign: 'center', margin: '20px 0 24px' }}>
        Pour qu'on s'adresse à toi comme il faut 💛
      </p>
      <div style={{ position: 'relative', width: '80%', margin: '0 auto' }}>
        <input
          type="text"
          value={prenomParent}
          onChange={(e) => setPrenomParent(e.target.value)}
          placeholder="Marie, Sophie..."
          className="glow-input glow-input-navy"
          style={styles.nameInputLight}
        />
        {!prenomParent && <span className="blink-cursor">|</span>}
      </div>
      <div style={{ flex: 1 }} />
      {canAdvance && (
        <button
          onClick={onNext}
          className="fade-in btn-pulse"
          style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
        >
          C'est parti →
        </button>
      )}
    </section>
  )
}

/* ============================================================
   SCREEN 6 — Explosion finale
   ============================================================ */
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

  useEffect(() => {
    playSound('success', { volume: 0.6 })
  }, [])

  return (
    <section style={{ ...styles.section, background: '#FFE17B', position: 'relative', overflow: 'hidden' }}>
      <div style={styles.confettiLayer}>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${c.left}%`,
              fontSize: c.size,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          >
            {c.emoji}
          </span>
        ))}
      </div>

      <div style={styles.imageWrap}>
        <img
          src={monstreSurexcite}
          alt="Le Monstre surexcité"
          className="spin-once bounce-fast"
          style={{ maxHeight: '46vh', maxWidth: '80%', objectFit: 'contain' }}
          draggable={false}
        />
      </div>

      <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: 24 }}>
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

      <button
        onClick={onFinish}
        className="shimmer-btn"
        style={{ ...styles.btnBase, color: '#FFFFFF' }}
      >
        Entrer dans mon Cockpit
      </button>
    </section>
  )
}

/* ============================================================
   Helpers
   ============================================================ */
function Typewriter({ text, delay = 0 }) {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="tw-char"
          style={{ animationDelay: `${delay + i * 35}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

/* ============================================================
   Styles
   ============================================================ */
const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
  },
  progressTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'rgba(255,255,255,0.12)',
    zIndex: 50,
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.4s ease, background 0.4s ease',
  },
  screen: {
    width: '100%',
    height: '100%',
  },
  section: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 24px 96px',
    boxSizing: 'border-box',
    position: 'relative',
  },
  imageWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bubbleWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  bubble: {
    background: '#FFFFFF',
    color: '#0F172A',
    borderRadius: 20,
    padding: '14px 20px',
    maxWidth: '85%',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 15,
    fontWeight: 600,
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    position: 'relative',
    textAlign: 'center',
    lineHeight: 1.45,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid #FFFFFF',
  },
  btnBase: {
    border: 'none',
    borderRadius: 999,
    padding: '16px 32px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 320,
    transition: 'transform 0.15s, opacity 0.15s',
  },
  parentRow: {
    display: 'flex',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  parentSlot: {
    position: 'relative',
    flex: 1,
    maxWidth: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  parentImg: {
    width: 'auto',
    height: 220,
    objectFit: 'contain',
    borderRadius: 16,
  },
  hiddenMonstre: {
    position: 'absolute',
    top: -60,
    right: -30,
    width: 130,
    height: 'auto',
    pointerEvents: 'none',
    zIndex: 2,
  },
  parentLabel: {
    color: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    marginTop: 6,
  },
  nameInputDark: {
    width: '80%',
    margin: '24px auto 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #4B1528',
    padding: '12px 4px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 28,
    fontWeight: 600,
    color: '#4B1528',
    textAlign: 'center',
    outline: 'none',
    display: 'block',
    transition: 'box-shadow 0.25s, border-color 0.25s',
  },
  nameInputLight: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #FFFFFF',
    padding: '12px 4px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 28,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'center',
    outline: 'none',
    display: 'block',
    transition: 'box-shadow 0.25s, border-color 0.25s',
  },
  confettiLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
}

/* ============================================================
   CSS keyframes & utility classes
   ============================================================ */
const css = `
/* ===== Screen transitions ===== */
@keyframes screenOut {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(-30%); opacity: 0; }
}
@keyframes screenIn {
  from { transform: translateX(30%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.screen-out { animation: screenOut 0.4s ease forwards; }
.screen-in  { animation: screenIn 0.4s ease forwards; }

/* ===== Element entries ===== */
@keyframes enterBottom {
  from { transform: translateY(80px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes enterTop {
  from { transform: translateY(-60px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.enter-from-bottom { animation: enterBottom 0.8s ease-out both; }
.enter-from-top    { animation: enterTop 0.5s ease-out both; }

/* ===== Bubble pop ===== */
@keyframes bubblePop {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.bubble-pop { animation: bubblePop 0.25s ease-out; }

/* ===== Bounce loops ===== */
@keyframes bounceLoop {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes bounceFast {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
.bounce-loop { animation: bounceLoop 1.8s ease-in-out infinite; }
.bounce-fast { animation: bounceFast 0.4s ease-in-out infinite; }

/* Combine bottom entry + bounce loop */
.enter-from-bottom.bounce-loop {
  animation:
    enterBottom 0.8s ease-out,
    bounceLoop 1.8s ease-in-out 0.8s infinite;
}

/* ===== Hop on tap ===== */
@keyframes hopOnTap {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.hop-on-tap {
  animation: hopOnTap 0.3s ease-out, bounceLoop 1.8s ease-in-out 0.3s infinite;
}

/* ===== Peekaboo (monstre caché) ===== */
@keyframes peekaboo {
  0%, 80%, 100% { transform: translateX(0) rotate(0); }
  85%           { transform: translateX(-3px) rotate(-3deg); }
  90%           { transform: translateX(3px) rotate(3deg); }
  95%           { transform: translateX(-2px) rotate(-2deg); }
}
.peekaboo { animation: peekaboo 3.5s ease-in-out infinite; }

/* ===== Spin once ===== */
@keyframes spinOnce {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}
.spin-once {
  animation: spinOnce 0.6s ease-out;
}
.spin-once.bounce-loop {
  animation: spinOnce 0.6s ease-out, bounceLoop 1.8s ease-in-out 0.6s infinite;
}
.spin-once.bounce-fast {
  animation: spinOnce 0.6s ease-out, bounceFast 0.4s ease-in-out 0.6s infinite;
}

/* ===== Sway (Maman main tendue) ===== */
@keyframes sway {
  0%, 100% { transform: rotate(-3deg); }
  50%      { transform: rotate(3deg); }
}
.sway { animation: sway 3s ease-in-out infinite; }

/* ===== Pulse button ===== */
@keyframes btnPulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}
.btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
.btn-pulse:active { transform: scale(0.96); }

/* ===== Typewriter ===== */
@keyframes twChar {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tw-char {
  display: inline-block;
  opacity: 0;
  animation: twChar 0.22s ease-out forwards;
}

/* ===== Glow inputs ===== */
.glow-input-pink:focus {
  box-shadow: 0 6px 20px -6px rgba(168,222,209,0.7);
  border-color: #0D9373 !important;
}
.glow-input-navy:focus {
  box-shadow: 0 6px 20px -6px rgba(168,222,209,0.6);
  border-color: #A8DED1 !important;
}

/* ===== Bounce value (age) ===== */
@keyframes bounceValue {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.18); }
}
.bounce-value { animation: bounceValue 0.3s ease-out; }

/* ===== Age slider ===== */
.age-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 999px;
  background: rgba(75, 21, 40, 0.25);
  outline: none;
}
.age-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4B1528;
  border: 3px solid #FFFFFF;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}
.age-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4B1528;
  border: 3px solid #FFFFFF;
  cursor: pointer;
}

/* ===== Blinking cursor ===== */
@keyframes blink {
  0%, 50%   { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.blink-cursor {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  color: #FFFFFF;
  pointer-events: none;
  animation: blink 1s steps(1) infinite;
}

/* ===== Shimmer button ===== */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-btn {
  background: linear-gradient(
    100deg,
    #0F172A 0%,
    #0F172A 38%,
    #1E3050 50%,
    #0F172A 62%,
    #0F172A 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2.5s linear infinite;
}

/* ===== Confetti fall ===== */
@keyframes confettiFall {
  0%   { transform: translateY(-20vh) rotate(0); opacity: 1; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
.confetti {
  position: absolute;
  top: 0;
  font-size: 22px;
  animation: confettiFall linear forwards;
}

/* ===== Fade in ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.4s ease-out both; }

@keyframes fadeInSlow {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-in-slow { animation: fadeInSlow 0.6s ease-out both; }
`
