"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { TOPICS } from "@/constants/topics";
import type { StatisticsState } from "@/types";
import { useTranslation } from "@/hooks/use-translation";

export function TopicRankings({ topics }: { topics: StatisticsState }) {
  const { t, topicText } = useTranslation();
  const practiced = TOPICS.filter((tp) => topics[tp.id].totalQuestions > 0);
  const sorted = [...practiced].sort((a, b) => topics[b.id].accuracy - topics[a.id].accuracy);
  const strong = sorted.slice(0, 3);
  const weak = [...sorted].reverse().slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[var(--color-success)]" /> {t("dashboard.strongTitle")}
          </CardTitle>
          <CardDescription>{t("dashboard.strongDesc")}</CardDescription>
        </CardHeader>
        <ul className="space-y-2">
          {strong.length === 0 && <li className="text-sm text-[var(--color-text-faint)]">{t("dashboard.notEnoughData")}</li>}
          {strong.map((tp) => (
            <li key={tp.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <DynamicIcon name={tp.icon} className="h-4 w-4 text-[var(--color-text-muted)]" />
                {topicText(tp.id).name}
              </span>
              <span className="font-[var(--font-mono)] text-[var(--color-success)]">{topics[tp.id].accuracy}%</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-[var(--color-danger)]" /> {t("dashboard.weakTitle")}
          </CardTitle>
          <CardDescription>{t("dashboard.weakDesc")}</CardDescription>
        </CardHeader>
        <ul className="space-y-2">
          {weak.length === 0 && <li className="text-sm text-[var(--color-text-faint)]">{t("dashboard.notEnoughData")}</li>}
          {weak.map((tp) => (
            <li key={tp.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <DynamicIcon name={tp.icon} className="h-4 w-4 text-[var(--color-text-muted)]" />
                {topicText(tp.id).name}
              </span>
              <span className="font-[var(--font-mono)] text-[var(--color-danger)]">{topics[tp.id].accuracy}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
