import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import { ReduxProvider } from "@/providers/redux-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { HtmlLangSync } from "@/components/layout/html-lang-sync"
import { cn } from "@/lib/utils"
import Topbar from "@/components/layout/topbar"
import "../css/globals.css"
import { QuickQuizToast } from "@/components/layout/quick-quiz-toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  icons: "/favicon.ico",
  title: "Master Drive | Aprenda a conduzir jogando",
  description:
    "Estude para o exame de condução com um sistema de Active Recall gamificado: XP, níveis, conquistas e revisão inteligente.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className="bg-asphalt min-h-screen">
        <ThemeProvider>
          <ReduxProvider>
            <HtmlLangSync />
            <QuickQuizToast />

            <div className="flex min-h-screen">
              <Sidebar />
              
              <div className="w-full">
                <Topbar />
                <main className="flex-1 pb-24 lg:pb-0">{children}</main>
              </div>
            </div>
            
            <Toaster
              theme="dark"
              position="top-right"
              toastOptions={{
                style: {
                  background: "rgba(23,27,36,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#edeff3",
                },
              }}
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
