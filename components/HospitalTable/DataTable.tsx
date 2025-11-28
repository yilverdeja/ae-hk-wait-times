"use client"

import { sendGAEvent } from "@next/third-parties/google"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { DataTableToolbar } from "@/components/HospitalTable/Toolbar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useLanguage } from "@/hooks/useLanguage"
import { BREAKPOINTS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { EnrichedHospitalData } from "@/types"
import { useBreakpoint } from "use-breakpoint"

// 1. Update props to accept the onRowSelect handler
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowSelect?: (row: TData) => void // Optional handler
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowSelect, // Destructure the new prop
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const { lang } = useLanguage()

    // 2. Remove rowSelection state. It's no longer needed here.
    // const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const { breakpoint } = useBreakpoint(BREAKPOINTS)

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility: { region: breakpoint !== "mobile" },
            // rowSelection is removed from state
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        // onRowSelectionChange is removed
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // We enable row selection for the entire table, which allows us to get row.getIsSelected() if needed,
        // but we won't be using the internal state management for it.
        enableRowSelection: true,
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="overflow-hidden rounded-md border">
                <div className="overflow-x-hidden [&_[data-slot=table-container]]:overflow-x-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={cn(
                                                    header.id === "region"
                                                        ? "hidden md:table-cell"
                                                        : "",
                                                    header.id === "name"
                                                        ? "whitespace-normal"
                                                        : ""
                                                )}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    // 3. Add the onClick handler to the entire row
                                    <TableRow
                                        key={row.id}
                                        // The data-state is now managed by the parent, but we can remove it
                                        // as the visual feedback is the opened sheet.
                                        className="cursor-pointer" // Add cursor-pointer for better UX
                                        onClick={() => {
                                            const hospital =
                                                row.original as EnrichedHospitalData
                                            // Track row click event
                                            sendGAEvent(
                                                "event",
                                                "hospital_row_clicked",
                                                {
                                                    hospitalSlug: hospital.slug,
                                                    hospitalName:
                                                        hospital.name[lang],
                                                    region: hospital.region,
                                                    waitTime:
                                                        hospital.waitTimes
                                                            .semiUrgentNonUrgentP50Minutes ??
                                                        null,
                                                }
                                            )
                                            onRowSelect?.(row.original)
                                        }} // Call the handler with the row's original data
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    cell.column.id === "region"
                                                        ? "hidden md:table-cell"
                                                        : "",
                                                    cell.column.id === "name"
                                                        ? "whitespace-normal"
                                                        : ""
                                                )}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
