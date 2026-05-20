/**
 * Generate GOPC clinic entry files using createGopcEntry() factory.
 * Usage: npx tsx scripts/alternatives/generate-gopc-entries.ts [--force]
 */
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { createGopcEntry, type GopcLegacyRow } from "@/data/alternatives/gopc"
import { GOPC_SLUG_PREFIX, REVIEWED_SLUGS } from "./lib/constants"
import { entryFilePath, writePhysicalEntryFile } from "./lib/write-entry-file"

const ARCHIVE = join(process.cwd(), "data/archive/alternatives/Non24HourFacilities.json")

function main() {
    const force = process.argv.includes("--force")
    const rows = JSON.parse(readFileSync(ARCHIVE, "utf8")) as GopcLegacyRow[]
    let written = 0
    let skipped = 0

    for (const row of rows) {
        if (!row.slug.startsWith(GOPC_SLUG_PREFIX)) continue
        if (!force && (REVIEWED_SLUGS.has(row.slug) || existsSync(entryFilePath(row.slug)))) {
            skipped++
            continue
        }

        writePhysicalEntryFile(row.slug, createGopcEntry(row), {
            source: "gopc factory + archive/Non24HourFacilities.json",
        })
        written++
    }

    console.log(`generate-gopc-entries: wrote ${written}, skipped ${skipped}`)
}

main()
