import { useTranslation } from "@/hooks/use-translation"

export default function QuizIntro() {
  const { t } = useTranslation()

  return (
    <header>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        {t("quiz.chooseTopic")}
      </h1>
      <p className="mb-8 text-sm text-[var(--color-text-muted)]">
        {t("quiz.chooseTopicDesc")}
      </p>
    </header>
  )
}
