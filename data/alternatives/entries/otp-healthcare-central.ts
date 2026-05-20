/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const otpHealthcareCentral: PhysicalAlternative = {
    "slug": "otp-healthcare-central",
    "category": "non24hour",
    "name": {
        "en": "OT&P Healthcare – Central Family Clinic",
        "zh": "OT&P Healthcare – Central Family Clinic",
        "cn": "OT&P Healthcare – Central Family Clinic"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Central",
        "address": {
            "en": "5/F, Century Square, 1 D'Aguilar Street, Central, Hong Kong",
            "zh": "5/F, Century Square, 1 D'Aguilar Street, Central, Hong Kong",
            "cn": "5/F, Century Square, 1 D'Aguilar Street, Central, Hong Kong"
        },
        "coordinates": {
            "latitude": 22.281,
            "longitude": 114.157
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2521 2038"
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
                    "en": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Specific hours may vary by doctor.",
                    "zh": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Specific hours may vary by doctor.",
                    "cn": "Mon-Fri: 08:30-18:00. Sat: 09:00-14:00. Closed Sun & Public Holidays. Specific hours may vary by doctor."
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
                "en": "Women's Health",
                "zh": "Women's Health",
                "cn": "Women's Health"
            }
        },
        {
            "custom": {
                "en": "Pharmacy (wholesale licence holder)",
                "zh": "Pharmacy (wholesale licence holder)",
                "cn": "Pharmacy (wholesale licence holder)"
            }
        },
        {
            "custom": {
                "en": "Minor Procedures",
                "zh": "Minor Procedures",
                "cn": "Minor Procedures"
            }
        },
        {
            "custom": {
                "en": "Travel Medicine",
                "zh": "Travel Medicine",
                "cn": "Travel Medicine"
            }
        }
    ],
    "additionalInfo": {
        "en": "OT&P is the first clinic in Hong Kong to achieve international accreditation from the Australian Council on Healthcare Standards (ACHS). Over 50 international doctors, nurses, physicians, and allied health professionals across all OT&P clinics. Multiple locations: Central Family Clinic, Central General Practice Clinic, Clearwater Bay Clinic, Repulse Bay Clinic, Central Specialists Clinic, BodyWorX Physiotherapy Clinic, MindWorX Mental Health Clinic. Primarily serves the expat community and English-speaking patients. Not an emergency or night clinic.",
        "zh": "OT&P is the first clinic in Hong Kong to achieve international accreditation from the Australian Council on Healthcare Standards (ACHS). Over 50 international doctors, nurses, physicians, and allied health professionals across all OT&P clinics. Multiple locations: Central Family Clinic, Central General Practice Clinic, Clearwater Bay Clinic, Repulse Bay Clinic, Central Specialists Clinic, BodyWorX Physiotherapy Clinic, MindWorX Mental Health Clinic. Primarily serves the expat community and English-speaking patients. Not an emergency or night clinic.",
        "cn": "OT&P is the first clinic in Hong Kong to achieve international accreditation from the Australian Council on Healthcare Standards (ACHS). Over 50 international doctors, nurses, physicians, and allied health professionals across all OT&P clinics. Multiple locations: Central Family Clinic, Central General Practice Clinic, Clearwater Bay Clinic, Repulse Bay Clinic, Central Specialists Clinic, BodyWorX Physiotherapy Clinic, MindWorX Mental Health Clinic. Primarily serves the expat community and English-speaking patients. Not an emergency or night clinic."
    },
    "sourceUrls": [
        {
            "url": "https://www.otandp.com/"
        }
    ]
} as PhysicalAlternative
