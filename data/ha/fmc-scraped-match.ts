import type { HaFmcFacilityRow } from "./fmc-types"
import type { FmcScrapedDetail } from "./fmc-scraped-types"

function normalizeWhitespace(s: string): string {
    return s.replace(/\s+/g, " ").trim()
}

/** Normalize names for matching scraped rows to HA opendata. */
export function normalizeFmcName(name: string): string {
    return normalizeWhitespace(
        name
            .replace(/\s*\(\s*\)\s*/g, " ")
            .replace(/['’]/g, "'")
            .replace(/\s*–\s*/g, " - ")
    )
}

function normalizeAddress(address: string): string {
    return normalizeWhitespace(address.toLowerCase().replace(/['’]/g, "'"))
}

export function scrapedMatchesOpendata(scraped: FmcScrapedDetail, row: HaFmcFacilityRow): boolean {
    const scrapedName = normalizeFmcName(scraped.name)
    const rowName = normalizeFmcName(row.institution_eng)

    if (scrapedName === rowName) return true

    // Scraped titles sometimes omit "Family Medicine Clinic" suffix variants
    if (scrapedName.replace(/ family medicine clinic$/i, "") === rowName.replace(/ family medicine clinic$/i, "")) {
        return true
    }

    return normalizeAddress(scraped.address) === normalizeAddress(row.address_eng)
}

export function indexScrapedByOpendataRow(
    scrapedRows: FmcScrapedDetail[],
    opendataRow: HaFmcFacilityRow
): FmcScrapedDetail | undefined {
    return scrapedRows.find((s) => scrapedMatchesOpendata(s, opendataRow))
}

export function lookupScraped(
    opendataRow: HaFmcFacilityRow,
    scrapedRows: FmcScrapedDetail[]
): FmcScrapedDetail | undefined {
    const direct = indexScrapedByOpendataRow(scrapedRows, opendataRow)
    if (direct) return direct

    const byName = scrapedRows.find(
        (s) => normalizeFmcName(s.name) === normalizeFmcName(opendataRow.institution_eng)
    )
    if (byName) return byName

    return scrapedRows.find(
        (s) => normalizeAddress(s.address) === normalizeAddress(opendataRow.address_eng)
    )
}
