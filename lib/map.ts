/**
 * Utility functions for map-related operations, wait time formatting, and geofencing
 */

import {
    getLocalizedText,
    waitTimeCategoryLabels,
    waitTimeNA,
} from "@/lib/map-translations"
import { EnrichedHospitalData, LanguageCode, ManagementStatus } from "@/types"
import * as turf from "@turf/turf"

type Theme = "light" | "dark"

// ===================================================================================
// CONSTANTS
// ===================================================================================

// Geofence: A larger circle covering Hong Kong (approximately 30km radius)
export const HONG_KONG_GEOFENCE = turf.circle([114.176611, 22.311637], 30, {
    units: "kilometers",
})

// Zoom restrictions
export const MIN_ZOOM = 8
export const MAX_ZOOM = 18

// Default coordinates (central Hong Kong)
export const DEFAULT_COORDINATES = {
    longitude: 114.176611,
    latitude: 22.311637,
}

// ===================================================================================
// COLOR UTILITIES
// ===================================================================================

/**
 * Get the color for a marker based on wait time in minutes and theme
 * @param minutes - Wait time in minutes (can be null)
 * @param theme - Theme mode: "light" or "dark" (default: "light")
 * @returns Hex color code
 */
export function getWaitTimeColor(
    minutes: number | null,
    theme: Theme = "light"
): string {
    if (minutes === null || minutes === undefined) {
        // Gray for unknown wait times
        return theme === "dark" ? "#9ca3af" : "#6b7280"
    }

    if (minutes <= 60) {
        // Green: 1 hour or less
        return theme === "dark" ? "#16a34a" : "#22c55e"
    } else if (minutes <= 180) {
        // Yellow: 2-3 hours
        return theme === "dark" ? "#ca8a04" : "#eab308"
    } else if (minutes <= 360) {
        // Orange: 4-6 hours
        return theme === "dark" ? "#ea580c" : "#f97316"
    } else {
        // Red: 7+ hours
        return theme === "dark" ? "#dc2626" : "#ef4444"
    }
}

// ===================================================================================
// GEOFENCING UTILITIES
// ===================================================================================

/**
 * Check if user coordinates are within Hong Kong geofence
 */
export function isUserInHongKong(
    coords: { longitude: number; latitude: number } | null
): boolean {
    if (!coords) return false
    const point = [coords.longitude, coords.latitude]
    return turf.booleanPointInPolygon(point, HONG_KONG_GEOFENCE)
}

// ===================================================================================
// WAIT TIME UTILITIES
// ===================================================================================

/**
 * Get wait time for display (prefer p50 wait time, fallback to p95 wait time)
 */
export function getDisplayWaitTime(
    hospital: EnrichedHospitalData
): number | null {
    return (
        hospital.waitTimes.semiUrgentNonUrgentP50Minutes ??
        hospital.waitTimes.semiUrgentNonUrgentP95Minutes ??
        null
    )
}

/**
 * Format wait time with localized units
 */
export function formatWaitTimeLocalized(
    minutes: number | null,
    lang: LanguageCode
): string {
    if (minutes === null) {
        return getLocalizedText(waitTimeNA, lang)
    }

    const hourText = getLocalizedText(waitTimeCategoryLabels.hour, lang)
    const minuteText = getLocalizedText(waitTimeCategoryLabels.minute, lang)

    if (minutes < 60) {
        return `${Math.round(minutes)}${minuteText}`
    }

    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)

    if (mins === 0) {
        return `${hours}${hourText}`
    }

    return `${hours}${hourText} ${mins}${minuteText}`
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`
    }
    return `${km.toFixed(1)}km`
}

/**
 * Format duration for display with localized units
 */
export function formatDuration(minutes: number, lang: LanguageCode): string {
    const hourText = getLocalizedText(waitTimeCategoryLabels.hour, lang)
    const minuteText = getLocalizedText(waitTimeCategoryLabels.minute, lang)

    if (minutes < 60) {
        return `${Math.round(minutes)}${minuteText}`
    }

    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)

    if (mins === 0) {
        return `${hours}${hourText}`
    }

    return `${hours}${hourText} ${mins}${minuteText}`
}

// ===================================================================================
// HOSPITAL STATUS UTILITIES
// ===================================================================================

/**
 * Check if hospital has critical cases being managed
 */
export function hasCriticalCases(hospital: EnrichedHospitalData): boolean {
    return (
        hospital.criticalManagementStatus === ManagementStatus.Managing ||
        hospital.criticalManagementStatus ===
            ManagementStatus.ManagingMultiple ||
        hospital.emergencyManagementStatus === ManagementStatus.Managing ||
        hospital.emergencyManagementStatus === ManagementStatus.ManagingMultiple
    )
}
