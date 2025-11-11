"use client"

import { useState, useCallback, useMemo, useEffect, ReactNode } from "react"
import {
    LanguageContext,
    LanguageContextType,
} from "@/contexts/LanguageContext"
import { LanguageCode } from "@/types"
import { setLanguageCookie } from "@/lib/utils"

const LANGUAGE_STORAGE_KEY = "app-language"

export const LanguageProvider = ({
    children,
    initialLang,
}: {
    children: ReactNode
    initialLang: LanguageCode
}) => {
    /**
     * Initialize with the language from the server (read from cookie).
     * This ensures server and client render the same content, preventing hydration mismatches.
     */
    const [lang, setLangState] = useState<LanguageCode>(initialLang)

    /**
     * Migrate from localStorage to cookie on first client-side mount.
     * This is a one-time migration for users who have localStorage but no cookie.
     */
    useEffect(() => {
        try {
            // Check if we have localStorage but no cookie (migration scenario)
            const storedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
            if (
                storedLang &&
                Object.values(LanguageCode).includes(storedLang as LanguageCode)
            ) {
                // Migrate to cookie
                setLanguageCookie(storedLang as LanguageCode)
                // Update state if it differs from initial
                if (storedLang !== initialLang) {
                    setTimeout(() => {
                        setLangState(storedLang as LanguageCode)
                    }, 0)
                }
                // Clean up localStorage
                window.localStorage.removeItem(LANGUAGE_STORAGE_KEY)
            }
        } catch (error) {
            // Silently fail migration - not critical
            console.debug("Language migration from localStorage failed:", error)
        }
    }, [initialLang])

    /**
     * A memoized function to update the language.
     * It updates the state and persists the new value to a cookie.
     * useCallback prevents this function from being recreated on every render.
     */
    const setLang = useCallback((newLang: LanguageCode) => {
        try {
            setLanguageCookie(newLang)
            setLangState(newLang)
        } catch (error) {
            console.error("Failed to save language to cookie:", error)
        }
    }, [])

    /**
     * Memoize the context value to prevent unnecessary re-renders of consumers.
     * The value object is only recreated if `lang` or `setLang` changes.
     */
    const value = useMemo<LanguageContextType>(
        () => ({ lang, setLang }),
        [lang, setLang]
    )

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
