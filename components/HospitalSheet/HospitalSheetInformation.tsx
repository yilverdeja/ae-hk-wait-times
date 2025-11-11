import {
    ExternalLink,
    Hospital,
    Mail,
    MapPin,
    Phone,
    Printer,
} from "lucide-react"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { buildHospitalLink } from "@/lib/utils"

interface HospitalSheetInformationProps {
    hospital: EnrichedHospitalData
    lang: LanguageCode
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
}: HospitalSheetInformationProps) {
    // Build the HA profile link using the utility function
    const haProfileLink = buildHospitalLink(hospital.linkId, lang)
    const texts = informationTexts[lang]

    return (
        <div className="my-6">
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
                {texts.title}
            </h3>
            <ul className="space-y-4 text-sm">
                {hospital.address[lang] && (
                    <InfoItem icon={<MapPin size={20} />}>
                        <a
                            href={hospital.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
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
                        >
                            {texts.officialWebsite}
                        </a>
                    </InfoItem>
                )}
            </ul>
        </div>
    )
}
