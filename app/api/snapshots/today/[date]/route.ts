import {
    CACHE_HEADERS,
    GCS_PATHS,
    gcsErrorMessage,
    gcsErrorStatus,
    isGcsConfigured,
    isValidSnapshotDate,
    readJsonFromGcs,
  } from "@/lib/gcs";
  import type { SnapshotStore } from "@/types/gcs";

  type RouteContext = {
    params: Promise<{ date: string }>;
  };

  export async function GET(_request: Request, context: RouteContext) {
    if (!isGcsConfigured()) {
      return Response.json({ gcsAvailable: false }, { status: 503 });
    }

    const { date } = await context.params;

    if (!isValidSnapshotDate(date)) {
      return Response.json(
        { error: "Invalid date; use YYYY-MM-DD (HKT calendar date)" },
        { status: 400 },
      );
    }

    try {
      const data = (await readJsonFromGcs(GCS_PATHS.today(date))) as SnapshotStore;
      return Response.json(data, { headers: CACHE_HEADERS });
    } catch (err) {
      return Response.json(
        { error: gcsErrorMessage(err, "Failed to load today snapshots") },
        { status: gcsErrorStatus(err) },
      );
    }
  }
  