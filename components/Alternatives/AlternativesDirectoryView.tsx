"use client"

import { AlternativeCard } from "@/components/Alternatives/AlternativeCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type AlternativeCategory, type AlternativeEntry } from "@/data/alternatives"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"

const tabLabels = {
    [LanguageCode.EN]: {
        "24hour": "24-Hour Facilities",
        non24hour: "Outpatient Clinics",
        telehealth: "Telehealth",
    },
    [LanguageCode.ZH]: {
        "24hour": "24小時設施",
        non24hour: "普通科門診",
        telehealth: "遠程醫療",
    },
    [LanguageCode.CN]: {
        "24hour": "24小时设施",
        non24hour: "普通科门诊",
        telehealth: "远程医疗",
    },
}

interface AlternativesDirectoryViewProps {
    alternatives: AlternativeEntry[]
    defaultTab?: AlternativeCategory
}

export function AlternativesDirectoryView({
    alternatives,
    defaultTab = "24hour",
}: AlternativesDirectoryViewProps) {
    const { lang } = useLanguage()
    const labels = tabLabels[lang]

    const byCategory = (cat: AlternativeCategory) =>
        alternatives.filter((e) => e.category === cat)

    return (
        <Tabs defaultValue={defaultTab}>
            <TabsList>
                <TabsTrigger value="24hour">{labels["24hour"]}</TabsTrigger>
                <TabsTrigger value="non24hour">{labels.non24hour}</TabsTrigger>
                <TabsTrigger value="telehealth">{labels.telehealth}</TabsTrigger>
            </TabsList>

            {(["24hour", "non24hour", "telehealth"] as AlternativeCategory[]).map((cat) => (
                <TabsContent key={cat} value={cat} className="mt-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {byCategory(cat).map((entry) => (
                            <AlternativeCard key={entry.slug} entry={entry} lang={lang} />
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}
