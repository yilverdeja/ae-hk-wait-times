/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const otpHealthcareClearwaterBay: PhysicalAlternative = {
    "slug": "otp-healthcare-clearwater-bay",
    "category": "non24hour",
    "name": {
        "en": "OT&P Healthcare – Clearwater Bay Clinic",
        "zh": "OT&P Healthcare – Clearwater Bay Clinic",
        "cn": "OT&P Healthcare – Clearwater Bay Clinic"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Clearwater Bay",
        "address": {
            "en": "G/F, 5 Razor Hill Road, Clearwater Bay, Sai Kung, New Territories",
            "zh": "G/F, 5 Razor Hill Road, Clearwater Bay, Sai Kung, New Territories",
            "cn": "G/F, 5 Razor Hill Road, Clearwater Bay, Sai Kung, New Territories"
        },
        "coordinates": {
            "latitude": 22.283,
            "longitude": 114.284
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2719 9178"
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
                "en": "Pharmacy",
                "zh": "Pharmacy",
                "cn": "Pharmacy"
            }
        }
    ],
    "additionalInfo": {
        "en": "Part of OT&P Healthcare network. ACHS-accredited. Serves Clearwater Bay / Sai Kung area. Daytime hours only.",
        "zh": "Part of OT&P Healthcare network. ACHS-accredited. Serves Clearwater Bay / Sai Kung area. Daytime hours only.",
        "cn": "Part of OT&P Healthcare network. ACHS-accredited. Serves Clearwater Bay / Sai Kung area. Daytime hours only."
    },
    "sourceUrls": [
        {
            "url": "https://www.otandp.com/"
        }
    ]
} as PhysicalAlternative
