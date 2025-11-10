import { buildHospitalLink } from "@/lib/utils"
import { i18n } from "@/lib/i18n"
import { LanguageCode, LocalizedString } from "@/types"

const contentId = "235504"

type SiteConfig = {
    name: LocalizedString
    title: LocalizedString
    url: string
    description: LocalizedString
    links: {
        github: string
    }
    originalLink: (lang: LanguageCode) => string
    openDataLink: string
}

export const siteConfig: SiteConfig = {
    name: i18n(
        "A&E Hong Kong Wait Times",
        "香港A&E等待時間",
        "香港A&E等待時間"
    ),
    title: i18n("A&E Wait Times", "香港A&E等待時間", "香港A&E等待時間"),
    url: "https://ae.wait.hk",
    description: i18n(
        "Estimated reference of Hong Kong's Hospital Authority Accident and Emergency waiting times capped at 8 hours",
        "香港醫院管理局緊急醫療等待時間的估計參考，上限為8小時",
        "香港醫院管理局緊急醫療等待時間的估計參考，上限為8小時"
    ),
    links: {
        github: "https://github.com/yilverdeja/ae-hk-wait-times",
    },
    originalLink: (lang: LanguageCode) => buildHospitalLink(contentId, lang),
    openDataLink:
        "https://data.gov.hk/en-data/dataset/hospital-hadata-ae-waiting-time",
}
