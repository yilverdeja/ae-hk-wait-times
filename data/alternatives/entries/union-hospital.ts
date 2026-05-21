/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const UNION_EMC_PAGE = i18n(
    "https://www.union.org/en/service-overview/specialty/emergency-medicine",
    "https://www.union.org/tc/service-overview/specialty/emergency-medicine",
    "https://www.union.org/sc/service-overview/specialty/emergency-medicine"
)

const UNION_EMC_FEES_PAGE = i18n(
    "https://www.union.org/en/charges-promotion/charges/emergency-medicine-centre",
    "https://www.union.org/tc/charges-promotion/charges/emergency-medicine-centre",
    "https://www.union.org/sc/charges-promotion/charges/emergency-medicine-centre"
)

const WEEKDAYS: DayOfWeek[] = [1, 2, 3, 4, 5]
const SATURDAY: DayOfWeek[] = [6]
const SUNDAY: DayOfWeek[] = [0]

function emcTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    elderlyAmount: number,
    days: DayOfWeek[],
    start: string,
    end: string,
    extraWhen?: FeeTier["appliesWhen"]
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount },
        notes: i18n(`Age 60+: HK$${elderlyAmount}`, `60歲或以上：HK$${elderlyAmount}`),
        appliesWhen: [
            ...(extraWhen ?? []),
            { type: "days", days },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

function publicHolidayEmcTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    elderlyAmount: number,
    start: string,
    end: string
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: { currency: "HKD", amount },
        notes: i18n(`Age 60+: HK$${elderlyAmount}`, `60歲或以上：HK$${elderlyAmount}`),
        appliesWhen: [
            { type: "public_holiday" },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

const unionEmcTiers: FeeTier[] = [
    // Mon–Fri (not public holiday)
    emcTier("mf_early", "Mon–Fri early", "周一至五清晨", 700, 620, WEEKDAYS, "08:00", "09:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("mf_day", "Mon–Fri day", "周一至五日間", 420, 370, WEEKDAYS, "09:00", "18:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("mf_evening", "Mon–Fri evening", "周一至五晚上", 900, 800, WEEKDAYS, "18:00", "22:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("mf_late", "Mon–Fri late night", "周一至五深夜", 1100, 970, WEEKDAYS, "22:00", "02:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("mf_overnight", "Mon–Fri overnight", "周一至五凌晨", 1500, 1380, WEEKDAYS, "02:00", "08:00", [
        { type: "not_public_holiday" },
    ]),
    // Saturday (not public holiday)
    emcTier("sat_early", "Sat early", "週六清晨", 700, 620, SATURDAY, "08:00", "09:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("sat_morning", "Sat morning", "週六上午", 450, 390, SATURDAY, "09:00", "13:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("sat_afternoon", "Sat afternoon", "週六下午", 600, 530, SATURDAY, "13:00", "18:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("sat_evening", "Sat evening", "週六晚上", 900, 800, SATURDAY, "18:00", "22:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("sat_late", "Sat late night", "週六深夜", 1100, 970, SATURDAY, "22:00", "02:00", [
        { type: "not_public_holiday" },
    ]),
    emcTier("sat_overnight", "Sat overnight", "週六凌晨", 1500, 1380, SATURDAY, "02:00", "08:00", [
        { type: "not_public_holiday" },
    ]),
    // Sunday (not public holiday)
    emcTier("sun_early", "Sun early", "週日清晨", 700, 620, SUNDAY, "08:00", "09:00"),
    emcTier("sun_day", "Sun day", "週日日間", 600, 530, SUNDAY, "09:00", "18:00"),
    emcTier("sun_evening", "Sun evening", "週日晚上", 900, 800, SUNDAY, "18:00", "22:00"),
    emcTier("sun_late", "Sun late night", "週日深夜", 1100, 970, SUNDAY, "22:00", "02:00"),
    emcTier("sun_overnight", "Sun overnight", "週日凌晨", 1500, 1380, SUNDAY, "02:00", "08:00"),
    // Public holidays (same bands as Sun & PH column)
    publicHolidayEmcTier("ph_early", "Public holiday early", "公眾假期清晨", 700, 620, "08:00", "09:00"),
    publicHolidayEmcTier("ph_day", "Public holiday day", "公眾假期日間", 600, 530, "09:00", "18:00"),
    publicHolidayEmcTier("ph_evening", "Public holiday evening", "公眾假期晚上", 900, 800, "18:00", "22:00"),
    publicHolidayEmcTier("ph_late", "Public holiday late night", "公眾假期深夜", 1100, 970, "22:00", "02:00"),
    publicHolidayEmcTier("ph_overnight", "Public holiday overnight", "公眾假期凌晨", 1500, 1380, "02:00", "08:00"),
]

export const unionHospital: PhysicalAlternative = {
    slug: "union-hospital",
    category: "24hour",
    name: i18n("Union Hospital", "仁安醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour Emergency Medicine Centre at Tai Wai. Walk-in accepted. Free shuttle from Tai Wai MTR (every 5–15 minutes).",
        "大圍仁安醫院24小時急症醫學中心，接受即到。設免費穿梭巴士往返大圍港鐵站（每5–15分鐘）。"
    ),
    location: {
        district: "Tai Wai",
        address: i18n(
            "G/F, Medical Centre, Union Hospital, 18 Fu Kin Street, Tai Wai, New Territories, Hong Kong",
            "新界大圍富健街18號仁安醫院醫療中心地下"
        ),
        coordinates: { latitude: 22.3606421, longitude: 114.1372532 },
    },
    contacts: [
        {
            kind: "phone",
            value: "2608 3355",
            label: i18n("Emergency Medicine Centre", "急症醫學中心", "急症医学中心"),
        },
        {
            kind: "whatsapp",
            value: "92258571",
            label: i18n("WhatsApp", "WhatsApp", "WhatsApp"),
        },
        {
            kind: "url",
            value: UNION_EMC_PAGE,
            label: i18n("Emergency Medicine Centre", "急症醫學中心", "急症医学中心"),
        },
        {
            kind: "url",
            value: UNION_EMC_FEES_PAGE,
            label: i18n("Fees & charges", "收費", "收费"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/Union+Hospital+-+Emergency+Medicine+Centre/@22.3606421,114.1372532",
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
            booking: {
                walkIn: true,
                methods: i18n(
                    "Walk-in, phone (2608 3355), WhatsApp (9225 8571), or WeChat (Uemc26083355)",
                    "即到、電話（2608 3355）、WhatsApp（9225 8571）或微信（Uemc26083355）"
                ),
            },
            pricing: {
                tiers: unionEmcTiers,
                displayNotes: i18n(
                    "Standard consultation fees shown; each tier notes the lower fee for patients aged 60+. Long consultation: HK$800 per 30 minutes. “Long holiday” rates (08:00–17:59 HK$800 / age 60+ HK$710; 18:00–01:59 HK$1,100 / HK$970; 02:00–07:59 HK$1,500 / HK$1,380) apply on dates designated by the hospital — confirm on the official fee list. Excludes treatment/procedure fees, medication, pathology, consumables, and doctor procedure fees. Hospital procedure charges (excl. doctor fee) include wound dressing HK$400–1,000, suturing HK$1,000–1,700, foreign body removal HK$490–1,400, resuscitation HK$9,000–18,000.",
                    "所列為標準診症費，各時段備註60歲或以上收費。長診症：每30分鐘HK$800。「長假期」收費（08:00–17:59 HK$800／長者HK$710；18:00–01:59 HK$1,100／HK$970；02:00–07:59 HK$1,500／HK$1,380）按醫院公布之長假期適用 — 請以官方收費表為準。不包括治療／程序費、藥物、化驗、消耗品及醫生程序費。醫院程序費（不含醫生費）例如敷料HK$400–1,000、縫合HK$1,000–1,700、取除異物HK$490–1,400、復甦HK$9,000–18,000。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility("24-hour thrombolysis (acute MI)", "24小時溶栓（急性心肌梗塞）"),
        customFacility("Stroke emergency service", "中風急症服務"),
        facility("endoscopy"),
        customFacility("Intensive care / high dependency", "深切治療／加護病房"),
        facility("mri"),
        facility("ct_scanner"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24-hour Emergency Medicine Centre with resuscitation and stroke services.",
            "24小時急症醫學中心，設復甦及中風急症服務。"
        ),
    },
    additionalInfo: i18n(
        "Also operates polyclinics in Kowloon and the New Territories. Paediatric services available at the hospital.",
        "本院另於九龍及新界設有多間分科診所，並提供兒科服務。"
    ),
    sourceUrls: [
        {
            url: UNION_EMC_PAGE,
            label: i18n("Official Emergency Medicine Centre", "官方急症醫學中心", "官方急症医学中心"),
        },
        {
            url: UNION_EMC_FEES_PAGE,
            label: i18n("Official fees & charges", "官方收費", "官方收费"),
        },
    ],
    lastUpdated: "2026-05-20",
}
