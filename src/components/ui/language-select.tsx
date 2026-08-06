"use client"

import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setLanguage } from "@/store/slices/settingsSlice"
import { LANGUAGE_LABELS, type Language } from "@/i18n/translations"
import { cn } from "@/lib/utils"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LANGUAGE_FLAG_IMAGES } from "@/constants/flagImages"
import LanguageList from "./language-list"

export function LanguageSelect({ className }: { className?: string }) {
  const dispatch = useAppDispatch()
  const language = useAppSelector((s) => s.settings.language)

  return (
    <Select
      value={language}
      onValueChange={(value) => dispatch(setLanguage(value as Language))}
    >
      <SelectTrigger
        aria-label="Idioma / Language / Langue"
        className={cn(
          "flex items-center gap-2 rounded-full border border-[var(--color-hairline-strong)] px-3 py-1.5 h-auto text-sm text-[var(--color-text)]",
          className,
        )}
      >
        <SelectValue>
          <div className="flex items-center gap-2">
            <Image
              src={LANGUAGE_FLAG_IMAGES[language]}
              alt={LANGUAGE_LABELS[language]}
              width={18}
              height={18}
              className="rounded-sm object-cover"
            />
            <span>{LANGUAGE_LABELS[language]}</span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <LanguageList />
    </Select>
  )
}
