/**
 * Public data API for alternatives.
 */
export {
    alternatives,
    alternatives24Hour,
    alternativesBySlug,
    getAlternativeSlugs as getSlugs,
} from "@/data/alternatives/index"

export {
    ALTERNATIVE_CATEGORIES,
    isPhysicalAlternative as isPhysicalFacility,
    isTelehealthAlternative as isTelehealthFacility,
    parseAlternativeCategory,
} from "@/types/alternatives"

export type {
    Alternative as AlternativeEntry,
    AlternativeCategory,
    PhysicalAlternative,
    TelehealthAlternative,
} from "@/types/alternatives"
