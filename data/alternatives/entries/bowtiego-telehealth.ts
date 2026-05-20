/** AUTO-GENERATED — needs manual review. Source: archive/TelehealthServices.json */
import type { TelehealthAlternative } from "@/types/alternatives"

export const bowtiegoTelehealth: TelehealthAlternative = {
    "slug": "bowtiego-telehealth",
    "category": "telehealth",
    "name": {
        "en": "BowtieGo VDoctor+",
        "zh": "BowtieGo 視像醫生+",
        "cn": "BowtieGo 視像醫生+"
    },
    "providerType": "Dedicated App",
    "description": {
        "en": "Bowtie Life Insurance's health and wellness membership program offering member-exclusive rates for GP and Chinese Medicine consultations across a network of 1,300+ service points in Hong Kong. Includes a Free plan bundled with Bowtie VHIS policies and paid plans with outpatient coverage.",
        "zh": "保泰人壽的健康會員計劃，於全港逾1,300個服務點提供會員專屬優惠價格的普通科及中醫診症服務。包括隨保泰自願醫保附送的免費計劃，以及設有門診保障的付費計劃。",
        "cn": "保泰人壽的健康會員計劃，於全港逾1,300個服務點提供會員專屬優惠價格的普通科及中醫診症服務。包括隨保泰自願醫保附送的免費計劃，以及設有門診保障的付費計劃。"
    },
    "contacts": [
        {
            "kind": "url",
            "value": "https://bowtiego.com/en",
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
                    "en": "See provider for hours.",
                    "zh": "請向服務供應商查詢時間。",
                    "cn": "請向服務供應商查詢時間。"
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
                            "en": "Member-exclusive rates (varies by clinic in network; co-payment from HK$30 for insured plans) BowtieGo Free plan included with Bowtie VHIS. Standard and Premium insurance plans currently suspended for new applications. Network covers HK Island 270+, Kowloon 600+, New Territories 440+ service points. Primarily for in-person clinic visits at member rates.",
                            "zh": "Member-exclusive rates (varies by clinic in network; co-payment from HK$30 for insured plans) BowtieGo Free plan included with Bowtie VHIS. Standard and Premium insurance plans currently suspended for new applications. Network covers HK Island 270+, Kowloon 600+, New Territories 440+ service points. Primarily for in-person clinic visits at member rates.",
                            "cn": "Member-exclusive rates (varies by clinic in network; co-payment from HK$30 for insured plans) BowtieGo Free plan included with Bowtie VHIS. Standard and Premium insurance plans currently suspended for new applications. Network covers HK Island 270+, Kowloon 600+, New Territories 440+ service points. Primarily for in-person clinic visits at member rates."
                        }
                    }
                ]
            }
        }
    ],
    "features": [
        {
            "custom": {
                "en": "GP Consultation at Member Rates",
                "zh": "GP Consultation at Member Rates",
                "cn": "GP Consultation at Member Rates"
            }
        },
        {
            "custom": {
                "en": "Chinese Medicine at Member Rates",
                "zh": "Chinese Medicine at Member Rates",
                "cn": "Chinese Medicine at Member Rates"
            }
        },
        {
            "custom": {
                "en": "1,300+ Network Service Points",
                "zh": "1,300+ Network Service Points",
                "cn": "1,300+ Network Service Points"
            }
        },
        {
            "custom": {
                "en": "Free Plan with Bowtie VHIS",
                "zh": "Free Plan with Bowtie VHIS",
                "cn": "Free Plan with Bowtie VHIS"
            }
        },
        {
            "custom": {
                "en": "Dental Services at Member Rates",
                "zh": "Dental Services at Member Rates",
                "cn": "Dental Services at Member Rates"
            }
        }
    ],
    "sourceUrls": [
        {
            "url": "https://bowtiego.com/en"
        },
        {
            "url": "https://bowtiego.com/en/offers/existing-vhis-customers"
        },
        {
            "url": "https://help.bowtie.com.hk/hc/en-gb/articles/39366509976601"
        }
    ]
} as TelehealthAlternative
