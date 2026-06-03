import { Storage } from "@google-cloud/storage";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isGcsConfigured(): boolean {
  return !!(
    process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64 ||
    process.env.GCP_SERVICE_ACCOUNT_KEY
  )
}

export function isValidSnapshotDate(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

function getCredentialsJson(): string {
  const raw = process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64
    ? Buffer.from(process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64, "base64").toString(
        "utf-8",
      )
    : process.env.GCP_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error("Missing GCP_SERVICE_ACCOUNT_KEY or GCP_SERVICE_ACCOUNT_KEY_BASE64");
  }

  return raw;
}

let storage: Storage | undefined;

export function getStorage(): Storage {
  if (!storage) {
    storage = new Storage({
      credentials: JSON.parse(getCredentialsJson()),
    });
  }
  return storage;
}

export function getBucketName(): string {
  return process.env.GCS_BUCKET ?? "hk-ae-waits-prod";
}

export async function readJsonFromGcs(objectPath: string): Promise<unknown> {
  const [buf] = await getStorage()
    .bucket(getBucketName())
    .file(objectPath)
    .download();
  return JSON.parse(buf.toString("utf-8"));
}

export const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
} as const;

export const GCS_PATHS = {
  rolling: "snapshots/rolling/latest.json",
  today: (date: string) => `snapshots/today/${date}.json`,
  predictions: "predictions/latest.json",
} as const;

export function gcsErrorStatus(err: unknown): number {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code?: number }).code;
    if (code === 404) return 404;
  }
  return 500;
}

export function gcsErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}
