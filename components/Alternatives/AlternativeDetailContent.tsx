"use client"

import { Badge } from "@/components/ui/badge"
import { type AlternativeEntry, isPhysicalFacility, isTelehealthFacility } from "@/data/alternatives"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import {
    ArrowLeft,
    Clock,
    ExternalLink,
    MapPin,
    Phone,
    Smartphone,
    Stethoscope,
    Truck,
} from "lucide-react"
import Link from "next/link"

const texts = {
    [LanguageCode.EN]: {
        back: "Alternative Care Options",
        address: "Address",
        phone: "Phone",
        fee: "Consultation Fee",
        hours: "Operating Hours",
        facilities: "Facilities & Services",
        website: "Official Website",
        additionalInfo: "Additional Information",
        iosApp: "iOS App",
        androidApp: "Android App",
        delivery: "Medication Delivery",
        features: "Features",
        description: "About",
        telehealth: "Telehealth",
        pricing: "Pricing",
        deliveryNotes: "Delivery Speed",
    },
    [LanguageCode.ZH]: {
        back: "替代醫療選項",
        address: "地址",
        phone: "電話",
        fee: "診金",
        hours: "服務時間",
        facilities: "設施及服務",
        website: "官方網站",
        additionalInfo: "其他資訊",
        iosApp: "iOS 應用程式",
        androidApp: "Android 應用程式",
        delivery: "藥物配送",
        features: "功能",
        description: "關於",
        telehealth: "遠程醫療",
        pricing: "收費",
        deliveryNotes: "配送速度",
    },
    [LanguageCode.CN]: {
        back: "替代医疗选项",
        address: "地址",
        phone: "电话",
        fee: "诊金",
        hours: "服务时间",
        facilities: "设施及服务",
        website: "官方网站",
        additionalInfo: "其他资讯",
        iosApp: "iOS 应用程序",
        androidApp: "Android 应用程序",
        delivery: "药物配送",
        features: "功能",
        description: "关于",
        telehealth: "远程医疗",
        pricing: "收费",
        deliveryNotes: "配送速度",
    },
}

const InfoRow = ({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode
    label: string
    children: React.ReactNode
}) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 text-muted-foreground">{icon}</div>
        <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                {label}
            </p>
            <div className="text-sm">{children}</div>
        </div>
    </div>
)

function localizedText(en: string, zh: string | null, lang: LanguageCode): string {
    if (lang === LanguageCode.EN) return en
    return zh ?? en
}

interface AlternativeDetailContentProps {
    entry: AlternativeEntry
}

export function AlternativeDetailContent({ entry }: AlternativeDetailContentProps) {
    const { lang } = useLanguage()
    const t = texts[lang]
    const name = localizedText(entry.name.en, entry.name.zh, lang)

    return (
        <div className="mx-auto px-4 py-8">
            <Link
                href="/alternatives"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={14} />
                {t.back}
            </Link>

            <div className="mb-6 flex flex-wrap items-start gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                <Badge variant="secondary" className="mt-1">
                    {isPhysicalFacility(entry) ? entry.type : t.telehealth}
                </Badge>
            </div>

            <div className="space-y-6">
                {isPhysicalFacility(entry) && (
                    <>
                        <InfoRow icon={<MapPin size={18} />} label={t.address}>
                            <a
                                href={`https://www.google.com/maps?q=${entry.coordinates.latitude},${entry.coordinates.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {localizedText(entry.address.en, entry.address.zh, lang)}
                            </a>
                        </InfoRow>

                        {entry.phone && (
                            <InfoRow icon={<Phone size={18} />} label={t.phone}>
                                <a href={`tel:${entry.phone.split(" ")[0]}`} className="hover:underline">
                                    {entry.phone}
                                </a>
                            </InfoRow>
                        )}

                        {entry.baseConsultationFee && (
                            <InfoRow icon={<Stethoscope size={18} />} label={t.fee}>
                                <p className="text-sm">{entry.baseConsultationFee}</p>
                            </InfoRow>
                        )}

                        {entry.operationHours && (
                            <InfoRow icon={<Clock size={18} />} label={t.hours}>
                                <ul className="space-y-1">
                                    {Object.entries(entry.operationHours).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="capitalize text-muted-foreground">
                                                {key.replace(/_/g, " ")}:{" "}
                                            </span>
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            </InfoRow>
                        )}

                        {entry.facilities.length > 0 && (
                            <InfoRow icon={<Stethoscope size={18} />} label={t.facilities}>
                                <ul className="flex flex-wrap gap-1.5 mt-1">
                                    {entry.facilities.map((f) => (
                                        <li key={f}>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                {f}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            </InfoRow>
                        )}

                        {entry.additionalInfo && (
                            <InfoRow icon={<ExternalLink size={18} />} label={t.additionalInfo}>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {entry.additionalInfo}
                                </p>
                            </InfoRow>
                        )}

                        {entry.url && (
                            <InfoRow icon={<ExternalLink size={18} />} label={t.website}>
                                <a
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline break-all"
                                >
                                    {entry.url}
                                </a>
                            </InfoRow>
                        )}
                    </>
                )}

                {isTelehealthFacility(entry) && (
                    <>
                        <InfoRow icon={<Stethoscope size={18} />} label={t.description}>
                            <p className="text-sm leading-relaxed">
                                {lang === LanguageCode.EN
                                    ? entry.description.en
                                    : entry.description.zh}
                            </p>
                        </InfoRow>

                        {entry.operatingHours && (
                            <InfoRow icon={<Clock size={18} />} label={t.hours}>
                                <p>{entry.operatingHours}</p>
                            </InfoRow>
                        )}

                        {entry.pricing.baseConsultation && (
                            <InfoRow icon={<Stethoscope size={18} />} label={t.pricing}>
                                <p>{entry.pricing.baseConsultation}</p>
                                {entry.pricing.medicationDeliveryFee && (
                                    <p className="text-muted-foreground text-xs mt-0.5">
                                        {t.delivery}: {entry.pricing.medicationDeliveryFee}
                                    </p>
                                )}
                                {entry.pricing.notes && (
                                    <p className="text-muted-foreground text-xs mt-0.5">
                                        {entry.pricing.notes}
                                    </p>
                                )}
                            </InfoRow>
                        )}

                        {entry.deliverySpeed && (
                            <InfoRow icon={<Truck size={18} />} label={t.deliveryNotes}>
                                <p>{entry.deliverySpeed}</p>
                            </InfoRow>
                        )}

                        {entry.features.length > 0 && (
                            <InfoRow icon={<Stethoscope size={18} />} label={t.features}>
                                <ul className="flex flex-wrap gap-1.5 mt-1">
                                    {entry.features.map((f) => (
                                        <li key={f}>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                {f}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            </InfoRow>
                        )}

                        <div className="flex flex-wrap gap-3">
                            {entry.urls.website && (
                                <a
                                    href={entry.urls.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                >
                                    <ExternalLink size={14} />
                                    {t.website}
                                </a>
                            )}
                            {entry.urls.ios && (
                                <a
                                    href={entry.urls.ios}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                >
                                    <Smartphone size={14} />
                                    {t.iosApp}
                                </a>
                            )}
                            {entry.urls.android && (
                                <a
                                    href={entry.urls.android}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                >
                                    <Smartphone size={14} />
                                    {t.androidApp}
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
