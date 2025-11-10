import { useMemo } from "react"

// Helper to format minutes into a more human-readable "Xh Ym" format
const formatMinutesToHoursAndMinutes = (totalMinutes: number) => {
    if (totalMinutes < 1) return "0m"
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`
    }
    if (hours > 0) {
        return `${hours}h`
    }
    return `${minutes}m`
}

// Define the type for the comparison object from the hook
interface TrendComparison {
    difference: number
    trend: "higher" | "lower" | "same"
    average: number
}

interface Props {
    isLoading: boolean
    isError: boolean
    liveWaitTimeInMinutes: number
    comparison: TrendComparison | null
}

export function HospitalSheetDescriptionBusyness({
    isLoading,
    isError,
    liveWaitTimeInMinutes,
    comparison,
}: Props) {
    const content = useMemo(() => {
        if (isLoading) {
            // Using a non-breaking space as a placeholder to prevent layout shifts
            return <span>&nbsp;</span>
        }

        if (isError || !comparison) {
            return (
                <span>
                    Current wait time is{" "}
                    <b>
                        {formatMinutesToHoursAndMinutes(liveWaitTimeInMinutes)}
                    </b>
                    .
                </span>
            )
        }

        const liveTimeFormatted = formatMinutesToHoursAndMinutes(
            liveWaitTimeInMinutes
        )
        const averageTimeFormatted = formatMinutesToHoursAndMinutes(
            comparison.average
        )

        switch (comparison.trend) {
            case "higher":
                return (
                    <span>
                        The current wait time of <b>{liveTimeFormatted}</b> is{" "}
                        <b className="text-orange-500">busier</b> than the usual
                        average of {averageTimeFormatted}.
                    </span>
                )
            case "lower":
                return (
                    <span>
                        The current wait time of <b>{liveTimeFormatted}</b> is{" "}
                        <b className="text-green-600">quieter</b> than the usual
                        average of {averageTimeFormatted}.
                    </span>
                )
            case "same":
                return (
                    <span>
                        The current wait time of <b>{liveTimeFormatted}</b> is
                        about the <b>same</b> as the usual average.
                    </span>
                )
            default:
                return null
        }
    }, [isLoading, isError, comparison, liveWaitTimeInMinutes])

    return <>{content}</>
}
