/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const adventistHospitalStubbsRoad: PhysicalAlternative = {
    "slug": "adventist-hospital-stubbs-road",
    "category": "24hour",
    "name": {
        "en": "Hong Kong Adventist Hospital – Stubbs Road",
        "zh": "香港港安醫院–司徒拔道",
        "cn": "香港港安醫院–司徒拔道"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Happy Valley",
        "address": {
            "en": "40 Stubbs Road, Happy Valley, Hong Kong",
            "zh": "香港司徒拔道四十號",
            "cn": "香港司徒拔道四十號"
        },
        "coordinates": {
            "latitude": 22.268,
            "longitude": 114.183
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "3651 8888",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "3651 8991",
            "label": {
                "en": "Urgent Care",
                "zh": "Urgent Care",
                "cn": "Urgent Care"
            }
        },
        {
            "kind": "url",
            "value": "https://www.hkah.org.hk/en/specialist-clinics/24-7-urgent-care-clinic",
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
                            "en": "HK$1,200 (24-hour Urgent Care). HK$450 (Mon-Fri outpatient GP/Family Medicine). HK$550 (Weekends & Public Holidays outpatient GP/Family Medicine). Excludes medication, tests, and specialist fees.",
                            "zh": "HK$1,200 (24-hour Urgent Care). HK$450 (Mon-Fri outpatient GP/Family Medicine). HK$550 (Weekends & Public Holidays outpatient GP/Family Medicine). Excludes medication, tests, and specialist fees.",
                            "cn": "HK$1,200 (24-hour Urgent Care). HK$450 (Mon-Fri outpatient GP/Family Medicine). HK$550 (Weekends & Public Holidays outpatient GP/Family Medicine). Excludes medication, tests, and specialist fees."
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
                "en": "Emergency Angioplasty (24/7)",
                "zh": "Emergency Angioplasty (24/7)",
                "cn": "Emergency Angioplasty (24/7)"
            }
        },
        {
            "custom": {
                "en": "Hybrid Cardiac Catheterization & Interventional Operating Room",
                "zh": "Hybrid Cardiac Catheterization & Interventional Operating Room",
                "cn": "Hybrid Cardiac Catheterization & Interventional Operating Room"
            }
        },
        {
            "custom": {
                "en": "Special Care Ward (24-hour monitoring)",
                "zh": "Special Care Ward (24-hour monitoring)",
                "cn": "Special Care Ward (24-hour monitoring)"
            }
        },
        {
            "custom": {
                "en": "Stroke Emergency (thrombolytic therapy)",
                "zh": "Stroke Emergency (thrombolytic therapy)",
                "cn": "Stroke Emergency (thrombolytic therapy)"
            }
        },
        {
            "custom": {
                "en": "Orthopedic Trauma (cast, reduction, braces)",
                "zh": "Orthopedic Trauma (cast, reduction, braces)",
                "cn": "Orthopedic Trauma (cast, reduction, braces)"
            }
        }
    ],
    "additionalInfo": {
        "en": "24/7 Urgent Care Clinic managed by Emergency Medicine Specialists. Single activation emergency response team can mobilize doctors, nurses, radiotherapists, and specialists at a moment's notice. Meets international 90-minute golden hour standard for heart attack patients. Provides paediatric urgent care for children.",
        "zh": "24/7 Urgent Care Clinic managed by Emergency Medicine Specialists. Single activation emergency response team can mobilize doctors, nurses, radiotherapists, and specialists at a moment's notice. Meets international 90-minute golden hour standard for heart attack patients. Provides paediatric urgent care for children.",
        "cn": "24/7 Urgent Care Clinic managed by Emergency Medicine Specialists. Single activation emergency response team can mobilize doctors, nurses, radiotherapists, and specialists at a moment's notice. Meets international 90-minute golden hour standard for heart attack patients. Provides paediatric urgent care for children."
    },
    "sourceUrls": [
        {
            "url": "https://www.littlestepsasia.com/hong-kong/family-life/parenting-life/emergency-public-private-hospital/"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.sassymamahk.com/hong-kong-public-private-hospital-emergency-department-health/"
        }
    ]
} as PhysicalAlternative
