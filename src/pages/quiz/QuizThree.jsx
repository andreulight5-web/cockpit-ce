import quiz3 from '../../data/quiz-3'
import QuizEngine from './QuizEngine'

export default function QuizThree() {
  return (
    <QuizEngine
      quiz={quiz3}
      quizId={3}
      nextRoute="/quiz/4"
      recapTitle="Tu sais mieux gérer les imprévus."
      recapHint="Essaie ton défi toute la semaine en famille. Si ça marche, pose une carte victoire sur ton tableau."
    />
  )
}
