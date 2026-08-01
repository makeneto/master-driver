"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "driving-master:sidebar-open"

/**
 * Estado de abertura da sidebar, guardado em sessionStorage.
 * sessionStorage é limpo quando a aba/sessão do browser termina, por isso
 * a sidebar volta a abrir automaticamente da próxima vez que o utilizador
 * iniciar uma nova sessão, mesmo que a tenha fechado por completo antes.
 */
export function useSidebarOpen() {
  const [open, setOpen] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored !== null) setOpen(stored === "1")
    } catch {
      // sessionStorage indisponível (ex: modo privado) — mantém o valor por defeito
    }
    setHydrated(true)
  }, [])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {
        // ignora se sessionStorage não estiver disponível
      }
      return next
    })
  }, [])

  return { open: hydrated ? open : true, toggle, hydrated }
}
