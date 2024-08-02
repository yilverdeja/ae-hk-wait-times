"use client";
import WaitTimeTable, {
  columns,
  hospitals,
} from "@/components/wait-time-table";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Information from "@/components/information";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";

export default function Home() {
  const { data, isLoading, error } = useHospitalWaitTimes();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4 md:grid md:grid-cols-2 md:items-start md:gap-8">
        <header className="md:col-span-1">
          <h2 className="text-lg text-left font-bold mb-2 md:text-xl md:text-left">
            Current A&E Waiting Times
          </h2>
          <p className="text-md text-left">
            The data shows an <span className="italic">estimated</span>{" "}
            reference of the latest waiting times at different emergency
            departments in Hong Kong
          </p>
          <div className="w-full hidden md:block md:mt-4">
            <Information />
          </div>
        </header>
        <section className="w-full md:col-span-1">
          <div className="flex justify-center md:justify-end">
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
        <div className="w-full block mt-2 md:hidden">
          <Information />
        </div>
      </main>
      <Footer />
    </>
  );
}
