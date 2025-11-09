"use client";

import { Table } from "@tanstack/react-table";
import { AlertTriangle, Siren } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageCode, Region } from "@/types";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const regionOptions = Object.values(Region);

const legendCopy = {
  [LanguageCode.EN]: {
    managing: "Managing Case",
    managingMultiple: "Multiple Cases",
    region: "Filter by region...",
    resuscitation: "Hide hospitals managing critical cases",
  },
  [LanguageCode.ZH]: {
    managing: "處理中",
    managingMultiple: "多宗處理中",
    region: "按地區篩選...",
    resuscitation: "隱藏正在處理危殆個案的醫院",
  },
  [LanguageCode.CN]: {
    managing: "处理中",
    managingMultiple: "多宗处理中",
    region: "按地区筛选...",
    resuscitation: "隐藏正在处理危殆个案的医院",
  },
};

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const { lang } = useLanguage();
  const copy = legendCopy[lang];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Filter Controls */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Select
          value={(table.getColumn("region")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => table.getColumn("region")?.setFilterValue(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={copy.region} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regionOptions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="resuscitation-filter"
            checked={(table.getColumn("name")?.getFilterValue() as boolean) ?? false}
            onCheckedChange={(value) => table.getColumn("name")?.setFilterValue(value)}
          />
          <Label htmlFor="resuscitation-filter">{copy.resuscitation}</Label>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 rounded-md border bg-muted p-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span>{copy.managing}</span>
        </div>
        <div className="flex items-center gap-2">
          <Siren className="h-4 w-4 text-red-600" />
          <span>{copy.managingMultiple}</span>
        </div>
      </div>
    </div>
  );
}