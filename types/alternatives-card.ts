import type { Coordinates, LocalizedString } from "@/types"
import type {
    AlternativeCategory,
    EligibilityAudience,
    PaymentVoucherId,
} from "@/types/alternatives"
import type { OpenStatusKind } from "@/lib/alternatives/resolve"

export type AlternativeCardStatusTone = "open" | "warning" | "muted" | "neutral"

export interface AlternativeCardStatusDisplay {
    label: LocalizedString
    tone: AlternativeCardStatusTone
}

export interface AlternativeCardFooterModel {
    eligibility: { audience: EligibilityAudience; summary: LocalizedString }[]
    voucherIds: PaymentVoucherId[]
}

/** Fields used for future client-side catalog filters (open now, walk-in, max price). */
export interface AlternativeCardFilterMeta {
    walkInAllowed: boolean
    acceptsHcvs: boolean
    sortPriceHkd: number | null
    openKind: OpenStatusKind
}

export interface AlternativeCardModel {
    slug: string
    category: AlternativeCategory
    name: LocalizedString
    providerType: string
    locationLabel: string
    coordinates?: Coordinates
    isPhysical: boolean
    statusDisplay: AlternativeCardStatusDisplay | null
    unknownStatusLabel?: LocalizedString
    price: {
        primary: LocalizedString
        upcoming?: LocalizedString
    }
    footer?: AlternativeCardFooterModel
    filterMeta: AlternativeCardFilterMeta
}
