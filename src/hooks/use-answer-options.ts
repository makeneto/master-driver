"use client"

import { useMemo } from "react"
import { useTranslation } from "./use-translation"
import { questions } from "@/data/questions"
import type { Question } from "@/types"
import {
  FALLBACK_DISTRACTOR,
  NO_ANSWER,
  NO_WORD,
  YES_ANSWER,
  YES_WORD,
} from "@/data/answer-options"
import { getFirstWord } from "@/utils/getFirstWord"

export type AnswerOption = { text: string; correct: boolean }

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 999.37) * 10000
  return x - Math.floor(x)
}

export function useAnswerOptions(question: Question | null): AnswerOption[] {
  const { language, questionText } = useTranslation()

  return useMemo(() => {
    if (!question) return []
    const { answer: correctAnswer } = questionText(question)
    const fw = getFirstWord(correctAnswer)

    let distractorText: string

    if (fw === YES_WORD[language]) {
      distractorText = NO_ANSWER[language]
    } else if (fw === NO_WORD[language]) {
      distractorText = YES_ANSWER[language]
    } else {
      const sameTopic = questions.filter(
        (q) => q.topic === question.topic && q.id !== question.id,
      )
      const pool =
        sameTopic.length > 0
          ? sameTopic
          : questions.filter((q) => q.id !== question.id)
      const candidates = pool
        .map((q) => questionText(q).answer)
        .filter(
          (a) => a.trim().toLowerCase() !== correctAnswer.trim().toLowerCase(),
        )
      distractorText =
        candidates.length > 0
          ? candidates[
              Math.floor(seededRandom(question.id) * candidates.length)
            ]
          : FALLBACK_DISTRACTOR[language]
    }

    const options: AnswerOption[] = [
      { text: correctAnswer, correct: true },
      { text: distractorText, correct: false },
    ]

    return seededRandom(question.id + 0.5) < 0.5
      ? options
      : [options[1], options[0]]
  }, [question, language, questionText])
}
