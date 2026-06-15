import { NextRequest, NextResponse } from "next/server";
import { generateSeries } from "@/lib/openai";
import { saveSeries } from "@/lib/supabase";
import { saveSeriesRecord } from "@/lib/series-store";
import type { UserAnswers } from "@/types";
import { randomUUID } from "crypto";

export const maxDuration = 300;

function validateAnswers(answers: UserAnswers): boolean {
  const required: (keyof UserAnswers)[] = [
    "name",
    "age",
    "occupation",
    "biggestAchievement",
    "biggestChallenge",
    "currentGoal",
    "dreamDestination",
    "hobbies",
    "lifeChangingEvent",
    "selfDescription",
  ];
  return required.every((key) => answers[key]?.trim().length > 0);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const answers = body.answers as UserAnswers;

    if (!answers || !validateAnswers(answers)) {
      return NextResponse.json(
        { error: "Please complete all questions" },
        { status: 400 }
      );
    }

    const series = await generateSeries(answers);
    const recordId = randomUUID();

    const saved = await saveSeries(answers, series, undefined, recordId);

    const record: import("@/types").SeriesRecord = saved ?? {
      id: recordId,
      created_at: new Date().toISOString(),
      answers,
      series,
    };

    await saveSeriesRecord(record);
    return NextResponse.json({ id: record.id, series: record.series });
  } catch (error) {
    console.error("Generation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate series";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
