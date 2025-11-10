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

    return (
        <div className="my-6">
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
                Information
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
                        <span className="text-muted-foreground"> (Fax)</span>
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
                        Hospital Authority Profile
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
                            Official Website
                        </a>
                    </InfoItem>
                )}
            </ul>
        </div>
    )
}
