/** Reviewed — hand-curated entry. */
import type { TelehealthAlternative } from "@/types/alternatives"

export const axaTelehealth: TelehealthAlternative = {
    "slug": "axa-telehealth",
    "category": "telehealth",
    "name": {
        "en": "AXA Dr@Live (via Emma by AXA app)",
        "zh": "AXA 安盛 Dr@Live",
        "cn": "AXA 安盛 Dr@Live"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "Virtual and physical consultation booking for designated AXA Employee Benefits policy members.",
        "zh": "為指定AXA僱員福利保單成員提供視像診症及預約實體診症。",
        "cn": "為指定AXA僱員福利保單成員提供視像診症及預約實體診症。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.axa.com.hk/en/dr-at-live",
            "label": {
                "en": "Official page",
                "zh": "官方網頁",
                "cn": "官方網頁"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/emma-by-axa/id1460692608",
            "label": {
                "en": "Emma by AXA (iOS)",
                "zh": "Emma by AXA（iOS）",
                "cn": "Emma by AXA（iOS）"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.axa.hk.emma",
            "label": {
                "en": "Emma by AXA (Android)",
                "zh": "Emma by AXA（Android）",
                "cn": "Emma by AXA（Android）"
            }
        }
    ],
    "channels": [
        {
            "id": "virtual_gp",
            "name": {
                "en": "Virtual doctor consultation",
                "zh": "視像醫生診症",
                "cn": "視像醫生診症"
            },
            "channelType": "video",
            "primary": true,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Access via Emma by AXA app. Not available as a standalone consumer product.",
                    "zh": "透過Emma by AXA應用程式使用，不設獨立消費者產品。",
                    "cn": "透過Emma by AXA應用程式使用，不設獨立消費者產品。"
                }
            },
            "eligibility": [
                {
                    "audience": "employer_group",
                    "insurers": [
                        "axa"
                    ],
                    "summary": {
                        "en": "AXA Employee Benefits members only",
                        "zh": "只限AXA僱員福利保單成員",
                        "cn": "只限AXA僱員福利保單成員"
                    },
                    "details": {
                        "en": "For insured employees and dependents of designated AXA Employee Benefits policies only.",
                        "zh": "只限指定AXA僱員福利保單的受保僱員及其家屬。",
                        "cn": "只限指定AXA僱員福利保單的受保僱員及其家屬。"
                    }
                }
            ],
            "pricing": {
                "tiers": [
                    {
                        "id": "eb_member",
                        "label": {
                            "en": "Employee Benefits coverage",
                            "zh": "僱員福利保障",
                            "cn": "僱員福利保障"
                        },
                        "consultation": "variable",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "notes": {
                            "en": "Coverage per policy terms. Not sold to the general public.",
                            "zh": "按保單條款保障，不向公眾發售。",
                            "cn": "按保單條款保障，不向公眾發售。"
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "Virtual doctor consultation",
                "zh": "視像醫生診症",
                "cn": "視像醫生診症"
            }
        },
        {
            "custom": {
                "en": "Physical consultation booking",
                "zh": "預約實體診症",
                "cn": "預約實體診症"
            }
        }
    ],
    "sourceUrls": [
        {
            "url": "https://www.axa.com.hk/en/dr-at-live",
            "label": "Official AXA"
        }
    ],
    "lastUpdated": "2026-05-01"
} as TelehealthAlternative
