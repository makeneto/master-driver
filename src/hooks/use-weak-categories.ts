import { TOPICS } from "@/data/topic-list"
import { StatisticsState } from "@/types"

export default function useWeakCategories({
  topics,
}: {
  topics: StatisticsState
}) {
  const practiced = TOPICS.filter((tp) => topics[tp.id].totalQuestions > 0)
  const sorted = [...practiced].sort(
    (a, b) => topics[b.id].accuracy - topics[a.id].accuracy,
  )

  const weak = [...sorted].reverse().slice(0, 3)

  return weak
}
