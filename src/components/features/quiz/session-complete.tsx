"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { PartyPopper, RotateCcw, Check, X } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gauge } from "@/components/ui/gauge"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import type { Question } from "@/types"

export type SessionAnswer = {
  question: Question
  correct: boolean
  selectedText: string
}

export function SessionComplete({
  correct,
  wrong,
  answered,
  onRestart,
}: {
  correct: number
  wrong: number
  answered: SessionAnswer[]
  onRestart: () => void
}) {
  const { t, questionText } = useTranslation()
  const total = correct + wrong
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="flex flex-col items-center gap-6 p-10 text-center">
        <PartyPopper className="h-8 w-8 text-[var(--color-gold)]" />
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">
            {t("quiz.sessionComplete")}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {t("quiz.sessionSummary", { correct, wrong })}
          </p>
        </div>

        <Gauge value={pct} size={120} strokeWidth={9}>
          <span className="font-[var(--font-mono)] text-2xl font-semibold">
            {pct}%
          </span>
        </Gauge>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRestart} variant="secondary" size="lg">
            <RotateCcw className="h-4 w-4" />
            {t("quiz.restart")}
          </Button>
          <Button asChild size="lg">
            <Link href="/">{t("quiz.backHome")}</Link>
          </Button>
        </div>
      </Card>

      {answered.length > 0 && (
        <Card className="mt-6 p-6 text-left">
          <CardHeader className="p-0 pb-4">
            <CardTitle>{t("quiz.reviewTitle")}</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {answered.map((item, i) => {
              const { question: q, answer: correctAnswer } = questionText(
                item.question,
              )
              return (
                <div
                  key={`${item.question.id}-${i}`}
                  className={cn(
                    "rounded-xl border p-4",
                    item.correct
                      ? "border-[var(--color-success)]/30"
                      : "border-[var(--color-danger)]/30",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        item.correct
                          ? "bg-[var(--color-success)] text-[#062017]"
                          : "bg-[var(--color-danger)] text-white",
                      )}
                    >
                      {item.correct ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q}</p>
                      {!item.correct && (
                        <p className="mt-1 text-xs text-[var(--color-text-faint)]">
                          {t("quiz.yourAnswer")}:{" "}
                          <span className="text-[var(--color-danger)]">
                            {item.selectedText}
                          </span>
                        </p>
                      )}
                      <p className="mt-1 text-sm text-[var(--color-teal-soft)]">
                        {correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </motion.div>
  )
}
