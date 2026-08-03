"use client"

import { useMemo, useRef, useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { questions } from "@/data/questions"
import { shuffle } from "@/lib/recall-algorithm"
import { recordAnswer } from "@/store/slices/statisticsSlice"
import {
  incrementAnswered,
  registerStudyDay,
  addXp,
} from "@/store/slices/profileSlice"
import { useStudyTimer } from "@/hooks/use-study-timer"
import { useAnswerOptions, AnswerOption } from "@/hooks/use-answer-options"
import type { Question, TopicId } from "@/types"

const EXAM_SIZE = 20
const ADVANCE_DELAY_MS = 1400

export type UseExamSessionReturn = {
  started: boolean
  startExam: () => void
  index: number
  currentQuestion: Question | null
  options: AnswerOption[]
  attempted: number[]
  locked: boolean
  finished: boolean
  correctCount: number
  wrongIds: number[]
  failedTopics: TopicId[]
  seconds: number
  onSelect: (optionIndex: number) => void
  onRestart: () => void
  total: number
}

export function useExamSession(): UseExamSessionReturn {
  const dispatch = useAppDispatch()
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongIds, setWrongIds] = useState<number[]>([])
  const [failedTopics, setFailedTopics] = useState<Set<TopicId>>(new Set())
  const [startedAt, setStartedAt] = useState<number>(0)
  const [finished, setFinished] = useState(false)
  const [attempted, setAttempted] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const sessionQuestions = useRef<Question[]>(questions)

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

  function onSelect(optionIndex: number) {
    if (!currentQuestion || locked) return
    const chosen = options[optionIndex]
    const correct = chosen.correct

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

  function onRestart() {
    setStarted(false)
  }

  return {
    started,
    startExam,
    index,
    currentQuestion,
    options,
    attempted,
    locked,
    finished,
    correctCount,
    wrongIds,
    failedTopics: Array.from(failedTopics),
    seconds,
    onSelect,
    onRestart,
    total: sessionQuestions.current.length,
  }
}
