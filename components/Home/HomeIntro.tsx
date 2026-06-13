"use client"

import { siteConfig } from "@/configs/site"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"

const introCopy = {
    [LanguageCode.EN]: {
        body: "Hong Kong public A&E wait times for all 18 Hospital Authority hospitals, updated every 15 minutes.",
        lastUpdated: "Last updated:",
        browseHospitals: "Browse all hospitals",
    },
    [LanguageCode.ZH]: {
        body: "香港全部18間公立醫院管理局急症室的等候時間，每15分鐘更新。",
        lastUpdated: "最後更新：",
        browseHospitals: "瀏覽所有醫院",
    },
    [LanguageCode.CN]: {
        body: "香港全部18间公立医院管理局急诊室的等候时间，每15分钟更新。",
        lastUpdated: "最后更新：",
        browseHospitals: "浏览所有医院",
    },
}

export default function HomeIntro() {
    const { lang } = useLanguage()
    const copy = introCopy[lang]

    return (
        <div className="space-y-2 mb-4 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {siteConfig.name[lang]}
            </h1>
            <p className="text-muted-foreground leading-relaxed">{copy.body}</p>
        </div>
    )
}
