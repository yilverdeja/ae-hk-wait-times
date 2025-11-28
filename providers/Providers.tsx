"use client"

import { LanguageProvider } from "@/providers/LanguageProvider"
import { MicrosoftClarity } from "@/providers/MicrosoftClarity"
import TanstackProvider from "@/providers/TanstackProvider"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { LanguageCode } from "@/types"

export default function Providers({
    children,
    initialLang,
}: {
    children: React.ReactNode
    initialLang: LanguageCode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            enableColorScheme={true}
            disableTransitionOnChange={false}
        >
            <LanguageProvider initialLang={initialLang}>
                <TanstackProvider>
                    {children}
                    <MicrosoftClarity />
                </TanstackProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}
