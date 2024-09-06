import { Tabs, TabsList, TabsTrigger } from "@/app/components/shadcn/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/shadcn/select";
import { daySelectOptions } from "@/app/lib/types";

interface Props {
  day: string;
  onChange: (newDay: string) => void;
}

export default function HospitalTrendSelector({ day, onChange }: Props) {
  return (
    <>
      <div className="block sm:hidden">
        <Select defaultValue={day} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue defaultValue={day} placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {daySelectOptions.map(({ value, long }) => (
              <SelectItem key={value} value={value}>
                {long}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden sm:block">
        <Tabs defaultValue={day} className="w-[400px]" onValueChange={onChange}>
          <TabsList>
            {daySelectOptions.map(({ value, short }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-xs px-[5px] sm:text-sm sm:px-3"
              >
                {short}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
