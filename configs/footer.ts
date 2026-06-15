import { siteConfig } from "@/configs/site"
import { i18n } from "@/lib/i18n"
import { LanguageCode, LocalizedString } from "@/types"

export type FooterLink = {
    id: string
    label: LocalizedString
    href: string | ((lang: LanguageCode) => string)
    external?: boolean
    linkType: string
}

export type FooterGroup = {
    id: string
    heading: LocalizedString
    links: FooterLink[]
}

export const footerTagline = i18n(
    "Real-time A&E wait times for all 18 Hong Kong public hospitals, updated every 15 minutes. Explore trends, predicted wait times, and nearby options on the map.",
    "香港全部18間公立醫院急症室即時等候時間，每15分鐘更新。探索趨勢、預測等候時間，以及地圖上的附近選擇。",
    "香港全部18间公立医院急诊室即时等候时间，每15分钟更新。探索趋势、预测等候时间，以及地图上的附近选择。"
)

export const footerGroups: FooterGroup[] = [
    {
        id: "site",
        heading: i18n("Site", "網站", "网站"),
        links: [
            {
                id: "wait-times",
                label: i18n("Wait Times", "所有等候時間", "所有等候时间"),
                href: "/",
                linkType: "wait_times",
            },
            {
                id: "all-hospitals",
                label: i18n("All Hospitals", "所有醫院", "所有医院"),
                href: "/hospitals",
                linkType: "hospitals_directory",
            },
            {
                id: "faq",
                label: i18n("FAQ", "常見問題", "常见问题"),
                href: "/faq",
                linkType: "faq",
            },
        ],
    },
    {
        id: "resources",
        heading: i18n("Resources", "資源", "资源"),
        links: [
            {
                id: "original-site",
                label: i18n("Original Site", "原始網站", "原始网站"),
                href: (lang) => siteConfig.originalLink(lang),
                external: true,
                linkType: "original_site",
            },
            {
                id: "open-data",
                label: i18n("Open Data", "開放數據", "开放数据"),
                href: siteConfig.openDataLink,
                external: true,
                linkType: "open_data",
            },
            {
                id: "github",
                label: i18n("Github", "Github", "Github"),
                href: siteConfig.links.github,
                external: true,
                linkType: "github",
            },
        ],
    },
]

export function resolveFooterLinkHref(
    href: FooterLink["href"],
    lang: LanguageCode
): string {
    return typeof href === "function" ? href(lang) : href
}
