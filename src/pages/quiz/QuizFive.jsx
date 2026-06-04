import quiz5 from '../../data/quiz-5'
import QuizEngine from './QuizEngine'

export default function QuizFive() {
  return (
    <QuizEngine
      quiz={quiz5}
      quizId={5}
      nextRoute={null}
      recapTitle="Tu sais mieux gérer les sorties."
      recapHint="Essaie ton défi à la prochaine sortie. Si ça marche, pose une carte victoire sur ton tableau."
    />
  )
}
