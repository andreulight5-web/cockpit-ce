import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Asset imports — Vite handles spaces, colons and the `~` folder.
import monstreCalin from '../../assets/characters/monstre~/Câlin : attachant.webp'
import monstreSurexcite from '../../assets/characters/monstre~/Surexcité : hyperactif.webp'
import mamanComplice from '../../assets/characters/maman/Complice : qui rigole.webp'
import mamanFiere from '../../assets/characters/maman/Fière de son enfant.webp'
import papaEncourageant from '../../assets/characters/papa/encourageant.webp'

const STORAGE_KEY = 'cockpit_onboarding'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [type, setType] = useState(null) // 'maman' | 'papa'
  const [prenomEnfant, setPrenomEnfant] = useState('')
  const [age, setAge] = useState(8)

  // Skip if already done
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.onboardingDone) {
          navigate('/login', { replace: true })
        }
      }
    } catch {
      // ignore
    }
  }, [navigate])

  const next = () => setStep((s) => Math.min(s + 1, 3))

  const finish = () => {
    const payload = {
      type,
      prenomEnfant: prenomEnfant.trim(),
      age,
      onboardingDone: true,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    navigate('/login', { replace: true })
  }

  const canAdvance = {
    0: true,
    1: !!type,
    2: prenomEnfant.trim().length > 0,
    3: true,
  }[step]

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Slider track */}
      <div
        style={{
          ...styles.track,
          transform: `translateX(-${step * 25}%)`,
        }}
      >
        {/* === SCREEN 1 — Navy === */}
        <section style={{ ...styles.screen, background: '#0F172A' }}>
          <div style={styles.screen1Image}>
            <img
              src={monstreCalin}
              alt="Le Monstre câlin"
              className="bounce-slow"
              style={{ maxHeight: '70vh', maxWidth: '90%', objectFit: 'contain' }}
            />
          </div>
          <div style={styles.screen1Text}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>
              Bonjour 👋
            </p>
            <h1 style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 700, margin: '4px 0 8px' }}>
              Je suis Le Monstre
            </h1>
            <p style={{ color: '#A8DED1', fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
              Je vais t'aider à traverser les crises
            </p>
          </div>
          <button
            onClick={next}
            style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
          >
            Commencer →
          </button>
        </section>

        {/* === SCREEN 2 — Teal === */}
        <section style={{ ...styles.screen, background: '#0D9373', justifyContent: 'flex-start', paddingTop: 80 }}>
          <h2 style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>
            Tu es...
          </h2>
          <div style={styles.choiceRow}>
            <button
              onClick={() => setType('maman')}
              style={{
                ...styles.choiceCard,
                border: type === 'maman' ? '2px solid #FFE17B' : '2px solid transparent',
                transform: type === 'maman' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={mamanComplice}
                alt="Maman"
                style={styles.choiceImg}
              />
              <span style={styles.choiceLabel}>Maman 👩</span>
            </button>
            <button
              onClick={() => setType('papa')}
              style={{
                ...styles.choiceCard,
                border: type === 'papa' ? '2px solid #FFE17B' : '2px solid transparent',
                transform: type === 'papa' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={papaEncourageant}
                alt="Papa"
                style={styles.choiceImg}
              />
              <span style={styles.choiceLabel}>Papa 👨</span>
            </button>
          </div>
          <div style={{ flex: 1 }} />
          {type && (
            <button
              onClick={next}
              className="fade-in"
              style={{ ...styles.btnBase, background: '#FFE17B', color: '#0F172A' }}
            >
              Suivant →
            </button>
          )}
        </section>

        {/* === SCREEN 3 — Pink === */}
        <section style={{ ...styles.screen, background: '#F2B8C6', justifyContent: 'flex-start', paddingTop: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'center', height: '40vh', alignItems: 'center' }}>
            <img
              src={mamanFiere}
              alt="Maman fière"
              style={{ maxHeight: '100%', maxWidth: '70%', objectFit: 'contain' }}
            />
          </div>
          <h2 style={{ color: '#4B1528', fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, textAlign: 'center', margin: '20px 0 24px' }}>
            Comment s'appelle ton enfant ?
          </h2>
          <input
            type="text"
            value={prenomEnfant}
            onChange={(e) => setPrenomEnfant(e.target.value)}
            placeholder="Lucas, Emma..."
            style={styles.nameInput}
          />
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <div style={{ color: '#4B1528', fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 800 }}>
              {age} <span style={{ fontSize: 16, fontWeight: 500 }}>ans</span>
            </div>
            <input
              type="range"
              min={4}
              max={15}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="age-slider"
              style={{ width: '80%', marginTop: 12 }}
            />
          </div>
          <div style={{ flex: 1 }} />
          {canAdvance && (
            <button
              onClick={next}
              className="fade-in"
              style={{ ...styles.btnBase, background: '#0D9373', color: '#FFFFFF' }}
            >
              Suivant →
            </button>
          )}
        </section>

        {/* === SCREEN 4 — Yellow === */}
        <section style={{ ...styles.screen, background: '#FFE17B' }}>
          <div style={styles.screen1Image}>
            <img
              src={monstreSurexcite}
              alt="Le Monstre surexcité"
              className="bounce-fast"
              style={{ maxHeight: '55vh', maxWidth: '90%', objectFit: 'contain' }}
            />
          </div>
          <div style={styles.screen1Text}>
            <h1 style={{ color: '#412402', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>
              C'est parti{prenomEnfant ? ` ${prenomEnfant}` : ''} !
            </h1>
            <p style={{ color: '#633806', fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.5 }}>
              Ton Cockpit est prêt ⚡
            </p>
          </div>
          <button
            onClick={finish}
            style={{ ...styles.btnBase, background: '#0F172A', color: '#FFFFFF' }}
          >
            Entrer dans mon Cockpit
          </button>
        </section>
      </div>

      {/* Progress dots */}
      <div style={styles.dots}>
        {[0, 1, 2, 3].map((i) => (
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

const css = `
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-8px) scale(1.02); }
}
@keyframes bounceFast {
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-12px) scale(1.05); }
}
.bounce-slow {
  animation: bounceSlow 2.4s ease-in-out infinite;
}
.bounce-fast {
  animation: bounceFast 0.6s ease-in-out infinite;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn 0.35s ease-out both;
}
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
`

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
  },
  track: {
    display: 'flex',
    width: '400%',
    height: '100%',
    transition: 'transform 400ms ease',
  },
  screen: {
    width: '25%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '32px 24px 96px',
    boxSizing: 'border-box',
  },
  screen1Image: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  screen1Text: {
    textAlign: 'center',
    padding: '0 16px',
    marginBottom: 24,
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
  },
  choiceCard: {
    flex: 1,
    maxWidth: 150,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    transition: 'transform 0.25s ease, border 0.2s',
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
  nameInput: {
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
  },
}
