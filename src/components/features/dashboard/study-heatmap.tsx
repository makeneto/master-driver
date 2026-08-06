"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { buildLastDays } from "@/utils/buildLastDays"
import HeatmapContent from "./heatmap-content"

export function StudyHeatmap({ studyDates }: { studyDates: string[] }) {
  const { t } = useTranslation()

  return (
    <Card className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle>{t("dashboard.heatmapTitle")}</CardTitle>
        <CardDescription>{t("dashboard.heatmapDesc")}</CardDescription>
      </CardHeader>

      <HeatmapContent studyDates={studyDates} />
    </Card>
  )
}
