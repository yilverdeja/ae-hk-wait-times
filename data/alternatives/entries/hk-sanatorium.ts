/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const HKSH_OPD_PAGE = i18n(
    "https://www.hksh-hospital.com/en/clinical-services/24-hour-outpatient-service",
    "https://www.hksh-hospital.com/zh-hk/clinical-services/24-hour-outpatient-service",
    "https://www.hksh-hospital.com/zh-cn/clinical-services/24-hour-outpatient-service"
)

const HKSH_OPD_FEES_PAGE = i18n(
    "https://www.hksh-hospital.com/en/fees-and-charges/price-list/24-hour-outpatient-clinic",
    "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list/24-hour-outpatient-clinic",
    "https://www.hksh-hospital.com/zh-cn/fees-and-charges/price-list/24-hour-outpatient-clinic"
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

/** Happy Valley FM & Primary Care Centre — consultation by queue ticket / registration time. */
const hkshHappyValleyOpdTiers: FeeTier[] = [
    // Daily late night (all calendar days — lower specificity vs day-specific tiers)
    {
        id: "late_night_daily",
        label: i18n("Late night (midnight–8am)", "午夜至翌晨上午8時"),
        consultation: { currency: "HKD", amount: 700 },
        appliesWhen: [{ type: "time", ranges: [{ start: "00:00", end: "08:00" }] }],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    },
    // Mon–Fri (not public holiday)
    outpatientTier("mf_day", "Mon–Fri day", "周一至五日間", 400, WEEKDAYS, "09:00", "19:00"),
    outpatientTier("mf_evening", "Mon–Fri evening", "周一至五晚上", 500, WEEKDAYS, "19:00", "24:00"),
    // Saturday (not public holiday)
    outpatientTier("sat_early", "Sat early morning", "週六清晨", 500, SATURDAY, "08:00", "09:00"),
    outpatientTier("sat_day", "Sat day", "週六日間", 400, SATURDAY, "09:00", "13:00"),
    outpatientTier("sat_evening", "Sat afternoon–midnight", "週六下午至午夜", 500, SATURDAY, "13:00", "24:00"),
    // Sunday (not public holiday)
    outpatientTier("sun_day_evening", "Sun daytime–midnight", "週日日間至午夜", 500, SUNDAY, "08:00", "24:00"),
    // Public holidays (Sun/PH band in fee table — higher specificity wins on weekdays)
    publicHolidayTier(
        "ph_day_evening",
        "Public holiday day–midnight",
        "公眾假期日間至午夜",
        500,
        "08:00",
        "24:00"
    ),
]

export const hkSanatorium: PhysicalAlternative = {
    slug: "hk-sanatorium",
    category: "24hour",
    name: i18n("Hong Kong Sanatorium & Hospital", "養和醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour general outpatient via the Family Medicine and Primary Care Centre (Happy Valley, Li Shu Pui Block). Consultation tiers follow registration / queue ticket time.",
        "跑馬地利樹培院「家庭醫學及基層健康中心」24小時普通科門診；診金按取票／登記時間計算。"
    ),
    location: {
        district: "Happy Valley",
        address: i18n(
            "G/F, Li Shu Pui Block, Hong Kong Sanatorium & Hospital, 2 Village Road, Happy Valley, Hong Kong",
            "香港跑馬地山村道2號養和醫院李樹培院地下"
        ),
        coordinates: { latitude: 22.2730643, longitude: 114.1812794 },
    },
    contacts: [
        { kind: "phone", value: "2835 8600", label: i18n("24-hour outpatient", "24小時門診") },
        {
            kind: "whatsapp",
            value: "2835 8600",
            label: i18n("Same as OPD line", "與門診熱線相同"),
        },
        {
            kind: "url",
            value: HKSH_OPD_PAGE,
            label: i18n(
                "24-hour outpatient service",
                "24小時門診服務",
                "24小时门诊服务"
            ),
        },
        {
            kind: "url",
            value: HKSH_OPD_FEES_PAGE,
            label: i18n(
                "24-hour OPD fees & charges",
                "24小時門診收費",
                "24小时门诊收费"
            ),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/Hong+Kong+Sanatorium+%26+Hospital/@22.2730643,114.1812794",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "24h_opd_happy_valley",
            name: i18n(
                "24-hour outpatient (Happy Valley FM & Primary Care)",
                "24小時門診（跑馬地家庭醫學及基層健康中心）"
            ),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: hkshHappyValleyOpdTiers,
                displayNotes: i18n(
                    "Fees apply when the outpatient queue ticket is obtained for Happy Valley FM & Primary Care only; other HKSH FMC locations use different tariffs. Procedure charges marked * are extra (e.g. dressing change HK$1,000–1,800; catheterization HK$2,100; resuscitation/CPR per 30 min HK$6,700; ear irrigation per ear HK$2,400; suturing HK$5,500–6,300; incision & drainage HK$4,600–5,500) — see hospital price list. Subject to hospital’s latest bulletin.",
                    "診症費適用於跑馬地「家庭醫學及基層健康中心」取票時間；養和其餘門診部另議。所列*項目另收程序費（例如敷料護理 HK$1,000–1,800；導尿 HK$2,100；心肺復甦／急救每30分鐘 HK$6,700；耳道洗濯每側 HK$2,400；縫線小手術 HK$5,500–6,300；切開引流 HK$4,600–5,500）詳見官方收費表。一切以醫院最新公布為準。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("ecg"),
        facility("laboratory"),
        customFacility(
            "Treatment rooms (suturing, FB removal, casting)",
            "治理室（縫線、異物摘除、石膏）"
        ),
        customFacility("Cardiac monitoring", "心跳監察"),
        customFacility("Resuscitation equipment", "復甦設備"),
        facility("ct_scanner"),
        facility("mri"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "urgent_care",
        summary: i18n(
            "Happy Valley 24-hour general outpatient and treatment rooms.",
            "跑馬地24小時普通科門診及護理／治理室。"
        ),
    },
    additionalInfo: i18n(
        "Historic private hospital — large specialist footprint with on‑call specialists. Walk‑in and enquiry via phone or WhatsApp. Other HKSH FMC sites (Central, North Point, etc.) are not priced here.",
        "大型私家醫院，專科服務規模龐大，設24小時專科備班。可到院求診，亦可電話或WhatsApp查詢。本章僅詳列跑馬地24小時收費，中環、北角等其他家庭醫學中心請參見醫院收費表。"
    ),
    sourceUrls: [
        {
            url: HKSH_OPD_PAGE,
            label: i18n("Official 24-hour outpatient", "官方24小時門診", "官方24小时门诊"),
        },
        {
            url: HKSH_OPD_FEES_PAGE,
            label: i18n("Official fee list", "官方價格表", "官方价格表"),
        },
    ],
    lastUpdated: "2026-05-20",
}
