"use client"

import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import Link from "next/link"

import { useAppSelector } from "@/store/hooks"
import { getQuestionsByTopic, questions } from "@/data/questions"
import { TOPICS } from "@/data/topic-list"
import { TopicCard } from "@/components/features/home/topic-card"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const topicsStats = useAppSelector((s) => s.statistics.topics)
  const { t } = useTranslation()
  const profile = useAppSelector((s) => s.profile)
  const firstName = profile.name.split(" ")[0] || t("profile.defaultName")

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
      <section className="px-6 pt-7 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-15 md:mb-0 flex items-end justify-between">
            <div className="grid md:hidden">
              <span className="text-sm text-[var(--color-text-muted)] mb-0.5">
                {greeting}
              </span>
              <Link
                href="/profile"
                className="text-2xl font-semibold tracking-tight"
              >
                {firstName}
              </Link>
            </div>
          </div>

          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                {t("home.categories")}
              </h2>
              <span className="text-xs text-[var(--color-text-faint)]">
                {t("home.categoriesSummary", {
                  count: TOPICS.length,
                  questions: questions.length,
                })}
              </span>
            </div>

            <Button variant="gold" size="sm" asChild>
              <Link href="/quiz?mode=quick" className="flex items-center gap-1">
                <Zap />
                {t("home.quickQuiz")}
              </Link>
            </Button>
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
