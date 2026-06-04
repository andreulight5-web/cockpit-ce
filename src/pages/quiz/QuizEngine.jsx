import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'
import {
  XP_ANSWER, XP_CORRECT_BONUS, XP_COMPLETE_BONUS, XP_DEFI_BONUS,
  BADGE_BY_ID, computeBadges, getLevel,
} from '../../lib/gamification'
import monstreRigole from '../../assets/characters/monstre~/monstre-rigole.webp'

const TEAL = '#2A9490'
const CREAM = '#FAFAF5'
const DARK = '#1C1B2E'
const YELLOW = '#F5E06D'
const ROSE = '#C0506A'
const GREEN = '#3A9B5B'

const fmt = (ms) => {
  const sec = Math.floor(ms / 1000)
  const cs  = Math.floor((ms % 1000) / 10)
  return `${sec}.${String(cs).padStart(2, '0')} s`
}

export default function QuizEngine({
  quiz,
  quizId,
  nextRoute,
  recapTitle = 'Tu as terminé ce quiz.',
  recapHint = 'Essaie ton défi cette semaine. Si ça marche, pose une carte victoire sur ton tableau.',
}) {
  const navigate = useNavigate()
  const { appData, saveData } = useContext(AppContext)

  const [step, setStep]       = useState('intro')
  const [qIdx, setQIdx]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [xpGained, setXpGained] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [floats, setFloats] = useState([])
  const [recapData, setRecapData] = useState(null)

  const question = quiz.questions[qIdx]
  const total = quiz.questions.length
  const challengeQ = useMemo(
    () => quiz.questions.find((q) => q.isChallenge) || quiz.questions[total - 1],
    [quiz, total]
  )

  const handleBack = () => navigate('/outils')

  const pushFloat = (text, color) => {
    const id = Date.now() + Math.random()
    setFloats((f) => [...f, { id, text, color }])
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 1500)
  }

  const handleAnswer = (qId, value) => {
    setAnswers((a) => ({ ...a, [qId]: value }))
    setShowFeedback(true)

    setXpGained((cur) => cur + XP_ANSWER)
    pushFloat(`+${XP_ANSWER} XP`, GREEN)

    if (question.hasCorrectAnswer && value?.correct === true) {
      setCorrectCount((c) => c + 1)
      setTimeout(() => {
        setXpGained((cur) => cur + XP_CORRECT_BONUS)
        pushFloat(`+${XP_CORRECT_BONUS} BONUS`, YELLOW)
      }, 280)
    }
  }

  const handleNext = () => {
    setShowFeedback(false)
    if (qIdx + 1 < total) {
      setQIdx(qIdx + 1)
      return
    }
    finalize()
  }

  const finalize = () => {
    const defi = answers[challengeQ.id]?.value || null
    const totalCorrectable = quiz.questions.filter((q) => q.hasCorrectAnswer).length

    const completeBonus = XP_COMPLETE_BONUS
    const defiBonus     = defi ? XP_DEFI_BONUS : 0
    const xpForQuiz     = xpGained + completeBonus + defiBonus

    const prevBadges = appData?.badges || []
    const prevQuizDone = appData?.quiz_done || []
    const newQuizDone = prevQuizDone.some((x) => String(x) === String(quizId))
      ? prevQuizDone
      : [...prevQuizDone, quizId]
    const newXpTotal = (appData?.xp_total || 0) + xpForQuiz
    const newScore = {
      xp: xpForQuiz,
      correctCount,
      totalCount: totalCorrectable,
      completedAt: new Date().toISOString(),
    }
    const newScores = { ...(appData?.quiz_scores || {}), [quizId]: newScore }

    const merged = {
      ...appData,
      quiz_done: newQuizDone,
      xp_total: newXpTotal,
      quiz_scores: newScores,
      [`quiz_${quizId}_defi`]: defi,
    }
    const earnedBadges = computeBadges(merged)
    const justEarned = earnedBadges.filter((id) => !prevBadges.includes(id))

    try {
      const done = JSON.parse(localStorage.getItem('cockpit_quiz_done') || '[]')
      if (!done.includes(quizId)) {
        done.push(quizId)
        localStorage.setItem('cockpit_quiz_done', JSON.stringify(done))
      }
    } catch { /* ignore */ }

    if (saveData) {
      saveData({
        quiz_done: newQuizDone,
        quiz_scores: newScores,
        xp_total: newXpTotal,
        badges: earnedBadges,
        [`quiz_${quizId}_defi`]: defi,
      })
    }

    setRecapData({
      defi,
      xpForQuiz,
      completeBonus,
      defiBonus,
      correctCount,
      totalCorrectable,
      newXpTotal,
      prevXpTotal: appData?.xp_total || 0,
      justEarned,
    })
    setStep('recap')
  }

  const liveTotalXp = (appData?.xp_total || 0) + xpGained

  return (
    <div style={s.page}>
      <header style={s.header}>
        <button onClick={handleBack} style={s.back} aria-label="Retour">←</button>
        <div style={s.headerCenter}>
          <div style={s.headerTitle}>{quiz.title}</div>
          {step === 'question' && (
            <div style={s.headerProgress}>Question {qIdx + 1}/{total}</div>
          )}
        </div>

        {step === 'question' ? (
          <div style={s.xpPill}>
            <span style={s.xpPillIcon}>⚡</span>
            <span style={s.xpPillValue}>{liveTotalXp}</span>
            <div style={s.xpFloatStack}>
              {floats.map((f) => (
                <span
                  key={f.id}
                  style={{
                    ...s.xpFloat,
                    color: f.color,
                  }}
                >
                  {f.text}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ width: 36 }} />
        )}
      </header>

      {step === 'question' && (
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${((qIdx + 1) / total) * 100}%` }} />
        </div>
      )}

      <main style={s.body}>
        {step === 'intro' && <Intro quiz={quiz} onStart={() => setStep('question')} />}

        {step === 'question' && (
          <QuestionStep
            question={question}
            answer={answers[question.id]}
            showFeedback={showFeedback}
            onAnswer={(value) => handleAnswer(question.id, value)}
            onNext={handleNext}
          />
        )}

        {step === 'recap' && recapData && (
          <Recap
            data={recapData}
            recapTitle={recapTitle}
            recapHint={recapHint}
            onNext={nextRoute ? () => navigate(nextRoute) : null}
            onSommaire={() => navigate('/quiz')}
          />
        )}
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* INTRO                                              */
/* ═══════════════════════════════════════════════════ */
function Intro({ quiz, onStart }) {
  const total = quiz.questions.length
  return (
    <div style={s.card}>
      {quiz.videoDescription && (
        <p style={s.videoDesc}>{quiz.videoDescription}</p>
      )}

      {quiz.videoUrl ? (
        <div style={s.videoWrap}>
          <div style={s.videoFrame}>
            <iframe
              src={quiz.videoUrl}
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

      <h1 style={s.introTitle}>{quiz.title}</h1>
      <p style={s.introDesc}>
        Un mini-coaching à faire avec ton enfant — {total} questions, quelques minutes. Chaque réponse rapporte des XP. Pas de stress, juste mieux se connaître.
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
        <SingleChoice question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
      )}

      {question.type === 'timer_challenge' && (
        <TimerChallenge question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
      )}

      {question.type === 'ordering' && (
        <Ordering question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
      )}

      {question.type === 'true_false' && (
        <TrueFalse question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
      )}

      {question.type === 'multi_select' && (
        <MultiSelect question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
      )}

      {question.type === 'text_input' && (
        <TextInput question={question} answer={answer} showFeedback={showFeedback} onAnswer={onAnswer} />
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
  const hasCorrect = question.hasCorrectAnswer && Number.isInteger(question.correctIndex)
  return (
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((opt, idx) => {
        const isPicked = answer?.value === opt
        const isCorrect = hasCorrect && idx === question.correctIndex
        const isWrongPicked = showFeedback && hasCorrect && isPicked && !isCorrect

        let borderColor = 'rgba(28,27,46,0.12)'
        let background = '#fff'
        let radioBorder = 'rgba(28,27,46,0.2)'
        let radioBg = 'transparent'

        if (showFeedback && hasCorrect && isCorrect) {
          borderColor = GREEN
          background = 'rgba(58,155,91,0.10)'
          radioBorder = GREEN
          radioBg = GREEN
        } else if (isWrongPicked) {
          borderColor = ROSE
          background = 'rgba(192,80,106,0.10)'
          radioBorder = ROSE
          radioBg = ROSE
        } else if (isPicked) {
          borderColor = TEAL
          background = 'rgba(42,148,144,0.08)'
          radioBorder = TEAL
          radioBg = TEAL
        }

        return (
          <button
            key={opt}
            onClick={() => !showFeedback && onAnswer({ value: opt, correct: hasCorrect ? isCorrect : null })}
            disabled={showFeedback}
            style={{
              ...s.optionBtn,
              borderColor,
              background,
              cursor: showFeedback ? 'default' : 'pointer',
            }}
          >
            <span style={{ ...s.optionRadio, borderColor: radioBorder, background: radioBg }}>
              {(isPicked || (showFeedback && hasCorrect && isCorrect)) && <span style={s.optionDot} />}
            </span>
            <span style={s.optionLabel}>{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* TRUE / FALSE                                       */
/* ═══════════════════════════════════════════════════ */
function TrueFalse({ question, answer, showFeedback, onAnswer }) {
  const picked = answer?.value
  const correct = question.correctAnswer

  const renderBtn = (val, label) => {
    const isPicked = picked === val
    const isCorrect = val === correct
    let bg = '#fff'
    let border = 'rgba(28,27,46,0.12)'
    let color = DARK

    if (showFeedback && isCorrect) {
      bg = GREEN
      border = GREEN
      color = '#fff'
    } else if (showFeedback && isPicked && !isCorrect) {
      bg = ROSE
      border = ROSE
      color = '#fff'
    } else if (isPicked) {
      bg = val ? 'rgba(58,155,91,0.10)' : 'rgba(192,80,106,0.10)'
      border = val ? GREEN : ROSE
    }

    return (
      <button
        onClick={() => !showFeedback && onAnswer({ value: val, correct: val === correct })}
        disabled={showFeedback}
        style={{
          flex: 1,
          padding: '20px 12px',
          borderRadius: 14,
          border: `2px solid ${border}`,
          background: bg,
          color,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: 1,
          cursor: showFeedback ? 'default' : 'pointer',
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
      {renderBtn(true, 'VRAI')}
      {renderBtn(false, 'FAUX')}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* MULTI SELECT                                       */
/* ═══════════════════════════════════════════════════ */
function MultiSelect({ question, answer, showFeedback, onAnswer }) {
  const [picked, setPicked] = useState(() => (Array.isArray(answer?.value) ? answer.value : []))

  const toggle = (opt) => {
    if (showFeedback) return
    setPicked((cur) => cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt])
  }

  const validate = () => {
    if (picked.length === 0) return
    onAnswer({ value: picked })
  }

  return (
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((opt) => {
        const isPicked = picked.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            disabled={showFeedback}
            style={{
              ...s.optionBtn,
              borderColor: isPicked ? TEAL : 'rgba(28,27,46,0.12)',
              background:  isPicked ? 'rgba(42,148,144,0.08)' : '#fff',
              cursor: showFeedback ? 'default' : 'pointer',
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: 6,
              border: `2px solid ${isPicked ? TEAL : 'rgba(28,27,46,0.2)'}`,
              background: isPicked ? TEAL : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1,
            }}>
              {isPicked && '✓'}
            </span>
            <span style={s.optionLabel}>{opt}</span>
          </button>
        )
      })}

      {!showFeedback && (
        <button
          onClick={validate}
          disabled={picked.length === 0}
          style={{
            ...s.primaryBtn,
            marginTop: 12,
            opacity: picked.length === 0 ? 0.45 : 1,
            cursor: picked.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Valider mes réponses →
        </button>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* TEXT INPUT                                         */
/* ═══════════════════════════════════════════════════ */
function TextInput({ question, answer, showFeedback, onAnswer }) {
  const [val, setVal] = useState(() => answer?.value || '')
  const [focused, setFocused] = useState(false)

  const validate = () => {
    const v = val.trim()
    if (!v) return
    onAnswer({ value: v })
  }

  return (
    <div style={{ marginTop: 18 }}>
      <input
        type="text"
        value={val}
        placeholder={question.placeholder || 'Ta réponse…'}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={showFeedback}
        style={{
          width: '100%',
          padding: '14px 16px',
          border: `2px solid ${focused ? TEAL : 'rgba(28,27,46,0.12)'}`,
          borderRadius: 12,
          background: '#fff',
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          color: DARK,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
      />

      {showFeedback && val && (
        <div style={s.textInputResult}>
          <span style={s.textInputResultLabel}>Ta réponse</span>
          <span style={s.textInputResultValue}>{val}</span>
        </div>
      )}

      {!showFeedback && (
        <button
          onClick={validate}
          disabled={!val.trim()}
          style={{
            ...s.primaryBtn,
            marginTop: 14,
            opacity: !val.trim() ? 0.45 : 1,
            cursor: !val.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          Valider →
        </button>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/* TIMER CHALLENGE                                    */
/* ═══════════════════════════════════════════════════ */
function TimerChallenge({ question, answer, showFeedback, onAnswer }) {
  const [phase, setPhase] = useState('idle')
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
    const correctOrdered = [...question.items].sort((a, b) => a.correctOrder - b.correctOrder)
    const userOrderIds = items.map((i) => i.id).join(',')
    const correctOrderIds = correctOrdered.map((i) => i.id).join(',')
    const isCorrect = userOrderIds === correctOrderIds

    const feedbackExtra = !isCorrect
      ? `Bien essayé ! Voici l'ordre idéal :\n${correctOrdered.map((i, j) => `${j + 1}. ${i.label}`).join('\n')}`
      : null

    onAnswer({ value: items.map((i) => i.id), feedbackExtra, correct: isCorrect })
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
/* RECAP — CELEBRATION                                */
/* ═══════════════════════════════════════════════════ */
function Confetti() {
  const pieces = useMemo(() => {
    const colors = [YELLOW, TEAL, ROSE, GREEN, '#7A2040']
    return Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.6,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 8,
      radius: Math.random() < 0.4 ? '50%' : '2px',
    }))
  }, [])
  return (
    <div style={s.confettiLayer} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.radius,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  )
}

function Recap({ data, recapTitle, recapHint, onNext, onSommaire }) {
  const { defi, xpForQuiz, completeBonus, defiBonus, correctCount, totalCorrectable, newXpTotal, prevXpTotal, justEarned } = data

  const defiText = Array.isArray(defi) ? defi.join(' · ') : defi

  const [animatedXp, setAnimatedXp] = useState(prevXpTotal)
  const lvl = getLevel(animatedXp)

  useEffect(() => {
    const t = setTimeout(() => setAnimatedXp(newXpTotal), 350)
    return () => clearTimeout(t)
  }, [newXpTotal])

  return (
    <div style={{ ...s.card, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <Confetti />

      <img
        src={monstreRigole}
        alt=""
        className="bounce-joy"
        style={{ ...s.monstreImg, position: 'relative', zIndex: 1 }}
      />

      <div style={{ ...s.recapKicker, position: 'relative', zIndex: 1 }}>BRAVO !</div>
      <h2 style={{ ...s.recapTitleBig, position: 'relative', zIndex: 1 }}>{recapTitle}</h2>

      <div style={s.xpHeadline}>
        <span style={s.xpHeadlineIcon}>⚡</span>
        <span style={s.xpHeadlineValue}>+{xpForQuiz}</span>
        <span style={s.xpHeadlineSuffix}>XP gagnés !</span>
      </div>

      <div style={s.xpBreakdown}>
        <div style={s.xpBreakdownRow}>
          <span>Réponses ({totalCorrectable > 0 ? `${correctCount}/${totalCorrectable} correctes` : 'toutes'})</span>
          <span style={s.xpBreakdownVal}>+{xpForQuiz - completeBonus - defiBonus}</span>
        </div>
        <div style={s.xpBreakdownRow}>
          <span>Quiz complété</span>
          <span style={s.xpBreakdownVal}>+{completeBonus}</span>
        </div>
        {defiBonus > 0 && (
          <div style={s.xpBreakdownRow}>
            <span>Défi de la semaine choisi</span>
            <span style={s.xpBreakdownVal}>+{defiBonus}</span>
          </div>
        )}
      </div>

      {/* Level bar */}
      <div style={s.levelCard}>
        <div style={s.levelHead}>
          <span style={s.levelName}>⚡ Niveau {lvl.num} · {lvl.name}</span>
          <span style={s.levelXp}>{animatedXp} XP</span>
        </div>
        <div style={s.levelBar}>
          <div style={{ ...s.levelFill, width: `${lvl.pct}%` }} />
        </div>
        {lvl.max !== Infinity && (
          <div style={s.levelHint}>{lvl.max - animatedXp} XP avant le niveau {lvl.num + 1}</div>
        )}
      </div>

      {/* Défi de la semaine */}
      <p style={s.recapSub}>Ton défi de la semaine :</p>
      <div style={s.recapDefi}>{defiText || 'Le secret que tu veux essayer'}</div>
      <p style={s.recapHint}>{recapHint}</p>

      {/* Nouveaux badges */}
      {justEarned && justEarned.length > 0 && (
        <div style={s.newBadges}>
          <div style={s.newBadgesTitle}>🎉 Nouveau{justEarned.length > 1 ? 'x' : ''} badge{justEarned.length > 1 ? 's' : ''} débloqué{justEarned.length > 1 ? 's' : ''} !</div>
          <div style={s.newBadgesRow}>
            {justEarned.map((id, i) => {
              const b = BADGE_BY_ID[id]
              if (!b) return null
              return (
                <div
                  key={id}
                  className="badge-pop"
                  style={{ ...s.newBadgeItem, animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  <span style={s.newBadgeIcon}>{b.icon}</span>
                  <span style={s.newBadgeLabel}>{b.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {onNext && (
        <button onClick={onNext} style={s.primaryBtn}>
          Quiz suivant →
        </button>
      )}
      <button onClick={onSommaire} style={s.secondaryBtn}>
        Retour aux quiz
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

  xpPill: {
    position: 'relative',
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '6px 10px',
    background: DARK, color: '#fff',
    borderRadius: 999,
    flexShrink: 0,
    minWidth: 36,
    boxShadow: '0 2px 8px rgba(28,27,46,0.15)',
  },
  xpPillIcon: { fontSize: 12 },
  xpPillValue: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 13, color: YELLOW,
  },
  xpFloatStack: {
    position: 'absolute',
    left: '50%', top: -4,
    width: 1, height: 1,
    pointerEvents: 'none',
  },
  xpFloat: {
    position: 'absolute',
    left: 0, top: 0,
    transform: 'translate(-50%, 0)',
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 13,
    whiteSpace: 'nowrap',
    animation: 'xpFloat 1.5s ease-out forwards',
    textShadow: '0 1px 4px rgba(0,0,0,0.25)',
  },

  progressBar: { height: 3, background: 'rgba(28,27,46,0.06)' },
  progressFill: { height: '100%', background: TEAL, transition: 'width 0.4s' },

  body: { padding: '20px 16px 32px', maxWidth: 540, margin: '0 auto' },
  card: {
    background: '#fff',
    border: '1px solid rgba(28,27,46,0.08)',
    borderRadius: 16,
    padding: 22,
  },

  monstreImg: { width: 110, height: 110, objectFit: 'contain' },

  /* INTRO */
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
  videoWrap: { display: 'flex', justifyContent: 'center', marginBottom: 18 },
  videoFrame: {
    width: '100%',
    maxWidth: 281,
    aspectRatio: '9 / 16',
    maxHeight: 500,
    borderRadius: 16,
    overflow: 'hidden',
    background: '#000',
    boxShadow: '0 10px 30px rgba(28,27,46,0.15)',
  },
  videoIframe: { width: '100%', height: '100%', border: 'none', display: 'block' },
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

  textInputResult: {
    marginTop: 14,
    padding: '12px 14px',
    background: 'rgba(42,148,144,0.06)',
    border: '1px solid rgba(42,148,144,0.2)',
    borderRadius: 12,
    display: 'flex', flexDirection: 'column', gap: 2,
  },
  textInputResultLabel: {
    fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 800,
    color: TEAL, letterSpacing: 1.5, textTransform: 'uppercase',
  },
  textInputResultValue: {
    fontFamily: "'Caveat', cursive", fontSize: 22, color: DARK, lineHeight: 1.2,
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
  timerResult: { marginTop: 8, marginBottom: 12 },
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
    whiteSpace: 'pre-line',
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

  /* CONFETTI */
  confettiLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
  },

  /* RECAP — CELEBRATION */
  recapKicker: {
    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 800,
    color: ROSE, letterSpacing: 3, textTransform: 'uppercase', marginTop: 10,
  },
  recapTitleBig: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 22,
    color: DARK, margin: '6px 0 14px', lineHeight: 1.2,
  },
  xpHeadline: {
    display: 'inline-flex', alignItems: 'baseline', gap: 6,
    background: YELLOW,
    borderRadius: 999,
    padding: '8px 18px',
    margin: '4px auto 14px',
    boxShadow: '0 4px 14px rgba(245,224,109,0.6)',
    position: 'relative', zIndex: 1,
  },
  xpHeadlineIcon: { fontSize: 16 },
  xpHeadlineValue: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 26, color: DARK,
  },
  xpHeadlineSuffix: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: DARK,
  },
  xpBreakdown: {
    display: 'flex', flexDirection: 'column', gap: 4,
    margin: '0 auto 16px',
    maxWidth: 320,
    textAlign: 'left',
    position: 'relative', zIndex: 1,
  },
  xpBreakdownRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: 'Inter, sans-serif', fontSize: 12,
    color: 'rgba(28,27,46,0.7)',
    padding: '4px 10px',
    borderBottom: '1px dashed rgba(28,27,46,0.08)',
  },
  xpBreakdownVal: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
    color: GREEN,
  },

  levelCard: {
    background: 'rgba(28,27,46,0.04)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    position: 'relative', zIndex: 1,
  },
  levelHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: 8,
  },
  levelName: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: DARK,
  },
  levelXp: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 13, color: TEAL,
  },
  levelBar: {
    height: 8, background: 'rgba(28,27,46,0.1)', borderRadius: 99, overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2A9490, #F5E06D)',
    borderRadius: 99,
    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  levelHint: {
    fontFamily: 'Inter, sans-serif', fontSize: 11,
    color: 'rgba(28,27,46,0.55)', marginTop: 6, textAlign: 'right',
  },

  recapSub: {
    fontFamily: 'Inter, sans-serif', fontSize: 13,
    color: 'rgba(28,27,46,0.6)', margin: '0 0 10px',
    position: 'relative', zIndex: 1,
  },
  recapDefi: {
    background: YELLOW, color: DARK,
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15,
    padding: '14px 18px', borderRadius: 12,
    marginBottom: 16,
    position: 'relative', zIndex: 1,
  },
  recapHint: {
    fontFamily: 'Inter, sans-serif', fontSize: 13,
    color: 'rgba(28,27,46,0.65)', lineHeight: 1.55, margin: '0 0 4px',
    position: 'relative', zIndex: 1,
  },

  newBadges: {
    margin: '18px 0 4px',
    padding: '14px 12px',
    background: 'rgba(245,224,109,0.18)',
    border: '1px solid rgba(245,224,109,0.5)',
    borderRadius: 14,
    position: 'relative', zIndex: 1,
  },
  newBadgesTitle: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12,
    color: DARK, marginBottom: 10, letterSpacing: 0.5,
  },
  newBadgesRow: {
    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10,
  },
  newBadgeItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: '#fff',
    border: '2px solid rgba(245,224,109,0.8)',
    borderRadius: 12,
    padding: '10px 12px',
    minWidth: 78,
    opacity: 0,
  },
  newBadgeIcon: { fontSize: 26 },
  newBadgeLabel: {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 10,
    color: DARK, textAlign: 'center', lineHeight: 1.2,
  },
}
