"use client";
import { useEffect, useState } from "react";
import { HospitalInfo, useHospitals } from "@/hooks/useHospitals";
import {
  HospitalAcronyms,
  useHospitalWaitTimes,
} from "@/hooks/useHospitalWaitTimes";
import HospitalTable from "./hospital-table";
import HospitalSheet from "./hospital-sheet";
import { Column, createColumnHelper } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";

interface WaitMapping {
  [key: string]: string;
}

const waitMapping: WaitMapping = {
  "1": "Around 1 hour",
  "2": "Over 1 hour",
  "3": "Over 2 hours",
  "4": "Over 3 hours",
  "5": "Over 4 hours",
  "6": "Over 5 hours",
  "7": "Over 6 hours",
  "8": "Over 7 hours",
  "9": "Over 8 hours",
};

interface SortingButtonProps {
  column: Column<HospitalInfo, unknown>;
  children: React.ReactNode;
}

const SortingButton = ({ column, children }: SortingButtonProps) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

const columnHelper = createColumnHelper<HospitalInfo>();

const columns = [
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <SortingButton column={column}>Hospital</SortingButton>
    ),
    cell: (info) => {
      const name = info.renderValue();
      if (name)
        return (
          <span className="underline underline-offset-4 hover:cursor-pointer">
            {name}
          </span>
        );
    },
  }),
  columnHelper.accessor("region.long", {
    header: ({ column }) => (
      <SortingButton column={column}>Region</SortingButton>
    ),
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("wait", {
    header: ({ column }) => (
      <SortingButton column={column}>Wait Time</SortingButton>
    ),
    cell: (info) => {
      const value = info.renderValue();
      if (value) return waitMapping[value.toString()];
    },
  }),
];

interface Props {}

export default function HospitalsViews({}: Props) {
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(
    null
  );
  const [combinedData, setCombinedData] = useState<HospitalInfo[]>([]);
  const [updateTime, setUpdateTime] = useState<Date | null>(null);
  const { data: hospitalWaitTimes, isLoading: isLoadingWaitTimes } =
    useHospitalWaitTimes();
  const { data: hospitals, isLoading: isLoadingHospitals } = useHospitals();

  useEffect(() => {
    if (
      !isLoadingHospitals &&
      !isLoadingWaitTimes &&
      hospitals &&
      hospitalWaitTimes
    ) {
      const data = Object.keys(hospitals).map((slug) => {
        const hospital = hospitals[slug as HospitalAcronyms];
        const waitTime = hospitalWaitTimes.hospitals[slug as HospitalAcronyms];
        return {
          ...hospital,
          wait: waitTime,
          slug: slug as HospitalAcronyms,
        };
      });
      setCombinedData(data);
      setUpdateTime(
        moment(hospitalWaitTimes.updateTime, "D/M/YYYY h:mma").toDate()
      );
    }
  }, [hospitals, hospitalWaitTimes, isLoadingHospitals, isLoadingWaitTimes]);

  return (
    <>
      <HospitalTable
        data={combinedData}
        columns={columns}
        isLoading={isLoadingWaitTimes && isLoadingHospitals}
        onSelectHospital={setSelectedHospital}
      />
      <HospitalSheet
        hospital={selectedHospital}
        onClose={() => setSelectedHospital(null)}
        updateTime={updateTime || new Date()}
      />
    </>
  );
}
