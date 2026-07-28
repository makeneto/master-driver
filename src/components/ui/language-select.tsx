"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@/store/slices/settingsSlice";
import { LANGUAGE_LABELS, LANGUAGE_FLAGS, type Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const LANGUAGES: Language[] = ["pt", "en", "fr"];

export function LanguageSelect({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const language = useAppSelector((s) => s.settings.language);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] px-3 py-1.5",
        className
      )}
    >
      <Languages className="h-4 w-4 text-[var(--color-text-muted)]" />
      <select
        value={language}
        onChange={(e) => dispatch(setLanguage(e.target.value as Language))}
        aria-label="Idioma / Language / Langue"
        className="cursor-pointer bg-transparent text-sm text-[var(--color-text)] outline-none [&>option]:bg-[var(--color-surface)] [&>option]:text-[var(--color-text)]"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_FLAGS[lang]} {LANGUAGE_LABELS[lang]}
          </option>
        ))}
      </select>
    </div>
  );
}
