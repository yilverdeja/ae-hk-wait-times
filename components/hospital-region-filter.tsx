import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

export interface RegionFilter {
  id: string;
  value: string[];
}

interface RegionItem {
  long: string;
  short: string;
}

interface Props {
  filters: RegionFilter[];
  onUpdateFilters: (newFilters: RegionFilter[]) => void;
}

const filterValues: RegionItem[] = [
  { long: "Hong Kong Island", short: "HKI" },
  { long: "New Territories", short: "NT" },
  { long: "Kowloon", short: "KL" },
];

export default function HospitalRegionFilter({
  filters,
  onUpdateFilters,
}: Props) {
  const id = "region";
  const activeFilter = filters.find((f) => f.id === id) || {
    id,
    value: [],
  };

  const isRegionChecked = (region: string) => {
    return activeFilter.value.includes(region);
  };

  const handleCheckboxChange = (region: string, checked: boolean) => {
    let newValue = [...activeFilter.value];
    if (checked) {
      newValue.push(region);
    } else {
      newValue = newValue.filter((item) => item !== region);
    }

    const newFilters = newValue.length > 0 ? [{ id, value: newValue }] : [];
    onUpdateFilters(newFilters);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row items-center justify-center gap-1"
          variant="ghost"
        >
          <span className="hidden md:block">Filter</span>
          <Filter className="block" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Region</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterValues.map((filterValue) => (
          <DropdownMenuCheckboxItem
            key={filterValue.short}
            checked={isRegionChecked(filterValue.long)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(filterValue.long, checked)
            }
          >
            {filterValue.long}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
