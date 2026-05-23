/**
 * Generate HA Family Medicine Clinic entry files from opendata + scraped details.
 * Usage: npx tsx scripts/alternatives/generate-fmc-entries.ts [--force]
 */
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { createFmcEntry } from "@/data/alternatives/gopc"
import type { HaFmcFacilityRow } from "@/data/ha/fmc-types"
import { lookupScraped } from "@/data/ha/fmc-scraped-match"
import type { FmcScrapedDetail } from "@/data/ha/fmc-scraped-types"
import { fmcInstitutionToSlug } from "@/data/ha/fmc-slug"
import { GOPC_SLUG_PREFIX, REVIEWED_SLUGS } from "./lib/constants"
import { entryFilePath, writePhysicalEntryFile } from "./lib/write-entry-file"

const FMC_JSON = join(process.cwd(), "data/ha/facility-fmc.json")
const SCRAPED_JSON = join(process.cwd(), "data/ha/fmc-scraped-details.json")

function main() {
    const force = process.argv.includes("--force")
    const rows = JSON.parse(readFileSync(FMC_JSON, "utf8")) as HaFmcFacilityRow[]
    const scraped = existsSync(SCRAPED_JSON)
        ? (JSON.parse(readFileSync(SCRAPED_JSON, "utf8")) as FmcScrapedDetail[])
        : []

    let written = 0
    let skipped = 0
    const unmatched: string[] = []

    for (const row of rows) {
        const slug = fmcInstitutionToSlug(row.institution_eng)
        if (!slug.startsWith(GOPC_SLUG_PREFIX)) {
            console.warn(`skip unexpected slug: ${slug} (${row.institution_eng})`)
            continue
        }
        if (!force && (REVIEWED_SLUGS.has(slug) || existsSync(entryFilePath(slug)))) {
            skipped++
            continue
        }

        const scrapedRow = scraped.length > 0 ? lookupScraped(row, scraped) : undefined
        if (scraped.length > 0 && !scrapedRow) {
            unmatched.push(row.institution_eng)
        }

        const reviewed = REVIEWED_SLUGS.has(slug)
        writePhysicalEntryFile(
            slug,
            createFmcEntry(row, { scraped: scrapedRow }),
            {
                reviewed,
                source: scrapedRow
                    ? "HA opendata + fmc-scraped-details.json"
                    : "HA opendata facility-fmc.json + shared FMC fees",
            }
        )
        written++
    }

    console.log(`generate-fmc-entries: wrote ${written}, skipped ${skipped} (${rows.length} opendata)`)
    if (scraped.length > 0) {
        console.log(`  scraped rows: ${scraped.length}, unmatched opendata: ${unmatched.length}`)
        for (const name of unmatched) {
            console.warn(`  unmatched: ${name}`)
        }
    }
}

main()
