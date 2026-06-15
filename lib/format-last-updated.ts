import dayjs, { zhCN, zhHK } from "@/lib/dayjs"
import { LanguageCode } from "@/types"

export const lastUpdatedLabel = {
    [LanguageCode.EN]: "Last updated:",
    [LanguageCode.ZH]: "最後更新：",
    [LanguageCode.CN]: "最后更新：",
}

export function formatLastUpdated(
    dateString: string,
    lang: LanguageCode
): string {
    let formattedDate = dayjs(dateString, "DD/MM/YYYY hh:mm A")
    if (lang === LanguageCode.ZH) {
        formattedDate = formattedDate.locale(zhHK)
        return formattedDate.format("YYYY年M月D日, h:mm A")
    }
    if (lang === LanguageCode.CN) {
        formattedDate = formattedDate.locale(zhCN)
        return formattedDate.format("YYYY年M月D日, h:mm A")
    }
    return formattedDate.format("MMM Do YYYY, h:mm A")
}
