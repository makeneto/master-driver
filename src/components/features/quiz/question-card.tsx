"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Eye, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { Question } from "@/types"

export function QuestionCard({
  question,
  index,
  total,
  showAnswer,
  feedback,
  onReveal,
  onEvaluate,
}: {
  question: Question
  index: number
  total: number
  showAnswer: boolean
  feedback: "correct" | "wrong" | null
  onReveal: () => void
  onEvaluate: (correct: boolean) => void
}) {
  const { t } = useTranslation()
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(feedback === "wrong" && "animate-shake")}
    >
      <Card
        className={cn(
          "relative overflow-hidden p-8 transition-colors sm:p-10",
          feedback === "correct" && "border-[var(--color-success)]/40",
          feedback === "wrong" && "border-[var(--color-danger)]/40",
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-xs tracking-wide text-[var(--color-text-faint)]">
            {t("quiz.questionOf", { current: index + 1, total })}
          </span>
          <div className="lane-divider flex-1" />
        </div>

        <h2 className="font-[var(--font-display)] text-2xl font-semibold text-center leading-snug tracking-tight sm:text-3xl my-15">
          {question.question}
        </h2>

        <AnimatePresence mode="wait">
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              <div className="rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] p-5">
                <p className="text-sm uppercase tracking-wide text-[var(--color-teal-soft)]">
                  {t("quiz.answerLabel")}
                </p>
                <p className="mt-2 text-lg text-[var(--color-text)]">
                  {question.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          {!showAnswer ? (
            <Button onClick={onReveal} size="lg" className="w-full sm:w-auto">
              <Eye className="h-4 w-4" />
              {t("quiz.showAnswer")}
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => onEvaluate(true)}
                variant="success"
                size="lg"
                className="flex-1"
              >
                <Check className="h-4 w-4" />
                {t("quiz.gotItRight")}
              </Button>
              <Button
                onClick={() => onEvaluate(false)}
                variant="danger"
                size="lg"
                className="flex-1"
              >
                <X className="h-4 w-4" />
                {t("quiz.gotItWrong")}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
