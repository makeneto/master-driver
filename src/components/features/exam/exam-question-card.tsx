"use client";

import { motion } from "framer-motion";
import { HelpCircle, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { Question } from "@/types";

export function ExamQuestionCard({
  question,
  index,
  total,
  onEvaluate,
}: {
  question: Question;
  index: number;
  total: number;
  onEvaluate: (correct: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-xs tracking-wide text-[var(--color-text-faint)]">
            {t("exam.questionOf", { current: index + 1, total })}
          </span>
          <div className="lane-divider flex-1" />
        </div>

        <h2 className="font-[var(--font-display)] text-2xl font-semibold text-center leading-snug tracking-tight sm:text-3xl my-15">
          {question.question}
        </h2>

        <p className="mt-4 flex items-center gap-2 text-xs text-[var(--color-text-faint)]">
          <HelpCircle className="h-3.5 w-3.5" />
          {t("exam.revealAtEnd")}
        </p>

        <div className="mt-8 flex gap-3">
          <Button onClick={() => onEvaluate(true)} variant="success" size="lg" className="flex-1">
            <Check className="h-4 w-4" /> {t("exam.knowIt")}
          </Button>
          <Button onClick={() => onEvaluate(false)} variant="danger" size="lg" className="flex-1">
            <X className="h-4 w-4" /> {t("exam.dontKnow")}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
