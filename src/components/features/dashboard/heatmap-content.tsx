import { cn, formatDate } from "@/lib/utils"
import { buildLastDays } from "@/utils/buildLastDays"

export default function HeatmapContent({
  studyDates,
}: {
  studyDates: string[]
}) {
  const days = buildLastDays(60)
  const studiedSet = new Set(studyDates)

  const weeks: string[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div
      className="grid h-70 w-full gap-1 pt-2 pb-2"
      style={{
        gridTemplateRows: "repeat(7, minmax(0, 1fr))",
        gridAutoFlow: "column",
        gridAutoColumns: "minmax(0, 1fr)",
      }}
    >
      {weeks.map((week) =>
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
  )
}
