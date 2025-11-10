import { useQuery } from "@tanstack/react-query"
import { hospitalWaitTimeTrends } from "@/data/averages"
import { DayOfWeek, HospitalTrendData, HourlyAverages } from "@/types/trends"
import { useMemo } from "react"

// Helper array to map Date.getDay() (where Sunday is 0) to our DayOfWeek string type
const dayIndexToDayOfWeek: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

/**
 * Fetches and provides utilities for hospital wait time trend data.
 *
 * @param hospitalSlug The slug of the hospital (e.g., "AHMLNH").
 * @returns An object containing the query state and helper functions for trend analysis.
 */
export const useHospitalTrends = (hospitalSlug?: string | null) => {
    const queryResult = useQuery({
        queryKey: ["hospital-trends", hospitalSlug],
        queryFn: async (): Promise<HospitalTrendData> => {
            // The query will not run if hospitalSlug is falsy due to the `enabled` option,
            // but we add this check for type safety and clarity.
            if (!hospitalSlug) {
                throw new Error("A hospital slug must be provided.")
            }

            const trendData = hospitalWaitTimeTrends[hospitalSlug]

            if (!trendData) {
                throw new Error(
                    `No trend data found for hospital: ${hospitalSlug}`
                )
            }

            // In a real app, this could be an API call:
            // const response = await fetch(`/api/trends/${hospitalSlug}`);
            // if (!response.ok) throw new Error("Network response was not ok");
            // return response.json();

            return trendData
        },
        // The data is static, so we can cache it forever.
        // It will only be fetched once per hospitalSlug per session.
        staleTime: Infinity,
        // This query should only run when a hospitalSlug is actually provided.
        enabled: !!hospitalSlug,
    })

    const { data } = queryResult

    // We use useMemo to ensure these helper functions are stable and only
    // re-created if the underlying data changes.
    const helpers = useMemo(() => {
        if (!data) {
            // Return null functions if data is not yet available
            return {
                getAverageForDateTime: (_: Date) => null,
                getCurrentAverage: () => null,
                compareWithLiveTime: (_: number) => null,
                getTrendForDay: (_: DayOfWeek) => null,
            }
        }

        const getAverageForDateTime = (date: Date): number | null => {
            const day = dayIndexToDayOfWeek[date.getDay()]
            const hour = date.getHours()
            return data.byHourOfDay[day]?.[hour] ?? null
        }

        const getCurrentAverage = (): number | null => {
            return getAverageForDateTime(new Date())
        }

        const compareWithLiveTime = (liveWaitTime: number) => {
            const average = getCurrentAverage()
            if (average === null) return null

            const difference = liveWaitTime - average
            let trend: "higher" | "lower" | "same"

            // Using a small epsilon for floating point comparison
            if (Math.abs(difference) < 0.5 * 60) {
                // 0.5 hours
                trend = "same"
            } else if (difference > 0) {
                trend = "higher"
            } else {
                trend = "lower"
            }

            return { difference, trend, average }
        }

        const getTrendForDay = (day: DayOfWeek): HourlyAverages | null => {
            return data.byHourOfDay[day] ?? null
        }

        return {
            getAverageForDateTime,
            getCurrentAverage,
            compareWithLiveTime,
            getTrendForDay,
        }
    }, [data])

    return {
        ...queryResult,
        ...helpers,
    }
}
