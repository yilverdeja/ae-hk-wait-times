/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const gleneaglesHospitalTelehealth: TelehealthAlternative = {
    "slug": "gleneagles-hospital-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Gleneagles Hospital Hong Kong - Virtual Consultation",
        "zh": "港怡醫院視像會診",
        "cn": "港怡醫院視像會診"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "Private hospital offering both GP and specialist virtual consultations. GP service includes 3-day basic medications and delivery. Specialist virtual consultations are available for existing follow-up patients across 7 designated specialties. Also offers a 2-person conjoint consultation option.",
        "zh": "私家醫院提供普通科及專科視像會診服務。普通科服務包括三天基本藥物及送遞。專科視像會診適用於七個指定專科的覆診病人。亦設有二人聯合視像會診選項。",
        "cn": "私家醫院提供普通科及專科視像會診服務。普通科服務包括三天基本藥物及送遞。專科視像會診適用於七個指定專科的覆診病人。亦設有二人聯合視像會診選項。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://gleneagles.hk/facilities-services/general-practice-virtual-consultation",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/my-gleneagles-smarthealth/id1487498498",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.ihh.gleneagleshk",
            "label": {
                "en": "Android app",
                "zh": "Android 應用程式",
                "cn": "Android 應用程式"
            }
        }
    ],
    "channels": [
        {
            "id": "video_gp",
            "name": {
                "en": "Video consultation",
                "zh": "視像診症",
                "cn": "視像診症"
            },
            "channelType": "video",
            "primary": true,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "GP Virtual Consultation: Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM; also available Sundays and public holidays",
                    "zh": "GP Virtual Consultation: Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM; also available Sundays and public holidays",
                    "cn": "GP Virtual Consultation: Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM; also available Sundays and public holidays"
                }
            },
            "eligibility": [
                {
                    "audience": "open",
                    "summary": {
                        "en": "Open to public",
                        "zh": "開放予公眾",
                        "cn": "开放予公众"
                    }
                }
            ],
            "pricing": {
                "tiers": [
                    {
                        "id": "default",
                        "label": {
                            "en": "Consultation",
                            "zh": "診症",
                            "cn": "診症"
                        },
                        "consultation": "variable",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "notes": {
                            "en": "GP: From HK$468 (Mon-Fri/Sat, includes basic medication and delivery); Sun/PH: HK$998 for conjoint (2-person) consultation Delivery: Included in GP virtual consultation package; additional medication charges apply for non-basic prescriptions Service valid from 1 Jan 2026 to 31 Dec 2026. GP available for new and existing patients aged 6+. Specialist VC for existing follow-up patients only. Male-only designated medication consultation for patients 18+.",
                            "zh": "GP: From HK$468 (Mon-Fri/Sat, includes basic medication and delivery); Sun/PH: HK$998 for conjoint (2-person) consultation Delivery: Included in GP virtual consultation package; additional medication charges apply for non-basic prescriptions Service valid from 1 Jan 2026 to 31 Dec 2026. GP available for new and existing patients aged 6+. Specialist VC for existing follow-up patients only. Male-only designated medication consultation for patients 18+.",
                            "cn": "GP: From HK$468 (Mon-Fri/Sat, includes basic medication and delivery); Sun/PH: HK$998 for conjoint (2-person) consultation Delivery: Included in GP virtual consultation package; additional medication charges apply for non-basic prescriptions Service valid from 1 Jan 2026 to 31 Dec 2026. GP available for new and existing patients aged 6+. Specialist VC for existing follow-up patients only. Male-only designated medication consultation for patients 18+."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "General Practice (GP) Virtual Consultation",
                "zh": "General Practice (GP) Virtual Consultation",
                "cn": "General Practice (GP) Virtual Consultation"
            }
        },
        {
            "custom": {
                "en": "Specialist Virtual Consultation (7 specialties)",
                "zh": "Specialist Virtual Consultation (7 specialties)",
                "cn": "Specialist Virtual Consultation (7 specialties)"
            }
        },
        {
            "custom": {
                "en": "2-Person Conjoint Virtual Consultation",
                "zh": "2-Person Conjoint Virtual Consultation",
                "cn": "2-Person Conjoint Virtual Consultation"
            }
        },
        {
            "custom": {
                "en": "Paediatrics (aged 6+)",
                "zh": "Paediatrics (aged 6+)",
                "cn": "Paediatrics (aged 6+)"
            }
        },
        {
            "custom": {
                "en": "Oncology",
                "zh": "Oncology",
                "cn": "Oncology"
            }
        },
        {
            "custom": {
                "en": "Gastroenterology & Hepatology",
                "zh": "Gastroenterology & Hepatology",
                "cn": "Gastroenterology & Hepatology"
            }
        },
        {
            "custom": {
                "en": "Medical Certificate (Sick Leave)",
                "zh": "Medical Certificate (Sick Leave)",
                "cn": "Medical Certificate (Sick Leave)"
            }
        },
        {
            "custom": {
                "en": "Medication Delivery Included (GP)",
                "zh": "Medication Delivery Included (GP)",
                "cn": "Medication Delivery Included (GP)"
            }
        },
        {
            "custom": {
                "en": "Online Appointment Booking",
                "zh": "Online Appointment Booking",
                "cn": "Online Appointment Booking"
            }
        }
    ],
    "sourceUrls": [
        {
            "url": "https://gleneagles.hk/facilities-services/general-practice-virtual-consultation"
        },
        {
            "url": "https://gleneagles.hk/facilities-services/virtual-consultation"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        }
    ]
} as TelehealthAlternative
