import { NextRequest, NextResponse } from "next/server";
import { getSeriesById } from "@/lib/supabase";
import { getFromMemory } from "@/lib/memory-store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  let record = await getSeriesById(id);
  if (!record) {
    record = await getFromMemory(id);
  }

  if (!record) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
