import { facility, customFacility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { DayOfWeek, FeeTier, PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

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

const gleneaglesOutpatientTiers: FeeTier[] = [
    // Mon–Fri (not public holiday — PH tiers below take precedence via higher specificity)
    outpatientTier("mf_day", "Mon–Fri day", "周一至五日間", 420, WEEKDAYS, "09:00", "20:00"),
    outpatientTier("mf_evening", "Mon–Fri evening", "周一至五晚上", 600, WEEKDAYS, "20:00", "24:00"),
    outpatientTier("mf_overnight", "Mon–Fri overnight", "周一至五深夜", 1000, WEEKDAYS, "00:00", "09:00"),
    // Saturday (not public holiday)
    outpatientTier("sat_morning", "Sat morning", "周六上午", 420, SATURDAY, "09:00", "13:00"),
    outpatientTier("sat_afternoon", "Sat afternoon–night", "周六下午至晚上", 600, SATURDAY, "13:00", "24:00"),
    outpatientTier("sat_overnight", "Sat overnight", "周六深夜", 1000, SATURDAY, "00:00", "09:00"),
    // Sunday
    outpatientTier("sun_day", "Sun day", "周日日間", 600, SUNDAY, "09:00", "20:00"),
    outpatientTier("sun_evening", "Sun evening", "周日晚上", 1000, SUNDAY, "20:00", "24:00"),
    outpatientTier("sun_overnight", "Sun overnight", "周日深夜", 1000, SUNDAY, "00:00", "09:00"),
    // Public holidays (same rates as Sunday per hospital fee table)
    publicHolidayTier("ph_day", "Public holiday day", "公眾假期日間", 600, "09:00", "20:00"),
    publicHolidayTier("ph_evening", "Public holiday evening", "公眾假期晚上", 1000, "20:00", "24:00"),
    publicHolidayTier("ph_overnight", "Public holiday overnight", "公眾假期深夜", 1000, "00:00", "09:00"),
]

export const gleneaglesHospitalHk: PhysicalAlternative = {
    slug: "gleneagles-hospital-hk",
    category: "24hour",
    name: i18n("Gleneagles Hospital Hong Kong", "港怡醫院"),
    providerType: "Private Hospital",
    description: i18n(
        "Round-the-clock outpatient and emergency services on Hong Kong Island. At least two doctors on duty including an emergency medicine specialist.",
        "港島24小時門診及急症服務，至少有兩名醫生當值，包括急症科專科醫生。"
    ),
    location: {
        district: "Wong Chuk Hang",
        address: i18n("1 Nam Fung Path, Wong Chuk Hang, Hong Kong", "香港黃竹坑南風徑1號"),
        coordinates: { latitude: 22.248, longitude: 114.174 },
    },
    contacts: [
        { kind: "phone", value: "3153 9000", label: i18n("General", "總機") },
        {
            kind: "url",
            value: "https://gleneagles.hk/facilities-services/explore-facilities-and-services/general-facilities/24-hour-outpatient-and-emergency",
            label: i18n("24-hour OPD & emergency", "24小時門診及急症"),
        },
    ],
    channels: [
        {
            id: "24h_opd",
            name: i18n("24-hour outpatient & emergency", "24小時門診及急症室"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: gleneaglesOutpatientTiers,
                displayNotes: i18n(
                    "Outpatient consultation fee only. Excludes medication, laboratory tests, minor procedures, and other services. Critical-case consultation is HK$1,500 at most times (separate from general outpatient fees).",
                    "只包括門診診金，不包括藥物、化驗、小型手術及其他服務。危殆個案診金於大部分時段為HK$1,500（與一般門診診金分開計算）。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        facility("resuscitation"),
        facility("observation_beds"),
        facility("ct_scanner"),
        facility("mri"),
        customFacility("Triage zone (infection control)", "分流區（感染控制）"),
        customFacility("Dialysis centre", "透析中心"),
        facility("endoscopy"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24-hour outpatient and emergency department on Hong Kong Island.",
            "港島24小時門診及急症室。"
        ),
    },
    acceptedVouchers: [{ id: "hcvs" }],
    sourceUrls: [
        {
            url: "https://gleneagles.hk/facilities-services/explore-facilities-and-services/general-facilities/24-hour-outpatient-and-emergency",
            label: "Official fees & hours",
        },
    ],
    lastUpdated: "2026-05-20",
}
