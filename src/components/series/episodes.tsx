import { Section } from "./section";
import type { SeriesData } from "@/types";

interface EpisodesProps {
  series: SeriesData;
}

export function Episodes({ series }: EpisodesProps) {
  return (
    <Section title={`${series.currentSeason.name}`} id="episodes">
      <p className="mb-8 max-w-3xl text-muted leading-relaxed">
        {series.currentSeason.summary}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {series.episodes.map((episode) => (
          <article
            key={episode.number}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface text-sm font-bold text-muted group-hover:text-primary transition-colors"
                aria-hidden="true"
              >
                {episode.number}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">
                  {episode.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {episode.summary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
