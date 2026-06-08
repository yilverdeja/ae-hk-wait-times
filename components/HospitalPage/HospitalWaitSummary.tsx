"use client"

import { formatWaitMinutes } from "@/lib/format-wait-time"
import { EnrichedHospitalData, LanguageCode } from "@/types"

const summaryCopy = {
    [LanguageCode.EN]: {
        prefix: "As of",
        semiUrgent: "semi-urgent/non-urgent wait at",
        is: "is approximately",
        unavailable: "Wait time data is temporarily unavailable for",
        percentile: "(95th percentile reference).",
    },
    [LanguageCode.ZH]: {
        prefix: "截至",
        semiUrgent: "次緊急／非緊急等候時間約為",
        is: "",
        unavailable: "暫時無法取得",
        percentile: "的等候時間數據（第95百分位數參考）。",
    },
    [LanguageCode.CN]: {
        prefix: "截至",
        semiUrgent: "次紧急／非紧急等候时间约为",
        is: "",
        unavailable: "暂时无法取得",
        percentile: "的等候时间数据（第95百分位数参考）。",
    },
}

interface HospitalWaitSummaryProps {
    hospital: EnrichedHospitalData
    lastUpdated: string | null
    lang: LanguageCode
}

export default function HospitalWaitSummary({
    hospital,
    lastUpdated,
    lang,
}: HospitalWaitSummaryProps) {
    const copy = summaryCopy[lang]
    const p95 = hospital.waitTimes.semiUrgentNonUrgentP95Minutes
    const name = hospital.name[lang]

    if (!lastUpdated) return null

    if (p95 === null) {
        return (
            <p className="text-sm text-muted-foreground mb-4">
                {copy.unavailable} {name}
                {lang === LanguageCode.EN ? "." : copy.percentile}
            </p>
        )
    }

    const formatted = formatWaitMinutes(p95, lang)

    if (lang === LanguageCode.EN) {
        return (
            <p className="text-sm text-muted-foreground mb-4">
                {copy.prefix} {lastUpdated}, {copy.semiUrgent} {name}{" "}
                {copy.is} {formatted} {copy.percentile}
            </p>
        )
    }

    return (
        <p className="text-sm text-muted-foreground mb-4">
            {copy.prefix} {lastUpdated}，{name}
            {copy.semiUrgent} {formatted}
            {copy.percentile}
        </p>
    )
}
