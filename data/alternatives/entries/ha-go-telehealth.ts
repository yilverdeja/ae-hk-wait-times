/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const haGoTelehealth: TelehealthAlternative = {
    "slug": "ha-go-telehealth",
    "category": "telehealth",
    "name": {
        "en": "HA Go (Hospital Authority Telehealth)",
        "zh": "醫管局 HA Go 遙距醫療",
        "cn": "醫管局 HA Go 遙距醫療"
    },
    "providerType": "Public/HA",
    "description": {
        "en": "The Hospital Authority's official app offering telehealth follow-up consultations for existing HA patients. Doctors assess recovery progress, wound healing, and medication status via video. Medication delivery is available via the app.",
        "zh": "醫管局官方應用程式，為現有醫管局病人提供遙距覆診服務。醫生透過視像跟進病情，包括康復進度、傷口癒合及服藥情況，並可安排藥物送遞。",
        "cn": "醫管局官方應用程式，為現有醫管局病人提供遙距覆診服務。醫生透過視像跟進病情，包括康復進度、傷口癒合及服藥情況，並可安排藥物送遞。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www2.ha.org.hk/hago/features/appointment-related/telehealth",
            "label": {
                "en": "Website",
                "zh": "網站",
                "cn": "網站"
            }
        },
        {
            "kind": "app_ios",
            "value": "https://apps.apple.com/hk/app/ha-go/id1521117011",
            "label": {
                "en": "iOS app",
                "zh": "iOS 應用程式",
                "cn": "iOS 應用程式"
            }
        },
        {
            "kind": "app_android",
            "value": "https://play.google.com/store/apps/details?id=hk.org.ha.hago",
            "label": {
                "en": "Android app",
                "zh": "Android 應用程式",
                "cn": "Android 應用程式"
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
                    "en": "Follows individual HA clinic appointment schedules; patients check in via app up to 2 hours before appointment",
                    "zh": "Follows individual HA clinic appointment schedules; patients check in via app up to 2 hours before appointment",
                    "cn": "Follows individual HA clinic appointment schedules; patients check in via app up to 2 hours before appointment"
                }
            },
            "eligibility": [
                {
                    "audience": "existing_patient",
                    "summary": {
                        "en": "Existing HA patients",
                        "zh": "現有醫管局病人",
                        "cn": "現有醫管局病人"
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
                            "en": "Standard HA public fees (e.g., HK$135 for specialist outpatient follow-up as of 2026) Only for existing HA follow-up patients assessed as clinically suitable by their doctor. Supports multiple payment methods including credit card, Apple Pay, Alipay HK, Octopus, PayMe, WeChat Pay.",
                            "zh": "Standard HA public fees (e.g., HK$135 for specialist outpatient follow-up as of 2026) Only for existing HA follow-up patients assessed as clinically suitable by their doctor. Supports multiple payment methods including credit card, Apple Pay, Alipay HK, Octopus, PayMe, WeChat Pay.",
                            "cn": "Standard HA public fees (e.g., HK$135 for specialist outpatient follow-up as of 2026) Only for existing HA follow-up patients assessed as clinically suitable by their doctor. Supports multiple payment methods including credit card, Apple Pay, Alipay HK, Octopus, PayMe, WeChat Pay."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "Follow-up Consultations",
                "zh": "Follow-up Consultations",
                "cn": "Follow-up Consultations"
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
                "en": "Appointment Management",
                "zh": "Appointment Management",
                "cn": "Appointment Management"
            }
        },
        {
            "custom": {
                "en": "Psychiatry Follow-up",
                "zh": "Psychiatry Follow-up",
                "cn": "Psychiatry Follow-up"
            }
        },
        {
            "custom": {
                "en": "Chronic Disease Follow-up",
                "zh": "Chronic Disease Follow-up",
                "cn": "Chronic Disease Follow-up"
            }
        },
        {
            "custom": {
                "en": "Physiotherapy/Occupational Therapy Follow-up",
                "zh": "Physiotherapy/Occupational Therapy Follow-up",
                "cn": "Physiotherapy/Occupational Therapy Follow-up"
            }
        }
    ],
    "delivery": {
        "speed": {
            "en": "Same day possible; fastest on the day of appointment",
            "zh": "Same day possible; fastest on the day of appointment",
            "cn": "Same day possible; fastest on the day of appointment"
        }
    },
    "sourceUrls": [
        {
            "url": "https://www2.ha.org.hk/hago/features/appointment-related/telehealth"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        },
        {
            "url": "https://www.stheadline.com/health-edu/3547881"
        }
    ]
} as TelehealthAlternative
