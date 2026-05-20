/** AUTO-GENERATED — needs manual review. Source: archive/24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const baptistHospital: PhysicalAlternative = {
    "slug": "baptist-hospital",
    "category": "24hour",
    "name": {
        "en": "Hong Kong Baptist Hospital",
        "zh": "香港浸信會醫院",
        "cn": "香港浸信會醫院"
    },
    "providerType": "Private Hospital",
    "location": {
        "district": "Kowloon Tong",
        "address": {
            "en": "222 Waterloo Road, Kowloon Tong, Kowloon",
            "zh": "九龍窩打老道222號",
            "cn": "九龍窩打老道222號"
        },
        "coordinates": {
            "latitude": 22.338,
            "longitude": 114.175
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2339 8888",
            "label": {
                "en": "General",
                "zh": "General",
                "cn": "General"
            }
        },
        {
            "kind": "phone",
            "value": "2339 8941-8944 (OPD)"
        },
        {
            "kind": "url",
            "value": "https://www.hkbh.org.hk/general_specialist/24-hr-general-out-patient-cliinic/?lang=en",
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
                            "en": "HK$400 - HK$1,000 depending on day and time. Mon-Fri 18:00-22:00: HK$700. Mon-Fri 22:00-08:00: HK$1,000. Excludes medication, tests, and specialist fees.",
                            "zh": "HK$400 - HK$1,000 depending on day and time. Mon-Fri 18:00-22:00: HK$700. Mon-Fri 22:00-08:00: HK$1,000. Excludes medication, tests, and specialist fees.",
                            "cn": "HK$400 - HK$1,000 depending on day and time. Mon-Fri 18:00-22:00: HK$700. Mon-Fri 22:00-08:00: HK$1,000. Excludes medication, tests, and specialist fees."
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
                "en": "Specialist Clinics (General Surgery, Nephrology, Neurology, Respiratory Medicine, Orthopaedics, Geriatric Medicine)",
                "zh": "Specialist Clinics (General Surgery, Nephrology, Neurology, Respiratory Medicine, Orthopaedics, Geriatric Medicine)",
                "cn": "Specialist Clinics (General Surgery, Nephrology, Neurology, Respiratory Medicine, Orthopaedics, Geriatric Medicine)"
            }
        },
        {
            "custom": {
                "en": "Nurse Clinic (Stoma & Wound Care)",
                "zh": "Nurse Clinic (Stoma & Wound Care)",
                "cn": "Nurse Clinic (Stoma & Wound Care)"
            }
        }
    ],
    "additionalInfo": {
        "en": "Triage system allocates patients to 24-hour Out Patient Clinic or specialist clinics. Walk-in accepted. 30-story private hospital connected to the Baptist Convention of Hong Kong. Paediatric specialist support available for emergencies. Non-duty specialist call-back fee of HK$1,000 during Mon-Sat 19:00-08:00, all day Sun & PH. Special procedure facility fee: HK$500 per 30 minutes.",
        "zh": "Triage system allocates patients to 24-hour Out Patient Clinic or specialist clinics. Walk-in accepted. 30-story private hospital connected to the Baptist Convention of Hong Kong. Paediatric specialist support available for emergencies. Non-duty specialist call-back fee of HK$1,000 during Mon-Sat 19:00-08:00, all day Sun & PH. Special procedure facility fee: HK$500 per 30 minutes.",
        "cn": "Triage system allocates patients to 24-hour Out Patient Clinic or specialist clinics. Walk-in accepted. 30-story private hospital connected to the Baptist Convention of Hong Kong. Paediatric specialist support available for emergencies. Non-duty specialist call-back fee of HK$1,000 during Mon-Sat 19:00-08:00, all day Sun & PH. Special procedure facility fee: HK$500 per 30 minutes."
    },
    "sourceUrls": [
        {
            "url": "https://www.littlestepsasia.com/hong-kong/family-life/parenting-life/emergency-public-private-hospital/"
        },
        {
            "url": "https://www.10life.com/en/blog/24hours-clinic-hospital-operation-hours"
        },
        {
            "url": "https://hongkongcheapo.com/lifestyle/hospitals-emergency-healthcare-tourists/"
        }
    ]
} as PhysicalAlternative
