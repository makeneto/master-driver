"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { StatisticsState } from "@/types"
import { useTranslation } from "@/hooks/use-translation"
import { TOPICS } from "@/data/topic-list"

export function PerformanceRadarChart({ topics }: { topics: StatisticsState }) {
  const { t, topicText } = useTranslation()
  const data = TOPICS.map((tp) => {
    const name = topicText(tp.id).name
    return {
      name: name.length > 12 ? name.slice(0, 11) + "…" : name,
      Precisão: topics[tp.id].accuracy,
    }
  })

  return (
    <Card className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle>{t("dashboard.radarChartTitle")}</CardTitle>
        <CardDescription>{t("dashboard.radarChartDesc")}</CardDescription>
      </CardHeader>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="75%">
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "#8b93a1", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#5c6472", fontSize: 9 }}
            />
            <Radar
              dataKey="Precisão"
              stroke="#34d1bf"
              fill="#34d1bf"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "#171b24",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
