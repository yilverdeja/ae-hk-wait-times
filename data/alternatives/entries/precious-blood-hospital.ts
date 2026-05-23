/** Reviewed — hand-curated entry. */
import { facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const PBH_OPD_PAGE = "https://www.pbh.hk/out-patient/"
const PBH_FEE_SCHEDULE_PDF =
    "https://www.pbh.hk/wp-content/uploads/2025/08/002_%E9%96%80%E8%A8%BA%E6%9C%8D%E5%8B%99%E6%94%B6%E8%B2%BB%E8%A1%A8-V4-2025.pdf"
const PBH_ONLINE_BOOKING = "https://www.pbh.hk/online-booking/"

const MON_SAT: DayOfWeek[] = [1, 2, 3, 4, 5, 6]
const SUNDAY: DayOfWeek[] = [0]

const ELDERLY_DISCOUNT_NOTE = i18n(
    "Age 65+: HK$20 discount off consultation fee",
    "65歲或以上：診金減HK$20",
    "65岁或以上：诊金减HK$20"
)

function generalOpdTier(
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
        notes: ELDERLY_DISCOUNT_NOTE,
        appliesWhen: [
            ...(extraWhen ?? []),
            { type: "days", days },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

function publicHolidayOpdTier(
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
        notes: ELDERLY_DISCOUNT_NOTE,
        appliesWhen: [
            { type: "public_holiday" },
            { type: "time", ranges: [{ start, end }] },
        ],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

const generalOpdTiers: FeeTier[] = [
    generalOpdTier(
        "monsat_day",
        "Mon–Sat day",
        "周一至六日間",
        280,
        MON_SAT,
        "08:00",
        "20:00",
        [{ type: "not_public_holiday" }]
    ),
    generalOpdTier(
        "monsat_evening",
        "Mon–Sat evening",
        "周一至六晚上",
        390,
        MON_SAT,
        "20:00",
        "22:00",
        [{ type: "not_public_holiday" }]
    ),
    generalOpdTier("sun", "Sunday", "星期日", 390, SUNDAY, "08:00", "22:00"),
    publicHolidayOpdTier("ph", "Public holiday", "公眾假期", 390, "08:00", "22:00"),
]

function specialistTier(
    id: string,
    labelEn: string,
    labelZh: string,
    amount: number,
    opts?: { amountMax?: number; displayAs?: FeeTier["displayAs"]; notes?: FeeTier["notes"] }
): FeeTier {
    return {
        id,
        label: i18n(labelEn, labelZh),
        consultation: {
            currency: "HKD",
            amount,
            ...(opts?.amountMax !== undefined ? { amountMax: opts.amountMax } : {}),
        },
        displayAs: opts?.displayAs ?? (opts?.amountMax !== undefined ? "range" : undefined),
        notes: opts?.notes,
        appliesWhen: [{ type: "default" }],
        excludes: EXCLUDES_CONSULTATION_STANDARD,
    }
}

/** Specialist out-patient — appointment only; fees vary by specialty (Aug 2025 schedule). */
const specialistOpdTiers: FeeTier[] = [
    specialistTier(
        "general_specialists",
        "General specialists group",
        "普通專科組",
        650,
        {
            notes: i18n(
                "Cardiothoracic surgery, gastroenterology & hepatology, general surgery, plastic surgery, internal medicine, neurosurgery, ophthalmology, orthopaedics, gynaecology, urology, paediatrics",
                "心胸肺外科、腸胃肝臟科、外科、整形外科、內科、神經外科、眼科、骨科、婦科、泌尿科、兒科"
            ),
        }
    ),
    specialistTier("cardiology", "Cardiology", "心臟科", 650, { amountMax: 900 }),
    specialistTier("respiratory", "Respiratory medicine", "呼吸系統科", 700),
    specialistTier("ent", "Otorhinolaryngology (ENT)", "耳鼻喉科", 650, { amountMax: 800 }),
    specialistTier("infectious", "Infectious disease", "感染及傳染病科", 2000, { displayAs: "from" }),
    specialistTier("neurology", "Neurology", "腦神經科", 1800),
    specialistTier("rheumatology", "Rheumatology", "風濕病科", 1500),
    specialistTier("geriatric", "Geriatric medicine", "老人科", 800),
    specialistTier("endocrinology", "Endocrinology, diabetes & metabolism", "內分泌及糖尿科", 1200),
    specialistTier("dermatology", "Dermatology", "皮膚科", 1100),
    specialistTier("psychiatry_first", "Psychiatry (1st consultation)", "精神科（首次）", 1400, {
        displayAs: "from",
    }),
    specialistTier("psychiatry_followup", "Psychiatry (follow-up)", "精神科（覆診）", 1200, {
        displayAs: "from",
    }),
    specialistTier("chiropractic_first", "Chiropractic (1st consultation)", "脊骨神經科（首次）", 800),
    specialistTier("chiropractic_followup", "Chiropractic (follow-up)", "脊骨神經科（覆診）", 650),
    specialistTier("womens_health", "Women's health & breast services", "婦女健康及乳腺服務", 650, {
        displayAs: "from",
    }),
    specialistTier("napro", "NaPro TECHNOLOGY", "自然生育科技", 1000),
    specialistTier("unscheduled", "Unscheduled session", "特別門診", 300, {
        notes: i18n("Doctor's fee excluded", "不包括醫生診金"),
    }),
    specialistTier("specialist_urgent", "Specialist urgent consultation", "特約專科醫生診症", 700, {
        displayAs: "from",
    }),
    specialistTier("physiotherapy", "Chan Dang physiotherapy centre", "陳登物理治療中心", 700, {
        displayAs: "from",
        notes: i18n("Tel: 3971 4408", "電話：3971 4408"),
    }),
    specialistTier("nutrition", "Nutrition consultation", "營養諮詢", 750),
]

export const preciousBloodHospital: PhysicalAlternative = {
    slug: "precious-blood-hospital",
    category: "non24hour",
    name: i18n("Precious Blood Hospital (Caritas)", "寶血醫院（明愛）"),
    providerType: "Private Hospital",
    description: i18n(
        "Non-24-hour private hospital in Sham Shui Po with general out-patient (walk-in, 8am–10pm daily) and appointment-only specialist clinics.",
        "深水埗非24小時私家醫院；普通科門診每日上午8時至晚上10時（即到），專科門診須預約。"
    ),
    location: {
        district: "Sham Shui Po",
        address: i18n(
            "113 Castle Peak Road, Sham Shui Po, Kowloon, Hong Kong",
            "香港九龍深水埗青山道113號"
        ),
        coordinates: { latitude: 22.3338757, longitude: 114.1591759 },
    },
    contacts: [
        {
            kind: "phone",
            value: "3971 9980",
            label: i18n("Out-patient", "門診", "门诊"),
        },
        {
            kind: "whatsapp",
            value: "92491904",
            label: i18n("WhatsApp", "WhatsApp", "WhatsApp"),
        },
        {
            kind: "email",
            value: "pbh@pbh.hk",
            label: i18n("Email", "電郵", "电邮"),
        },
        {
            kind: "url",
            value: PBH_OPD_PAGE,
            label: i18n("Out-patient services", "門診服務", "门诊服务"),
        },
        {
            kind: "url",
            value: PBH_ONLINE_BOOKING,
            label: i18n("Online booking", "網上預約", "网上预约"),
        },
        {
            kind: "url",
            value:
                "https://www.google.com/maps/place/Precious+Blood+Hospital+(Caritas)/@22.3338757,114.1591759,1005m",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "general_opd",
            name: i18n("General out-patient", "普通科門診"),
            channelType: "in_person",
            primary: true,
            schedule: {
                kind: "weekly",
                timezone: "Asia/Hong_Kong",
                rules: [
                    {
                        days: [0, 1, 2, 3, 4, 5, 6],
                        ranges: [{ start: "08:00", end: "22:00" }],
                        registrationClose: "21:40",
                    },
                ],
            },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: generalOpdTiers,
                displayNotes: i18n(
                    "Outpatient consultation fee only. Excludes medication, laboratory tests, and other services. Resident doctor service; follow-up visits at the same rate for the time slot. During Typhoon Signal No. 8+ or Black Rainstorm Warning, fee is HK$390 — confirm with hospital.",
                    "只包括門診診金，不包括藥物、化驗及其他服務。由駐院醫生提供；覆診按相應時段收費。八號風球或以上及黑色暴雨警告期間診金為HK$390，請向醫院確認。",
                    "只包括门诊诊金，不包括药物、化验及其他服务。由驻院医生提供；覆诊按相应时段收费。八号风球或以上及黑色暴雨警告期间诊金为HK$390，请向医院确认。"
                ),
            },
        },
        {
            id: "specialist_opd",
            name: i18n("Specialist out-patient", "專科門診"),
            channelType: "in_person",
            schedule: {
                kind: "appointment_only",
                notes: i18n(
                    "By appointment only. Book online or via WhatsApp 9249 1904.",
                    "只限預約。可網上預約或WhatsApp 9249 1904。",
                    "只限预约。可网上预约或WhatsApp 9249 1904。"
                ),
            },
            eligibility: OPEN_PUBLIC,
            booking: {
                appointmentRequired: true,
                methods: i18n(
                    "Online: pbh.hk/online-booking · WhatsApp 9249 1904",
                    "網上：pbh.hk/online-booking · WhatsApp 9249 1904",
                    "网上：pbh.hk/online-booking · WhatsApp 9249 1904"
                ),
            },
            pricing: {
                tiers: specialistOpdTiers,
                displayNotes: i18n(
                    "Specialist consultation fees only — excludes medication, tests, and procedures. Confirm final fee when booking.",
                    "只包括專科診金，不包括藥物、檢查及程序。預約時請向醫院確認實際收費。",
                    "只包括专科诊金，不包括药物、检查及程序。预约时请向医院确认实际收费。"
                ),
            },
        },
    ],
    facilities: [
        facility("mri"),
        facility("ct_scanner"),
        facility("xray"),
        facility("ultrasound"),
        facility("endoscopy"),
        facility("laboratory"),
        facility("pharmacy"),
        facility("physiotherapy"),
    ],
    scope: {
        hasAe: false,
        transferToPublicAe: true,
        urgencyLevel: "primary_care",
        summary: i18n(
            "Not a 24-hour facility. No A&E. General OPD 8am–10pm daily.",
            "非24小時設施，沒有急症室。普通科門診每日上午8時至晚上10時。"
        ),
    },
    acceptedVouchers: [{ id: "hcvs" }],
    sourceUrls: [
        {
            url: PBH_OPD_PAGE,
            label: i18n("Official out-patient", "官方門診", "官方门诊"),
        },
        {
            url: PBH_FEE_SCHEDULE_PDF,
            label: i18n("Official fee schedule (PDF)", "官方收費表（PDF）", "官方收费表（PDF）"),
            retrievedAt: "2025-08",
        },
    ],
    lastUpdated: "2026-05-21",
}
