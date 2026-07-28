"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import {
  Moon,
  Sun,
  Laptop,
  Download,
  Upload,
  RotateCcw,
  Volume2,
  Sparkles,
  Languages,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  setSoundsEnabled,
  setAnimationsEnabled,
  setLanguage,
} from "@/store/slices/settingsSlice"
import { resetStatistics } from "@/store/slices/statisticsSlice"
import { resetProfile } from "@/store/slices/profileSlice"
import { resetAchievements } from "@/store/slices/achievementsSlice"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/misc"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import {
  LANGUAGE_LABELS,
  LANGUAGE_FLAGS,
  type Language,
} from "@/i18n/translations"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "persist:master-drive"
const LANGUAGES: Language[] = ["pt", "en", "fr"]

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((s) => s.settings)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  function handleExport() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      toast.error(t("settings.toastNoProgress"))
      return
    }
    const blob = new Blob([raw], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "master-drive-progresso.json"
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t("settings.toastExported"))
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = reader.result as string
        JSON.parse(text) // valida que é JSON
        localStorage.setItem(STORAGE_KEY, text)
        toast.success(t("settings.toastImported"))
        setTimeout(() => window.location.reload(), 800)
      } catch {
        toast.error(t("settings.toastInvalidFile"))
      }
    }
    reader.readAsText(file)
  }

  function handleReset() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      toast.warning(t("settings.toastConfirmReset"))
      setTimeout(() => setConfirmingReset(false), 4000)
      return
    }
    dispatch(resetStatistics())
    dispatch(resetProfile())
    dispatch(resetAchievements())
    setConfirmingReset(false)
    toast.success(t("settings.toastResetDone"))
  }

  return (
    <div className="mx-auto max-w-[70%] py-10">
      <h1 className="mb-8 font-[var(--font-display)] text-2xl font-semibold tracking-tight">
        {t("settings.title")}
      </h1>

      <div className="space-y-4">
        <SettingRow
          icon={<Sun className="h-4 w-4" />}
          title={t("settings.theme")}
          description={t("settings.themeDesc")}
        >
          <div className="flex items-center gap-1 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] p-1">
            <ThemeOption
              active={theme === "light"}
              onClick={() => setTheme("light")}
              icon={<Sun className="h-3.5 w-3.5" />}
            />
            <ThemeOption
              active={theme === "dark"}
              onClick={() => setTheme("dark")}
              icon={<Moon className="h-3.5 w-3.5" />}
            />
            <ThemeOption
              active={theme === "system"}
              onClick={() => setTheme("system")}
              icon={<Laptop className="h-3.5 w-3.5" />}
            />
          </div>
        </SettingRow>

        <SettingRow
          icon={<Languages className="h-4 w-4" />}
          title={t("settings.language")}
          description={t("settings.languageDesc")}
        >
          <select
            value={settings.language}
            onChange={(e) => dispatch(setLanguage(e.target.value as Language))}
            className="cursor-pointer rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] px-3 py-1.5 text-sm outline-none [&>option]:bg-[var(--color-surface)]"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_FLAGS[lang]} {LANGUAGE_LABELS[lang]}
              </option>
            ))}
          </select>
        </SettingRow>

        <SettingRow
          icon={<Volume2 className="h-4 w-4" />}
          title={t("settings.sounds")}
          description={t("settings.soundsDesc")}
        >
          <Switch
            checked={settings.soundsEnabled}
            onCheckedChange={(v) => dispatch(setSoundsEnabled(v))}
          />
        </SettingRow>

        <SettingRow
          icon={<Sparkles className="h-4 w-4" />}
          title={t("settings.animations")}
          description={t("settings.animationsDesc")}
        >
          <Switch
            checked={settings.animationsEnabled}
            onCheckedChange={(v) => dispatch(setAnimationsEnabled(v))}
          />
        </SettingRow>

        <Card className="p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle>{t("settings.dataTitle")}</CardTitle>
            <CardDescription>{t("settings.dataDesc")}</CardDescription>
          </CardHeader>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleExport}>
              <Download className="h-4 w-4" /> {t("settings.exportProgress")}
            </Button>
            <Button variant="secondary" onClick={handleImportClick}>
              <Upload className="h-4 w-4" /> {t("settings.importProgress")}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              hidden
              onChange={handleImportFile}
            />
            <Button variant="danger" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />{" "}
              {confirmingReset
                ? t("settings.confirmReset")
                : t("settings.resetProgress")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ThemeOption({
  active,
  onClick,
  icon,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-[var(--color-gold)] text-[#141620]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
      )}
    >
      {icon}
    </button>
  )
}

function SettingRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-[var(--color-text-muted)]">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {description}
          </p>
        </div>
      </div>
      {children}
    </Card>
  )
}
