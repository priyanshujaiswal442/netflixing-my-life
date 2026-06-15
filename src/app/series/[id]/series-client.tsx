"use client";

import { useState } from "react";
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
import type { SeriesRecord } from "@/types";

interface SeriesPageClientProps {
  record: SeriesRecord;
}

export function SeriesPageClient({ record }: SeriesPageClientProps) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const series = {
    ...record.series,
    posterUrl: record.series.posterUrl || record.poster_url,
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SeriesHero series={series} onPlayTrailer={() => setTrailerOpen(true)} />
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
