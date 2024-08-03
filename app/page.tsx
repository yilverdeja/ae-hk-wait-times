"use client";
import WaitTimeTable from "@/components/wait-time-table";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import InformationDialog from "@/components/information-dialog";
import { hospitals } from "@/data/hospitals";

export default function Home() {
  const { data, isLoading, error } = useHospitalWaitTimes();

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
                    return { ...d, ...hospitals[d.hospName.toUpperCase()] };
                  })
                : null
            }
            isLoading={isLoading}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
