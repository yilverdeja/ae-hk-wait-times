/** Reviewed — hand-curated entry. */
import { customFacility, facility } from "@/lib/alternatives/catalog"
import { i18n } from "@/lib/i18n"
import type { PhysicalAlternative } from "@/types/alternatives"
import { EXCLUDES_CONSULTATION_STANDARD, OPEN_PUBLIC } from "../shared"

const HKAH_URGENT_CARE_PAGE = i18n(
    "https://www.hkah.org.hk/en/specialist-clinics/24-7-urgent-care-clinic",
    "https://www.hkah.org.hk/tc/specialist-clinics/24-7-urgent-care-clinic",
    "https://www.hkah.org.hk/sc/specialist-clinics/24-7-urgent-care-clinic"
)

export const adventistHospitalStubbsRoad: PhysicalAlternative = {
    slug: "adventist-hospital-stubbs-road",
    category: "24hour",
    name: i18n("Hong Kong Adventist Hospital – Stubbs Road", "香港港安醫院－司徒拔道"),
    providerType: "Private Hospital",
    description: i18n(
        "24/7 urgent care clinic staffed by emergency medicine specialists. Walk-in accepted. Emergency response team can mobilise doctors, nurses, and specialists at short notice, including paediatric urgent care.",
        "由急症科專科醫生提供24小時急症門診，接受即時求診。急症應變團隊可迅速調動醫生、護士及專科支援，並提供兒童急症服務。"
    ),
    location: {
        district: "Happy Valley",
        address: i18n(
            "G/F, Hong Kong Adventist Hospital – Stubbs Road, 40 Stubbs Road, Hong Kong",
            "香港司徒拔道40號香港港安醫院－司徒拔道地下"
        ),
        coordinates: { latitude: 22.2634133, longitude: 114.1841954 },
    },
    contacts: [
        { kind: "phone", value: "3651 8991", label: i18n("24-hour urgent care", "24小時急症門診") },
        {
            kind: "whatsapp",
            value: "36518808",
            label: i18n("WhatsApp / WeChat", "WhatsApp／微信"),
        },
        {
            kind: "url",
            value: HKAH_URGENT_CARE_PAGE,
            label: i18n("24-hour urgent care clinic", "24小時急症門診", "24小时急症门诊"),
        },
        {
            kind: "url",
            value: "https://maps.app.goo.gl/wUbqPmM9TBrcJkdZ7",
            label: i18n("Google Maps", "Google地圖", "Google地图"),
        },
    ],
    channels: [
        {
            id: "24h_urgent_care",
            name: i18n("24-hour urgent care clinic", "24小時急症門診"),
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: {
                walkIn: true,
                methods: i18n(
                    "Walk-in, phone (3651 8991), or WhatsApp / WeChat (36518808)",
                    "即時、電話（3651 8991）或WhatsApp／微信（36518808）"
                ),
            },
            pricing: {
                tiers: [
                    {
                        id: "initial",
                        label: i18n(
                            "Urgent care consultation (initial)",
                            "急症診症（首次）",
                            "急症诊症（首次）"
                        ),
                        consultation: { currency: "HKD", amount: 1200 },
                        appliesWhen: [{ type: "default" }],
                        excludes: EXCLUDES_CONSULTATION_STANDARD,
                    },
                ],
                displayNotes: i18n(
                    "Initial consultation fee for emergency medicine / urgent care only. Excludes minor procedures, medication, laboratory services, and medical supplies. Total charges depend on the attending doctor's assessment of the patient's condition.",
                    "只包括急症科首次診症診金，不包括小型手術、藥物、化驗及醫療用品。實際收費視當值醫生對病人情況的評估而定。"
                ),
            },
        },
    ],
    facilities: [
        facility("xray"),
        facility("pharmacy"),
        facility("laboratory"),
        facility("ecg"),
        customFacility("Emergency angioplasty (24/7)", "緊急通波仔（24小時）"),
        customFacility(
            "Hybrid cardiac catheterization & interventional operating room",
            "混合式心導管及介入治療手術室"
        ),
        customFacility("Special care ward (24-hour monitoring)", "特別護理病房（24小時監察）"),
        customFacility("Stroke emergency (thrombolytic therapy)", "中風急症（溶栓治療）"),
        customFacility("Orthopedic trauma (cast, reduction, braces)", "骨科創傷（石膏、復位、支架）"),
    ],
    scope: {
        hasAe: true,
        urgencyLevel: "emergency_capable",
        summary: i18n(
            "24/7 urgent care clinic with emergency medicine specialists and emergency response capabilities.",
            "24小時急症門診，由急症科專科醫生提供及具急症應變能力。"
        ),
    },
    sourceUrls: [
        {
            url: HKAH_URGENT_CARE_PAGE,
            label: i18n("Official 24-hour urgent care", "官方24小時急症門診", "官方24小时急症门诊"),
        },
    ],
    lastUpdated: "2026-05-20",
}
