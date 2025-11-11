"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { cn } from "@/lib/utils"

interface WaitTimeTrendIconProps {
    hospitalSlug: string
    liveWaitTime: number | null
    lastUpdated: string
}

export function WaitTimeTrendIcon({
    hospitalSlug,
    liveWaitTime,
    lastUpdated,
}: WaitTimeTrendIconProps) {
    const { getAverageForDateTime, isLoading } = useHospitalTrends(hospitalSlug)

    // Don't show icon if data is loading, wait time is null, or no trend data available
    if (isLoading || liveWaitTime === null) {
        return null
    }

    // Get the average for the specific date and time when data was last updated
    const lastUpdatedDate = new Date(lastUpdated)
    const trendAverage = getAverageForDateTime(lastUpdatedDate)

    // If no trend data available, don't show icon
    if (trendAverage === null) {
        return null
    }

    // Compare live wait time with trend average
    const difference = liveWaitTime - trendAverage
    // Using the same threshold as in useHospitalTrends (0.5 hours = 30 minutes)
    const threshold = 0.5 * 60 // 30 minutes

    let icon = null
    let iconColor = ""

    if (Math.abs(difference) < threshold) {
        // About the same
        icon = <Minus className="h-4 w-4" />
        iconColor = "text-muted-foreground"
    } else if (difference > 0) {
        // Higher (more busy)
        icon = <TrendingUp className="h-4 w-4" />
        iconColor = "text-red-600"
    } else {
        // Lower (less busy)
        icon = <TrendingDown className="h-4 w-4" />
        iconColor = "text-green-600"
    }

    return (
        <span className={cn("ml-2 inline-flex items-center", iconColor)}>
            {icon}
        </span>
    )
}
