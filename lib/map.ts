/**
 * Utility functions for determining marker colors based on wait times
 */

type Theme = "light" | "dark"

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
