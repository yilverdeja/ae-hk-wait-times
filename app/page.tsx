"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import Footer from "@/components/footer";
import InformationDialog from "@/components/information-dialog";
import NavBar from "@/components/nav-bar";
import { Badge } from "@/components/ui/badge";
import WaitTimeTable from "@/components/wait-time-table";
import { HospitalNames } from "@/data/hospitalAverages";
import { getHospitalInformation } from "@/data/hospitals";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import { useHospitals } from "@/hooks/useHospitals";
import WaitTimeSheet from "@/components/wait-time-sheet";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] =
    useState<HospitalNames | null>(null);
  const [selectedHospitalWaitTime, setSelectedHospitalWaitTime] = useState<
    string | null
  >(null);
  const { data, isLoading, error } = useHospitalWaitTimes();
  const {
    data: hospitals,
    isLoading: isLoadingHospitals,
    error: errorHospitals,
  } = useHospitals();

  useEffect(() => {
    if (data && selectedHospital) {
      const hospitalDataX = data.waitTime.find(
        (w) => w.hospName === selectedHospital
      );
      if (hospitalDataX && hospitalDataX.topWait) {
        setSelectedHospitalWaitTime(hospitalDataX.topWait || null);
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
          {data && hospitals && (
            <WaitTimeTable
              data={
                data
                  ? data.waitTime.map((d) => {
                      // const hospitalData = getHospitalInformation(d.hospName);
                      const hospitalData = hospitals[d.hospName];
                      return {
                        hospName: d.hospName,
                        topWait: d.topWait,
                        region: hospitalData.region.long,
                        slug: hospitalData.slug,
                        // region: hospitalData
                        //   ? hospitalData.region.long
                        //   : undefined,
                        // link: "",
                      };
                    })
                  : null
              }
              isLoading={isLoading}
              onSelectHospital={setSelectedHospital}
            />
          )}
        </section>
      </main>
      {data && selectedHospital && (
        <WaitTimeSheet
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setSelectedHospital(null);
              setSelectedHospitalWaitTime(null);
            }
          }}
          selectedHospital={selectedHospital!}
          selectedHospitalWaitTime={selectedHospitalWaitTime!}
          selectedHospitalUpdateTime={moment(
            data.updateTime,
            "D/M/YYYY h:mma"
          ).toDate()}
        />
      )}
      <Footer />
    </div>
  );
}
