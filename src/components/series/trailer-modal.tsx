"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { SeriesData } from "@/types";

interface TrailerModalProps {
  series: SeriesData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TrailerModal({ series, open, onOpenChange }: TrailerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-surface">
        <DialogHeader>
          <DialogTitle>{series.title} — Official Trailer</DialogTitle>
          <DialogDescription>
            Cinematic trailer narration
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 rounded-lg bg-card p-6">
          <p className="text-muted leading-relaxed whitespace-pre-line">
            {series.trailerNarration}
          </p>
        </div>
        <p className="text-xs text-muted text-center">
          Read aloud for the full cinematic experience
        </p>
      </DialogContent>
    </Dialog>
  );
}
