import facilitiesData24Hour from "@/data/misc/24HourFacilities.json"
import facilitiesDataNon24Hour from "@/data/misc/Non24HourFacilities.json"
import telehealthData from "@/data/misc/TelehealthServices.json"
import type { Coordinates } from "@/types"

export type AlternativeCategory = "24hour" | "non24hour" | "telehealth"

export interface LocalizedText {
    en: string
    zh: string | null
}

export interface PhysicalFacility {
    slug: string
    category: "24hour" | "non24hour"
    name: LocalizedText
    type: string
    district: string
    address: LocalizedText
    coordinates: Coordinates
    phone: string | null
    url: string | null
    facilities: string[]
    baseConsultationFee: string | null
    additionalInfo: string | null
    operationHours?: Record<string, string>
}

export interface TelehealthFacility {
    slug: string
    category: "telehealth"
    name: LocalizedText
    providerType: string
    operatingHours: string | null
    description: { en: string; zh: string }
    pricing: {
        baseConsultation: string | null
        medicationDeliveryFee: string | null
        notes: string | null
    }
    deliverySpeed: string | null
    urls: {
        website: string | null
        ios: string | null
        android: string | null
    }
    features: string[]
}

export type AlternativeEntry = PhysicalFacility | TelehealthFacility

export function isPhysicalFacility(entry: AlternativeEntry): entry is PhysicalFacility {
    return entry.category === "24hour" || entry.category === "non24hour"
}

export function isTelehealthFacility(entry: AlternativeEntry): entry is TelehealthFacility {
    return entry.category === "telehealth"
}

type RawPhysical = Omit<PhysicalFacility, "category">
type RawTelehealth = Omit<TelehealthFacility, "category">

const facilities24Hour: PhysicalFacility[] = (facilitiesData24Hour as unknown as RawPhysical[]).map(
    (f) => ({ ...f, category: "24hour" as const })
)

const facilitiesNon24Hour: PhysicalFacility[] = (facilitiesDataNon24Hour as unknown as RawPhysical[]).map(
    (f) => ({ ...f, category: "non24hour" as const })
)

const facilitiesTelehealth: TelehealthFacility[] = (telehealthData as unknown as RawTelehealth[]).map(
    (f) => ({ ...f, category: "telehealth" as const })
)

export const alternatives: AlternativeEntry[] = [
    ...facilities24Hour,
    ...facilitiesNon24Hour,
    ...facilitiesTelehealth,
]

export const alternativesBySlug: Record<string, AlternativeEntry> = Object.fromEntries(
    alternatives.map((entry) => [entry.slug, entry])
)

export const alternatives24Hour: PhysicalFacility[] = facilities24Hour

export function getSlugs(): string[] {
    return alternatives.map((e) => e.slug)
}
