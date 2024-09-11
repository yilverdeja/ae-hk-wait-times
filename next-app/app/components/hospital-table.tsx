/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@/app/components/shadcn/table";
import { HospitalWithWait } from "@/app/hooks/use-hospitals";
import { Skeleton } from "@/app/components/shadcn/skeleton";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/app/lib/utils";
import { waitMapping } from "@/app/lib/types";
import { usePrefetchHospitalTrend } from "@/app/hooks/use-hospital-trend";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

interface Props {
	data: HospitalWithWait[];
	columns: any;
	filters: any[];
	isLoading: boolean;
	onSelectHospital: (hospital: HospitalWithWait) => void;
}

export default function HospitalTable({
	data,
	columns,
	filters,
	isLoading,
	onSelectHospital,
}: Props) {
	const queryClient = useQueryClient();
	const { breakpoint } = useBreakpoint(BREAKPOINTS);
	const columnVisibility = useMemo(
		() => ({
			region: breakpoint !== "mobile",
		}),
		[breakpoint]
	);
	const table = useReactTable({
		data: !data && isLoading ? Array(18).fill({}) : data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters: filters,
			columnVisibility,
		},
	});
	const prefetchTrendData = usePrefetchHospitalTrend(queryClient);
	const tableRows = useMemo(() => table.getRowModel().rows, [table]);

	// prefetches hospital trend data for first 5 rows anytime the table is updated
	useEffect(() => {
		if (data && tableRows.length > 0) {
			table
				.getRowModel()
				.rows.slice(0, 5)
				.forEach((row) => {
					prefetchTrendData(row.original.id);
				});
		}
	}, [tableRows, data, table, prefetchTrendData]);

	const handleHospitalClick = useCallback(
		(hospital: HospitalWithWait, index: number) => {
			sendGAEvent("event", "select_hospital", {
				hospital: hospital.name,
				wait: waitMapping[hospital.wait!.toString()],
				region: hospital.region,
				cluster: hospital.cluster,
			});
			onSelectHospital(hospital);

			// prefetch surrounding rows - top 2 and bottom 2
			const sortedRows = table.getSortedRowModel().rows;
			const selectedRowIndex = sortedRows.findIndex(
				(row) => row.index === index
			);
			const startIdx = Math.max(0, selectedRowIndex - 2);
			const endIdx = Math.min(sortedRows.length, selectedRowIndex + 3);
			sortedRows.slice(startIdx, endIdx).forEach((row) => {
				prefetchTrendData(row.original.id);
			});
		},
		[onSelectHospital, prefetchTrendData, table]
	);

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead
									className={
										header.id === "region"
											? "hidden md:block"
											: ""
									}
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
											table.getState().columnVisibility[
												column.id
											] !== false
									)
									.map((column) => (
										<TableCell
											className={
												column.id === "region"
													? "hidden md:block"
													: ""
											}
											key={column.id}
										>
											<Skeleton className="w-full h-4" />
										</TableCell>
									))}
							</TableRow>
					  ))
					: table.getRowModel().rows.map((row) => {
							return (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected()
											? "selected"
											: undefined
									}
									onClick={() =>
										handleHospitalClick(
											row.original,
											row.index
										)
									}
									onMouseEnter={() =>
										prefetchTrendData(row.original.id)
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className="pl-8"
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							);
					  })}
				{!isLoading && !data && (
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
	);
}
