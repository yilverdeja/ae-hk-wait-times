/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const evangelHospital: PhysicalAlternative = {
    "slug": "evangel-hospital",
    "category": "non24hour",
    "name": {
        "en": "Evangel Hospital",
        "zh": "播道醫院",
        "cn": "播道醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Kowloon City",
        "address": {
            "en": "222 Argyle Street, Kowloon, Hong Kong",
            "zh": "九龍亞皆老街222號",
            "cn": "九龍亞皆老街222號"
        },
        "coordinates": {
            "latitude": 22.327,
            "longitude": 114.187
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2711 5222",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2711 5221",
            "label": {
                "en": "OPD",
                "zh": "OPD",
                "cn": "OPD"
            }
        },
        {
            "kind": "url",
            "value": "https://evangel.org.hk/en/services/opd/general_clinic/service_hours/",
            "label": {
                "en": "Official site",
                "zh": "官網",
                "cn": "官網"
            }
        }
    ],
    "channels": [
        {
            "id": "general_outpatient",
            "name": {
                "en": "General Outpatient",
                "zh": "General Outpatient",
                "cn": "General Outpatient"
            },
            "channelType": "in_person",
            "primary": true,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Daily 07:00-23:00 (including Sundays and Public Holidays). Registration: 07:00-22:45 (subject to fine adjustment).",
                    "zh": "Daily 07:00-23:00 (including Sundays and Public Holidays). Registration: 07:00-22:45 (subject to fine adjustment).",
                    "cn": "Daily 07:00-23:00 (including Sundays and Public Holidays). Registration: 07:00-22:45 (subject to fine adjustment)."
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
            "pricing": {
                "tiers": [
                    {
                        "id": "default",
                        "label": {
                            "en": "General Outpatient",
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
                            "en": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "zh": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "cn": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments."
                        }
                    }
                ]
            },
            "booking": {
                "walkIn": true
            }
        },
        {
            "id": "specialist_outpatient",
            "name": {
                "en": "Specialist Outpatient",
                "zh": "Specialist Outpatient",
                "cn": "Specialist Outpatient"
            },
            "channelType": "in_person",
            "primary": false,
            "schedule": {
                "kind": "appointment_only",
                "notes": {
                    "en": "By appointment. Enquiry & Appointment: 2760 3420. Varies by specialist (see downloadable timetable on hospital website).",
                    "zh": "By appointment. Enquiry & Appointment: 2760 3420. Varies by specialist (see downloadable timetable on hospital website).",
                    "cn": "By appointment. Enquiry & Appointment: 2760 3420. Varies by specialist (see downloadable timetable on hospital website)."
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
            "pricing": {
                "tiers": [
                    {
                        "id": "default",
                        "label": {
                            "en": "Specialist Outpatient",
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
                            "en": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "zh": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "cn": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments."
                        }
                    }
                ]
            },
            "booking": {
                "appointmentRequired": true,
                "walkIn": false
            }
        },
        {
            "id": "chinese_medicine",
            "name": {
                "en": "Chinese Medicine",
                "zh": "Chinese Medicine",
                "cn": "Chinese Medicine"
            },
            "channelType": "in_person",
            "primary": false,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Varies. Address: Shop 45, G/F, Chi Chun Lau, Chun Seen Mei Chuen, Fu Ning Street, Kowloon City. Tel: 2762 2218.",
                    "zh": "Varies. Address: Shop 45, G/F, Chi Chun Lau, Chun Seen Mei Chuen, Fu Ning Street, Kowloon City. Tel: 2762 2218.",
                    "cn": "Varies. Address: Shop 45, G/F, Chi Chun Lau, Chun Seen Mei Chuen, Fu Ning Street, Kowloon City. Tel: 2762 2218."
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
            "pricing": {
                "tiers": [
                    {
                        "id": "default",
                        "label": {
                            "en": "Chinese Medicine",
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
                            "en": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "zh": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "cn": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments."
                        }
                    }
                ]
            },
            "booking": {
                "walkIn": true
            }
        },
        {
            "id": "dental",
            "name": {
                "en": "Dental",
                "zh": "Dental",
                "cn": "Dental"
            },
            "channelType": "in_person",
            "primary": false,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Available at hospital. Contact OPD for schedule.",
                    "zh": "Available at hospital. Contact OPD for schedule.",
                    "cn": "Available at hospital. Contact OPD for schedule."
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
            "pricing": {
                "tiers": [
                    {
                        "id": "default",
                        "label": {
                            "en": "Dental",
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
                            "en": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "zh": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments.",
                            "cn": "General OPD: HK$285 (Mon-Fri). HK$395 (Sat, Sun & Public Holidays). 10% discount on outpatient consultation and drug for persons aged 65 or above. Excludes drugs, medical supplies, lab tests, and other special treatments."
                        }
                    }
                ]
            },
            "booking": {
                "walkIn": true
            }
        }
    ],
    "facilities": [
        {
            "custom": {
                "en": "CT Scanner",
                "zh": "CT Scanner",
                "cn": "CT Scanner"
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
                "en": "PET-CT Scanner",
                "zh": "PET-CT Scanner",
                "cn": "PET-CT Scanner"
            }
        },
        {
            "custom": {
                "en": "X-Ray",
                "zh": "X-Ray",
                "cn": "X-Ray"
            }
        },
        {
            "custom": {
                "en": "Lithotripsy",
                "zh": "Lithotripsy",
                "cn": "Lithotripsy"
            }
        },
        {
            "custom": {
                "en": "4 Operating Theatres",
                "zh": "4 Operating Theatres",
                "cn": "4 Operating Theatres"
            }
        },
        {
            "custom": {
                "en": "4 Endoscopy Suites",
                "zh": "4 Endoscopy Suites",
                "cn": "4 Endoscopy Suites"
            }
        },
        {
            "custom": {
                "en": "Clinical Laboratory",
                "zh": "Clinical Laboratory",
                "cn": "Clinical Laboratory"
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
                "en": "Physiotherapy",
                "zh": "Physiotherapy",
                "cn": "Physiotherapy"
            }
        },
        {
            "custom": {
                "en": "Dietetics",
                "zh": "Dietetics",
                "cn": "Dietetics"
            }
        },
        {
            "custom": {
                "en": "Optometric Centre",
                "zh": "Optometric Centre",
                "cn": "Optometric Centre"
            }
        },
        {
            "custom": {
                "en": "Psychological Assessment & Counselling Centre",
                "zh": "Psychological Assessment & Counselling Centre",
                "cn": "Psychological Assessment & Counselling Centre"
            }
        },
        {
            "custom": {
                "en": "DEXA Bone Density Scanner",
                "zh": "DEXA Bone Density Scanner",
                "cn": "DEXA Bone Density Scanner"
            }
        }
    ],
    "additionalInfo": {
        "en": "NOT a 24-hour facility. Hours are 07:00-23:00 daily. Does NOT provide A&E services; patients needing casualty treatment are transferred to nearby HA hospitals. Founded in the 1950s by the Evangelical Free Church of China. Non-profit, self-financing with no government subvention. Over 60 beds. Five-storey hospital. Provides holistic care including pastoral/chaplaincy services. Evangel Hospital mobile app allows access to medical records, consultation history, and appointment booking. Limited services maintained during Black Rainstorm or Typhoon Signal No. 8+. MTR: Sung Wong Toi Station Exit B1, or Mong Kok Station Exit D2 (then bus). Has district clinics in Sha Tin (Unit 1317, Level 13, Tower 1, Grand Central Plaza; Tel: 2699 1113) and To Kwa Wan (G/F, 2 Sung Wong Toi Road; Psychological Assessment). Accepts cash, EPS, Visa/Mastercard, UnionPay, Alipay, WeChat Pay. No cheque payments.",
        "zh": "NOT a 24-hour facility. Hours are 07:00-23:00 daily. Does NOT provide A&E services; patients needing casualty treatment are transferred to nearby HA hospitals. Founded in the 1950s by the Evangelical Free Church of China. Non-profit, self-financing with no government subvention. Over 60 beds. Five-storey hospital. Provides holistic care including pastoral/chaplaincy services. Evangel Hospital mobile app allows access to medical records, consultation history, and appointment booking. Limited services maintained during Black Rainstorm or Typhoon Signal No. 8+. MTR: Sung Wong Toi Station Exit B1, or Mong Kok Station Exit D2 (then bus). Has district clinics in Sha Tin (Unit 1317, Level 13, Tower 1, Grand Central Plaza; Tel: 2699 1113) and To Kwa Wan (G/F, 2 Sung Wong Toi Road; Psychological Assessment). Accepts cash, EPS, Visa/Mastercard, UnionPay, Alipay, WeChat Pay. No cheque payments.",
        "cn": "NOT a 24-hour facility. Hours are 07:00-23:00 daily. Does NOT provide A&E services; patients needing casualty treatment are transferred to nearby HA hospitals. Founded in the 1950s by the Evangelical Free Church of China. Non-profit, self-financing with no government subvention. Over 60 beds. Five-storey hospital. Provides holistic care including pastoral/chaplaincy services. Evangel Hospital mobile app allows access to medical records, consultation history, and appointment booking. Limited services maintained during Black Rainstorm or Typhoon Signal No. 8+. MTR: Sung Wong Toi Station Exit B1, or Mong Kok Station Exit D2 (then bus). Has district clinics in Sha Tin (Unit 1317, Level 13, Tower 1, Grand Central Plaza; Tel: 2699 1113) and To Kwa Wan (G/F, 2 Sung Wong Toi Road; Psychological Assessment). Accepts cash, EPS, Visa/Mastercard, UnionPay, Alipay, WeChat Pay. No cheque payments."
    },
    "sourceUrls": [
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.healthymatters.com.hk/complete-guide-to-evangel-hospital-%E6%92%AD%E9%81%93%E9%86%AB%E9%99%A2-in-hong-kong/"
        },
        {
            "url": "https://www.bowtie.com.hk/blog/zh/%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2%E7%99%BE%E7%A7%91/%E6%92%AD%E9%81%93%E9%86%AB%E9%99%A2-%E9%96%80%E8%A8%BA/"
        },
        {
            "url": "https://www.fwd.com.hk/zh/blog/health/guideline-of-evangel-hospital/"
        }
    ]
} as PhysicalAlternative
