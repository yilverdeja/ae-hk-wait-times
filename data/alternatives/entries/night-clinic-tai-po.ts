/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const nightClinicTaiPo: PhysicalAlternative = {
    "slug": "night-clinic-tai-po",
    "category": "non24hour",
    "name": {
        "en": "Night Clinic – Tai Po (Fook On Building)",
        "zh": "夜診–大埔（福安大廈）",
        "cn": "夜診–大埔（福安大廈）"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Tai Po",
        "address": {
            "en": "Shop 6A, G/F, Fook On Building, 49 Heung Sze Wui Street, Tai Po, New Territories",
            "zh": "新界大埔鄉事會街49號福安大廈地下6A舖",
            "cn": "新界大埔鄉事會街49號福安大廈地下6A舖"
        },
        "coordinates": {
            "latitude": 22.451,
            "longitude": 114.168
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
                    "en": "Mon-Fri & Sun: 09:00-13:00, 16:00-21:00, 21:00-00:30. Sat: 09:00-13:00, 14:00-19:00, 21:00-00:30. Public Holidays: 09:00-13:00, 16:00-21:00, 21:00-00:30.",
                    "zh": "Mon-Fri & Sun: 09:00-13:00, 16:00-21:00, 21:00-00:30. Sat: 09:00-13:00, 14:00-19:00, 21:00-00:30. Public Holidays: 09:00-13:00, 16:00-21:00, 21:00-00:30.",
                    "cn": "Mon-Fri & Sun: 09:00-13:00, 16:00-21:00, 21:00-00:30. Sat: 09:00-13:00, 14:00-19:00, 21:00-00:30. Public Holidays: 09:00-13:00, 16:00-21:00, 21:00-00:30."
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
        "en": "Extended-hours private clinic in Tai Po providing late-night consultation until 00:30. NOT 24 hours. Walk-in accepted. Note: there is a gap between the afternoon/evening session and the night session depending on the day.",
        "zh": "Extended-hours private clinic in Tai Po providing late-night consultation until 00:30. NOT 24 hours. Walk-in accepted. Note: there is a gap between the afternoon/evening session and the night session depending on the day.",
        "cn": "Extended-hours private clinic in Tai Po providing late-night consultation until 00:30. NOT 24 hours. Walk-in accepted. Note: there is a gap between the afternoon/evening session and the night session depending on the day."
    },
    "sourceUrls": [
        {
            "url": "https://www.finddoc.com/en/emergency-services"
        }
    ]
} as PhysicalAlternative
