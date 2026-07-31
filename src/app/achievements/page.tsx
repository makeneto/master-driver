"use client"

import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { Card } from "@/components/ui/card"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

export default function AchievementsPage() {
  const achievements = useAppSelector((s) => s.achievements.items)
  const list = Object.values(achievements)
  const unlockedCount = list.filter((a) => a.unlocked).length
  const { t, achievementText } = useTranslation()

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight">
          {t("achievements.title")}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t("achievements.unlockedCount", {
            unlocked: unlockedCount,
            total: list.length,
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {list.map((a, i) => {
          const { title, description } = achievementText(a.id)
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={cn(
                  "flex items-center gap-4 p-5 transition-colors",
                  a.unlocked ? "border-[var(--color-gold)]/30" : "opacity-60",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                    a.unlocked
                      ? "bg-gradient-to-br from-[var(--color-gold)]/25 to-[var(--color-teal)]/25"
                      : "bg-[var(--color-overlay)]",
                  )}
                >
                  {a.unlocked ? (
                    <DynamicIcon
                      name={a.icon}
                      className="h-6 w-6 text-[var(--color-gold-soft)]"
                    />
                  ) : (
                    <Lock className="h-5 w-5 text-[var(--color-text-faint)]" />
                  )}
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-sm font-semibold">
                    {title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {description}
                  </p>
                  {a.unlocked && a.unlockedAt && (
                    <p className="mt-1 text-[10px] text-[var(--color-text-faint)]">
                      {t("achievements.unlockedOn", { date: a.unlockedAt })}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
