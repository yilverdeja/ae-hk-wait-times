import type { LocalizedString } from "@/types"

export interface NearbyAlternativePreview {
    slug: string
    name: LocalizedString
    distanceKm: number
    priceLabel: LocalizedString
}
