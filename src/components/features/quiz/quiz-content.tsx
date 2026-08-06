"use client"

import { getTopicMeta } from "@/constants/topics"
import { useSearchParams } from "next/navigation"
import ReactConfetti from "react-confetti"
import { AnimatePresence } from "framer-motion"
import { useQuizSession } from "@/hooks/use-quiz-session"
import { QuestionCard } from "./question-card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { AlertTriangle, Target, Zap } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { SessionComplete } from "./session-complete"
import TopicPicker from "./topic-picker"

export function QuizContent() {
  const params = useSearchParams()
  const topicParam = params.get("topic")
  const modeParam = params.get("mode")

  const { t, topicText } = useTranslation()

  const {
    pool,
    attempted,
    locked,
    showConfetti,
    answered,
    currentQuestion,
    options,
    isDone,
    currentIndex,
    total,
    sessionCorrect,
    sessionWrong,
    onSelect,
    onRestart,
  } = useQuizSession(topicParam, modeParam)

  if (pool.length === 0) {
    return <TopicPicker />
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {showConfetti && (
        <ReactConfetti
          numberOfPieces={140}
          recycle={false}
          gravity={0.3}
          colors={["#f5b942", "#34d1bf", "#34d399"]}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            pointerEvents: "none",
          }}
        />
      )}

      {topicParam && !isDone && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <DynamicIcon
            name={getTopicMeta(topicParam as never).icon}
            className="h-4 w-4 text-[var(--color-gold-soft)]"
          />
          {topicText(topicParam).name}
        </div>
      )}

      {modeParam === "quick" && !isDone && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-gold)]">
          <Zap className="h-4 w-4" /> {t("quiz.quickQuizBadge")}
        </div>
      )}

      {modeParam === "review-wrong" && !isDone && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-danger)]">
          <AlertTriangle className="h-4 w-4" /> {t("quiz.reviewWrong")}
        </div>
      )}

      {modeParam === "review-weak" && !isDone && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-teal)]">
          <Target className="h-4 w-4" /> {t("quiz.reviewWeak")}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isDone ? (
          <SessionComplete
            correct={sessionCorrect}
            wrong={sessionWrong}
            answered={answered}
            onRestart={onRestart}
          />
        ) : currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={total}
            options={options}
            attempted={attempted}
            locked={locked}
            onSelect={onSelect}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
