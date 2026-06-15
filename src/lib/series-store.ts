import { getSeriesById, updateSeriesPoster } from "@/lib/supabase";
import { getFromMemory, saveToMemory } from "@/lib/memory-store";
import type { SeriesRecord } from "@/types";

export async function loadSeriesRecord(id: string): Promise<SeriesRecord | null> {
  let record = await getSeriesById(id);
  if (!record) {
    record = await getFromMemory(id);
  }
  return record;
}

export async function saveSeriesRecord(record: SeriesRecord): Promise<void> {
  await saveToMemory(record);
}

export async function updateSeriesRecordPoster(
  id: string,
  posterUrl: string
): Promise<SeriesRecord | null> {
  let record = await loadSeriesRecord(id);
  if (!record) return null;

  const updated: SeriesRecord = {
    ...record,
    series: { ...record.series, posterUrl },
    poster_url: posterUrl,
  };

  const fromSupabase = await updateSeriesPoster(id, posterUrl);
  if (fromSupabase) {
    await saveToMemory(fromSupabase);
    return fromSupabase;
  }

  await saveToMemory(updated);
  return updated;
}
