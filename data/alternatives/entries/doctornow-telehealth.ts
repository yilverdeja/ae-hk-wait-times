/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const doctornowTelehealth: TelehealthAlternative = {
    "slug": "doctornow-telehealth",
    "category": "telehealth",
    "name": {
        "en": "DoctorNow",
        "zh": "DoctorNow",
        "cn": "DoctorNow"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "Founded in 2016 as Hong Kong's first telemedicine provider. Offers GP and specialist video consultations via its proprietary encrypted app with same-day medicine delivery. Also powers Cigna Virtual Health Service. A founding member of the Hong Kong Telemedicine Association.",
        "zh": "2016年成立，為香港首個遙距醫療服務供應商。透過自家研發的加密應用程式提供普通科及專科視像診症，並提供即日送藥服務。亦為信諾虛擬醫療服務的技術供應商，及香港遠程醫療協會創始成員。",
        "cn": "2016年成立，為香港首個遙距醫療服務供應商。透過自家研發的加密應用程式提供普通科及專科視像診症，並提供即日送藥服務。亦為信諾虛擬醫療服務的技術供應商，及香港遠程醫療協會創始成員。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://app.doctornow.hk",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/app/doctornow/id1447498730",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=com.doctornow.hk",
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
                    "en": "Immediate or scheduled appointments; service hours vary by doctor availability",
                    "zh": "Immediate or scheduled appointments; service hours vary by doctor availability",
                    "cn": "Immediate or scheduled appointments; service hours vary by doctor availability"
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
                            "en": "All consultation and medicine delivery charges are clearly listed before booking in the app. Electronic receipts provided for insurance claims.",
                            "zh": "All consultation and medicine delivery charges are clearly listed before booking in the app. Electronic receipts provided for insurance claims.",
                            "cn": "All consultation and medicine delivery charges are clearly listed before booking in the app. Electronic receipts provided for insurance claims."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "GP Consultation",
                "zh": "GP Consultation",
                "cn": "GP Consultation"
            }
        },
        {
            "custom": {
                "en": "Specialist Consultation",
                "zh": "Specialist Consultation",
                "cn": "Specialist Consultation"
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
                "en": "Proprietary Encrypted Video Platform",
                "zh": "Proprietary Encrypted Video Platform",
                "cn": "Proprietary Encrypted Video Platform"
            }
        },
        {
            "custom": {
                "en": "DoctorNow NEEDS (elderly door-to-door service)",
                "zh": "DoctorNow NEEDS (elderly door-to-door service)",
                "cn": "DoctorNow NEEDS (elderly door-to-door service)"
            }
        },
        {
            "custom": {
                "en": "Corporate/B2B Telemedicine Solutions",
                "zh": "Corporate/B2B Telemedicine Solutions",
                "cn": "Corporate/B2B Telemedicine Solutions"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same-day medication delivery",
            "zh": "Same-day medication delivery",
            "cn": "Same-day medication delivery"
        }
    },
    "sourceUrls": [
        {
            "url": "https://app.doctornow.hk/telemedicine/"
        },
        {
            "url": "https://hk.linkedin.com/company/doctornow-hk"
        },
        {
            "url": "https://hktelemed.org/doctornowneeds/"
        }
    ]
} as TelehealthAlternative
