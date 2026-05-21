/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const STH_OPS_PAGE = i18n(
    "https://www.sth.org.hk/other_service.asp?lang_code=en&dept_code=OPS",
    "https://www.sth.org.hk/other_service.asp?lang_code=zh&dept_code=OPS&id=54",
    "https://www.sth.org.hk/other_service.asp?lang_code=sc&dept_code=OPS&id=54"
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

/** Resident doctors — general out-patient consultation. */
const stTeresasOpdTiers: FeeTier[] = [
    outpatientTier(
        "monsat_day",
        "Mon–Sat day",
        "周一至六日間",
        280,
        MON_SAT,
        "08:00",
        "20:00",
        [{ type: "not_public_holiday" }]
    ),
    outpatientTier(
        "monsat_evening",
        "Mon–Sat evening",
        "周一至六晚上",
        430,
        MON_SAT,
        "20:00",
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
    outpatientTier("sun_day", "Sunday day", "週日日間", 350, SUNDAY, "08:00", "20:00"),
    outpatientTier("sun_evening", "Sunday evening", "週日晚上", 470, SUNDAY, "20:00", "24:00"),
    outpatientTier("sun_overnight", "Sunday overnight", "週日凌晨", 470, SUNDAY, "00:00", "08:00"),
    publicHolidayTier("ph_day", "Public holiday day", "公眾假期日間", 350, "08:00", "20:00"),
    publicHolidayTier("ph_evening", "Public holiday evening", "公眾假期晚上", 470, "20:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期凌晨", 470, "00:00", "08:00"),
]

export const stTeresasHospital: PhysicalAlternative = {
    slug: "st-teresas-hospital",
    category: "24hour",
    name: i18n("St. Teresa's Hospital", "聖德肋撒醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "24-hour general out-patient service (resident doctors) at Teresa's Garden — East Wing day entrance and South Wing night entrance. Walk-in accepted.",
        "德蘭園24小時普通科門診（駐院醫生）；日間由東翼大堂、夜間由南翼入口。接受即到。"
    ),
    location: {
        district: "Kowloon City",
        address: i18n(
            "G/F, East Wing / South Wing (Teresa's Garden), St. Teresa's Hospital, 327 Prince Edward Road, Kowloon, Hong Kong",
            "九龍太子道327號聖德肋撒醫院德蘭園東翼／南翼地下"
        ),
        coordinates: { latitude: 22.326264, longitude: 114.1822541 },
    },
    contacts: [
        {
            kind: "phone",
            value: "2200 3108",
            label: i18n("Out-patient department", "門診部", "门诊部"),
        },
        {
            kind: "email",
            value: "opd@sth.org.hk",
            label: i18n("Out-patient department", "門診部", "门诊部"),
        },
        {
            kind: "whatsapp",
            value: "98672437",
            label: i18n("WhatsApp (8am–8pm)", "WhatsApp（上午8時至晚上8時）"),
        },
        {
            kind: "phone",
            value: "2200 3434",
            label: i18n("Hospital", "醫院總機", "医院总机"),
        },
        {
            kind: "url",
            value: STH_OPS_PAGE,
            label: i18n("Out-patient services", "門診服務", "门诊服务"),
        },
        {
            kind: "url",
            value: "https://www.google.com/maps/place/St.+Teresa's+Hospital/@22.326264,114.1822541",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "24h_opd",
            name: i18n(
                "General out-patient (resident doctors)",
                "普通科門診（駐院醫生）"
            ),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: {
                walkIn: true,
                methods: i18n(
                    "Walk-in, phone (2200 3108), email (opd@sth.org.hk), or WhatsApp 98672437 (8am–8pm)",
                    "即到、電話（2200 3108）、電郵（opd@sth.org.hk）或WhatsApp 98672437（上午8時至晚上8時）"
                ),
            },
            pricing: {
                tiers: stTeresasOpdTiers,
                displayNotes: i18n(
                    "Resident doctor consultation fee only. Excludes special examinations, surgeries, medications, treatments, investigations, tests, and procedures.",
                    "只包括駐院醫生診症費，不包括特別檢查、手術、藥物、治療、檢驗、化驗及程序。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility("35 consultation rooms", "35間診症室"),
        customFacility("Treatment room", "治理室"),
        customFacility("Cohort room", "隔離觀察室"),
        facility("endoscopy"),
        customFacility("Breast centre", "乳房中心"),
        customFacility("Heart & diagnostic centre", "心臟及診斷中心"),
        facility("physiotherapy"),
        customFacility("Chinese medicine centre", "中醫中心"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "urgent_care",
        summary: i18n(
            "24-hour general out-patient with resident doctors at Teresa's Garden.",
            "德蘭園24小時駐院醫生普通科門診。"
        ),
    },
    additionalInfo: i18n(
        "Non-profit Catholic hospital (~1,000 beds), also known as the French Hospital. Day outpatient via East Wing lobby; night outpatient via South Wing. Bookings may be made at least 2 days ahead by email.",
        "非牟利天主教醫院（約1,000張病床），俗稱法國醫院。日間門診經東翼大堂；夜間門診經南翼。可提早至少2天以電郵預約。"
    ),
    sourceUrls: [
        {
            url: STH_OPS_PAGE,
            label: i18n("Official out-patient services", "官方門診服務", "官方门诊服务"),
        },
    ],
    lastUpdated: "2026-05-20",
}
