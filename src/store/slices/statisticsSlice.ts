import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { QuestionRecord, StatisticsState, TopicId } from "@/types"
import { todayISO } from "@/lib/utils"
import { updateRecordAfterAnswer } from "@/lib/recall-algorithm"
import { TOPICS } from "@/data/topic-list"

type State = {
  topics: StatisticsState
  questionRecords: Record<number, QuestionRecord>
}

function emptyTopicStats() {
  return TOPICS.reduce((acc, t) => {
    acc[t.id] = {
      totalQuestions: 0,
      correct: 0,
      wrong: 0,
      accuracy: 0,
      lastPlayed: "",
      streak: 0,
    }
    return acc
  }, {} as StatisticsState)
}

const initialState: State = {
  topics: emptyTopicStats(),
  questionRecords: {},
}

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    recordAnswer: (
      state,
      action: PayloadAction<{
        topic: TopicId
        questionId: number
        correct: boolean
      }>,
    ) => {
      const { topic, questionId, correct } = action.payload
      const t = state.topics[topic]
      t.totalQuestions += 1
      if (correct) {
        t.correct += 1
        t.streak += 1
      } else {
        t.wrong += 1
        t.streak = 0
      }
      t.accuracy = Math.round((t.correct / t.totalQuestions) * 100)
      t.lastPlayed = todayISO()

      state.questionRecords[questionId] = updateRecordAfterAnswer(
        state.questionRecords[questionId],
        questionId,
        correct,
      )
    },
    resetStatistics: () => initialState,
  },
})

export const { recordAnswer, resetStatistics } = statisticsSlice.actions
export default statisticsSlice.reducer
