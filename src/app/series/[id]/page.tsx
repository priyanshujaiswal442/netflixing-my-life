import type { Metadata } from "next";
import { loadSeriesRecord } from "@/lib/series-store";
import { SeriesPageClient } from "./series-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await loadSeriesRecord(id);

  if (!record) {
    return { title: "Your Series | Netflixify My Life" };
  }

  const series = record.series;
  return {
    title: series.title,
    description: series.tagline,
    openGraph: {
      title: series.title,
      description: series.tagline,
      images: series.posterUrl ? [{ url: series.posterUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: series.title,
      description: series.tagline,
      images: series.posterUrl ? [series.posterUrl] : [],
    },
  };
}

export default async function SeriesPage({ params }: PageProps) {
  const { id } = await params;
  const record = await loadSeriesRecord(id);

  return <SeriesPageClient id={id} initialRecord={record ?? undefined} />;
}
