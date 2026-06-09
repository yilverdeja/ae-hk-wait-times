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
    "Real-time A&E wait times for Hong Kong public hospitals.",
    "香港公立醫院急症室即時等候時間。",
    "香港公立医院急诊室即时等候时间。"
)

export const footerGroups: FooterGroup[] = [
    {
        id: "site",
        heading: i18n("Site", "網站", "网站"),
        links: [
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
