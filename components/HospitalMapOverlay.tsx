"use client"

import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import dayjs from "@/lib/dayjs"
import { getWaitTimeColor } from "@/lib/map"
import { EnrichedHospitalData, LanguageCode, ManagementStatus } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import {
    AlertCircle,
    ExternalLink,
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
    lastUpdated?: string
}

// Localized text for wait time categories
const waitTimeCategoryTexts = {
    [LanguageCode.EN]: {
        semiUrgent: "Semi-urgent / Non-urgent",
        urgent: "Urgent",
        emergency: "Emergency",
        critical: "Critical",
        hour: "h",
        minute: "m",
        drive: "drive",
    },
    [LanguageCode.ZH]: {
        semiUrgent: "半緊急 / 非緊急",
        urgent: "緊急",
        emergency: "急症",
        critical: "危殆",
        hour: "小時",
        minute: "分鐘",
        drive: "車程",
    },
    [LanguageCode.CN]: {
        semiUrgent: "半紧急 / 非紧急",
        urgent: "紧急",
        emergency: "急症",
        critical: "危殆",
        hour: "小时",
        minute: "分钟",
        drive: "车程",
    },
}

// Localized format for wait time with units
const formatWaitTimeLocalized = (
    minutes: number | null,
    lang: LanguageCode
): string => {
    if (minutes === null) {
        return lang === LanguageCode.EN ? "N/A" : "不適用"
    }

    const texts = waitTimeCategoryTexts[lang]

    if (minutes < 60) {
        return `${Math.round(minutes)}${texts.minute}`
    }

    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)

    if (mins === 0) {
        return `${hours}${texts.hour}`
    }

    return `${hours}${texts.hour} ${mins}${texts.minute}`
}

// Format distance for display
const formatDistance = (km: number): string => {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`
    }
    return `${km.toFixed(1)}km`
}

// Format duration for display
const formatDuration = (minutes: number, lang: LanguageCode): string => {
    const texts = waitTimeCategoryTexts[lang]
    if (minutes < 60) {
        return `${Math.round(minutes)}${texts.minute}`
    }
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (mins === 0) {
        return `${hours}${texts.hour}`
    }
    return `${hours}${texts.hour} ${mins}${texts.minute}`
}

// Get wait time for display (prefer semi-urgent, fallback to urgent)
const getDisplayWaitTime = (hospital: EnrichedHospitalData) => {
    return (
        hospital.waitTimes.semiUrgentNonUrgentP50Minutes ??
        hospital.waitTimes.urgentP50Minutes ??
        null
    )
}

export function HospitalMapOverlay({
    hospital,
    lang,
    distance,
    lastUpdated,
}: HospitalMapOverlayProps) {
    const { theme, resolvedTheme } = useTheme()
    const currentTheme = (resolvedTheme || theme || "light") as "light" | "dark"
    const texts = waitTimeCategoryTexts[lang]
    const waitTime = getDisplayWaitTime(hospital)
    const color = getWaitTimeColor(waitTime, currentTheme)

    // Get trend data
    const { getAverageForDateTime, isLoading: isTrendLoading } =
        useHospitalTrends(hospital.slug)

    // Calculate trend icon
    let trendIcon = null
    if (
        !isTrendLoading &&
        waitTime !== null &&
        lastUpdated &&
        getAverageForDateTime
    ) {
        // Try multiple date formats to handle different API response formats
        let lastUpdatedDate = dayjs(lastUpdated, "DD/MM/YYYY hh:mm A").toDate()
        if (isNaN(lastUpdatedDate.getTime())) {
            lastUpdatedDate = dayjs(lastUpdated, "D/M/YYYY h:mmA").toDate()
        }
        if (!isNaN(lastUpdatedDate.getTime())) {
            const trendAverage = getAverageForDateTime(lastUpdatedDate)
            if (trendAverage !== null) {
                const difference = waitTime - trendAverage
                const threshold = 0.5 * 60 // 30 minutes

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

    const hasCriticalCases =
        hospital.criticalManagementStatus === ManagementStatus.Managing ||
        hospital.criticalManagementStatus ===
            ManagementStatus.ManagingMultiple ||
        hospital.emergencyManagementStatus === ManagementStatus.Managing ||
        hospital.emergencyManagementStatus === ManagementStatus.ManagingMultiple

    return (
        <div
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto pointer-events-none z-10"
            style={{ maxWidth: "calc(100% - 2rem)" }}
        >
            <div
                className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg p-3 sm:p-4 pointer-events-auto relative"
                style={{ maxWidth: "600px" }}
            >
                {/* Google Maps icon in top-right */}
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

                {/* Mobile: Vertical layout */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-2 sm:space-y-0 pr-6 sm:pr-8">
                    {/* Left section: Hospital info and wait times */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1 pr-6 sm:pr-0">
                            {hospital.name[lang]}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                            {hospital.address[lang]}
                        </p>

                        {/* Wait times - vertical on mobile, horizontal on larger screens */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-1.5 sm:space-y-0">
                            {/* Primary wait time */}
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
                                        {texts.semiUrgent}
                                    </span>
                                </div>
                            </div>

                            {/* Secondary wait times - horizontal on larger screens, aligned at bottom */}
                            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3 pl-5 sm:pl-0 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                                {hospital.waitTimes.urgentP50Minutes !==
                                    null && (
                                    <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                        {texts.urgent}:{" "}
                                        {formatWaitTimeLocalized(
                                            hospital.waitTimes.urgentP50Minutes,
                                            lang
                                        )}
                                    </div>
                                )}
                                {hospital.waitTimes.emergencyMinutes !==
                                    null && (
                                    <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                        {texts.emergency}:{" "}
                                        {formatWaitTimeLocalized(
                                            hospital.waitTimes.emergencyMinutes,
                                            lang
                                        )}
                                    </div>
                                )}
                                {hospital.waitTimes.criticalMinutes !==
                                    null && (
                                    <div className="sm:border-l sm:pl-3 sm:pb-0.5">
                                        {texts.critical}:{" "}
                                        {formatWaitTimeLocalized(
                                            hospital.waitTimes.criticalMinutes,
                                            lang
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Critical case status */}
                        {hasCriticalCases && (
                            <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1.5 sm:pt-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>
                                    {hospital.criticalManagementStatus ===
                                    ManagementStatus.ManagingMultiple
                                        ? lang === LanguageCode.EN
                                            ? "Managing multiple critical cases"
                                            : lang === LanguageCode.ZH
                                              ? "正在處理多個危殆個案"
                                              : "正在处理多个危殆个案"
                                        : lang === LanguageCode.EN
                                          ? "Managing critical case"
                                          : lang === LanguageCode.ZH
                                            ? "正在處理危殆個案"
                                            : "正在处理危殆个案"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right section: Distance (if available) */}
                    {distance && (
                        <div className="text-xs sm:text-sm text-muted-foreground border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 sm:ml-0 flex-shrink-0 sm:pb-0.5">
                            <div className="flex items-center gap-1 mb-1">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="font-medium">
                                    {formatDistance(distance.distance)}
                                </span>
                            </div>
                            <div className="text-xs">
                                {formatDuration(distance.duration, lang)}{" "}
                                {texts.drive}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
