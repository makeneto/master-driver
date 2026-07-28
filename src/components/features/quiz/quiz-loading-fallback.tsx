"use client";

import { useTranslation } from "@/hooks/use-translation";

export function QuizLoadingFallback() {
  const { t } = useTranslation();
  return <div className="p-16 text-center text-sm text-[var(--color-text-muted)]">{t("quiz.loading")}</div>;
}
