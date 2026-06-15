import { NextRequest, NextResponse } from "next/server";
import { readPoster } from "@/lib/poster-store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const poster = await readPoster(id);

  if (!poster) {
    return NextResponse.json({ error: "Poster not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(poster), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
