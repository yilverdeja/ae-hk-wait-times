"use client";
import Footer from "@/components/footer";
import InformationDialog from "@/components/information-dialog";
import NavBar from "@/components/nav-bar";
import { Badge } from "@/components/ui/badge";
import WaitTimeTable from "@/components/wait-time-table";
import { getHospitalInformation } from "@/data/hospitals";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import moment from "moment";
import hospitalData, { HospitalNames } from "@/data/hospitalAverages";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import HospitalWaitTimesCard from "@/components/hospital-wait-times-card";

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

// TODO: Note you're trying to integrate the /hospital page into the main page

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] =
    useState<HospitalNames | null>(null);
  const [selectedHospitalWaitTime, setSelectedHospitalWaitTime] = useState<
    number | null
  >(null);
  const { data, isLoading, error } = useHospitalWaitTimes();

  useEffect(() => {
    if (data && selectedHospital) {
      const hospitalDataX = data.waitTime.find(
        (w) => w.hospName === selectedHospital
      );
      if (hospitalDataX && hospitalDataX.topWait) {
        setSelectedHospitalWaitTime(waitMapping[hospitalDataX.topWait] || null);
      }
      setOpen(true);
    }
  }, [selectedHospital]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4 sm:gap-2">
        <header className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-lg text-center font-bold mb-2 md:text-xl sm:text-left">
            Current A&E Waiting Times
          </h2>
          <InformationDialog />
        </header>
        <section className="w-full">
          <div className="flex justify-center sm:justify-start">
            {isLoading && <Badge variant="outline">Retrieving data...</Badge>}
            {data && (
              <Badge variant="outline">
                Updated on{" "}
                {moment(data?.updateTime, "D/M/YYYY h:mma").format(
                  "MMM Do YYYY, h:mma"
                )}
              </Badge>
            )}
          </div>
          <WaitTimeTable
            data={
              data
                ? data.waitTime.map((d) => {
                    const hospitalData = getHospitalInformation(d.hospName);
                    return {
                      hospName: d.hospName,
                      topWait: d.topWait,
                      region: hospitalData
                        ? hospitalData.region.long
                        : undefined,
                      link: hospitalData ? hospitalData.link : undefined,
                    };
                  })
                : null
            }
            isLoading={isLoading}
            onSelectHospital={setSelectedHospital}
          />
        </section>
      </main>
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedHospital(null);
            setSelectedHospitalWaitTime(null);
          }
        }}
      >
        <SheetContent className="w-[90%] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{selectedHospital}</SheetTitle>
            <SheetDescription>
              {selectedHospital && data && (
                <HospitalWaitTimesCard
                  data={hospitalData[selectedHospital as HospitalNames]}
                  currentWaitTime={selectedHospitalWaitTime || 0} // Fallback to 0 if no data
                  currentUpdateTime={moment(
                    data.updateTime,
                    "D/M/YYYY h:mma"
                  ).toDate()}
                />
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Footer />
    </div>
  );
}
