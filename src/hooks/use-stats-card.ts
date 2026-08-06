import { getQuestionsByTopic } from "@/data/questions"
import { TOPICS } from "@/data/topic-list"
import { useAppSelector } from "@/store/hooks"

export default function useStatsCard() {
  const topics = useAppSelector((s) => s.statistics.topics)

  const totalCorrect = Object.values(topics).reduce(
    (sum, tp) => sum + tp.correct,
    0,
  )
  const totalAnswered = Object.values(topics).reduce(
    (sum, tp) => sum + tp.totalQuestions,
    0,
  )
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  const completedCategories = TOPICS.filter(
    (tp) =>
      topics[tp.id].totalQuestions >= getQuestionsByTopic(tp.id).length &&
      topics[tp.id].totalQuestions > 0,
  ).length

  return { totalAnswered, overallAccuracy, completedCategories }
}
