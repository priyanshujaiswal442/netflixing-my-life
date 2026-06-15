import OpenAI from "openai";
import type { UserAnswers, SeriesData, Episode } from "@/types";
import { savePoster } from "@/lib/poster-store";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const REQUIRED_EPISODES = 8;
const MAX_GENERATION_ATTEMPTS = 3;

const SERIES_SCHEMA = `{
  "title": "string - creative, memorable series title",
  "tagline": "string - one powerful sentence",
  "genres": ["string array - 2-4 relevant genres"],
  "imdbRating": "number between 7.1 and 9.8",
  "audienceScore": "number between 70 and 98",
  "ageRating": "string - PG, PG-13, 16+, or 18+",
  "synopsis": "string - 3-5 cinematic paragraphs separated by \\n\\n",
  "characterProfile": {
    "strengths": "string",
    "weaknesses": "string",
    "personality": "string",
    "motivations": "string",
    "characterGrowth": "string"
  },
  "currentSeason": {
    "name": "string - e.g. Season 4: The Turning Point",
    "summary": "string - detailed season summary"
  },
  "episodes": [
    {
      "number": 1,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 2,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 3,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 4,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 5,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 6,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 7,
      "title": "string",
      "summary": "string"
    },
    {
      "number": 8,
      "title": "string",
      "summary": "string"
    }
  ],
  "characterArc": {
    "beginning": "string",
    "conflict": "string",
    "transformation": "string",
    "resolution": "string"
  },
  "futureSeasons": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "reviews": [
    {
      "stars": "number 1-5",
      "text": "string"
    }
  ],
  "iconicQuote": "string - unforgettable quote",
  "trailerNarration": "string - 30-60 second trailer script",
  "posterPrompt": "string - detailed cinematic poster image prompt"
}`;

function buildPrompt(answers: UserAnswers, attempt: number): string {
  const retryNote =
    attempt > 1
      ? `\nCRITICAL: Your previous response was incomplete. You MUST include exactly 8 episodes (numbered 1 through 8) in the "episodes" array. Do not truncate or omit any episodes.\n`
      : "";

  return `You are a world-class Netflix screenwriter and showrunner. Transform this person's life into a premium Netflix Original series.
${retryNote}
PERSON'S DETAILS:
- Name: ${answers.name}
- Age: ${answers.age}
- Occupation: ${answers.occupation}
- Biggest Achievement: ${answers.biggestAchievement}
- Biggest Challenge: ${answers.biggestChallenge}
- Current Goal: ${answers.currentGoal}
- Dream Destination: ${answers.dreamDestination}
- Hobbies: ${answers.hobbies}
- Life-Changing Event: ${answers.lifeChangingEvent}
- Self-Description: ${answers.selfDescription}

WRITING REQUIREMENTS:
- Feel personal, cinematic, emotional, and believable
- Tone like Netflix Originals, HBO, A24 films, professional screenwriters
- Avoid generic motivational content, clichés, cringe writing, repetitive phrases
- The protagonist should be named ${answers.name} or a creative variation
- Episodes MUST be exactly 8 objects in the episodes array, numbered 1 through 8 — this is mandatory
- Reviews must be exactly 3
- Future seasons must be exactly 3
- Genres must be 2-4 from: Drama, Adventure, Comedy, Romance, Thriller, Coming-of-Age, Entrepreneurship, Mystery, Sci-Fi

Return ONLY valid JSON matching this schema:
${SERIES_SCHEMA}`;
}

function normalizeEpisodes(episodes: Episode[] | undefined): Episode[] {
  if (!episodes?.length) return [];

  const byNumber = new Map<number, Episode>();
  for (const ep of episodes) {
    const num = Number(ep.number);
    if (!Number.isFinite(num) || num < 1 || num > REQUIRED_EPISODES) continue;
    if (byNumber.has(num)) continue;
    byNumber.set(num, {
      number: num,
      title: ep.title?.trim() || `Episode ${num}`,
      summary: ep.summary?.trim() || "",
    });
  }

  return Array.from(byNumber.values()).sort((a, b) => a.number - b.number);
}

function getMissingEpisodeNumbers(episodes: Episode[]): number[] {
  const present = new Set(episodes.map((e) => e.number));
  return Array.from({ length: REQUIRED_EPISODES }, (_, i) => i + 1).filter(
    (n) => !present.has(n)
  );
}

function normalizeSeries(parsed: SeriesData): SeriesData {
  return {
    ...parsed,
    episodes: normalizeEpisodes(parsed.episodes),
  };
}

async function requestJsonCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxTokens = 8192
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.85,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }
  return content;
}

async function requestFullSeries(
  answers: UserAnswers,
  attempt: number
): Promise<SeriesData> {
  const content = await requestJsonCompletion([
    {
      role: "system",
      content:
        "You are an elite Netflix screenwriter. Return only valid JSON, no markdown. Always include exactly 8 episodes.",
    },
    {
      role: "user",
      content: buildPrompt(answers, attempt),
    },
  ]);

  return normalizeSeries(JSON.parse(content) as SeriesData);
}

async function fillMissingEpisodes(
  answers: UserAnswers,
  series: SeriesData,
  missingNumbers: number[]
): Promise<Episode[]> {
  const content = await requestJsonCompletion(
    [
      {
        role: "system",
        content:
          "You are an elite Netflix screenwriter. Return only valid JSON with an episodes array, no markdown.",
      },
      {
        role: "user",
        content: `Continue this Netflix Original series. Generate ONLY the missing episodes.

Series title: ${series.title}
Synopsis: ${series.synopsis}
Protagonist: ${answers.name}
Existing episodes: ${JSON.stringify(series.episodes)}

Missing episode numbers: ${missingNumbers.join(", ")}

Return JSON in this exact shape:
{
  "episodes": [
    { "number": <number>, "title": "<string>", "summary": "<string>" }
  ]
}

Each missing episode must have a unique number from the missing list, a cinematic title, and a 2-4 sentence summary that fits the existing story arc.`,
      },
    ],
    4096
  );

  const parsed = JSON.parse(content) as { episodes?: Episode[] };
  return normalizeEpisodes(parsed.episodes).filter((ep) =>
    missingNumbers.includes(ep.number)
  );
}

async function ensureEpisodes(
  answers: UserAnswers,
  series: SeriesData
): Promise<SeriesData> {
  let episodes = normalizeEpisodes(series.episodes);

  if (episodes.length >= REQUIRED_EPISODES) {
    return { ...series, episodes: episodes.slice(0, REQUIRED_EPISODES) };
  }

  const missing = getMissingEpisodeNumbers(episodes);
  if (missing.length === 0) {
    return { ...series, episodes };
  }

  console.warn(
    `Series "${series.title}" missing episodes [${missing.join(", ")}], backfilling...`
  );

  const filled = await fillMissingEpisodes(answers, { ...series, episodes }, missing);
  episodes = normalizeEpisodes([...episodes, ...filled]);

  if (episodes.length < REQUIRED_EPISODES) {
    throw new Error(
      `Incomplete series data: only ${episodes.length} of ${REQUIRED_EPISODES} episodes generated`
    );
  }

  return { ...series, episodes: episodes.slice(0, REQUIRED_EPISODES) };
}

export async function generateSeries(answers: UserAnswers): Promise<SeriesData> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt++) {
    try {
      const series = await requestFullSeries(answers, attempt);
      return await ensureEpisodes(answers, series);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(
        `Series generation attempt ${attempt}/${MAX_GENERATION_ATTEMPTS} failed:`,
        lastError.message
      );
    }
  }

  throw lastError ?? new Error("Failed to generate series after multiple attempts");
}

export async function generatePosterImage(
  posterPrompt: string,
  seriesTitle: string,
  seriesId: string
): Promise<string | null> {
  const prompt = `Cinematic Netflix Original series poster for "${seriesTitle}". ${posterPrompt}. Style: photorealistic, professional movie poster lighting, dramatic composition, no text overlays, no watermarks, emotionally powerful, film grain, anamorphic lens quality. Avoid generic AI art style.`;

  const models: Array<{
    name: string;
    options?: Partial<OpenAI.Images.ImageGenerateParams>;
  }> = [
    {
      name: "gpt-image-1",
      options: { size: "1024x1024" },
    },
    {
      name: "gpt-image-1-mini",
      options: { size: "1024x1024" },
    },
    {
      name: "dall-e-3",
      options: { size: "1024x1024", quality: "hd", style: "natural" },
    },
    {
      name: "dall-e-2",
      options: { size: "1024x1024" },
    },
  ];

  for (const { name, options } of models) {
    try {
      const response = await openai.images.generate({
        model: name,
        prompt,
        n: 1,
        ...options,
      });

      const item = response.data?.[0];
      if (!item) continue;

      let imageBuffer: Buffer | null = null;

      if (item.b64_json) {
        imageBuffer = Buffer.from(item.b64_json, "base64");
      } else if (item.url) {
        const imageResponse = await fetch(item.url);
        if (imageResponse.ok) {
          imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
        }
      }

      if (imageBuffer) {
        return await savePoster(seriesId, imageBuffer);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Poster generation with ${name} failed:`, message);
    }
  }

  console.error("Poster generation failed with all image models");
  return null;
}
