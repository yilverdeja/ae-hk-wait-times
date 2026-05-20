/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const unionHospital: PhysicalAlternative = {
    "slug": "union-hospital",
    "category": "24hour",
    "name": {
        "en": "Union Hospital",
        "zh": "仁安醫院",
        "cn": "仁安醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Tai Wai",
        "address": {
            "en": "18 Fu Kin Street, Tai Wai, Sha Tin, New Territories",
            "zh": "新界沙田大圍富健街18號",
            "cn": "新界沙田大圍富健街18號"
        },
        "coordinates": {
            "latitude": 22.372,
            "longitude": 114.171
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2608 3388",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2608 3355",
            "label": {
                "en": "24-hour Emergency Hotline",
                "zh": "24-hour Emergency Hotline",
                "cn": "24-hour Emergency Hotline"
            }
        },
        {
            "kind": "url",
            "value": "https://www.union.org/en/service-overview/emergency-outpatient",
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
                            "en": "HK$330 - HK$1,300 depending on day and time. Mon-Fri 20:00-23:59: HK$900. Daily 02:00-07:59: HK$1,300. Excludes medication, tests, and specialist fees.",
                            "zh": "HK$330 - HK$1,300 depending on day and time. Mon-Fri 20:00-23:59: HK$900. Daily 02:00-07:59: HK$1,300. Excludes medication, tests, and specialist fees.",
                            "cn": "HK$330 - HK$1,300 depending on day and time. Mon-Fri 20:00-23:59: HK$900. Daily 02:00-07:59: HK$1,300. Excludes medication, tests, and specialist fees."
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
                "en": "24-hour Thrombolysis Service (Acute MI)",
                "zh": "24-hour Thrombolysis Service (Acute MI)",
                "cn": "24-hour Thrombolysis Service (Acute MI)"
            }
        },
        {
            "custom": {
                "en": "Stroke Emergency Service",
                "zh": "Stroke Emergency Service",
                "cn": "Stroke Emergency Service"
            }
        },
        {
            "custom": {
                "en": "Dental",
                "zh": "Dental",
                "cn": "Dental"
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
                "en": "Radiology",
                "zh": "Radiology",
                "cn": "Radiology"
            }
        },
        {
            "custom": {
                "en": "Endoscopy & Day Procedure Centre",
                "zh": "Endoscopy & Day Procedure Centre",
                "cn": "Endoscopy & Day Procedure Centre"
            }
        },
        {
            "custom": {
                "en": "Renal Dialysis Centre",
                "zh": "Renal Dialysis Centre",
                "cn": "Renal Dialysis Centre"
            }
        },
        {
            "custom": {
                "en": "Intensive Care / High Dependency Care",
                "zh": "Intensive Care / High Dependency Care",
                "cn": "Intensive Care / High Dependency Care"
            }
        }
    ],
    "additionalInfo": {
        "en": "24-hour emergency medicine consultation services and specialist outpatient services. Also has polyclinics in Kowloon and New Territories. Paediatric department with experienced doctors. Free shuttle bus from Tai Wai MTR Station (every 5-15 minutes). Hotel-style imaging, flat rate pricing, and set-price operation packages.",
        "zh": "24-hour emergency medicine consultation services and specialist outpatient services. Also has polyclinics in Kowloon and New Territories. Paediatric department with experienced doctors. Free shuttle bus from Tai Wai MTR Station (every 5-15 minutes). Hotel-style imaging, flat rate pricing, and set-price operation packages.",
        "cn": "24-hour emergency medicine consultation services and specialist outpatient services. Also has polyclinics in Kowloon and New Territories. Paediatric department with experienced doctors. Free shuttle bus from Tai Wai MTR Station (every 5-15 minutes). Hotel-style imaging, flat rate pricing, and set-price operation packages."
    },
    "sourceUrls": [
        {
            "url": "https://www.sassymamahk.com/hong-kong-public-private-hospital-emergency-department-health/"
        },
        {
            "url": "https://www.littlestepsasia.com/hong-kong/family-life/parenting-life/emergency-public-private-hospital/"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        }
    ]
} as PhysicalAlternative
