"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "driving-master:sidebar-open"

export function useSidebarOpen() {
  const [open, setOpen] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored !== null) setOpen(stored === "1")
    } catch {}
    setHydrated(true)
  }, [])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {}
      return next
    })
  }, [])

  return { open: hydrated ? open : true, toggle, hydrated }
}
