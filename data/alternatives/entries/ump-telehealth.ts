/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const umpTelehealth: TelehealthAlternative = {
    "slug": "ump-telehealth",
    "category": "telehealth",
    "name": {
        "en": "UMP Healthcare Virtual Care Service",
        "zh": "聯合醫務虛擬診症服務",
        "cn": "聯合醫務虛擬診症服務"
    },
    "providerType": "Clinic Network",
    "description": {
        "en": "One of Hong Kong's largest and longest-established listed medical groups (SEHK: 722) offering virtual care video consultations. Covers general medical consultations, chronic disease follow-up, and health management. Medication can be picked up at designated pharmacies or delivered.",
        "zh": "香港最大及歷史最悠久的上市醫療集團之一（港交所：722），提供虛擬診症視像服務。涵蓋普通科診症、慢性病跟進及健康管理。藥物可於指定藥房取藥或安排送遞。",
        "cn": "香港最大及歷史最悠久的上市醫療集團之一（港交所：722），提供虛擬診症視像服務。涵蓋普通科診症、慢性病跟進及健康管理。藥物可於指定藥房取藥或安排送遞。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.www2.ump.com.hk/server.php?id=67&lang_id=2",
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
                    "en": "Mon-Fri 9:00 AM - 6:00 PM; limited evening and Saturday service",
                    "zh": "Mon-Fri 9:00 AM - 6:00 PM; limited evening and Saturday service",
                    "cn": "Mon-Fri 9:00 AM - 6:00 PM; limited evening and Saturday service"
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
                            "en": "Consultation fee displayed during booking with secure online payment. Electronic prescriptions issued after consultation. Network of 1,100+ self-owned and affiliated medical service points in Hong Kong and Macau.",
                            "zh": "Consultation fee displayed during booking with secure online payment. Electronic prescriptions issued after consultation. Network of 1,100+ self-owned and affiliated medical service points in Hong Kong and Macau.",
                            "cn": "Consultation fee displayed during booking with secure online payment. Electronic prescriptions issued after consultation. Network of 1,100+ self-owned and affiliated medical service points in Hong Kong and Macau."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "General Practice Consultation",
                "zh": "General Practice Consultation",
                "cn": "General Practice Consultation"
            }
        },
        {
            "custom": {
                "en": "Chronic Disease Follow-up",
                "zh": "Chronic Disease Follow-up",
                "cn": "Chronic Disease Follow-up"
            }
        },
        {
            "custom": {
                "en": "Health Management",
                "zh": "Health Management",
                "cn": "Health Management"
            }
        },
        {
            "custom": {
                "en": "Medication Delivery or Pharmacy Pickup",
                "zh": "Medication Delivery or Pharmacy Pickup",
                "cn": "Medication Delivery or Pharmacy Pickup"
            }
        },
        {
            "custom": {
                "en": "Electronic Prescriptions",
                "zh": "Electronic Prescriptions",
                "cn": "Electronic Prescriptions"
            }
        },
        {
            "custom": {
                "en": "Corporate Healthcare Solutions",
                "zh": "Corporate Healthcare Solutions",
                "cn": "Corporate Healthcare Solutions"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Pickup at designated pharmacies or delivery available",
            "zh": "Pickup at designated pharmacies or delivery available",
            "cn": "Pickup at designated pharmacies or delivery available"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.www2.ump.com.hk/server.php?id=67&lang_id=2"
        },
        {
            "url": "https://group.ump.com.hk/en/media/news-room/news-detail/36/UMP-Healthcare-Offers-Free-Telemedicine-Service-to-COVID-19-Patients"
        }
    ]
} as TelehealthAlternative
