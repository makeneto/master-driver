"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { useNavItems } from "@/hooks/use-nav-items"
import { Button } from "../ui/button"
import Logo from "../ui/logo"
import { cn } from "@/lib/utils"
import DonationCard from "../features/donation/donation-card"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = useNavItems()
  const currentYear = new Date().getFullYear()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="glass-hover flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text)]"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="glass-strong fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[80vw] flex-col gap-1 border-r border-[var(--color-hairline-strong)] p-4 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between gap-2 px-2 pt-2">
                <div className="w-[70%]">
                  <Logo />
                </div>

                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-overlay)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="relative"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          active
                            ? "bg-[var(--color-overlay-strong)] text-[var(--color-text)]"
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
