import { Section } from "./section";
import type { SeriesData } from "@/types";

interface CharacterSectionProps {
  series: SeriesData;
}

export function CharacterSection({ series }: CharacterSectionProps) {
  const { characterProfile, characterArc } = series;

  const profileItems = [
    { label: "Strengths", value: characterProfile.strengths },
    { label: "Weaknesses", value: characterProfile.weaknesses },
    { label: "Personality", value: characterProfile.personality },
    { label: "Motivations", value: characterProfile.motivations },
    { label: "Character Growth", value: characterProfile.characterGrowth },
  ];

  const arcItems = [
    { label: "Beginning", value: characterArc.beginning },
    { label: "Conflict", value: characterArc.conflict },
    { label: "Transformation", value: characterArc.transformation },
    { label: "Resolution", value: characterArc.resolution },
  ];

  return (
    <>
      <Section title="Main Character" id="character">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-sm font-medium text-primary">{item.label}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Character Arc" id="character-arc">
        <div className="grid gap-6 sm:grid-cols-2">
          {arcItems.map((item, index) => (
            <div key={item.label} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="font-semibold">{item.label}</h3>
              </div>
              <p className="text-muted leading-relaxed pl-11">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
