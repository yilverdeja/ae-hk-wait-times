"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { sendGAEvent } from "@next/third-parties/google";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HospitalInfo } from "@/hooks/useHospitals";
import { Skeleton } from "./ui/skeleton";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/lib/utils";
import { waitMapping } from "@/lib/types";

interface Props {
  data: HospitalInfo[];
  columns: any;
  filters: any[];
  isLoading: boolean;
  onSelectHospital: (hospital: HospitalInfo) => void;
}

export default function HospitalTable({
  data,
  columns,
  filters,
  isLoading,
  onSelectHospital,
}: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const table = useReactTable({
    data: !data && isLoading ? Array(18).fill({}) : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: filters,
      columnVisibility: { region: breakpoint !== "mobile" },
    },
  });

  const handleHospitalClick = (hospital: HospitalInfo) => {
    sendGAEvent("event", "select_hospital", {
      hospital: hospital.name,
      wait: waitMapping[hospital.wait!.toString()],
      region: hospital.region,
      cluster: hospital.cluster,
    });
    onSelectHospital(hospital);
  };
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className={header.id === "region" ? "hidden md:block" : ""}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 18 }, (_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      table.getState().columnVisibility[column.id] !== false
                  )
                  .map((column) => (
                    <TableCell
                      className={
                        column.id === "region" ? "hidden md:block" : ""
                      }
                      key={column.id}
                    >
                      <Skeleton className="w-full h-4" />
                    </TableCell>
                  ))}
              </TableRow>
            ))
          : table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                onClick={() => handleHospitalClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="pl-8" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        {!isLoading && !data && (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
