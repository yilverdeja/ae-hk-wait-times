/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const ST_PAULS_OPD_PAGE = i18n(
    "https://www.stpaul.org.hk/en/center-and-service/detail/24-hour-outpatient-department-general",
    "https://www.stpaul.org.hk/tc/center-and-service/detail/24-hour-outpatient-department-general",
    "https://www.stpaul.org.hk/sc/center-and-service/detail/24-hour-outpatient-department-general"
)

const ST_PAULS_OPD_CHARGES_PAGE = i18n(
    "https://www.stpaul.org.hk/en/charges/detail/24-hour-outpatient-department-general",
    "https://www.stpaul.org.hk/tc/charges/detail/24-hour-outpatient-department-general",
    "https://www.stpaul.org.hk/sc/charges/detail/24-hour-outpatient-department-general"
)

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

/** In-house doctors — general outpatient consultation. */
const stPaulsOpdTiers: FeeTier[] = [
    // Mon–Sat (not public holiday)
    outpatientTier(
        "monsat_day",
        "Mon–Sat day",
        "周一至六日間",
        280,
        MON_SAT,
        "08:00",
        "19:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier(
        "monsat_evening",
        "Mon–Sat evening",
        "周一至六晚上",
        430,
        MON_SAT,
        "19:00",
        "24:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier(
        "monsat_overnight",
        "Mon–Sat overnight",
        "周一至六凌晨",
        430,
        MON_SAT,
        "00:00",
        "08:00",
        [{ type: "not_public_holiday" }]
    ),
    // Sunday
    outpatientTier("sun_day", "Sunday day", "週日日間", 350, SUNDAY, "08:00", "20:00"),
    outpatientTier("sun_evening", "Sunday evening", "週日晚上", 470, SUNDAY, "20:00", "24:00"),
    outpatientTier("sun_overnight", "Sunday overnight", "週日凌晨", 470, SUNDAY, "00:00", "08:00"),
    // Public holidays
    publicHolidayTier("ph_day", "Public holiday day", "公眾假期日間", 350, "08:00", "20:00"),
    publicHolidayTier("ph_evening", "Public holiday evening", "公眾假期晚上", 470, "20:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期凌晨", 470, "00:00", "08:00"),
]

export const stPaulsHospital: PhysicalAlternative = {
    slug: "st-pauls-hospital",
    category: "24hour",
    name: i18n("St. Paul's Hospital", "聖保祿醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour general outpatient department (in-house doctors) at Causeway Bay. Walk-in only; no appointment required for 24-hour OPD.",
        "銅鑼灣24小時普通科門診（駐院醫生），只限即到，不設預約。"
    ),
    location: {
        district: "Causeway Bay",
        address: i18n(
            "G/F, Main Block, St. Paul's Hospital, 2 Eastern Hospital Road, Causeway Bay, Hong Kong",
            "香港銅鑼灣東院道2號聖保祿醫院主座地下"
        ),
        coordinates: { latitude: 22.278467, longitude: 114.18822 },
    },
    contacts: [
        {
            kind: "phone",
            value: "2830 8774",
            label: i18n("24-hour OPD enquiries", "24小時門診查詢", "24小时门诊查询"),
        },
        {
            kind: "phone",
            value: "2890 6008",
            label: i18n("Hospital", "醫院總機", "医院总机"),
        },
        {
            kind: "url",
            value: ST_PAULS_OPD_PAGE,
            label: i18n(
                "24-hour outpatient department",
                "24小時門診部",
                "24小时门诊部"
            ),
        },
        {
            kind: "url",
            value: ST_PAULS_OPD_CHARGES_PAGE,
            label: i18n("Charges", "收費", "收费"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/St.+Paul's+Hospital/@22.278467,114.18822",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "24h_opd",
            name: i18n(
                "24-hour outpatient (in-house doctors)",
                "24小時門診（駐院醫生）"
            ),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: stPaulsOpdTiers,
                displayNotes: i18n(
                    "In-house doctors general outpatient consultation fee only. Excludes specialized investigation, treatment, medication, and medical consumables. Emergency specialty consultation by an off-duty in-house doctor is charged at HK$1,000 doctor fee (Mon–Sat 19:00–08:00 and all day Sun & public holidays). See “Our Doctor” on the hospital site for in-house doctor details.",
                    "只包括駐院醫生普通科門診診金，不包括專科檢查、治療、藥物及醫療用品。非當值駐院醫生提供的急症專科診症另收醫生費HK$1,000（周一至六19:00–08:00及周日、公眾假期全日）。駐院醫生詳情見醫院網站「Our Doctor」。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility("Imaging and diagnostics", "影像及診斷"),
        customFacility("Minor surgical procedures", "小型手術"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "urgent_care",
        summary: i18n(
            "24-hour general outpatient with in-house doctors at Causeway Bay.",
            "銅鑼灣24小時駐院醫生普通科門診。"
        ),
    },
    acceptedVouchers: [{ id: "hcvs" }],
    additionalInfo: i18n(
        "Acute private hospital (~500 beds, 20+ departments). Health Care Voucher Scheme accepted. Service continues during Black Rainstorm or Typhoon Signal No. 8+.",
        "私家急症醫院（約500張病床、20多個部門）。接受醫療券計劃。黑色暴雨或八號風球期間服務維持。"
    ),
    sourceUrls: [
        {
            url: ST_PAULS_OPD_PAGE,
            label: i18n("Official 24-hour OPD", "官方24小時門診", "官方24小时门诊"),
        },
        {
            url: ST_PAULS_OPD_CHARGES_PAGE,
            label: i18n("Official charges", "官方收費", "官方收费"),
        },
    ],
    lastUpdated: "2026-05-20",
}
