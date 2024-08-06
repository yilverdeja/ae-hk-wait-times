"use client";
import hospitalData, { HospitalNames } from "@/data/hospitalAverages";
import HospitalWaitTimesCard from "@/components/hospital-wait-times-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getHospitalInformation } from "@/data/hospitals";
import {
  ExternalLink,
  Hospital,
  Mail,
  MapPin,
  Phone,
  Printer,
} from "lucide-react";

interface WaitMapping {
  [key: string]: number;
}

const waitMapping: WaitMapping = {
  "Around 1 hour": 1,
  "Over 1 hour": 2,
  "Over 2 hours": 3,
  "Over 3 hours": 4,
  "Over 4 hours": 5,
  "Over 5 hours": 6,
  "Over 6 hours": 7,
  "Over 7 hours": 8,
  "Over 8 hours": 9,
};

interface Props {
  open: boolean;
  selectedHospital: HospitalNames;
  selectedHospitalWaitTime: string;
  selectedHospitalUpdateTime: Date;
  onOpenChange: (open: boolean) => void;
}

export default function WaitTimeSheet({
  open,
  selectedHospital,
  selectedHospitalUpdateTime,
  selectedHospitalWaitTime,
  onOpenChange,
}: Props) {
  const hospitalInformation = getHospitalInformation(selectedHospital);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-left">{selectedHospital}</SheetTitle>
          <SheetDescription className="text-left">
            {hospitalInformation?.cluster} Cluster
            {/* Estimated Wait Time: {selectedHospitalWaitTime} */}
          </SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <HospitalWaitTimesCard
            data={hospitalData[selectedHospital as HospitalNames]}
            currentWaitTime={waitMapping[selectedHospitalWaitTime!] || 0} // Fallback to 0 if no data
            currentUpdateTime={selectedHospitalUpdateTime}
          />
        </div>
        <div className="flex flex-col gap-2 my-4 text-sm">
          <h4 className="text-lg font-bold">Information</h4>
          <div className="flex flex-row gap-2 items-center">
            <MapPin size={20} />
            <a
              className="underline underline-offset-2"
              href={hospitalInformation?.googleMapsLink}
              target="_blank"
            >
              {hospitalInformation?.address}
            </a>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Phone size={20} />
            <p>{hospitalInformation?.telephone}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Printer size={20} />
            <p>{hospitalInformation?.fax}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Mail size={20} />
            <a
              className="underline underline-offset-2"
              href={`mailto:${hospitalInformation?.email}`}
              target="_blank"
            >
              {hospitalInformation?.email}
            </a>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Hospital size={20} />
            <a
              className="underline underline-offset-2"
              href={hospitalInformation?.link}
              target="_blank"
            >
              Hospital Authority Profile
            </a>
          </div>
          {hospitalInformation?.website && (
            <div className="flex flex-row gap-2 items-center">
              <ExternalLink size={20} />
              <a
                className="underline underline-offset-2"
                href={hospitalInformation?.website}
                target="_blank"
              >
                Website
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
