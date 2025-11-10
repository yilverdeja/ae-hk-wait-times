"use client"

import * as React from "react"
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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTableToolbar } from "@/components/HospitalTable/Toolbar"
import { BREAKPOINTS } from "@/lib/constants"
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
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                header.id === "region"
                                                    ? "hidden md:table-cell"
                                                    : ""
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
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
                                    onClick={() => onRowSelect?.(row.original)} // Call the handler with the row's original data
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={
                                                cell.column.id === "region"
                                                    ? "hidden md:table-cell"
                                                    : ""
                                            }
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
    )
}
