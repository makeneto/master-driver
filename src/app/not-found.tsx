"use client"

import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-6xl px-6 pt-7 pb-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("notFound.title")}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t("notFound.description")}
        </p>
      </header>

      <Image
        src="/crashed-car.webp"
        alt="Not Found"
        width={600}
        height={400}
        className="w-[24rem] md:w-[30rem] h-auto mt-[10rem] sm:mt-[6rem] mx-auto"
      />
    </div>
  )
}
