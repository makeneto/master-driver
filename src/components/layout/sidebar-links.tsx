import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

import { useNavItems } from "@/hooks/use-nav-items"
import { cn } from "@/lib/utils"

export default function SidebarLinks() {
  const pathname = usePathname()
  const navItems = useNavItems()

  return (
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
  )
}
