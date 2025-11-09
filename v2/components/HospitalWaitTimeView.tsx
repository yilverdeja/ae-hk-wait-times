"use client";

import { useMemo } from "react";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"; // Your data fetching hook
import { getColumns } from "@/components/HospitalTable/Columns";
import { DataTable } from "@/components/HospitalTable/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import dayjs from "@/lib/dayjs";
import {useLanguage} from "@/hooks/useLanguage";

function HospitalWaitTimeView() {
  const { data, isLoading, isError, error } = useHospitalWaitTimes();
  const { lang } = useLanguage();
  // Memoize columns to prevent re-creating them on every render
  // The getColumns function internally uses a hook, so this works as intended.
  const columns = useMemo(() => getColumns(lang), [lang]);

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message || "Failed to load hospital wait times."}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Last Updated: {data ? dayjs(data.lastUpdated).format("MMM Do YYYY, h:mm A") : ""}
        </p>
      </div>
      <DataTable columns={columns} data={data?.waitTimes || []} />
    </div>
  );
}

export default HospitalWaitTimeView;