import { facility, customFacility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { Alternative } from "@/types/alternatives"
import {
    AXA_EB_MEMBER,
    BUPA_MEMBER,
    ELIGIBLE_GOPC,
    EXCLUDES_DRUGS_LABS,
    NON_ELIGIBLE_GOPC,
    OPEN_PUBLIC,
    gopcFeeTiers,
} from "./shared"

const WEEKDAYS = [1, 2, 3, 4, 5] as const
const MON_SAT = [1, 2, 3, 4, 5, 6] as const

export const pilotAlternatives: Alternative[] = [
    {
        slug: "canossa-hospital",
        category: "24hour",
        name: i18n("Canossa Hospital (Caritas)", "嘉諾撒醫院"),
        providerType: "Private Hospital",
        description: i18n(
            "24-hour OPD by Resident Medical Officers. Walk-in and phone appointments accepted.",
            "由駐院醫生提供24小時門診服務，接受即時及電話預約。"
        ),
        location: {
            district: "Mid-Levels",
            address: i18n("1 Old Peak Road, Mid-Levels, Hong Kong", "香港舊山頂道一號"),
            coordinates: { latitude: 22.2778, longitude: 114.15 },
        },
        contacts: [
            { kind: "phone", value: "2522 2181", label: i18n("General", "總機") },
            { kind: "phone", value: "2825 5805", label: i18n("24-hour OPD", "24小時門診") },
            {
                kind: "url",
                value: "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/",
                label: i18n("Official site", "官網"),
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
                    methods: i18n("Walk-in or phone (2825 5805)", "即時或電話預約（2825 5805）"),
                },
                pricing: {
                    tiers: [
                        {
                            id: "weekday_day",
                            label: i18n("Weekday day consultation", "平日日間診症"),
                            consultation: { currency: "HKD", amount: 388 },
                            appliesWhen: [
                                { type: "days", days: [...WEEKDAYS] },
                                { type: "time", ranges: [{ start: "08:00", end: "18:00" }] },
                            ],
                            excludes: EXCLUDES_DRUGS_LABS,
                        },
                        {
                            id: "night_weekend",
                            label: i18n("Night / weekend", "夜間／周末"),
                            consultation: "variable",
                            appliesWhen: [{ type: "default" }],
                            notes: i18n(
                                "Night and weekend surcharges apply. Contact hospital for current rates.",
                                "夜間及周末附加費適用，請向醫院查詢最新收費。"
                            ),
                            excludes: EXCLUDES_DRUGS_LABS,
                        },
                    ],
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
                "No on-site A&E; casualty cases transferred to nearby public hospitals.",
                "沒有急症室；需急症治理的病人會轉介至附近公立醫院。"
            ),
        },
        sourceUrls: [
            {
                url: "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/",
                label: "Official 24h OPD",
            },
            { url: "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours" },
        ],
        lastUpdated: "2026-05-01",
    },
    {
        slug: "precious-blood-hospital",
        category: "non24hour",
        name: i18n("Precious Blood Hospital (Caritas)", "寶血醫院（明愛）"),
        providerType: "Private Hospital",
        location: {
            district: "Sham Shui Po",
            address: i18n(
                "113 Castle Peak Road, Sham Shui Po, Kowloon, Hong Kong",
                "九龍深水埗青山道113號"
            ),
            coordinates: { latitude: 22.331, longitude: 114.161 },
        },
        contacts: [
            { kind: "phone", value: "3971 9900", label: i18n("General", "總機") },
            { kind: "phone", value: "3971 9980", label: i18n("OPD", "門診") },
            {
                kind: "url",
                value: "https://www.pbh.hk/out-patient/",
                label: i18n("Official site", "官網"),
            },
        ],
        channels: [
            {
                id: "general_opd",
                name: i18n("General outpatient", "普通科門診"),
                channelType: "in_person",
                primary: true,
                schedule: {
                    kind: "weekly",
                    timezone: "Asia/Hong_Kong",
                    rules: [
                        {
                            days: [...MON_SAT, 0],
                            ranges: [{ start: "08:00", end: "22:00" }],
                            registrationClose: "21:40",
                        },
                    ],
                    notes: i18n(
                        "On Sundays, public holidays, Typhoon Signal No.8+ and Black Rain: same hours may apply; confirm with hospital.",
                        "星期日、公眾假期、八號風球及以上及黑色暴雨：可能相同時間，請向醫院確認。"
                    ),
                },
                eligibility: OPEN_PUBLIC,
                booking: { walkIn: true },
                pricing: {
                    tiers: [
                        {
                            id: "weekday_day",
                            label: i18n("Mon–Sat day rate", "周一至六日間"),
                            consultation: { currency: "HKD", amount: 280 },
                            appliesWhen: [
                                { type: "days", days: [...MON_SAT] },
                                { type: "time", ranges: [{ start: "08:00", end: "20:00" }] },
                            ],
                            excludes: EXCLUDES_DRUGS_LABS,
                        },
                        {
                            id: "sun_ph",
                            label: i18n("Sun / public holiday", "周日／公眾假期"),
                            consultation: { currency: "HKD", amount: 390 },
                            appliesWhen: [{ type: "days", days: [0] }],
                            excludes: EXCLUDES_DRUGS_LABS,
                        },
                        {
                            id: "sun_ph_holiday_flag",
                            label: i18n("Public holiday", "公眾假期"),
                            consultation: { currency: "HKD", amount: 390 },
                            appliesWhen: [{ type: "public_holiday" }],
                            excludes: EXCLUDES_DRUGS_LABS,
                        },
                    ],
                },
            },
            {
                id: "specialist_opd",
                name: i18n("Specialist outpatient", "專科門診"),
                channelType: "in_person",
                schedule: {
                    kind: "appointment_only",
                    notes: i18n(
                        "By appointment only. Book at least 3 working days ahead online or WhatsApp 9249 1904.",
                        "只限預約，請至少提前3個工作天網上或WhatsApp 9249 1904預約。"
                    ),
                },
                eligibility: OPEN_PUBLIC,
                booking: { appointmentRequired: true },
                pricing: {
                    tiers: [
                        {
                            id: "specialist",
                            label: i18n("Specialist consultation", "專科診症"),
                            consultation: "variable",
                            appliesWhen: [{ type: "default" }],
                        },
                    ],
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
            summary: i18n("Not a 24-hour facility. No A&E.", "非24小時設施，沒有急症室。"),
        },
        sourceUrls: [{ url: "https://www.pbh.hk/out-patient/", label: "Official OPD" }],
        lastUpdated: "2026-05-01",
    },
    {
        slug: "gopc-central",
        category: "non24hour",
        name: i18n("Central District Health Centre GOPC (HA)", "中區健康院普通科門診"),
        providerType: "Public Clinic",
        location: {
            district: "Central",
            address: i18n(
                "2/F, Central Health Education Centre, Rental Coach Terminus, Man Yiu Street, Central, Hong Kong",
                "香港中環民耀街中環碼頭巴士總站中區健康教育中心2樓"
            ),
            coordinates: { latitude: 22.287, longitude: 114.159 },
        },
        contacts: [
            { kind: "phone", value: "3543 5055" },
            {
                kind: "url",
                value: "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
                label: i18n("HA clinic page", "醫管局網頁"),
            },
        ],
        channels: [
            {
                id: "general_opd",
                name: i18n("General outpatient (GOPC)", "普通科門診"),
                channelType: "in_person",
                primary: true,
                schedule: {
                    kind: "appointment_only",
                    notes: i18n(
                        "Mon–Fri 09:00–13:00, 14:00–17:30 (Sat varies). Appointment required via HA GOPC booking (08:00) or HA Go. Closed Sun and most public holidays.",
                        "周一至五09:00–13:00、14:00–17:30（周六另訂）。須透過醫管局門診預約（08:00）或HA Go。星期日及大部分公眾假期休息。"
                    ),
                },
                eligibility: [ELIGIBLE_GOPC, NON_ELIGIBLE_GOPC],
                booking: {
                    appointmentRequired: true,
                    walkIn: false,
                    methods: i18n("HA GOPC telephone booking or HA Go app", "醫管局門診電話預約或HA Go"),
                },
                pricing: { tiers: gopcFeeTiers() },
            },
        ],
        facilities: [
            facility("gp_consultation"),
            facility("chronic_disease"),
            facility("pharmacy"),
            facility("nursing"),
            facility("patient_education"),
        ],
        scope: {
            urgencyLevel: "primary_care",
            summary: i18n(
                "For non-urgent conditions. Appointment required; not for emergencies.",
                "適用於非緊急情況，須預約，不適用於急症。"
            ),
        },
        sourceUrls: [
            {
                url: "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
                label: "Official HA",
            },
        ],
        lastUpdated: "2026-05-01",
    },
    {
        slug: "drgo-telehealth",
        category: "telehealth",
        name: i18n("DrGo", "DrGo"),
        providerType: "Dedicated App",
        description: i18n(
            "HKT HealthTech platform for video consultations with HK-registered doctors including GP, TCM, paediatrics and specialists.",
            "HKT健康科技平台，提供與香港註冊醫生（普通科、中醫、兒科及專科）的視像診症。"
        ),
        contacts: [
            {
                kind: "url",
                value: "https://www.drgo.com.hk",
                label: i18n("Website", "網站"),
            },
            {
                kind: "app_ios",
                value: "https://apps.apple.com/hk/app/drgo/id1498911504",
                label: i18n("iOS app", "iOS 應用程式"),
            },
            {
                kind: "app_android",
                value: "https://play.google.com/store/apps/details?id=com.hkt.nightingale",
                label: i18n("Android app", "Android 應用程式"),
            },
        ],
        channels: [
            {
                id: "video_gp",
                name: i18n("Video consultation", "視像診症"),
                channelType: "video",
                primary: true,
                schedule: {
                    kind: "weekly",
                    timezone: "Asia/Hong_Kong",
                    rules: [
                        {
                            days: [0, 1, 2, 3, 4, 5, 6],
                            ranges: [{ start: "08:00", end: "20:00" }],
                        },
                    ],
                },
                eligibility: OPEN_PUBLIC,
                pricing: {
                    tiers: [
                        {
                            id: "standard_bundle",
                            label: i18n(
                                "GP bundle (consultation + 3-day basic meds + delivery)",
                                "普通科套餐（診症+3天基本藥物+送藥）"
                            ),
                            consultation: { currency: "HKD", amount: 398 },
                            displayAs: "from",
                            appliesWhen: [{ type: "default" }],
                            includes: [
                                i18n("Up to 3-day basic medication", "最多3天基本藥物"),
                                i18n("One-time delivery", "一次送藥"),
                            ],
                            notes: i18n(
                                "Fees vary by doctor. Extra medicines may cost more.",
                                "收費因醫生而異，額外藥物可能另收費。"
                            ),
                        },
                    ],
                },
            },
        ],
        features: [
            facility("gp_consultation"),
            customFacility("Chinese Medicine (TCM)", "中醫"),
            customFacility("Paediatrics", "兒科"),
            customFacility("Same-day medicine delivery", "即日送藥"),
        ],
        delivery: {
            speed: i18n(
                "Same day, typically within 4 hours of consultation",
                "即日，一般於診症後4小時內"
            ),
            medicationDelivery: "included",
            notes: i18n(
                "First delivery included; second delivery may be chargeable.",
                "首次送藥包括在內；第二次送藥可能另收費。"
            ),
        },
        sourceUrls: [{ url: "https://www.drgo.com.hk/faq/", label: "FAQ" }],
        lastUpdated: "2026-05-01",
    },
    {
        slug: "bupa-telehealth",
        category: "telehealth",
        name: i18n(
            "Bupa Video Consultation Services (via Quality HealthCare)",
            "保柏視像診症服務（透過卓健醫療）"
        ),
        providerType: "Clinic Network",
        description: i18n(
            "Video GP consultations for eligible Bupa members with door-to-door medication delivery.",
            "為合資格保柏會員提供普通科視像診症及送藥上門服務。"
        ),
        contacts: [
            {
                kind: "url",
                value: "https://www.bupa.com.hk/en/customer-care/video-consultation-services/",
                label: i18n("Official page", "官方網頁"),
            },
        ],
        channels: [
            {
                id: "video_gp",
                name: i18n("Video GP consultation", "普通科視像診症"),
                channelType: "video",
                primary: true,
                schedule: {
                    kind: "variable",
                    notes: i18n(
                        "Available to eligible Bupa members via Quality HealthCare. Check Bupa for current hours.",
                        "合資格保柏會員透過卓健醫療使用，請向保柏查詢服務時間。"
                    ),
                },
                eligibility: [BUPA_MEMBER],
                pricing: {
                    tiers: [
                        {
                            id: "member",
                            label: i18n("Network Clinical Benefit", "網絡臨床保障"),
                            consultation: "member_covered",
                            appliesWhen: [{ type: "default" }],
                            notes: i18n(
                                "Co-payment may apply. Medication delivery HK$50 (may be waived in promotions).",
                                "可能須付共付額。送藥服務HK$50（推廣期可能獲豁免）。"
                            ),
                        },
                    ],
                },
            },
        ],
        features: [
            facility("gp_consultation"),
            customFacility("Door-to-door medication delivery", "送藥上門"),
            customFacility("Free 24h in-person follow-up at QHMS", "24小時內免費到卓健覆診"),
        ],
        delivery: {
            medicationDelivery: { currency: "HKD", amount: 50 },
            notes: i18n("Delivery fee may be waived during promotions.", "送藥費用於推廣期可能獲豁免。"),
        },
        sourceUrls: [
            {
                url: "https://www.bupa.com.hk/en/customer-care/video-consultation-services/",
                label: "Official Bupa",
            },
        ],
        lastUpdated: "2026-05-01",
    },
    {
        slug: "axa-telehealth",
        category: "telehealth",
        name: i18n("AXA Dr@Live (via Emma by AXA app)", "AXA 安盛 Dr@Live"),
        providerType: "Dedicated App",
        description: i18n(
            "Virtual and physical consultation booking for designated AXA Employee Benefits policy members.",
            "為指定AXA僱員福利保單成員提供視像診症及預約實體診症。"
        ),
        contacts: [
            {
                kind: "url",
                value: "https://www.axa.com.hk/en/dr-at-live",
                label: i18n("Official page", "官方網頁"),
            },
            {
                kind: "app_ios",
                value: "https://apps.apple.com/hk/app/emma-by-axa/id1460692608",
                label: i18n("Emma by AXA (iOS)", "Emma by AXA（iOS）"),
            },
            {
                kind: "app_android",
                value: "https://play.google.com/store/apps/details?id=com.axa.hk.emma",
                label: i18n("Emma by AXA (Android)", "Emma by AXA（Android）"),
            },
        ],
        channels: [
            {
                id: "virtual_gp",
                name: i18n("Virtual doctor consultation", "視像醫生診症"),
                channelType: "video",
                primary: true,
                schedule: {
                    kind: "variable",
                    notes: i18n(
                        "Access via Emma by AXA app. Not available as a standalone consumer product.",
                        "透過Emma by AXA應用程式使用，不設獨立消費者產品。"
                    ),
                },
                eligibility: [AXA_EB_MEMBER],
                pricing: {
                    tiers: [
                        {
                            id: "eb_member",
                            label: i18n("Employee Benefits coverage", "僱員福利保障"),
                            consultation: "variable",
                            appliesWhen: [{ type: "default" }],
                            notes: i18n(
                                "Coverage per policy terms. Not sold to the general public.",
                                "按保單條款保障，不向公眾發售。"
                            ),
                        },
                    ],
                },
            },
        ],
        features: [
            customFacility("Virtual doctor consultation", "視像醫生診症"),
            customFacility("Physical consultation booking", "預約實體診症"),
        ],
        sourceUrls: [{ url: "https://www.axa.com.hk/en/dr-at-live", label: "Official AXA" }],
        lastUpdated: "2026-05-01",
    },
]
