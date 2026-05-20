import { i18n } from "@/lib/i18n"
import { OPEN_PUBLIC } from "@/lib/alternatives/resolve"
import type { LocalizedString } from "@/types"
import type { EligibilityRule, FeeTier } from "@/types/alternatives"

export const EXCLUDES_DRUGS_LABS: LocalizedString[] = [
    i18n("Drugs", "藥物"),
    i18n("Laboratory tests", "化驗"),
    i18n("Medical supplies", "醫療用品"),
]

export const ELIGIBLE_GOPC: EligibilityRule = {
    audience: "hk_resident_eligible",
    summary: i18n("Eligible HK residents (HKID)", "合資格香港居民（香港身份證）"),
    details: i18n(
        "HK$50 per visit for eligible persons. Fee reform may raise this to HK$150 from 2026.",
        "合資格人士每次診症HK$50。2026年起費用改革可能調整至HK$150。"
    ),
}

export const NON_ELIGIBLE_GOPC: EligibilityRule = {
    audience: "hk_resident_non_eligible",
    summary: i18n("Non-eligible persons", "非合資格人士"),
    details: i18n("HK$445 per visit for non-eligible persons.", "非合資格人士每次診症HK$445。"),
}

export const BUPA_MEMBER: EligibilityRule = {
    audience: "insurance_member",
    insurers: ["bupa"],
    summary: i18n("Bupa members only", "只限保柏會員"),
    details: i18n(
        "Requires eligible Bupa medical card and network Clinical Benefit. Co-payment may apply.",
        "須持有合資格保柏醫療卡及網絡臨床保障，可能須付共付額。"
    ),
}

export const AXA_EB_MEMBER: EligibilityRule = {
    audience: "employer_group",
    insurers: ["axa"],
    summary: i18n("AXA Employee Benefits members only", "只限AXA僱員福利保單成員"),
    details: i18n(
        "For insured employees and dependents of designated AXA Employee Benefits policies only.",
        "只限指定AXA僱員福利保單的受保僱員及其家屬。"
    ),
}

export { OPEN_PUBLIC }

export function gopcFeeTiers(): FeeTier[] {
    return [
        {
            id: "eligible",
            label: i18n("General consultation (eligible)", "普通科診症（合資格）"),
            consultation: { currency: "HKD", amount: 50 },
            appliesWhen: [{ type: "default" }],
            eligibility: [ELIGIBLE_GOPC],
        },
        {
            id: "non_eligible",
            label: i18n("General consultation (non-eligible)", "普通科診症（非合資格）"),
            consultation: { currency: "HKD", amount: 445 },
            appliesWhen: [{ type: "default" }],
            eligibility: [NON_ELIGIBLE_GOPC],
        },
    ]
}
