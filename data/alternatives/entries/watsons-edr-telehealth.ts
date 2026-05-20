/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const watsonsEdrTelehealth: TelehealthAlternative = {
    "slug": "watsons-edr-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Watsons eDr",
        "zh": "屈臣氏 eDr",
        "cn": "屈臣氏 eDr"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "Watsons Hong Kong's online doctor app offering 1-on-1 live video consultations with licensed GPs and Chinese Medicine Practitioners. Part of A.S. Watson Group (CK Hutchison). Features a 3-Highs chronic disease management program and as-fast-as-3-minute booking.",
        "zh": "屈臣氏香港推出的視像醫生應用程式，提供註冊西醫及中醫一對一即時視像診症服務。隸屬屈臣氏集團（長江和記實業成員）。設有三高慢性病管理計劃，最快3分鐘即可見醫生。",
        "cn": "屈臣氏香港推出的視像醫生應用程式，提供註冊西醫及中醫一對一即時視像診症服務。隸屬屈臣氏集團（長江和記實業成員）。設有三高慢性病管理計劃，最快3分鐘即可見醫生。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.watsons.com.hk/en/watsons_edr",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/watsons-edr/id1455830207",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.asw.health",
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
                    "en": "Day service and night service available (exact hours displayed in-app; night service extends evening availability)",
                    "zh": "Day service and night service available (exact hours displayed in-app; night service extends evening availability)",
                    "cn": "Day service and night service available (exact hours displayed in-app; night service extends evening availability)"
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
                            "en": "Night service available at higher rates. Includes GP and TCM options. Pricing displayed in-app before booking.",
                            "zh": "Night service available at higher rates. Includes GP and TCM options. Pricing displayed in-app before booking.",
                            "cn": "Night service available at higher rates. Includes GP and TCM options. Pricing displayed in-app before booking."
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
                "en": "3-Highs GO Plan (Chronic Disease Management)",
                "zh": "3-Highs GO Plan (Chronic Disease Management)",
                "cn": "3-Highs GO Plan (Chronic Disease Management)"
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
                "en": "As-fast-as-3-minute Booking",
                "zh": "As-fast-as-3-minute Booking",
                "cn": "As-fast-as-3-minute Booking"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same-day medication delivery; as fast as 4 hours for designated time slots",
            "zh": "Same-day medication delivery; as fast as 4 hours for designated time slots",
            "cn": "Same-day medication delivery; as fast as 4 hours for designated time slots"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.watsons.com.hk/en/watsons_edr"
        },
        {
            "url": "https://www.watsonsasia.com/news/online-doctor-consultation/"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        }
    ]
} as TelehealthAlternative
