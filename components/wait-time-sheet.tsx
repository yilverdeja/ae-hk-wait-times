"use client";
import hospitalData, { HospitalNames } from "@/data/hospitalAverages";
import HospitalWaitTimesCard from "@/components/hospital-wait-times-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-left">{selectedHospital}</SheetTitle>
          <SheetDescription className="text-left">
            Estimated Wait Time: {selectedHospitalWaitTime}
          </SheetDescription>
        </SheetHeader>
        <div className="my-4">
          <HospitalWaitTimesCard
            data={hospitalData[selectedHospital as HospitalNames]}
            currentWaitTime={waitMapping[selectedHospitalWaitTime!] || 0} // Fallback to 0 if no data
            currentUpdateTime={selectedHospitalUpdateTime}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}