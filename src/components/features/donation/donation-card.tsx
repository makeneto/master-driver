import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function DonationCard() {
  const { t } = useTranslation()

  return (
    <Link
      href="/donate"
      className="
        bg-[#dcd0b4] dark:bg-[#2b2007]  
        hover:bg-[#c2b8a1] dark:hover:bg-[#322508] 

        md:bg-[#ffb70050] dark:md:bg-[#19150d]
        md:hover:bg-[#ffb70070] md:dark:hover:bg-[#221a05] 

        transition-colors rounded-lg grid gap-1 p-3.5"
    >
      <h1 className="text-sm font-medium text-[#664d06] dark:text-[#d0b260]">
        {t("donate.titleCard")}
      </h1>
      <p className="text-xs text-[#362d13bc] dark:text-[#b2aa94] md:text-[#6b5f3fe3] ">
        {t("donate.descriptionCard")}
      </p>
    </Link>
  )
}
