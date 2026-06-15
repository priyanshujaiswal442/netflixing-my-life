"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SeriesHero } from "@/components/series/series-hero";
import { Synopsis } from "@/components/series/synopsis";
import { Episodes } from "@/components/series/episodes";
import { CharacterSection } from "@/components/series/character-section";
import { Reviews } from "@/components/series/reviews";
import { FutureSeasons } from "@/components/series/future-seasons";
import { QuoteSection } from "@/components/series/quote-section";
import { TrailerModal } from "@/components/series/trailer-modal";
import { SharePanel } from "@/components/series/share-panel";
import { Button } from "@/components/ui/button";
import {
  getCachedSeriesRecord,
  updateCachedSeriesRecord,
} from "@/lib/series-cache";
import type { SeriesRecord, SeriesData } from "@/types";

interface SeriesPageClientProps {
  id: string;
  initialRecord?: SeriesRecord;
}

function mergePoster(record: SeriesRecord): SeriesData {
  return {
    ...record.series,
    posterUrl: record.series.posterUrl || record.poster_url,
  };
}

export function SeriesPageClient({ id, initialRecord }: SeriesPageClientProps) {
  const router = useRouter();
  const [record, setRecord] = useState<SeriesRecord | null>(
    initialRecord ?? null
  );
  const [loading, setLoading] = useState(!initialRecord);
  const [posterLoading, setPosterLoading] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const posterRequested = useRef(false);

  useEffect(() => {
    if (initialRecord) return;

    const cached = getCachedSeriesRecord(id);
    if (cached) {
      setRecord(cached);
      setLoading(false);
      return;
    }

    fetch(`/api/series/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Series not found");
        }
        return response.json() as Promise<SeriesRecord>;
      })
      .then((data) => {
        setRecord(data);
        updateCachedSeriesRecord(data);
      })
      .catch(() => {
        setError("This series could not be loaded. Try creating a new one.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, initialRecord]);

  useEffect(() => {
    if (!record || posterRequested.current) return;

    const posterUrl = record.series.posterUrl || record.poster_url;
    if (posterUrl) return;

    posterRequested.current = true;
    let cancelled = false;
    setPosterLoading(true);

    fetch(`/api/series/${id}/poster`, { method: "POST" })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<{ posterUrl?: string; record?: SeriesRecord }>;
      })
      .then((data) => {
        if (cancelled || !data?.posterUrl) return;

        const updated: SeriesRecord = data.record ?? {
          ...record,
          series: { ...record.series, posterUrl: data.posterUrl },
          poster_url: data.posterUrl,
        };

        setRecord(updated);
        updateCachedSeriesRecord(updated);
      })
      .finally(() => {
        if (!cancelled) setPosterLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, record]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
          <p className="text-muted">Loading your series...</p>
        </div>
      </main>
    );
  }

  if (error || !record) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <p className="text-muted">{error ?? "Series not found"}</p>
        <Button className="mt-6" onClick={() => router.push("/create")}>
          Create Your Series
        </Button>
      </main>
    );
  }

  const series = mergePoster(record);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SeriesHero
        series={series}
        onPlayTrailer={() => setTrailerOpen(true)}
        posterLoading={posterLoading}
      />
      <SharePanel series={series} seriesId={record.id} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Synopsis series={series} />
        <Episodes series={series} />
        <CharacterSection series={series} />
        <Reviews series={series} />
        <FutureSeasons series={series} />
        <QuoteSection series={series} />
      </div>

      <TrailerModal
        series={series}
        open={trailerOpen}
        onOpenChange={setTrailerOpen}
      />
    </main>
  );
}
