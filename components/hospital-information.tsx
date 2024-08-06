"use client";
import { getHospitalInformation, HospitalNames } from "@/data/hospitals";
import {
  ExternalLink,
  Hospital,
  Mail,
  MapPin,
  Phone,
  Printer,
} from "lucide-react";

interface Props {
  googleMapsLink: string;
  address: string;
  telephone: string;
  fax: string;
  email: string;
  link: string;
  website?: string;
}

export default function HospitalInformation({
  googleMapsLink,
  address,
  telephone,
  fax,
  email,
  link,
  website,
}: Props) {
  return (
    <div className="flex flex-col gap-2 my-4 text-sm">
      <h4 className="text-lg font-bold">Information</h4>
      <div className="flex flex-row gap-2 items-center">
        <MapPin size={20} />
        <a
          className="underline underline-offset-2"
          href={googleMapsLink}
          target="_blank"
        >
          {address}
        </a>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Phone size={20} />
        <p>{telephone}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Printer size={20} />
        <p>{fax}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Mail size={20} />
        <a
          className="underline underline-offset-2"
          href={`mailto:${email}`}
          target="_blank"
        >
          {email}
        </a>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Hospital size={20} />
        <a className="underline underline-offset-2" href={link} target="_blank">
          Hospital Authority Profile
        </a>
      </div>
      {website && (
        <div className="flex flex-row gap-2 items-center">
          <ExternalLink size={20} />
          <a
            className="underline underline-offset-2"
            href={website}
            target="_blank"
          >
            Website
          </a>
        </div>
      )}
    </div>
  );
}
