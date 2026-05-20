/**
 * Generate data/alternatives/entries/{slug}.ts stubs from archive JSON.
 * Usage: npx tsx scripts/alternatives/migrate-legacy-to-entry.ts [--force] [--slug=name]
 */
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { GOPC_SLUG_PREFIX, REVIEWED_SLUGS } from "./lib/constants"
import {
    migratePhysical,
    migrateTelehealth,
    type LegacyPhysical,
    type LegacyTelehealth,
} from "./lib/migrate-from-legacy"
import { entryFilePath, writePhysicalEntryFile, writeTelehealthEntryFile } from "./lib/write-entry-file"

const ARCHIVE = join(process.cwd(), "data/archive/alternatives")

function loadJson<T>(filename: string): T[] {
    return JSON.parse(readFileSync(join(ARCHIVE, filename), "utf8")) as T[]
}

function parseArgs() {
    const force = process.argv.includes("--force")
    const slugArg = process.argv.find((a) => a.startsWith("--slug="))
    const slug = slugArg?.split("=")[1]
    return { force, slug }
}

function shouldSkip(slug: string, force: boolean): boolean {
    if (force) return false
    if (REVIEWED_SLUGS.has(slug)) return true
    if (slug.startsWith(GOPC_SLUG_PREFIX)) return true
    if (existsSync(entryFilePath(slug))) return true
    return false
}

function main() {
    const { force, slug: onlySlug } = parseArgs()
    let written = 0
    let skipped = 0

    const physical24 = loadJson<LegacyPhysical>("24HourFacilities.json")
    const physicalNon24 = loadJson<LegacyPhysical>("Non24HourFacilities.json")
    const telehealth = loadJson<LegacyTelehealth>("TelehealthServices.json")

    for (const row of physical24) {
        if (onlySlug && row.slug !== onlySlug) continue
        if (shouldSkip(row.slug, force)) {
            skipped++
            continue
        }
        writePhysicalEntryFile(row.slug, migratePhysical(row, "24hour"), {
            source: "archive/24HourFacilities.json",
        })
        written++
    }

    for (const row of physicalNon24) {
        if (onlySlug && row.slug !== onlySlug) continue
        if (shouldSkip(row.slug, force)) {
            skipped++
            continue
        }
        writePhysicalEntryFile(row.slug, migratePhysical(row, "non24hour"), {
            source: "archive/Non24HourFacilities.json",
        })
        written++
    }

    for (const row of telehealth) {
        if (onlySlug && row.slug !== onlySlug) continue
        if (shouldSkip(row.slug, force)) {
            skipped++
            continue
        }
        writeTelehealthEntryFile(row.slug, migrateTelehealth(row), {
            source: "archive/TelehealthServices.json",
        })
        written++
    }

    console.log(`migrate-legacy-to-entry: wrote ${written}, skipped ${skipped}`)
}

main()
