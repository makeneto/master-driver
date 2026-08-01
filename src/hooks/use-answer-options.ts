"use client"

import { useMemo } from "react"
import { useTranslation } from "./use-translation"
import { questions } from "@/data/questions"
import type { Question } from "@/types"

export type AnswerOption = { text: string; correct: boolean }

const YES_WORD: Record<string, string> = { pt: "sim", en: "yes", fr: "oui" }
const NO_WORD: Record<string, string> = { pt: "não", en: "no", fr: "non" }
const YES_ANSWER: Record<string, string> = {
  pt: "Sim.",
  en: "Yes.",
  fr: "Oui.",
}
const NO_ANSWER: Record<string, string> = { pt: "Não.", en: "No.", fr: "Non." }
const FALLBACK_DISTRACTOR: Record<string, string> = {
  pt: "Nenhuma das anteriores.",
  en: "None of the above.",
  fr: "Aucune de ces réponses.",
}

function firstWord(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:]/g, "")
      .split(/\s+/)[0] ?? ""
  )
}

/** Pseudo-aleatório determinístico a partir de um número (estável entre re-renders). */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 999.37) * 10000
  return x - Math.floor(x)
}

/** Gera as 2 opções de resposta (correta + distrator) para uma pergunta, já baralhadas. */
export function useAnswerOptions(question: Question | null): AnswerOption[] {
  const { language, questionText } = useTranslation()

  return useMemo(() => {
    if (!question) return []
    const { answer: correctAnswer } = questionText(question)
    const fw = firstWord(correctAnswer)

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
