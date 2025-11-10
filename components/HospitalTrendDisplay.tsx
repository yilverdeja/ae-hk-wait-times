"use client"

import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { DayOfWeek } from "@/types/trends"

interface HospitalTrendDisplayProps {
    hospitalSlug: string
    // This prop now expects the live wait time in MINUTES
    liveWaitTimeInMinutes: number
}

// New helper to format minutes into a readable hour format (e.g., 2.50h)
const formatMinutesAsHours = (minutes: number) =>
    `${(minutes / 60).toFixed(2)}h`

// New helper to format minutes into a more human-readable "Xh Ym" format
const formatMinutesToHoursAndMinutes = (totalMinutes: number) => {
    if (totalMinutes < 1) return "0m"
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
}

export function HospitalTrendDisplay({
    hospitalSlug,
    liveWaitTimeInMinutes,
}: HospitalTrendDisplayProps) {
    const {
        isLoading,
        isError,
        error,
        compareWithLiveTime,
        getTrendForDay,
        data,
    } = useHospitalTrends(hospitalSlug)

    if (isLoading) {
        return <div>Loading trend data...</div>
    }

    if (isError) {
        return <div>Error loading trends: {error?.message}</div>
    }

    if (!data) {
        return <div>No trend data available.</div>
    }

    // The hook's helpers now work with minutes, so we pass the value directly.
    const comparison = compareWithLiveTime(liveWaitTimeInMinutes)
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
    }) as DayOfWeek
    const todaysTrend = getTrendForDay(today)

    return (
        <div className="p-4 space-y-6 rounded-lg border">
            <h3 className="text-xl font-bold">
                Wait Time Trends for {hospitalSlug}
            </h3>

            {/* Section 1: Live Comparison */}
            <div className="p-4 bg-secondary rounded-md">
                <h4 className="font-semibold mb-2">Live vs. Average</h4>
                {comparison ? (
                    <p>
                        The current wait time of{" "}
                        <span className="font-bold">
                            {formatMinutesToHoursAndMinutes(
                                liveWaitTimeInMinutes
                            )}
                        </span>{" "}
                        is{" "}
                        <span
                            className={`font-bold ${comparison.trend === "higher" ? "text-red-500" : "text-green-500"}`}
                        >
                            {comparison.trend}
                        </span>{" "}
                        than the usual average of{" "}
                        <span className="font-bold">
                            {formatMinutesToHoursAndMinutes(comparison.average)}
                        </span>{" "}
                        for this time of day. (Difference:{" "}
                        {formatMinutesToHoursAndMinutes(comparison.difference)})
                    </p>
                ) : (
                    <p>Could not calculate comparison.</p>
                )}
            </div>

            {/* Section 2: Today's Trend */}
            <div>
                <h4 className="font-semibold mb-2">
                    Average Trend for {today}
                </h4>
                {todaysTrend ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-xs">
                        {todaysTrend.map((avgMinutes, hour) => (
                            <div key={hour} className="p-2 bg-muted rounded">
                                <div className="font-mono text-muted-foreground">{`${String(hour).padStart(2, "0")}:00`}</div>
                                {/* We use the decimal format here for compactness */}
                                <div className="font-semibold">
                                    {formatMinutesAsHours(avgMinutes)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No trend data for today.</p>
                )}
            </div>

            {/* Section 3: Overall Averages */}
            <div>
                <h4 className="font-semibold mb-2">Overall Daily Averages</h4>
                <ul className="list-disc list-inside">
                    {Object.entries(data.averageByDay).map(
                        ([day, avgMinutes]) => (
                            <li key={day}>
                                {day}:{" "}
                                <span className="font-semibold">
                                    {formatMinutesToHoursAndMinutes(avgMinutes)}
                                </span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}
