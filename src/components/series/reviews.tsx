import { Section } from "./section";
import { generateStars } from "@/lib/utils";
import type { SeriesData } from "@/types";

interface ReviewsProps {
  series: SeriesData;
}

export function Reviews({ series }: ReviewsProps) {
  return (
    <Section title="Audience Reviews" id="reviews">
      <div className="grid gap-4 sm:grid-cols-3">
        {series.reviews.map((review, i) => (
          <blockquote
            key={i}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p
              className="text-amber-400 text-sm"
              aria-label={`${review.stars} out of 5 stars`}
            >
              {generateStars(review.stars)}
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed italic">
              &ldquo;{review.text}&rdquo;
            </p>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
