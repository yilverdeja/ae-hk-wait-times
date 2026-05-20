/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const stPaulsHospital: PhysicalAlternative = {
    "slug": "st-pauls-hospital",
    "category": "24hour",
    "name": {
        "en": "St. Paul's Hospital",
        "zh": "聖保祿醫院",
        "cn": "聖保祿醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Causeway Bay",
        "address": {
            "en": "2 Eastern Hospital Road, Causeway Bay, Hong Kong",
            "zh": "香港銅鑼灣東院道2號",
            "cn": "香港銅鑼灣東院道2號"
        },
        "coordinates": {
            "latitude": 22.276,
            "longitude": 114.188
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2890 6008"
        },
        {
            "kind": "phone",
            "value": "2830 8888"
        },
        {
            "kind": "url",
            "value": "https://www.stpaul.org.hk/en/center-and-service/detail/24-hour-outpatient-department-general",
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
                            "en": "HK$280 (Mon-Sat 08:00-19:59). Night and holiday surcharges apply. Excludes drugs, tests, and procedures.",
                            "zh": "HK$280 (Mon-Sat 08:00-19:59). Night and holiday surcharges apply. Excludes drugs, tests, and procedures.",
                            "cn": "HK$280 (Mon-Sat 08:00-19:59). Night and holiday surcharges apply. Excludes drugs, tests, and procedures."
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
                "en": "Imaging and Diagnostics",
                "zh": "Imaging and Diagnostics",
                "cn": "Imaging and Diagnostics"
            }
        },
        {
            "custom": {
                "en": "Minor Surgical Procedures",
                "zh": "Minor Surgical Procedures",
                "cn": "Minor Surgical Procedures"
            }
        },
        {
            "custom": {
                "en": "ECG",
                "zh": "ECG",
                "cn": "ECG"
            }
        }
    ],
    "additionalInfo": {
        "en": "Comprehensive acute private hospital at the heart of Causeway Bay with around 500 beds and more than 20 departments. 24-hour General Outpatient Department provides one-stop professional service covering daytime, nighttime, and holiday periods. No appointment required; walk-in only for 24-hour OPD. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+.",
        "zh": "Comprehensive acute private hospital at the heart of Causeway Bay with around 500 beds and more than 20 departments. 24-hour General Outpatient Department provides one-stop professional service covering daytime, nighttime, and holiday periods. No appointment required; walk-in only for 24-hour OPD. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+.",
        "cn": "Comprehensive acute private hospital at the heart of Causeway Bay with around 500 beds and more than 20 departments. 24-hour General Outpatient Department provides one-stop professional service covering daytime, nighttime, and holiday periods. No appointment required; walk-in only for 24-hour OPD. Service remains unchanged during Black Rainstorm or Typhoon Signal No.8+."
    },
    "sourceUrls": [
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.sunlife.com.hk/zh-hant/life-moments/staying-healthy/24-hours-clinics/"
        },
        {
            "url": "https://www.blue.com.hk/blog/hk/%E5%81%A5%E5%BA%B7%E8%B3%87%E8%A8%8A/24-hour-outpatient-clinic-private-hospital-fee"
        }
    ]
} as PhysicalAlternative
