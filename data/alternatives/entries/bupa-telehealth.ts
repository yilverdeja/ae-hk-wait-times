/** Reviewed — hand-curated entry. */
import type { TelehealthAlternative } from "@/types/alternatives"

export const bupaTelehealth: TelehealthAlternative = {
    "slug": "bupa-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Bupa Video Consultation Services (via Quality HealthCare)",
        "zh": "保柏視像診症服務（透過卓健醫療）",
        "cn": "保柏視像診症服務（透過卓健醫療）"
    },
    "providerType": "Clinic Network",
    "description": {
        "en": "Video GP consultations for eligible Bupa members with door-to-door medication delivery.",
        "zh": "為合資格保柏會員提供普通科視像診症及送藥上門服務。",
        "cn": "為合資格保柏會員提供普通科視像診症及送藥上門服務。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.bupa.com.hk/en/customer-care/video-consultation-services/",
            "label": {
                "en": "Official page",
                "zh": "官方網頁",
                "cn": "官方網頁"
            }
        }
    ],
    "channels": [
        {
            "id": "video_gp",
            "name": {
                "en": "Video GP consultation",
                "zh": "普通科視像診症",
                "cn": "普通科視像診症"
            },
            "channelType": "video",
            "primary": true,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Available to eligible Bupa members via Quality HealthCare. Check Bupa for current hours.",
                    "zh": "合資格保柏會員透過卓健醫療使用，請向保柏查詢服務時間。",
                    "cn": "合資格保柏會員透過卓健醫療使用，請向保柏查詢服務時間。"
                }
            },
            "eligibility": [
                {
                    "audience": "insurance_member",
                    "insurers": [
                        "bupa"
                    ],
                    "summary": {
                        "en": "Bupa members only",
                        "zh": "只限保柏會員",
                        "cn": "只限保柏會員"
                    },
                    "details": {
                        "en": "Requires eligible Bupa medical card and network Clinical Benefit. Co-payment may apply.",
                        "zh": "須持有合資格保柏醫療卡及網絡臨床保障，可能須付共付額。",
                        "cn": "須持有合資格保柏醫療卡及網絡臨床保障，可能須付共付額。"
                    }
                }
            ],
            "pricing": {
                "tiers": [
                    {
                        "id": "member",
                        "label": {
                            "en": "Network Clinical Benefit",
                            "zh": "網絡臨床保障",
                            "cn": "網絡臨床保障"
                        },
                        "consultation": "member_covered",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "notes": {
                            "en": "Co-payment may apply. Medication delivery HK$50 (may be waived in promotions).",
                            "zh": "可能須付共付額。送藥服務HK$50（推廣期可能獲豁免）。",
                            "cn": "可能須付共付額。送藥服務HK$50（推廣期可能獲豁免）。"
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "id": "gp_consultation"
        },
        {
            "custom": {
                "en": "Door-to-door medication delivery",
                "zh": "送藥上門",
                "cn": "送藥上門"
            }
        },
        {
            "custom": {
                "en": "Free 24h in-person follow-up at QHMS",
                "zh": "24小時內免費到卓健覆診",
                "cn": "24小時內免費到卓健覆診"
            }
        }
    ],
    "delivery": {
        "medicationDelivery": {
            "currency": "HKD",
            "amount": 50
        },
        "notes": {
            "en": "Delivery fee may be waived during promotions.",
            "zh": "送藥費用於推廣期可能獲豁免。",
            "cn": "送藥費用於推廣期可能獲豁免。"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.bupa.com.hk/en/customer-care/video-consultation-services/",
            "label": "Official Bupa"
        }
    ],
    "lastUpdated": "2026-05-01"
} as TelehealthAlternative
