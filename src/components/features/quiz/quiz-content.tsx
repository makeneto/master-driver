"use client"

import { useMemo } from "react"
import { TOPICS, getTopicMeta } from "@/constants/topics"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import ReactConfetti from "react-confetti"
import { AnimatePresence } from "framer-motion"
import { useQuizSession } from "@/hooks/use-quiz-session"
import { QuestionCard } from "./question-card"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { AlertTriangle, Target, Zap } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { SessionAnswer, SessionComplete } from "./session-complete"

const ADVANCE_DELAY_MS = 1400

export function QuizContent() {
  const params = useSearchParams()
  const topicParam = params.get("topic")
  const modeParam = params.get("mode") // "review-wrong" | "review-weak" | null

  const { t, topicText, achievementText } = useTranslation()

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

function TopicPicker() {
  const { t, topicText } = useTranslation()
  return (
    <div className="mx-4 lg:mx-auto lg:max-w-4xl xl:max-w-[50%] pt-7 pb-10">
      <h1 className="mb-2 font-[var(--font-display)] text-2xl font-semibold tracking-tight">
        {t("quiz.chooseTopic")}
      </h1>
      <p className="mb-8 text-sm text-[var(--color-text-muted)]">
        {t("quiz.chooseTopicDesc")}
      </p>
      <div className="grid grid-cols-1 gap-3 items-stretch sm:grid-cols-2">
        {TOPICS.map((topic) => {
          const { name, description } = topicText(topic.id)
          return (
            <Link key={topic.id} href={`/quiz?topic=${topic.id}`}>
              <Card className="glass-hover flex items-center gap-4 p-4 h-full transition-colors hover:border-[var(--color-hairline-strong)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-teal)]/20 text-xl ring-1 ring-inset ring-[var(--color-hairline-strong)]">
                  <DynamicIcon
                    name={topic.icon}
                    className="h-5 w-5 text-[var(--color-gold-soft)]"
                  />
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-sm">{name}</CardTitle>
                  <CardDescription className="line-clamp">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
      <CardContent className="hidden" />
    </div>
  )
}
