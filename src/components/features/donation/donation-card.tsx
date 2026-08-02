import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function DonationCard() {
  const { t } = useTranslation()

  return (
    <Link
      href="/donate"
      className="bg-[#ffb70050] dark:bg-[#1d190f] hover:bg-[#ffb70070] dark:hover:bg-[#19150d] transition-colors rounded-lg grid gap-1 p-3.5"
    >
      <h1 className="text-sm font-medium text-[#664d06] dark:text-[#d0b260]">
        {t("donate.titleCard")}
      </h1>
      <p className="text-xs text-[#6b5f3fbc] dark:text-[#b2aa94]">
        {t("donate.descriptionCard")}
      </p>
    </Link>
  )
}
