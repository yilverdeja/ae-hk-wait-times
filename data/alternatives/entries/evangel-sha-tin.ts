/** AUTO-GENERATED — needs manual review. Source: archive/Non24HourFacilities.json */
import type { PhysicalAlternative } from "@/types/alternatives"

export const evangelShaTin: PhysicalAlternative = {
    "slug": "evangel-sha-tin",
    "category": "non24hour",
    "name": {
        "en": "Evangel Hospital – Sha Tin Community Clinic",
        "zh": "播道醫院–沙田社區診所",
        "cn": "播道醫院–沙田社區診所"
    },
    "providerType": "Private Clinic",
    "location": {
        "district": "Sha Tin",
        "address": {
            "en": "Unit 1317, Level 13, Tower 1, Grand Central Plaza, Sha Tin, New Territories",
            "zh": "新界沙田新城市中央廣場一期13樓1317室",
            "cn": "新界沙田新城市中央廣場一期13樓1317室"
        },
        "coordinates": {
            "latitude": 22.382,
            "longitude": 114.188
        }
    },
    "contacts": [
        {
            "kind": "phone",
            "value": "2699 1113"
        },
        {
            "kind": "phone",
            "value": "2699 1369"
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
                    "en": "By appointment only. Contact for current schedule.",
                    "zh": "By appointment only. Contact for current schedule.",
                    "cn": "By appointment only. Contact for current schedule."
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
                "en": "General Practice Consultation",
                "zh": "General Practice Consultation",
                "cn": "General Practice Consultation"
            }
        },
        {
            "custom": {
                "en": "Family Medicine",
                "zh": "Family Medicine",
                "cn": "Family Medicine"
            }
        }
    ],
    "additionalInfo": {
        "en": "District community clinic operated by Evangel Hospital. By appointment only. Near MTR Sha Tin Station. Not an emergency or night clinic.",
        "zh": "District community clinic operated by Evangel Hospital. By appointment only. Near MTR Sha Tin Station. Not an emergency or night clinic.",
        "cn": "District community clinic operated by Evangel Hospital. By appointment only. Near MTR Sha Tin Station. Not an emergency or night clinic."
    },
    "sourceUrls": [
        {
            "url": "https://www.healthymatters.com.hk/complete-guide-to-evangel-hospital-%E6%92%AD%E9%81%93%E9%86%AB%E9%99%A2-in-hong-kong/"
        }
    ]
} as PhysicalAlternative
