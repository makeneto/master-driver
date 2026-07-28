"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TOPICS } from "@/constants/topics";
import type { StatisticsState } from "@/types";
import { useTranslation } from "@/hooks/use-translation";

export function AccuracyBarChart({ topics }: { topics: StatisticsState }) {
  const { t, topicText } = useTranslation();
  const data = TOPICS.map((tp) => {
    const name = topicText(tp.id).name;
    return {
      name: name.length > 14 ? name.slice(0, 13) + "…" : name,
      Precisão: topics[tp.id].accuracy,
    };
  });

  return (
    <Card className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle>{t("dashboard.barChartTitle")}</CardTitle>
        <CardDescription>{t("dashboard.barChartDesc")}</CardDescription>
      </CardHeader>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#8b93a1", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: "#8b93a1", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                background: "#171b24",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 12,
              }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="Precisão" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5b942" />
                <stop offset="100%" stopColor="#34d1bf" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
