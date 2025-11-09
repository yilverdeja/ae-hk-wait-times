"use client"

import { ThemeProvider } from "@/providers/ThemeProvider"
import TanstackProvider from "@/providers/TanstackProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TanstackProvider>
        {children}
      </TanstackProvider>
    </ThemeProvider>
  )
}