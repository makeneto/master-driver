"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpenCheck,
  UserCircle2,
  Settings,
  GraduationCap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const ITEMS = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/quiz", label: t("nav.quiz"), icon: BookOpenCheck },
    { href: "/exam", label: t("nav.examModeMobile"), icon: GraduationCap },
    { href: "/settings", label: t("nav.settings"), icon: Settings },
  ]
  return (
    <nav className="glass-strong fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-full p-1.5 lg:hidden">
      {ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-1 rounded-xl py-1.5 px-4 text-xs transition-colors",
              active
                ? "glass text-[var(--color-gold)]"
                : "text-[var(--color-text-muted)]",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
