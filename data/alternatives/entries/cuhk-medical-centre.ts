/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const cuhkMedicalCentre: PhysicalAlternative = {
    "slug": "cuhk-medical-centre",
    "category": "24hour",
    "name": {
        "en": "CUHK Medical Centre",
        "zh": "香港中文大學醫院",
        "cn": "香港中文大學醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Sha Tin",
        "address": {
            "en": "9 Chak Cheung Street, Sha Tin, New Territories",
            "zh": "新界沙田澤祥街9號",
            "cn": "新界沙田澤祥街9號"
        },
        "coordinates": {
            "latitude": 22.383,
            "longitude": 114.202
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "3946 6888",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "3946 6333",
            "label": {
                "en": "Emergency Medicine Centre",
                "zh": "Emergency Medicine Centre",
                "cn": "Emergency Medicine Centre"
            }
        },
        {
            "kind": "url",
            "value": "https://www.cuhkmc.hk/",
            "label": {
                "en": "Official site",
                "zh": "官網",
                "cn": "官網"
            }
        }
    ],
    "channels": [
        {
            "id": "24h_opd",
            "name": {
                "en": "24-hour outpatient",
                "zh": "24小時門診",
                "cn": "24小時門診"
            },
            "channelType": "in_person",
            "primary": true,
            "schedule": {
                "kind": "always_open"
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
            "booking": {
                "walkIn": true
            },
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
                            "en": "HK$600 (Mon-Fri 18:00-21:59; Sat 13:00-21:59). HK$800 (Daily 22:00-07:59). New package prices for common conditions (fever, cold, flu, gastroenteritis) including consultation and basic medication. Excludes other medication and tests.",
                            "zh": "HK$600 (Mon-Fri 18:00-21:59; Sat 13:00-21:59). HK$800 (Daily 22:00-07:59). New package prices for common conditions (fever, cold, flu, gastroenteritis) including consultation and basic medication. Excludes other medication and tests.",
                            "cn": "HK$600 (Mon-Fri 18:00-21:59; Sat 13:00-21:59). HK$800 (Daily 22:00-07:59). New package prices for common conditions (fever, cold, flu, gastroenteritis) including consultation and basic medication. Excludes other medication and tests."
                        }
                    }
                ]
            }
        }
    ],
    "facilities": [
        {
            "custom": {
                "en": "X-Ray",
                "zh": "X-Ray",
                "cn": "X-Ray"
            }
        },
        {
            "custom": {
                "en": "Pharmacy",
                "zh": "Pharmacy",
                "cn": "Pharmacy"
            }
        },
        {
            "custom": {
                "en": "ECG",
                "zh": "ECG",
                "cn": "ECG"
            }
        },
        {
            "custom": {
                "en": "Laboratory",
                "zh": "Laboratory",
                "cn": "Laboratory"
            }
        },
        {
            "custom": {
                "en": "CT Scanner",
                "zh": "CT Scanner",
                "cn": "CT Scanner"
            }
        },
        {
            "custom": {
                "en": "MRI",
                "zh": "MRI",
                "cn": "MRI"
            }
        },
        {
            "custom": {
                "en": "Emergency Medicine Centre",
                "zh": "Emergency Medicine Centre",
                "cn": "Emergency Medicine Centre"
            }
        },
        {
            "custom": {
                "en": "Specialist Outpatient Centre",
                "zh": "Specialist Outpatient Centre",
                "cn": "Specialist Outpatient Centre"
            }
        },
        {
            "custom": {
                "en": "Day Surgery Centre",
                "zh": "Day Surgery Centre",
                "cn": "Day Surgery Centre"
            }
        },
        {
            "custom": {
                "en": "Bluetooth-enabled Navigation System",
                "zh": "Bluetooth-enabled Navigation System",
                "cn": "Bluetooth-enabled Navigation System"
            }
        },
        {
            "custom": {
                "en": "Self-service Kiosks",
                "zh": "Self-service Kiosks",
                "cn": "Self-service Kiosks"
            }
        },
        {
            "custom": {
                "en": "Fully Paperless Electronic Medical Record System",
                "zh": "Fully Paperless Electronic Medical Record System",
                "cn": "Fully Paperless Electronic Medical Record System"
            }
        }
    ],
    "additionalInfo": {
        "en": "Non-profit private teaching hospital wholly owned by The Chinese University of Hong Kong. Hong Kong's first smart hospital. Emergency Medicine Centre staffed by Emergency Medicine Specialists and nurses 24 hours. Phase III price adjustment streamlined 24-hour outpatient and emergency service pricing and launched outpatient medication packages. Accepts Octopus payment at Emergency Medicine Centre.",
        "zh": "Non-profit private teaching hospital wholly owned by The Chinese University of Hong Kong. Hong Kong's first smart hospital. Emergency Medicine Centre staffed by Emergency Medicine Specialists and nurses 24 hours. Phase III price adjustment streamlined 24-hour outpatient and emergency service pricing and launched outpatient medication packages. Accepts Octopus payment at Emergency Medicine Centre.",
        "cn": "Non-profit private teaching hospital wholly owned by The Chinese University of Hong Kong. Hong Kong's first smart hospital. Emergency Medicine Centre staffed by Emergency Medicine Specialists and nurses 24 hours. Phase III price adjustment streamlined 24-hour outpatient and emergency service pricing and launched outpatient medication packages. Accepts Octopus payment at Emergency Medicine Centre."
    },
    "sourceUrls": [
        {
            "url": "https://www.blue.com.hk/blog/hk/%E5%81%A5%E5%BA%B7%E8%B3%87%E8%A8%8A/24-hour-outpatient-clinic-private-hospital-fee"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.thestandard.com.hk/news/article/320719/CUHK-Medical-Centre-to-slash-24-hour-urgent-care-prices"
        }
    ]
} as PhysicalAlternative
