/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const stTeresasHospital: PhysicalAlternative = {
    "slug": "st-teresas-hospital",
    "category": "24hour",
    "name": {
        "en": "St. Teresa's Hospital",
        "zh": "聖德肋撒醫院",
        "cn": "聖德肋撒醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Kowloon City",
        "address": {
            "en": "327 Prince Edward Road West, Kowloon, Hong Kong",
            "zh": "九龍太子道西327號",
            "cn": "九龍太子道西327號"
        },
        "coordinates": {
            "latitude": 22.326,
            "longitude": 114.187
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2200 3434",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2200 3108",
            "label": {
                "en": "OPD",
                "zh": "OPD",
                "cn": "OPD"
            }
        },
        {
            "kind": "url",
            "value": "https://www.sth.org.hk/",
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
                            "en": "HK$180 - HK$470. Mon-Sat 08:00-19:59 from HK$180. Mon-Sat night (20:00-07:59): HK$430. Sun & PH night (20:00-07:59): HK$470. Excludes tests, procedures, drugs, and operations.",
                            "zh": "HK$180 - HK$470. Mon-Sat 08:00-19:59 from HK$180. Mon-Sat night (20:00-07:59): HK$430. Sun & PH night (20:00-07:59): HK$470. Excludes tests, procedures, drugs, and operations.",
                            "cn": "HK$180 - HK$470. Mon-Sat 08:00-19:59 from HK$180. Mon-Sat night (20:00-07:59): HK$430. Sun & PH night (20:00-07:59): HK$470. Excludes tests, procedures, drugs, and operations."
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
                "en": "35 Consultation Rooms",
                "zh": "35 Consultation Rooms",
                "cn": "35 Consultation Rooms"
            }
        },
        {
            "custom": {
                "en": "1 Treatment Room",
                "zh": "1 Treatment Room",
                "cn": "1 Treatment Room"
            }
        },
        {
            "custom": {
                "en": "1 Cohort Room",
                "zh": "1 Cohort Room",
                "cn": "1 Cohort Room"
            }
        },
        {
            "custom": {
                "en": "Breast Centre",
                "zh": "Breast Centre",
                "cn": "Breast Centre"
            }
        },
        {
            "custom": {
                "en": "Heart & Diagnostic Centre",
                "zh": "Heart & Diagnostic Centre",
                "cn": "Heart & Diagnostic Centre"
            }
        },
        {
            "custom": {
                "en": "Rehabilitation Centre",
                "zh": "Rehabilitation Centre",
                "cn": "Rehabilitation Centre"
            }
        },
        {
            "custom": {
                "en": "Chinese Medicine Centre",
                "zh": "Chinese Medicine Centre",
                "cn": "Chinese Medicine Centre"
            }
        },
        {
            "custom": {
                "en": "Endoscopy Centre",
                "zh": "Endoscopy Centre",
                "cn": "Endoscopy Centre"
            }
        }
    ],
    "additionalInfo": {
        "en": "Largest nonprofit Roman Catholic hospital in Kowloon. Founded in 1940. Locally known as the French Hospital or Kowloon French Hospital. Approximately 1,000 beds. Out-Patient Department has Day Outpatient (East Wing lobby) and Night Outpatient (South Wing) entrances. Bookings can be made minimum 2 days in advance via email.",
        "zh": "Largest nonprofit Roman Catholic hospital in Kowloon. Founded in 1940. Locally known as the French Hospital or Kowloon French Hospital. Approximately 1,000 beds. Out-Patient Department has Day Outpatient (East Wing lobby) and Night Outpatient (South Wing) entrances. Bookings can be made minimum 2 days in advance via email.",
        "cn": "Largest nonprofit Roman Catholic hospital in Kowloon. Founded in 1940. Locally known as the French Hospital or Kowloon French Hospital. Approximately 1,000 beds. Out-Patient Department has Day Outpatient (East Wing lobby) and Night Outpatient (South Wing) entrances. Bookings can be made minimum 2 days in advance via email."
    },
    "sourceUrls": [
        {
            "url": "https://www.bowtie.com.hk/blog/en/hospitals/st-teresa-hospital-check/"
        },
        {
            "url": "https://www.sassymamahk.com/hong-kong-public-private-hospital-emergency-department-health/"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        }
    ]
} as PhysicalAlternative
