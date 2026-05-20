/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const hkSanatorium: PhysicalAlternative = {
    "slug": "hk-sanatorium",
    "category": "24hour",
    "name": {
        "en": "Hong Kong Sanatorium & Hospital",
        "zh": "養和醫院",
        "cn": "養和醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Happy Valley",
        "address": {
            "en": "2 Village Road, Happy Valley, Hong Kong",
            "zh": "香港跑馬地山村道二號",
            "cn": "香港跑馬地山村道二號"
        },
        "coordinates": {
            "latitude": 22.271,
            "longitude": 114.183
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2572 0211",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2835 8600",
            "label": {
                "en": "24-hour OPD",
                "zh": "24-hour OPD",
                "cn": "24-hour OPD"
            }
        },
        {
            "kind": "url",
            "value": "https://www.hksh-hospital.com/en/clinical-services/24-hour-outpatient-service",
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
                            "en": "HK$500 (Mon-Fri 19:00-00:00). HK$700 (Daily 00:00-08:00). Daytime fees lower. 20% surcharge for services outside normal hours (Mon-Fri after 19:00, Sat after 13:00, Sun & PH). Excludes drugs, tests, and specialist fees.",
                            "zh": "HK$500 (Mon-Fri 19:00-00:00). HK$700 (Daily 00:00-08:00). Daytime fees lower. 20% surcharge for services outside normal hours (Mon-Fri after 19:00, Sat after 13:00, Sun & PH). Excludes drugs, tests, and specialist fees.",
                            "cn": "HK$500 (Mon-Fri 19:00-00:00). HK$700 (Daily 00:00-08:00). Daytime fees lower. 20% surcharge for services outside normal hours (Mon-Fri after 19:00, Sat after 13:00, Sun & PH). Excludes drugs, tests, and specialist fees."
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
                "en": "Treatment Rooms (suturing, foreign body removal, casting)",
                "zh": "Treatment Rooms (suturing, foreign body removal, casting)",
                "cn": "Treatment Rooms (suturing, foreign body removal, casting)"
            }
        },
        {
            "custom": {
                "en": "Cardiac Monitoring",
                "zh": "Cardiac Monitoring",
                "cn": "Cardiac Monitoring"
            }
        },
        {
            "custom": {
                "en": "Resuscitation Equipment",
                "zh": "Resuscitation Equipment",
                "cn": "Resuscitation Equipment"
            }
        },
        {
            "custom": {
                "en": "Lithotripsy Centre",
                "zh": "Lithotripsy Centre",
                "cn": "Lithotripsy Centre"
            }
        },
        {
            "custom": {
                "en": "Radiotherapy",
                "zh": "Radiotherapy",
                "cn": "Radiotherapy"
            }
        },
        {
            "custom": {
                "en": "Diagnostic & Interventional Radiology",
                "zh": "Diagnostic & Interventional Radiology",
                "cn": "Diagnostic & Interventional Radiology"
            }
        }
    ],
    "additionalInfo": {
        "en": "Founded in 1922. About 500 beds with over 30 specialist centres. 24-hour general outpatient service including Sundays and public holidays via Family Medicine and Primary Care Centre. On-call specialists available around the clock. Walk-in and phone appointment accepted. WhatsApp enquiry: 2835 8600. Waiting time typically less than 30 minutes.",
        "zh": "Founded in 1922. About 500 beds with over 30 specialist centres. 24-hour general outpatient service including Sundays and public holidays via Family Medicine and Primary Care Centre. On-call specialists available around the clock. Walk-in and phone appointment accepted. WhatsApp enquiry: 2835 8600. Waiting time typically less than 30 minutes.",
        "cn": "Founded in 1922. About 500 beds with over 30 specialist centres. 24-hour general outpatient service including Sundays and public holidays via Family Medicine and Primary Care Centre. On-call specialists available around the clock. Walk-in and phone appointment accepted. WhatsApp enquiry: 2835 8600. Waiting time typically less than 30 minutes."
    },
    "sourceUrls": [
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://www.bowtie.com.hk/blog/zh/%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2%E7%99%BE%E7%A7%91/%E9%A4%8A%E5%92%8C%E9%86%AB%E9%99%A2-%E9%96%80%E8%A8%BA-%E6%80%A5%E7%97%87/"
        },
        {
            "url": "https://www.yourevercare.com/%E9%A4%8A%E5%92%8C%E9%86%AB%E9%99%A2"
        }
    ]
} as PhysicalAlternative
