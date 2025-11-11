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
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"

// Define the options in a structured way, making the component self-contained.
const dayOptions: {
    value: DayOfWeek
    longName: Record<LanguageCode, string>
    shortName: Record<LanguageCode, string>
}[] = [
    {
        value: "Sunday",
        longName: { en: "Sunday", zh: "星期日", cn: "星期日" },
        shortName: { en: "Sun", zh: "日", cn: "日" },
    },
    {
        value: "Monday",
        longName: { en: "Monday", zh: "星期一", cn: "星期一" },
        shortName: { en: "Mon", zh: "一", cn: "一" },
    },
    {
        value: "Tuesday",
        longName: { en: "Tuesday", zh: "星期二", cn: "星期二" },
        shortName: { en: "Tue", zh: "二", cn: "二" },
    },
    {
        value: "Wednesday",
        longName: { en: "Wednesday", zh: "星期三", cn: "星期三" },
        shortName: { en: "Wed", zh: "三", cn: "三" },
    },
    {
        value: "Thursday",
        longName: { en: "Thursday", zh: "星期四", cn: "星期四" },
        shortName: { en: "Thu", zh: "四", cn: "四" },
    },
    {
        value: "Friday",
        longName: { en: "Friday", zh: "星期五", cn: "星期五" },
        shortName: { en: "Fri", zh: "五", cn: "五" },
    },
    {
        value: "Saturday",
        longName: { en: "Saturday", zh: "星期六", cn: "星期六" },
        shortName: { en: "Sat", zh: "六", cn: "六" },
    },
]

const placeholderText = {
    en: "Select a day",
    zh: "選擇日期",
    cn: "选择日期",
}

interface DayOfWeekSelectorProps {
    selectedDay: DayOfWeek
    onDayChange: (newDay: DayOfWeek) => void
}

export function DayOfWeekSelector({
    selectedDay,
    onDayChange,
}: DayOfWeekSelectorProps) {
    const { lang } = useLanguage()
    return (
        <>
            {/* Mobile View: Use a Select dropdown */}
            <div className="sm:hidden">
                <Select
                    value={selectedDay}
                    onValueChange={(value) => onDayChange(value as DayOfWeek)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholderText[lang]} />
                    </SelectTrigger>
                    <SelectContent>
                        {dayOptions.map(({ value, longName }) => (
                            <SelectItem key={value} value={value}>
                                {longName[lang]}
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
                                {shortName[lang]}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </>
    )
}
