/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const matildaHospital: PhysicalAlternative = {
    "slug": "matilda-hospital",
    "category": "24hour",
    "name": {
        "en": "Matilda International Hospital",
        "zh": "明德國際醫院",
        "cn": "明德國際醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "The Peak",
        "address": {
            "en": "41 Mount Kellett Road, The Peak, Hong Kong",
            "zh": "香港山頂加列山道41號",
            "cn": "香港山頂加列山道41號"
        },
        "coordinates": {
            "latitude": 22.263,
            "longitude": 114.149
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2849 0111"
        },
        {
            "kind": "url",
            "value": "https://www.matilda.org/en/services-specialities/24-hours-outpatient",
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
                            "en": "Fees vary by time of day and doctor. Consultation fees are set by individual private practitioners. Contact hospital for current rates. Excludes medication, lab services, and procedures.",
                            "zh": "Fees vary by time of day and doctor. Consultation fees are set by individual private practitioners. Contact hospital for current rates. Excludes medication, lab services, and procedures.",
                            "cn": "Fees vary by time of day and doctor. Consultation fees are set by individual private practitioners. Contact hospital for current rates. Excludes medication, lab services, and procedures."
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
                "en": "Laboratory",
                "zh": "Laboratory",
                "cn": "Laboratory"
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
                "en": "CT Scanner",
                "zh": "CT Scanner",
                "cn": "CT Scanner"
            }
        },
        {
            "custom": {
                "en": "Private Consultation Rooms",
                "zh": "Private Consultation Rooms",
                "cn": "Private Consultation Rooms"
            }
        },
        {
            "custom": {
                "en": "Treatment Rooms",
                "zh": "Treatment Rooms",
                "cn": "Treatment Rooms"
            }
        },
        {
            "custom": {
                "en": "Radiotherapy Department",
                "zh": "Radiotherapy Department",
                "cn": "Radiotherapy Department"
            }
        },
        {
            "custom": {
                "en": "Physiotherapy Department",
                "zh": "Physiotherapy Department",
                "cn": "Physiotherapy Department"
            }
        },
        {
            "custom": {
                "en": "Adult High-Dependency Unit",
                "zh": "Adult High-Dependency Unit",
                "cn": "Adult High-Dependency Unit"
            }
        },
        {
            "custom": {
                "en": "Special Care Baby Unit",
                "zh": "Special Care Baby Unit",
                "cn": "Special Care Baby Unit"
            }
        }
    ],
    "additionalInfo": {
        "en": "Founded in 1907. Nonprofit private hospital with no religious, commercial, or academic affiliation. First hospital in the world to receive Outstanding Achievement from ACHS International EQuIP7. Patient pledge: seen within 30 minutes if doctor available, max 60 minutes unless fully booked. Walk-in accepted; appointments encouraged. Also has an in-town Medical Centre in Central. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+.",
        "zh": "Founded in 1907. Nonprofit private hospital with no religious, commercial, or academic affiliation. First hospital in the world to receive Outstanding Achievement from ACHS International EQuIP7. Patient pledge: seen within 30 minutes if doctor available, max 60 minutes unless fully booked. Walk-in accepted; appointments encouraged. Also has an in-town Medical Centre in Central. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+.",
        "cn": "Founded in 1907. Nonprofit private hospital with no religious, commercial, or academic affiliation. First hospital in the world to receive Outstanding Achievement from ACHS International EQuIP7. Patient pledge: seen within 30 minutes if doctor available, max 60 minutes unless fully booked. Walk-in accepted; appointments encouraged. Also has an in-town Medical Centre in Central. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+."
    },
    "sourceUrls": [
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://en.wikipedia.org/wiki/Matilda_International_Hospital"
        },
        {
            "url": "https://www.welloft.com/en/merchant/matilda-international-hospital-3"
        }
    ]
} as PhysicalAlternative
