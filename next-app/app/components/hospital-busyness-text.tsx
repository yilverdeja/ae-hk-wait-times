import { waitMapping } from "@/app/lib/types";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

const BusynessLevels = {
  NORMAL: "Normal Wait",
  SLIGHTLY_BUSIER: "Slightly busier",
  SLIGHTLY_QUIETER: "Slightly quieter",
  MUCH_BUSIER: "Much busier",
  MUCH_QUIETER: "Much quieter",
};

const getBusynessDescription = (current: number, average: number) => {
  const diff = Math.abs(current - average);

  if (diff <= 0.5) {
    return BusynessLevels.NORMAL;
  } else if (diff <= 1) {
    return current > average
      ? BusynessLevels.SLIGHTLY_BUSIER
      : BusynessLevels.SLIGHTLY_QUIETER;
  } else {
    return current > average
      ? BusynessLevels.MUCH_BUSIER
      : BusynessLevels.MUCH_QUIETER;
  }
};

interface Props {
  currentWait: number;
  averageWait: number;
}

export default function HospitalBusynessText({
  currentWait,
  averageWait,
}: Props) {
  const [busynessMessage, setBusynessMessage] = useState("");

  useEffect(() => {
    const busynessDescription = getBusynessDescription(
      currentWait,
      averageWait
    );
    setBusynessMessage(
      `${busynessDescription}: ${waitMapping[currentWait.toString()]}`
    );
  }, [currentWait, averageWait]);

  return (
    <span className="text-md text-left flex flex-row gap-2 my-2 items-center">
      <InfoIcon size={20} />
      <span>{busynessMessage}</span>
    </span>
  );
}
