import { NextRequest, NextResponse } from "next/server";
import { generatePosterImage } from "@/lib/openai";
import { loadSeriesRecord, updateSeriesRecordPoster } from "@/lib/series-store";

export const maxDuration = 300;

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    const record = await loadSeriesRecord(id);

    if (!record) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    if (record.series.posterUrl || record.poster_url) {
      return NextResponse.json({
        posterUrl: record.series.posterUrl || record.poster_url,
      });
    }

    const posterUrl = await generatePosterImage();

    if (!posterUrl) {
      return NextResponse.json({
        posterUrl: null,
        disabled: true,
      });
    }

    const updated = await updateSeriesRecordPoster(id, posterUrl);
    return NextResponse.json({ posterUrl, record: updated });
  } catch (error) {
    console.error("Poster generation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate poster";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
