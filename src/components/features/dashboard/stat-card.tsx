"use client";

import CountUp from "react-countup";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  suffix,
  icon,
  accent = "gold",
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  accent?: "gold" | "teal" | "success" | "danger";
}) {
  const accentColor = {
    gold: "text-[var(--color-gold-soft)]",
    teal: "text-[var(--color-teal-soft)]",
    success: "text-[var(--color-success)]",
    danger: "text-[var(--color-danger)]",
  }[accent];

  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-overlay)]", accentColor)}>
        {icon}
      </div>
      <div>
        <p className="font-[var(--font-mono)] text-2xl font-semibold tracking-tight">
          <CountUp end={value} duration={1.1} suffix={suffix} />
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </Card>
  );
}
