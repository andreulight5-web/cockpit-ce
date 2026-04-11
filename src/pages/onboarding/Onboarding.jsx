import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Asset imports — ASCII names only (NFC/NFD issue on Linux build).
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreSurexcite from '../../assets/characters/monstre~/monstre-surexcite.webp'
import mamanComplice from '../../assets/characters/maman/Complice : qui rigole.webp'
import mamanFiere from '../../assets/characters/maman/maman-fiere.webp'
import papaEncourageant from '../../assets/characters/papa/encourageant.webp'

const STORAGE_KEY = 'cockpit_onboarding'
const TRANSITION_MS = 350

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
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.onboardingDone) navigate('/login?mode=signup', { replace: true })
      }
    } catch {
      // ignore
    }
  }, [navigate])

  const goTo = (target) => {
    if (phase === 'out') return
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
      prenomParent: prenomParent.trim(),
      prenomEnfant: prenomEnfant.trim(),
      age,
      onboardingDone: true,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    navigate('/login?mode=signup', { replace: true })
  }

  const canAdvance = {
    0: true,
    1: !!type,
    2: prenomEnfant.trim().length > 0,
    3: prenomParent.trim().length > 0,
    4: true,
  }[step]

  const screenClass = phase === 'out' ? 'slide-out-left' : 'slide-in-right'

  return (
    <div style={styles.root}>
      <style>{css}</style>

      <div key={step} className={`screen ${screenClass}`} style={styles.screen}>
        {step === 0 && <Screen0 onNext={next} />}
        {step === 1 && <Screen1 type={type} setType={setType} canAdvance={canAdvance} onNext={next} />}
        {step === 2 && (
          <Screen2
            prenomEnfant={prenomEnfant}
            setPrenomEnfant={setPrenomEnfant}
            age={age}
            setAge={setAge}
            canAdvance={canAdvance}
            onNext={next}
          />
        )}
        {step === 3 && (
          <Screen3Bis
            prenomParent={prenomParent}
            setPrenomParent={setPrenomParent}
            canAdvance={canAdvance}
            onNext={next}
          />
        )}
        {step === 4 && <Screen4 prenomParent={prenomParent} onFinish={finish} />}
      </div>

      {/* Progress dots */}
      <div style={styles.dots}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === step ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ==================== SCREEN 0 — Navy intro ==================== */
function Screen0({ onNext }) {
  return (
    <section style={{ ...styles.section, background: '#0F172A' }}>
      <div style={styles.imageWrap}>
        <img
          src={monstreCalin}
          alt="Le Monstre câlin"
          className="enter-up bounce-loop"
          style={{ maxHeight: '60vh', maxWidth: '90%', objectFit: 'contain' }}
        />
      </div>
      <div style={styles.textWrap}>
        <Typewriter text="Bonjour 👋" delay={0} style={styles.kicker} />
        <Typewriter
          text="Je suis Le Monstre"
          delay={400}
          style={{ ...styles.title, color: '#FFFFFF' }}
        />
        <Typewriter
          text="Je vais t'aider à traverser les crises"
          delay={1100}
          style={{ ...styles.subtitle, color: '#A8DED1' }}
        />
      </div>
      <button
        onClick={onNext}
        className="btn-pulse"
        style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
      >
        Commencer →
      </button>
    </section>
  )
}

/* ==================== SCREEN 1 — Teal Maman/Papa ==================== */
function Screen1({ type, setType, canAdvance, onNext }) {
  const [bursts, setBursts] = useState({}) // { maman: id, papa: id }

  const handleSelect = (kind) => {
    setType(kind)
    setBursts((b) => ({ ...b, [kind]: Date.now() }))
    setTimeout(() => {
      setBursts((b) => {
        const copy = { ...b }
        delete copy[kind]
        return copy
      })
    }, 700)
  }

  return (
    <section style={{ ...styles.section, background: '#0D9373', justifyContent: 'flex-start', paddingTop: 80 }}>
      <h2
        className="enter-up"
        style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}
      >
        Tu es...
      </h2>
      <div style={styles.choiceRow}>
        <ChoiceCard
          kind="maman"
          label="Maman 👩"
          img={mamanComplice}
          selected={type === 'maman'}
          onSelect={handleSelect}
          burst={bursts.maman}
          enterClass="enter-left"
        />
        <ChoiceCard
          kind="papa"
          label="Papa 👨"
          img={papaEncourageant}
          selected={type === 'papa'}
          onSelect={handleSelect}
          burst={bursts.papa}
          enterClass="enter-right"
        />
      </div>
      <div style={{ flex: 1 }} />
      {canAdvance && (
        <button
          onClick={onNext}
          className="fade-in btn-pulse"
          style={{ ...styles.btnBase, background: '#FFE17B', color: '#0F172A' }}
        >
          Suivant →
        </button>
      )}
    </section>
  )
}

function ChoiceCard({ label, img, selected, onSelect, kind, burst, enterClass }) {
  return (
    <div className={`choice-wrap ${enterClass}`} style={styles.choiceWrap}>
      <button
        onClick={() => onSelect(kind)}
        className="choice-card"
        style={{
          ...styles.choiceCard,
          border: selected ? '2px solid #FFE17B' : '2px solid transparent',
          transform: selected ? 'scale(1.05)' : 'scale(1)',
          boxShadow: selected ? '0 8px 24px rgba(255,225,123,0.3)' : 'none',
        }}
      >
        <img src={img} alt={label} style={styles.choiceImg} />
        <span style={styles.choiceLabel}>{label}</span>
      </button>
      {burst && <StarBurst key={burst} />}
    </div>
  )
}

function StarBurst() {
  // 5 stars exploding outward — random radius computed once on mount
  const [stars] = useState(() =>
    Array.from({ length: 5 }).map((_, i) => {
      const angle = (i / 5) * Math.PI * 2
      const radius = 70 + Math.random() * 20
      return {
        tx: Math.cos(angle) * radius,
        ty: Math.sin(angle) * radius,
      }
    })
  )

  return (
    <div style={styles.burstWrap}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star-burst"
          style={{
            '--tx': `${s.tx}px`,
            '--ty': `${s.ty}px`,
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

/* ==================== SCREEN 2 — Pink child name+age ==================== */
function Screen2({ prenomEnfant, setPrenomEnfant, age, setAge, canAdvance, onNext }) {
  const [bouncing, setBouncing] = useState(false)
  const bounceTimer = useRef(null)

  const handleAgeChange = (v) => {
    setAge(v)
    setBouncing(true)
    if (bounceTimer.current) clearTimeout(bounceTimer.current)
    bounceTimer.current = setTimeout(() => setBouncing(false), 300)
  }

  useEffect(() => {
    return () => {
      if (bounceTimer.current) clearTimeout(bounceTimer.current)
    }
  }, [])

  return (
    <section style={{ ...styles.section, background: '#F2B8C6', justifyContent: 'flex-start', paddingTop: 48 }}>
      <div className="enter-down" style={{ display: 'flex', justifyContent: 'center', height: '34vh', alignItems: 'center' }}>
        <img src={mamanFiere} alt="Maman fière" style={{ maxHeight: '100%', maxWidth: '70%', objectFit: 'contain' }} />
      </div>
      <h2
        style={{
          color: '#4B1528',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          textAlign: 'center',
          margin: '20px 0 24px',
        }}
      >
        Comment s'appelle ton enfant ?
      </h2>
      <input
        type="text"
        value={prenomEnfant}
        onChange={(e) => setPrenomEnfant(e.target.value)}
        placeholder="Lucas, Emma..."
        className="glow-input glow-input-pink"
        style={styles.nameInputDark}
      />
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <div
          className={bouncing ? 'bounce-value' : ''}
          style={{ color: '#4B1528', fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 800, display: 'inline-block' }}
        >
          {age} <span style={{ fontSize: 16, fontWeight: 500 }}>ans</span>
        </div>
        <input
          type="range"
          min={4}
          max={15}
          value={age}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          className="age-slider"
          style={{ width: '80%', marginTop: 12, display: 'block', margin: '12px auto 0' }}
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

/* ==================== SCREEN 3bis — Navy parent name ==================== */
function Screen3Bis({ prenomParent, setPrenomParent, canAdvance, onNext }) {
  return (
    <section style={{ ...styles.section, background: '#0F172A', justifyContent: 'flex-start', paddingTop: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '32vh', alignItems: 'center' }}>
        <img
          src={mamanFiere}
          alt="Maman"
          className="rotate-gently"
          style={{ maxHeight: '100%', maxWidth: '60%', objectFit: 'contain' }}
        />
      </div>
      <h2
        className="enter-up"
        style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, textAlign: 'center', margin: '24px 0 8px' }}
      >
        Et toi, comment tu t'appelles ?
      </h2>
      <p style={{ color: '#A8DED1', fontFamily: 'Inter, sans-serif', fontSize: 14, textAlign: 'center', margin: '0 0 32px' }}>
        Pour que je m'adresse à toi comme il faut 💛
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
          Suivant →
        </button>
      )}
    </section>
  )
}

/* ==================== SCREEN 4 — Yellow finish ==================== */
function Screen4({ prenomParent, onFinish }) {
  // Computed once on mount — random positions for falling confetti
  const [confetti] = useState(() => {
    const emojis = ['🎉', '⚡', '⭐']
    return Array.from({ length: 24 }).map((_, i) => ({
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 1.5,
    }))
  })

  return (
    <section style={{ ...styles.section, background: '#FFE17B', position: 'relative', overflow: 'hidden' }}>
      {/* Falling confetti */}
      <div style={styles.confettiLayer}>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${c.left}%`,
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
          style={{ maxHeight: '50vh', maxWidth: '85%', objectFit: 'contain' }}
        />
      </div>
      <div style={styles.textWrap}>
        <h1 style={{ color: '#412402', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>
          C'est parti{prenomParent ? ` ${prenomParent}` : ''} ! 🎉
        </h1>
        <p style={{ color: '#633806', fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.5 }}>
          Ton Cockpit est prêt ⚡
        </p>
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

/* ==================== Typewriter helper ==================== */
function Typewriter({ text, delay = 0, style }) {
  return (
    <p style={style}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="tw-char"
          style={{ animationDelay: `${delay + i * 30}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  )
}

/* ==================== Styles & CSS ==================== */
const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
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
  },
  imageWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textWrap: {
    textAlign: 'center',
    padding: '0 16px',
    marginBottom: 24,
  },
  kicker: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    margin: 0,
    minHeight: 20,
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 28,
    fontWeight: 700,
    margin: '4px 0 8px',
    minHeight: 36,
  },
  subtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    lineHeight: 1.5,
    margin: 0,
    minHeight: 22,
  },
  btnBase: {
    border: 'none',
    borderRadius: 999,
    padding: '16px 32px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 320,
    transition: 'transform 0.15s, opacity 0.15s',
  },
  choiceRow: {
    display: 'flex',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    perspective: 800,
  },
  choiceWrap: {
    position: 'relative',
    flex: 1,
    maxWidth: 150,
  },
  choiceCard: {
    width: '100%',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    transition: 'transform 0.25s ease, border 0.2s, box-shadow 0.25s',
  },
  choiceImg: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'contain',
    borderRadius: 12,
  },
  choiceLabel: {
    color: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: 14,
  },
  burstWrap: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInputDark: {
    width: '80%',
    margin: '0 auto',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #4B1528',
    padding: '12px 4px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
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
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'center',
    outline: 'none',
    display: 'block',
    transition: 'box-shadow 0.25s, border-color 0.25s',
  },
  dots: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    pointerEvents: 'none',
    zIndex: 10,
  },
  confettiLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
}

const css = `
/* ===== Screen transitions ===== */
@keyframes slideOutLeft {
  0%   { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-30%); opacity: 0; }
}
@keyframes slideInFromRight {
  0%   { transform: translateX(30%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.slide-out-left { animation: slideOutLeft 0.35s ease forwards; }
.slide-in-right { animation: slideInFromRight 0.35s ease forwards; }

/* ===== Element entry animations ===== */
@keyframes enterUp {
  from { transform: translateY(60px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes enterDown {
  from { transform: translateY(-60px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes enterLeft {
  from { transform: translateX(-80px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
@keyframes enterRight {
  from { transform: translateX(80px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.enter-up    { animation: enterUp 0.6s ease-out both; }
.enter-down  { animation: enterDown 0.5s ease-out both; }
.enter-left  { animation: enterLeft 0.5s ease-out both; }
.enter-right { animation: enterRight 0.5s ease-out both; }

/* ===== Loop animations ===== */
@keyframes bounceLoop {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes bounceFast {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
.bounce-loop { animation: bounceLoop 1.8s ease-in-out infinite; }
.bounce-fast { animation: bounceFast 0.4s ease-in-out infinite; }

/* Combine entry + loop on monstre */
.enter-up.bounce-loop {
  animation: enterUp 0.6s ease-out, bounceLoop 1.8s ease-in-out 0.6s infinite;
}

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
  animation: twChar 0.25s ease-out forwards;
}

/* ===== Star burst ===== */
@keyframes starBurst {
  0%   { transform: translate(0,0) scale(0.3); opacity: 1; }
  60%  { opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
}
.star-burst {
  position: absolute;
  font-size: 22px;
  pointer-events: none;
  animation: starBurst 0.7s ease-out forwards;
}

/* ===== Choice card hover tilt ===== */
.choice-card {
  transform-style: preserve-3d;
}
.choice-card:hover {
  transform: rotateY(5deg) scale(1.02) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
}

/* ===== Glow input ===== */
.glow-input-pink:focus {
  box-shadow: 0 4px 16px -4px rgba(13,147,115,0.5);
  border-color: #0D9373 !important;
}
.glow-input-navy:focus {
  box-shadow: 0 4px 16px -4px rgba(168,222,209,0.6);
  border-color: #A8DED1 !important;
}

/* ===== Bounce value (age) ===== */
@keyframes bounceValue {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.age-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4B1528;
  border: 3px solid #FFFFFF;
  cursor: pointer;
}

/* ===== Rotate gently (Maman screen 3bis) ===== */
@keyframes rotateGently {
  0%, 100% { transform: rotate(-3deg); }
  50%      { transform: rotate(3deg); }
}
.rotate-gently { animation: rotateGently 3s ease-in-out infinite; }

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
  font-size: 24px;
  color: #FFFFFF;
  pointer-events: none;
  animation: blink 1s steps(1) infinite;
}

/* ===== Spin once + bounce fast (screen 4 monstre) ===== */
@keyframes spinOnce {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}
.spin-once.bounce-fast {
  animation: spinOnce 0.8s ease-out, bounceFast 0.4s ease-in-out 0.8s infinite;
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
    #0F172A 40%,
    #1E3050 50%,
    #0F172A 60%,
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
  font-size: 24px;
  animation: confettiFall linear forwards;
}

/* ===== Fade in ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.35s ease-out both; }
`
