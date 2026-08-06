"use client"

import React from "react"
import { motion } from "framer-motion"

import Logo from "../ui/logo"
import HideMobileSidebar from "./hide-mobile-sidebar"
import SidebarFooter from "./sidebar-footer"
import MobileSidebarLinks from "./mobile-sidebar-links"

export interface SidebarDrawerProps {
  onClose: () => void
}

export function MobileSidebarDrawer({ onClose }: SidebarDrawerProps) {
  return (
    <React.Fragment>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
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
          <Logo />
          <HideMobileSidebar onClose={onClose} />
        </div>

        <MobileSidebarLinks onClose={onClose} />
        <SidebarFooter />
      </motion.aside>
    </React.Fragment>
  )
}
