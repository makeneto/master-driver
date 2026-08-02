"use client"

import * as React from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setLanguage } from "@/store/slices/settingsSlice"
import { LANGUAGE_LABELS, type Language } from "@/i18n/translations"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LANGUAGES: Language[] = ["pt", "en", "fr"]

const LANGUAGE_FLAG_IMAGES: Record<Language, string> = {
  pt: "/angola-flag.png",
  en: "/usa-flag.png",
  fr: "/france-flag.png",
}

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

      <SelectContent
        align="end"
        className="min-w-[140px] rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-surface)]"
      >
        {LANGUAGES.map((lang) => (
          <SelectItem
            key={lang}
            value={lang}
            className="cursor-pointer text-sm text-[var(--color-text)] focus:bg-[var(--color-overlay)]"
          >
            <div className="flex items-center gap-2">
              <Image
                src={LANGUAGE_FLAG_IMAGES[lang]}
                alt={LANGUAGE_LABELS[lang]}
                width={18}
                height={18}
                className="rounded-sm object-cover"
              />
              <span>{LANGUAGE_LABELS[lang]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
