import { i18n } from "@/lib/i18n"
import { LanguageCode, LocalizedString, ManagementStatus } from "@/types"

/**
 * Shared translations for map-related components
 */

// Wait time category labels
export const waitTimeCategoryLabels = {
    semiUrgent: i18n(
        "Semi-urgent / Non-urgent",
        "半緊急 / 非緊急",
        "半紧急 / 非紧急"
    ),
    urgent: i18n("Urgent", "緊急", "紧急"),
    emergency: i18n("Emergency", "急症", "急症"),
    critical: i18n("Critical", "危殆", "危殆"),
    hour: i18n("h", "小時", "小时"),
    minute: i18n("m", "分鐘", "分钟"),
    drive: i18n("drive", "車程", "车程"),
} as const

// N/A text for wait times
export const waitTimeNA = i18n("N/A", "不適用", "不适用")

// Map dialog texts
export const mapDialogTranslations = {
    title: i18n("Hospital Map", "醫院地圖", "医院地图"),
    buttonLabel: i18n("Map", "地圖", "地图"),
    description: i18n(
        "View all hospitals on the map. Markers are color-coded by wait times. Click on markers to view details.",
        "在地圖上查看所有醫院。標記按等候時間以顏色編碼。點擊標記以查看詳情。",
        "在地图上查看所有医院。标记按等候时间以颜色编码。点击标记以查看详情。"
    ),
    noGeolocation: i18n(
        "Enable location services to see distances from your location.",
        "啟用定位服務以查看與您位置的距離。",
        "启用定位服务以查看与您位置的距离。"
    ),
    outsideHongKong: i18n(
        "You appear to be outside Hong Kong. Showing default location.",
        "您似乎不在香港。顯示預設位置。",
        "您似乎不在香港。显示预设位置。"
    ),
} as const

// Management status texts (used in map overlay and table)
export const managementStatusTranslations: Record<
    ManagementStatus,
    LocalizedString
> = {
    [ManagementStatus.Managing]: i18n(
        "Managing critical case",
        "正在處理危殆個案",
        "正在处理危殆个案"
    ),
    [ManagementStatus.ManagingMultiple]: i18n(
        "Managing multiple critical cases",
        "正在處理多個危殆個案",
        "正在处理多个危殆个案"
    ),
    [ManagementStatus.NotManaging]: i18n(
        "No critical cases being managed",
        "沒有處理危殆個案",
        "没有处理危殆个案"
    ),
}

/**
 * Get a localized string by language code
 */
export function getLocalizedText(
    text: LocalizedString,
    lang: LanguageCode
): string {
    return text[lang]
}
