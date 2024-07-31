"use client";

import {
  ColumnDef,
  SortingState,
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
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

interface HospitalInformation {
  region: "HONG KONG ISLAND" | "KOWLOON" | "NEW TERRITORIES";
  link: string;
}

export const hospitals: Record<string, HospitalInformation> = {
  "ALICE HO MIU LING NETHERSOLE HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100171&Lang=ENG&Dimension=100&Parent_ID=10180",
  },
  "CARITAS MEDICAL CENTRE": {
    region: "KOWLOON",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100163&Lang=ENG&Dimension=100&Parent_ID=10179",
  },
  "KWONG WAH HOSPITAL": {
    region: "KOWLOON",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100153&Lang=ENG&Dimension=100&Parent_ID=10179",
  },
  "NORTH DISTRICT HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100178&Lang=ENG&Dimension=100&Parent_ID=10180",
  },
  "NORTH LANTAU HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=216546&Lang=ENG&Dimension=100&Parent_ID=10179",
  },
  "PRINCESS MARGARET HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100160&Lang=ENG&Dimension=100&Parent_ID=10179",
  },
  "POK OI HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100174&Lang=ENG&Dimension=100&Parent_ID=10181",
  },
  "PRINCE OF WALES HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100166&Lang=ENG&Dimension=100&Parent_ID=10180",
  },
  "PAMELA YOUDE NETHERSOLE EASTERN HOSPITAL": {
    region: "HONG KONG ISLAND",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100141&Lang=ENG&Dimension=100&Parent_ID=10175",
  },
  "QUEEN ELIZABETH HOSPITAL": {
    region: "KOWLOON",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100149&Lang=ENG&Dimension=100&Parent_ID=10177",
  },
  "QUEEN MARY HOSPITAL": {
    region: "HONG KONG ISLAND",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100131&Lang=ENG&Dimension=100&Parent_ID=10176",
  },
  "RUTTONJEE HOSPITAL": {
    region: "HONG KONG ISLAND",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100144&Lang=ENG&Dimension=100&Parent_ID=10175",
  },
  "ST JOHN HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100146&Lang=ENG&Dimension=100&Parent_ID=10175",
  },
  "TSEUNG KWAN O HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=101326&Lang=ENG&Dimension=100&Parent_ID=10178",
  },
  "TUEN MUN HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100173&Lang=ENG&Dimension=100&Parent_ID=10181",
  },
  "TIN SHUI WAI HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=235909&Lang=ENG&Dimension=100&Parent_ID=10181",
  },
  "UNITED CHRISTIAN HOSPITAL": {
    region: "KOWLOON",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100156&Lang=ENG&Dimension=100&Parent_ID=10178",
  },
  "YAN CHAI HOSPITAL": {
    region: "NEW TERRITORIES",
    link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100165&Lang=ENG&Dimension=100&Parent_ID=10179",
  },
};

export interface HospitalWaitTime {
  hospName: string;
  topWait: string;
  region?: string;
  link?: string;
}

export const columns: ColumnDef<HospitalWaitTime>[] = [
  {
    accessorKey: "hospName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hospital
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Region
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "topWait",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wait Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
  },
];

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function WaitTimeTable<TData, TValue>({
  columns,
  data,
}: Props<TData, TValue>) {
  console.log(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        link: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
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
        {table.getRowModel().rows?.length ? (
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
