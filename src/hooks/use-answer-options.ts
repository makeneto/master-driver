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

function normalize(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
}

type QuestionType = "quem" | "oque" | "qual" | "quando" | "quanto" | "outro"

function getQuestionType(questionText: string): QuestionType {
  const q = normalize(questionText)

  if (q.startsWith("quem")) return "quem"
  if (q.startsWith("quando") || q.startsWith("em que altura")) return "quando"
  if (
    q.startsWith("quanto") ||
    q.startsWith("quantos") ||
    q.startsWith("quantas")
  )
    return "quanto"
  if (q.startsWith("qual") || q.startsWith("quais")) return "qual"
  if (q.startsWith("o que") || q.startsWith("que ") || q.startsWith("o que é"))
    return "oque"

  return "outro"
}

export function useAnswerOptions(question: Question | null): AnswerOption[] {
  const { language, questionText } = useTranslation()

  return useMemo(() => {
    if (!question) return []
    const { question: currentQuestionText, answer: correctAnswer } =
      questionText(question)
    const fw = normalize(getFirstWord(correctAnswer))
    const yesWord = normalize(YES_WORD[language])
    const noWord = normalize(NO_WORD[language])

    let distractorText: string

    if (fw === yesWord) {
      distractorText = NO_ANSWER[language]
    } else if (fw === noWord) {
      distractorText = YES_ANSWER[language]
    } else {
      const questionType = getQuestionType(currentQuestionText)

      const otherQuestions = questions.filter((q) => q.id !== question.id)

      const annotated = otherQuestions.map((q) => {
        const t = questionText(q)
        return {
          topic: q.topic,
          type: getQuestionType(t.question),
          answer: t.answer,
        }
      })

      const answerIsDifferent = (a: string) =>
        a.trim().toLowerCase() !== correctAnswer.trim().toLowerCase()

      const sameTopicSameType = annotated.filter(
        (q) =>
          q.topic === question.topic &&
          q.type === questionType &&
          answerIsDifferent(q.answer),
      )

      const sameTypeAnyTopic = annotated.filter(
        (q) => q.type === questionType && answerIsDifferent(q.answer),
      )

      const sameTopicAnyType = annotated.filter(
        (q) => q.topic === question.topic && answerIsDifferent(q.answer),
      )

      const candidates =
        sameTopicSameType.length > 0
          ? sameTopicSameType
          : sameTypeAnyTopic.length > 0
            ? sameTypeAnyTopic
            : sameTopicAnyType

      distractorText =
        candidates.length > 0
          ? candidates[
              Math.floor(seededRandom(question.id) * candidates.length)
            ].answer
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
