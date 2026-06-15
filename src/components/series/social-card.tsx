"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { formatRating } from "@/lib/utils";
import type { SeriesData } from "@/types";

interface SocialCardProps {
  series: SeriesData;
}

export const SocialCard = forwardRef<HTMLDivElement, SocialCardProps>(
  function SocialCard({ series }, ref) {
    const posterUrl = series.posterUrl;

    return (
      <div
        ref={ref}
        className="w-[600px] bg-[#0A0A0A] text-white"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <div className="relative h-[340px] overflow-hidden">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-red-950 to-[#0A0A0A]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E50914]">
              Netflix Original
            </p>
            <h2 className="mt-1 text-3xl font-bold">{series.title}</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-lg italic text-[#A1A1AA]">
            &ldquo;{series.tagline}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="font-semibold text-amber-400">
              ★ {formatRating(series.imdbRating)}
            </span>
            <span className="text-[#A1A1AA]">
              {series.genres.join(" · ")}
            </span>
            <span className="rounded border border-white/10 px-2 py-0.5 text-xs">
              {series.ageRating}
            </span>
          </div>
          <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
            {series.synopsis.split("\n\n")[0]}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-bold">
              <span className="text-[#E50914]">N</span>etflixify My Life
            </span>
            <span className="text-xs text-[#A1A1AA]">netflixifymylife.com</span>
          </div>
        </div>
      </div>
    );
  }
);
