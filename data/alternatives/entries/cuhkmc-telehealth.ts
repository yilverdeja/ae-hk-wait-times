/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const cuhkmcTelehealth: TelehealthAlternative = {
    "slug": "cuhkmc-telehealth",
    "category": "telehealth",
    "name": {
        "en": "CUHK Medical Centre Telemedicine",
        "zh": "香港中文大學醫院遠程醫療",
        "cn": "香港中文大學醫院遠程醫療"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "University-affiliated private hospital offering telemedicine for specialist outpatient and paediatric follow-up patients (existing patients only). Medication delivery or 24-hour pharmacy self-collection available.",
        "zh": "大學附屬私家醫院，為專科門診及兒科覆診病人（僅限已登記舊症）提供遠程醫療服務。可選擇藥物送遞或到院24小時藥房自取。",
        "cn": "大學附屬私家醫院，為專科門診及兒科覆診病人（僅限已登記舊症）提供遠程醫療服務。可選擇藥物送遞或到院24小時藥房自取。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.cuhkmc.hk/tc/hospital-service/telemedicine-service",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
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
                    "en": "Mon-Fri 9:30 AM - 5:00 PM, Sat 9:30 AM - 1:00 PM (appointment changes only during these hours)",
                    "zh": "Mon-Fri 9:30 AM - 5:00 PM, Sat 9:30 AM - 1:00 PM (appointment changes only during these hours)",
                    "cn": "Mon-Fri 9:30 AM - 5:00 PM, Sat 9:30 AM - 1:00 PM (appointment changes only during these hours)"
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
                            "en": "HK$200 registration fee (deducted from final consultation and medication fees) + doctor's fee and medication fees per price list Delivery: HK$150 per delivery address Registration fee must be paid on booking day via FPS or bank transfer, or appointment may be cancelled. Existing follow-up patients only for specialist and paediatric telemedicine.",
                            "zh": "HK$200 registration fee (deducted from final consultation and medication fees) + doctor's fee and medication fees per price list Delivery: HK$150 per delivery address Registration fee must be paid on booking day via FPS or bank transfer, or appointment may be cancelled. Existing follow-up patients only for specialist and paediatric telemedicine.",
                            "cn": "HK$200 registration fee (deducted from final consultation and medication fees) + doctor's fee and medication fees per price list Delivery: HK$150 per delivery address Registration fee must be paid on booking day via FPS or bank transfer, or appointment may be cancelled. Existing follow-up patients only for specialist and paediatric telemedicine."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "Specialist Outpatient Follow-up",
                "zh": "Specialist Outpatient Follow-up",
                "cn": "Specialist Outpatient Follow-up"
            }
        },
        {
            "custom": {
                "en": "Paediatric Follow-up",
                "zh": "Paediatric Follow-up",
                "cn": "Paediatric Follow-up"
            }
        },
        {
            "custom": {
                "en": "Medication Delivery",
                "zh": "Medication Delivery",
                "cn": "Medication Delivery"
            }
        },
        {
            "custom": {
                "en": "24-Hour Pharmacy Self-Collection",
                "zh": "24-Hour Pharmacy Self-Collection",
                "cn": "24-Hour Pharmacy Self-Collection"
            }
        },
        {
            "custom": {
                "en": "Existing Patients Only",
                "zh": "Existing Patients Only",
                "cn": "Existing Patients Only"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Next working day after full payment confirmed (no delivery on weekends; Fri/Sat consultations receive medication by the following Tuesday)",
            "zh": "Next working day after full payment confirmed (no delivery on weekends; Fri/Sat consultations receive medication by the following Tuesday)",
            "cn": "Next working day after full payment confirmed (no delivery on weekends; Fri/Sat consultations receive medication by the following Tuesday)"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.cuhkmc.hk/tc/hospital-service/telemedicine-service"
        },
        {
            "url": "https://www.stheadline.com/health-edu/3547881"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        }
    ]
} as TelehealthAlternative
