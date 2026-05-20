import { facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { PhysicalAlternative } from "@/types/alternatives"
import { ELIGIBLE_GOPC, gopcFeeTiers, NON_ELIGIBLE_GOPC, OPEN_PUBLIC } from "./shared"

export interface GopcLegacyRow {
    slug: string
    name: { en: string; zh: string | null }
    district: string
    address: { en: string; zh: string | null }
    coordinates: { latitude: number; longitude: number }
    phone: string | null
    url: string | null
    referringUrls?: string[]
    operationHours?: Record<string, string>
    additionalInfo?: string | null
}

const DEFAULT_HOURS_EN =
    "Mon–Fri 09:00–13:00, 14:00–17:30 (Sat varies). Appointment required via HA GOPC booking (08:00) or HA Go. Closed Sun and most public holidays."

/** Build a GOPC clinic entry from archive row data (shared structure, per-clinic overrides). */
export function createGopcEntry(row: GopcLegacyRow): PhysicalAlternative {
    const hoursText =
        row.operationHours?.general_outpatient ?? row.operationHours?.general ?? DEFAULT_HOURS_EN

    return {
        slug: row.slug,
        category: "non24hour",
        name: i18n(row.name.en, row.name.zh ?? row.name.en),
        providerType: "Public Clinic",
        location: {
            district: row.district,
            address: i18n(row.address.en, row.address.zh ?? row.address.en),
            coordinates: row.coordinates,
        },
        contacts: [
            ...(row.phone ? [{ kind: "phone" as const, value: row.phone }] : []),
            ...(row.url
                ? [
                      {
                          kind: "url" as const,
                          value: row.url,
                          label: i18n("HA clinic page", "醫管局網頁"),
                      },
                  ]
                : []),
        ],
        channels: [
            {
                id: "general_opd",
                name: i18n("General outpatient (GOPC)", "普通科門診"),
                channelType: "in_person",
                primary: true,
                schedule: {
                    kind: "appointment_only",
                    notes: i18n(hoursText, hoursText),
                },
                eligibility: [ELIGIBLE_GOPC, NON_ELIGIBLE_GOPC],
                booking: {
                    appointmentRequired: true,
                    walkIn: false,
                    methods: i18n(
                        "HA GOPC telephone booking or HA Go app",
                        "醫管局門診電話預約或HA Go"
                    ),
                },
                pricing: { tiers: gopcFeeTiers() },
            },
        ],
        facilities: [
            facility("gp_consultation"),
            facility("chronic_disease"),
            facility("pharmacy"),
            facility("nursing"),
            facility("patient_education"),
        ],
        scope: {
            urgencyLevel: "primary_care",
            summary: i18n(
                "For non-urgent conditions. Appointment required; not for emergencies.",
                "適用於非緊急情況，須預約，不適用於急症。"
            ),
        },
        ...(row.additionalInfo
            ? { additionalInfo: i18n(row.additionalInfo, row.additionalInfo) }
            : {}),
        sourceUrls: row.referringUrls?.map((url) => ({ url })),
        lastUpdated: "2026-05-01",
    }
}
