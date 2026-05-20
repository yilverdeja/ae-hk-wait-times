import { writeFileSync } from "fs"
import { join } from "path"
import type { Alternative, PhysicalAlternative, TelehealthAlternative } from "@/types/alternatives"
import { isPhysicalAlternative, isTelehealthAlternative } from "@/types/alternatives"
import { slugToExportName } from "./slug-utils"

const ENTRIES_DIR = join(process.cwd(), "data/alternatives/entries")

export function entryFilePath(slug: string): string {
    return join(ENTRIES_DIR, `${slug}.ts`)
}

export function writeEntryFile(
    slug: string,
    data: Alternative,
    options: { reviewed?: boolean; source?: string } = {}
): void {
    const exportName = slugToExportName(slug)
    const typeName = isPhysicalAlternative(data)
        ? "PhysicalAlternative"
        : isTelehealthAlternative(data)
          ? "TelehealthAlternative"
          : "Alternative"

    const header = options.reviewed
        ? "/** Reviewed — hand-curated entry. */\n"
        : `/** AUTO-GENERATED — needs manual review.${options.source ? ` Source: ${options.source}` : ""} */\n`

    const content = `${header}import type { ${typeName} } from "@/types/alternatives"

export const ${exportName}: ${typeName} = ${JSON.stringify(data, null, 4)} as ${typeName}
`

    writeFileSync(entryFilePath(slug), content, "utf8")
}

export function writePhysicalEntryFile(
    slug: string,
    data: PhysicalAlternative,
    options: { reviewed?: boolean; source?: string } = {}
): void {
    writeEntryFile(slug, data, options)
}

export function writeTelehealthEntryFile(
    slug: string,
    data: TelehealthAlternative,
    options: { reviewed?: boolean; source?: string } = {}
): void {
    writeEntryFile(slug, data, options)
}
