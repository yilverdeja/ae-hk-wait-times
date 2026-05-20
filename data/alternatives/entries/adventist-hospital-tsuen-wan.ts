/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const adventistHospitalTsuenWan: PhysicalAlternative = {
    "slug": "adventist-hospital-tsuen-wan",
    "category": "24hour",
    "name": {
        "en": "Hong Kong Adventist Hospital – Tsuen Wan",
        "zh": "香港港安醫院–荃灣",
        "cn": "香港港安醫院–荃灣"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Tsuen Wan",
        "address": {
            "en": "199 Tsuen King Circuit, Tsuen Wan, New Territories",
            "zh": "新界荃灣荃景圍199號",
            "cn": "新界荃灣荃景圍199號"
        },
        "coordinates": {
            "latitude": 22.368,
            "longitude": 114.107
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2276 6688",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2275 6888",
            "label": {
                "en": "Urgent Care Center",
                "zh": "Urgent Care Center",
                "cn": "Urgent Care Center"
            }
        },
        {
            "kind": "url",
            "value": "https://www.twah.org.hk/en/specialist-clinics/24-hours-urgent-care-center",
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
                            "en": "Fees vary by time of day and service. Contact hospital for current rates. Excludes medication, tests, and specialist fees.",
                            "zh": "Fees vary by time of day and service. Contact hospital for current rates. Excludes medication, tests, and specialist fees.",
                            "cn": "Fees vary by time of day and service. Contact hospital for current rates. Excludes medication, tests, and specialist fees."
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
                "en": "Emergency Resuscitation Equipment",
                "zh": "Emergency Resuscitation Equipment",
                "cn": "Emergency Resuscitation Equipment"
            }
        },
        {
            "custom": {
                "en": "Triage Station",
                "zh": "Triage Station",
                "cn": "Triage Station"
            }
        }
    ],
    "additionalInfo": {
        "en": "The only private hospital in New Territories West providing emergency care services. 24-hour Emergency Medicine Specialist on duty. Nurses perform immediate triage upon arrival. Resident in-house Family Medicine doctors with specialist backup. WhatsApp booking available.",
        "zh": "The only private hospital in New Territories West providing emergency care services. 24-hour Emergency Medicine Specialist on duty. Nurses perform immediate triage upon arrival. Resident in-house Family Medicine doctors with specialist backup. WhatsApp booking available.",
        "cn": "The only private hospital in New Territories West providing emergency care services. 24-hour Emergency Medicine Specialist on duty. Nurses perform immediate triage upon arrival. Resident in-house Family Medicine doctors with specialist backup. WhatsApp booking available."
    },
    "sourceUrls": [
        {
            "url": "https://www.littlestepsasia.com/hong-kong/family-life/parenting-life/emergency-public-private-hospital/"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.pacificprime.com/blog/best-private-hospitals-in-hong-kong.html"
        }
    ]
} as PhysicalAlternative
