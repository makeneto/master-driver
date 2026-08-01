"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { AnswerOptions } from "./answer-options"
import type { AnswerOption } from "@/hooks/use-answer-options"
import type { Question } from "@/types"

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  options: AnswerOption[]
  attempted: number[]
  locked: boolean
  onSelect: (index: number) => void
}

export function QuestionCard({
  question,
  index,
  total,
  options,
  attempted,
  locked,
  onSelect,
}: QuestionCardProps) {
  const { t, questionText } = useTranslation()
  const { question: questionLabel } = questionText(question)
  const hadWrongAttempt = attempted.some((i) => !options[i]?.correct)

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        className={cn(
          "relative overflow-hidden p-8 transition-colors sm:p-10",
          locked && "border-[var(--color-success)]/40",
          hadWrongAttempt && !locked && "border-[var(--color-danger)]/40",
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-xs tracking-wide text-[var(--color-text-faint)]">
            {t("quiz.questionOf", { current: index + 1, total })}
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
