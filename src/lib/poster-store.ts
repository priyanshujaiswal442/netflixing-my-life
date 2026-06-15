import { mkdir, readFile, writeFile, rename } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const isVercel = process.env.VERCEL === "1";
const POSTER_DIR = isVercel
  ? join(tmpdir(), "netflixify-posters")
  : join(process.cwd(), ".data", "posters");

function safeId(id: string): string {
  const cleaned = id.replace(/[^a-zA-Z0-9-]/g, "");
  if (!cleaned) {
    throw new Error("Invalid series id");
  }
  return cleaned;
}

function getPosterPath(id: string): string {
  return join(POSTER_DIR, `${safeId(id)}.png`);
}

export function getPosterApiPath(id: string): string {
  return `/api/posters/${safeId(id)}`;
}

export async function savePoster(id: string, data: Buffer): Promise<string> {
  if (isVercel) {
    return `data:image/png;base64,${data.toString("base64")}`;
  }

  try {
    await mkdir(POSTER_DIR, { recursive: true });
    await writeFile(getPosterPath(id), data);
    return getPosterApiPath(id);
  } catch (error) {
    console.warn("Could not save poster to disk, using inline image:", error);
    return `data:image/png;base64,${data.toString("base64")}`;
  }
}

export async function movePoster(fromId: string, toId: string): Promise<string> {
  if (safeId(fromId) === safeId(toId)) {
    return getPosterApiPath(toId);
  }
  await mkdir(POSTER_DIR, { recursive: true });
  await rename(getPosterPath(fromId), getPosterPath(toId));
  return getPosterApiPath(toId);
}

export async function readPoster(id: string): Promise<Buffer | null> {
  try {
    return await readFile(getPosterPath(id));
  } catch {
    return null;
  }
}
