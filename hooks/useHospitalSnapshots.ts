import type { SnapshotStore } from "@/types/gcs"
import { sendGAEvent } from "@next/third-parties/google"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

function getHktDate(): string {
    return new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Hong_Kong",
    })
}

function toHktDate(isoString: string): Date {
    return new Date(
        new Date(isoString).toLocaleString("en-US", {
            timeZone: "Asia/Hong_Kong",
        })
    )
}

export const useHospitalSnapshots = (hospitalSlug?: string | null) => {
    const hktDate = useMemo(() => getHktDate(), [])

    const queryResult = useQuery({
        queryKey: ["hospital-snapshots-today", hktDate],
        queryFn: async (): Promise<SnapshotStore> => {
            const response = await fetch(`/api/snapshots/today/${hktDate}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch snapshots: ${response.status}`)
            }
            return response.json()
        },
        staleTime: 15 * 60 * 1000,
    })

    useEffect(() => {
        if (queryResult.isError && queryResult.error) {
            sendGAEvent("event", "data_fetch_error", {
                fetchType: "snapshots-today",
                errorMessage:
                    queryResult.error instanceof Error
                        ? queryResult.error.message
                        : "Unknown error",
            })
        }
    }, [queryResult.isError, queryResult.error])

    // Returns a Map<"HH:MM", t45p95> for all readings of a given hospital slug.
    // Minutes are rounded to the nearest 15-min slot.
    const getReadingsMap = useMemo(() => {
        return (slug: string): Map<string, number> => {
            const snapshots = queryResult.data?.hospitals[slug]
            if (!snapshots) return new Map()

            const map = new Map<string, number>()
            for (const pt of snapshots) {
                if (!pt.snapshot_at || pt.t45p95 == null) continue
                const d = toHktDate(pt.snapshot_at)
                let hour = d.getHours()
                let minute = Math.round(d.getMinutes() / 15) * 15
                if (minute >= 60) {
                    minute = 0
                    hour += 1
                }
                if (hour >= 24) continue
                const key = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
                if (!map.has(key)) map.set(key, pt.t45p95)
            }
            return map
        }
    }, [queryResult.data])

    return {
        ...queryResult,
        getReadingsMap,
        hktDate,
    }
}
