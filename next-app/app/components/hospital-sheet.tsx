"use client";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/app/components/shadcn/sheet";
import { HospitalWithWait } from "@/app/hooks/use-hospitals";
import HospitalInformation from "@/app/components/hospital-information";
import HospitalChart from "@/app/components/hospital-chart";
import { TrendMapping, useHospitalTrend } from "@/app/hooks/use-hospital-trend";
import HospitalBusynessText from "./hospital-busyness-text";
import { buildHospitalLink } from "@/app/lib/utils";
import { dayNames } from "@/app/lib/types";

interface Props {
	hospital: HospitalWithWait;
	updateTime: Date;
	onClose: () => void;
}

export default function HospitalSheet({
	hospital,
	updateTime,
	onClose,
}: Props) {
	const today = new Date();

	const { data: averageWait } = useHospitalTrend(
		hospital.id,
		dayNames[today.getDay()],
		today.getHours()
	);

	return (
		<Sheet
			open={hospital !== null}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<SheetContent
				className="w-[90%] sm:w-[540px]"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader>
					<SheetTitle className="text-left">
						{hospital.name}
					</SheetTitle>
					<SheetDescription>
						<HospitalBusynessText
							currentWait={hospital.wait!}
							averageWait={
								(averageWait?.trend as TrendMapping["hour"]) ||
								0
							}
						/>
					</SheetDescription>
				</SheetHeader>

				<div className="my-4">
					<HospitalChart
						hospitalId={hospital.id}
						slug={hospital.slug}
						wait={hospital.wait!}
						updateTime={updateTime}
					/>
				</div>

				<HospitalInformation
					googleMapsLink={hospital.google_maps_link}
					link={buildHospitalLink(hospital.ha_id)}
					address={hospital.address}
					telephone={hospital.phone}
					fax={hospital.fax}
					email={hospital.email}
					website={hospital.website}
				/>
			</SheetContent>
		</Sheet>
	);
}
