"use client"

import { createContext } from "react"
import { LanguageCode } from "@/types"

// Define the shape of the data and functions the context will provide.
export interface LanguageContextType {
    lang: LanguageCode
    setLang: (lang: LanguageCode) => void
}

/**
 * The React Context for managing language state.
 * The `undefined` default value is a safeguard. The `useLanguage` hook
 * will throw an error if it's consumed outside of the provider,
 * ensuring the context value is always available.
 */
export const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
)
