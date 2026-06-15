import { Section } from "./section";
import type { SeriesData } from "@/types";

interface FutureSeasonsProps {
  series: SeriesData;
}

export function FutureSeasons({ series }: FutureSeasonsProps) {
  return (
    <Section title="Coming Seasons" id="future-seasons">
      <div className="grid gap-4 sm:grid-cols-3">
        {series.futureSeasons.map((season, i) => (
          <article
            key={season.name}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Season {i + 1}
            </span>
            <h3 className="mt-2 font-semibold tracking-tight">{season.name}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {season.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
