import type { Alternative } from "@/types/alternatives"
import { pilotAlternatives } from "./alternatives2/pilots"

export const alternatives: Alternative[] = [...pilotAlternatives]

export const alternativesBySlug: Record<string, Alternative> = Object.fromEntries(
    alternatives.map((a) => [a.slug, a])
)

export function getAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug)
}
