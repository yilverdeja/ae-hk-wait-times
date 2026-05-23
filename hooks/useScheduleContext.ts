"use client"

import { scheduleContext } from "@/lib/alternatives/time"
import type { ScheduleContext } from "@/types/alternatives"
import { useEffect, useState } from "react"

/**
 * Live schedule context for open/close and fee previews.
 * Refreshes every minute so status lines update without a full page reload.
 */
export function useScheduleContext(isPublicHoliday = false): ScheduleContext {
    const [ctx, setCtx] = useState(() => scheduleContext(new Date(), isPublicHoliday))

    useEffect(() => {
        const refresh = () => setCtx(scheduleContext(new Date(), isPublicHoliday))
        refresh()

        const msUntilNextMinute = 60_000 - (Date.now() % 60_000)
        let intervalId: ReturnType<typeof setInterval> | undefined

        const alignId = window.setTimeout(() => {
            refresh()
            intervalId = window.setInterval(refresh, 60_000)
        }, msUntilNextMinute)

        return () => {
            window.clearTimeout(alignId)
            if (intervalId !== undefined) {
                window.clearInterval(intervalId)
            }
        }
    }, [isPublicHoliday])

    return ctx
}
