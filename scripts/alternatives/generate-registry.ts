/**
 * Regenerate data/alternatives/index.ts from entries/*.ts
 * Usage: npx tsx scripts/alternatives/generate-registry.ts
 */
import { readdirSync, writeFileSync } from "fs"
import { join } from "path"
import { REVIEWED_SLUGS } from "./lib/constants"
import { slugToExportName } from "./lib/slug-utils"

const ENTRIES_DIR = join(process.cwd(), "data/alternatives/entries")
const INDEX_PATH = join(process.cwd(), "data/alternatives/index.ts")

function main() {
    const slugs = readdirSync(ENTRIES_DIR)
        .filter((f) => f.endsWith(".ts"))
        .map((f) => f.replace(/\.ts$/, ""))
        .sort((a, b) => a.localeCompare(b))

    const reviewed = slugs.filter((s) => REVIEWED_SLUGS.has(s))
    const generated = slugs.filter((s) => !REVIEWED_SLUGS.has(s))

    const importLines: string[] = []
    const exportNames: string[] = []

    for (const slug of reviewed) {
        const name = slugToExportName(slug)
        importLines.push(`import { ${name} } from "./entries/${slug}"`)
        exportNames.push(name)
    }

    importLines.push("")
    importLines.push("// --- Auto-generated (needs review) ---")

    for (const slug of generated) {
        const name = slugToExportName(slug)
        importLines.push(`import { ${name} } from "./entries/${slug}"`)
        exportNames.push(name)
    }

    const content = `import type { Alternative, PhysicalAlternative } from "@/types/alternatives"

${importLines.join("\n")}

// --- Reviewed ---
const reviewedAlternatives: Alternative[] = [
${reviewed.map((s) => `    ${slugToExportName(s)},`).join("\n")}
]

// --- Auto-generated (needs review) ---
const generatedAlternatives: Alternative[] = [
${generated.map((s) => `    ${slugToExportName(s)},`).join("\n")}
]

export const alternatives: Alternative[] = [...reviewedAlternatives, ...generatedAlternatives]

export const alternativesBySlug: Record<string, Alternative> = Object.fromEntries(
    alternatives.map((a) => [a.slug, a])
)

export const alternatives24Hour: PhysicalAlternative[] = alternatives.filter(
    (a): a is PhysicalAlternative => a.category === "24hour"
)

export function getAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug)
}
`

    writeFileSync(INDEX_PATH, content, "utf8")
    console.log(
        `generate-registry: ${slugs.length} entries (${reviewed.length} reviewed, ${generated.length} generated)`
    )
}

main()
