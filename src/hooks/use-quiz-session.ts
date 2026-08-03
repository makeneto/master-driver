"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { useTranslation } from "@/hooks/use-translation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { questions, getQuestionsByTopic } from "@/data/questions"
import { TOPICS } from "@/constants/topics"
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
import { useAnswerOptions } from "@/hooks/use-answer-options"
import { SessionAnswer } from "@/components/features/quiz/session-complete"
import type { Question } from "@/types"

const ADVANCE_DELAY_MS = 1400

export function useQuizSession(
  topicParam: string | null,
  modeParam: string | null,
) {
  const dispatch = useAppDispatch()
  const quiz = useAppSelector((s) => s.quiz)
  const records = useAppSelector((s) => s.statistics.questionRecords)
  const topicsStats = useAppSelector((s) => s.statistics.topics)
  const achievements = useAppSelector((s) => s.achievements.items)
  const profile = useAppSelector((s) => s.profile)

  const [attempted, setAttempted] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [answered, setAnswered] = useState<SessionAnswer[]>([])
  const startedKey = useRef<string | null>(null)

  useStudyTimer(quiz.active)

  const sessionKey = `${topicParam ?? "all"}::${modeParam ?? "practice"}`

  const pool = useMemo(() => {
    if (modeParam === "quick") return questions
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
    const session = buildSession(
      pool,
      records,
      modeParam === "quick" ? 20 : undefined,
    )
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

  function onSelect(index: number) {
    if (!currentQuestion || locked || attempted.includes(index)) return
    const chosen = options[index]
    const isFirstPick = attempted.length === 0
    setAttempted((prev) => [...prev, index])

    if (isFirstPick) {
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
      const { achievementText } = useTranslation()
      toUnlock.forEach((id) => {
        dispatch(unlockAchievement(id))
        toast.success(`${achievementText(id).title}`)
      })
    }

    if (chosen.correct) {
      setLocked(true)
      setTimeout(() => {
        setAttempted([])
        setLocked(false)
        dispatch(nextQuestion())
      }, ADVANCE_DELAY_MS)
    }
  }

  function onRestart() {
    dispatch(endSession())
    startedKey.current = null
    setAnswered([])
    setAttempted([])
    setLocked(false)
  }

  const isDone =
    quiz.currentIndex >= quiz.questionIds.length && quiz.questionIds.length > 0

  return {
    pool,
    attempted,
    locked,
    showConfetti,
    answered,
    currentQuestion,
    options,
    isDone,
    currentIndex: quiz.currentIndex,
    total: quiz.questionIds.length,
    sessionCorrect: quiz.sessionCorrect,
    sessionWrong: quiz.sessionWrong,
    onSelect,
    onRestart,
  }
}
