/**
 * Utility functions for determining marker colors based on wait times
 */

/**
 * Get the color for a marker based on wait time in minutes
 * @param minutes - Wait time in minutes (can be null)
 * @returns Hex color code
 */
export function getWaitTimeColor(minutes: number | null): string {
    if (minutes === null || minutes === undefined) {
        // Gray for unknown wait times
        return "#6b7280"
    }

    if (minutes <= 60) {
        // Green: 1 hour or less
        return "#22c55e"
    } else if (minutes <= 180) {
        // Yellow: 2-3 hours
        return "#eab308"
    } else if (minutes <= 360) {
        // Orange: 4-6 hours
        return "#f97316"
    } else {
        // Red: 7+ hours
        return "#ef4444"
    }
}

/**
 * Get a human-readable wait time category
 * @param minutes - Wait time in minutes (can be null)
 * @returns Category string
 */
export function getWaitTimeCategory(minutes: number | null): string {
    if (minutes === null || minutes === undefined) {
        return "Unknown"
    }

    if (minutes <= 60) {
        return "≤1 hour"
    } else if (minutes <= 180) {
        return "2-3 hours"
    } else if (minutes <= 360) {
        return "4-6 hours"
    } else {
        return "7+ hours"
    }
}

/**
 * Format wait time in hours and minutes format (e.g., "2h 30m" or "45m")
 * @param minutes - Wait time in minutes (can be null)
 * @returns Formatted string
 */
export function formatWaitTimeHoursMinutes(minutes: number | null): string {
    if (minutes === null || minutes === undefined) {
        return "N/A"
    }

    if (minutes < 60) {
        return `${Math.round(minutes)}m`
    }

    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)

    if (mins === 0) {
        return `${hours}h`
    }

    return `${hours}h ${mins}m`
}
