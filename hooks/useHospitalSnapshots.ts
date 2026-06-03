import type { SnapshotStore } from "@/types/gcs"
import { sendGAEvent } from "@next/third-parties/google"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

function getHktDate(): string {
    return new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Hong_Kong",
    })
}

function getHktHour(isoString: string): number {
    return new Date(
        new Date(isoString).toLocaleString("en-US", {
            timeZone: "Asia/Hong_Kong",
        })
    ).getHours()
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
        staleTime: 15 * 60 * 1000, // 15 minutes
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

    const getHourlyWait = useMemo(() => {
        return (slug: string, hour: number): number | null => {
            const snapshots = queryResult.data?.hospitals[slug]
            if (!snapshots) return null

            const values = snapshots
                .filter(
                    (pt) =>
                        pt.snapshot_at &&
                        getHktHour(pt.snapshot_at) === hour &&
                        pt.t45p95 != null
                )
                .map((pt) => pt.t45p95 as number)

            if (values.length === 0) return null
            return Math.max(...values)
        }
    }, [queryResult.data])

    return {
        ...queryResult,
        getHourlyWait,
        hktDate,
    }
}
