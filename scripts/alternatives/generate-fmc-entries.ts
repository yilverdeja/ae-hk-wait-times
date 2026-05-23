/**
 * Generate HA Family Medicine Clinic entry files from data/ha/facility-fmc.json.
 * Usage: npx tsx scripts/alternatives/generate-fmc-entries.ts [--force]
 */
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { createFmcEntry } from "@/data/alternatives/gopc"
import type { HaFmcFacilityRow } from "@/data/ha/fmc-types"
import { fmcInstitutionToSlug } from "@/data/ha/fmc-slug"
import { GOPC_SLUG_PREFIX, REVIEWED_SLUGS } from "./lib/constants"
import { entryFilePath, writePhysicalEntryFile } from "./lib/write-entry-file"

const FMC_JSON = join(process.cwd(), "data/ha/facility-fmc.json")

function main() {
    const force = process.argv.includes("--force")
    const rows = JSON.parse(readFileSync(FMC_JSON, "utf8")) as HaFmcFacilityRow[]
    let written = 0
    let skipped = 0

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

        const reviewed = REVIEWED_SLUGS.has(slug)
        writePhysicalEntryFile(slug, createFmcEntry(row), {
            reviewed,
            source: "HA opendata facility-fmc.json + shared FMC fees",
        })
        written++
    }

    console.log(`generate-fmc-entries: wrote ${written}, skipped ${skipped} (${rows.length} clinics in opendata)`)
}

main()
