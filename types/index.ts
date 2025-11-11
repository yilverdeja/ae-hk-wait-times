// ===================================================================================
// SECTION 1: CORE STATIC DATA & INTERNATIONALIZATION (i18n) TYPES
// ===================================================================================

export enum LanguageCode {
    EN = "en",
    ZH = "zh",
    CN = "cn",
}

export type LocalizedString = Record<LanguageCode, string>

export enum Region {
    HongKongIsland = "Hong Kong Island",
    NewTerritories = "New Territories",
    Kowloon = "Kowloon",
}

export enum Cluster {
    HongKongEast = "Hong Kong East",
    HongKongWest = "Hong Kong West",
    KowloonCentral = "Kowloon Central",
    KowloonEast = "Kowloon East",
    KowloonWest = "Kowloon West",
    NewTerritoriesEast = "New Territories East",
    NewTerritoriesWest = "New Territories West",
}

/**
 * Defines the structure for a single hospital's static information.
 * Region and Cluster are stored as enums for robust filtering and sorting.
 * Their display names are retrieved from a separate translation map.
 */
export interface Hospital {
    name: LocalizedString
    region: Region
    linkId: string
    cluster: Cluster
    address: LocalizedString
    telephone: string
    fax: string
    email: string
    website?: string
    googleMapsLink: string
}

// For the hospitals data
export type HospitalAcronym = string
export type HospitalData = Record<HospitalAcronym, Hospital>

// ===================================================================================
// SECTION 2: API DATA TYPES
// ===================================================================================

// --- Raw External API Data ---
interface RawHospitalWaitTime {
    hospName: string
    t1wt: string
    manageT1case: "Y" | "N" | "N/A" | string
    t2wt: string
    manageT2case: "Y" | "N" | "N/A" | string
    t3p50: string
    t3p95: string
    t45p50: string
    t45p95: string
}

interface RawApiResponse {
    waitTime: RawHospitalWaitTime[]
    updateTime: string
}

// --- Our Transformed API Data ---
export enum ManagementStatus {
    Managing = "MANAGING",
    NotManaging = "NOT_MANAGING",
    ManagingMultiple = "MANAGING_MULTIPLE_CASES",
}

export interface TransformedHospitalData {
    hospitalName: string
    hospitalSlug: HospitalAcronym
    criticalManagementStatus: ManagementStatus
    emergencyManagementStatus: ManagementStatus
    waitTimes: {
        criticalMinutes: number | null
        emergencyMinutes: number | null
        urgentP50Minutes: number | null
        urgentP95Minutes: number | null
        semiUrgentNonUrgentP50Minutes: number | null
        semiUrgentNonUrgentP95Minutes: number | null
    }
}

export interface ApiResponse {
    lastUpdated: string
    waitTimes: TransformedHospitalData[]
}

// ===================================================================================
// SECTION 3: CLIENT-SIDE ENRICHED DATA TYPES (No changes here)
// The `EnrichedHospitalData` still extends `Hospital`, so it automatically
// inherits the improved `region: Region` and `cluster: Cluster` types.
// ===================================================================================

export interface EnrichedHospitalData extends Hospital {
    slug: HospitalAcronym
    criticalManagementStatus: ManagementStatus
    emergencyManagementStatus: ManagementStatus
    waitTimes: TransformedHospitalData["waitTimes"]
}

export interface EnrichedApiResponse {
    lastUpdated: string
    waitTimes: EnrichedHospitalData[]
}
