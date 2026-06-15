import { getCollection, type CollectionEntry } from "astro:content";
import { slugify } from "./slug";

export type PostItem = {
  entry: CollectionEntry<"posts">;
  slug: string;
  data: CollectionEntry<"posts">["data"];
};

// Возвращает опубликованные посты, отсортированные от новых к старым,
// с уникальным слагом у каждого. И главная, и страница поста вызывают это,
// поэтому ссылки всегда совпадают.
export async function getPosts(): Promise<PostItem[]> {
  const all = (await getCollection("posts")).filter((p) => !p.data.draft);
  all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const seen: Record<string, number> = {};
  return all.map((entry) => {
    let s = slugify(entry.data.title);
    if (seen[s]) {
      seen[s] += 1;
      s = `${s}-${seen[s]}`;
    } else {
      seen[s] = 1;
    }
    return { entry, slug: s, data: entry.data };
  });
}

export function readingMinutes(body?: string): number {
  const words = (body || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 150));
}

const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
export function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
