import type { DayOfWeek, ScheduleContext, TimeRange } from "@/types/alternatives"

const HK_TIMEZONE = "Asia/Hong_Kong"

export function getHongKongParts(at: Date): {
    day: DayOfWeek
    minutes: number
} {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: HK_TIMEZONE,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
    const parts = formatter.formatToParts(at)
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun"
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0)
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0)

    const dayMap: Record<string, DayOfWeek> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    }

    return {
        day: dayMap[weekday] ?? 0,
        minutes: hour * 60 + minute,
    }
}

export function parseTimeToMinutes(time: string): number {
    const [h, m] = time.split(":").map(Number)
    return h * 60 + (m ?? 0)
}

/** Inclusive start, exclusive end — except overnight spans cross midnight. */
export function isMinutesInRange(minutes: number, range: TimeRange): boolean {
    const start = parseTimeToMinutes(range.start)
    const end = parseTimeToMinutes(range.end)

    if (start === end) {
        return true
    }

    if (end > start) {
        return minutes >= start && minutes < end
    }

    return minutes >= start || minutes < end
}

export function isDayInRules(day: DayOfWeek, days: DayOfWeek[]): boolean {
    return days.includes(day)
}

export function scheduleContext(at: Date = new Date(), isPublicHoliday = false): ScheduleContext {
    return { at, isPublicHoliday }
}
