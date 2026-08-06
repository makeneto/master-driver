import { TOPICS } from "@/data/topic-list"
import type { TopicMeta } from "@/types"

export const getTopicMeta = (id: TopicMeta["id"]) =>
  TOPICS.find((t) => t.id === id)!
