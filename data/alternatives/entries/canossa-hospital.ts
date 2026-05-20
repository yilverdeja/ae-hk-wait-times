/** Reviewed — hand-curated entry. */
import type { PhysicalAlternative } from "@/types/alternatives"

export const canossaHospital: PhysicalAlternative = {
    "slug": "canossa-hospital",
    "category": "24hour",
    "name": {
        "en": "Canossa Hospital (Caritas)",
        "zh": "嘉諾撒醫院",
        "cn": "嘉諾撒醫院"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "24-hour OPD by Resident Medical Officers. Walk-in and phone appointments accepted.",
        "zh": "由駐院醫生提供24小時門診服務，接受即時及電話預約。",
        "cn": "由駐院醫生提供24小時門診服務，接受即時及電話預約。"
    },
    "location": {
        "district": "Mid-Levels",
        "address": {
            "en": "1 Old Peak Road, Mid-Levels, Hong Kong",
            "zh": "香港舊山頂道一號",
            "cn": "香港舊山頂道一號"
        },
        "coordinates": {
            "latitude": 22.2778,
            "longitude": 114.15
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2522 2181",
            "label": {
                "en": "General",
                "zh": "總機",
                "cn": "總機"
            }
        },
        {
            "kind": "phone",
            "value": "2825 5805",
            "label": {
                "en": "24-hour OPD",
                "zh": "24小時門診",
                "cn": "24小時門診"
            }
        },
        {
            "kind": "url",
            "value": "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/",
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
                "walkIn": true,
                "methods": {
                    "en": "Walk-in or phone (2825 5805)",
                    "zh": "即時或電話預約（2825 5805）",
                    "cn": "即時或電話預約（2825 5805）"
                }
            },
            "pricing": {
                "tiers": [
                    {
                        "id": "weekday_day",
                        "label": {
                            "en": "Weekday day consultation",
                            "zh": "平日日間診症",
                            "cn": "平日日間診症"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 388
                        },
                        "appliesWhen": [
                            {
                                "type": "days",
                                "days": [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5
                                ]
                            },
                            {
                                "type": "time",
                                "ranges": [
                                    {
                                        "start": "08:00",
                                        "end": "18:00"
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
                        "id": "night_weekend",
                        "label": {
                            "en": "Night / weekend",
                            "zh": "夜間／周末",
                            "cn": "夜間／周末"
                        },
                        "consultation": "variable",
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "notes": {
                            "en": "Night and weekend surcharges apply. Contact hospital for current rates.",
                            "zh": "夜間及周末附加費適用，請向醫院查詢最新收費。",
                            "cn": "夜間及周末附加費適用，請向醫院查詢最新收費。"
                        },
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
        }
    ],
    "facilities": [
        {
            "id": "xray"
        },
        {
            "id": "pharmacy"
        },
        {
            "id": "laboratory"
        },
        {
            "custom": {
                "en": "Wound Clinic",
                "zh": "傷口護理",
                "cn": "傷口護理"
            }
        },
        {
            "id": "endoscopy"
        },
        {
            "id": "physiotherapy"
        },
        {
            "id": "dietetics"
        },
        {
            "custom": {
                "en": "Child Health Centre",
                "zh": "兒童健康中心",
                "cn": "兒童健康中心"
            }
        },
        {
            "custom": {
                "en": "Special Care Unit",
                "zh": "特別護理病房",
                "cn": "特別護理病房"
            }
        }
    ],
    "scope": {
        "hasAe": false,
        "transferToPublicAe": true,
        "urgencyLevel": "urgent_care",
        "summary": {
            "en": "No on-site A&E; casualty cases transferred to nearby public hospitals.",
            "zh": "沒有急症室；需急症治理的病人會轉介至附近公立醫院。",
            "cn": "沒有急症室；需急症治理的病人會轉介至附近公立醫院。"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.canossahospital.org.hk/en/service/24_hours_out_patient_services/",
            "label": "Official 24h OPD"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        }
    ],
    "lastUpdated": "2026-05-01"
} as PhysicalAlternative
