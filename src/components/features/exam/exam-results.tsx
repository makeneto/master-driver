"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { RotateCcw, GraduationCap } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gauge } from "@/components/ui/gauge"
import { Badge } from "@/components/ui/misc"
import { questions } from "@/data/questions"
import { formatMinutes } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import type { TopicId } from "@/types"

export function ExamResults({
  total,
  correct,
  wrong,
  seconds,
  failedTopics,
  wrongQuestionIds,
  onRestart,
}: {
  total: number
  correct: number
  wrong: number
  seconds: number
  failedTopics: TopicId[]
  wrongQuestionIds: number[]
  onRestart: () => void
}) {
  const { t, topicText } = useTranslation()
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = percentage >= 70
  const wrongQuestions = questions.filter((q) =>
    wrongQuestionIds.includes(q.id),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 lg:mx-auto lg:max-w-[70%] xl:max-w-[50%] pt-7 pb-10"
    >
      <Card className="flex flex-col items-center gap-8 p-10 text-center">
        <GraduationCap
          className={
            passed
              ? "h-8 w-8 text-[var(--color-success)]"
              : "h-8 w-8 text-[var(--color-danger)]"
          }
        />
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">
            {passed ? t("exam.passed") : t("exam.failed")}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {t("exam.passThreshold")}
          </p>
        </div>

        <Gauge
          value={percentage}
          size={140}
          strokeWidth={10}
          color={passed ? "var(--color-success)" : "var(--color-danger)"}
        >
          <span className="font-[var(--font-mono)] text-3xl font-semibold">
            {percentage}%
          </span>
        </Gauge>

        <div className="w-full flex justify-center gap-10 lg:gap-10 text-sm">
          <div>
            <p className="font-[var(--font-mono)] text-lg font-semibold text-[var(--color-success)]">
              {correct}
            </p>
            <p className="text-xs text-[var(--color-text-faint)]">
              {t("exam.correct")}
            </p>
          </div>
          <div>
            <p className="font-[var(--font-mono)] text-lg font-semibold text-[var(--color-danger)]">
              {wrong}
            </p>
            <p className="text-xs text-[var(--color-text-faint)]">
              {t("exam.wrong")}
            </p>
          </div>
          <div>
            <p className="font-[var(--font-mono)] text-lg font-semibold">
              {formatMinutes(seconds)}
            </p>
            <p className="text-xs text-[var(--color-text-faint)]">
              {t("exam.time")}
            </p>
          </div>
        </div>

        {failedTopics.length > 0 && (
          <div className="w-full text-left">
            <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              {t("exam.failedTopics")}
            </p>
            <div className="flex flex-wrap gap-2">
              {failedTopics.map((id) => (
                <Badge key={id}>{topicText(id).name}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={onRestart} variant="secondary" size="lg">
            <RotateCcw className="h-4 w-4" /> {t("exam.restart")}
          </Button>
          <Button asChild size="lg">
            <Link href="/">{t("exam.backHome")}</Link>
          </Button>
        </div>
      </Card>

      {wrongQuestions.length > 0 && (
        <Card className="mt-6 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>{t("exam.wrongExplanation")}</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {wrongQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-[var(--color-hairline)] p-4"
              >
                <p className="text-sm font-medium">{q.question}</p>
                <p className="mt-1 text-sm text-[var(--color-teal-soft)]">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  )
}
