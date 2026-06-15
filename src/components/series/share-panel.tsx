"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Share2,
  Download,
  Link2,
  ImageIcon,
  Check,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialCard } from "./social-card";
import type { SeriesData } from "@/types";

interface SharePanelProps {
  series: SeriesData;
  seriesId: string;
}

export function SharePanel({ series, seriesId }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/series/${seriesId}`
      : `${process.env.NEXT_PUBLIC_APP_URL || ""}/series/${seriesId}`;

  const shareText = `My life has been turned into a Netflix Original: "${series.title}" — ${series.tagline}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: series.title,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadPoster = async () => {
    if (!series.posterUrl) return;
    try {
      const response = await fetch(series.posterUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${series.title.replace(/\s+/g, "-").toLowerCase()}-poster.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(series.posterUrl, "_blank");
    }
  };

  const handleExportImage = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${series.title.replace(/\s+/g, "-").toLowerCase()}-series-card.png`;
      a.click();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section
      className="border-y border-border bg-surface py-8"
      aria-label="Share your series"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Share Your Series
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleShare} aria-label="Share my series">
            <Share2 className="h-4 w-4" />
            Share My Series
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportImage}
            disabled={exporting}
            aria-label="Export as image"
          >
            <ImageIcon className="h-4 w-4" />
            {exporting ? "Exporting..." : "Export as Image"}
          </Button>
          {series.posterUrl && (
            <Button
              variant="secondary"
              onClick={handleDownloadPoster}
              aria-label="Download poster"
            >
              <Download className="h-4 w-4" />
              Download Poster
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={handleCopyLink}
            aria-label="Copy public link"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Public Link"}
          </Button>
        </div>

        {/* Hidden social card for export */}
        <div className="fixed -left-[9999px] top-0" aria-hidden="true">
          <SocialCard ref={cardRef} series={series} />
        </div>
      </div>
    </section>
  );
}
