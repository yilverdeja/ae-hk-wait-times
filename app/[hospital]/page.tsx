"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import HospitalWaitTimesCard from "@/components/hospital-wait-times-card";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import myData from "@/data/hospital_averages.json";

interface HospitalPageProps {
  params: { hospital: string };
}

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

export default function HospitalPage({ params }: HospitalPageProps) {
  const hospital = "Caritas Medical Centre";
  const { data, isLoading, error } = useHospitalWaitTimes();
  const [currentWaitTime, setCurrentWaitTime] = useState<number | null>(null);

  useEffect(() => {
    if (data && params.hospital) {
      const hospitalData = data.waitTime.find((w) => w.hospName === hospital);
      if (hospitalData && hospitalData.topWait) {
        setCurrentWaitTime(waitMapping[hospitalData.topWait] || null);
      }
    }
  }, [data, params.hospital]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4 sm:gap-2">
        <h1 className="text-3xl">{hospital}</h1>
        <h2>
          Current Wait:{" "}
          {currentWaitTime ? `${currentWaitTime} hours` : "Unavailable"}
        </h2>
        {data && (
          <HospitalWaitTimesCard
            data={myData[hospital]}
            currentWaitTime={currentWaitTime || 0} // Fallback to 0 if no data
            currentUpdateTime={moment(
              data.updateTime,
              "D/M/YYYY h:mma"
            ).toDate()}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
