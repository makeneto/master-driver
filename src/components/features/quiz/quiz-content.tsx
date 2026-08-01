"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import ReactConfetti from "react-confetti"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { questions, getQuestionsByTopic } from "@/data/questions"
import { TOPICS, getTopicMeta } from "@/constants/topics"
import { buildSession } from "@/lib/recall-algorithm"
import { calculateAnswerXp } from "@/lib/xp"
import { evaluateAchievements } from "@/lib/achievements-checker"
import { recordAnswer } from "@/store/slices/statisticsSlice"
import {
  addXp,
  incrementAnswered,
  registerStudyDay,
} from "@/store/slices/profileSlice"
import { unlockAchievement } from "@/store/slices/achievementsSlice"
import { useStudyTimer } from "@/hooks/use-study-timer"
import {
  startSession,
  revealAnswer,
  submitEvaluation,
  nextQuestion,
  endSession,
} from "@/store/slices/quizSlice"
import { QuestionCard } from "./question-card"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { AlertTriangle, Target } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useAnswerOptions } from "@/hooks/use-answer-options"
import { SessionAnswer, SessionComplete } from "./session-complete"

const ADVANCE_DELAY_MS = 1400

export function QuizContent() {
  const params = useSearchParams()
  const topicParam = params.get("topic")
  const modeParam = params.get("mode") // "review-wrong" | "review-weak" | null

  const dispatch = useAppDispatch()
  const quiz = useAppSelector((s) => s.quiz)
  const records = useAppSelector((s) => s.statistics.questionRecords)
  const topicsStats = useAppSelector((s) => s.statistics.topics)
  const achievements = useAppSelector((s) => s.achievements.items)
  const profile = useAppSelector((s) => s.profile)
  const { t, topicText, achievementText } = useTranslation()

  const [attempted, setAttempted] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [answered, setAnswered] = useState<SessionAnswer[]>([])
  const startedKey = useRef<string | null>(null)

  useStudyTimer(quiz.active)

  const sessionKey = `${topicParam ?? "all"}::${modeParam ?? "practice"}`

  const pool = useMemo(() => {
    if (modeParam === "review-wrong") {
      const wrongIds = new Set(
        Object.values(records)
          .filter((r) => r.lastResult === "wrong")
          .map((r) => r.questionId),
      )
      return questions.filter((q) => wrongIds.has(q.id))
    }
    if (modeParam === "review-weak") {
      const practiced = TOPICS.filter(
        (t) => topicsStats[t.id].totalQuestions > 0,
      )
      const sorted = [...practiced].sort(
        (a, b) => topicsStats[a.id].accuracy - topicsStats[b.id].accuracy,
      )
      const weakTopics = (sorted.length > 0 ? sorted : TOPICS)
        .slice(0, 3)
        .map((t) => t.id)
      return questions.filter((q) => weakTopics.includes(q.topic))
    }
    if (topicParam) return getQuestionsByTopic(topicParam as never)
    return []
  }, [modeParam, topicParam, records, topicsStats])

  useEffect(() => {
    if (startedKey.current === sessionKey) return
    if (pool.length === 0) return
    const session = buildSession(pool, records)
    dispatch(
      startSession({
        mode: (modeParam as never) ?? "practice",
        topic: (topicParam as never) ?? null,
        questionIds: session.map((q) => q.id),
      }),
    )
    startedKey.current = sessionKey
    setAnswered([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey, pool])

  const currentQuestion = useMemo(() => {
    const id = quiz.questionIds[quiz.currentIndex]
    return questions.find((q) => q.id === id) ?? null
  }, [quiz.questionIds, quiz.currentIndex])

  const options = useAnswerOptions(currentQuestion)

  function handleSelect(index: number) {
    if (!currentQuestion || locked || attempted.includes(index)) return
    const chosen = options[index]
    const isFirstPick = attempted.length === 0
    setAttempted((prev) => [...prev, index])

    if (isFirstPick) {
      // Só a primeira escolha conta para estatísticas, XP e conquistas.
      setAnswered((prev) => [
        ...prev,
        {
          question: currentQuestion,
          correct: chosen.correct,
          selectedText: chosen.text,
        },
      ])

      dispatch(submitEvaluation({ correct: chosen.correct }))
      dispatch(
        recordAnswer({
          topic: currentQuestion.topic,
          questionId: currentQuestion.id,
          correct: chosen.correct,
        }),
      )
      dispatch(incrementAnswered())
      dispatch(registerStudyDay())

      const newStreak = chosen.correct
        ? topicsStats[currentQuestion.topic].streak + 1
        : 0
      if (chosen.correct) {
        const xp = calculateAnswerXp(newStreak)
        dispatch(addXp(xp))
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 1400)
      }

      const toUnlock = evaluateAchievements({
        totalAnswered: profile.totalAnswered + 1,
        streakDays: profile.streakDays + (profile.lastStudyDate ? 0 : 1),
        topics: topicsStats,
        unlocked: Object.fromEntries(
          Object.entries(achievements).map(([k, v]) => [k, v.unlocked]),
        ) as never,
        currentTopicStreak: newStreak,
      })
      toUnlock.forEach((id) => {
        dispatch(unlockAchievement(id))
        toast.success(`${achievementText(id).title}`)
      })
    }

    // No quiz, errar não avança logo: o utilizador pode escolher a outra opção.
    // Só avançamos quando a opção correta é encontrada.
    if (chosen.correct) {
      setLocked(true)
      setTimeout(() => {
        setAttempted([])
        setLocked(false)
        dispatch(nextQuestion())
      }, ADVANCE_DELAY_MS)
    }
  }

  if (pool.length === 0) {
    return <TopicPicker />
  }

  const isDone =
    quiz.currentIndex >= quiz.questionIds.length && quiz.questionIds.length > 0

  return (
    <div className="mx-4 lg:mx-auto lg:max-w-[70%] xl:max-w-[50%] px-6 pt-7 pb-10">
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
            correct={quiz.sessionCorrect}
            wrong={quiz.sessionWrong}
            answered={answered}
            onRestart={() => {
              dispatch(endSession())
              startedKey.current = null
              setAnswered([])
              setAttempted([])
              setLocked(false)
            }}
          />
        ) : currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            index={quiz.currentIndex}
            total={quiz.questionIds.length}
            options={options}
            attempted={attempted}
            locked={locked}
            onSelect={handleSelect}
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
