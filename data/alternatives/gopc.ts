import { facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { LabeledContact, PhysicalAlternative } from "@/types/alternatives"
import {
    districtFromAddress,
    fmcDisplayNameEn,
    fmcInstitutionToSlug,
    formatFmcBookingMethods,
    formatFmcScheduleNotes,
    HA_FMC_CHARGES,
    HA_FMC_DIRECTORY_PAGE,
    HA_FMC_OPENDATA_URL,
    type FmcScrapedDetail,
    type HaFmcFacilityRow,
} from "@/data/ha"
import { ELIGIBLE_GOPC, FMC_PRICING_DISPLAY_NOTES, fmcFeeTiers, NON_ELIGIBLE_GOPC } from "./shared"

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

export interface CreateFmcEntryOptions {
    /** Override auto-derived slug (e.g. preserve legacy `gopc-*`). */
    slug?: string
    /** Scraped clinic phones and hours (English from HA pages). */
    scraped?: FmcScrapedDetail
    phone?: string | null
    scheduleNotes?: string
    additionalInfo?: string
    lastUpdated?: string
}

const DEFAULT_SCHEDULE_NOTES = i18n(
    "Hours vary by clinic — confirm registration and consultation times on the HA site. Appointment required; walk-in not accepted.",
    "各診所時間不同，請於醫管局網站確認掛號及診症時間。須預約，不接受即到。",
    "各诊所时间不同，请于医管局网站确认挂号及诊症时间。须预约，不接受即到。"
)

function buildContacts(
    row: HaFmcFacilityRow,
    options: CreateFmcEntryOptions
): LabeledContact[] {
    const contacts: LabeledContact[] = []

    if (options.scraped) {
        for (const value of options.scraped.contacts.clinic) {
            contacts.push({
                kind: "phone",
                value,
                label: i18n("Clinic", "診所", "诊所"),
            })
        }
        for (const value of options.scraped.contacts.booking) {
            contacts.push({
                kind: "phone",
                value,
                label: i18n("Appointment booking", "預約掛號", "预约挂号"),
            })
        }
    } else if (options.phone) {
        contacts.push({
            kind: "phone",
            value: options.phone,
            label: i18n("Clinic", "診所", "诊所"),
        })
    }

    contacts.push({
        kind: "url",
        value: HA_FMC_DIRECTORY_PAGE,
        label: i18n("HA clinic directory", "醫管局診所名錄", "医管局诊所名录"),
    })

    return contacts
}

/** Build an HA Family Medicine Clinic entry from opendata row. */
export function createFmcEntry(
    row: HaFmcFacilityRow,
    options: CreateFmcEntryOptions = {}
): PhysicalAlternative {
    const slug = options.slug ?? fmcInstitutionToSlug(row.institution_eng)

    const scheduleNotes = options.scraped
        ? formatFmcScheduleNotes(options.scraped)
        : options.scheduleNotes
          ? i18n(options.scheduleNotes, options.scheduleNotes)
          : DEFAULT_SCHEDULE_NOTES

    const bookingMethods = options.scraped
        ? formatFmcBookingMethods(options.scraped)
        : i18n(
              "HA telephone booking or HA Go app",
              "醫管局電話預約或HA Go",
              "医管局电话预约或HA Go"
          )

    return {
        slug,
        category: "non24hour",
        name: i18n(fmcDisplayNameEn(row.institution_eng), row.institution_tc, row.institution_sc),
        providerType: "Public Clinic",
        description: i18n(
            `Hospital Authority Family Medicine Clinic (${row.cluster_eng}). Appointment required.`,
            `醫管局家庭醫學診所（${row.cluster_tc}）。須預約。`,
            `医管局家庭医学诊所（${row.cluster_sc}）。须预约。`
        ),
        location: {
            district: districtFromAddress(row.address_eng),
            address: i18n(row.address_eng, row.address_tc, row.address_sc),
            coordinates: { latitude: row.latitude, longitude: row.longitude },
        },
        contacts: buildContacts(row, options),
        channels: [
            {
                id: "general_opd",
                name: i18n("Family medicine clinic", "家庭醫學診所", "家庭医学诊所"),
                channelType: "in_person",
                primary: true,
                schedule: {
                    kind: "appointment_only",
                    notes: scheduleNotes,
                },
                eligibility: [ELIGIBLE_GOPC, NON_ELIGIBLE_GOPC],
                booking: {
                    appointmentRequired: true,
                    walkIn: false,
                    methods: bookingMethods,
                },
                pricing: {
                    tiers: fmcFeeTiers(),
                    displayNotes: FMC_PRICING_DISPLAY_NOTES,
                },
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
                "Non-urgent primary care. Appointment required — not for emergencies.",
                "非緊急基層醫療，須預約，不適用於急症。"
            ),
        },
        ...(options.additionalInfo
            ? { additionalInfo: i18n(options.additionalInfo, options.additionalInfo) }
            : {}),
        sourceUrls: [
            { url: HA_FMC_DIRECTORY_PAGE, label: i18n("HA Family Medicine Clinics", "醫管局家庭醫學診所") },
            {
                url: HA_FMC_CHARGES.sourceUrls[0].url,
                label: i18n("Official HA charges", "醫管局官方收費"),
            },
        ],
        lastUpdated: options.lastUpdated ?? "2026-05-21",
    }
}

/** @deprecated Use `createFmcEntry` with opendata — legacy archive row adapter. */
export function createGopcEntry(row: GopcLegacyRow): PhysicalAlternative {
    const fmcRow: HaFmcFacilityRow = {
        cluster_eng: "",
        institution_eng: row.name.en.replace(/ \(HA\)$/, "").replace(/ GOPC \(HA\)$/, " Family Medicine Clinic"),
        address_eng: row.address.en,
        cluster_tc: "",
        institution_tc: row.name.zh ?? row.name.en,
        address_tc: row.address.zh ?? row.address.en,
        cluster_sc: "",
        institution_sc: row.name.zh ?? row.name.en,
        address_sc: row.address.zh ?? row.address.en,
        latitude: row.coordinates.latitude,
        longitude: row.coordinates.longitude,
    }

    const hoursText =
        row.operationHours?.general_outpatient ?? row.operationHours?.general ?? undefined

    return createFmcEntry(fmcRow, {
        slug: row.slug,
        phone: row.phone,
        scheduleNotes: hoursText,
        additionalInfo: row.additionalInfo ?? undefined,
    })
}

export { HA_FMC_OPENDATA_URL }
