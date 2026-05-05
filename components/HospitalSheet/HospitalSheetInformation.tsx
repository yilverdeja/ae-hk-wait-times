import { buildHospitalLink } from "@/lib/utils"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import {
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
}

const informationTexts = {
    [LanguageCode.EN]: {
        title: "Information",
        fax: "Fax",
        haProfile: "Hospital Authority Profile",
        officialWebsite: "Official Website",
    },
    [LanguageCode.ZH]: {
        title: "資訊",
        fax: "傳真",
        haProfile: "醫院管理局資料",
        officialWebsite: "官方網站",
    },
    [LanguageCode.CN]: {
        title: "信息",
        fax: "传真",
        haProfile: "医院管理局资料",
        officialWebsite: "官方网站",
    },
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
}: HospitalSheetInformationProps) {
    // Build the HA profile link using the utility function
    const haProfileLink = buildHospitalLink(hospital.linkId, lang)
    const texts = informationTexts[lang]

    return (
        <div className="my-6">
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
        </div>
    )
}
