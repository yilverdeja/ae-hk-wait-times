"use client";
import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import HospitalTable from "@/app/components/hospital-table";
import HospitalSheet from "@/app/components/hospital-sheet";
import { Column, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/app/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import HospitalRegionFilter from "@/app/components/hospital-region-filter";
import { RegionFilter, waitMapping } from "@/app/lib/types";
import { HospitalWithWait } from "../hooks/use-hospitals";
import useHospitalData from "../hooks/use-hospital-data";
import UpdateTimeBadge from "@/app/components/update-time-badge";

interface SortingButtonProps {
	column: Column<HospitalWithWait, unknown>;
	children: React.ReactNode;
}

const SortingButton = ({ column, children }: SortingButtonProps) => (
	<Button
		variant="ghost"
		onClick={() => {
			sendGAEvent("event", "sort_column", {
				column: children as string,
				direction: column.getIsSorted() === "asc" ? "desc" : "asc",
			});
			column.toggleSorting(column.getIsSorted() === "asc");
		}}
	>
		{children}
		<ArrowUpDown className="ml-2 h-4 w-4" />
	</Button>
);

const columnHelper = createColumnHelper<HospitalWithWait>();

export default function HospitalView() {
	const [selectedHospital, setSelectedHospital] =
		useState<HospitalWithWait | null>(null);
	const [filters, setFilters] = useState<RegionFilter[]>([]);
	const { combinedData, updateTime, isLoading } = useHospitalData();

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
			enableHiding: false,
		}),
		columnHelper.accessor("region", {
			header: ({ column }) => (
				<SortingButton column={column}>Region</SortingButton>
			),
			cell: (info) => info.renderValue(),
			filterFn: "arrIncludesSome",
			enableHiding: true,
		}),
		columnHelper.accessor("wait", {
			header: ({ column }) => (
				<SortingButton column={column}>Wait Time</SortingButton>
			),
			cell: (info) => {
				const value = info.renderValue();
				if (value) return waitMapping[value.toString()];
			},
			enableHiding: false,
		}),
	];

	return (
		<>
			<div className="flex flex-row items-center justify-between">
				<UpdateTimeBadge
					updateTime={updateTime}
					isLoading={isLoading}
				/>
				<HospitalRegionFilter
					filters={filters}
					onUpdateFilters={setFilters}
				/>
			</div>
			<HospitalTable
				data={combinedData}
				columns={columns}
				filters={filters}
				isLoading={isLoading}
				onSelectHospital={setSelectedHospital}
			/>
			{selectedHospital && (
				<HospitalSheet
					hospital={selectedHospital}
					onClose={() => setSelectedHospital(null)}
					updateTime={updateTime || new Date()}
				/>
			)}
		</>
	);
}
