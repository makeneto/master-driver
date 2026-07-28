"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Medal } from "lucide-react"
import type { TopicMeta, TopicStats } from "@/types"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { Gauge } from "@/components/ui/gauge"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

export function TopicCard({
  topic,
  stats,
  questionCount,
  index,
}: {
  topic: TopicMeta
  stats: TopicStats
  questionCount: number
  index: number
}) {
  const { topicText, t } = useTranslation()
  const { name, description } = topicText(topic.id)
  const accuracy = stats.accuracy
  const isMastered = accuracy >= 90 && stats.totalQuestions >= questionCount

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/quiz?topic=${topic.id}`}>
        <Card className="group glass-hover relative overflow-hidden p-5 transition-color">
          {isMastered && (
            <Medal className="absolute right-4 top-4 h-5 w-5 text-[var(--color-gold)]" />
          )}

          <div className="flex items-start justify-between">
            <DynamicIcon
              name={topic.icon}
              className="h-7 w-7 text-[var(--color-gold-soft)]"
            />
            <Gauge value={accuracy} size={54} strokeWidth={5}>
              <span className="font-[var(--font-mono)] text-xs font-medium">
                {accuracy}%
              </span>
            </Gauge>
          </div>

          <h3 className="mt-4 font-[var(--font-display)] font-semibold tracking-tight">
            {name}
          </h3>
          <p className="mt-1 text-[0.86rem] line-clamp-1 text-[var(--color-text-muted)]">
            {description}
          </p>

          <span className="mt-5 flex justify-end text-xs text-[var(--color-text-faint)]">
            {stats.totalQuestions}/{questionCount}
          </span>
        </Card>
      </Link>
    </motion.div>
  )
}
