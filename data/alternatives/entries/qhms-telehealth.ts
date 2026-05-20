/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const qhmsTelehealth: TelehealthAlternative = {
    "slug": "qhms-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Quality HealthCare (QHMS) Video Consultation",
        "zh": "卓健醫療視像診症",
        "cn": "卓健醫療視像診症"
    },
    "providerType": "Clinic Network",
    "description": {
        "en": "One of Hong Kong's largest private outpatient healthcare providers (part of Bupa). Offers video consultation via its mobile app covering Western Medicine GP, specialists, paediatrics, mental health, dietetics, designated dental services, and Chinese medicine with same-day drug delivery.",
        "zh": "香港最大私營門診醫療服務供應商之一（保柏集團成員）。透過手機應用程式提供視像診症，涵蓋西醫普通科、專科、兒科、心理健康、營養諮詢、指定牙科服務及中醫服務，並提供即日送藥。",
        "cn": "香港最大私營門診醫療服務供應商之一（保柏集團成員）。透過手機應用程式提供視像診症，涵蓋西醫普通科、專科、兒科、心理健康、營養諮詢、指定牙科服務及中醫服務，並提供即日送藥。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.qhms.com/en/promo/video-consultation",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/quality-healthcare-mobile-app/id1493247674",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.qhms.mobileapp",
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
                    "en": "Day and night service available; consultation hours from 9:00 AM; night service extends into evening",
                    "zh": "Day and night service available; consultation hours from 9:00 AM; night service extends into evening",
                    "cn": "Day and night service available; consultation hours from 9:00 AM; night service extends into evening"
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
                            "en": "Western Medicine from HK$398 (includes 3-day basic medication); Night Service from HK$500; TCM from HK$440 (includes 4-day basic Chinese medicine) Delivery: Free basic delivery; extra HK$120 for outlying islands and remote areas Bupa members can access video consultation services through Bupa's network coverage.",
                            "zh": "Western Medicine from HK$398 (includes 3-day basic medication); Night Service from HK$500; TCM from HK$440 (includes 4-day basic Chinese medicine) Delivery: Free basic delivery; extra HK$120 for outlying islands and remote areas Bupa members can access video consultation services through Bupa's network coverage.",
                            "cn": "Western Medicine from HK$398 (includes 3-day basic medication); Night Service from HK$500; TCM from HK$440 (includes 4-day basic Chinese medicine) Delivery: Free basic delivery; extra HK$120 for outlying islands and remote areas Bupa members can access video consultation services through Bupa's network coverage."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "General Practice (GP)",
                "zh": "General Practice (GP)",
                "cn": "General Practice (GP)"
            }
        },
        {
            "custom": {
                "en": "Specialist Services",
                "zh": "Specialist Services",
                "cn": "Specialist Services"
            }
        },
        {
            "custom": {
                "en": "Paediatrics",
                "zh": "Paediatrics",
                "cn": "Paediatrics"
            }
        },
        {
            "custom": {
                "en": "Mental Health / Psychology",
                "zh": "Mental Health / Psychology",
                "cn": "Mental Health / Psychology"
            }
        },
        {
            "custom": {
                "en": "Dietetics",
                "zh": "Dietetics",
                "cn": "Dietetics"
            }
        },
        {
            "custom": {
                "en": "Designated Dental Services",
                "zh": "Designated Dental Services",
                "cn": "Designated Dental Services"
            }
        },
        {
            "custom": {
                "en": "Chinese Medicine (TCM)",
                "zh": "Chinese Medicine (TCM)",
                "cn": "Chinese Medicine (TCM)"
            }
        },
        {
            "custom": {
                "en": "Night Service",
                "zh": "Night Service",
                "cn": "Night Service"
            }
        },
        {
            "custom": {
                "en": "Virtual Nurse Service",
                "zh": "Virtual Nurse Service",
                "cn": "Virtual Nurse Service"
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
                "en": "Referral Letters",
                "zh": "Referral Letters",
                "cn": "Referral Letters"
            }
        },
        {
            "custom": {
                "en": "Same-day Medicine Delivery",
                "zh": "Same-day Medicine Delivery",
                "cn": "Same-day Medicine Delivery"
            }
        },
        {
            "custom": {
                "en": "e-Ticketing for Walk-in GP Visits",
                "zh": "e-Ticketing for Walk-in GP Visits",
                "cn": "e-Ticketing for Walk-in GP Visits"
            }
        },
        {
            "custom": {
                "en": "Health Record Tracking",
                "zh": "Health Record Tracking",
                "cn": "Health Record Tracking"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same-day if consultation completed before 3:00 PM; next day otherwise",
            "zh": "Same-day if consultation completed before 3:00 PM; next day otherwise",
            "cn": "Same-day if consultation completed before 3:00 PM; next day otherwise"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.qhms.com/en/promo/video-consultation"
        },
        {
            "url": "https://www.bupa.com.hk/en/media-centre/2020-07-21/"
        },
        {
            "url": "https://www.bowtie.com.hk/blog/zh/新冠肺炎/視像診症/"
        }
    ]
} as TelehealthAlternative
