import {
    ALTERNATIVE_CATEGORIES,
    type AlternativeCategory,
} from "@/types/alternatives"
import { LanguageCode } from "@/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categoryLabels = {
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

/** Server-rendered category links — visible before client Select hydrates. */
export function AlternativesCategoryNav({
    category,
    lang = LanguageCode.EN,
}: {
    category: AlternativeCategory
    lang?: LanguageCode
}) {
    const labels = categoryLabels[lang]

    return (
        <nav
            className="mb-4 flex flex-wrap gap-2 sm:hidden"
            aria-label="Alternative care categories"
        >
            {ALTERNATIVE_CATEGORIES.map((cat) => (
                <Link
                    key={cat}
                    href={`/alternatives?category=${cat}`}
                    className={cn(
                        "rounded-md border px-3 py-1.5 text-sm transition-colors",
                        cat === category
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-muted/50"
                    )}
                >
                    {labels[cat]}
                </Link>
            ))}
        </nav>
    )
}
