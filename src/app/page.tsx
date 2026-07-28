"use client"

import { useAppSelector } from "@/store/hooks"
import { TOPICS } from "@/constants/topics"
import { getQuestionsByTopic, questions } from "@/data/questions"
import { TopicCard } from "@/components/features/home/topic-card"
import { useTranslation } from "@/hooks/use-translation"

export default function HomePage() {
  const topicsStats = useAppSelector((s) => s.statistics.topics)
  const { t } = useTranslation()

  return (
    <div>
      <section className="px-6 pt-10 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight">
              {t("home.categories")}
            </h2>
            <span className="text-xs text-[var(--color-text-faint)]">
              {t("home.categoriesSummary", {
                count: TOPICS.length,
                questions: questions.length,
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOPICS.map((topic, i) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                stats={topicsStats[topic.id]}
                questionCount={getQuestionsByTopic(topic.id).length}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
