/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const hkahTelehealth: TelehealthAlternative = {
    "slug": "hkah-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Hong Kong Adventist Hospital – Stubbs Road Teleconsultation",
        "zh": "香港港安醫院（司徒拔道）遙距診症",
        "cn": "香港港安醫院（司徒拔道）遙距診症"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "Private hospital providing teleconsultation for existing registered patients of the Family Practice Out-Patient Clinic and health assessment follow-ups. Not available for first-time patients. Patient must be physically in Hong Kong during the session.",
        "zh": "私家醫院為家庭醫學門診及體檢跟進之已登記病人提供遙距診症服務。不適用於首次求診病人。病人在診症期間必須身處香港。",
        "cn": "私家醫院為家庭醫學門診及體檢跟進之已登記病人提供遙距診症服務。不適用於首次求診病人。病人在診症期間必須身處香港。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.hkah.org.hk/en/specialist-clinics/telemedicine-service",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        }
    ],
    "channels": [
        {
            "id": "video_gp",
            "name": {
                "en": "Video consultation",
                "zh": "視像診症",
                "cn": "視像診症"
            },
            "channelType": "video",
            "primary": true,
            "schedule": {
                "kind": "variable",
                "notes": {
                    "en": "Mon-Fri: 9:00 AM - 1:00 PM, 2:00 PM - 5:00 PM (Family Medicine Outpatient)",
                    "zh": "Mon-Fri: 9:00 AM - 1:00 PM, 2:00 PM - 5:00 PM (Family Medicine Outpatient)",
                    "cn": "Mon-Fri: 9:00 AM - 1:00 PM, 2:00 PM - 5:00 PM (Family Medicine Outpatient)"
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
                            "en": "HK$450 (Mon-Fri Family Practice consultation fee) Delivery: Additional fee for delivery (amount confirmed after consultation) Not eligible for insurance direct billing or health care vouchers. Consultation fee paid on the day of appointment booking. Medication and delivery fees confirmed after video session.",
                            "zh": "HK$450 (Mon-Fri Family Practice consultation fee) Delivery: Additional fee for delivery (amount confirmed after consultation) Not eligible for insurance direct billing or health care vouchers. Consultation fee paid on the day of appointment booking. Medication and delivery fees confirmed after video session.",
                            "cn": "HK$450 (Mon-Fri Family Practice consultation fee) Delivery: Additional fee for delivery (amount confirmed after consultation) Not eligible for insurance direct billing or health care vouchers. Consultation fee paid on the day of appointment booking. Medication and delivery fees confirmed after video session."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "Family Medicine Follow-up",
                "zh": "Family Medicine Follow-up",
                "cn": "Family Medicine Follow-up"
            }
        },
        {
            "custom": {
                "en": "Health Assessment Follow-up",
                "zh": "Health Assessment Follow-up",
                "cn": "Health Assessment Follow-up"
            }
        },
        {
            "custom": {
                "en": "Medical Certificate (Sick Leave)",
                "zh": "Medical Certificate (Sick Leave)",
                "cn": "Medical Certificate (Sick Leave)"
            }
        },
        {
            "custom": {
                "en": "Medication Delivery",
                "zh": "Medication Delivery",
                "cn": "Medication Delivery"
            }
        },
        {
            "custom": {
                "en": "Existing Patients Only",
                "zh": "Existing Patients Only",
                "cn": "Existing Patients Only"
            }
        },
        {
            "custom": {
                "en": "Under-16 Must Be Accompanied by Adult 21+",
                "zh": "Under-16 Must Be Accompanied by Adult 21+",
                "cn": "Under-16 Must Be Accompanied by Adult 21+"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same-day if payment completed before 2:00 PM; next day if after 2:00 PM (delivery by 10:00 PM)",
            "zh": "Same-day if payment completed before 2:00 PM; next day if after 2:00 PM (delivery by 10:00 PM)",
            "cn": "Same-day if payment completed before 2:00 PM; next day if after 2:00 PM (delivery by 10:00 PM)"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www.hkah.org.hk/en/specialist-clinics/telemedicine-service"
        },
        {
            "url": "https://www.hkah.org.hk/tc/specialist-clinics/telemedicine-service"
        },
        {
            "url": "https://www.stheadline.com/health-edu/3547881"
        }
    ]
} as TelehealthAlternative
