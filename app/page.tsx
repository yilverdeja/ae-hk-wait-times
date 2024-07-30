"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import WaitTimeTable, { columns } from "@/components/wait-time-table";
import NavBar from "@/components/nav-bar";

interface WaitTime {
  hospName: string;
  topWait: string;
}

interface Data {
  waitTime: WaitTime[];
  updateTime: string;
}

export default function Home() {
  const today = new Date();
  const { theme, setTheme } = useTheme();
  const [data, setData] = useState<null | Data>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState(
    today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // minutes / 15 -> floor

  const getData = async () => {
    const url = "https://www.ha.org.hk/opendata/aed/aedwtdata-en.json";

    const formatted_dt =
      date
        ?.toLocaleDateString("zh-Hans-CN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("") +
      "-" +
      time.split(":").join("");

    const endpoint = `https://api.data.gov.hk/v1/historical-archive/get-file?url=${url}&time=${formatted_dt}`;
    await axios
      .get(endpoint)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    // setDate("2024-07-24");
    setTheme("light");
    setDate(new Date("2024-07-24"));
    setTime("00:30");
  }, []);

  useEffect(() => {
    getData();
  }, [date, time]);

  console.log(data);
  return (
    <>
      {/* <nav className="flex justify-between items-center"> */}
      {/* <h1 className="text-xl">A&E Wait Times</h1> */}
      <NavBar />
      {/* </nav> */}
      <main className="flex flex-col md:flex-row gap-4 justify-between items-center my-4">
        <h2 className="text-xl text-center">
          Reference waiting times in Hong Kong’s A&E Departments
        </h2>
        <section>
          <p className="text-xs text-center italic">
            *Priority will be accorded to patients triaged as critical,
            emergency and urgent.
          </p>
          {data && <WaitTimeTable columns={columns} data={data.waitTime} />}
        </section>
      </main>
      <footer></footer>
    </>
  );
}
