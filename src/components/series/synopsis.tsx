import { Section } from "./section";
import type { SeriesData } from "@/types";

interface SynopsisProps {
  series: SeriesData;
}

export function Synopsis({ series }: SynopsisProps) {
  const paragraphs = series.synopsis.split("\n\n").filter(Boolean);

  return (
    <Section title="Synopsis" id="synopsis">
      <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
