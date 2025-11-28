import {
    LanguageContext,
    LanguageContextType,
} from "@/contexts/LanguageContext"
import { useContext } from "react"

/**
 * Custom hook for accessing the language context.
 * Provides a clean API and an error boundary to ensure it's used correctly.
 */
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext)

    // This check ensures that any component using this hook is a child
    // of the LanguageProvider.
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }

    return context
}
