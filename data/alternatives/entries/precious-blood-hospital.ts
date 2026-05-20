/** Reviewed — hand-curated entry. */
import type { PhysicalAlternative } from "@/types/alternatives"

export const preciousBloodHospital: PhysicalAlternative = {
    "slug": "precious-blood-hospital",
    "category": "non24hour",
    "name": {
        "en": "Precious Blood Hospital (Caritas)",
        "zh": "寶血醫院（明愛）",
        "cn": "寶血醫院（明愛）"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Sham Shui Po",
        "address": {
            "en": "113 Castle Peak Road, Sham Shui Po, Kowloon, Hong Kong",
            "zh": "九龍深水埗青山道113號",
            "cn": "九龍深水埗青山道113號"
        },
        "coordinates": {
            "latitude": 22.331,
            "longitude": 114.161
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "3971 9900",
            "label": {
                "en": "General",
                "zh": "總機",
                "cn": "總機"
            }
        },
        {
            "kind": "phone",
            "value": "3971 9980",
            "label": {
                "en": "OPD",
                "zh": "門診",
                "cn": "門診"
            }
        },
        {
            "kind": "url",
            "value": "https://www.pbh.hk/out-patient/",
            "label": {
                "en": "Official site",
                "zh": "官網",
                "cn": "官網"
            }
        }
    ],
    "channels": [
        {
            "id": "general_opd",
            "name": {
                "en": "General outpatient",
                "zh": "普通科門診",
                "cn": "普通科門診"
            },
            "channelType": "in_person",
            "primary": true,
            "schedule": {
                "kind": "weekly",
                "timezone": "Asia/Hong_Kong",
                "rules": [
                    {
                        "days": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            0
                        ],
                        "ranges": [
                            {
                                "start": "08:00",
                                "end": "22:00"
                            }
                        ],
                        "registrationClose": "21:40"
                    }
                ],
                "notes": {
                    "en": "On Sundays, public holidays, Typhoon Signal No.8+ and Black Rain: same hours may apply; confirm with hospital.",
                    "zh": "星期日、公眾假期、八號風球及以上及黑色暴雨：可能相同時間，請向醫院確認。",
                    "cn": "星期日、公眾假期、八號風球及以上及黑色暴雨：可能相同時間，請向醫院確認。"
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
            "booking": {
                "walkIn": true
            },
            "pricing": {
                "tiers": [
                    {
                        "id": "weekday_day",
                        "label": {
                            "en": "Mon–Sat day rate",
                            "zh": "周一至六日間",
                            "cn": "周一至六日間"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 280
                        },
                        "appliesWhen": [
                            {
                                "type": "days",
                                "days": [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6
                                ]
                            },
                            {
                                "type": "time",
                                "ranges": [
                                    {
                                        "start": "08:00",
                                        "end": "20:00"
                                    }
                                ]
                            }
                        ],
                        "excludes": [
                            {
                                "en": "Drugs",
                                "zh": "藥物",
                                "cn": "藥物"
                            },
                            {
                                "en": "Laboratory tests",
                                "zh": "化驗",
                                "cn": "化驗"
                            },
                            {
                                "en": "Medical supplies",
                                "zh": "醫療用品",
                                "cn": "醫療用品"
                            }
                        ]
                    },
                    {
                        "id": "sun_ph",
                        "label": {
                            "en": "Sun / public holiday",
                            "zh": "周日／公眾假期",
                            "cn": "周日／公眾假期"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 390
                        },
                        "appliesWhen": [
                            {
                                "type": "days",
                                "days": [
                                    0
                                ]
                            }
                        ],
                        "excludes": [
                            {
                                "en": "Drugs",
                                "zh": "藥物",
                                "cn": "藥物"
                            },
                            {
                                "en": "Laboratory tests",
                                "zh": "化驗",
                                "cn": "化驗"
                            },
                            {
                                "en": "Medical supplies",
                                "zh": "醫療用品",
                                "cn": "醫療用品"
                            }
                        ]
                    },
                    {
                        "id": "sun_ph_holiday_flag",
                        "label": {
                            "en": "Public holiday",
                            "zh": "公眾假期",
                            "cn": "公眾假期"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 390
                        },
                        "appliesWhen": [
                            {
                                "type": "public_holiday"
                            }
                        ],
                        "excludes": [
                            {
                                "en": "Drugs",
                                "zh": "藥物",
                                "cn": "藥物"
                            },
                            {
                                "en": "Laboratory tests",
                                "zh": "化驗",
                                "cn": "化驗"
                            },
                            {
                                "en": "Medical supplies",
                                "zh": "醫療用品",
                                "cn": "醫療用品"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "id": "specialist_opd",
            "name": {
                "en": "Specialist outpatient",
                "zh": "專科門診",
                "cn": "專科門診"
            },
            "channelType": "in_person",
            "schedule": {
                "kind": "appointment_only",
                "notes": {
                    "en": "By appointment only. Book at least 3 working days ahead online or WhatsApp 9249 1904.",
                    "zh": "只限預約，請至少提前3個工作天網上或WhatsApp 9249 1904預約。",
                    "cn": "只限預約，請至少提前3個工作天網上或WhatsApp 9249 1904預約。"
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
            "booking": {
                "appointmentRequired": true
            },
            "pricing": {
                "tiers": [
                    {
                        "id": "specialist",
                        "label": {
                            "en": "Specialist consultation",
                            "zh": "專科診症",
                            "cn": "專科診症"
                        },
                        "consultation": "variable",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "facilities": [
        {
            "id": "mri"
        },
        {
            "id": "ct_scanner"
        },
        {
            "id": "xray"
        },
        {
            "id": "ultrasound"
        },
        {
            "id": "endoscopy"
        },
        {
            "id": "laboratory"
        },
        {
            "id": "pharmacy"
        },
        {
            "id": "physiotherapy"
        }
    ],
    "scope": {
        "hasAe": false,
        "transferToPublicAe": true,
        "urgencyLevel": "primary_care",
        "summary": {
            "en": "Not a 24-hour facility. No A&E.",
            "zh": "非24小時設施，沒有急症室。",
            "cn": "非24小時設施，沒有急症室。"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.pbh.hk/out-patient/",
            "label": "Official OPD"
        }
    ],
    "lastUpdated": "2026-05-01"
} as PhysicalAlternative
