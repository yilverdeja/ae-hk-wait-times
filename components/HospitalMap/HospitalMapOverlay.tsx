"use client"

import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import dayjs from "@/lib/dayjs"
import {
    formatDistance,
    formatDuration,
    formatWaitTimeLocalized,
    getDisplayWaitTime,
    getWaitTimeColor,
    hasCriticalCases,
} from "@/lib/map"
import {
    getLocalizedText,
    managementStatusTranslations,
    waitTimeCategoryLabels,
} from "@/lib/map-translations"
import { EnrichedHospitalData, LanguageCode, ManagementStatus } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import {
    AlertCircle,
    ExternalLink,
    Loader2,
    MapPin,
    Minus,
    TrendingDown,
    TrendingUp,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { ReactNode, useMemo } from "react"

interface HospitalMapOverlayProps {
    hospital: EnrichedHospitalData
    lang: LanguageCode
    distance?: {
        distance: number
        duration: number
    }
    isDistanceLoading?: boolean
    showDistance?: boolean
    lastUpdated?: string
}

/** Parse HA wait-time timestamp strings into a Date for trend lookup. */
function parseLastUpdatedDate(lastUpdated: string): Date | null {
    const formats = ["DD/MM/YYYY hh:mm A", "D/M/YYYY h:mmA"] as const
    for (const format of formats) {
        const parsed = dayjs(lastUpdated, format).toDate()
        if (!isNaN(parsed.getTime())) {
            return parsed
        }
    }
    return null
}

/** Compare current wait to historical average; returns up/down/flat icon. */
function getTrendIcon(
    waitTime: number | null,
    lastUpdated: string | undefined,
    getAverageForDateTime: ((date: Date) => number | null) | undefined,
    isTrendLoading: boolean
): ReactNode | null {
    if (
        isTrendLoading ||
        waitTime === null ||
        !lastUpdated ||
        !getAverageForDateTime
    ) {
        return null
    }

    const lastUpdatedDate = parseLastUpdatedDate(lastUpdated)
    if (!lastUpdatedDate) {
        return null
    }

    const trendAverage = getAverageForDateTime(lastUpdatedDate)
    if (trendAverage === null) {
        return null
    }

    const difference = waitTime - trendAverage
    const threshold = 0.5 * 60 // 30 minutes — treat smaller deltas as flat

    if (Math.abs(difference) < threshold) {
        return <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
    }
    if (difference > 0) {
        return (
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
        )
    }
    return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
}

export function HospitalMapOverlay({
    hospital,
    lang,
    distance,
    isDistanceLoading = false,
    showDistance = false,
    lastUpdated,
}: HospitalMapOverlayProps) {
    const { theme, resolvedTheme } = useTheme()
    const currentTheme = (resolvedTheme || theme || "light") as "light" | "dark"

    const waitTime = getDisplayWaitTime(hospital)
    const waitTimeColor = getWaitTimeColor(waitTime, currentTheme)

    const { getAverageForDateTime, isLoading: isTrendLoading } =
        useHospitalTrends(hospital.slug)

    const trendIcon = useMemo(
        () =>
            getTrendIcon(
                waitTime,
                lastUpdated,
                getAverageForDateTime,
                isTrendLoading
            ),
        [waitTime, lastUpdated, getAverageForDateTime, isTrendLoading]
    )

    const hasCritical = hasCriticalCases(hospital)
    const showDistanceColumn =
        showDistance && (isDistanceLoading || distance)

    const criticalStatusLabel =
        hospital.criticalManagementStatus ===
        ManagementStatus.ManagingMultiple
            ? getLocalizedText(
                  managementStatusTranslations[
                      ManagementStatus.ManagingMultiple
                  ],
                  lang
              )
            : getLocalizedText(
                  managementStatusTranslations[ManagementStatus.Managing],
                  lang
              )

    return (
        // Anchor card above map controls; inner card re-enables pointer events
        <div
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto pointer-events-none z-10"
            style={{ maxWidth: "calc(100% - 2rem)" }}
        >
            <div
                className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg p-3 sm:p-4 pointer-events-auto relative"
                style={{ maxWidth: "600px" }}
            >
                {/* Google Maps deep link */}
                <Link
                    href={hospital.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Open in Google Maps"
                    onClick={() =>
                        sendGAEvent("event", "external_link_clicked", {
                            linkType: "google_maps",
                            hospitalSlug: hospital.slug,
                        })
                    }
                >
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>

                <div className="flex flex-col space-y-2 pr-6 sm:pr-8">
                    {/* Hospital identity */}
                    <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1 pr-6 sm:pr-0">
                        {hospital.name[lang]}
                    </h3>

                    {/* Address and optional drive-time from user */}
                    <div className="flex flex-col space-y-1 mb-1 sm:mb-3">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {hospital.address[lang]}
                        </p>
                        {showDistanceColumn && (
                            <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center min-h-[1.25rem]">
                                {isDistanceLoading ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : distance ? (
                                    <span className="inline-flex items-center gap-0.5">
                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                        <span>
                                            {formatDistance(distance.distance)}{" "}
                                            ·{" "}
                                            {formatDuration(
                                                distance.duration,
                                                lang
                                            )}{" "}
                                            {getLocalizedText(
                                                waitTimeCategoryLabels.drive,
                                                lang
                                            )}
                                        </span>
                                    </span>
                                ) : null}
                            </div>
                        )}
                    </div>

                    {/* Semi-urgent wait (primary) + urgent/emergency/critical (desktop row) */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-1.5 sm:space-y-0">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: waitTimeColor }}
                            />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm sm:text-base font-semibold">
                                        {formatWaitTimeLocalized(
                                            waitTime,
                                            lang
                                        )}
                                    </span>
                                    {trendIcon && (
                                        <span className="inline-flex items-center">
                                            {trendIcon}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {getLocalizedText(
                                        waitTimeCategoryLabels.semiUrgent,
                                        lang
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:flex-row sm:items-end sm:gap-3 pl-5 sm:pl-0 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                            {hospital.waitTimes.urgentP95Minutes !== null && (
                                <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                    {getLocalizedText(
                                        waitTimeCategoryLabels.urgent,
                                        lang
                                    )}
                                    :{" "}
                                    {formatWaitTimeLocalized(
                                        hospital.waitTimes.urgentP95Minutes,
                                        lang
                                    )}
                                </div>
                            )}
                            {hospital.waitTimes.emergencyMinutes !== null && (
                                <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                    {getLocalizedText(
                                        waitTimeCategoryLabels.emergency,
                                        lang
                                    )}
                                    :{" "}
                                    {formatWaitTimeLocalized(
                                        hospital.waitTimes.emergencyMinutes,
                                        lang
                                    )}
                                </div>
                            )}
                            {hospital.waitTimes.criticalMinutes !== null && (
                                <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                    {getLocalizedText(
                                        waitTimeCategoryLabels.critical,
                                        lang
                                    )}
                                    :{" "}
                                    {formatWaitTimeLocalized(
                                        hospital.waitTimes.criticalMinutes,
                                        lang
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active critical-case management warning */}
                    {hasCritical && (
                        <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1.5 sm:pt-2">
                            <AlertCircle className="h-3 w-3" />
                            <span>{criticalStatusLabel}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
