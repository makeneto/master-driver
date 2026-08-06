import { LANGUAGES } from "@/constants/languages"
import { SelectContent, SelectItem } from "./select"
import Image from "next/image"
import { LANGUAGE_LABELS } from "@/i18n/translations"
import { LANGUAGE_FLAG_IMAGES } from "@/constants/flagImages"

export default function LanguageList() {
  return (
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
  )
}
