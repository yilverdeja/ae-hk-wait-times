/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const nightClinicNgauTauKok: PhysicalAlternative = {
    "slug": "night-clinic-ngau-tau-kok",
    "category": "non24hour",
    "name": {
        "en": "Night Clinic – Ngau Tau Kok (Yan On Mansion)",
        "zh": "夜診–牛頭角（仁安大廈）",
        "cn": "夜診–牛頭角（仁安大廈）"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Kwun Tong",
        "address": {
            "en": "Shop I, G/F, Yan On Mansion, Nos. 357-375 Ngau Tau Kok Road, Kwun Tong, Kowloon",
            "zh": "九龍觀塘牛頭角道357-375號仁安大廈地下I舖",
            "cn": "九龍觀塘牛頭角道357-375號仁安大廈地下I舖"
        },
        "coordinates": {
            "latitude": 22.314,
            "longitude": 114.218
        }
    },
    "contacts": [],
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
                    "en": "Mon-Sat: 09:00-21:00, 21:00-00:30. Sun & Public Holidays: 09:00-13:00, 15:00-20:30, 21:00-00:30.",
                    "zh": "Mon-Sat: 09:00-21:00, 21:00-00:30. Sun & Public Holidays: 09:00-13:00, 15:00-20:30, 21:00-00:30.",
                    "cn": "Mon-Sat: 09:00-21:00, 21:00-00:30. Sun & Public Holidays: 09:00-13:00, 15:00-20:30, 21:00-00:30."
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
                        ]
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
                "en": "General Practice Consultation",
                "zh": "General Practice Consultation",
                "cn": "General Practice Consultation"
            }
        },
        {
            "custom": {
                "en": "Pharmacy",
                "zh": "Pharmacy",
                "cn": "Pharmacy"
            }
        }
    ],
    "additionalInfo": {
        "en": "Extended-hours private clinic in Kwun Tong area providing night consultation until 00:30. NOT 24 hours. Walk-in accepted.",
        "zh": "Extended-hours private clinic in Kwun Tong area providing night consultation until 00:30. NOT 24 hours. Walk-in accepted.",
        "cn": "Extended-hours private clinic in Kwun Tong area providing night consultation until 00:30. NOT 24 hours. Walk-in accepted."
    },
    "sourceUrls": [
        {
            "url": "https://www.finddoc.com/en/emergency-services"
        }
    ]
} as PhysicalAlternative
