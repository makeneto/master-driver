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
import { useAnswerOptions } from "@/hooks/use-answer-options"
import { ExamQuestionCard } from "./exam-question-card"
import { ExamResults } from "./exam-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { TopicId } from "@/types"

const EXAM_SIZE = 20
const ADVANCE_DELAY_MS = 1400

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
  const [attempted, setAttempted] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
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
    setAttempted([])
    setLocked(false)
  }

  const currentQuestion = useMemo(
    () => sessionQuestions.current[index] ?? null,
    [index],
  )
  const options = useAnswerOptions(currentQuestion)

  function handleSelect(optionIndex: number) {
    if (!currentQuestion || locked) return
    const chosen = options[optionIndex]
    const correct = chosen.correct

    // No modo exame não há nova tentativa: a primeira escolha é final.
    setAttempted([optionIndex])
    setLocked(true)

    dispatch(
      recordAnswer({
        topic: currentQuestion.topic,
        questionId: currentQuestion.id,
        correct,
      }),
    )
    dispatch(incrementAnswered())
    dispatch(registerStudyDay())

    if (correct) {
      setCorrectCount((c) => c + 1)
      dispatch(addXp(10))
    } else {
      setWrongIds((prev) => [...prev, currentQuestion.id])
      setFailedTopics((prev) => new Set(prev).add(currentQuestion.topic))
    }

    setTimeout(() => {
      setAttempted([])
      setLocked(false)
      if (index + 1 >= sessionQuestions.current.length) {
        setFinished(true)
      } else {
        setIndex((i) => i + 1)
      }
    }, ADVANCE_DELAY_MS)
  }

  const seconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-7 pb-10">
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <GraduationCap className="h-8 w-8 text-[var(--color-gold-soft)]" />
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">
            {t("exam.title")}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <ExamQuestionCard
            question={currentQuestion}
            index={index}
            total={sessionQuestions.current.length}
            options={options}
            attempted={attempted}
            locked={locked}
            onSelect={handleSelect}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
