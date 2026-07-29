"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpenCheck,
  Trophy,
  UserCircle2,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const ITEMS = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/quiz", label: t("nav.quiz"), icon: BookOpenCheck },
    { href: "/achievements", label: t("nav.achievements"), icon: Trophy },
    { href: "/profile", label: t("nav.profile"), icon: UserCircle2 },
    { href: "/settings", label: t("nav.settings"), icon: Settings },
  ]
  return (
    <nav className="glass-strong fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-full px-2 py-2 lg:hidden">
      {ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] transition-colors",
              active
                ? "text-[var(--color-gold)]"
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
