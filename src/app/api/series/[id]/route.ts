import { NextRequest, NextResponse } from "next/server";
import { loadSeriesRecord } from "@/lib/series-store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const record = await loadSeriesRecord(id);

  if (!record) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
