import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import monstreTriste from '../../assets/characters/monstre~/monstre-triste.webp'
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'
import mamanMain from '../../assets/characters/maman/maman-main-tendue.webp'

const STEP_COLORS = ['#C0506A', '#F5E06D', '#2A9490', '#2A9490']

export default function Crise() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  return (
    <div style={S.root}>
      {/* Progress segments */}
      <div style={S.progressRow}>
        {STEP_COLORS.map((c, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? c : 'rgba(255,255,255,0.12)', transition: 'background 0.3s' }} />
        ))}
        <button onClick={() => navigate('/')} style={S.closeBtn}>✕</button>
      </div>

      {/* Steps */}
      <div key={step} className="fade-up" style={S.body}>
        {step === 0 && <Step1Stop onNext={() => setStep(1)} />}
        {step === 1 && <Step2Secure onNext={() => setStep(2)} />}
        {step === 2 && <Step3Validate onNext={() => setStep(3)} />}
        {step === 3 && <Step4After navigate={navigate} />}
      </div>
    </div>
  )
}

/* ═══ STEP 1 — STOP ═══ */
function Step1Stop({ onNext }) {
  const [seconds, setSeconds] = useState(30)
  const timerRef = useRef(null)
  const [running, setRunning] = useState(false)

  const startTimer = () => {
    if (running) return
    setRunning(true)
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(timerRef.current); return 0 }
        return s - 1
      })
    }, 1000)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const pct = ((30 - seconds) / 30) * 100
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div style={S.step}>
      <div style={{ ...S.stepBorder, borderTopColor: '#C0506A' }} />
      <img src={monstreTriste} alt="Monstre" style={S.charImg} draggable={false} />
      <h1 style={S.stepTitle}>STOP. Respire.</h1>
      <p style={S.stepSub}>Avant tout le reste — 3 respirations.</p>

      {/* Timer circle */}
      <div onClick={startTimer} style={S.timerWrap}>
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#C0506A" strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }} />
        </svg>
        <span style={S.timerText}>{seconds}s</span>
        {!running && <span style={S.timerHint}>Tape pour lancer</span>}
      </div>

      <ScriptCard type="good" text="Je vois que tu es très en colère. Je suis là." />
      <ScriptCard type="bad" text="Arrête ça tout de suite !" />

      <button onClick={onNext} style={S.nextBtn}>Étape suivante →</button>
    </div>
  )
}

/* ═══ STEP 2 — SÉCURISE ═══ */
function Step2Secure({ onNext }) {
  const checks = ['J\'ai éloigné les objets dangereux', 'Je me suis mis à sa hauteur', 'J\'ai baissé la voix']
  const [done, setDone] = useState([false, false, false])
  const toggle = (i) => setDone((d) => d.map((v, j) => j === i ? !v : v))
  const anyDone = done.some(Boolean)

  return (
    <div style={S.step}>
      <div style={{ ...S.stepBorder, borderTopColor: '#F5E06D' }} />
      <img src={monstreCalin} alt="Monstre" style={S.charImg} draggable={false} />
      <h1 style={S.stepTitle}>Sécurise l'espace</h1>
      <p style={S.stepSub}>Éloigne les objets dangereux. Ne touche pas encore.</p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {checks.map((txt, i) => (
          <button key={i} onClick={() => toggle(i)} style={{ ...S.checkCard, borderColor: done[i] ? '#2A9490' : 'rgba(255,255,255,0.1)', background: done[i] ? 'rgba(42,148,144,0.15)' : 'rgba(255,255,255,0.04)' }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, border: done[i] ? '2px solid #2A9490' : '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#2A9490', flexShrink: 0 }}>{done[i] ? '✓' : ''}</span>
            <span style={{ color: '#E2E8F0', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{txt}</span>
          </button>
        ))}
      </div>

      {anyDone && <button onClick={onNext} className="fade-in" style={S.nextBtn}>Étape suivante →</button>}
    </div>
  )
}

/* ═══ STEP 3 — VALIDE ═══ */
function Step3Validate({ onNext }) {
  const scripts = [
    'Je vois que tu es très en colère. C\'est normal de ressentir ça.',
    'Je suis là avec toi. Tu es en sécurité.',
    'Prends tout le temps dont tu as besoin.',
  ]
  const [seconds, setSeconds] = useState(120)
  const timerRef = useRef(null)
  const [running, setRunning] = useState(false)

  const startTimer = () => {
    if (running) return
    setRunning(true)
    timerRef.current = setInterval(() => {
      setSeconds((s) => { if (s <= 1) { clearInterval(timerRef.current); return 0 }; return s - 1 })
    }, 1000)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60

  return (
    <div style={S.step}>
      <div style={{ ...S.stepBorder, borderTopColor: '#A8DED1' }} />
      <img src={mamanMain} alt="Maman" style={S.charImg} draggable={false} />
      <h1 style={S.stepTitle}>Valide son émotion</h1>
      <p style={S.stepSub}>Son cerveau est en surchauffe. Il a besoin d'être entendu.</p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {scripts.map((s, i) => (
          <div key={i} style={S.scriptCard}>
            <span style={{ fontSize: 16 }}>💬</span>
            <p style={{ color: '#E2E8F0', fontSize: 14, fontFamily: 'Inter, sans-serif', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>"{s}"</p>
          </div>
        ))}
      </div>

      {/* 2 min timer */}
      <div onClick={startTimer} style={{ textAlign: 'center', marginTop: 16, cursor: 'pointer' }}>
        <p style={{ color: '#A8DED1', fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>Attends au moins 2 minutes avant de parler</p>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 800, color: running ? '#A8DED1' : 'rgba(255,255,255,0.3)' }}>{min}:{sec.toString().padStart(2, '0')}</span>
        {!running && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Tape pour lancer</p>}
      </div>

      <button onClick={onNext} style={S.nextBtn}>Étape suivante →</button>
    </div>
  )
}

/* ═══ STEP 4 — APRÈS ═══ */
function Step4After({ navigate }) {
  const postSteps = [
    'Câlin ou contact physique si il l\'accepte',
    'Parlez de ce qui s\'est passé quand il est prêt (pas avant)',
    'Ne revenez PAS sur les punitions décidées pendant la crise',
  ]

  return (
    <div style={S.step}>
      <div style={{ ...S.stepBorder, borderTopColor: '#2A9490' }} />
      <img src={monstreRigole} alt="Monstre" style={S.charImg} draggable={false} />
      <h1 style={S.stepTitle}>La crise est passée</h1>
      <p style={S.stepSub}>Attends qu'il soit calme. Puis reconnecte.</p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {postSteps.map((txt, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(42,148,144,0.2)', color: '#2A9490', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
            <p style={{ color: '#E2E8F0', fontSize: 14, fontFamily: 'Inter, sans-serif', lineHeight: 1.5, margin: 0 }}>{txt}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 'auto', paddingTop: 24 }}>
        <button onClick={() => navigate('/journal')} style={{ ...S.nextBtn, background: '#2A9490' }}>Logger cette crise</button>
        <button onClick={() => navigate('/')} style={{ ...S.nextBtn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)' }}>Retour à l'accueil</button>
      </div>
    </div>
  )
}

/* ═══ Shared components ═══ */
function ScriptCard({ type, text }) {
  const good = type === 'good'
  return (
    <div style={{
      background: good ? 'rgba(42,148,144,0.15)' : 'rgba(192,80,106,0.15)',
      border: `1px solid ${good ? '#2A9490' : '#C0506A'}`,
      borderRadius: 12, padding: '12px 16px', width: '100%',
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: good ? '#2A9490' : '#E8A0B0' }}>
        {good ? '✅ Dis plutôt' : '❌ Évite'}
      </span>
      <p style={{ fontSize: 15, fontWeight: 600, color: good ? '#2A9490' : '#E8A0B0', marginTop: 6, textDecoration: good ? 'none' : 'line-through', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
        "{text}"
      </p>
    </div>
  )
}

/* ═══ Styles ═══ */
const S = {
  root: { minHeight: '100dvh', background: '#1C1B2E', display: 'flex', flexDirection: 'column' },
  progressRow: { display: 'flex', gap: 4, padding: '48px 16px 0', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 18, cursor: 'pointer', marginLeft: 12, padding: 4 },
  body: { flex: 1, display: 'flex', flexDirection: 'column' },
  step: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '12px 20px 40px', overflowY: 'auto' },
  stepBorder: { width: '100%', borderTop: '4px solid', borderRadius: 2, marginBottom: 4 },
  charImg: { height: 180, objectFit: 'contain' },
  stepTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 700, color: '#fff', textAlign: 'center', margin: 0 },
  stepSub: { fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#94A3B8', textAlign: 'center', margin: '0 0 8px', lineHeight: 1.5 },
  timerWrap: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, cursor: 'pointer', margin: '8px 0' },
  timerText: { position: 'absolute', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 800, color: '#F5E06D' },
  timerHint: { position: 'absolute', bottom: -18, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' },
  checkCard: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1.5px solid', cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' },
  scriptCard: { display: 'flex', gap: 10, alignItems: 'flex-start', background: 'rgba(42,148,144,0.08)', border: '1px solid rgba(42,148,144,0.15)', borderRadius: 12, padding: '12px 16px' },
  nextBtn: { width: '100%', maxWidth: 320, padding: '16px 28px', borderRadius: 999, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#1C1B2E', background: '#F5E06D', border: 'none', cursor: 'pointer', marginTop: 'auto' },
}
