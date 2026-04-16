import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QUIZ, MONSTRE_IMAGES } from '../../data/quiz'

function QuizDetailInner({ id }) {
  const navigate = useNavigate()
  const quiz = QUIZ.find((q) => String(q.id) === id)

  const [step, setStep] = useState('video') // 'video' | 'questions' | 'result'
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState([]) // for current question
  const [answers, setAnswers] = useState({})

  if (!quiz) return <div style={{ background: '#1C1B2E', color: '#fff', minHeight: '100dvh', padding: 40 }}>Quiz introuvable</div>

  const color = quiz.couleur
  const question = quiz.questions[qIdx]
  const nextQ = QUIZ.find((q) => q.id === quiz.id + 1)

  const toggleChoice = (choixId) => {
    if (!question.multiselect) {
      setAnswers({ ...answers, [qIdx]: [choixId] })
      // auto-advance
      setTimeout(() => {
        if (qIdx < quiz.questions.length - 1) {
          setQIdx((i) => i + 1); setSelected([])
        } else {
          setStep('result')
        }
      }, 300)
      setSelected([choixId])
      return
    }
    setSelected((prev) => prev.includes(choixId) ? prev.filter((x) => x !== choixId) : [...prev, choixId])
  }

  const validate = () => {
    setAnswers({ ...answers, [qIdx]: selected })
    if (qIdx < quiz.questions.length - 1) {
      setQIdx((i) => i + 1); setSelected([])
    } else {
      setStep('result')
    }
  }

  return (
    <div style={{ background: '#1C1B2E', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={S.header}>
        <button onClick={() => navigate('/quiz')} style={S.backCircle}>‹</button>
        <div style={{ flex: 1 }} />
        {step === 'questions' && <span style={S.count}>{qIdx + 1}/{quiz.questions.length}</span>}
      </div>

      {step === 'video' && <VideoStep quiz={quiz} color={color} onStart={() => setStep('questions')} />}
      {step === 'questions' && <QuestionStep question={question} color={color} selected={selected} onToggle={toggleChoice} onValidate={validate} />}
      {step === 'result' && <ResultStep quiz={quiz} color={color} nextQ={nextQ} navigate={navigate} />}
    </div>
  )
}

/* ══ Video step ══ */
function VideoStep({ quiz, color, onStart }) {
  const thumb = MONSTRE_IMAGES[quiz.video.thumbnail]
  return (
    <div style={S.stepWrap}>
      <div style={S.videoCard}>
        {thumb && <img src={thumb} alt="" style={{ height: 120, objectFit: 'contain', margin: '0 auto 14px' }} draggable={false} />}
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{quiz.video.titre}</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', margin: 0 }}>🎬 Vidéo bientôt disponible</p>
      </div>
      <button onClick={onStart} style={{ ...S.btn, background: color, color: color === '#F5E06D' ? '#1C1B2E' : '#fff', marginTop: 20 }}>
        Passer au quiz →
      </button>
    </div>
  )
}

/* ══ Question step ══ */
function QuestionStep({ question, color, selected, onToggle, onValidate }) {
  return (
    <div style={S.stepWrap}>
      <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 500, color: '#fff', textAlign: 'center', padding: '0 24px', marginBottom: 24, lineHeight: 1.4 }}>{question.texte}</h2>

      <div style={S.grid}>
        {question.choix.map((c) => {
          const isSel = selected.includes(c.id)
          const bg = isSel ? `${color}4d` : 'rgba(255,255,255,0.06)'
          const border = isSel ? `2px solid ${color}` : '2px solid transparent'
          if (question.type === 'monstre_humeur') {
            const img = MONSTRE_IMAGES[c.img]
            return (
              <button key={c.id} onClick={() => onToggle(c.id)} style={{ ...S.choiceCard, background: bg, border }}>
                {img && <img src={img} alt={c.texte} style={{ height: 64, objectFit: 'contain' }} draggable={false} />}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', marginTop: 8 }}>{c.texte}</span>
              </button>
            )
          }
          return (
            <button key={c.id} onClick={() => onToggle(c.id)} style={{ ...S.choiceCard, background: bg, border }}>
              <span style={{ fontSize: 36 }}>{c.picto}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', marginTop: 8, textAlign: 'center', lineHeight: 1.3 }}>{c.texte}</span>
            </button>
          )
        })}
      </div>

      {question.multiselect && selected.length > 0 && (
        <button onClick={onValidate} style={{ ...S.btn, background: color, color: color === '#F5E06D' ? '#1C1B2E' : '#fff', marginTop: 24 }}>
          Valider →
        </button>
      )}
    </div>
  )
}

/* ══ Result step ══ */
function ResultStep({ quiz, color, nextQ, navigate }) {
  const [confetti] = useState(() =>
    Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.2 + Math.random() * 1.6,
      size: 16 + Math.random() * 16,
    }))
  )
  const monstreRigole = MONSTRE_IMAGES['monstre-rigole.webp']

  return (
    <div style={{ ...S.stepWrap, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {confetti.map((c, i) => (
          <span key={i} className="confetti-q" style={{ position: 'absolute', left: `${c.left}%`, top: 0, color, fontSize: c.size, animation: `confettiFall ${c.duration}s linear ${c.delay}s forwards` }}>●</span>
        ))}
      </div>
      <style>{`@keyframes confettiFall { 0% { transform: translateY(-10vh); opacity:1 } 100% { transform: translateY(110vh); opacity:0 } }`}</style>

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        {monstreRigole && <img src={monstreRigole} alt="" className="sway" style={{ height: 180, objectFit: 'contain' }} draggable={false} />}
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 800, color: '#fff', marginTop: 16 }}>Bravo Lucas ! 🌟</h2>
        <div style={{ display: 'inline-block', marginTop: 16, background: `${color}33`, border: `1px solid ${color}`, borderRadius: 99, padding: '8px 16px', color: '#fff', fontSize: 14, fontWeight: 600 }}>{quiz.badge}</div>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 24, color: '#F5E06D', fontWeight: 700, marginTop: 20 }}>+{quiz.xp} XP</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32, zIndex: 1 }}>
        {nextQ && <button onClick={() => navigate(`/quiz/${nextQ.id}`)} style={{ ...S.btn, background: color, color: color === '#F5E06D' ? '#1C1B2E' : '#fff' }}>Quiz suivant →</button>}
        <button onClick={() => navigate('/quiz')} style={{ ...S.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>Retour</button>
      </div>
    </div>
  )
}

export default function QuizDetail() {
  const { id } = useParams()
  return <QuizDetailInner key={id} id={id} />
}

const S = {
  header: { position: 'fixed', top: 0, left: 0, right: 0, maxWidth: 430, margin: '0 auto', zIndex: 10, display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'linear-gradient(to bottom, rgba(28,27,46,0.95) 0%, rgba(28,27,46,0) 100%)' },
  backCircle: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  count: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  stepWrap: { flex: 1, padding: '80px 20px 40px', display: 'flex', flexDirection: 'column' },
  videoCard: { background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 4px' },
  choiceCard: { background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: 120, transition: 'background 0.2s, border 0.2s' },
  btn: { display: 'block', width: '100%', maxWidth: 320, margin: '0 auto', padding: '14px 28px', borderRadius: 50, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' },
}
