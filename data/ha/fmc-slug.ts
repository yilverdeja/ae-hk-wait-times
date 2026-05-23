import type { HaFmcFacilityRow } from "./fmc-types"

/** Preserve stable slugs for clinics that already exist in the app. Key: institution_eng from opendata. */
const INSTITUTION_SLUG_OVERRIDES: Record<string, string> = {
    "Aberdeen Jockey Club Family Medicine Clinic": "gopc-aberdeen",
    "Ap Lei Chau Family Medicine Clinic": "gopc-ap-lei-chau",
    "Central District Family Medicine Clinic": "gopc-central",
    "Chai Wan Family Medicine Clinic": "gopc-chai-wan",
    "North Point Anne Black Family Medicine Clinic": "gopc-anne-black",
    "Sai Wan Ho Family Medicine Clinic": "gopc-sai-wan-ho",
    "Shau Kei Wan Jockey Club Family Medicine Clinic": "gopc-shau-kei-wan-jockey-club",
    "Stanley Family Medicine Clinic": "gopc-stanley",
    "Shatin (Tai Wai) Family Medicine Clinic": "gopc-tai-wai",
    "Lek Yuen Family Medicine Clinic": "gopc-lek-yuen",
    "Ma On Shan Family Medicine Clinic": "gopc-ma-on-shan",
    "Sai Kung Mona Fong Family Medicine Clinic": "gopc-mona-fong",
    "Tseung Kwan O (Po Ning Road) Family Medicine Clinic": "gopc-tko-po-ning-road",
    "Tseung Kwan O Jockey Club Family Medicine Clinic": "gopc-tko-jockey-club",
    "Wan Tsui Family Medicine Clinic": "gopc-wan-tsui-estate",
}

function slugifySegment(text: string): string {
    return text
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

/** Derive `gopc-*` slug from English institution name (HA Family Medicine Clinic). */
export function fmcInstitutionToSlug(institutionEng: string): string {
    const override = INSTITUTION_SLUG_OVERRIDES[institutionEng]
    if (override) return override

    let base = institutionEng
        .replace(/ Family Medicine (Clinic|Integrated Centre)/i, "")
        .replace(/\s*\([^)]*\)\s*/g, " ")
        .trim()

    return `gopc-${slugifySegment(base)}`
}

export function districtFromAddress(addressEng: string): string {
    const parts = addressEng.split(",").map((p) => p.trim())
    return parts[parts.length - 1] || addressEng
}

export function fmcDisplayNameEn(institutionEng: string): string {
    return institutionEng.replace(/ Family Medicine (Clinic|Integrated Centre)/i, " FMC (HA)")
}

export function rowKey(row: HaFmcFacilityRow): string {
    return `${row.latitude.toFixed(5)},${row.longitude.toFixed(5)}`
}
