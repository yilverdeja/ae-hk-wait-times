/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const townHealthTaiWai: PhysicalAlternative = {
    "slug": "town-health-tai-wai",
    "category": "non24hour",
    "name": {
        "en": "Town Health Medical – Tai Wai Night Clinic",
        "zh": "康健醫療–大圍夜診",
        "cn": "康健醫療–大圍夜診"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Tai Wai",
        "address": {
            "en": "Shop No. 7, G/F, Tin Po Building, 98 Tai Wai Road, Sha Tin, New Territories",
            "zh": "新界沙田大圍道98號田寶大廈地下7號舖",
            "cn": "新界沙田大圍道98號田寶大廈地下7號舖"
        },
        "coordinates": {
            "latitude": 22.373,
            "longitude": 114.178
        }
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://thmd.townhealth.com/en/service.php?id=33",
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
                    "en": "Mon-Tue, Thu-Sun: 08:00-13:00, 15:30-20:30, 20:30-04:30. Wed: 08:00-13:00, 15:30-20:30, 20:30-05:30. Public Holidays: 08:00-13:00, 15:30-20:30, 20:30-04:30.",
                    "zh": "Mon-Tue, Thu-Sun: 08:00-13:00, 15:30-20:30, 20:30-04:30. Wed: 08:00-13:00, 15:30-20:30, 20:30-05:30. Public Holidays: 08:00-13:00, 15:30-20:30, 20:30-04:30.",
                    "cn": "Mon-Tue, Thu-Sun: 08:00-13:00, 15:30-20:30, 20:30-04:30. Wed: 08:00-13:00, 15:30-20:30, 20:30-05:30. Public Holidays: 08:00-13:00, 15:30-20:30, 20:30-04:30."
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
        "en": "One of the most well-known late-night private clinics in Hong Kong, frequently referenced in medical directories. NOT 24 hours: closed between approximately 04:30-08:00 (05:30 on Wednesdays). Walk-in accepted. Near MTR Tai Wai Station Exit A. Operated by Town Health Medical & Dental Services Limited, one of Hong Kong's largest private healthcare groups.",
        "zh": "One of the most well-known late-night private clinics in Hong Kong, frequently referenced in medical directories. NOT 24 hours: closed between approximately 04:30-08:00 (05:30 on Wednesdays). Walk-in accepted. Near MTR Tai Wai Station Exit A. Operated by Town Health Medical & Dental Services Limited, one of Hong Kong's largest private healthcare groups.",
        "cn": "One of the most well-known late-night private clinics in Hong Kong, frequently referenced in medical directories. NOT 24 hours: closed between approximately 04:30-08:00 (05:30 on Wednesdays). Walk-in accepted. Near MTR Tai Wai Station Exit A. Operated by Town Health Medical & Dental Services Limited, one of Hong Kong's largest private healthcare groups."
    },
    "sourceUrls": [
        {
            "url": "https://www.finddoc.com/en/emergency-services"
        },
        {
            "url": "https://thmd.townhealth.com/en/service.php?id=33"
        }
    ]
} as PhysicalAlternative
