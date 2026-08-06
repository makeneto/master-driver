import { Suspense } from "react"

import { QuizContent } from "@/components/features/quiz/quiz-content"
import { QuizLoadingFallback } from "@/components/features/quiz/quiz-loading-fallback"

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoadingFallback />}>
      <QuizContent />
    </Suspense>
  )
}
