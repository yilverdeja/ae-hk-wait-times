/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const HKBH_24H_OPD_PAGE = i18n(
    "https://www.hkbh.org.hk/general_specialist/24-hr-general-out-patient-cliinic/?lang=en",
    "https://www.hkbh.org.hk/general_specialist/24-hr-general-out-patient-cliinic/",
    "https://www.hkbh.org.hk/general_specialist/24-hr-general-out-patient-cliinic/?lang=zh-hans"
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

const baptistOutpatientTiers: FeeTier[] = [
    // Mon–Fri (not public holiday — PH tiers below)
    outpatientTier("mf_day", "Mon–Fri day", "周一至五日間", 400, WEEKDAYS, "08:00", "18:00"),
    outpatientTier("mf_evening", "Mon–Fri evening", "周一至五晚上", 700, WEEKDAYS, "18:00", "22:00"),
    outpatientTier("mf_late_night", "Mon–Fri late night", "周一至五深夜", 1000, WEEKDAYS, "22:00", "24:00"),
    outpatientTier("mf_overnight", "Mon–Fri overnight", "周一至五凌晨", 1000, WEEKDAYS, "00:00", "08:00"),
    // Saturday (not public holiday)
    outpatientTier("sat_morning", "Sat morning", "週六上午", 400, SATURDAY, "08:00", "13:00"),
    outpatientTier("sat_afternoon_evening", "Sat afternoon–night", "週六下午至晚上", 700, SATURDAY, "13:00", "22:00"),
    outpatientTier("sat_late_night", "Sat late night", "週六深夜", 1000, SATURDAY, "22:00", "24:00"),
    outpatientTier("sat_overnight", "Sat overnight", "週六凌晨", 1000, SATURDAY, "00:00", "08:00"),
    // Sunday (not public holiday — same times as “Sunday & PH” column when day is Sunday)
    outpatientTier("sun_day", "Sun day–evening", "週日日間至晚上", 700, SUNDAY, "08:00", "22:00"),
    outpatientTier("sun_late_night", "Sun late night", "週日深夜", 1000, SUNDAY, "22:00", "24:00"),
    outpatientTier("sun_overnight", "Sun overnight", "週日凌晨", 1000, SUNDAY, "00:00", "08:00"),
    // Public holidays & adverse-weather registration (same headline rates as Sun column)
    publicHolidayTier("ph_day", "Public holiday day–evening", "公眾假期日間至晚上", 700, "08:00", "22:00"),
    publicHolidayTier("ph_late_night", "Public holiday late night", "公眾假期深夜", 1000, "22:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期凌晨", 1000, "00:00", "08:00"),
]

export const baptistHospital: PhysicalAlternative = {
    slug: "baptist-hospital",
    category: "24hour",
    name: i18n("Hong Kong Baptist Hospital", "香港浸信會醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour general outpatient clinic at G/F Block D. Walk-in triage to this clinic or specialist services as appropriate.",
        "設於D座地面的24小時普通科門診，求診者經分流後可於此處或由專科跟進。"
    ),
    location: {
        district: "Kowloon Tong",
        address: i18n(
            "G/F, Block D, Hong Kong Baptist Hospital, 222 Waterloo Road, Kowloon Tong, Kowloon, Hong Kong",
            "香港九龍窩打老道222號香港浸信會醫院D座地面"
        ),
        coordinates: { latitude: 22.3398524, longitude: 114.1772806 },
    },
    contacts: [
        { kind: "phone", value: "2339 8888", label: i18n("General", "總機") },
        {
            kind: "phone",
            value: "2339 8941",
            label: i18n("24-hour OPD enquiries", "24小時門診查詢"),
        },
        {
            kind: "url",
            value: HKBH_24H_OPD_PAGE,
            label: i18n("24-hour general outpatient", "24小時普通科門診", "24小时普通科门诊"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/Hong+Kong+Baptist+Hospital/@22.3398524,114.1772806",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "24h_opd",
            name: i18n("24-hour general outpatient", "24小時普通科門診"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: baptistOutpatientTiers,
                displayNotes: i18n(
                    "Outpatient consultation fee only; excludes medication, laboratory tests, minor procedures, and other services. Items marked * on the hospital fee list may carry surcharges for investigations or treatment outside office hours and on public holidays. During Typhoon Signal No. 8 or above or “Extreme Conditions”, registration may follow the Sunday/public holiday fee column — confirm with the department. Subject to the latest hospital fee list (PDF on official site).",
                    "只包括門診診金，不包括藥物、化驗、小型手術及其他服務。醫院價目表上標*項於非公眾假期辦公時間外或公眾假期進行檢查或治療或另收附加費。當八號或以上熱帶氣旋警告信號或「極端情況」生效期間登記，收費或按周日／公眾假期欄 — 請向部門查詢。以醫院最新收費表為準（見官網PDF）。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility(
            "Specialist clinics (multiple disciplines)",
            "專科門診（多專科）"
        ),
        customFacility("Nurse clinic (stoma & wound care)", "護士診所（造口及傷口護理）"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24-hour general outpatient with triage; paediatric emergency support available. Other fees (e.g. specialist call-back, procedures) may apply per hospital policy.",
            "24小時普通科門診連分流；提供兒科急症支援。其他收費（如非當值專科覆診、手術室項目）請參閱醫院政策。"
        ),
    },
    additionalInfo: i18n(
        "Triage directs patients to the 24-hour clinic or specialist clinics. Large private hospital linked with the Baptist Convention of Hong Kong. Non-duty specialist call-back and special procedure facility fees may apply — see hospital fee brochure.",
        "分流安排病人到24小時門診或專科；醫院與香港浸信會聯會相關。非當值專科覆診、特別設備使用等或另收費，詳情見醫院收費單張。"
    ),
    sourceUrls: [
        {
            url: HKBH_24H_OPD_PAGE,
            label: i18n("Official 24-hour outpatient page", "官方24小時門診頁面", "官方24小时门诊页面"),
        },
        {
            url: "https://www.hkbh.org.hk/wp-content/uploads/2026/03/001-opc-2026-03-16.pdf",
            label: i18n("Outpatient fee list (PDF)", "門診收費表（PDF）", "门诊收费表（PDF）"),
        },
    ],
    lastUpdated: "2026-05-20",
}
