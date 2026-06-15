import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSeriesById } from "@/lib/supabase";
import { getFromMemory } from "@/lib/memory-store";
import { SeriesPageClient } from "./series-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSeries(id: string) {
  let record = await getSeriesById(id);
  if (!record) {
    record = await getFromMemory(id);
  }
  return record;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await getSeries(id);

  if (!record) {
    return { title: "Series Not Found" };
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
  const record = await getSeries(id);

  if (!record) {
    notFound();
  }

  return <SeriesPageClient record={record} />;
}
