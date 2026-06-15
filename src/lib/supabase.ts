import { createClient } from "@supabase/supabase-js";
import type { SeriesRecord, UserAnswers, SeriesData } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerClient() {
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    return null;
  }
  return createClient(supabaseUrl, key);
}

export async function saveSeries(
  answers: UserAnswers,
  series: SeriesData,
  posterUrl?: string,
  id?: string
): Promise<SeriesRecord | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("series")
    .insert({
      ...(id ? { id } : {}),
      answers,
      series,
      poster_url: posterUrl || series.posterUrl,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to save series:", error);
    return null;
  }

  return data as SeriesRecord;
}

export async function getSeriesById(id: string): Promise<SeriesRecord | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("series")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch series:", error);
    return null;
  }

  return data as SeriesRecord;
}

export async function updateSeriesPoster(
  id: string,
  posterUrl: string
): Promise<SeriesRecord | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data: existing, error: fetchError } = await supabase
    .from("series")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return null;
  }

  const record = existing as SeriesRecord;
  const updatedSeries = { ...record.series, posterUrl };

  const { data, error } = await supabase
    .from("series")
    .update({
      series: updatedSeries,
      poster_url: posterUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update series poster:", error);
    return null;
  }

  return data as SeriesRecord;
}
