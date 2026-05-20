import type { Coordinates, LocalizedString } from "./index"

// =============================================================================
// Shared primitives
// =============================================================================

export type AlternativeCategory = "24hour" | "non24hour" | "telehealth"

export const ALTERNATIVE_CATEGORIES: AlternativeCategory[] = [
    "24hour",
    "non24hour",
    "telehealth",
]

export function parseAlternativeCategory(value: string | undefined): AlternativeCategory {
    if (value && ALTERNATIVE_CATEGORIES.includes(value as AlternativeCategory)) {
        return value as AlternativeCategory
    }
    return "24hour"
}

export type ContactKind =
    | "phone"
    | "url"
    | "app_ios"
    | "app_android"
    | "whatsapp"
    | "email"

export interface LabeledContact {
    kind: ContactKind
    /** Phone/WhatsApp/email: plain string. URLs may use `i18n()` for en/tc/sc paths. */
    value: string | LocalizedString
    label?: LocalizedString
}

export interface SourceReference {
    /** Official page URLs — use `i18n(enUrl, tcUrl, scUrl)` when the provider has locale paths. */
    url: string | LocalizedString
    label?: string | LocalizedString
    retrievedAt?: string
}

export type EligibilityAudience =
    | "open"
    | "hk_resident_eligible"
    | "hk_resident_non_eligible"
    | "existing_patient"
    | "insurance_member"
    | "employer_group"
    | "subscription"

export type InsurerId = "bupa" | "cigna" | "axa" | "other"

export interface EligibilityRule {
    audience: EligibilityAudience
    insurers?: InsurerId[]
    summary: LocalizedString
    details?: LocalizedString
}

/** Government or scheme vouchers accepted for payment (expand catalog over time). */
export type PaymentVoucherId = "hcvs"

export interface AcceptedPaymentVoucher {
    id: PaymentVoucherId
    /** Override catalog summary when provider-specific wording is needed. */
    summary?: LocalizedString
    details?: LocalizedString
    url?: string
}

/** 0 = Sunday … 6 = Saturday (matches JavaScript Date#getDay in HK-local interpretation). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface TimeRange {
    start: string
    end: string
}

export interface WeeklyRule {
    days: DayOfWeek[]
    ranges: TimeRange[]
    registrationClose?: string
}

export type Schedule =
    | { kind: "always_open" }
    | {
          kind: "weekly"
          timezone: "Asia/Hong_Kong"
          rules: WeeklyRule[]
          notes?: LocalizedString
      }
    | { kind: "appointment_only"; notes?: LocalizedString }
    | { kind: "variable"; notes: LocalizedString }
    | { kind: "external"; notes: LocalizedString }

export interface ScheduleContext {
    at: Date
    isPublicHoliday?: boolean
}

export type ViewerEligibility = EligibilityAudience

export interface Money {
    currency: "HKD"
    amount: number
    amountMax?: number
}

export type ConsultationPrice = Money | "variable" | "member_covered"

export type PriceTierKind = "day" | "night" | "weekend" | "urgent_care"

export type PriceAppliesWhen =
    | { type: "default" }
    | { type: "days"; days: DayOfWeek[] }
    | { type: "time"; ranges: TimeRange[]; days?: DayOfWeek[] }
    | { type: "public_holiday" }
    | { type: "tier"; tier: PriceTierKind }

export interface FeeTier {
    id: string
    label: LocalizedString
    consultation: ConsultationPrice
    /** Overrides how the card displays a numeric consultation price. */
    displayAs?: "from" | "exact" | "range"
    appliesWhen: PriceAppliesWhen[]
    eligibility?: EligibilityRule[]
    excludes?: LocalizedString[]
    includes?: LocalizedString[]
    notes?: LocalizedString
}

export interface Pricing {
    tiers: FeeTier[]
    displayNotes?: LocalizedString
}

export type FacilityId =
    | "xray"
    | "pharmacy"
    | "laboratory"
    | "ecg"
    | "ct_scanner"
    | "mri"
    | "ultrasound"
    | "endoscopy"
    | "physiotherapy"
    | "dietetics"
    | "gp_consultation"
    | "chronic_disease"
    | "nursing"
    | "patient_education"
    | "resuscitation"
    | "observation_beds"

export type FacilityTag = { id: FacilityId } | { custom: LocalizedString }

export type FeatureTag = FacilityTag

export type UrgencyLevel =
    | "emergency_capable"
    | "urgent_care"
    | "primary_care"
    | "follow_up_only"

export interface AlternativeScope {
    hasAe?: boolean
    transferToPublicAe?: boolean
    urgencyLevel?: UrgencyLevel
    summary?: LocalizedString
}

export type ChannelType = "in_person" | "video" | "phone"

export interface ServiceChannel {
    id: string
    name: LocalizedString
    channelType: ChannelType
    schedule: Schedule
    pricing: Pricing
    eligibility: EligibilityRule[]
    booking?: {
        walkIn?: boolean
        appointmentRequired?: boolean
        methods?: LocalizedString
    }
    primary?: boolean
}

export interface TelehealthDelivery {
    speed?: LocalizedString
    medicationDelivery?: Money | "included" | "variable"
    notes?: LocalizedString
}

interface AlternativeBase {
    slug: string
    category: AlternativeCategory
    name: LocalizedString
    providerType: string
    description?: LocalizedString
    contacts: LabeledContact[]
    channels: ServiceChannel[]
    facilities?: FacilityTag[]
    features?: FeatureTag[]
    scope?: AlternativeScope
    sourceUrls?: SourceReference[]
    acceptedVouchers?: AcceptedPaymentVoucher[]
    lastUpdated?: string
    additionalInfo?: LocalizedString
}

export interface PhysicalAlternative extends AlternativeBase {
    category: "24hour" | "non24hour"
    location: {
        district: string
        address: LocalizedString
        coordinates: Coordinates
    }
}

export interface TelehealthAlternative extends AlternativeBase {
    category: "telehealth"
    delivery?: TelehealthDelivery
}

export type Alternative = PhysicalAlternative | TelehealthAlternative

export function isPhysicalAlternative(alt: Alternative): alt is PhysicalAlternative {
    return alt.category === "24hour" || alt.category === "non24hour"
}

export function isTelehealthAlternative(alt: Alternative): alt is TelehealthAlternative {
    return alt.category === "telehealth"
}
