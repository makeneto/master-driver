"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  LayoutDashboard,
  BookOpenCheck,
  GraduationCap,
  Trophy,
  UserCircle2,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelect } from "@/components/ui/language-select"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const NAV_ITEMS = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/quiz", label: t("nav.quiz"), icon: BookOpenCheck },
    { href: "/exame", label: t("nav.examMode"), icon: GraduationCap },
    { href: "/conquistas", label: t("nav.achievements"), icon: Trophy },
    { href: "/perfil", label: t("nav.profile"), icon: UserCircle2 },
    { href: "/configuracoes", label: t("nav.settings"), icon: Settings },
  ]

  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] flex-col gap-1 border-r border-[var(--color-hairline)] p-4 lg:flex">
      <div className="mb-6 flex items-center justify-between gap-2 px-2 pt-2">
        <div className="flex items-center gap-2">
          <div className="lane-divider w-6" />
          <span className="font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]">
            Master <span className="text-gradient-gold">Drive</span>
          </span>
        </div>
        <ThemeToggle />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="relative">
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-[0.5rem] bg-[var(--color-overlay-strong)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <div
                className={cn(
                  "relative z-10 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={2} />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="mb-4" />
      <LanguageSelect className="mb-3 w-full" />
      <p className="px-2 text-[10px] text-center tracking-widest text-[var(--color-text-faint)]">
        © Makene Neto | {currentYear}
      </p>
    </aside>
  )
}
