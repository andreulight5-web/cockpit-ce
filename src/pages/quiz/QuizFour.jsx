import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUIZ_4 } from '../../data/quiz-4'
import { AppContext } from '../../lib/AppContext'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'

const TEAL = '#2A9490'
const CREAM = '#FAFAF5'
const DARK = '#1C1B2E'
const YELLOW = '#F5E06D'
const ROSE = '#C0506A'

const fmt = (ms) => {
  const sec = Math.floor(ms / 1000)
  const cs  = Math.floor((ms % 1000) / 10)
  return `${sec}.${String(cs).padStart(2, '0')} s`
}

export default function QuizFour() {
  const navigate = useNavigate()
  const { appData, saveData } = useContext(AppContext)

  const [step, setStep]     = useState('intro')   // 'intro' | 'question' | 'recap'
  const [qIdx, setQIdx]     = useState(0)
  const [answers, setAnswers] = useState({})      // { qId: { value, ... } }
  const [showFeedback, setShowFeedback] = useState(false)

  const question = QUIZ_4.questions[qIdx]
  const total = QUIZ_4.questions.length

  const handleBack = () => navigate('/outils')

  const handleAnswer = (qId, value) => {
    setAnswers((a) => ({ ...a, [qId]: value }))
    setShowFeedback(true)
  }

  const handleNext = () => {
    setShowFeedback(false)
    if (qIdx + 1 < total) {
      setQIdx(qIdx + 1)
    } else {
      // Fin du quiz — save
      const defi = answers[5]?.value || null
      try {
        const done = JSON.parse(localStorage.getItem('cockpit_quiz_done') || '[]')
        if (!done.includes(4)) {
          done.push(4)
          localStorage.setItem('cockpit_quiz_done', JSON.stringify(done))
        }
      } catch { /* ignore */ }
      if (saveData) {
        const quizDone = appData?.quiz_done || []
        const newQuizDone = quizDone.some((x) => String(x) === '4') ? quizDone : [...quizDone, 4]
        saveData({
          quiz_done: newQuizDone,
          quiz_4_defi: defi,
          xp_total: (appData?.xp_total || 0) + (newQuizDone.length === quizDone.length ? 0 : 30),
        })
      }
      setStep('recap')
    }
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <button onClick={handleBack} style={s.back} aria-label="Retour">←</button>
        <div style={s.headerCenter}>
          <div style={s.headerTitle}>{QUIZ_4.title}</div>
          {step === 'question' && (
            <div style={s.headerProgress}>Question {qIdx + 1}/{total}</div>
          )}
        </div>
        <div style={{ width: 36 }} />
      </header>

      {/* Progress bar (questions only) */}
      {step === 'question' && (
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${((qIdx + 1) / total) * 100}%` }} />
        </div>
      )}

      <main style={s.body}>
        {step === 'intro'    && <Intro onStart={() => setStep('question')} />}

        {step === 'question' && (
          <QuestionStep
            question={question}
            answer={answers[question.id]}
            showFeedback={showFeedback}
            onAnswer={(value) => handleAnswer(question.id, value)}
            onNext={handleNext}
          />
        )}

        {step === 'recap' && (
          <Recap defi={answers[5]?.value} onNext={() => navigate('/quiz/5')} onSommaire={() => navigate('/quiz')} />
        )}
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* INTRO                                              */
/* ═══════════════════════════════════════════════════ */
function Intro({ onStart }) {
  return (
    <div style={s.card}>
      <p style={s.videoDesc}>{QUIZ_4.videoDescription}</p>

      {QUIZ_4.videoUrl ? (
        <div style={s.videoWrap}>
          <div style={s.videoFrame}>
            <iframe
              src={QUIZ_4.videoUrl}
              title="Vidéo du quiz"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={s.videoIframe}
            />
          </div>
        </div>
      ) : (
        <div style={s.videoPlaceholder}>
          <span style={{ fontSize: 36, marginBottom: 8 }}>🎬</span>
          <div style={s.videoLabel}>Vidéo bientôt disponible</div>
        </div>
      )}

      <h1 style={s.introTitle}>{QUIZ_4.title}</h1>
      <p style={s.introDesc}>
        Un mini-coaching à faire avec ton enfant — 5 questions, 5 minutes. Pas de bonne ou mauvaise réponse, juste mieux se connaître.
      </p>

      <button onClick={onStart} style={s.primaryBtn}>
        Commencer le quiz →
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* QUESTION dispatcher                                */
/* ═══════════════════════════════════════════════════ */
function QuestionStep({ question, answer, showFeedback, onAnswer, onNext }) {
  return (
    <div style={s.card}>
      <div style={s.qEmoji}>{question.emoji}</div>
      <h2 style={s.qTitle}>{question.question}</h2>

      {question.type === 'single_choice' && (
        <SingleChoice
          question={question}
          answer={answer}
          showFeedback={showFeedback}
          onAnswer={onAnswer}
        />
      )}

      {question.type === 'timer_challenge' && (
        <TimerChallenge
          question={question}
          answer={answer}
          showFeedback={showFeedback}
          onAnswer={onAnswer}
        />
      )}

      {question.type === 'ordering' && (
        <Ordering
          question={question}
          answer={answer}
          showFeedback={showFeedback}
          onAnswer={onAnswer}
        />
      )}

      {showFeedback && (
        <>
          <FeedbackBox text={question.feedback} extra={answer?.feedbackExtra} />
          <button onClick={onNext} style={s.primaryBtn}>
            {question.isChallenge ? 'Voir mon défi →' : 'Question suivante →'}
          </button>
        </>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* SINGLE CHOICE                                      */
/* ═══════════════════════════════════════════════════ */
function SingleChoice({ question, answer, showFeedback, onAnswer }) {
  return (
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((opt) => {
        const isPicked = answer?.value === opt
        return (
          <button
            key={opt}
            onClick={() => !showFeedback && onAnswer({ value: opt })}
            disabled={showFeedback}
            style={{
              ...s.optionBtn,
              borderColor: isPicked ? TEAL : 'rgba(28,27,46,0.12)',
              background:  isPicked ? 'rgba(42,148,144,0.08)' : '#fff',
              cursor: showFeedback ? 'default' : 'pointer',
            }}
          >
            <span style={{ ...s.optionRadio, borderColor: isPicked ? TEAL : 'rgba(28,27,46,0.2)', background: isPicked ? TEAL : 'transparent' }}>
              {isPicked && <span style={s.optionDot} />}
            </span>
            <span style={s.optionLabel}>{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* TIMER CHALLENGE                                    */
/* ═══════════════════════════════════════════════════ */
function TimerChallenge({ question, answer, showFeedback, onAnswer }) {
  const [phase, setPhase] = useState('idle')   // 'idle' | 'running' | 'stopped'
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const tick = () => {
    setElapsed(Date.now() - startRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }

  const start = () => {
    setElapsed(0)
    startRef.current = Date.now()
    setPhase('running')
    rafRef.current = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setElapsed(Date.now() - startRef.current)
    setPhase('stopped')
  }

  const reset = () => {
    setPhase('idle')
    setElapsed(0)
  }

  const elapsedSec = elapsed / 1000
  const targetSec = question.timerDuration || 60
  const targetLabel = targetSec >= 60 ? `${targetSec / 60} min` : `${targetSec} s`
  const targetSentence = targetSec >= 60 ? `${targetSec / 60} minute${targetSec >= 120 ? 's' : ''}` : `${targetSec} secondes`
  const offsetFromTarget = elapsedSec - targetSec

  return (
    <div style={{ marginTop: 18 }}>
      <p style={s.instruction}>{question.instruction}</p>

      <div style={s.timerCard}>
        <CircularTimer elapsedMs={elapsed} max={targetSec * 1000} targetLabel={targetLabel} running={phase === 'running'} />

        {phase === 'idle' && (
          <button onClick={start} style={{ ...s.timerBtn, background: TEAL, color: '#fff' }}>
            ▶ Lancer le chrono
          </button>
        )}
        {phase === 'running' && (
          <button onClick={stop} style={{ ...s.timerBtn, background: ROSE, color: '#fff' }}>
            ⏹ Stop (mon enfant a dit STOP)
          </button>
        )}
        {phase === 'stopped' && (
          <>
            <div style={s.timerResult}>
              <div style={s.timerResultLabel}>Temps écoulé</div>
              <div style={s.timerResultValue}>{fmt(elapsed)}</div>
              <div style={s.timerResultDelta}>
                {offsetFromTarget > 0
                  ? `+${offsetFromTarget.toFixed(1)}s de plus que ${targetSentence}`
                  : offsetFromTarget < 0
                    ? `${offsetFromTarget.toFixed(1)}s de moins que ${targetSentence}`
                    : `Pile ${targetSentence} !`}
              </div>
            </div>
            <button onClick={reset} style={{ ...s.timerBtn, background: 'transparent', color: DARK, border: '1px solid rgba(28,27,46,0.15)' }}>
              Recommencer
            </button>
          </>
        )}
      </div>

      {phase === 'stopped' && !showFeedback && (
        <>
          <p style={{ ...s.instruction, marginTop: 18 }}>Et toi, comment tu te sens par rapport à ton « stop » ?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((opt) => {
              const isPicked = answer?.value === opt
              return (
                <button
                  key={opt}
                  onClick={() => onAnswer({ value: opt, elapsed })}
                  style={{
                    ...s.optionBtn,
                    borderColor: isPicked ? TEAL : 'rgba(28,27,46,0.12)',
                    background:  isPicked ? 'rgba(42,148,144,0.08)' : '#fff',
                  }}
                >
                  <span style={{ ...s.optionRadio, borderColor: isPicked ? TEAL : 'rgba(28,27,46,0.2)', background: isPicked ? TEAL : 'transparent' }}>
                    {isPicked && <span style={s.optionDot} />}
                  </span>
                  <span style={s.optionLabel}>{opt}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function CircularTimer({ elapsedMs, max, running, targetLabel = '1 min' }) {
  const pct = Math.min(elapsedMs / max, 1)
  const r = 56
  const C = 2 * Math.PI * r
  const offset = C * (1 - pct)
  return (
    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 18px' }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} stroke="rgba(28,27,46,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="70" cy="70" r={r}
          stroke={running ? TEAL : DARK}
          strokeWidth="10"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: running ? 'none' : 'stroke-dashoffset 0.3s' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 28, color: DARK }}>
          {fmt(elapsedMs)}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(28,27,46,0.5)' }}>
          objectif : {targetLabel}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* ORDERING                                           */
/* ═══════════════════════════════════════════════════ */
function Ordering({ question, answer, showFeedback, onAnswer }) {
  const [items, setItems] = useState(() => [...question.items])

  const move = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
  }

  const validate = () => {
    // Sort by correctOrder for the canonical solution
    const correctOrdered = [...question.items].sort((a, b) => a.correctOrder - b.correctOrder)
    const userOrderIds = items.map((i) => i.id).join(',')
    const correctOrderIds = correctOrdered.map((i) => i.id).join(',')
    const isCorrect = userOrderIds === correctOrderIds

    const feedbackExtra = !isCorrect
      ? `Bien essayé ! Voici l'ordre idéal :\n${correctOrdered.map((i, j) => `${j + 1}. ${i.label}`).join('\n')}`
      : null

    onAnswer({ value: items.map((i) => i.id), feedbackExtra })
  }

  return (
    <div style={{ marginTop: 18 }}>
      <p style={s.instruction}>{question.instruction}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, idx) => (
          <div key={it.id} style={s.orderRow}>
            <div style={s.orderRank}>{idx + 1}</div>
            <div style={s.orderLabel}>{it.label}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => move(idx, -1)}
                disabled={idx === 0 || showFeedback}
                style={{ ...s.orderBtn, opacity: idx === 0 ? 0.3 : 1 }}
                aria-label="Monter"
              >↑</button>
              <button
                onClick={() => move(idx, +1)}
                disabled={idx === items.length - 1 || showFeedback}
                style={{ ...s.orderBtn, opacity: idx === items.length - 1 ? 0.3 : 1 }}
                aria-label="Descendre"
              >↓</button>
            </div>
          </div>
        ))}
      </div>

      {!showFeedback && (
        <button onClick={validate} style={{ ...s.primaryBtn, marginTop: 18 }}>
          Valider mon ordre →
        </button>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* FEEDBACK                                           */
/* ═══════════════════════════════════════════════════ */
function FeedbackBox({ text, extra }) {
  return (
    <div style={s.feedback}>
      <div style={s.feedbackBadge}>💡 Le saviez-tu</div>
      <div style={s.feedbackText}>{text}</div>
      {extra && (
        <div style={s.feedbackExtra}>{extra}</div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* RECAP                                              */
/* ═══════════════════════════════════════════════════ */
function Recap({ defi, onNext, onSommaire }) {
  return (
    <div style={{ ...s.card, textAlign: 'center' }}>
      <img src={monstreRigole} alt="" style={s.monstreImg} />
      <div style={s.recapKicker}>BRAVO !</div>
      <h2 style={s.recapTitle}>Tu connais mieux ton cerveau matinal.</h2>
      <p style={s.recapSub}>
        Ton défi de la semaine :
      </p>
      <div style={s.recapDefi}>{defi || 'Le secret que tu veux essayer'}</div>
      <p style={s.recapHint}>
        Essaie-le pendant <strong>5 matins</strong>. Si ça marche, pose une carte victoire sur ton tableau.
      </p>
      {onNext && (
        <button onClick={onNext} style={s.primaryBtn}>
          Quiz suivant →
        </button>
      )}
      <button onClick={onSommaire} style={s.secondaryBtn}>
        Sommaire des quiz
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* STYLES                                             */
/* ═══════════════════════════════════════════════════ */
const s = {
  page: {
    minHeight: '100dvh',
    background: CREAM,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    paddingTop: 'calc(14px + env(safe-area-inset-top))',
    background: '#fff',
    borderBottom: '1px solid rgba(28,27,46,0.06)',
  },
  back: {
    width: 36, height: 36, borderRadius: '50%',
    border: '1px solid rgba(28,27,46,0.1)',
    background: '#fff', color: DARK,
    fontSize: 18, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  headerCenter: { flex: 1, minWidth: 0, textAlign: 'center' },
  headerTitle: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
    color: DARK, lineHeight: 1.2,
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  headerProgress: {
    fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(28,27,46,0.55)',
    marginTop: 2,
  },
  progressBar: {
    height: 3, background: 'rgba(28,27,46,0.06)',
  },
  progressFill: {
    height: '100%', background: TEAL, transition: 'width 0.4s',
  },

  body: { padding: '20px 16px 32px', maxWidth: 540, margin: '0 auto' },
  card: {
    background: '#fff',
    border: '1px solid rgba(28,27,46,0.08)',
    borderRadius: 16,
    padding: 22,
  },

  /* INTRO */
  monstreImg: { width: 100, height: 100, objectFit: 'contain' },
  videoPlaceholder: {
    background: 'rgba(42,148,144,0.06)',
    border: '1px dashed rgba(42,148,144,0.35)',
    borderRadius: 12,
    padding: 18,
    textAlign: 'center',
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoLabel: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
    color: TEAL, marginBottom: 4,
  },
  videoDesc: {
    fontFamily: 'Inter, sans-serif', fontSize: 13.5,
    color: DARK, lineHeight: 1.55,
    margin: '0 0 14px',
    textAlign: 'center',
  },
  videoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 18,
  },
  videoFrame: {
    width: '100%',
    maxWidth: 281,          // 500 × (9/16) — format YouTube Short 9:16
    aspectRatio: '9 / 16',
    maxHeight: 500,
    borderRadius: 16,
    overflow: 'hidden',
    background: '#000',
    boxShadow: '0 10px 30px rgba(28,27,46,0.15)',
  },
  videoIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  introTitle: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20,
    color: DARK, margin: '0 0 8px', lineHeight: 1.2,
  },
  introDesc: {
    fontFamily: 'Inter, sans-serif', fontSize: 13.5,
    color: 'rgba(28,27,46,0.65)', lineHeight: 1.6, margin: '0 0 18px',
  },

  /* QUESTION */
  qEmoji: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  qTitle: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17,
    color: DARK, margin: 0, lineHeight: 1.35, textAlign: 'center',
  },
  instruction: {
    fontFamily: "'Caveat', cursive", fontSize: 18,
    color: TEAL, margin: '12px 0 14px', lineHeight: 1.35, textAlign: 'center',
  },

  /* OPTIONS */
  optionBtn: {
    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
    padding: '14px 16px',
    border: '2px solid rgba(28,27,46,0.12)',
    borderRadius: 12,
    background: '#fff',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'left',
  },
  optionRadio: {
    width: 22, height: 22, borderRadius: '50%',
    border: '2px solid rgba(28,27,46,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  optionDot: { width: 10, height: 10, borderRadius: '50%', background: '#fff' },
  optionLabel: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, color: DARK,
    lineHeight: 1.4, flex: 1,
  },

  /* TIMER */
  timerCard: {
    background: 'rgba(28,27,46,0.03)',
    borderRadius: 14,
    padding: 18,
    textAlign: 'center',
  },
  timerBtn: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 50,
    border: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700, fontSize: 14,
    cursor: 'pointer',
    marginTop: 6,
  },
  timerResult: {
    marginTop: 8, marginBottom: 12,
  },
  timerResultLabel: {
    fontFamily: 'Inter, sans-serif', fontSize: 11,
    color: 'rgba(28,27,46,0.55)', textTransform: 'uppercase', letterSpacing: 1.2,
    fontWeight: 600,
  },
  timerResultValue: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 28,
    color: DARK, marginTop: 4,
  },
  timerResultDelta: {
    fontFamily: "'Caveat', cursive", fontSize: 17, color: ROSE, marginTop: 4,
  },

  /* ORDERING */
  orderRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    background: '#fff',
    border: '2px solid rgba(28,27,46,0.12)',
    borderRadius: 12,
    padding: '12px 14px',
  },
  orderRank: {
    width: 28, height: 28, borderRadius: '50%',
    background: TEAL, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
    flexShrink: 0,
  },
  orderLabel: {
    flex: 1, minWidth: 0,
    fontFamily: 'Inter, sans-serif', fontSize: 14, color: DARK,
  },
  orderBtn: {
    width: 38, height: 38, borderRadius: 10,
    border: '1px solid rgba(28,27,46,0.15)',
    background: '#fff', color: DARK,
    fontSize: 18, fontWeight: 700,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  /* FEEDBACK */
  feedback: {
    background: 'rgba(42,148,144,0.08)',
    border: '1px solid rgba(42,148,144,0.25)',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  feedbackBadge: {
    fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 800,
    color: TEAL, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6,
  },
  feedbackText: {
    fontFamily: 'Inter, sans-serif', fontSize: 13.5,
    color: DARK, lineHeight: 1.6,
  },
  feedbackExtra: {
    fontFamily: 'Inter, sans-serif', fontSize: 13,
    color: DARK, lineHeight: 1.6,
    marginTop: 10, paddingTop: 10,
    borderTop: '1px solid rgba(42,148,144,0.2)',
    whiteSpace: 'pre-line',
  },

  /* CTA */
  primaryBtn: {
    width: '100%',
    background: YELLOW, color: DARK,
    border: 'none', borderRadius: 50,
    padding: '14px 18px',
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14,
    cursor: 'pointer', marginTop: 18,
  },
  secondaryBtn: {
    width: '100%',
    background: 'transparent', color: DARK,
    border: '1px solid rgba(28,27,46,0.15)', borderRadius: 50,
    padding: '12px 18px',
    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
    cursor: 'pointer', marginTop: 10,
  },


  /* RECAP */
  recapKicker: {
    fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 800,
    color: ROSE, letterSpacing: 2, textTransform: 'uppercase', marginTop: 6,
  },
  recapTitle: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20,
    color: DARK, margin: '8px 0 16px', lineHeight: 1.25,
  },
  recapSub: {
    fontFamily: 'Inter, sans-serif', fontSize: 13,
    color: 'rgba(28,27,46,0.6)', margin: '0 0 10px',
  },
  recapDefi: {
    background: YELLOW, color: DARK,
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15,
    padding: '14px 18px', borderRadius: 12,
    marginBottom: 16,
  },
  recapHint: {
    fontFamily: 'Inter, sans-serif', fontSize: 13,
    color: 'rgba(28,27,46,0.65)', lineHeight: 1.55, margin: '0 0 4px',
  },
}
