import {
    CACHE_HEADERS,
    GCS_PATHS,
    gcsErrorMessage,
    gcsErrorStatus,
    readJsonFromGcs,
  } from "@/lib/gcs";
  import type { SnapshotStore } from "@/types/gcs";
  
  export async function GET() {
    try {
      const data = (await readJsonFromGcs(GCS_PATHS.rolling)) as SnapshotStore;
      return Response.json(data, { headers: CACHE_HEADERS });
    } catch (err) {
      return Response.json(
        { error: gcsErrorMessage(err, "Failed to load rolling snapshots") },
        { status: gcsErrorStatus(err) },
      );
    }
  }
  