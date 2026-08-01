"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { Question } from "@/types"
import { AnswerOption } from "@/hooks/use-answer-options"
import { AnswerOptions } from "../quiz/answer-options"
import { cn } from "@/lib/utils"

export function ExamQuestionCard({
  question,
  index,
  total,
  options,
  attempted,
  locked,
  onSelect,
}: {
  question: Question
  index: number
  total: number
  options: AnswerOption[]
  attempted: number[]
  locked: boolean
  onSelect: (index: number) => void
}) {
  const { t, questionText } = useTranslation()
  const { question: questionLabel } = questionText(question)
  const wasWrong = locked && attempted.some((i) => !options[i]?.correct)

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "p-8 sm:p-10 transition-colors",
          locked && !wasWrong && "border-[var(--color-success)]/40",
          wasWrong && "border-[var(--color-danger)]/40",
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-xs tracking-wide text-[var(--color-text-faint)]">
            {t("exam.questionOf", { current: index + 1, total })}
          </span>
          <div className="lane-divider flex-1" />
        </div>

        <h2 className="font-[var(--font-display)] text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          {questionLabel}
        </h2>

        <AnswerOptions
          options={options}
          attempted={attempted}
          locked={locked}
          onSelect={onSelect}
        />
      </Card>
    </motion.div>
  )
}
