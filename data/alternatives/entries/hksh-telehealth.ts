/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const hkshTelehealth: TelehealthAlternative = {
    "slug": "hksh-telehealth",
    "category": "telehealth",
    "name": {
        "en": "Hong Kong Sanatorium & Hospital (HKSH) Telemedicine",
        "zh": "養和醫院遙距診症",
        "cn": "養和醫院遙距診症"
    },
    "providerType": "Private Hospital",
    "description": {
        "en": "One of Hong Kong's most prestigious private hospitals offering telemedicine services across family medicine and multiple specialist departments. Available for patients aged 12+ (some specialist services restricted to existing patients). Medication delivery service (DeliveryMed) available across most of Hong Kong.",
        "zh": "香港最具聲譽的私家醫院之一，提供家庭醫學及多個專科部門的遙距診症服務。適用於12歲或以上人士（部分專科僅限舊症病人）。藥物送遞服務覆蓋香港大部分地區。",
        "cn": "香港最具聲譽的私家醫院之一，提供家庭醫學及多個專科部門的遙距診症服務。適用於12歲或以上人士（部分專科僅限舊症病人）。藥物送遞服務覆蓋香港大部分地區。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://www.hksh.com/telemedicine/en/",
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
                    "en": "Family Medicine and multiple specialist centres; appointment-based (specific hours vary by specialist centre)",
                    "zh": "Family Medicine and multiple specialist centres; appointment-based (specific hours vary by specialist centre)",
                    "cn": "Family Medicine and multiple specialist centres; appointment-based (specific hours vary by specialist centre)"
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
                            "en": "Family Medicine & Primary Care Centre: HK$500 (consultation only; medication and delivery extra) Delivery: HK$200 per delivery Telemedicine services are not eligible for insurance claims or Elderly Health Care Voucher Scheme. Additional charges for prescribed medicines and tests. Tele-consultation sessions are recorded as part of medical records.",
                            "zh": "Family Medicine & Primary Care Centre: HK$500 (consultation only; medication and delivery extra) Delivery: HK$200 per delivery Telemedicine services are not eligible for insurance claims or Elderly Health Care Voucher Scheme. Additional charges for prescribed medicines and tests. Tele-consultation sessions are recorded as part of medical records.",
                            "cn": "Family Medicine & Primary Care Centre: HK$500 (consultation only; medication and delivery extra) Delivery: HK$200 per delivery Telemedicine services are not eligible for insurance claims or Elderly Health Care Voucher Scheme. Additional charges for prescribed medicines and tests. Tele-consultation sessions are recorded as part of medical records."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "Family Medicine",
                "zh": "Family Medicine",
                "cn": "Family Medicine"
            }
        },
        {
            "custom": {
                "en": "Multiple Specialist Departments",
                "zh": "Multiple Specialist Departments",
                "cn": "Multiple Specialist Departments"
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
                "en": "DeliveryMed Service",
                "zh": "DeliveryMed Service",
                "cn": "DeliveryMed Service"
            }
        },
        {
            "custom": {
                "en": "Available for New Patients (Family Medicine)",
                "zh": "Available for New Patients (Family Medicine)",
                "cn": "Available for New Patients (Family Medicine)"
            }
        },
        {
            "custom": {
                "en": "Existing Patients Only (Some Specialist Centres)",
                "zh": "Existing Patients Only (Some Specialist Centres)",
                "cn": "Existing Patients Only (Some Specialist Centres)"
            }
        }
    ],
    "sourceUrls": [
        {
            "url": "https://www.hksh.com/telemedicine/en/"
        },
        {
            "url": "https://www.stheadline.com/health-edu/3547881"
        },
        {
            "url": "https://topick.hket.com/article/4093143"
        }
    ]
} as TelehealthAlternative
