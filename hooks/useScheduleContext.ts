"use client"

import { scheduleContext } from "@/lib/alternatives/time"
import type { ScheduleContext } from "@/types/alternatives"
import { useEffect, useState } from "react"

function parseAnchor(anchorAt?: string): Date {
    if (!anchorAt) return new Date()
    const parsed = new Date(anchorAt)
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

/**
 * Live schedule context for open/close and fee previews.
 * Pass `anchorAt` from the server so the first paint matches SSR, then refreshes every minute.
 */
export function useScheduleContext(
    isPublicHoliday = false,
    anchorAt?: string
): ScheduleContext {
    const [ctx, setCtx] = useState(() =>
        scheduleContext(parseAnchor(anchorAt), isPublicHoliday)
    )

    useEffect(() => {
        const refresh = () => setCtx(scheduleContext(new Date(), isPublicHoliday))
        refresh()

        const msUntilNextMinute = 60_000 - (Date.now() % 60_000)
        let intervalId: ReturnType<typeof setInterval> | undefined

        const alignId: ReturnType<typeof setTimeout> = setTimeout(() => {
            refresh()
            intervalId = setInterval(refresh, 60_000)
        }, msUntilNextMinute)

        return () => {
            clearTimeout(alignId)
            if (intervalId !== undefined) {
                clearInterval(intervalId)
            }
        }
    }, [isPublicHoliday])

    return ctx
}
