/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const cignaTelehealth: TelehealthAlternative = {
    "slug": "cigna-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Cigna Virtual Health Service",
        "zh": "信諾虛擬醫療服務",
        "cn": "信諾虛擬醫療服務"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "Cigna Healthcare's virtual consultation service powered by DoctorNow, offering video consultations with HK-registered doctors. Available to Cigna employer group insurance members and also as a standalone subscription. Includes specialist referrals, doctor's certificates, and same-day medication delivery.",
        "zh": "信諾醫療保健透過DoctorNow提供的虛擬診症服務，提供與香港註冊醫生的視像診症。適用於信諾僱主團體保險會員，亦可獨立訂閱。包括專科轉介、醫生證明書及即日送藥服務。",
        "cn": "信諾醫療保健透過DoctorNow提供的虛擬診症服務，提供與香港註冊醫生的視像診症。適用於信諾僱主團體保險會員，亦可獨立訂閱。包括專科轉介、醫生證明書及即日送藥服務。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.cigna.com.hk/en/telehealth-service-virtual-consultation-app",
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
                    "en": "8:00 AM - 8:00 PM, Monday to Sunday (except public holidays for Telehealth Service)",
                    "zh": "8:00 AM - 8:00 PM, Monday to Sunday (except public holidays for Telehealth Service)",
                    "cn": "8:00 AM - 8:00 PM, Monday to Sunday (except public holidays for Telehealth Service)"
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
                            "en": "First GP virtual consultation from HK$75 (promotional pricing with Mastercard); Telehealth Service subscription from HK$100 Delivery: Included (except outlying islands) Cigna group insurance members can enter Member Code for coverage. Free face-to-face follow-up within 2 working days if virtual consultation cannot resolve issue. OTC medicine delivery via Mannings / Teladoc Health for Telehealth Service.",
                            "zh": "First GP virtual consultation from HK$75 (promotional pricing with Mastercard); Telehealth Service subscription from HK$100 Delivery: Included (except outlying islands) Cigna group insurance members can enter Member Code for coverage. Free face-to-face follow-up within 2 working days if virtual consultation cannot resolve issue. OTC medicine delivery via Mannings / Teladoc Health for Telehealth Service.",
                            "cn": "First GP virtual consultation from HK$75 (promotional pricing with Mastercard); Telehealth Service subscription from HK$100 Delivery: Included (except outlying islands) Cigna group insurance members can enter Member Code for coverage. Free face-to-face follow-up within 2 working days if virtual consultation cannot resolve issue. OTC medicine delivery via Mannings / Teladoc Health for Telehealth Service."
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
                "en": "Specialist Referrals",
                "zh": "Specialist Referrals",
                "cn": "Specialist Referrals"
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
                "en": "Same-day Medicine Delivery",
                "zh": "Same-day Medicine Delivery",
                "cn": "Same-day Medicine Delivery"
            }
        },
        {
            "custom": {
                "en": "Free Face-to-Face Follow-up (within 2 working days)",
                "zh": "Free Face-to-Face Follow-up (within 2 working days)",
                "cn": "Free Face-to-Face Follow-up (within 2 working days)"
            }
        },
        {
            "custom": {
                "en": "Electronic Medical Receipt",
                "zh": "Electronic Medical Receipt",
                "cn": "Electronic Medical Receipt"
            }
        },
        {
            "custom": {
                "en": "Insurance Direct Billing (for Cigna members)",
                "zh": "Insurance Direct Billing (for Cigna members)",
                "cn": "Insurance Direct Billing (for Cigna members)"
            }
        },
        {
            "custom": {
                "en": "OTC Medicine Delivery via Mannings",
                "zh": "OTC Medicine Delivery via Mannings",
                "cn": "OTC Medicine Delivery via Mannings"
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
            "url": "https://www.cigna.com.hk/en/telehealth-service-virtual-consultation-app"
        },
        {
            "url": "https://www.cigna.com.hk/en/cigna-telehealth-service"
        },
        {
            "url": "https://www.cigna.com.hk/en/smarthealth/medical/video-medical-consultation-and-telehealth-service"
        }
    ]
} as TelehealthAlternative
