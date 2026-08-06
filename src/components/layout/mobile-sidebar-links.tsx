import { useNavItems } from "@/hooks/use-nav-items"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarDrawerProps } from "./mobile-sidebar-drawer"
import { cn } from "@/lib/utils"

export default function MobileSidebarLinks({ onClose }: SidebarDrawerProps) {
  const pathname = usePathname()
  const navItems = useNavItems()

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
      {navItems.map((item) => {
        const active = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
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
  )
}
