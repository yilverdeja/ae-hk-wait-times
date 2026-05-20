/** AUTO-GENERATED — needs manual review. Source: gopc factory + archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const gopcApLeiChau: PhysicalAlternative = {
    "slug": "gopc-ap-lei-chau",
    "category": "non24hour",
    "name": {
        "en": "Ap Lei Chau GOPC (HA)",
        "zh": "鴨脷洲普通科門診",
        "cn": "鴨脷洲普通科門診"
    },
    "providerType": "Public Clinic",
    "location": {
        "district": "Ap Lei Chau",
        "address": {
            "en": "1/F, 161 Ap Lei Chau Main Street, Ap Lei Chau, Hong Kong",
            "zh": "香港鴨脷洲大街161號1樓",
            "cn": "香港鴨脷洲大街161號1樓"
        },
        "coordinates": {
            "latitude": 22.242,
            "longitude": 114.153
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "3543 5022"
        },
        {
            "kind": "url",
            "value": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
            "label": {
                "en": "HA clinic page",
                "zh": "醫管局網頁",
                "cn": "醫管局網頁"
            }
        }
    ],
    "channels": [
        {
            "id": "general_opd",
            "name": {
                "en": "General outpatient (GOPC)",
                "zh": "普通科門診",
                "cn": "普通科門診"
            },
            "channelType": "in_person",
            "primary": true,
            "schedule": {
                "kind": "appointment_only",
                "notes": {
                    "en": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. Closed Sun & most Public Holidays. Appointment required.",
                    "zh": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. Closed Sun & most Public Holidays. Appointment required.",
                    "cn": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. Closed Sun & most Public Holidays. Appointment required."
                }
            },
            "eligibility": [
                {
                    "audience": "hk_resident_eligible",
                    "summary": {
                        "en": "Eligible HK residents (HKID)",
                        "zh": "合資格香港居民（香港身份證）",
                        "cn": "合資格香港居民（香港身份證）"
                    },
                    "details": {
                        "en": "HK$50 per visit for eligible persons. Fee reform may raise this to HK$150 from 2026.",
                        "zh": "合資格人士每次診症HK$50。2026年起費用改革可能調整至HK$150。",
                        "cn": "合資格人士每次診症HK$50。2026年起費用改革可能調整至HK$150。"
                    }
                },
                {
                    "audience": "hk_resident_non_eligible",
                    "summary": {
                        "en": "Non-eligible persons",
                        "zh": "非合資格人士",
                        "cn": "非合資格人士"
                    },
                    "details": {
                        "en": "HK$445 per visit for non-eligible persons.",
                        "zh": "非合資格人士每次診症HK$445。",
                        "cn": "非合資格人士每次診症HK$445。"
                    }
                }
            ],
            "booking": {
                "appointmentRequired": true,
                "walkIn": false,
                "methods": {
                    "en": "HA GOPC telephone booking or HA Go app",
                    "zh": "醫管局門診電話預約或HA Go",
                    "cn": "醫管局門診電話預約或HA Go"
                }
            },
            "pricing": {
                "tiers": [
                    {
                        "id": "eligible",
                        "label": {
                            "en": "General consultation (eligible)",
                            "zh": "普通科診症（合資格）",
                            "cn": "普通科診症（合資格）"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 50
                        },
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "eligibility": [
                            {
                                "audience": "hk_resident_eligible",
                                "summary": {
                                    "en": "Eligible HK residents (HKID)",
                                    "zh": "合資格香港居民（香港身份證）",
                                    "cn": "合資格香港居民（香港身份證）"
                                },
                                "details": {
                                    "en": "HK$50 per visit for eligible persons. Fee reform may raise this to HK$150 from 2026.",
                                    "zh": "合資格人士每次診症HK$50。2026年起費用改革可能調整至HK$150。",
                                    "cn": "合資格人士每次診症HK$50。2026年起費用改革可能調整至HK$150。"
                                }
                            }
                        ]
                    },
                    {
                        "id": "non_eligible",
                        "label": {
                            "en": "General consultation (non-eligible)",
                            "zh": "普通科診症（非合資格）",
                            "cn": "普通科診症（非合資格）"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 445
                        },
                        "appliesWhen": [
                            {
                                "type": "default"
                            }
                        ],
                        "eligibility": [
                            {
                                "audience": "hk_resident_non_eligible",
                                "summary": {
                                    "en": "Non-eligible persons",
                                    "zh": "非合資格人士",
                                    "cn": "非合資格人士"
                                },
                                "details": {
                                    "en": "HK$445 per visit for non-eligible persons.",
                                    "zh": "非合資格人士每次診症HK$445。",
                                    "cn": "非合資格人士每次診症HK$445。"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "facilities": [
        {
            "id": "gp_consultation"
        },
        {
            "id": "chronic_disease"
        },
        {
            "id": "pharmacy"
        },
        {
            "id": "nursing"
        },
        {
            "id": "patient_education"
        }
    ],
    "scope": {
        "urgencyLevel": "primary_care",
        "summary": {
            "en": "For non-urgent conditions. Appointment required; not for emergencies.",
            "zh": "適用於非緊急情況，須預約，不適用於急症。",
            "cn": "適用於非緊急情況，須預約，不適用於急症。"
        }
    },
    "additionalInfo": {
        "en": "Part of Hong Kong West Cluster (Southern District). Near Lei Tung MTR Station.",
        "zh": "Part of Hong Kong West Cluster (Southern District). Near Lei Tung MTR Station.",
        "cn": "Part of Hong Kong West Cluster (Southern District). Near Lei Tung MTR Station."
    },
    "sourceUrls": [
        {
            "url": "https://gia.info.gov.hk/general/201909/29/P2019092700577_322788_1_1569583170961.pdf"
        }
    ],
    "lastUpdated": "2026-05-01"
} as PhysicalAlternative
