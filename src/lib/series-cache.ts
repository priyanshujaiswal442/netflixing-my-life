import type { SeriesRecord } from "@/types";

const CACHE_PREFIX = "netflixify-series-";

export function cacheSeriesRecord(record: SeriesRecord): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${CACHE_PREFIX}${record.id}`, JSON.stringify(record));
  } catch {
    // sessionStorage may be unavailable
  }
}

export function getCachedSeriesRecord(id: string): SeriesRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${CACHE_PREFIX}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as SeriesRecord;
  } catch {
    return null;
  }
}

export function updateCachedSeriesRecord(record: SeriesRecord): void {
  cacheSeriesRecord(record);
}
