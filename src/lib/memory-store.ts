import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import type { SeriesRecord } from "@/types";

const store = new Map<string, SeriesRecord>();
const DATA_DIR = join(process.cwd(), ".data", "series");

function getFilePath(id: string): string {
  const safeId = id.replace(/[^a-zA-Z0-9-]/g, "");
  if (!safeId) {
    throw new Error("Invalid series id");
  }
  return join(DATA_DIR, `${safeId}.json`);
}

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function saveToMemory(record: SeriesRecord): Promise<void> {
  store.set(record.id, record);
  try {
    await ensureDataDir();
    await writeFile(getFilePath(record.id), JSON.stringify(record), "utf-8");
  } catch (error) {
    console.warn("Could not persist series to disk (using in-memory only):", error);
  }
}

export async function getFromMemory(id: string): Promise<SeriesRecord | null> {
  const cached = store.get(id);
  if (cached) return cached;

  try {
    const content = await readFile(getFilePath(id), "utf-8");
    const record = JSON.parse(content) as SeriesRecord;
    store.set(id, record);
    return record;
  } catch {
    return null;
  }
}
