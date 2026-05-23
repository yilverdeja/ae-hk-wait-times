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
    const color = getWaitTimeColor(waitTime, currentTheme)

    const { getAverageForDateTime, isLoading: isTrendLoading } =
        useHospitalTrends(hospital.slug)

    let trendIcon = null
    if (
        !isTrendLoading &&
        waitTime !== null &&
        lastUpdated &&
        getAverageForDateTime
    ) {
        let lastUpdatedDate = dayjs(lastUpdated, "DD/MM/YYYY hh:mm A").toDate()
        if (isNaN(lastUpdatedDate.getTime())) {
            lastUpdatedDate = dayjs(lastUpdated, "D/M/YYYY h:mmA").toDate()
        }
        if (!isNaN(lastUpdatedDate.getTime())) {
            const trendAverage = getAverageForDateTime(lastUpdatedDate)
            if (trendAverage !== null) {
                const difference = waitTime - trendAverage
                const threshold = 0.5 * 60

                if (Math.abs(difference) < threshold) {
                    trendIcon = <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                } else if (difference > 0) {
                    trendIcon = (
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    )
                } else {
                    trendIcon = (
                        <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    )
                }
            }
        }
    }

    const hasCritical = hasCriticalCases(hospital)
    const showDistanceColumn =
        showDistance && (isDistanceLoading || distance)

    return (
        <div
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto pointer-events-none z-10"
            style={{ maxWidth: "calc(100% - 2rem)" }}
        >
            <div
                className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg p-3 sm:p-4 pointer-events-auto relative"
                style={{ maxWidth: "600px" }}
            >
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
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1 pr-6 sm:pr-0">
                            {hospital.name[lang]}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                            {hospital.address[lang]}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-1.5 sm:space-y-0">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{
                                        backgroundColor: color,
                                    }}
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

                            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3 pl-5 sm:pl-0 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                                {hospital.waitTimes.urgentP95Minutes !==
                                    null && (
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
                                {hospital.waitTimes.emergencyMinutes !==
                                    null && (
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
                                {hospital.waitTimes.criticalMinutes !==
                                    null && (
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
                                {showDistanceColumn && (
                                    <div className="sm:border-l sm:pl-3 sm:pb-0.5 whitespace-nowrap flex items-center min-h-[1.25rem]">
                                        {isDistanceLoading ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : distance ? (
                                            <span className="inline-flex items-center gap-0.5">
                                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                                <span>
                                                    {formatDistance(
                                                        distance.distance
                                                    )}{" "}
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
                        </div>

                        {hasCritical && (
                            <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1.5 sm:pt-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>
                                    {hospital.criticalManagementStatus ===
                                    ManagementStatus.ManagingMultiple
                                        ? getLocalizedText(
                                              managementStatusTranslations[
                                                  ManagementStatus
                                                      .ManagingMultiple
                                              ],
                                              lang
                                          )
                                        : getLocalizedText(
                                              managementStatusTranslations[
                                                  ManagementStatus.Managing
                                              ],
                                              lang
                                          )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
