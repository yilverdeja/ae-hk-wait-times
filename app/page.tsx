"use client";
import WaitTimeTable, {
  columns,
  hospitals,
} from "@/components/wait-time-table";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import InformationDialog from "@/components/information-dialog";

export default function Home() {
  const { data, isLoading, error } = useHospitalWaitTimes();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4 md:grid md:grid-cols-2 md:items-start md:gap-8">
        <header className="w-full flex flex-col justify-center items-center md:col-span-1">
          <h2 className="text-lg text-center font-bold mb-2 md:text-xl sm:text-left">
            Current A&E Waiting Times
          </h2>
          <InformationDialog />
        </header>
        <section className="w-full md:col-span-1">
          <div className="flex justify-center sm:justify-start">
            <Badge variant="outline">
              Updated on{" "}
              {moment(data?.updateTime, "D/M/YYYY h:mma").format(
                "MMM Do YYYY, h:mma"
              )}
            </Badge>
          </div>
          {data && (
            <WaitTimeTable
              columns={columns}
              data={data.waitTime.map((d) => {
                return { ...d, ...hospitals[d.hospName.toUpperCase()] };
              })}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
