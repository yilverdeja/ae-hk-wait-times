import { LanguageCode } from "@/types"

const waitTimeNA = {
    [LanguageCode.EN]: "N/A",
    [LanguageCode.ZH]: "不適用",
    [LanguageCode.CN]: "不适用",
}

export function formatWaitMinutes(
    minutes: number | null,
    lang: LanguageCode
): string {
    if (minutes === null) return waitTimeNA[lang]
    const h = Math.floor(minutes / 60)
    const m = Math.floor(minutes % 60)
    const hourChar =
        lang === LanguageCode.EN ? "h" : lang === LanguageCode.ZH ? "小時" : "小时"
    const minChar =
        lang === LanguageCode.EN ? "m" : lang === LanguageCode.ZH ? "分鐘" : "分钟"
    if (h > 0 && m > 0) return `${h}${hourChar} ${m}${minChar}`
    if (h > 0) return `${h}${hourChar}`
    return `${m}${minChar}`
}
