/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const otpHealthcareRepulseBay: PhysicalAlternative = {
    "slug": "otp-healthcare-repulse-bay",
    "category": "non24hour",
    "name": {
        "en": "OT&P Healthcare – Repulse Bay Clinic",
        "zh": "OT&P Healthcare – Repulse Bay Clinic",
        "cn": "OT&P Healthcare – Repulse Bay Clinic"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Repulse Bay",
        "address": {
            "en": "G09, The Pulse, 28 Beach Road, Repulse Bay, Hong Kong",
            "zh": "G09, The Pulse, 28 Beach Road, Repulse Bay, Hong Kong",
            "cn": "G09, The Pulse, 28 Beach Road, Repulse Bay, Hong Kong"
        },
        "coordinates": {
            "latitude": 22.236,
            "longitude": 114.197
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2592 9920"
        },
        {
            "kind": "url",
            "value": "https://www.otandp.com/contact",
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
                    "en": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Hours may vary; confirm before visiting.",
                    "zh": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Hours may vary; confirm before visiting.",
                    "cn": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Hours may vary; confirm before visiting."
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
                            "en": "Varies by doctor and service. Contact clinic for current fee schedule. Direct billing with 35+ insurance companies.",
                            "zh": "Varies by doctor and service. Contact clinic for current fee schedule. Direct billing with 35+ insurance companies.",
                            "cn": "Varies by doctor and service. Contact clinic for current fee schedule. Direct billing with 35+ insurance companies."
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
                "en": "General Practice",
                "zh": "General Practice",
                "cn": "General Practice"
            }
        },
        {
            "custom": {
                "en": "Family Medicine",
                "zh": "Family Medicine",
                "cn": "Family Medicine"
            }
        },
        {
            "custom": {
                "en": "Women's Health",
                "zh": "Women's Health",
                "cn": "Women's Health"
            }
        },
        {
            "custom": {
                "en": "Vaccinations",
                "zh": "Vaccinations",
                "cn": "Vaccinations"
            }
        },
        {
            "custom": {
                "en": "Health Screenings",
                "zh": "Health Screenings",
                "cn": "Health Screenings"
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
                "en": "Pharmacy",
                "zh": "Pharmacy",
                "cn": "Pharmacy"
            }
        }
    ],
    "additionalInfo": {
        "en": "Part of OT&P Healthcare network. ACHS-accredited. Serves South Side residents. Daytime hours only.",
        "zh": "Part of OT&P Healthcare network. ACHS-accredited. Serves South Side residents. Daytime hours only.",
        "cn": "Part of OT&P Healthcare network. ACHS-accredited. Serves South Side residents. Daytime hours only."
    },
    "sourceUrls": [
        {
            "url": "https://www.otandp.com/"
        }
    ]
} as PhysicalAlternative
