"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DayOfWeek } from "@/types/trends"

// Define the options in a structured way, making the component self-contained.
const dayOptions: {
    value: DayOfWeek
    longName: string
    shortName: string
}[] = [
    { value: "Sunday", longName: "Sunday", shortName: "Sun" },
    { value: "Monday", longName: "Monday", shortName: "Mon" },
    { value: "Tuesday", longName: "Tuesday", shortName: "Tue" },
    { value: "Wednesday", longName: "Wednesday", shortName: "Wed" },
    { value: "Thursday", longName: "Thursday", shortName: "Thu" },
    { value: "Friday", longName: "Friday", shortName: "Fri" },
    { value: "Saturday", longName: "Saturday", shortName: "Sat" },
]

interface DayOfWeekSelectorProps {
    selectedDay: DayOfWeek
    onDayChange: (newDay: DayOfWeek) => void
}

export function DayOfWeekSelector({
    selectedDay,
    onDayChange,
}: DayOfWeekSelectorProps) {
    return (
        <>
            {/* Mobile View: Use a Select dropdown */}
            <div className="sm:hidden">
                <Select
                    value={selectedDay}
                    onValueChange={(value) => onDayChange(value as DayOfWeek)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                        {dayOptions.map(({ value, longName }) => (
                            <SelectItem key={value} value={value}>
                                {longName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Desktop View: Use Tabs for quick selection */}
            <div className="hidden sm:block">
                <Tabs
                    value={selectedDay}
                    onValueChange={(value) => onDayChange(value as DayOfWeek)}
                >
                    <TabsList>
                        {dayOptions.map(({ value, shortName }) => (
                            <TabsTrigger key={value} value={value}>
                                {shortName}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </>
    )
}
