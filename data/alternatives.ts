/**
 * Public data API for alternatives. Implementation lives in alternatives2.
 * Legacy type names re-exported for gradual migration of imports.
 */
export {
    alternatives,
    alternatives24Hour,
    alternativesBySlug,
    getAlternativeSlugs as getSlugs,
} from "@/data/alternatives2"

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
