import facilitiesData24Hour from "@/data/misc/24HourFacilities.json"
import facilitiesDataNon24Hour from "@/data/misc/Non24HourFacilities.json"
import telehealthData from "@/data/misc/TelehealthServices.json"
import type { Alternative, PhysicalAlternative } from "@/types/alternatives"
import { gleneaglesHospitalHk } from "./alternatives2/entries/gleneagles-hospital-hk"
import { migratePhysical, migrateTelehealth } from "./alternatives2/migrate-from-legacy"
import { pilotAlternatives } from "./alternatives2/pilots"

const HAND_CURATED_SLUGS = new Set([
    ...pilotAlternatives.map((a) => a.slug),
    gleneaglesHospitalHk.slug,
])

const migrated24Hour = (facilitiesData24Hour as Parameters<typeof migratePhysical>[0][])
    .filter((f) => !HAND_CURATED_SLUGS.has(f.slug))
    .map((f) => migratePhysical(f, "24hour"))

const migratedNon24Hour = (facilitiesDataNon24Hour as Parameters<typeof migratePhysical>[0][])
    .filter((f) => !HAND_CURATED_SLUGS.has(f.slug))
    .map((f) => migratePhysical(f, "non24hour"))

const migratedTelehealth = (telehealthData as Parameters<typeof migrateTelehealth>[0][])
    .filter((f) => !HAND_CURATED_SLUGS.has(f.slug))
    .map((f) => migrateTelehealth(f))

export const alternatives: Alternative[] = [
    ...pilotAlternatives,
    gleneaglesHospitalHk,
    ...migrated24Hour,
    ...migratedNon24Hour,
    ...migratedTelehealth,
]

export const alternativesBySlug: Record<string, Alternative> = Object.fromEntries(
    alternatives.map((a) => [a.slug, a])
)

export const alternatives24Hour: PhysicalAlternative[] = alternatives.filter(
    (a): a is PhysicalAlternative => a.category === "24hour"
)

export function getAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug)
}
