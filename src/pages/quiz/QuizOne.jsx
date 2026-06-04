import { QUIZ_1 } from '../../data/quiz-1'
import QuizEngine from './QuizEngine'

export default function QuizOne() {
  return (
    <QuizEngine
      quiz={QUIZ_1}
      quizId={1}
      nextRoute="/quiz/2"
      recapTitle="Tu connais mieux ton cerveau matinal."
      recapHint="Essaie-le pendant 5 matins. Si ça marche, pose une carte victoire sur ton tableau."
    />
  )
}
