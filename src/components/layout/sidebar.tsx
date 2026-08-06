"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useSidebarOpen } from "@/hooks/use-sidebar-open"
import Logo from "../ui/logo"
import SidebarLinks from "./sidebar-links"
import SidebarFooter from "./sidebar-footer"
import SidebarCloseButton from "./sidebar-close-button"
import SidebarOpenButton from "./sidebar-open-button"

export function Sidebar() {
  const { open, toggle, hydrated } = useSidebarOpen()

  return (
    <React.Fragment>
      <motion.aside
        initial={false}
        animate={{ width: open ? 240 : 0 }}
        transition={
          hydrated
            ? { type: "spring", stiffness: 320, damping: 34 }
            : { duration: 0 }
        }
        className="hidden sm:block sticky top-0  h-screen shrink-0 overflow-hidden border-r border-[var(--color-gray-muted)] "
        style={{ borderRightWidth: open ? 1 : 0 }}
      >
        <div className="flex h-screen w-[240px] flex-col gap-1 p-4">
          <div className="mb-6 flex items-center justify-between gap-2 px-2 pt-2">
            <Logo />
            <SidebarCloseButton toggle={toggle} />
          </div>

          <SidebarLinks />
          <SidebarFooter />
        </div>
      </motion.aside>

      <AnimatePresence>
        {!open && hydrated && <SidebarOpenButton toggle={toggle} />}
      </AnimatePresence>
    </React.Fragment>
  )
}
