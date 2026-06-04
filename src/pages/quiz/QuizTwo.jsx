import quiz2 from '../../data/quiz-2'
import QuizEngine from './QuizEngine'

export default function QuizTwo() {
  return (
    <QuizEngine
      quiz={quiz2}
      quizId={2}
      nextRoute="/quiz/3"
      recapTitle="Tu sais mieux pourquoi tu craques le soir."
      recapHint="Essaie ton défi pendant 5 soirs. Si ça marche, pose une carte victoire sur ton tableau."
    />
  )
}
