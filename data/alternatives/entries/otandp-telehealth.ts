/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const otandpTelehealth: TelehealthAlternative = {
    "slug": "otandp-telehealth",
    "category": "telehealth",
    "name": {
        "en": "OT&P Healthcare Teleconsultation",
        "zh": "領康醫療遙距診症",
        "cn": "領康醫療遙距診症"
    },
    "providerType": "Clinic Network",
    "description": {
        "en": "Internationally accredited (ACHS) private clinic group in Hong Kong offering teleconsultation services. Established in 1994, operates 8 clinics with 80+ medical professionals covering general practice, paediatrics, psychiatry, psychology, physiotherapy, and more.",
        "zh": "國際認證（ACHS）的香港私營診所集團，提供遙距診症服務。1994年創立，營運8間診所，逾80位醫療專業人員，涵蓋普通科、兒科、精神科、心理學、物理治療等。",
        "cn": "國際認證（ACHS）的香港私營診所集團，提供遙距診症服務。1994年創立，營運8間診所，逾80位醫療專業人員，涵蓋普通科、兒科、精神科、心理學、物理治療等。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.otandp.com/blog/telemedicine-in-hong-kong",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/ot-p-healthcare/id1524373498",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.otandp.app",
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
                    "en": "By appointment via hotline (2155 9055); follows regular clinic hours",
                    "zh": "By appointment via hotline (2155 9055); follows regular clinic hours",
                    "cn": "By appointment via hotline (2155 9055); follows regular clinic hours"
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
                            "en": "Over 35 direct billing agreements with insurance companies. First clinic in Hong Kong accredited by the Australian Council on Healthcare Standards (ACHS). Book via appointment hotline 2155 9055.",
                            "zh": "Over 35 direct billing agreements with insurance companies. First clinic in Hong Kong accredited by the Australian Council on Healthcare Standards (ACHS). Book via appointment hotline 2155 9055.",
                            "cn": "Over 35 direct billing agreements with insurance companies. First clinic in Hong Kong accredited by the Australian Council on Healthcare Standards (ACHS). Book via appointment hotline 2155 9055."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "General Practice",
                "zh": "General Practice",
                "cn": "General Practice"
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
                "en": "Psychiatry",
                "zh": "Psychiatry",
                "cn": "Psychiatry"
            }
        },
        {
            "custom": {
                "en": "Psychology & Counselling",
                "zh": "Psychology & Counselling",
                "cn": "Psychology & Counselling"
            }
        },
        {
            "custom": {
                "en": "Insurance Direct Billing (35+ insurers)",
                "zh": "Insurance Direct Billing (35+ insurers)",
                "cn": "Insurance Direct Billing (35+ insurers)"
            }
        },
        {
            "custom": {
                "en": "Multilingual (English, Cantonese, Mandarin)",
                "zh": "Multilingual (English, Cantonese, Mandarin)",
                "cn": "Multilingual (English, Cantonese, Mandarin)"
            }
        },
        {
            "custom": {
                "en": "International Accreditation (ACHS)",
                "zh": "International Accreditation (ACHS)",
                "cn": "International Accreditation (ACHS)"
            }
        }
    ],
    "sourceUrls": [
        {
            "url": "https://www.otandp.com/blog/telemedicine-in-hong-kong"
        },
        {
            "url": "https://www.otandp.com/"
        }
    ]
} as TelehealthAlternative
