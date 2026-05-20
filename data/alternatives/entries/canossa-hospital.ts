/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { LocalizedString } from "@/types"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_DRUGS_LABS, OPEN_PUBLIC } from "../shared"

const WEEKDAYS: DayOfWeek[] = [1, 2, 3, 4, 5]
const SATURDAY: DayOfWeek[] = [6]
const SUNDAY: DayOfWeek[] = [0]

const EXCLUDES_CANOSSA_CONSULTATION: LocalizedString[] = [
    ...EXCLUDES_DRUGS_LABS,
    i18n("Other special treatments", "其他特殊治療"),
]

function outpatientTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    days: DayOfWeek[],
    start: string,
    end: string
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount },
        appliesWhen: [
            { type: "days", days },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CANOSSA_CONSULTATION,
    }
}

function publicHolidayTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    start: string,
    end: string
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount },
        appliesWhen: [
            { type: "public_holiday" },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CANOSSA_CONSULTATION,
    }
}

const canossaOutpatientTiers: FeeTier[] = [
    // Mon–Fri (not public holiday)
    outpatientTier("mf_day", "Mon–Fri day", "周一至五日間", 388, WEEKDAYS, "08:00", "18:00"),
    outpatientTier("mf_evening", "Mon–Fri evening", "周一至五晚間", 500, WEEKDAYS, "18:00", "24:00"),
    outpatientTier("mf_overnight", "Mon–Fri overnight", "周一至五深夜", 800, WEEKDAYS, "00:00", "08:00"),
    // Saturday (not public holiday)
    outpatientTier("sat_morning", "Sat morning", "週六上午", 388, SATURDAY, "08:00", "13:00"),
    outpatientTier("sat_afternoon", "Sat afternoon–night", "週六下午至晚上", 500, SATURDAY, "13:00", "24:00"),
    outpatientTier("sat_overnight", "Sat overnight", "週六深夜", 800, SATURDAY, "00:00", "08:00"),
    // Sunday
    outpatientTier("sun_day", "Sun day–night", "週日日間至晚上", 500, SUNDAY, "08:00", "24:00"),
    outpatientTier("sun_overnight", "Sun overnight", "週日深夜", 800, SUNDAY, "00:00", "08:00"),
    // Public holidays (same rates as Sunday)
    publicHolidayTier("ph_day", "Public holiday day–night", "公眾假期日間至晚上", 500, "08:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期深夜", 800, "00:00", "08:00"),
]

const CANOSSA_OPD_PAGE = i18n(
    "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/",
    "https://www.canossahospital.org.hk/tc/service/24_hours_out_patient_services/",
    "https://www.canossahospital.org.hk/sc/service/24_hours_out_patient_services/"
)

const CANOSSA_FEES_PAGE = i18n(
    "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/fees_and_charges",
    "https://www.canossahospital.org.hk/tc/service/24_hours_out_patient_services/fees_and_charges",
    "https://www.canossahospital.org.hk/sc/service/24_hours_out_patient_services/fees_and_charges"
)

export const canossaHospital: PhysicalAlternative = {
    slug: "canossa-hospital",
    category: "24hour",
    name: i18n("Canossa Hospital (Caritas)", "嘉諾撒醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour outpatient by resident medical officers. Walk-in and phone appointments accepted. No on-site emergency room — the on-duty doctor will refer patients needing emergency care to a nearby Hospital Authority hospital.",
        "由駐院醫生提供24小時門診服務，接受即時及電話預約。沒有急症室；如需急症服務，當值醫生會安排轉介至附近醫管局醫院。"
    ),
    location: {
        district: "Mid-Levels",
        address: i18n("1 Old Peak Road, Mid-Levels, Hong Kong", "香港舊山頂道一號"),
        coordinates: { latitude: 22.2778, longitude: 114.15 },
    },
    contacts: [
        { kind: "phone", value: "2522 2181", label: i18n("General", "總機") },
        { kind: "phone", value: "2825 5805", label: i18n("24-hour OPD enquiry", "24小時門診查詢") },
        { kind: "whatsapp", value: "52863013", label: i18n("WhatsApp enquiry", "WhatsApp查詢") },
        {
            kind: "url",
            value: CANOSSA_OPD_PAGE,
            label: i18n("24-hour OPD", "24小時門診", "24小时门诊"),
        },
        {
            kind: "url",
            value: CANOSSA_FEES_PAGE,
            label: i18n("Fees & charges", "收費", "收费"),
        },
    ],
    channels: [
        {
            id: "24h_opd",
            name: i18n("24-hour outpatient", "24小時門診"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: {
                walkIn: true,
                methods: i18n(
                    "Walk-in, phone (2825 5805), or WhatsApp (52863013)",
                    "即時、電話（2825 5805）或WhatsApp（52863013）"
                ),
            },
            pricing: {
                tiers: canossaOutpatientTiers,
                displayNotes: i18n(
                    "Outpatient consultation fee only. Excludes drugs, medical supplies, laboratory tests, and other special treatments.",
                    "只包括門診診金，不包括藥物、醫療用品、化驗及其他特殊治療。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        customFacility("Wound Clinic", "傷口護理"),
        facility("endoscopy"),
        facility("physiotherapy"),
        facility("dietetics"),
        customFacility("Child Health Centre", "兒童健康中心"),
        customFacility("Special Care Unit", "特別護理病房"),
    ],
    scope: {
        hasAe: false,
        transferToPublicAe: true,
        urgencyLevel: "urgent_care",
        summary: i18n(
            "No on-site emergency room. The on-duty doctor will arrange referral to a nearby Hospital Authority hospital if emergency care is needed.",
            "沒有急症室；如需急症服務，當值醫生會安排轉介至附近醫管局醫院。"
        ),
    },
    sourceUrls: [
        {
            url: CANOSSA_FEES_PAGE,
            label: i18n("Official fees & charges", "官方收費", "官方收费"),
        },
        {
            url: CANOSSA_OPD_PAGE,
            label: i18n("Official 24-hour OPD", "官方24小時門診", "官方24小时门诊"),
        },
    ],
    lastUpdated: "2026-05-20",
}
