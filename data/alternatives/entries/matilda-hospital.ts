/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const MATILDA_OPD_PAGE = i18n(
    "https://www.matilda.org/en/services-specialities/24-hours-outpatient",
    "https://www.matilda.org/zh-hk/services-specialities/24-hours-outpatient",
    "https://www.matilda.org/zh-cn/services-specialities/24-hours-outpatient"
)

const MATILDA_OPD_FEES_PAGE = i18n(
    "https://www.matilda.org/en/fees-and-packages/hospital-fees?section=24-hour-Outpatient-Care",
    "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees?section=24-hour-Outpatient-Care",
    "https://www.matilda.org/zh-cn/fees-and-packages/hospital-fees?section=24-hour-Outpatient-Care"
)

const WEEKDAYS: DayOfWeek[] = [1, 2, 3, 4, 5]
const MON_SAT: DayOfWeek[] = [1, 2, 3, 4, 5, 6]
const SUNDAY: DayOfWeek[] = [0]

function outpatientTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    days: DayOfWeek[],
    start: string,
    end: string,
    extraWhen?: FeeTier["appliesWhen"]
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount },
        appliesWhen: [
            ...(extraWhen ?? []),
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

function timeOnlyTier(
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
        appliesWhen: [{ type: "time", ranges: [{ start, end }] }],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

/** General practitioner — 24-hour outpatient care consultation bands. */
const gpConsultationTiers: FeeTier[] = [
    timeOnlyTier("gp_overnight", "Any day overnight", "任何日子凌晨", 1000, "00:00", "08:00"),
    timeOnlyTier("gp_evening", "Any day evening", "任何日子晚上", 900, "20:00", "24:00"),
    outpatientTier(
        "gp_monsat_day",
        "Mon–Sat day",
        "周一至六日間",
        590,
        MON_SAT,
        "08:00",
        "20:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier("gp_sun_day", "Sunday day", "週日日間", 800, SUNDAY, "08:00", "20:00"),
    publicHolidayTier("gp_ph_day", "Public holiday day", "公眾假期日間", 800, "08:00", "20:00"),
]

/** Resident paediatrician — separate 24-hour service (higher fees). */
const paediatricConsultationTiers: FeeTier[] = [
    timeOnlyTier("paed_overnight", "Any day overnight", "任何日子凌晨", 3000, "00:00", "08:00"),
    outpatientTier(
        "paed_mf_day",
        "Mon–Fri day",
        "周一至五日間",
        1600,
        WEEKDAYS,
        "08:00",
        "18:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier(
        "paed_mf_evening",
        "Mon–Fri evening",
        "周一至五晚上",
        2000,
        WEEKDAYS,
        "18:00",
        "24:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier(
        "paed_sat_day",
        "Saturday day–night",
        "週六日間至午夜",
        2000,
        [6],
        "08:00",
        "24:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier("paed_sun_day", "Sunday day–night", "週日日間至午夜", 2000, SUNDAY, "08:00", "24:00"),
    publicHolidayTier("paed_ph_day", "Public holiday day–night", "公眾假期日間至午夜", 2000, "08:00", "24:00"),
]

const PROCEDURE_AND_OFF_HOURS_NOTE = i18n(
    "Consultation tiers above are general practitioner or resident paediatrician fees only. During off-hours (Mon–Sat 20:00–07:59 and all day Sun & public holidays), an additional doctor consultation fee may apply per the hospital schedule. Procedures are charged separately (hospital fee + doctor fee where listed), e.g. suturing hospital HK$1,200 / doctor HK$4,500; resuscitation per 30 min hospital HK$8,250 / doctor HK$4,500; minor surgery per 30 min hospital HK$1,650 / doctor HK$4,500 — see official fee list.",
    "以上只包括普通科或駐院兒科醫生診症費。非辦公時間（周一至六20:00–07:59及周日、公眾假期全日）或另收醫生診症費。程序另計（醫院費及醫生費，如有），例如縫合醫院 HK$1,200／醫生 HK$4,500；復甦每30分鐘醫院 HK$8,250／醫生 HK$4,500；小手術每30分鐘醫院 HK$1,650／醫生 HK$4,500 — 詳見官方收費表。"
)

export const matildaHospital: PhysicalAlternative = {
    slug: "matilda-hospital",
    category: "24hour",
    name: i18n("Matilda International Hospital", "明德國際醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour outpatient on The Peak with general practitioners and resident paediatricians. Walk-in welcome; appointments encouraged.",
        "山頂24小時門診，設普通科及駐院兒科醫生；歡迎即到，亦建議預約。"
    ),
    location: {
        district: "The Peak",
        address: i18n(
            "41 Mount Kellett Road, The Peak, Hong Kong",
            "香港山頂加列山道41號"
        ),
        coordinates: { latitude: 22.2593736, longitude: 114.149226 },
    },
    contacts: [
        {
            kind: "phone",
            value: "2849 1500",
            label: i18n("24-hour outpatient", "24小時門診", "24小时门诊"),
        },
        {
            kind: "email",
            value: "opd@matilda.org",
            label: i18n("24-hour outpatient", "24小時門診", "24小时门诊"),
        },
        {
            kind: "phone",
            value: "2849 0111",
            label: i18n("Hospital (general)", "醫院（總機）", "医院（总机）"),
        },
        {
            kind: "email",
            value: "info@matilda.org",
            label: i18n("Hospital (general)", "醫院（總機）", "医院（总机）"),
        },
        {
            kind: "url",
            value: MATILDA_OPD_PAGE,
            label: i18n("24-hour outpatient", "24小時門診", "24小时门诊"),
        },
        {
            kind: "url",
            value: MATILDA_OPD_FEES_PAGE,
            label: i18n("24-hour OPD fees", "24小時門診收費", "24小时门诊收费"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/Matilda+International+Hospital/@22.2593736,114.149226,1006m",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "gp_24h",
            name: i18n("General practitioner (24-hour outpatient)", "普通科醫生（24小時門診）"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: gpConsultationTiers,
                displayNotes: PROCEDURE_AND_OFF_HOURS_NOTE,
            },
        },
        {
            id: "resident_paediatrician",
            name: i18n("Resident paediatrician (24-hour)", "駐院兒科醫生（24小時）"),
            channelType: "in_person",
            primary: false,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: paediatricConsultationTiers,
                displayNotes: i18n(
                    "Resident paediatrician consultation only — significantly higher than GP. Procedures and additional off-hours doctor fees may apply; see official fee list.",
                    "只包括駐院兒科醫生診症費，較普通科為高。程序及非辦公時間額外醫生費另計，詳見官方收費表。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("mri"),
        facility("ct_scanner"),
        customFacility("Treatment rooms", "治理室"),
        customFacility("Private consultation rooms", "私人診症室"),
        facility("physiotherapy"),
        customFacility("Special care baby unit", "初生嬰兒特別護理部"),
        customFacility("Adult high-dependency unit", "成人加護病房"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "urgent_care",
        summary: i18n(
            "24-hour GP and paediatric outpatient on The Peak with diagnostic and treatment facilities.",
            "山頂24小時普通科及兒科門診，設診斷及治理配套。"
        ),
    },
    additionalInfo: i18n(
        "Non-profit hospital (est. 1907). Target wait: seen within 30 minutes when a doctor is available. In-town Medical Centre in Central is a separate site. Service continues during Black Rainstorm or Typhoon Signal No. 8+.",
        "非牟利醫院（1907年創立）。目標等候：有醫生時30分鐘內見病人。中環市區診所為另一地點。黑色暴雨或八號風球期間服務維持。"
    ),
    sourceUrls: [
        {
            url: MATILDA_OPD_PAGE,
            label: i18n("Official 24-hour outpatient", "官方24小時門診", "官方24小时门诊"),
        },
        {
            url: MATILDA_OPD_FEES_PAGE,
            label: i18n("Official fees (24-hour OPD)", "官方收費（24小時門診）", "官方收费（24小时门诊）"),
        },
    ],
    lastUpdated: "2026-05-20",
}
