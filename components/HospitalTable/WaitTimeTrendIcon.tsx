"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface WaitTimeTrendIconProps {
    hospitalSlug: string
    liveWaitTime: number | null
    lastUpdated: string
}

// Localized tooltip text for trend icons
const trendTooltipCopy: Record<
    "higher" | "lower" | "same",
    Record<LanguageCode, string>
> = {
    higher: {
        [LanguageCode.EN]: "Busier than usual",
        [LanguageCode.ZH]: "較平時繁忙",
        [LanguageCode.CN]: "较平时繁忙",
    },
    lower: {
        [LanguageCode.EN]: "Less busy than usual",
        [LanguageCode.ZH]: "較平時清閒",
        [LanguageCode.CN]: "较平时清闲",
    },
    same: {
        [LanguageCode.EN]: "About average",
        [LanguageCode.ZH]: "接近平均",
        [LanguageCode.CN]: "接近平均",
    },
}

export function WaitTimeTrendIcon({
    hospitalSlug,
    liveWaitTime,
    lastUpdated,
}: WaitTimeTrendIconProps) {
    const { getAverageForDateTime, isLoading } = useHospitalTrends(hospitalSlug)
    const { lang } = useLanguage()

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
    let tooltipText = ""

    if (Math.abs(difference) < threshold) {
        // About the same
        icon = <Minus className="h-4 w-4" />
        iconColor = "text-muted-foreground"
        tooltipText = trendTooltipCopy.same[lang]
    } else if (difference > 0) {
        // Higher (more busy)
        icon = <TrendingUp className="h-4 w-4" />
        iconColor = "text-red-600"
        tooltipText = trendTooltipCopy.higher[lang]
    } else {
        // Lower (less busy)
        icon = <TrendingDown className="h-4 w-4" />
        iconColor = "text-green-600"
        tooltipText = trendTooltipCopy.lower[lang]
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        className={cn(
                            "ml-2 inline-flex items-center",
                            iconColor
                        )}
                    >
                        {icon}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
