"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HospitalInfo } from "@/hooks/useHospitals";
import HospitalInformation from "./hospital-information";
import HospitalChart from "./hospital-chart";
import { useHospitalHourlyTrend } from "@/hooks/useHospitalTrend";
import HospitalBusynessText from "./hospital-busyness-text";
import { buildHospitalLink } from "@/lib/types";

interface Props {
  hospital: HospitalInfo;
  updateTime: Date;
  onClose: () => void;
}

export default function HospitalSheet({
  hospital,
  updateTime,
  onClose,
}: Props) {
  const today = new Date();

  const { data: averageWait } = useHospitalHourlyTrend(
    hospital.slug!,
    today.getDay(),
    today.getHours()
  );

  return (
    <Sheet
      open={hospital !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        className="w-[90%] sm:w-[540px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-left">{hospital.name}</SheetTitle>
          <SheetDescription>
            <HospitalBusynessText
              currentWait={hospital.wait!}
              averageWait={averageWait || 0}
            />
          </SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <HospitalChart
            slug={hospital.slug!}
            wait={hospital.wait!}
            updateTime={updateTime}
          />
        </div>

        <HospitalInformation
          googleMapsLink={hospital.googleMapsLink}
          link={buildHospitalLink(hospital.linkId)}
          address={hospital.address}
          telephone={hospital.telephone}
          fax={hospital.fax}
          email={hospital.email}
          website={hospital.website}
        />
      </SheetContent>
    </Sheet>
  );
}
