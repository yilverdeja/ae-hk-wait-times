import { i18n } from "@/lib/i18n"
import { HA_CHARGES_PAGE } from "./urls"

/** Hospital Authority public A&E attendance fees (all public hospitals with A&E). */
export const HA_PUBLIC_AE_CHARGES = {
    eligibleAttendanceHkd: 400,
    nonEligibleAttendanceHkd: 2100,
    sourceUrls: [{ url: HA_CHARGES_PAGE, label: i18n("Official HA charges", "醫管局官方收費", "医管局官方收费") }],
    lastUpdated: "2026-05-21",
} as const

/** Hospital Authority Family Medicine Clinic (formerly GOPC) fees. */
export const HA_FMC_CHARGES = {
    eligibleAttendanceHkd: 150,
    nonEligibleAttendanceHkd: 500,
    eligibleDrugPerItemHkd: 5,
    nonEligibleDrugPerItemHkd: 40,
    sourceUrls: [{ url: HA_CHARGES_PAGE, label: i18n("Official HA charges", "醫管局官方收費", "医管局官方收费") }],
    lastUpdated: "2026-05-21",
} as const

export const HA_FMC_DRUG_FEE_NOTE = i18n(
    "Eligible persons: HK$5 per drug item dispensed. Non-eligible: HK$40 per drug item. Excludes other services.",
    "合資格人士：每種配發藥物HK$5。非合資格人士：每種HK$40。不包括其他服務。",
    "合资格人士：每种配发药物HK$5。非合资格人士：每种HK$40。不包括其他服务。"
)

export const HA_FMC_APPOINTMENT_NOTE = i18n(
    "Appointment required — walk-in not accepted. Book via HA telephone booking or HA Go.",
    "須預約，不接受即到。可透過醫管局電話預約或HA Go。",
    "须预约，不接受即到。可通过医管局电话预约或HA Go。"
)
