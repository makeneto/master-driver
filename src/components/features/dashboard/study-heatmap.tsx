"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

function buildLastDays(count: number): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function StudyHeatmap({ studyDates }: { studyDates: string[] }) {
  const { t } = useTranslation()
  const days = buildLastDays(365)
  const studiedSet = new Set(studyDates)

  const weeks: string[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <Card className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle>{t("dashboard.heatmapTitle")}</CardTitle>
        <CardDescription>{t("dashboard.heatmapDesc")}</CardDescription>
      </CardHeader>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => {
              const studied = studiedSet.has(day)
              return (
                <div
                  key={day}
                  title={formatDate(day)}
                  className={cn(
                    "h-3.5 w-3.5 rounded-[4px] transition-colors",
                    studied
                      ? "bg-[var(--color-gold)]"
                      : "bg-[var(--color-overlay)]",
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>
    </Card>
  )
}
