"use client"

import { HospitalSheetDescriptionBusyness } from "@/components/HospitalSheet/HospitalSheetDescriptionBusyness"
import { HospitalSheetInformation } from "@/components/HospitalSheet/HospitalSheetInformation"
import { HospitalTrendChart } from "@/components/HospitalTrendChart"
import { useHospitalPredictions } from "@/hooks/useHospitalPredictions"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { useLanguage } from "@/hooks/useLanguage"
import { PREDICTION_CAP_MINS, PREDICTION_SUPPRESS_MINS } from "@/lib/constants"
import {
    managementStatusTranslations,
    waitTimeCategoryLabels,
    waitTimeNA,
} from "@/lib/map-translations"
import { EnrichedHospitalData, LanguageCode, ManagementStatus } from "@/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HospitalPageContentProps {
    hospital: EnrichedHospitalData
}

const pageTexts = {
    [LanguageCode.EN]: {
        back: "Back",
        waitTimes: "Wait Times",
        expectedWait: "Expected wait",
        typicalWait: "Typical",
    },
    [LanguageCode.ZH]: {
        back: "返回",
        waitTimes: "等候時間",
        expectedWait: "預計等候",
        typicalWait: "一般等候",
    },
    [LanguageCode.CN]: {
        back: "返回",
        waitTimes: "等候时间",
        expectedWait: "预计等候",
        typicalWait: "一般等候",
    },
}

function formatMinutes(minutes: number | null, lang: LanguageCode): string {
    if (minutes === null) return waitTimeNA[lang]
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    const hourChar =
        lang === LanguageCode.EN ? "h" : lang === LanguageCode.ZH ? "小時" : "小时"
    const minChar =
        lang === LanguageCode.EN ? "m" : lang === LanguageCode.ZH ? "分鐘" : "分钟"
    if (h > 0 && m > 0) return `${h}${hourChar} ${m}${minChar}`
    if (h > 0) return `${h}${hourChar}`
    return `${m}${minChar}`
}

interface WaitTimeCardProps {
    label: string
    p95Minutes: number | null
    p50Minutes?: number | null
    managementStatus?: ManagementStatus
    lang: LanguageCode
    texts: (typeof pageTexts)[LanguageCode]
}

function WaitTimeCard({
    label,
    p95Minutes,
    p50Minutes,
    managementStatus,
    lang,
    texts,
}: WaitTimeCardProps) {
    const isUnavailable =
        p95Minutes === null &&
        (p50Minutes === undefined || p50Minutes === null)

    return (
        <div className="rounded-lg border bg-card p-3 sm:p-4 space-y-1.5 min-w-0">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                {label}
            </p>

            <p
                className={`text-2xl font-bold ${isUnavailable ? "text-muted-foreground" : ""}`}
            >
                {formatMinutes(p95Minutes, lang)}
            </p>

            {p95Minutes !== null && (
                <p className="text-xs text-muted-foreground">{texts.expectedWait}</p>
            )}

            {p50Minutes !== undefined && p50Minutes !== null && (
                <p className="text-sm text-muted-foreground">
                    {texts.typicalWait}:{" "}
                    <span className="font-medium">
                        {formatMinutes(p50Minutes, lang)}
                    </span>
                </p>
            )}

            {managementStatus &&
                managementStatus !== ManagementStatus.NotManaging && (
                    <p className="text-xs text-orange-500 font-medium pt-0.5">
                        {managementStatusTranslations[managementStatus][lang]}
                    </p>
                )}
        </div>
    )
}

export default function HospitalPageContent({ hospital }: HospitalPageContentProps) {
    const { lang } = useLanguage()
    const { isLoading, isError, compareWithLiveTime } = useHospitalTrends(
        hospital.slug
    )
    const { getPredictions } = useHospitalPredictions()
    const liveWaitTime = hospital.waitTimes.semiUrgentNonUrgentP95Minutes ?? 0
    const comparison = compareWithLiveTime(liveWaitTime)

    const predictionDirection = (() => {
        if (liveWaitTime >= PREDICTION_SUPPRESS_MINS) return null
        const preds = getPredictions(hospital.slug)
        if (!preds || preds.pred1h == null) return null
        const effective = liveWaitTime >= PREDICTION_CAP_MINS
            ? Math.max(Math.max(0, preds.pred1h), liveWaitTime)
            : Math.max(0, preds.pred1h)
        const diff = effective - liveWaitTime
        if (Math.abs(diff) < 15) return "same" as const
        return diff > 0 ? "higher" as const : "lower" as const
    })()
    const texts = pageTexts[lang]
    const { waitTimes } = hospital

    return (
        <div className="py-4 space-y-6">
            {/* Back + Header */}
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                    <ArrowLeft size={16} />
                    {texts.back}
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    {hospital.name[lang]}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    <HospitalSheetDescriptionBusyness
                        isLoading={isLoading}
                        isError={isError}
                        liveWaitTimeInMinutes={liveWaitTime}
                        comparison={comparison}
                        predictionDirection={predictionDirection}
                    />
                </p>
            </div>

            {/*
             * All three sections in one grid.
             *
             * Mobile (flex-col): wait times → chart → info (DOM order).
             * Desktop (2-col grid with explicit placement):
             *   col 1 row 1 → wait times
             *   col 2 row 1-2 → trend chart (row-span-2)
             *   col 1 row 2 → info
             */}
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
                {/* Wait times — col 1, row 1 on desktop */}
                <div className="lg:col-start-1 lg:row-start-1">
                    <h2 className="mb-3 text-lg font-semibold tracking-tight">
                        {texts.waitTimes}
                    </h2>
                    {/* Ordered: Semi-urgent → Urgent → Emergency → Critical */}
                    <div className="grid grid-cols-2 gap-3">
                        <WaitTimeCard
                            label={waitTimeCategoryLabels.semiUrgent[lang]}
                            p95Minutes={waitTimes.semiUrgentNonUrgentP95Minutes}
                            p50Minutes={waitTimes.semiUrgentNonUrgentP50Minutes}
                            lang={lang}
                            texts={texts}
                        />
                        <WaitTimeCard
                            label={waitTimeCategoryLabels.urgent[lang]}
                            p95Minutes={waitTimes.urgentP95Minutes}
                            p50Minutes={waitTimes.urgentP50Minutes}
                            lang={lang}
                            texts={texts}
                        />
                        <WaitTimeCard
                            label={waitTimeCategoryLabels.emergency[lang]}
                            p95Minutes={waitTimes.emergencyMinutes}
                            managementStatus={hospital.emergencyManagementStatus}
                            lang={lang}
                            texts={texts}
                        />
                        <WaitTimeCard
                            label={waitTimeCategoryLabels.critical[lang]}
                            p95Minutes={waitTimes.criticalMinutes}
                            managementStatus={hospital.criticalManagementStatus}
                            lang={lang}
                            texts={texts}
                        />
                    </div>
                </div>

                {/* Trend chart — col 2, rows 1–2 on desktop; after wait times on mobile */}
                <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
                    <HospitalTrendChart
                        hospitalSlug={hospital.slug}
                        liveWaitTimeInMinutes={liveWaitTime}
                    />
                </div>

                {/* Info — col 1, row 2 on desktop; after chart on mobile */}
                <div className="lg:col-start-1 lg:row-start-2">
                    <HospitalSheetInformation
                        hospital={hospital}
                        lang={lang}
                        layout="grid"
                    />
                </div>
            </div>
        </div>
    )
}
