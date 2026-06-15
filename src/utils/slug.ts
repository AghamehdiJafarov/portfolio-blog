// Кириллица → латиница, чтобы из русских заголовков получались чистые URL
const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
};

export function slugify(input: string): string {
  const base = (input || "")
    .toLowerCase()
    .split("")
    .map((c) => (c in MAP ? MAP[c] : c))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "material";
}

// Детерминированно назначает рубрике один из акцентных цветов
const ACCENTS = ["accent-cyan", "accent-amber", "accent-violet", "accent-coral"];
export function accentClass(s: string): string {
  const h = (s || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return ACCENTS[h % ACCENTS.length];
}
