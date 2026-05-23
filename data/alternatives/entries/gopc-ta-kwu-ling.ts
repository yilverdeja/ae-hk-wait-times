/** AUTO-GENERATED — needs manual review. Source: HA opendata + fmc-scraped-details.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const gopcTaKwuLing: PhysicalAlternative = {
    "slug": "gopc-ta-kwu-ling",
    "category": "non24hour",
    "name": {
        "en": "Ta Kwu Ling FMC (HA)",
        "zh": "打鼓嶺家庭醫學診所",
        "cn": "打鼓岭家庭医学诊所"
    },
    "providerType": "Public Clinic",
    "description": {
        "en": "Hospital Authority Family Medicine Clinic (New Territories East Cluster). Appointment required.",
        "zh": "醫管局家庭醫學診所（新界東醫院聯網）。須預約。",
        "cn": "医管局家庭医学诊所（新界东医院联网）。须预约。"
    },
    "location": {
        "district": "Ta Kwu Ling",
        "address": {
            "en": "G/F, Ta Kwu Ling Rural Centre Government Building, 136 Ping Che Road, Ta Kwu Ling",
            "zh": "打鼓嶺坪輋路136號打鼓嶺鄉村中心政府大樓地下",
            "cn": "打鼓岭坪輋路136号打鼓岭乡村中心政府大楼地下"
        },
        "coordinates": {
            "latitude": 22.5245,
            "longitude": 114.16064
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2674 4283",
            "label": {
                "en": "Clinic",
                "zh": "診所",
                "cn": "诊所"
            }
        },
        {
            "kind": "phone",
            "value": "3165 1072",
            "label": {
                "en": "Appointment booking",
                "zh": "預約掛號",
                "cn": "预约挂号"
            }
        },
        {
            "kind": "url",
            "value": {
                "en": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
                "zh": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=CHIB5",
                "cn": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=CHIGB"
            },
            "label": {
                "en": "HA clinic directory",
                "zh": "醫管局診所名錄",
                "cn": "医管局诊所名录"
            }
        }
    ],
    "channels": [
        {
            "id": "general_opd",
            "name": {
                "en": "Family medicine clinic",
                "zh": "家庭醫學診所",
                "cn": "家庭医学诊所"
            },
            "channelType": "in_person",
            "primary": true,
            "schedule": {
                "kind": "appointment_only",
                "notes": {
                    "en": "Registration hours\nTuesday\n2:30pm - 4:30pm\nThursday\n9:00am - 12:00noon\n1st & 3rd Thursday of each month\n9:00am - 11:00am\n\nConsultation hours\nTuesday\n2:30pm - 5:00pm\nThursday\n9:00am - 12:30pm\n1st & 3rd Thursday of each month\n9:00am - 11:20am\n\nAppointment required. Walk-in not accepted. Book via HA telephone booking or HA Go.",
                    "zh": "掛號及診症時間（英文，摘自醫管局網頁）。須預約，不接受即到。可透過醫管局電話預約或HA Go。\n\nRegistration hours\nTuesday\n2:30pm - 4:30pm\nThursday\n9:00am - 12:00noon\n1st & 3rd Thursday of each month\n9:00am - 11:00am\n\nConsultation hours\nTuesday\n2:30pm - 5:00pm\nThursday\n9:00am - 12:30pm\n1st & 3rd Thursday of each month\n9:00am - 11:20am\n\nAppointment required. Walk-in not accepted. Book via HA telephone booking or HA Go.",
                    "cn": "挂号及诊症时间（英文，摘自医管局网页）。须预约，不接受即到。可通过医管局电话预约或HA Go。\n\nRegistration hours\nTuesday\n2:30pm - 4:30pm\nThursday\n9:00am - 12:00noon\n1st & 3rd Thursday of each month\n9:00am - 11:00am\n\nConsultation hours\nTuesday\n2:30pm - 5:00pm\nThursday\n9:00am - 12:30pm\n1st & 3rd Thursday of each month\n9:00am - 11:20am\n\nAppointment required. Walk-in not accepted. Book via HA telephone booking or HA Go."
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
                        "en": "HK$150 per attendance. HK$5 per drug item dispensed.",
                        "zh": "每次診症HK$150。每種配發藥物HK$5。",
                        "cn": "每次诊症HK$150。每种配发药物HK$5。"
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
                        "en": "HK$500 per attendance. HK$40 per drug item dispensed.",
                        "zh": "每次診症HK$500。每種配發藥物HK$40。",
                        "cn": "每次诊症HK$500。每种配发药物HK$40。"
                    }
                }
            ],
            "booking": {
                "appointmentRequired": true,
                "walkIn": false,
                "methods": {
                    "en": "HA telephone booking (3165 1072) or HA Go app",
                    "zh": "醫管局電話預約（3165 1072）或HA Go",
                    "cn": "医管局电话预约（3165 1072）或HA Go"
                }
            },
            "pricing": {
                "tiers": [
                    {
                        "id": "eligible",
                        "label": {
                            "en": "Consultation (eligible)",
                            "zh": "診症（合資格）",
                            "cn": "診症（合資格）"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 150
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
                                    "en": "HK$150 per attendance. HK$5 per drug item dispensed.",
                                    "zh": "每次診症HK$150。每種配發藥物HK$5。",
                                    "cn": "每次诊症HK$150。每种配发药物HK$5。"
                                }
                            }
                        ],
                        "excludes": [
                            {
                                "en": "Drugs (charged per item separately)",
                                "zh": "藥物（按件另計）",
                                "cn": "藥物（按件另計）"
                            },
                            {
                                "en": "Laboratory tests",
                                "zh": "化驗",
                                "cn": "化驗"
                            },
                            {
                                "en": "Other clinical services",
                                "zh": "其他醫療服務",
                                "cn": "其他醫療服務"
                            }
                        ]
                    },
                    {
                        "id": "non_eligible",
                        "label": {
                            "en": "Consultation (non-eligible)",
                            "zh": "診症（非合資格）",
                            "cn": "診症（非合資格）"
                        },
                        "consultation": {
                            "currency": "HKD",
                            "amount": 500
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
                                    "en": "HK$500 per attendance. HK$40 per drug item dispensed.",
                                    "zh": "每次診症HK$500。每種配發藥物HK$40。",
                                    "cn": "每次诊症HK$500。每种配发药物HK$40。"
                                }
                            }
                        ],
                        "excludes": [
                            {
                                "en": "Drugs (charged per item separately)",
                                "zh": "藥物（按件另計）",
                                "cn": "藥物（按件另計）"
                            },
                            {
                                "en": "Laboratory tests",
                                "zh": "化驗",
                                "cn": "化驗"
                            },
                            {
                                "en": "Other clinical services",
                                "zh": "其他醫療服務",
                                "cn": "其他醫療服務"
                            }
                        ]
                    }
                ],
                "displayNotes": {
                    "en": "Eligible persons: HK$5 per drug item dispensed. Non-eligible: HK$40 per drug item. Excludes other services.",
                    "zh": "合資格人士：每種配發藥物HK$5。非合資格人士：每種HK$40。不包括其他服務。",
                    "cn": "合资格人士：每种配发药物HK$5。非合资格人士：每种HK$40。不包括其他服务。"
                }
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
            "en": "Non-urgent primary care. Appointment required — not for emergencies.",
            "zh": "非緊急基層醫療，須預約，不適用於急症。",
            "cn": "非緊急基層醫療，須預約，不適用於急症。"
        }
    },
    "sourceUrls": [
        {
            "url": {
                "en": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
                "zh": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=CHIB5",
                "cn": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=CHIGB"
            },
            "label": {
                "en": "HA Family Medicine Clinics",
                "zh": "醫管局家庭醫學診所",
                "cn": "醫管局家庭醫學診所"
            }
        },
        {
            "url": {
                "en": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=10045&Lang=ENG",
                "zh": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=10045&Lang=CHIB5",
                "cn": "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=10045&Lang=CHIGB"
            },
            "label": {
                "en": "Official HA charges",
                "zh": "醫管局官方收費",
                "cn": "醫管局官方收費"
            }
        }
    ],
    "lastUpdated": "2026-05-21"
} as PhysicalAlternative
