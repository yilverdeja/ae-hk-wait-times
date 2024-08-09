"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HospitalInfo } from "@/hooks/useHospitals";

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
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: filters,
      columnVisibility: { region_short: false },
    },
  });
  const handleHospitalClick = (hospital: HospitalInfo) => {
    onSelectHospital(hospital);
  };
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
        {data &&
          table.getRowModel().rows?.length > 0 &&
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className="pl-8"
                  key={cell.id}
                  onClick={
                    cell.column.id === "name"
                      ? () => handleHospitalClick(row.original)
                      : undefined
                  }
                >
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
