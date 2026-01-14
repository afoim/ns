import fs from "node:fs/promises";
import path from "node:path";

import { cache } from "react";

export type Sponsor = {
  name: string;
  avatar?: string;
  date?: string;
  amount?: string;
};

const sponsorsDir = path.join(process.cwd(), "content", "sponsors");

function normalizeSponsor(data: unknown): Sponsor | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  const name = typeof record.name === "string" ? record.name.trim() : "";
  if (!name) return null;

  return {
    name,
    avatar: typeof record.avatar === "string" ? record.avatar : undefined,
    date: typeof record.date === "string" ? record.date : undefined,
    amount: typeof record.amount === "string" ? record.amount : undefined,
  };
}

export const getAllSponsors = cache(async (): Promise<Sponsor[]> => {
  let entries: string[] = [];

  try {
    entries = await fs.readdir(sponsorsDir);
  } catch {
    return [];
  }

  const files = entries.filter((name) => name.toLowerCase().endsWith(".json"));

  const sponsors = await Promise.all(
    files.map(async (file) => {
      try {
        const raw = await fs.readFile(path.join(sponsorsDir, file), "utf8");
        return normalizeSponsor(JSON.parse(raw));
      } catch {
        return null;
      }
    }),
  );

  return sponsors
    .filter((s): s is Sponsor => Boolean(s))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
});
