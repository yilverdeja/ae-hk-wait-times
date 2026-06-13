import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import { LanguageCode } from "@/types"

/**
 * Cookie utility functions for language preference
 */
const LANGUAGE_COOKIE_NAME = "app-language"
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

/**
 * Sets the language preference cookie on the client side
 */
export function setLanguageCookie(lang: LanguageCode): void {
    if (typeof document === "undefined") return

    const expires = new Date()
    expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000)

    document.cookie = `${LANGUAGE_COOKIE_NAME}=${lang}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

/**
 * Gets the language preference cookie value
 * Returns null if cookie doesn't exist or is invalid
 */
export function getLanguageCookie(): LanguageCode | null {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split("; ")
    const cookie = cookies.find((c) => c.startsWith(`${LANGUAGE_COOKIE_NAME}=`))

    if (!cookie) return null

    const value = cookie.split("=")[1]
    if (Object.values(LanguageCode).includes(value as LanguageCode)) {
        return value as LanguageCode
    }

    return null
}

/**
 * Maps our internal, clean language codes to the specific codes required
 * by the external HA (Hospital Authority) API URL. This decouples our app's
 * i18n logic from the external API's implementation details.
 */
const HA_LANGUAGE_MAP: Record<LanguageCode, string> = {
    [LanguageCode.EN]: "ENG",
    [LanguageCode.ZH]: "CHIB5",
    [LanguageCode.CN]: "CHIGB",
}

const HA_VISITOR_BASE = "https://www.ha.org.hk/visitor/ha_visitor_index.asp"

/**
 * Constructs a Hospital Authority visitor page URL.
 */
export const buildHaVisitorLink = (
    contentId: string,
    lang: LanguageCode = LanguageCode.EN
): string => {
    const apiLangCode = HA_LANGUAGE_MAP[lang]
    return `${HA_VISITOR_BASE}?Content_ID=${contentId}&Lang=${apiLangCode}`
}

/** Official HA A&E fees page (effective from 1 Jan 2026). Content_ID=10045 */
export const aeFeesLink = (lang: LanguageCode = LanguageCode.EN): string =>
    buildHaVisitorLink("10045", lang)

/** HA Service Guide (A&E services and triage). Content_ID=10051 */
export const haServiceGuideLink = (lang: LanguageCode = LanguageCode.EN): string =>
    buildHaVisitorLink("10051", lang)

/**
 * Constructs the specific URL for a hospital's page on the HA website.
 */
export const buildHospitalLink = (
    contentId: string,
    lang: LanguageCode = LanguageCode.EN
): string => buildHaVisitorLink(contentId, lang)
