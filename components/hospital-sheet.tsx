import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HospitalInfo } from "@/hooks/useHospitals";
import HospitalInformation from "./hospital-information";
import { buildHospitalLink } from "@/data/hospitals";
import HospitalChart from "./hospital-chart";

interface Props {
  hospital: HospitalInfo | null;
  updateTime: Date;
  onClose: () => void;
}

export default function HospitalSheet({
  hospital,
  updateTime,
  onClose,
}: Props) {
  if (hospital === null) return null;
  return (
    <Sheet
      open={hospital !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="w-[90%] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-left">{hospital.name}</SheetTitle>
          <SheetDescription className="text-left">
            Estimated Wait Time: {hospital.wait}
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
