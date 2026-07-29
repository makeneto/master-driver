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
  const days = buildLastDays(60)
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

      <div
        className="grid h-70 w-full gap-1 pt-2 pb-2"
        style={{
          gridTemplateRows: "repeat(7, minmax(0, 1fr))",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(0, 1fr)",
        }}
      >
        {weeks.map((week, wi) =>
          week.map((day) => {
            const studied = studiedSet.has(day)
            return (
              <div
                key={day}
                title={formatDate(day)}
                className={cn(
                  "h-full w-full rounded-[4px] transition-colors",
                  studied
                    ? "bg-[var(--color-gold)]"
                    : "bg-[var(--color-overlay)]",
                )}
              />
            )
          }),
        )}
      </div>
    </Card>
  )
}
