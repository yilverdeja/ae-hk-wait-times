/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const pbhTelehealth: TelehealthAlternative = {
    "slug": "pbh-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Precious Blood Hospital (Caritas) Video Consultation",
        "zh": "寶血醫院（明愛）視像會診",
        "cn": "寶血醫院（明愛）視像會診"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "Non-profit private hospital in Sham Shui Po offering video consultation via WhatsApp booking. Suitable for patients with fever, respiratory symptoms, or COVID-19 related needs. Third-party medication delivery service available.",
        "zh": "位於深水埗的非牟利私家醫院，透過WhatsApp預約提供視像會診服務。適用於發燒、呼吸道感染徵狀或新冠相關需要的病人。設有第三方藥物送遞服務。",
        "cn": "位於深水埗的非牟利私家醫院，透過WhatsApp預約提供視像會診服務。適用於發燒、呼吸道感染徵狀或新冠相關需要的病人。設有第三方藥物送遞服務。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.pbh.hk/online-booking-telemedicine/",
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
                    "en": "Mon-Fri 9:00 AM - 6:00 PM (alternate platform available on weekends)",
                    "zh": "Mon-Fri 9:00 AM - 6:00 PM (alternate platform available on weekends)",
                    "cn": "Mon-Fri 9:00 AM - 6:00 PM (alternate platform available on weekends)"
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
                            "en": "HK$480 - HK$800 (consultation fee only; medication and delivery extra) Delivery: Kowloon: from HK$200/delivery; HK Island & New Territories: from HK$300/delivery Only for persons 18+ with FPS account. Payment via FPS (Faster Payment System). Not eligible for insurance claims or health care vouchers. Weekday morning consultations get same-day delivery.",
                            "zh": "HK$480 - HK$800 (consultation fee only; medication and delivery extra) Delivery: Kowloon: from HK$200/delivery; HK Island & New Territories: from HK$300/delivery Only for persons 18+ with FPS account. Payment via FPS (Faster Payment System). Not eligible for insurance claims or health care vouchers. Weekday morning consultations get same-day delivery.",
                            "cn": "HK$480 - HK$800 (consultation fee only; medication and delivery extra) Delivery: Kowloon: from HK$200/delivery; HK Island & New Territories: from HK$300/delivery Only for persons 18+ with FPS account. Payment via FPS (Faster Payment System). Not eligible for insurance claims or health care vouchers. Weekday morning consultations get same-day delivery."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "General Practice Video Consultation",
                "zh": "General Practice Video Consultation",
                "cn": "General Practice Video Consultation"
            }
        },
        {
            "custom": {
                "en": "Respiratory Infection / Fever Assessment",
                "zh": "Respiratory Infection / Fever Assessment",
                "cn": "Respiratory Infection / Fever Assessment"
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
                "en": "Medication Delivery (Third-party)",
                "zh": "Medication Delivery (Third-party)",
                "cn": "Medication Delivery (Third-party)"
            }
        },
        {
            "custom": {
                "en": "WhatsApp Booking",
                "zh": "WhatsApp Booking",
                "cn": "WhatsApp Booking"
            }
        },
        {
            "custom": {
                "en": "Alternate Weekend Platform Available",
                "zh": "Alternate Weekend Platform Available",
                "cn": "Alternate Weekend Platform Available"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same day if consultation and payment completed in the morning (Mon-Fri); next working day if after 12:00 PM or for remote areas like Tung Chung",
            "zh": "Same day if consultation and payment completed in the morning (Mon-Fri); next working day if after 12:00 PM or for remote areas like Tung Chung",
            "cn": "Same day if consultation and payment completed in the morning (Mon-Fri); next working day if after 12:00 PM or for remote areas like Tung Chung"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.pbh.hk/online-booking-telemedicine/"
        },
        {
            "url": "https://www.stheadline.com/health-edu/3547881"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        }
    ]
} as TelehealthAlternative
