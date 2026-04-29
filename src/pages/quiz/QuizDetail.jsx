import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QUIZ } from '../../data/quiz'
import { AppContext } from '../../lib/AppContext'

function QuizDetailInner({ id }) {
  const navigate = useNavigate()
  const { appData, saveData } = useContext(AppContext)
  const quiz = QUIZ.find((q) => String(q.id) === id)

  const [step, setStep] = useState('intro')   // 'intro' | 'questions' | 'feedback' | 'result'
  const [qIdx, setQIdx] = useState(0)
  const [picked, setPicked] = useState(null)  // option object courante
  const [answers, setAnswers] = useState([])  // [{ qId, optionId, score }]
  const [xpAwarded, setXpAwarded] = useState(false)

  const totalScore = useMemo(() => answers.reduce((s, a) => s + a.score, 0), [answers])
  const maxScore = (quiz?.questions.length || 0) * 3

  useEffect(() => {
    if (step !== 'result' || !quiz || !saveData || xpAwarded) return
    setXpAwarded(true)

    try {
      const done = JSON.parse(localStorage.getItem('cockpit_quiz_done') || '[]')
      if (!done.includes(quiz.id)) {
        done.push(quiz.id)
        localStorage.setItem('cockpit_quiz_done', JSON.stringify(done))
      }
    } catch { /* ignore */ }

    const quizDone = appData?.quiz_done || []
    if (quizDone.some((x) => String(x) === String(quiz.id))) return
    const badges = appData?.badges || []
    const xpTotal = appData?.xp_total || 0
    saveData({
      quiz_done: [...quizDone, quiz.id],
      xp_total: xpTotal + (quiz.xp || 0),
      badges: badges.includes(quiz.badge) ? badges : [...badges, quiz.badge],
    })
  }, [step, quiz, saveData, appData, xpAwarded])

  if (!quiz) return <div style={{ background: '#1C1B2E', color: '#fff', minHeight: '100dvh', padding: 40 }}>Quiz introuvable</div>

  const color = quiz.couleur
  const question = quiz.questions[qIdx]
  const nextQ = QUIZ.find((q) => q.id === quiz.id + 1)

  const choose = (option) => {
    setPicked(option)
    setAnswers((prev) => [...prev, { qId: question.id, optionId: option.id, score: option.score }])
    setStep('feedback')
  }

  const continueAfterFeedback = () => {
    setPicked(null)
    if (qIdx < quiz.questions.length - 1) {
      setQIdx((i) => i + 1)
      setStep('questions')
    } else {
      setStep('result')
    }
  }

  const restart = () => {
    setQIdx(0); setPicked(null); setAnswers([]); setStep('intro')
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button onClick={() => navigate('/quiz')} style={S.backCircle}>‹</button>
        <div style={{ flex: 1 }} />
        {step === 'questions' && <span style={S.count}>{qIdx + 1}/{quiz.questions.length}</span>}
        {step === 'feedback' && <span style={S.count}>{qIdx + 1}/{quiz.questions.length}</span>}
      </div>

      {step === 'intro' && <IntroStep quiz={quiz} color={color} onStart={() => setStep('questions')} />}

      {step === 'questions' && (
        <QuestionStep question={question} color={color} qIdx={qIdx} total={quiz.questions.length} onChoose={choose} />
      )}

      {step === 'feedback' && picked && (
        <FeedbackStep
          picked={picked}
          color={color}
          isLast={qIdx === quiz.questions.length - 1}
          onContinue={continueAfterFeedback}
        />
      )}

      {step === 'result' && (
        <ResultStep quiz={quiz} color={color} totalScore={totalScore} maxScore={maxScore} answers={answers} nextQ={nextQ} onRestart={restart} navigate={navigate} />
      )}
    </div>
  )
}

/* ══════════════════ INTRO ══════════════════ */
function IntroStep({ quiz, color, onStart }) {
  return (
    <div style={S.stepWrap}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 8px' }}>
        <div style={{ fontSize: 80, marginBottom: 12 }}>{quiz.emoji}</div>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>{quiz.titre}</h1>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color, margin: 0 }}>{quiz.sousTitre}</p>

        <div style={{ marginTop: 28, padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 360, width: '100%' }}>
          <div style={{ ...S.metaRow, marginBottom: 6 }}>
            <span style={S.metaLabel}>Format</span>
            <span style={S.metaValue}>{quiz.questions.length} situations</span>
          </div>
          <div style={S.metaRow}>
            <span style={S.metaLabel}>Récompense</span>
            <span style={S.metaValue}>+{quiz.xp} XP · {quiz.badge}</span>
          </div>
        </div>

        {!quiz.video.disponible && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>
            🎬 Vidéo bientôt disponible
          </p>
        )}
      </div>

      <button onClick={onStart} style={{ ...S.btn, background: color, color: color === '#F5E06D' || color === '#E8B84B' ? '#1C1B2E' : '#fff', marginTop: 20 }}>
        Commencer →
      </button>
    </div>
  )
}

/* ══════════════════ QUESTION ══════════════════ */
function QuestionStep({ question, color, qIdx, total, onChoose }) {
  return (
    <div style={S.stepWrap}>
      {/* Progression */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((qIdx + 1) / total) * 100}%`, background: color, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Scénario */}
      <div style={{ ...S.scenarioCard, borderLeft: `3px solid ${color}` }}>
        <span style={{ ...S.scenarioLabel, color }}>SITUATION</span>
        <p style={S.scenarioText}>{question.scenario}</p>
      </div>

      {/* Question */}
      <h2 style={S.questionTitle}>{question.question}</h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, i) => (
          <button key={opt.id} onClick={() => onChoose(opt)} style={{ ...S.optionCard, animationDelay: `${i * 60}ms` }} className="fade-up">
            <span style={{ ...S.optionLetter, background: 'rgba(255,255,255,0.08)' }}>{opt.id.toUpperCase()}</span>
            <span style={S.optionText}>{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════ FEEDBACK ══════════════════ */
function FeedbackStep({ picked, color, isLast, onContinue }) {
  const tier = scoreToTier(picked.score)
  return (
    <div style={S.stepWrap}>
      <div className="fade-up" style={{ ...S.feedbackCard, borderColor: tier.borderColor, background: tier.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ ...S.scoreBadge, background: tier.dotBg }}>{tier.icon}</div>
          <div>
            <div style={{ ...S.tierLabel, color: tier.borderColor }}>{tier.label}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>+{picked.score} point{picked.score > 1 ? 's' : ''} sur 3</div>
          </div>
        </div>

        <div style={S.pickedQuote}>
          <span style={S.pickedLetter}>{picked.id.toUpperCase()}</span>
          <span style={{ flex: 1 }}>{picked.text}</span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '14px 0' }} />

        <p style={S.feedbackText}>{picked.feedback}</p>
      </div>

      <button onClick={onContinue} style={{ ...S.btn, background: color, color: color === '#F5E06D' || color === '#E8B84B' ? '#1C1B2E' : '#fff', marginTop: 20 }}>
        {isLast ? 'Voir mon score →' : 'Question suivante →'}
      </button>
    </div>
  )
}

/* ══════════════════ RESULT ══════════════════ */
function ResultStep({ quiz, color, totalScore, maxScore, answers, nextQ, onRestart, navigate }) {
  const verdict = verdictForTotal(totalScore)
  const pct = Math.round((totalScore / maxScore) * 100)
  const [confetti] = useState(() => totalScore >= 7
    ? Array.from({ length: 26 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        duration: 2 + Math.random() * 1.4,
        size: 12 + Math.random() * 14,
      }))
    : [])

  return (
    <div style={{ ...S.stepWrap, position: 'relative', overflow: 'hidden' }}>
      {confetti.length > 0 && (
        <>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {confetti.map((c, i) => (
              <span key={i} style={{ position: 'absolute', left: `${c.left}%`, top: 0, color, fontSize: c.size, animation: `confettiFall ${c.duration}s linear ${c.delay}s forwards` }}>●</span>
            ))}
          </div>
          <style>{`@keyframes confettiFall { 0% { transform: translateY(-10vh); opacity:1 } 100% { transform: translateY(110vh); opacity:0 } }`}</style>
        </>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontSize: 64, marginBottom: 6 }}>{verdict.emoji}</div>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', margin: '6px 0 4px', lineHeight: 1.25 }}>{verdict.titre}</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: '0 16px', lineHeight: 1.5 }}>{verdict.sub}</p>

        {/* Score circulaire */}
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
          <div style={{ ...S.scoreRing, borderColor: color }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 800, color, lineHeight: 1 }}>{totalScore}<span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>/{maxScore}</span></div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: 1 }}>{pct}%</div>
          </div>
        </div>

        {/* Détail des réponses */}
        <div style={{ marginTop: 22, padding: '0 8px', display: 'grid', gap: 6, justifyItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {answers.map((a, i) => {
              const t = scoreToTier(a.score)
              return (
                <div key={i} style={{ ...S.miniDot, background: t.dotBg, borderColor: t.borderColor }} title={`Q${i + 1} — ${a.score}/3`}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: t.borderColor }}>Q{i + 1}</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff' }}>{a.score}</span>
                </div>
              )
            })}
          </div>
        </div>

        {totalScore >= 7 && (
          <div style={{ marginTop: 20, display: 'inline-block', alignSelf: 'center', background: `${color}33`, border: `1px solid ${color}`, borderRadius: 99, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            🏅 Badge débloqué : {quiz.badge}
          </div>
        )}
        {totalScore >= 7 && (
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#F5E06D', fontWeight: 700, marginTop: 12 }}>+{quiz.xp} XP</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, zIndex: 1 }}>
        <button onClick={onRestart} style={{ ...S.btn, background: 'transparent', border: `1px solid ${color}`, color }}>
          ↻ Refaire ce quiz
        </button>
        {nextQ && (
          <button onClick={() => navigate(`/quiz/${nextQ.id}`)} style={{ ...S.btn, background: color, color: color === '#F5E06D' || color === '#E8B84B' ? '#1C1B2E' : '#fff' }}>
            Quiz suivant : {nextQ.titre} →
          </button>
        )}
        {!nextQ && (
          <button onClick={() => navigate('/quiz')} style={{ ...S.btn, background: color, color: color === '#F5E06D' || color === '#E8B84B' ? '#1C1B2E' : '#fff' }}>
            Retour aux quiz
          </button>
        )}
        <button onClick={() => navigate('/')} style={{ ...S.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
          Accueil
        </button>
      </div>
    </div>
  )
}

/* ══════════════════ HELPERS ══════════════════ */
function scoreToTier(score) {
  if (score === 3) return { label: 'Réflexe de pro', icon: '🏆', borderColor: '#2A9490', dotBg: 'rgba(42,148,144,0.2)', bg: 'rgba(42,148,144,0.08)' }
  if (score === 2) return { label: 'Bonne réponse', icon: '💪', borderColor: '#F5E06D', dotBg: 'rgba(245,224,109,0.18)', bg: 'rgba(245,224,109,0.06)' }
  if (score === 1) return { label: 'Compréhensible mais…', icon: '🤔', borderColor: '#F5A623', dotBg: 'rgba(245,166,35,0.18)', bg: 'rgba(245,166,35,0.06)' }
  return { label: 'À éviter', icon: '🌱', borderColor: '#C0506A', dotBg: 'rgba(192,80,106,0.18)', bg: 'rgba(192,80,106,0.06)' }
}

function verdictForTotal(total) {
  if (total >= 7) return { emoji: '🏆', titre: 'Réflexes de pro', sub: 'Tu as les bons automatismes face à cette situation. Continue d\'entraîner ton cerveau à froid.' }
  if (total >= 4) return { emoji: '💪', titre: 'Sur la bonne voie', sub: 'Tu comprends les mécanismes. Quelques ajustements et c\'est bon — relis les feedbacks.' }
  return { emoji: '🌱', titre: 'En apprentissage', sub: 'Normal — personne ne nous apprend ça. Voici ce que tu peux installer dès cette semaine.' }
}

export default function QuizDetail() {
  const { id } = useParams()
  return <QuizDetailInner key={id} id={id} />
}

const S = {
  page: { background: '#1C1B2E', minHeight: '100dvh', display: 'flex', flexDirection: 'column' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, maxWidth: 430, margin: '0 auto', zIndex: 10, display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'linear-gradient(to bottom, rgba(28,27,46,0.95) 0%, rgba(28,27,46,0) 100%)' },
  backCircle: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  count: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  stepWrap: { flex: 1, padding: '72px 18px 28px', display: 'flex', flexDirection: 'column', maxWidth: 430, margin: '0 auto', width: '100%' },

  /* Intro */
  metaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  metaLabel: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 },
  metaValue: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#fff', fontWeight: 600 },

  /* Question */
  scenarioCard: { background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 14, marginBottom: 16 },
  scenarioLabel: { fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' },
  scenarioText: { fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#E2E8F0', lineHeight: 1.6, margin: '6px 0 0' },
  questionTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 14px', lineHeight: 1.4 },
  optionCard: { display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s, border-color 0.15s' },
  optionLetter: { fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 800, color: '#fff', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  optionText: { fontSize: 13.5, color: '#E2E8F0', lineHeight: 1.5, flex: 1 },

  /* Feedback */
  feedbackCard: { borderRadius: 14, padding: 16, border: '1px solid' },
  scoreBadge: { width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 },
  tierLabel: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 0.4 },
  pickedQuote: { display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 },
  pickedLetter: { fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: 8, flexShrink: 0, marginTop: 2 },
  feedbackText: { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', lineHeight: 1.6, margin: 0 },

  /* Result */
  scoreRing: { width: 130, height: 130, borderRadius: '50%', border: '3px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' },
  miniDot: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 12, border: '1px solid' },

  /* Buttons */
  btn: { display: 'block', width: '100%', maxWidth: 400, margin: '0 auto', padding: '14px 28px', borderRadius: 50, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' },
}
