import { i18n } from "@/lib/i18n"
import type { LocalizedString } from "@/types"

/** HA visitor site language codes. */
export type HaVisitorLang = "ENG" | "CHIB5" | "CHIGB"

const HA_VISITOR_BASE = "https://www.ha.org.hk/visitor/ha_visitor_index.asp"

export function haVisitorUrl(contentId: string | number, lang: HaVisitorLang): string {
    return `${HA_VISITOR_BASE}?Content_ID=${contentId}&Lang=${lang}`
}

/** Official HA charges & fees (outpatient, A&E, etc.). */
export const HA_CHARGES_PAGE = i18n(
    haVisitorUrl("10045", "ENG"),
    haVisitorUrl("10045", "CHIB5"),
    haVisitorUrl("10045", "CHIGB")
)

/** Family Medicine Clinics directory (formerly GOPC list). Content_ID=200250 */
export const HA_FMC_DIRECTORY_PAGE = i18n(
    haVisitorUrl("200250", "ENG"),
    haVisitorUrl("200250", "CHIB5"),
    haVisitorUrl("200250", "CHIGB")
)

export const HA_FMC_OPENDATA_URL = "https://www.ha.org.hk/opendata/facility-fmc.json"

export function haChargesPageLabel(): LocalizedString {
    return i18n("Official HA charges", "醫管局官方收費", "医管局官方收费")
}

export function haFmcDirectoryLabel(): LocalizedString {
    return i18n(
        "HA Family Medicine Clinics",
        "醫管局家庭醫學診所",
        "医管局家庭医学诊所"
    )
}
