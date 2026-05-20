/** Reviewed — hand-curated entry. */
import type { TelehealthAlternative } from "@/types/alternatives"

export const drgoTelehealth: TelehealthAlternative = {
    "slug": "drgo-telehealth",
    "category": "telehealth",
    "name": {
        "en": "DrGo",
        "zh": "DrGo",
        "cn": "DrGo"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "HKT HealthTech platform for video consultations with HK-registered doctors including GP, TCM, paediatrics and specialists.",
        "zh": "HKT健康科技平台，提供與香港註冊醫生（普通科、中醫、兒科及專科）的視像診症。",
        "cn": "HKT健康科技平台，提供與香港註冊醫生（普通科、中醫、兒科及專科）的視像診症。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.drgo.com.hk",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/drgo/id1498911504",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.hkt.nightingale",
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
                "kind": "weekly",
                "timezone": "Asia/Hong_Kong",
                "rules": [
                    {
                        "days": [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6
                        ],
                        "ranges": [
                            {
                                "start": "08:00",
                                "end": "20:00"
                            }
                        ]
                    }
                ]
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
                        "id": "standard_bundle",
                        "label": {
                            "en": "GP bundle (consultation + 3-day basic meds + delivery)",
                            "zh": "普通科套餐（診症+3天基本藥物+送藥）",
                            "cn": "普通科套餐（診症+3天基本藥物+送藥）"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 398
                        },
                        "displayAs": "from",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "includes": [
                            {
                                "en": "Up to 3-day basic medication",
                                "zh": "最多3天基本藥物",
                                "cn": "最多3天基本藥物"
                            },
                            {
                                "en": "One-time delivery",
                                "zh": "一次送藥",
                                "cn": "一次送藥"
                            }
                        ],
                        "notes": {
                            "en": "Fees vary by doctor. Extra medicines may cost more.",
                            "zh": "收費因醫生而異，額外藥物可能另收費。",
                            "cn": "收費因醫生而異，額外藥物可能另收費。"
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
                "en": "Chinese Medicine (TCM)",
                "zh": "中醫",
                "cn": "中醫"
            }
        },
        {
            "custom": {
                "en": "Paediatrics",
                "zh": "兒科",
                "cn": "兒科"
            }
        },
        {
            "custom": {
                "en": "Same-day medicine delivery",
                "zh": "即日送藥",
                "cn": "即日送藥"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same day, typically within 4 hours of consultation",
            "zh": "即日，一般於診症後4小時內",
            "cn": "即日，一般於診症後4小時內"
        },
        "medicationDelivery": "included",
        "notes": {
            "en": "First delivery included; second delivery may be chargeable.",
            "zh": "首次送藥包括在內；第二次送藥可能另收費。",
            "cn": "首次送藥包括在內；第二次送藥可能另收費。"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.drgo.com.hk/faq/",
            "label": "FAQ"
        }
    ],
    "lastUpdated": "2026-05-01"
} as TelehealthAlternative
