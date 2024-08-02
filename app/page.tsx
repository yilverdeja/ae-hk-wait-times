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
import { ArrowUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const hospitalNames = [
  "Alice Ho Miu Ling Nethersole Hospital",
  "Caritas Medical Centre",
  "Kwong Wah Hospital",
  "North District Hospital",
  "North Lantau Hospital",
  "Princess Margaret Hospital",
  "Pok Oi Hospital",
  "Prince of Wales Hospital",
  "Pamela Youde Nethersole Eastern Hospital",
  "Queen Elizabeth Hospital",
  "Queen Mary Hospital",
  "Ruttonjee Hospital",
  "St John Hospital",
  "Tseung Kwan O Hospital",
  "Tuen Mun Hospital",
  "Tin Shui Wai Hospital",
  "United Christian Hospital",
  "Yan Chai Hospital",
];

export default function Home() {
  const { data, isLoading, error } = useHospitalWaitTimes();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4">
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
          {isLoading && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Hospital
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:block">
                    <div className="flex items-center">
                      Region
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Wait Time
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitalNames.map((hospitalName) => (
                  <TableRow key={hospitalName}>
                    <TableCell>{hospitalName}</TableCell>
                    <TableCell className="hidden md:block">
                      <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
