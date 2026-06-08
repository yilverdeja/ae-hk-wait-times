"use client"

import PageBreadcrumb, { breadcrumbLabels } from "@/components/PageBreadcrumb"
import { regionNames } from "@/data/regions"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode, Region } from "@/types"
import Link from "next/link"

export type HospitalsByRegion = Record<
    Region,
    { slug: string; name: { en: string; zh: string; cn: string } }[]
>

const pageTexts = {
    [LanguageCode.EN]: {
        title: "All Hong Kong A&E Hospitals",
        intro:
            "Browse all 18 public Hospital Authority Accident & Emergency departments in Hong Kong. Each hospital page shows live wait times by triage category, hourly trends, and contact details.",
        homeLink: "View live wait times",
        regionHeading: (region: Region) => regionNames[region][LanguageCode.EN],
    },
    [LanguageCode.ZH]: {
        title: "香港所有急症室醫院",
        intro:
            "瀏覽香港全部18間公立醫院管理局急症室。每間醫院頁面顯示各分流類別的即時等候時間、每小時趨勢及聯絡資料。",
        homeLink: "查看即時等候時間",
        regionHeading: (region: Region) => regionNames[region][LanguageCode.ZH],
    },
    [LanguageCode.CN]: {
        title: "香港所有急诊室医院",
        intro:
            "浏览香港全部18间公立医院管理局急诊室。每间医院页面显示各分流类别的即时等候时间、每小时趋势及联络资料。",
        homeLink: "查看即时等候时间",
        regionHeading: (region: Region) => regionNames[region][LanguageCode.CN],
    },
}

const regionOrder: Region[] = [
    Region.HongKongIsland,
    Region.Kowloon,
    Region.NewTerritories,
]

interface HospitalsDirectoryContentProps {
    hospitalsByRegion: HospitalsByRegion
}

export default function HospitalsDirectoryContent({
    hospitalsByRegion,
}: HospitalsDirectoryContentProps) {
    const { lang } = useLanguage()
    const texts = pageTexts[lang]

    return (
        <main className="container mx-auto xl:max-w-none py-4 space-y-8 min-h-screen">
            <PageBreadcrumb
                items={[
                    { label: breadcrumbLabels.home[lang], href: "/" },
                    { label: breadcrumbLabels.allHospitals[lang] },
                ]}
            />
            <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">{texts.title}</h1>
                <p className="text-muted-foreground leading-relaxed">{texts.intro}</p>
                <Link
                    href="/"
                    className="inline-block text-sm underline underline-offset-2 hover:text-foreground"
                >
                    {texts.homeLink}
                </Link>
            </div>

            {regionOrder.map((region) => {
                const hospitals = hospitalsByRegion[region]
                if (!hospitals?.length) return null

                return (
                    <section key={region} aria-labelledby={`region-${region}`}>
                        <h2
                            id={`region-${region}`}
                            className="mb-3 text-lg font-semibold tracking-tight"
                        >
                            {texts.regionHeading(region)}
                        </h2>
                        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {hospitals.map(({ slug, name }) => (
                                <li key={slug}>
                                    <Link
                                        href={`/hospital/${slug}`}
                                        className="block rounded-lg border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/50"
                                    >
                                        {name[lang]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}
        </main>
    )
}
