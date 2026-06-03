import {
    CACHE_HEADERS,
    GCS_PATHS,
    gcsErrorMessage,
    gcsErrorStatus,
    readJsonFromGcs,
  } from "@/lib/gcs";
  import type { PredictionsDocument } from "@/types/gcs";
  
  export async function GET() {
    try {
      const data = (await readJsonFromGcs(
        GCS_PATHS.predictions,
      )) as PredictionsDocument;
      return Response.json(data, { headers: CACHE_HEADERS });
    } catch (err) {
      return Response.json(
        { error: gcsErrorMessage(err, "Failed to load predictions") },
        { status: gcsErrorStatus(err) },
      );
    }
  }
  