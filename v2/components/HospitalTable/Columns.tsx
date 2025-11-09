// components/hospital-table/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, ArrowUpDown, Siren } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { EnrichedHospitalData, LanguageCode, ManagementStatus, Region } from "@/types";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { regionNames } from "@/data/regions";

// Helper to format minutes into a readable string (e.g., 75 -> "1 hr 15 min")
const formatMinutes = (minutes: number | null, lang: LanguageCode): string => {
  if (minutes === null || minutes < 0) {
    return lang === LanguageCode.EN ? "N/A" : "不適用";
  }
  if (minutes === 0) {
    return lang === LanguageCode.EN ? "Available" : "可用";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hrText = lang === LanguageCode.EN ? "hr" : "小時";
  const minText = lang === LanguageCode.EN ? "min" : "分鐘";

  let result = "";
  if (hours > 0) {
    result += `${hours} ${hrText} `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes} ${minText}`;
  }

  return result.trim();
};

// Localized display names for ManagementStatus
const managementStatusCopy: Record<ManagementStatus, Record<LanguageCode, string>> = {
  [ManagementStatus.Managing]: {
    [LanguageCode.EN]: "Managing at least one critical case",
    [LanguageCode.ZH]: "正在處理至少一宗危殆個案",
    [LanguageCode.CN]: "正在处理至少一宗危殆个案",
  },
  [ManagementStatus.ManagingMultiple]: {
    [LanguageCode.EN]: "Managing multiple critical cases",
    [LanguageCode.ZH]: "正在處理多宗危殆個案",
    [LanguageCode.CN]: "正在处理多宗危殆个案",
  },
  [ManagementStatus.NotManaging]: {
    [LanguageCode.EN]: "No critical cases being managed",
    [LanguageCode.ZH]: "沒有處理危殆個案",
    [LanguageCode.CN]: "没有处理危殆个案",
  },
};

// This hook encapsulates the language logic to be reused in column definitions
const useColumnLanguage = () => {
  const { lang } = useLanguage();
  return { lang };
};

export const getColumns = (): ColumnDef<EnrichedHospitalData>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const { lang } = useColumnLanguage();
      const headerText = { en: "Hospital", zh: "醫院", cn: "医院" }[lang];
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {headerText}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { lang } = useColumnLanguage();
      const hospital = row.original;
      const hospitalName = hospital.name[lang];
      const { criticalManagementStatus, emergencyManagementStatus } = hospital;

      // Determine the highest severity status
      const isManagingMultiple =
        criticalManagementStatus === ManagementStatus.ManagingMultiple ||
        emergencyManagementStatus === ManagementStatus.ManagingMultiple;
      const isManaging =
        criticalManagementStatus === ManagementStatus.Managing ||
        emergencyManagementStatus === ManagementStatus.Managing;
      
      let icon = null;
      if (isManagingMultiple) {
        icon = (
          <Tooltip>
            <TooltipTrigger>
              <Siren className="h-5 w-5 text-red-600 animate-pulse" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{managementStatusCopy[ManagementStatus.ManagingMultiple][lang]}</p>
            </TooltipContent>
          </Tooltip>
        );
      } else if (isManaging) {
        icon = (
          <Tooltip>
            <TooltipTrigger>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{managementStatusCopy[ManagementStatus.Managing][lang]}</p>
            </TooltipContent>
          </Tooltip>
        );
      }

      return (
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-medium">{hospitalName}</span>
          </div>
        </TooltipProvider>
      );
    },
    // Custom sorting function to sort based on the current language
    sortingFn: (rowA, rowB, columnId) => {
      // This is a bit of a hack since we can't get lang here directly.
      // The table will re-sort when data changes, which happens on lang change.
      // We'll rely on the default string sort which works once the cell values are updated.
      // For a more robust solution, you'd pass lang into the table instance.
      const lang = (document.documentElement.lang as LanguageCode) || LanguageCode.EN;
      const nameA = rowA.original.name[lang];
      const nameB = rowB.original.name[lang];
      return nameA.localeCompare(nameB);
    },
    filterFn: (row, id, value: boolean) => {
        const { criticalManagementStatus, emergencyManagementStatus } = row.original;
        // Show all hospitals
        if (!value) return true;

        // If the hospital is not managing any critical cases, return true
      return criticalManagementStatus === ManagementStatus.NotManaging && emergencyManagementStatus === ManagementStatus.NotManaging;
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      const { lang } = useColumnLanguage();
      const headerText = { en: "Region", zh: "地區", cn: "地区" }[lang];
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {headerText}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
    const { lang } = useColumnLanguage();
      // Assuming Region enum values are in English and need no translation map
      const region = regionNames[row.original.region];
      return <div>{region[lang]}</div>;
    },
    // Add a filter function for the toolbar
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, columnId) => {
        const lang = (document.documentElement.lang as LanguageCode) || LanguageCode.EN;
        const regionA = regionNames[rowA.original.region][lang];
        const regionB = regionNames[rowB.original.region][lang];
        return regionA.localeCompare(regionB);
    }
  },
  {
    accessorKey: "waitTimes",
    header: ({ column }) => {
      const { lang } = useColumnLanguage();
      const headerText = { en: "Wait Time (Semi-Urgent)", zh: "等候時間 (半緊急)", cn: "等候时间 (半紧急)" }[lang];
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {headerText}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { lang } = useColumnLanguage();
      const waitTime = row.original.waitTimes.semiUrgentNonUrgentP50Minutes;
      return <div className="text-right font-semibold">{formatMinutes(waitTime, lang)}</div>;
    },
    // Sort by the raw number, not the formatted string
    sortingFn: (rowA, rowB) => {
      const timeA = rowA.original.waitTimes.semiUrgentNonUrgentP50Minutes ?? Infinity;
      const timeB = rowB.original.waitTimes.semiUrgentNonUrgentP50Minutes ?? Infinity;
      return timeA < timeB ? -1 : timeA > timeB ? 1 : 0;
    },
  },
];