import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playSound, playRandomPop } from '../../lib/audio'
import { AppContext } from '../../lib/AppContext'

import monstreCalin     from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreSurexcite from '../../assets/characters/monstre~/monstre-surexcite.webp'
import monstreChuchote  from '../../assets/characters/monstre~/monstre-chuchote.webp'
import monstreMalicieux from '../../assets/characters/monstre~/Malicieux.webp'
import monstreTriste    from '../../assets/characters/monstre~/monstre-triste.webp'
import monstreRigole    from '../../assets/characters/monstre~/monstre-rigole.webp'

import mamanComplice from '../../assets/characters/maman/maman-complice.webp'
import mamanInquiete from '../../assets/characters/maman/maman-inquiete.webp'
import mamanMain     from '../../assets/characters/maman/maman-main-tendue.webp'
import mamanFiere    from '../../assets/characters/maman/maman-fiere.webp'

import papaEncourageant from '../../assets/characters/papa/encourageant.webp'

const TRANSITION_MS = 360
const TOTAL_STEPS   = 6
const BG = ['#1C1B2E', '#1C1B2E', '#1A3530', '#2A1824', '#1C1B2E', '#F5E06D']

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function Onboarding() {
  const navigate = useNavigate()
  const [step,      setStep]      = useState(0)
  const [direction, setDirection] = useState(1)
  const [phase,     setPhase]     = useState('in')
  const [type,           setType]           = useState(null)
  const [prenomEnfant,   setPrenomEnfant]   = useState('')
  const [age,            setAge]            = useState(8)
  const [prenomParent,   setPrenomParent]   = useState('')
  const { appData, saveData } = useContext(AppContext)

  useEffect(() => {
    if (appData?.onboarding?.onboardingDone) navigate('/', { replace: true })
  }, [appData, navigate])

  const goTo = (target) => {
    if (phase === 'out') return
    playRandomPop({ volume: 0.3 })
    setDirection(target > step ? 1 : -1)
    setPhase('out')
    setTimeout(() => { setStep(target); setPhase('in') }, TRANSITION_MS)
  }

  const next = () => goTo(step + 1)
  const back = () => { if (step > 0) goTo(step - 1) }

  const finish = async () => {
    await saveData({
      onboarding: {
        type,
        prenomEnfant: prenomEnfant.trim(),
        age,
        prenomParent: prenomParent.trim(),
        onboardingDone: true,
      },
    })
    navigate('/', { replace: true })
  }

  const screenClass = phase === 'out'
    ? (direction > 0 ? 'ob-out-fwd' : 'ob-out-bck')
    : (direction > 0 ? 'ob-in-fwd'  : 'ob-in-bck')

  const isLastStep = step === TOTAL_STEPS - 1

  return (
    <div className="ob-root" style={S.root}>
      <style>{CSS}</style>

      <ProgressDots current={step} total={TOTAL_STEPS} dark={BG[step] !== '#F5E06D'} />

      {step > 0 && !isLastStep && (
        <button onClick={back} style={S.backBtn} aria-label="Retour">‹</button>
      )}

      <div key={step} className={screenClass} style={S.screen}>
        {step === 0 && <S0Intro    onNext={next} />}
        {step === 1 && <S1Histoire onNext={next} />}
        {step === 2 && <S2Role     type={type} setType={setType} onNext={next} />}
        {step === 3 && <S3Enfant   prenomEnfant={prenomEnfant} setPrenomEnfant={setPrenomEnfant} age={age} setAge={setAge} onNext={next} />}
        {step === 4 && <S4Parent   prenomParent={prenomParent} setPrenomParent={setPrenomParent} onNext={next} />}
        {step === 5 && <S5Final    prenomParent={prenomParent} prenomEnfant={prenomEnfant} onFinish={finish} />}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS DOTS
───────────────────────────────────────────────────────────── */
function ProgressDots({ current, total, dark }) {
  const active  = dark ? '#F5E06D'              : '#1C1B2E'
  const done    = dark ? 'rgba(255,255,255,.55)' : 'rgba(28,27,46,.45)'
  const pending = dark ? 'rgba(255,255,255,.18)' : 'rgba(28,27,46,.15)'
  return (
    <div style={{
      position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: 5, zIndex: 50, alignItems: 'center',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width:  i === current ? 22 : 6,
          height: 6,
          borderRadius: 999,
          background: i < current ? done : i === current ? active : pending,
          transition: 'all 0.38s cubic-bezier(.34,1.56,.64,1)',
        }} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 0 — Le Monstre apparaît
───────────────────────────────────────────────────────────── */
function S0Intro({ onNext }) {
  const phrases = [
    { text: "Psst... t'es là ?",              img: monstreCalin     },
    { text: "Je m'appelle Le Monstre ⚡",      img: monstreChuchote  },
    { text: "Je suis le TDAH de ton enfant.", img: monstreMalicieux },
  ]
  const [idx,    setIdx]    = useState(0)
  const [hopKey, setHopKey] = useState(0)

  useEffect(() => {
    if (idx >= phrases.length - 1) return
    const t = setTimeout(
      () => { playRandomPop({ volume: 0.2 }); setIdx(i => i + 1) },
      phrases[idx].text.length * 55 + 1100,
    )
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  return (
    <section style={{ ...S.section, background: '#1C1B2E', justifyContent: 'flex-end', paddingBottom: 96 }}>
      <Bubbles />
      <div style={{ ...S.bubbleWrap, zIndex: 1 }}>
        <div key={idx} className="ob-bubble-pop" style={S.bubble}>
          <Typewriter text={phrases[idx].text} />
          <div style={S.bubbleTail} />
        </div>
      </div>
      <div className="ob-enter-bottom" style={{ marginTop: 12, display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1 }}>
        <img
          key={`m${idx}-${hopKey}`}
          src={phrases[idx].img}
          alt="Le Monstre"
          onClick={() => { playRandomPop({ volume: 0.35 }); setHopKey(k => k + 1) }}
          className="ob-bounce ob-hop"
          style={{ height: 268, maxWidth: '78%', objectFit: 'contain', cursor: 'pointer', userSelect: 'none' }}
          draggable={false}
        />
      </div>
      <div style={{ height: 28, zIndex: 1 }} />
      {idx === phrases.length - 1 ? (
        <button onClick={onNext} className="ob-fade-in ob-pulse" style={{ ...S.btn, background: '#2A9490', zIndex: 1 }}>
          Je t'écoute →
        </button>
      ) : (
        <div style={{ height: 54 }} />
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 1 — L'histoire (3 scènes)
───────────────────────────────────────────────────────────── */
function S1Histoire({ onNext }) {
  const [scene, setScene] = useState(0)
  const advance = () => { if (scene < 2) { playRandomPop(); setScene(s => s + 1) } }

  const scenes = [
    {
      key: 'A',
      chars: [{ src: monstreTriste,  alt: 'Monstre triste'  }],
      bubble: "Moi aussi j'ai du mal... je sais pas me contrôler.",
    },
    {
      key: 'B',
      chars: [{ src: mamanInquiete, alt: 'Maman inquiète' }],
      bubble: "Ta maman cherche des réponses pour t'aider.",
    },
    {
      key: 'C',
      chars: [{ src: monstreCalin, alt: 'Monstre câlin' }, { src: mamanFiere, alt: 'Maman fière' }],
      bubble: "Ensemble, vous allez apprendre à traverser les orages ⚡",
      confetti: true,
    },
  ]
  const { key: sceneKey, ...sceneProps } = scenes[scene]

  return (
    <section
      style={{ ...S.section, background: '#1C1B2E', justifyContent: 'center', cursor: scene < 2 ? 'pointer' : 'default' }}
      onClick={scene < 2 ? advance : undefined}
    >
      <Bubbles />
      <div style={{ zIndex: 1 }}><SceneCard key={sceneKey} {...sceneProps} /></div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        {scene < 2 ? (
          <p className="ob-fade-in" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter,sans-serif', fontSize: 12, fontStyle: 'italic', margin: 0 }}>
            Tape pour continuer
          </p>
        ) : (
          <button onClick={e => { e.stopPropagation(); onNext() }} className="ob-fade-in ob-pulse" style={{ ...S.btn, background: '#2A9490', maxWidth: 260 }}>
            On commence ?
          </button>
        )}
      </div>
    </section>
  )
}

function SceneCard({ chars, bubble, confetti }) {
  return (
    <div className="ob-fade-in-slow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={S.bubble}>
        <Typewriter text={bubble} />
        <div style={S.bubbleTail} />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', justifyContent: 'center' }}>
        {chars.map((c, i) => (
          <img key={i} src={c.src} alt={c.alt} className="ob-enter-bottom" draggable={false}
            style={{ height: 250, maxWidth: chars.length > 1 ? '40vw' : '62vw', objectFit: 'contain', animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      {confetti && <LightConfetti />}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 2 — Qui suit le kit ? (Maman / Papa / Les deux)
───────────────────────────────────────────────────────────── */
function S2Role({ type, setType, onNext }) {
  const pick = (kind) => { playRandomPop({ volume: 0.3 }); setType(kind) }

  return (
    <section style={{ ...S.section, background: '#1A3530', gap: 20 }}>
      <Bubbles />

      <div style={{ textAlign: 'center', zIndex: 1, paddingTop: 8 }}>
        <h2 className="ob-enter-top" style={{ color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
          Qui suit le kit ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,.6)', fontFamily: 'Inter,sans-serif', fontSize: 13, margin: 0 }}>
          L'expérience s'adapte à toi
        </p>
      </div>

      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ ...S.bubble, fontSize: 13, padding: '8px 16px' }}>
          Choisis !<div style={S.bubbleTail} />
        </div>
        <img src={monstreChuchote} alt="Monstre" className="ob-bounce" style={{ height: 72, objectFit: 'contain' }} draggable={false} />
      </div>

      {/* Maman / Papa — 2 cards côte à côte */}
      <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center', zIndex: 1 }}>
        <RoleCard img={mamanComplice}     label="Maman" selected={type === 'maman'}    onSelect={() => pick('maman')}    enterClass="ob-enter-left"  />
        <RoleCard img={papaEncourageant}  label="Papa"  selected={type === 'papa'}     onSelect={() => pick('papa')}     enterClass="ob-enter-right" />
      </div>

      {/* Les deux — pill pleine largeur */}
      <button
        onClick={() => pick('les-deux')}
        className="ob-enter-bottom"
        style={{
          width: '100%', maxWidth: 320,
          padding: '13px 20px',
          borderRadius: 16,
          border: type === 'les-deux' ? '2px solid #F5E06D' : '1.5px solid rgba(255,255,255,.25)',
          background: type === 'les-deux' ? 'rgba(245,224,109,.1)' : 'rgba(255,255,255,.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', zIndex: 1,
          transition: 'all .2s ease',
          boxShadow: type === 'les-deux' ? '0 4px 20px rgba(245,224,109,.18)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={mamanComplice}    style={{ height: 34, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)' }} draggable={false} alt="" />
          <img src={papaEncourageant} style={{ height: 34, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', marginLeft: -10 }} draggable={false} alt="" />
        </div>
        <span style={{
          color: type === 'les-deux' ? '#F5E06D' : 'rgba(255,255,255,.85)',
          fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600,
          transition: 'color .2s',
        }}>
          Nous deux — co-parentalité
        </span>
      </button>

      {type && (
        <button onClick={onNext} className="ob-fade-in ob-pulse" style={{ ...S.btn, background: '#2A9490', zIndex: 1 }}>
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
        width: '47%', maxWidth: 168,
        padding: '14px 10px',
        borderRadius: 20,
        border: selected ? '2.5px solid #F5E06D' : '1.5px solid rgba(255,255,255,.25)',
        background: selected ? 'rgba(245,224,109,.1)' : 'rgba(255,255,255,.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform .25s, border .2s, background .2s',
        boxShadow: selected ? '0 6px 24px rgba(245,224,109,.2)' : 'none',
      }}
    >
      <img src={img} alt={label} style={{ height: 140, objectFit: 'contain', borderRadius: 12 }} draggable={false} />
      <span style={{ color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700 }}>{label}</span>
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 3 — Ton enfant (prénom + âge avec +/−)
───────────────────────────────────────────────────────────── */
function S3Enfant({ prenomEnfant, setPrenomEnfant, age, setAge, onNext }) {
  const monstreImg = age <= 6 ? monstreCalin : age <= 10 ? monstreRigole : monstreSurexcite
  const ageKey     = age <= 6 ? 'a' : age <= 10 ? 'b' : 'c'

  const bump = (delta) => {
    const v = Math.min(15, Math.max(4, age + delta))
    if (v !== age) { playRandomPop({ volume: 0.2 }); setAge(v) }
  }

  return (
    <section style={{ ...S.section, background: '#2A1824', justifyContent: 'flex-start', paddingTop: 52 }}>
      <Bubbles />

      <div style={{ ...S.bubble, alignSelf: 'center', zIndex: 1 }}>
        <Typewriter text="Parle-moi de ton petit monstre" />
        <div style={S.bubbleTail} />
      </div>

      <input
        type="text"
        value={prenomEnfant}
        onChange={e => setPrenomEnfant(e.target.value)}
        placeholder="Lucas, Emma..."
        className="ob-glow-pink"
        style={{ ...S.inputDark, zIndex: 1 }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 1, marginTop: 8 }}>
        <img
          key={ageKey}
          src={monstreImg}
          alt="Monstre"
          className="ob-fade-in"
          style={{ height: 170, objectFit: 'contain' }}
          draggable={false}
        />

        {/* Stepper +/− */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          background: 'rgba(192,80,106,.15)',
          borderRadius: 999, padding: 4,
        }}>
          <StepBtn onClick={() => bump(-1)} disabled={age <= 4}>−</StepBtn>
          <div style={{ minWidth: 94, textAlign: 'center', color: '#C0506A', fontFamily: 'Poppins,sans-serif', fontSize: 26, fontWeight: 800 }}>
            {age}<span style={{ fontSize: 12, fontWeight: 500, marginLeft: 3 }}>ans</span>
          </div>
          <StepBtn onClick={() => bump(1)} disabled={age >= 15}>+</StepBtn>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      {prenomEnfant.trim().length > 0 && (
        <button onClick={onNext} className="ob-fade-in ob-pulse" style={{ ...S.btn, background: '#C0506A', zIndex: 1 }}>
          Suivant →
        </button>
      )}
    </section>
  )
}

function StepBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 44, height: 44, borderRadius: 999, border: 'none',
        background: disabled ? 'rgba(255,255,255,.06)' : 'rgba(192,80,106,.7)',
        color: disabled ? 'rgba(255,255,255,.3)' : '#fff',
        fontSize: 22, fontWeight: 300, cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s ease',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 4 — Et toi ? (prénom parent)
───────────────────────────────────────────────────────────── */
function S4Parent({ prenomParent, setPrenomParent, onNext }) {
  return (
    <section style={{ ...S.section, background: '#1C1B2E', justifyContent: 'flex-start', paddingTop: 52 }}>
      <Bubbles />

      <div style={{ ...S.bubble, marginBottom: 12, alignSelf: 'center', zIndex: 1 }}>
        <Typewriter text="Et toi, comment tu t'appelles ?" />
        <div style={S.bubbleTail} />
      </div>

      <img
        src={mamanMain} alt="Maman"
        className="ob-sway"
        style={{ height: 240, objectFit: 'contain', alignSelf: 'center', zIndex: 1 }}
        draggable={false}
      />

      <p style={{ color: 'rgba(42,148,144,.9)', fontFamily: 'Inter,sans-serif', fontSize: 13, textAlign: 'center', margin: '14px 0 20px', zIndex: 1, lineHeight: 1.5 }}>
        On va s'adresser à toi par ton prénom —<br />pas "le parent de"
      </p>

      <div style={{ position: 'relative', width: '80%', margin: '0 auto', zIndex: 1 }}>
        <input
          type="text"
          value={prenomParent}
          onChange={e => setPrenomParent(e.target.value)}
          placeholder="Marie, Sophie..."
          className="ob-glow-navy"
          style={S.inputLight}
        />
        {!prenomParent && <span className="ob-cursor">|</span>}
      </div>

      <div style={{ flex: 1 }} />
      {prenomParent.trim().length > 0 && (
        <button onClick={onNext} className="ob-fade-in ob-pulse" style={{ ...S.btn, background: '#2A9490', zIndex: 1 }}>
          C'est parti →
        </button>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCREEN 5 — Explosion finale + aperçu modules
───────────────────────────────────────────────────────────── */
function S5Final({ prenomParent, prenomEnfant, onFinish }) {
  const [confetti] = useState(() =>
    Array.from({ length: 26 }).map((_, i) => ({
      emoji: ['🎉', '⚡', '⭐', '🧡', '✨'][i % 5],
      left: Math.random() * 100,
      delay: Math.random() * 1.6,
      duration: 2 + Math.random() * 1.4,
      size: 16 + Math.random() * 12,
    }))
  )

  useEffect(() => { playSound('success', { volume: 0.55 }) }, [])

  const modules = [
    { emoji: '⚡', label: 'Formation',      sub: '5 leçons · 25 min · réflexes à installer' },
    { emoji: '🎭', label: 'Quiz Émotions',  sub: prenomEnfant ? `Pour ${prenomEnfant}` : 'Pour ton enfant' },
    { emoji: '🛠️', label: 'Mes Outils',     sub: '7 imprimables · zéro téléphone pendant la crise' },
  ]

  return (
    <section style={{ ...S.section, background: '#F5E06D', overflow: 'hidden' }}>
      <Bubbles />
      <div style={S.confetti}>
        {confetti.map((c, i) => (
          <span key={i} className="ob-confetti"
            style={{ left: `${c.left}%`, fontSize: c.size, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s` }}>
            {c.emoji}
          </span>
        ))}
      </div>

      <div style={{ zIndex: 1, display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <img src={monstreSurexcite} alt="Le Monstre" className="ob-spin ob-bounce-fast"
          style={{ height: 190, maxWidth: '72%', objectFit: 'contain' }} draggable={false} />
      </div>

      <div style={{ textAlign: 'center', padding: '0 12px', zIndex: 1 }}>
        <h1 style={{ color: '#2A1000', fontFamily: 'Poppins,sans-serif', fontSize: 27, fontWeight: 800, margin: '0 0 4px' }}>
          C'est parti{prenomParent ? `, ${prenomParent}` : ''} !
        </h1>
        <p style={{ color: '#5A3000', fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          {prenomEnfant
            ? `Voici ce qui attend ${prenomEnfant} et toi :`
            : 'Voici ce qui vous attend :'}
        </p>
      </div>

      {/* Module preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', zIndex: 1, padding: '0 4px' }}>
        {modules.map((m, i) => (
          <div
            key={i}
            className="ob-enter-bottom"
            style={{
              background: 'rgba(255,255,255,.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: 14,
              padding: '11px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              border: '1px solid rgba(255,255,255,.75)',
              animationDelay: `${0.08 + i * 0.1}s`,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>{m.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, color: '#2A1000' }}>{m.label}</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#7A4800', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.sub}</div>
            </div>
            <span style={{ color: '#7A4800', fontSize: 18, flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>

      <button onClick={onFinish} className="ob-shimmer" style={{ ...S.btn, color: '#FFFFFF', zIndex: 1 }}>
        Entrer dans mon Cockpit
      </button>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function LightConfetti() {
  const [items] = useState(() =>
    Array.from({ length: 14 }).map(() => ({
      emoji: ['🎉', '⭐', '✨'][Math.floor(Math.random() * 3)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }))
  )
  return (
    <div style={S.confetti}>
      {items.map((c, i) => (
        <span key={i} className="ob-confetti"
          style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s`, fontSize: 18 }}>
          {c.emoji}
        </span>
      ))}
    </div>
  )
}

const BUBBLE_PALETTE = ['#F5E06D', '#2A9490', '#C0506A', '#FFFFFF', '#2A9490']

function Bubbles() {
  const idRef = useRef(null)
  if (!idRef.current) idRef.current = `bb-${Math.random().toString(36).slice(2, 8)}`
  const id = idRef.current

  const [bubbles] = useState(() =>
    Array.from({ length: 13 }).map((_, i) => {
      const wp = Array.from({ length: 4 }).map(() => [Math.random() * 100, Math.random() * 100])
      const sx = Math.random() * 100
      const sy = Math.random() * 100
      return {
        name: `${id}-${i}`,
        size: 18 + Math.random() * 72,
        color: BUBBLE_PALETTE[Math.floor(Math.random() * BUBBLE_PALETTE.length)],
        opacity: 0.03 + Math.random() * 0.05,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 14,
        sx, sy, wp,
      }
    })
  )

  useEffect(() => {
    const el = document.createElement('style')
    el.setAttribute('data-bubbles', id)
    el.textContent = bubbles.map(b => {
      const [w0, w1, w2, w3] = b.wp
      return `@keyframes ${b.name} {
  0%   { transform: translate(0,0) scale(1) }
  25%  { transform: translate(${(w0[0]-b.sx).toFixed(1)}vw,${(w0[1]-b.sy).toFixed(1)}vh) scale(1.1) }
  50%  { transform: translate(${(w1[0]-b.sx).toFixed(1)}vw,${(w1[1]-b.sy).toFixed(1)}vh) scale(1) }
  75%  { transform: translate(${(w2[0]-b.sx).toFixed(1)}vw,${(w2[1]-b.sy).toFixed(1)}vh) scale(1.12) }
  100% { transform: translate(${(w3[0]-b.sx).toFixed(1)}vw,${(w3[1]-b.sy).toFixed(1)}vh) scale(1) }
}`}).join('\n')
    document.head.appendChild(el)
    return () => { document.head.removeChild(el) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {bubbles.map(b => (
        <div key={b.name} style={{
          position: 'absolute', left: `${b.sx}%`, top: `${b.sy}%`,
          width: b.size, height: b.size, borderRadius: '50%',
          background: b.color, opacity: b.opacity,
          pointerEvents: 'none', willChange: 'transform',
          animation: `${b.name} ${b.duration}s ${b.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  )
}

function Typewriter({ text, delay = 0 }) {
  // Wrap each word in white-space:nowrap to prevent mid-word line breaks
  let charIdx = 0
  return (
    <span>
      {text.split(' ').map((word, wi, arr) => {
        const letters = word.split('').map((ch, ci) => {
          const d = delay + charIdx++ * 32
          return <span key={ci} className="ob-tw" style={{ display: 'inline-block', animationDelay: `${d}ms` }}>{ch}</span>
        })
        const spaceDelay = wi < arr.length - 1 ? delay + charIdx++ * 32 : null
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {letters}
            {spaceDelay !== null && (
              <span className="ob-tw" style={{ display: 'inline-block', animationDelay: `${spaceDelay}ms` }}>&nbsp;</span>
            )}
          </span>
        )
      })}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const S = {
  root: {
    position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#1C1B2E',
  },
  screen: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  },
  section: {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
    padding: '52px 20px 96px', boxSizing: 'border-box',
    position: 'relative', overflow: 'hidden',
  },
  bubble: {
    background: 'rgba(255,255,255,.94)',
    color: '#1C1B2E',
    borderRadius: 20, padding: '13px 20px',
    minWidth: 170, maxWidth: '82%',
    fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600,
    boxShadow: '0 8px 24px rgba(0,0,0,.22)',
    position: 'relative', textAlign: 'center', lineHeight: 1.5,
  },
  bubbleTail: {
    position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
    width: 0, height: 0,
    borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
    borderTop: '9px solid rgba(255,255,255,.94)',
  },
  bubbleWrap: { width: '100%', display: 'flex', justifyContent: 'center' },
  btn: {
    border: 'none', borderRadius: 999, padding: '15px 28px',
    fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 15,
    cursor: 'pointer', width: '100%', maxWidth: 316,
    transition: 'transform .15s, opacity .15s', color: '#fff',
  },
  inputDark: {
    width: '82%', margin: '20px auto 0',
    background: 'transparent', border: 'none', borderBottom: '2px solid #C0506A',
    padding: '10px 4px', fontFamily: 'Poppins,sans-serif', fontSize: 26, fontWeight: 600,
    color: '#C0506A', textAlign: 'center', outline: 'none', display: 'block',
    transition: 'box-shadow .25s, border-color .25s',
  },
  inputLight: {
    width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #fff',
    padding: '10px 4px', fontFamily: 'Poppins,sans-serif', fontSize: 26, fontWeight: 600,
    color: '#fff', textAlign: 'center', outline: 'none', display: 'block',
    transition: 'box-shadow .25s, border-color .25s',
  },
  confetti: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 },
  backBtn: {
    position: 'absolute', top: 14, left: 14, zIndex: 50,
    background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)',
    color: 'rgba(255,255,255,.7)', fontSize: 20, fontWeight: 400,
    cursor: 'pointer', padding: '6px 13px', borderRadius: 999, lineHeight: 1,
  },
}

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const CSS = `
/* Screen transitions — direction-aware */
@keyframes obOutFwd { from { transform:translateX(0); opacity:1 } to { transform:translateX(-22%); opacity:0 } }
@keyframes obInFwd  { from { transform:translateX(22%); opacity:0 } to { transform:translateX(0); opacity:1 } }
@keyframes obOutBck { from { transform:translateX(0); opacity:1 } to { transform:translateX(22%); opacity:0 } }
@keyframes obInBck  { from { transform:translateX(-22%); opacity:0 } to { transform:translateX(0); opacity:1 } }
.ob-out-fwd { animation: obOutFwd ${TRANSITION_MS}ms ease forwards }
.ob-in-fwd  { animation: obInFwd  ${TRANSITION_MS}ms ease forwards }
.ob-out-bck { animation: obOutBck ${TRANSITION_MS}ms ease forwards }
.ob-in-bck  { animation: obInBck  ${TRANSITION_MS}ms ease forwards }

/* Entries */
@keyframes obEnterBottom { from { transform:translateY(70px); opacity:0 } to { transform:translateY(0); opacity:1 } }
@keyframes obEnterTop    { from { transform:translateY(-50px); opacity:0 } to { transform:translateY(0); opacity:1 } }
@keyframes obEnterLeft   { from { transform:translateX(-55px); opacity:0 } to { transform:translateX(0); opacity:1 } }
@keyframes obEnterRight  { from { transform:translateX(55px); opacity:0 } to { transform:translateX(0); opacity:1 } }
.ob-enter-bottom { animation: obEnterBottom 0.75s ease-out both }
.ob-enter-top    { animation: obEnterTop 0.5s ease-out both }
.ob-enter-left   { animation: obEnterLeft 0.5s ease-out both }
.ob-enter-right  { animation: obEnterRight 0.5s ease-out both }

/* Bubble pop */
@keyframes obBubblePop { from { transform:scale(0.82); opacity:0 } to { transform:scale(1); opacity:1 } }
.ob-bubble-pop { animation: obBubblePop 0.22s ease-out }

/* Bounce */
@keyframes obBounce     { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
@keyframes obBounceFast { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-11px) } }
.ob-bounce      { animation: obBounce 1.9s ease-in-out infinite }
.ob-bounce-fast { animation: obBounceFast 0.45s ease-in-out infinite }
.ob-enter-bottom.ob-bounce { animation: obEnterBottom 0.75s ease-out, obBounce 1.9s ease-in-out 0.75s infinite }

/* Hop on tap */
@keyframes obHop { 0% { transform:scale(1) } 40% { transform:scale(1.18) } 100% { transform:scale(1) } }
.ob-hop { animation: obHop 0.28s ease-out, obBounce 1.9s ease-in-out 0.28s infinite }

/* Spin */
@keyframes obSpin { from { transform:rotate(0) } to { transform:rotate(360deg) } }
.ob-spin           { animation: obSpin 0.55s ease-out }
.ob-spin.ob-bounce-fast { animation: obSpin 0.55s ease-out, obBounceFast 0.45s ease-in-out 0.55s infinite }

/* Sway */
@keyframes obSway { 0%,100% { transform:rotate(-3deg) } 50% { transform:rotate(3deg) } }
.ob-sway { animation: obSway 3s ease-in-out infinite }

/* Button pulse */
@keyframes obPulse { 0%,100% { transform:scale(1) } 50% { transform:scale(1.035) } }
.ob-pulse        { animation: obPulse 2.2s ease-in-out infinite }
.ob-pulse:active { transform: scale(0.96) }

/* Typewriter chars */
@keyframes obTw { from { opacity:0; transform:translateY(3px) } to { opacity:1; transform:translateY(0) } }
.ob-tw { display:inline-block; opacity:0; animation: obTw 0.2s ease-out forwards }

/* Fade-in */
@keyframes obFadeIn     { from { opacity:0; transform:translateY(7px) } to { opacity:1; transform:translateY(0) } }
@keyframes obFadeInSlow { from { opacity:0 } to { opacity:1 } }
.ob-fade-in      { animation: obFadeIn 0.38s ease-out both }
.ob-fade-in-slow { animation: obFadeInSlow 0.55s ease-out both }

/* Input glows */
.ob-glow-pink:focus { box-shadow: 0 5px 18px -5px rgba(192,80,106,.65); border-color: #C0506A !important }
.ob-glow-navy:focus { box-shadow: 0 5px 18px -5px rgba(42,148,144,.6); border-color: #2A9490 !important }

/* Blinking cursor */
@keyframes obBlink { 0%,49% { opacity:1 } 50%,100% { opacity:0 } }
.ob-cursor {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  font-size: 26px; color: #fff; pointer-events: none;
  animation: obBlink 1s steps(1) infinite;
}

/* Shimmer button */
@keyframes obShimmer { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
.ob-shimmer {
  background: linear-gradient(100deg, #1C1B2E 0%, #1C1B2E 36%, #1E3258 50%, #1C1B2E 64%, #1C1B2E 100%);
  background-size: 200% 100%;
  animation: obShimmer 2.8s linear infinite;
}

/* Confetti fall */
@keyframes obConfetti { 0% { transform:translateY(-15vh) rotate(0); opacity:1 } 100% { transform:translateY(108vh) rotate(360deg); opacity:0 } }
.ob-confetti { position:absolute; top:0; animation: obConfetti linear forwards }

/* ── Desktop responsive ──────────────────────────────────────
   #root fournit une hauteur fixe sur desktop (calc(100vh-64px)),
   la div .ob-root doit remplir ce conteneur plutôt que 100dvh. */
@media (min-width: 768px) {
  .ob-root { height: 100% !important; }
}
`
