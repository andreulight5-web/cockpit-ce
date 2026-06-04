import quiz4 from '../../data/quiz-4'
import QuizEngine from './QuizEngine'

export default function QuizFour() {
  return (
    <QuizEngine
      quiz={quiz4}
      quizId={4}
      nextRoute="/quiz/5"
      recapTitle="Tu sais mieux gérer écrans et devoirs."
      recapHint="Essaie ton défi pendant 5 jours. Si ça marche, pose une carte victoire sur ton tableau."
    />
  )
}
