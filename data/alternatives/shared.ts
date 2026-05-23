import { HA_FMC_CHARGES, HA_FMC_DRUG_FEE_NOTE } from "@/data/ha/public-charges"
import { i18n } from "@/lib/i18n"
import { OPEN_PUBLIC } from "@/lib/alternatives/resolve"
import type { LocalizedString } from "@/types"
import type { EligibilityRule, FeeTier } from "@/types/alternatives"

export const EXCLUDES_DRUGS_LABS: LocalizedString[] = [
    i18n("Drugs", "藥物"),
    i18n("Laboratory tests", "化驗"),
    i18n("Medical supplies", "醫療用品"),
]

/** Standard outpatient consultation exclusions for private hospital fee tables. */
export const EXCLUDES_CONSULTATION_STANDARD: LocalizedString[] = [
    ...EXCLUDES_DRUGS_LABS,
    i18n("Minor procedures", "小型手術"),
    i18n("Other clinical services", "其他醫療服務"),
]

/** HA Family Medicine Clinic — consultation fee only (drugs charged per item separately). */
export const EXCLUDES_FMC_CONSULTATION: LocalizedString[] = [
    i18n("Drugs (charged per item separately)", "藥物（按件另計）"),
    i18n("Laboratory tests", "化驗"),
    i18n("Other clinical services", "其他醫療服務"),
]

export const CONSULTATION_FEE_DISCLAIMER = i18n(
    "Outpatient consultation fee only. Excludes medication, laboratory tests, minor procedures, and other services. Critical-case fees may apply separately.",
    "只包括門診診金，不包括藥物、化驗、小型手術及其他服務。危殆個案或另收急症診金。"
)

export const ELIGIBLE_GOPC: EligibilityRule = {
    audience: "hk_resident_eligible",
    summary: i18n("Eligible HK residents (HKID)", "合資格香港居民（香港身份證）"),
    details: i18n(
        `HK$${HA_FMC_CHARGES.eligibleAttendanceHkd} per attendance. HK$${HA_FMC_CHARGES.eligibleDrugPerItemHkd} per drug item dispensed.`,
        `每次診症HK$${HA_FMC_CHARGES.eligibleAttendanceHkd}。每種配發藥物HK$${HA_FMC_CHARGES.eligibleDrugPerItemHkd}。`,
        `每次诊症HK$${HA_FMC_CHARGES.eligibleAttendanceHkd}。每种配发药物HK$${HA_FMC_CHARGES.eligibleDrugPerItemHkd}。`
    ),
}

export const NON_ELIGIBLE_GOPC: EligibilityRule = {
    audience: "hk_resident_non_eligible",
    summary: i18n("Non-eligible persons", "非合資格人士"),
    details: i18n(
        `HK$${HA_FMC_CHARGES.nonEligibleAttendanceHkd} per attendance. HK$${HA_FMC_CHARGES.nonEligibleDrugPerItemHkd} per drug item dispensed.`,
        `每次診症HK$${HA_FMC_CHARGES.nonEligibleAttendanceHkd}。每種配發藥物HK$${HA_FMC_CHARGES.nonEligibleDrugPerItemHkd}。`,
        `每次诊症HK$${HA_FMC_CHARGES.nonEligibleAttendanceHkd}。每种配发药物HK$${HA_FMC_CHARGES.nonEligibleDrugPerItemHkd}。`
    ),
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

/** @deprecated Use `fmcFeeTiers()` — HA Family Medicine Clinic (formerly GOPC) fees. */
export function gopcFeeTiers(): FeeTier[] {
    return fmcFeeTiers()
}

export function fmcFeeTiers(): FeeTier[] {
    return [
        {
            id: "eligible",
            label: i18n("Consultation (eligible)", "診症（合資格）"),
            consultation: { currency: "HKD", amount: HA_FMC_CHARGES.eligibleAttendanceHkd },
            appliesWhen: [{ type: "default" }],
            eligibility: [ELIGIBLE_GOPC],
            excludes: EXCLUDES_FMC_CONSULTATION,
        },
        {
            id: "non_eligible",
            label: i18n("Consultation (non-eligible)", "診症（非合資格）"),
            consultation: { currency: "HKD", amount: HA_FMC_CHARGES.nonEligibleAttendanceHkd },
            appliesWhen: [{ type: "default" }],
            eligibility: [NON_ELIGIBLE_GOPC],
            excludes: EXCLUDES_FMC_CONSULTATION,
        },
    ]
}

export const FMC_PRICING_DISPLAY_NOTES = HA_FMC_DRUG_FEE_NOTE
