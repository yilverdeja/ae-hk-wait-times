/** AUTO-GENERATED — needs manual review. Source: gopc factory + archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const gopcMaOnShan: PhysicalAlternative = {
    "slug": "gopc-ma-on-shan",
    "category": "non24hour",
    "name": {
        "en": "Ma On Shan Family Medicine Centre (HA)",
        "zh": "馬鞍山家庭醫學中心",
        "cn": "馬鞍山家庭醫學中心"
    },
    "providerType": "Public Clinic",
    "location": {
        "district": "Ma On Shan",
        "address": {
            "en": "Ma On Shan Health Centre, Ma On Shan, Sha Tin, New Territories",
            "zh": "新界沙田馬鞍山健康中心",
            "cn": "新界沙田馬鞍山健康中心"
        },
        "coordinates": {
            "latitude": 22.425,
            "longitude": 114.232
        }
    },
    "contacts": [
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
                    "en": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. No holiday outpatient service currently planned. Appointment required.",
                    "zh": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. No holiday outpatient service currently planned. Appointment required.",
                    "cn": "Standard HA GOPC hours. Mon-Fri: 09:00-13:00, 14:00-17:30. No holiday outpatient service currently planned. Appointment required."
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
        "en": "Part of New Territories East Cluster. There is no plan to introduce holiday outpatient services at Ma On Shan Family Medicine Centre at this stage (per LegCo reply, Feb 2024).",
        "zh": "Part of New Territories East Cluster. There is no plan to introduce holiday outpatient services at Ma On Shan Family Medicine Centre at this stage (per LegCo reply, Feb 2024).",
        "cn": "Part of New Territories East Cluster. There is no plan to introduce holiday outpatient services at Ma On Shan Family Medicine Centre at this stage (per LegCo reply, Feb 2024)."
    },
    "sourceUrls": [
        {
            "url": "https://www.info.gov.hk/gia/general/202402/28/P2024022800458.htm"
        }
    ],
    "lastUpdated": "2026-05-01"
} as PhysicalAlternative
