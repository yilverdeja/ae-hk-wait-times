/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const evangelPsychCentre: PhysicalAlternative = {
    "slug": "evangel-psych-centre",
    "category": "non24hour",
    "name": {
        "en": "Evangel Hospital – Psychological Assessment & Counselling Centre",
        "zh": "播道醫院–心理評測及輔導中心",
        "cn": "播道醫院–心理評測及輔導中心"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "To Kwa Wan",
        "address": {
            "en": "G/F, 2 Sung Wong Toi Road, To Kwa Wan, Kowloon",
            "zh": "九龍土瓜灣宋皇臺道2號地下",
            "cn": "九龍土瓜灣宋皇臺道2號地下"
        },
        "coordinates": {
            "latitude": 22.326,
            "longitude": 114.189
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2176 0222"
        },
        {
            "kind": "url",
            "value": "https://evangel.org.hk/en/location/outpatient/",
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
                "kind": "appointment_only",
                "notes": {
                    "en": "Contact for current schedule. By appointment.",
                    "zh": "Contact for current schedule. By appointment.",
                    "cn": "Contact for current schedule. By appointment."
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
                "appointmentRequired": true,
                "walkIn": false
            }
        }
    ],
    "facilities": [
        {
            "custom": {
                "en": "Psychological Assessment",
                "zh": "Psychological Assessment",
                "cn": "Psychological Assessment"
            }
        },
        {
            "custom": {
                "en": "Counselling",
                "zh": "Counselling",
                "cn": "Counselling"
            }
        }
    ],
    "additionalInfo": {
        "en": "Specialist psychological assessment and counselling centre operated by Evangel Hospital. Near Sung Wong Toi MTR. By appointment only.",
        "zh": "Specialist psychological assessment and counselling centre operated by Evangel Hospital. Near Sung Wong Toi MTR. By appointment only.",
        "cn": "Specialist psychological assessment and counselling centre operated by Evangel Hospital. Near Sung Wong Toi MTR. By appointment only."
    },
    "sourceUrls": [
        {
            "url": "https://www.healthymatters.com.hk/complete-guide-to-evangel-hospital-%E6%92%AD%E9%81%93%E9%86%AB%E9%99%A2-in-hong-kong/"
        }
    ]
} as PhysicalAlternative
