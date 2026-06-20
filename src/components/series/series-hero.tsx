"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRating } from "@/lib/utils";
import type { SeriesData } from "@/types";

interface SeriesHeroProps {
  series: SeriesData;
  onPlayTrailer: () => void;
}

export function SeriesHero({ series, onPlayTrailer }: SeriesHeroProps) {
  const posterUrl = series.posterUrl;
  const isLocalPoster =
    posterUrl?.startsWith("/api/") || posterUrl?.startsWith("data:") || false;

  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh]" aria-label="Series hero">
      {/* Background */}
      <div className="absolute inset-0">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt=""
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            unoptimized={isLocalPoster}
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-background to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-end px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
          {/* Poster */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-80 w-56 overflow-hidden rounded-lg poster-shadow">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={`${series.title} poster`}
                  fill
                  className="object-cover"
                  sizes="224px"
                  priority
                  unoptimized={isLocalPoster}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-red-950 to-card">
                  <span className="text-4xl font-bold text-primary/50">N</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Netflix Original Series
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {series.title}
            </h1>
            <p className="mt-4 text-lg text-muted italic sm:text-xl">
              &ldquo;{series.tagline}&rdquo;
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                {formatRating(series.imdbRating)}
              </span>
              <span className="text-muted">
                Audience Score: {series.audienceScore}%
              </span>
              <span className="rounded border border-border px-2 py-0.5 text-xs font-medium">
                {series.ageRating}
              </span>
              {series.genres.map((genre) => (
                <span key={genre} className="text-muted">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={onPlayTrailer} aria-label="Play trailer">
                <Play className="h-5 w-5 fill-current" />
                Play Trailer
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
