/**
 * Offline migration helpers — used only by scripts under scripts/alternatives/.
 * Not imported by the Next.js app.
 */
import { customFacility } from "@/lib/alternatives/catalog"
import { OPEN_PUBLIC } from "@/lib/alternatives/resolve"
import { i18n } from "@/lib/i18n"
import type {
    AlternativeCategory,
    FacilityTag,
    LabeledContact,
    PhysicalAlternative,
    ServiceChannel,
    SourceReference,
    TelehealthAlternative,
} from "@/types/alternatives"

interface LegacyName {
    en: string
    zh: string | null
}

export interface LegacyPhysical {
    slug: string
    name: LegacyName
    type: string
    district: string
    address: LegacyName
    coordinates: { latitude: number; longitude: number }
    phone: string | null
    url: string | null
    referringUrls?: string[]
    facilities: string[]
    baseConsultationFee: string | null
    additionalInfo: string | null
    operationHours?: Record<string, string>
}

export interface LegacyTelehealth {
    slug: string
    name: LegacyName
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
    referringUrls?: string[]
    features: string[]
}

function legacyName(name: LegacyName) {
    return i18n(name.en, name.zh ?? name.en)
}

function legacyAddress(address: LegacyName) {
    return i18n(address.en, address.zh ?? address.en)
}

function parsePhones(phone: string | null): LabeledContact[] {
    if (!phone) return []
    return phone.split(/\s*\/\s*/).map((part) => {
        const match = part.match(/^([\d\s]+)\s*\((.+)\)\s*$/)
        if (match) {
            return {
                kind: "phone" as const,
                value: match[1].trim(),
                label: i18n(match[2].trim(), match[2].trim()),
            }
        }
        return { kind: "phone" as const, value: part.trim() }
    })
}

function legacyContacts(phone: string | null, url: string | null): LabeledContact[] {
    const contacts = parsePhones(phone)
    if (url) {
        contacts.push({
            kind: "url",
            value: url,
            label: i18n("Official site", "官網"),
        })
    }
    return contacts
}

function legacySources(urls?: string[]): SourceReference[] | undefined {
    if (!urls?.length) return undefined
    return urls.map((url) => ({ url }))
}

function legacyFacilities(names: string[]): FacilityTag[] {
    return names.map((n) => customFacility(n, n))
}

function prosePricing(feeText: string | null, labelEn = "Consultation") {
    return {
        tiers: [
            {
                id: "default",
                label: i18n(labelEn, "診症"),
                consultation: "variable" as const,
                appliesWhen: [{ type: "default" as const }],
                ...(feeText ? { notes: i18n(feeText, feeText) } : {}),
            },
        ],
    }
}

function channelFromHoursKey(
    key: string,
    hoursText: string,
    feeText: string | null,
    channelType: "in_person" | "video",
    primary: boolean
): ServiceChannel {
    const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())

    const isAppointmentOnly = /appointment only|by appointment/i.test(hoursText)

    return {
        id: key,
        name: i18n(label, label),
        channelType,
        primary,
        schedule: isAppointmentOnly
            ? {
                  kind: "appointment_only",
                  notes: i18n(hoursText, hoursText),
              }
            : {
                  kind: "variable",
                  notes: i18n(hoursText, hoursText),
              },
        eligibility: OPEN_PUBLIC,
        pricing: prosePricing(feeText, label),
        booking: isAppointmentOnly ? { appointmentRequired: true, walkIn: false } : { walkIn: true },
    }
}

function buildPhysicalChannels(legacy: LegacyPhysical, category: AlternativeCategory): ServiceChannel[] {
    if (category === "24hour") {
        return [
            {
                id: "24h_opd",
                name: i18n("24-hour outpatient", "24小時門診"),
                channelType: "in_person",
                primary: true,
                schedule: { kind: "always_open" },
                eligibility: OPEN_PUBLIC,
                booking: { walkIn: true },
                pricing: prosePricing(legacy.baseConsultationFee),
            },
        ]
    }

    const hours = legacy.operationHours
    if (hours && Object.keys(hours).length > 0) {
        return Object.entries(hours).map(([key, value], index) =>
            channelFromHoursKey(key, value, legacy.baseConsultationFee, "in_person", index === 0)
        )
    }

    return [
        {
            id: "general_opd",
            name: i18n("General outpatient", "普通科門診"),
            channelType: "in_person",
            primary: true,
            schedule: {
                kind: "variable",
                notes: i18n("Contact facility for current hours.", "請向機構查詢服務時間。"),
            },
            eligibility: OPEN_PUBLIC,
            pricing: prosePricing(legacy.baseConsultationFee),
        },
    ]
}

export function migratePhysical(legacy: LegacyPhysical, category: "24hour" | "non24hour"): PhysicalAlternative {
    return {
        slug: legacy.slug,
        category,
        name: legacyName(legacy.name),
        providerType: legacy.type,
        location: {
            district: legacy.district,
            address: legacyAddress(legacy.address),
            coordinates: legacy.coordinates,
        },
        contacts: legacyContacts(legacy.phone, legacy.url),
        channels: buildPhysicalChannels(legacy, category),
        facilities: legacyFacilities(legacy.facilities),
        ...(legacy.additionalInfo
            ? { additionalInfo: i18n(legacy.additionalInfo, legacy.additionalInfo) }
            : {}),
        sourceUrls: legacySources(legacy.referringUrls),
    }
}

export function migrateTelehealth(legacy: LegacyTelehealth): TelehealthAlternative {
    const contacts: LabeledContact[] = []
    if (legacy.urls.website) {
        contacts.push({
            kind: "url",
            value: legacy.urls.website,
            label: i18n("Website", "網站"),
        })
    }
    if (legacy.urls.ios) {
        contacts.push({
            kind: "app_ios",
            value: legacy.urls.ios,
            label: i18n("iOS app", "iOS 應用程式"),
        })
    }
    if (legacy.urls.android) {
        contacts.push({
            kind: "app_android",
            value: legacy.urls.android,
            label: i18n("Android app", "Android 應用程式"),
        })
    }

    const pricingNotes = [
        legacy.pricing.baseConsultation,
        legacy.pricing.medicationDeliveryFee
            ? `Delivery: ${legacy.pricing.medicationDeliveryFee}`
            : null,
        legacy.pricing.notes,
    ]
        .filter(Boolean)
        .join(" ")

    const channel: ServiceChannel = {
        id: "video_gp",
        name: i18n("Video consultation", "視像診症"),
        channelType: "video",
        primary: true,
        schedule: legacy.operatingHours
            ? { kind: "variable", notes: i18n(legacy.operatingHours, legacy.operatingHours) }
            : {
                  kind: "variable",
                  notes: i18n("See provider for hours.", "請向服務供應商查詢時間。"),
              },
        eligibility: OPEN_PUBLIC,
        pricing: prosePricing(pricingNotes || null),
    }

    if (/members only|eligible.*member|employee benefits|existing ha/i.test(pricingNotes)) {
        if (/bupa/i.test(pricingNotes)) {
            channel.eligibility = [
                {
                    audience: "insurance_member",
                    insurers: ["bupa"],
                    summary: i18n("Bupa members only", "只限保柏會員"),
                },
            ]
        } else if (/axa|employee benefits/i.test(pricingNotes)) {
            channel.eligibility = [
                {
                    audience: "employer_group",
                    insurers: ["axa"],
                    summary: i18n("AXA Employee Benefits only", "只限AXA僱員福利"),
                },
            ]
        } else if (/cigna/i.test(pricingNotes)) {
            channel.eligibility = [
                {
                    audience: "insurance_member",
                    insurers: ["cigna"],
                    summary: i18n("Cigna members / subscribers", "信諾會員／訂戶"),
                },
            ]
        } else if (/existing ha|ha patient/i.test(pricingNotes)) {
            channel.eligibility = [
                {
                    audience: "existing_patient",
                    summary: i18n("Existing HA patients", "現有醫管局病人"),
                },
            ]
        }
    }

    return {
        slug: legacy.slug,
        category: "telehealth",
        name: legacyName(legacy.name),
        providerType: legacy.providerType,
        description: i18n(legacy.description.en, legacy.description.zh),
        contacts,
        channels: [channel],
        features: legacy.features.map((f) => customFacility(f, f)),
        delivery: legacy.deliverySpeed
            ? { speed: i18n(legacy.deliverySpeed, legacy.deliverySpeed) }
            : undefined,
        sourceUrls: legacySources(legacy.referringUrls),
    }
}
