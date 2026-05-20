/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const TWAH_URGENT_CARE_PAGE = i18n(
    "https://www.twah.org.hk/en/specialist-clinics/24-hours-urgent-care-center",
    "https://www.twah.org.hk/tc/specialist-clinics/24-hours-urgent-care-center",
    "https://www.twah.org.hk/sc/specialist-clinics/24-hours-urgent-care-center"
)

const WEEKDAYS: DayOfWeek[] = [1, 2, 3, 4, 5]
const SATURDAY: DayOfWeek[] = [6]
const SUNDAY: DayOfWeek[] = [0]

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
        excludes: EXCLUDES_CONSULTATION_STANDARD,
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
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

/** Urgent care center — time-of-day rates (primary 24-hour service). */
const urgentCareTiers: FeeTier[] = [
    // Mon–Fri (not public holiday)
    outpatientTier("uc_mf_day", "Mon–Fri day", "周一至五日間", 480, WEEKDAYS, "08:00", "20:00"),
    outpatientTier("uc_mf_evening", "Mon–Fri evening", "周一至五晚上", 800, WEEKDAYS, "20:00", "24:00"),
    outpatientTier("uc_mf_overnight", "Mon–Fri overnight", "周一至五深夜", 950, WEEKDAYS, "00:00", "08:00"),
    // Saturday
    outpatientTier("uc_sat_day", "Sat daytime–night", "周六日間至晚上", 800, SATURDAY, "08:00", "24:00"),
    outpatientTier("uc_sat_overnight", "Sat overnight", "周六深夜", 950, SATURDAY, "00:00", "08:00"),
    // Sunday
    outpatientTier("uc_sun_day", "Sun daytime–night", "週日日間至晚上", 800, SUNDAY, "08:00", "24:00"),
    outpatientTier("uc_sun_overnight", "Sun overnight", "週日深夜", 950, SUNDAY, "00:00", "08:00"),
    // Public holidays
    publicHolidayTier("uc_ph_day", "Public holiday daytime–night", "公眾假期日間至晚上", 800, "08:00", "24:00"),
    publicHolidayTier("uc_ph_overnight", "Public holiday overnight", "公眾假期深夜", 950, "00:00", "08:00"),
]

function generalTier(
    id: string,
    labelEn: string,
    labelZh: string,
    days: DayOfWeek[],
    start: string,
    end: string
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount: 270 },
        appliesWhen: [
            { type: "not_public_holiday" },
            { type: "days", days },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

/** General outpatient — not 24h; excludes Sat & hospital holidays per hospital fee table. */
const generalOutpatientTiers: FeeTier[] = [
    generalTier("gen_mthur", "Mon–Thu (general)", "周一至四（一般門診）", [1, 2, 3, 4], "09:00", "20:31"),
    generalTier("gen_fri", "Fri (general)", "週五（一般門診）", [5], "09:00", "17:01"),
    generalTier("gen_sun", "Sun (general)", "週日（一般門診）", [0], "09:00", "16:31"),
]

export const adventistHospitalTsuenWan: PhysicalAlternative = {
    slug: "adventist-hospital-tsuen-wan",
    category: "24hour",
    name: i18n("Hong Kong Adventist Hospital – Tsuen Wan", "香港港安醫院－荃灣"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour urgent care center in New Territories West with emergency medicine specialists. Separate general outpatient sessions (lower fee) on selected days and times — see services below.",
        "新界西24小時急症中心，由急症科專科醫生當值。另設一般門診時段（較低診金），見下方服務。"
    ),
    location: {
        district: "Tsuen Wan",
        address: i18n(
            "G/F, Main Tower, Hong Kong Adventist Hospital – Tsuen Wan, 199 Tsuen King Circuit, Tsuen Wan, N.T., Hong Kong",
            "新界荃灣荃景圍199號香港港安醫院－荃灣主座地下"
        ),
        coordinates: { latitude: 22.3650054, longitude: 114.1157163 },
    },
    contacts: [
        {
            kind: "phone",
            value: "2275 6888",
            label: i18n("Hospital / urgent care", "醫院／急症中心"),
        },
        {
            kind: "url",
            value: TWAH_URGENT_CARE_PAGE,
            label: i18n(
                "24-hour urgent care center",
                "24小時急症中心",
                "24小时急症中心"
            ),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/Hong+Kong+Adventist+Hospital/@22.3650054,114.1157163",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "urgent_care",
            name: i18n("24-hour urgent care center", "24小時急症中心"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: urgentCareTiers,
                displayNotes: i18n(
                    "Urgent care center consultation fees only; excludes medication, tests, and supplies. Schedule effective 18 May 2026 (subject to the latest hospital fee list).",
                    "只包括急症中心診症診金，不含藥物、化驗及醫療用品。收費表生效日期為2026年5月18日（以醫院最新公布為準）。"
                ),
            },
        },
        {
            id: "general_opd",
            name: i18n("General outpatient", "一般門診"),
            channelType: "in_person",
            primary: false,
            schedule: {
                kind: "weekly",
                timezone: "Asia/Hong_Kong",
                closedOnPublicHolidays: true,
                rules: [
                    { days: [1, 2, 3, 4], ranges: [{ start: "09:00", end: "20:31" }] },
                    { days: [5], ranges: [{ start: "09:00", end: "17:01" }] },
                    { days: [0], ranges: [{ start: "09:00", end: "16:31" }] },
                ],
                notes: i18n(
                    "Excludes Saturdays and hospital holidays. Outside these hours, use the 24-hour urgent care center (see fees above).",
                    "不包括周六及醫院假期；其餘時間請使用24小時急症中心（見上方收費）。"
                ),
            },
            eligibility: OPEN_PUBLIC,
                booking: {
                walkIn: true,
                methods: i18n("Walk-in or contact the hospital to book", "即時或向醫院查詢預約"),
            },
            pricing: {
                tiers: generalOutpatientTiers,
                displayNotes: i18n(
                    "General outpatient consultation only; excludes Saturdays and hospital holidays. Mon–Thu 09:00–20:30, Fri 09:00–17:00, Sun 09:00–16:30 (fee table 18 May 2026).",
                    "只包括一般門診診金；不包括周六及醫院假期。周一至四09:00–20:30、周五09:00–17:00、周日09:00–16:30（2026年5月18日收費表）。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility("Emergency resuscitation equipment", "急救復甦設備"),
        customFacility("Triage station", "分流站"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24-hour urgent care with emergency medicine specialists; general outpatient at scheduled hours.",
            "24小時急症中心連急症科專科；另設指定時段一般門診。"
        ),
    },
    additionalInfo: i18n(
        "Nurses perform triage on arrival. Resident family medicine with specialist backup. Fee table distinguishes the urgent care center from limited-hours general outpatient.",
        "到院後由護士分流；院內設駐院家庭醫學及專科後援。收費表區分24小時急症中心與指定時段的一般門診。"
    ),
    sourceUrls: [
        {
            url: TWAH_URGENT_CARE_PAGE,
            label: i18n(
                "Official 24-hour urgent care center",
                "官方24小時急症中心",
                "官方24小时急症中心"
            ),
        },
    ],
    lastUpdated: "2026-05-20",
}
