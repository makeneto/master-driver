"use client"

import { useMemo, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { questions } from "@/data/questions"
import { shuffle } from "@/lib/recall-algorithm"
import { recordAnswer } from "@/store/slices/statisticsSlice"
import {
  incrementAnswered,
  registerStudyDay,
  addXp,
} from "@/store/slices/profileSlice"
import { useStudyTimer } from "@/hooks/use-study-timer"
import { ExamQuestionCard } from "./exam-question-card"
import { ExamResults } from "./exam-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { TopicId } from "@/types"

const EXAM_SIZE = 20

export function ExamContent() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongIds, setWrongIds] = useState<number[]>([])
  const [failedTopics, setFailedTopics] = useState<Set<TopicId>>(new Set())
  const [startedAt, setStartedAt] = useState<number>(0)
  const [finished, setFinished] = useState(false)
  const sessionQuestions = useRef(questions)

  useStudyTimer(started && !finished)

  function startExam() {
    sessionQuestions.current = shuffle(questions).slice(0, EXAM_SIZE)
    setIndex(0)
    setCorrectCount(0)
    setWrongIds([])
    setFailedTopics(new Set())
    setStartedAt(Date.now())
    setStarted(true)
    setFinished(false)
  }

  function handleEvaluate(correct: boolean) {
    const q = sessionQuestions.current[index]
    dispatch(recordAnswer({ topic: q.topic, questionId: q.id, correct }))
    dispatch(incrementAnswered())
    dispatch(registerStudyDay())

    if (correct) {
      setCorrectCount((c) => c + 1)
      dispatch(addXp(10))
    } else {
      setWrongIds((prev) => [...prev, q.id])
      setFailedTopics((prev) => new Set(prev).add(q.topic))
    }

    if (index + 1 >= sessionQuestions.current.length) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  const currentQuestion = useMemo(
    () => sessionQuestions.current[index],
    [index],
  )
  const seconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-8 font-[var(--font-display)] text-2xl font-semibold tracking-tight">{t("nav.examModeMobile")}</h1>

        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <GraduationCap className="h-8 w-8 text-[var(--color-gold-soft)]" />
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">
            {t("exam.title")}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {t("exam.intro", { count: EXAM_SIZE })}
          </p>
          <Button size="lg" onClick={startExam}>
            {t("exam.start")}
          </Button>
        </Card>
      </div>
    )
  }

  if (finished) {
    return (
      <ExamResults
        total={sessionQuestions.current.length}
        correct={correctCount}
        wrong={wrongIds.length}
        seconds={seconds}
        failedTopics={Array.from(failedTopics)}
        wrongQuestionIds={wrongIds}
        onRestart={() => {
          setStarted(false)
        }}
      />
    )
  }

  return (
    <div className="mx-4 lg:mx-auto lg:max-w-[70%] xl:max-w-[50%] py-10 lg:py-16">
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <ExamQuestionCard
            question={currentQuestion}
            index={index}
            total={sessionQuestions.current.length}
            onEvaluate={handleEvaluate}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
