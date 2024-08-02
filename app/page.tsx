"use client";
import axios from "axios";
import WaitTimeTable, {
  columns,
  hospitals,
} from "@/components/wait-time-table";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Information from "@/components/information";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

interface WaitTime {
  hospName: string;
  topWait: string;
}

interface Data {
  waitTime: WaitTime[];
  updateTime: string;
}

const getData = async (): Promise<Data> => {
  console.log("getdata");
  const url = "https://www.ha.org.hk/opendata/aed/aedwtdata-en.json";
  // const formatted_dt =
  //   new Date("2024-07-24")
  //     .toLocaleDateString("zh-Hans-CN", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //     })
  //     .split("/")
  //     .join("") +
  //   "-" +
  //   "00:30".split(":").join("");
  // const endpoint = `https://api.data.gov.hk/v1/historical-archive/get-file?url=${url}&time=${formatted_dt}`;
  // const response = await axios.get(endpoint);
  const response = await axios.get(url);
  return response.data; // Make sure to return just the data object
};

export default function Home() {
  const { data, error, isLoading } = useQuery<Data>({
    queryKey: ["data"],
    queryFn: () => getData(),
    refetchInterval: (query) => {
      // refetch at 15 minute intervals
      const updateTime = query.state.data?.updateTime;
      if (!updateTime) return 1000;

      // retrieve the most recent data's update time and calculate fetch time 15 mins later
      const refetchTime = moment(updateTime, "D/M/YYYY h:mma")
        .add(15, "minutes")
        .toDate();
      const currentTime = new Date();

      // get the difference between refetch time and current time
      const diffTime = refetchTime.getTime() - currentTime.getTime();
      console.log(diffTime / (1000 * 60));
      if (diffTime <= 0) return 1000 * 60; // if current time > refetch time then wait 1 minute

      return diffTime;
    },
  });

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
          <div className="flex justify-end md:justify-end">
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
