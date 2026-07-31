"use client"

import { useAppSelector } from "@/store/hooks"
import { TOPICS } from "@/constants/topics"
import { getQuestionsByTopic, questions } from "@/data/questions"
import { TopicCard } from "@/components/features/home/topic-card"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function HomePage() {
  const topicsStats = useAppSelector((s) => s.statistics.topics)
  const { t } = useTranslation()
  const profile = useAppSelector((s) => s.profile)
  const firstName = profile.name.split(" ")[0]

  const now = new Date()
  const hour = now.getHours()
  const [greeting, setGreeting] = useState<string>("")

  useEffect(() => {
    if (hour < 12) {
      setGreeting(t("greeting.morning"))
    } else if (hour < 18) {
      setGreeting(t("greeting.afternoon"))
    } else {
      setGreeting(t("greeting.evening"))
    }
  }, [t, hour])

  return (
    <div>
      <section className="px-6 pt-10 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div className="grid">
              <span className="text-sm text-[var(--color-text-muted)] mb-0.5">
                {greeting}
              </span>
              <Link
                href="/profile"
                className="font-[var(--font-display)] text-2xl font-semibold tracking-tight"
              >
                {firstName}
              </Link>
            </div>

            <Link
              href="/profile"
              className="lg:hidden w-9.5 h-9.5 rounded-full mb-2 dark:bg-white bg-amber-400"
            >
              <Image
                src="/avatar.svg"
                alt={`${firstName}'s Profile`}
                width={1900}
                height={900}
              />
            </Link>
          </div>

          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-[var(--font-display)] text-lg font-semibold tracking-tight">
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
