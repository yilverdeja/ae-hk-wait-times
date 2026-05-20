/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const CUHK_EMC_PAGE = i18n(
    "https://www.cuhkmc.hk/medical-centres-allied-health/emergency-medicine-centre",
    "https://www.cuhkmc.hk/tc/medical-centres-allied-health/emergency-medicine-centre",
    "https://www.cuhkmc.hk/sc/medical-centres-allied-health/emergency-medicine-centre"
)

const CUHK_EMC_FEES_PAGE = i18n(
    "https://www.cuhkmc.hk/fees-and-charges/clinical-service-fee/emergency-medicine-centre",
    "https://www.cuhkmc.hk/tc/fees-and-charges/clinical-service-fee/emergency-medicine-centre",
    "https://www.cuhkmc.hk/sc/fees-and-charges/clinical-service-fee/emergency-medicine-centre"
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

/** Emergency Medicine Centre — outpatient & emergency consultation (check-in time). Effective 1 Feb 2026 per hospital list. */
const cuhkEmcTiers: FeeTier[] = [
    // Mon–Fri (not public holiday)
    outpatientTier("mf_day", "Mon–Fri day", "周一至五日間", 400, WEEKDAYS, "08:00", "18:00"),
    outpatientTier("mf_evening", "Mon–Fri evening", "周一至五晚上", 600, WEEKDAYS, "18:00", "22:00"),
    outpatientTier("mf_late_night", "Mon–Fri late night", "周一至五深夜", 800, WEEKDAYS, "22:00", "24:00"),
    outpatientTier("mf_overnight", "Mon–Fri overnight", "周一至五凌晨", 800, WEEKDAYS, "00:00", "08:00"),
    // Saturday (not public holiday)
    outpatientTier("sat_morning", "Sat morning", "週六上午", 400, SATURDAY, "08:00", "13:00"),
    outpatientTier("sat_afternoon_evening", "Sat afternoon–night", "週六下午至晚上", 600, SATURDAY, "13:00", "22:00"),
    outpatientTier("sat_late_night", "Sat late night", "週六深夜", 800, SATURDAY, "22:00", "24:00"),
    outpatientTier("sat_overnight", "Sat overnight", "週六凌晨", 800, SATURDAY, "00:00", "08:00"),
    // Sunday (not public holiday)
    outpatientTier("sun_day", "Sun day–evening", "週日日間至晚上", 600, SUNDAY, "08:00", "22:00"),
    outpatientTier("sun_late_night", "Sun late night", "週日深夜", 800, SUNDAY, "22:00", "24:00"),
    outpatientTier("sun_overnight", "Sun overnight", "週日凌晨", 800, SUNDAY, "00:00", "08:00"),
    // Public holidays & adverse-weather check-in (same rates as Sun column)
    publicHolidayTier("ph_day", "Public holiday day–evening", "公眾假期日間至晚上", 600, "08:00", "22:00"),
    publicHolidayTier("ph_late_night", "Public holiday late night", "公眾假期深夜", 800, "22:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期凌晨", 800, "00:00", "08:00"),
]

export const cuhkMedicalCentre: PhysicalAlternative = {
    slug: "cuhk-medical-centre",
    category: "24hour",
    name: i18n("CUHK Medical Centre", "香港中文大學醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "Non-profit private teaching hospital. 24-hour Emergency Medicine Centre staffed by emergency medicine specialists. Walk-in welcome.",
        "非牟利私家教學醫院，急症醫學中心由急症科專科醫生24小時駐診，歡迎即到求診。"
    ),
    location: {
        district: "Sha Tin",
        address: i18n(
            "G/F, CUHK Medical Centre, 9 Chak Cheung Street, Sha Tin, New Territories, Hong Kong",
            "香港新界沙田澤祥街9號香港中文大學醫院地下"
        ),
        coordinates: { latitude: 22.4136142, longitude: 114.2088068 },
    },
    contacts: [
        { kind: "phone", value: "3946 6888", label: i18n("General", "總機") },
        {
            kind: "phone",
            value: "3946 6333",
            label: i18n("Emergency Medicine Centre", "急症醫學中心"),
        },
        {
            kind: "url",
            value: CUHK_EMC_PAGE,
            label: i18n("Emergency Medicine Centre", "急症醫學中心", "急症医学中心"),
        },
        {
            kind: "url",
            value: CUHK_EMC_FEES_PAGE,
            label: i18n("EMC fees & charges", "急症醫學中心收費", "急症医学中心收费"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/CUHK+Medical+Centre/@22.4136142,114.2088068",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "emergency_medicine",
            name: i18n("Emergency Medicine Centre", "急症醫學中心"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: cuhkEmcTiers,
                displayNotes: i18n(
                    "Consultation fee for outpatient & emergency service (by check-in time) only; excludes minor procedures, drugs, laboratory services, etc. Total charge depends on clinical need. Fixed drug packages (URTI / gastroenteritis): 3-day HK$180; 5-day HK$220 — separate from general consultation tiers. During Typhoon Signal No. 8 or above, Black Rainstorm, or “Extreme Conditions”, check-in may follow the Sunday / public holiday fee column; confirm with the centre. Effective 1 February 2026; English text prevails if versions differ.",
                    "只包括門診及急症診症費（按登記時間），不包括小型手術、藥物、化驗等；實際收費視病情而定。藥費組合（上呼吸道感染／腸胃炎）：3天藥HK$180、5天藥HK$220，與診症分項不同。八號或以上熱帶氣旋、黑色暴雨警告或「極端情況」期間登記，或按周日／公眾假期收費欄，請向中心查詢。2026年2月1日起生效；中英文本如有歧義，以英文為準。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        facility("ct_scanner"),
        facility("mri"),
        customFacility("Emergency Medicine Centre", "急症醫學中心"),
        customFacility("Specialist outpatient centre", "專科門診中心"),
        customFacility("Day surgery centre", "日間手術中心"),
        customFacility("Smart navigation & self-service kiosks", "智慧導航及自助咭機"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24-hour Emergency Medicine Centre with specialists and full diagnostic support.",
            "急症醫學中心24小時開放，設專科團隊及全面診斷配套。"
        ),
    },
    additionalInfo: i18n(
        "Wholly owned by The Chinese University of Hong Kong. Accepts Octopus at the Emergency Medicine Centre. Medication package pricing applies only to eligible URTI / gastroenteritis pathways — see official fee list.",
        "由香港中文大學全資擁有；急症醫學中心接受八達通。藥費組合只適用於合資格之上呼吸道／腸胃炎路徑，詳情見官方收費表。"
    ),
    sourceUrls: [
        {
            url: CUHK_EMC_PAGE,
            label: i18n("Official Emergency Medicine Centre", "官方急症醫學中心", "官方急症医学中心"),
        },
        {
            url: CUHK_EMC_FEES_PAGE,
            label: i18n("Official EMC fees & charges", "官方急症醫學中心收費", "官方急症医学中心收费"),
        },
    ],
    lastUpdated: "2026-05-20",
}
