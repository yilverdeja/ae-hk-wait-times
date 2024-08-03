"use client";

import {
  Column,
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { hospitals } from "@/data/hospitals";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useBreakpoint from "use-breakpoint";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

interface HospitalWaitTime {
  hospName: string;
  topWait: string;
  region?: string;
  link?: string;
}

interface SortingButtonProps {
  column: Column<HospitalWaitTime, unknown>;
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

const columns: ColumnDef<HospitalWaitTime>[] = [
  {
    accessorKey: "hospName",
    header: ({ column }) => (
      <SortingButton column={column}>Hospital</SortingButton>
    ),
    cell: ({ row }) => {
      const name = row.getValue("hospName") as string;
      const link = row.getValue("link") as string;
      return (
        <Link
          className="underline underline-offset-4"
          href={link}
          target="_blank"
        >
          {name}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return <SortingButton column={column}>Region</SortingButton>;
    },
  },
  {
    accessorKey: "topWait",
    header: ({ column }) => {
      return <SortingButton column={column}>Wait Time</SortingButton>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "link",
    header: "Link",
  },
];

interface Props {
  data: HospitalWaitTime[] | null;
  isLoading: boolean;
}

export default function WaitTimeTable({ data, isLoading }: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    hospName: true,
    topWait: true,
    region: true,
    link: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  // removes the "region" column on mobile versions
  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      region: breakpoint !== "mobile",
    }));
  }, [breakpoint]);

  return (
    <Table className="my-4">
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
        {isLoading &&
          Array.from(hospitals.keys()).map((hospitalName) => (
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
        {data && table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="pl-8" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
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
