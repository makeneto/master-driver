"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AnswerOption } from "@/hooks/use-answer-options"

export function AnswerOptions({
  options = [],
  attempted = [],
  locked = false,
  onSelect = () => {},
}: {
  options?: AnswerOption[]
  attempted?: number[]
  locked?: boolean
  onSelect?: (index: number) => void
}) {
  const safeOptions = options ?? []
  const safeAttempted = attempted ?? []

  return (
    <div className="mt-8 flex flex-col gap-3">
      {safeOptions.map((opt, i) => {
        const isAttempted = safeAttempted.includes(i)
        const showAsCorrect =
          (isAttempted && opt.correct) || (locked && opt.correct)
        const showAsWrong = isAttempted && !opt.correct
        const disabled = locked || isAttempted
        const dimmed = locked && !opt.correct && !isAttempted

        return (
          <motion.button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(i)}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            animate={showAsWrong ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 text-left text-sm transition-colors",
              !isAttempted &&
                !showAsCorrect &&
                !dimmed &&
                "border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-overlay-strong)]",
              showAsCorrect &&
                "border-[var(--color-success)] bg-[var(--color-success-soft)]",
              showAsWrong &&
                "border-[var(--color-danger)] bg-[var(--color-danger-soft)]",
              dimmed && "border-[var(--color-hairline)] opacity-50",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                !isAttempted &&
                  !showAsCorrect &&
                  "border-[var(--color-hairline-strong)] text-[var(--color-text-faint)]",
                showAsCorrect &&
                  "border-[var(--color-success)] bg-[var(--color-success)] text-[#062017]",
                showAsWrong &&
                  "border-[var(--color-danger)] bg-[var(--color-danger)] text-white",
                dimmed &&
                  "border-[var(--color-hairline)] text-[var(--color-text-faint)]",
              )}
            >
              {showAsCorrect ? (
                <Check className="h-3.5 w-3.5" />
              ) : showAsWrong ? (
                <X className="h-3.5 w-3.5" />
              ) : (
                String.fromCharCode(65 + i)
              )}
            </span>
            <span className="flex-1 text-[var(--color-text)]">{opt.text}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
