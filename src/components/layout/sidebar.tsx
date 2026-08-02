"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavItems } from "@/hooks/use-nav-items"
import { useSidebarOpen } from "@/hooks/use-sidebar-open"
import { LanguageSelect } from "@/components/ui/language-select"
import Logo from "../ui/logo"
import { Button } from "../ui/button"
import DonationCard from "../features/donation/donation-card"

export function Sidebar() {
  const pathname = usePathname()
  const navItems = useNavItems()
  const { open, toggle, hydrated } = useSidebarOpen()
  const currentYear = new Date().getFullYear()

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: open ? 240 : 0 }}
        transition={
          hydrated
            ? { type: "spring", stiffness: 320, damping: 34 }
            : { duration: 0 }
        }
        className="sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-[var(--color-gray-muted)] lg:block"
        style={{ borderRightWidth: open ? 1 : 0 }}
      >
        <div className="flex h-screen w-[240px] flex-col gap-1 p-4">
          <div className="mb-6 flex items-center justify-between gap-2 px-2 pt-2">
            <div className="w-[70%]">
              <Logo />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggle}
              aria-label="Fechar menu lateral"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="relative">
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-[var(--color-overlay-strong)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
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

          <section className="grid gap-3">
            <DonationCard />
            <p className="text-[10px] text-center tracking-widest text-[var(--color-text-muted)]">
              © Makene Neto | {currentYear}
            </p>
          </section>
        </div>
      </motion.aside>

      <AnimatePresence>
        {!open && hydrated && (
          <motion.button
            type="button"
            onClick={toggle}
            aria-label="Abrir menu lateral"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="glass fixed left-0 top-18 z-40 hidden h-11 w-8 items-center justify-center rounded-r-full border border-l-0 border-[var(--color-hairline-strong)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] lg:flex"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
