"use client"

import { TrendingDown } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { StatisticsState } from "@/types"
import { useTranslation } from "@/hooks/use-translation"
import WeakCategories from "./weak-categories"

export function TopicRankings({ topics }: { topics: StatisticsState }) {
  const { t } = useTranslation()

  return (
    <Card className="p-6">
      <CardHeader className="p-0 pb-7">
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-[var(--color-danger)]" />{" "}
          {t("dashboard.weakTitle")}
        </CardTitle>
        <CardDescription>{t("dashboard.weakDesc")}</CardDescription>
      </CardHeader>

      <WeakCategories topics={topics} />
    </Card>
  )
}
