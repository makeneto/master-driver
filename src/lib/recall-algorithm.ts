import type { Question, QuestionRecord } from "@/types"

const DEFAULT_WEIGHT = 3
const WRONG_PENALTY_WEIGHT = 5
const CORRECT_DECAY = 0.6
const MIN_WEIGHT = 0.5

export function getRecordWeight(record: QuestionRecord | undefined): number {
  if (!record || record.seen === 0) return DEFAULT_WEIGHT + 1
  if (record.lastResult === "wrong") return WRONG_PENALTY_WEIGHT
  const decayed = record.weight * CORRECT_DECAY
  return Math.max(decayed, MIN_WEIGHT)
}

export function updateRecordAfterAnswer(
  record: QuestionRecord | undefined,
  questionId: number,
  wasCorrect: boolean,
): QuestionRecord {
  const base: QuestionRecord = record ?? {
    questionId,
    seen: 0,
    correct: 0,
    wrong: 0,
    weight: DEFAULT_WEIGHT,
    lastResult: null,
  }

  const seen = base.seen + 1
  const correct = base.correct + (wasCorrect ? 1 : 0)
  const wrong = base.wrong + (wasCorrect ? 0 : 1)
  const weight = wasCorrect
    ? Math.max(base.weight * CORRECT_DECAY, MIN_WEIGHT)
    : WRONG_PENALTY_WEIGHT

  return {
    questionId,
    seen,
    correct,
    wrong,
    weight,
    lastResult: wasCorrect ? "correct" : "wrong",
  }
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function buildSession(
  pool: Question[],
  records: Record<number, QuestionRecord>,
  limit?: number,
): Question[] {
  const weighted = pool.map((q) => ({
    q,
    weight: getRecordWeight(records[q.id]),
  }))

  const sorted = weighted.sort((a, b) => b.weight - a.weight)
  const topHalf = shuffle(sorted.slice(0, Math.ceil(sorted.length / 2)))
  const restHalf = shuffle(sorted.slice(Math.ceil(sorted.length / 2)))
  const merged = shuffle([...topHalf, ...restHalf]).map((w) => w.q)

  return limit ? merged.slice(0, limit) : merged
}
