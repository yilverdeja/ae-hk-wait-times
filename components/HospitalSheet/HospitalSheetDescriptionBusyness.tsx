import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { useMemo } from "react"

// Helper to format minutes into a more human-readable "Xh Ym" format
const formatMinutesToHoursAndMinutes = (
    totalMinutes: number,
    lang: LanguageCode
) => {
    const hourChar =
        lang === LanguageCode.EN
            ? "h"
            : lang === LanguageCode.ZH
              ? "小時"
              : "小时"
    const minChar =
        lang === LanguageCode.EN
            ? "m"
            : lang === LanguageCode.ZH
              ? "分鐘"
              : "分钟"

    if (totalMinutes < 1) return lang === LanguageCode.EN ? "0m" : `0${minChar}`
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    if (hours > 0 && minutes > 0) {
        return `${hours}${hourChar} ${minutes}${minChar}`
    }
    if (hours > 0) {
        return `${hours}${hourChar}`
    }
    return `${minutes}${minChar}`
}

const busynessTexts = {
    [LanguageCode.EN]: {
        currentWaitTime: "Current wait time is",
        busier: "busier",
        quieter: "quieter",
        same: "same",
        thanUsualAverage: "than the usual average of",
        aboutSame: "about the",
        asUsualAverage: "as the usual average.",
    },
    [LanguageCode.ZH]: {
        currentWaitTime: "目前等候時間為",
        busier: "較繁忙",
        quieter: "較清閒",
        same: "相若",
        thanUsualAverage: "，較一般平均",
        aboutSame: "與一般平均",
        asUsualAverage: "相若。",
    },
    [LanguageCode.CN]: {
        currentWaitTime: "目前等候时间为",
        busier: "较繁忙",
        quieter: "较清闲",
        same: "相若",
        thanUsualAverage: "，较一般平均",
        aboutSame: "与一般平均",
        asUsualAverage: "相若。",
    },
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
    const { lang } = useLanguage()
    const texts = busynessTexts[lang]
    const content = useMemo(() => {
        if (isLoading) {
            // Using a non-breaking space as a placeholder to prevent layout shifts
            return <span>&nbsp;</span>
        }

        if (isError || !comparison) {
            return (
                <span>
                    {texts.currentWaitTime}{" "}
                    <b>
                        {formatMinutesToHoursAndMinutes(
                            liveWaitTimeInMinutes,
                            lang
                        )}
                    </b>
                    {lang === LanguageCode.EN ? "." : "。"}
                </span>
            )
        }

        const liveTimeFormatted = formatMinutesToHoursAndMinutes(
            liveWaitTimeInMinutes,
            lang
        )
        const averageTimeFormatted = formatMinutesToHoursAndMinutes(
            comparison.average,
            lang
        )

        switch (comparison.trend) {
            case "higher":
                return (
                    <span>
                        {lang === LanguageCode.EN ? (
                            <>
                                The current wait time of{" "}
                                <b>{liveTimeFormatted}</b> is{" "}
                                <b className="text-orange-500">
                                    {texts.busier}
                                </b>{" "}
                                {texts.thanUsualAverage} {averageTimeFormatted}.
                            </>
                        ) : (
                            <>
                                目前等候時間為 <b>{liveTimeFormatted}</b>
                                {texts.thanUsualAverage}{" "}
                                <b className="text-orange-500">
                                    {texts.busier}
                                </b>{" "}
                                {averageTimeFormatted}。
                            </>
                        )}
                    </span>
                )
            case "lower":
                return (
                    <span>
                        {lang === LanguageCode.EN ? (
                            <>
                                The current wait time of{" "}
                                <b>{liveTimeFormatted}</b> is{" "}
                                <b className="text-green-600">
                                    {texts.quieter}
                                </b>{" "}
                                {texts.thanUsualAverage} {averageTimeFormatted}.
                            </>
                        ) : (
                            <>
                                目前等候時間為 <b>{liveTimeFormatted}</b>
                                {texts.thanUsualAverage}{" "}
                                <b className="text-green-600">
                                    {texts.quieter}
                                </b>{" "}
                                {averageTimeFormatted}。
                            </>
                        )}
                    </span>
                )
            case "same":
                return (
                    <span>
                        {lang === LanguageCode.EN ? (
                            <>
                                The current wait time of{" "}
                                <b>{liveTimeFormatted}</b> is {texts.aboutSame}{" "}
                                <b>{texts.same}</b> {texts.asUsualAverage}
                            </>
                        ) : (
                            <>
                                目前等候時間為 <b>{liveTimeFormatted}</b>，
                                {texts.aboutSame} <b>{texts.same}</b>{" "}
                                {texts.asUsualAverage}
                            </>
                        )}
                    </span>
                )
            default:
                return null
        }
    }, [isLoading, isError, comparison, liveWaitTimeInMinutes, texts, lang])

    return <>{content}</>
}
