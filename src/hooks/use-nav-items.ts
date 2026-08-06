"use client"

import {
  Home,
  LayoutDashboard,
  BookOpenCheck,
  GraduationCap,
  Trophy,
  UserCircle2,
  Settings,
  BookMarked,
  type LucideIcon,
} from "lucide-react"
import { useTranslation } from "./use-translation"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export function useNavItems(): NavItem[] {
  const { t } = useTranslation()

  return [
    {
      href: "/",
      label: t("nav.home"),
      icon: Home,
    },
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
    },
    { href: "/notebook", label: t("nav.notebook"), icon: BookMarked },
    {
      href: "/quiz",
      label: t("nav.quiz"),
      icon: BookOpenCheck,
    },
    {
      href: "/exam",
      label: t("nav.examMode"),
      icon: GraduationCap,
    },
    {
      href: "/achievements",
      label: t("nav.achievements"),
      icon: Trophy,
    },
    {
      href: "/profile",
      label: t("nav.profile"),
      icon: UserCircle2,
    },
    {
      href: "/settings",
      label: t("nav.settings"),
      icon: Settings,
    },
  ]
}
