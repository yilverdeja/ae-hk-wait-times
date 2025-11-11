"use client"

import { ThemeProvider } from "@/providers/ThemeProvider"
import { LanguageProvider } from "@/providers/LanguageProvider"
import TanstackProvider from "@/providers/TanstackProvider"
import { MicrosoftClarity } from "@/providers/MicrosoftClarity"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            enableColorScheme={true}
            disableTransitionOnChange={false}
        >
            <LanguageProvider>
                <TanstackProvider>
                    {children}
                    <MicrosoftClarity />
                </TanstackProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}
