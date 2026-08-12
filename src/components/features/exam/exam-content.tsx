"use client"

import { AnimatePresence } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useExamSession } from "@/hooks/use-exam-session"
import { ExamQuestionCard } from "./exam-question-card"
import { ExamResults } from "./exam-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

const EXAM_SIZE = 20

export function ExamContent() {
  const { t } = useTranslation()
  const {
    started,
    startExam,
    index,
    currentQuestion,
    options,
    attempted,
    locked,
    finished,
    correctCount,
    wrongIds,
    failedTopics,
    seconds,
    onSelect,
    onRestart,
    total,
  } = useExamSession()

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <GraduationCap className="h-8 w-8 text-[var(--color-gold-soft)]" />
          <h1 className="text-2xl font-semibold">{t("exam.title")}</h1>
          <p className="text-sm text-[var(--color-text-muted)] sm:w-[70%]">
            {t("exam.intro", { count: EXAM_SIZE })}
          </p>

          <Button size="lg" onClick={startExam} className="mt-4">
            {t("exam.start")}
          </Button>
        </Card>
      </div>
    )
  }

  if (finished) {
    return (
      <ExamResults
        total={total}
        correct={correctCount}
        wrong={wrongIds.length}
        seconds={seconds}
        failedTopics={failedTopics}
        wrongQuestionIds={wrongIds}
        onRestart={onRestart}
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <ExamQuestionCard
            question={currentQuestion}
            index={index}
            total={total}
            options={options}
            attempted={attempted}
            locked={locked}
            onSelect={onSelect}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
