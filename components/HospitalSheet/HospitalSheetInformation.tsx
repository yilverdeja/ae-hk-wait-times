import { buildHospitalLink } from "@/lib/utils"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import Link from "next/link"
import {
    ArrowRight,
    Clock,
    ExternalLink,
    Hospital,
    Mail,
    MapPin,
    Phone,
    Printer,
} from "lucide-react"

interface HospitalSheetInformationProps {
    hospital: EnrichedHospitalData
    lang: LanguageCode
    layout?: "list" | "grid"
    showHospitalLink?: boolean
}

const informationTexts = {
    [LanguageCode.EN]: {
        title: "Information",
        fax: "Fax",
        haProfile: "Hospital Authority Profile",
        officialWebsite: "Official Website",
        hospitalPageLink: "Full A&E wait times",
        hospitalPageLinkHint: "All triage categories & trends",
    },
    [LanguageCode.ZH]: {
        title: "資訊",
        fax: "傳真",
        haProfile: "醫院管理局資料",
        officialWebsite: "官方網站",
        hospitalPageLink: "完整急症室等候時間",
        hospitalPageLinkHint: "各分流級別及趨勢",
    },
    [LanguageCode.CN]: {
        title: "信息",
        fax: "传真",
        haProfile: "医院管理局资料",
        officialWebsite: "官方网站",
        hospitalPageLink: "完整急诊等候时间",
        hospitalPageLinkHint: "各分流级别及趋势",
    },
}

function getHospitalPageAriaLabel(name: string, lang: LanguageCode): string {
    switch (lang) {
        case LanguageCode.EN:
            return `Full A&E wait times for ${name}`
        case LanguageCode.ZH:
            return `${name}完整急症室等候時間`
        case LanguageCode.CN:
            return `${name}完整急诊等候时间`
    }
}

// A small helper component to keep our list items consistent
const InfoItem = ({
    icon,
    children,
}: {
    icon: React.ReactNode
    children: React.ReactNode
}) => (
    <li className="flex items-start gap-4">
        <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
        <div className="flex-grow">{children}</div>
    </li>
)

export function HospitalSheetInformation({
    hospital,
    lang,
    layout = "list",
    showHospitalLink = false,
}: HospitalSheetInformationProps) {
    // Build the HA profile link using the utility function
    const haProfileLink = buildHospitalLink(hospital.linkId, lang)
    const texts = informationTexts[lang]

    return (
        <div className="">
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
                {texts.title}
            </h3>
            <ul className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm" : "space-y-4 text-sm"}>
                {hospital.address[lang] && (
                    <InfoItem icon={<MapPin size={20} />}>
                        <a
                            href={hospital.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={() =>
                                sendGAEvent("event", "external_link_clicked", {
                                    linkType: "google_maps",
                                    hospitalSlug: hospital.slug,
                                })
                            }
                        >
                            {hospital.address[lang]}
                        </a>
                    </InfoItem>
                )}

                {hospital.telephone && (
                    <InfoItem icon={<Phone size={20} />}>
                        <a
                            href={`tel:${hospital.telephone}`}
                            className="hover:underline"
                            onClick={() =>
                                sendGAEvent("event", "external_link_clicked", {
                                    linkType: "phone",
                                    hospitalSlug: hospital.slug,
                                })
                            }
                        >
                            {hospital.telephone}
                        </a>
                    </InfoItem>
                )}

                {hospital.fax && (
                    <InfoItem icon={<Printer size={20} />}>
                        {hospital.fax}
                        <span className="text-muted-foreground">
                            {" "}
                            ({texts.fax})
                        </span>
                    </InfoItem>
                )}

                {hospital.email && (
                    <InfoItem icon={<Mail size={20} />}>
                        <a
                            href={`mailto:${hospital.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={() =>
                                sendGAEvent("event", "external_link_clicked", {
                                    linkType: "email",
                                    hospitalSlug: hospital.slug,
                                })
                            }
                        >
                            {hospital.email}
                        </a>
                    </InfoItem>
                )}

                <InfoItem icon={<Hospital size={20} />}>
                    <a
                        href={haProfileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        onClick={() =>
                            sendGAEvent("event", "external_link_clicked", {
                                linkType: "ha_profile",
                                hospitalSlug: hospital.slug,
                            })
                        }
                    >
                        {texts.haProfile}
                    </a>
                </InfoItem>

                {hospital.website && (
                    <InfoItem icon={<ExternalLink size={20} />}>
                        <a
                            href={hospital.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={() =>
                                sendGAEvent("event", "external_link_clicked", {
                                    linkType: "website",
                                    hospitalSlug: hospital.slug,
                                })
                            }
                        >
                            {texts.officialWebsite}
                        </a>
                    </InfoItem>
                )}

            </ul>
            {showHospitalLink && (
                <Link
                    href={`/hospital/${hospital.slug}`}
                    aria-label={getHospitalPageAriaLabel(
                        hospital.name[lang],
                        lang
                    )}
                    className="mt-4 flex w-full items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3 text-sm transition-colors hover:bg-muted/50"
                    onClick={() =>
                        sendGAEvent("event", "hospital_page_link_clicked", {
                            hospitalSlug: hospital.slug,
                        })
                    }
                >
                    <Clock
                        size={20}
                        className="shrink-0 text-muted-foreground"
                        aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                        <span className="block font-medium leading-snug">
                            {texts.hospitalPageLink}
                        </span>
                        <span className="block text-xs text-muted-foreground leading-snug mt-0.5">
                            {texts.hospitalPageLinkHint}
                        </span>
                    </span>
                    <ArrowRight
                        size={18}
                        className="shrink-0 text-muted-foreground"
                        aria-hidden
                    />
                </Link>
            )}
        </div>
    )
}
