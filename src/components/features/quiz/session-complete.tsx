"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PartyPopper, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge } from "@/components/ui/gauge";
import { useTranslation } from "@/hooks/use-translation";

export function SessionComplete({
  correct,
  wrong,
  onRestart,
}: {
  correct: number;
  wrong: number;
  onRestart: () => void;
}) {
  const { t } = useTranslation();
  const total = correct + wrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="flex flex-col items-center gap-6 p-10 text-center">
        <PartyPopper className="h-8 w-8 text-[var(--color-gold)]" />
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">{t("quiz.sessionComplete")}</h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {t("quiz.sessionSummary", { correct, wrong })}
          </p>
        </div>

        <Gauge value={pct} size={120} strokeWidth={9}>
          <span className="font-[var(--font-mono)] text-2xl font-semibold">{pct}%</span>
        </Gauge>

        <div className="flex flex-col gap-3 sm:flex-row mt-8">
          <Button onClick={onRestart} variant="secondary" size="lg">
            <RotateCcw className="h-4 w-4" />
            {t("quiz.restart")}
          </Button>
          <Button asChild size="lg">
            <Link href="/">{t("quiz.backHome")}</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
