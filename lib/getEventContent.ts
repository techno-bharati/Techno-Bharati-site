import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface EventContent {
  description: string;
  body: string;
}

export function getEventContent(slug: string): EventContent | null {
  const filePath = path.join(process.cwd(), "lib/content/event", `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    description: data.description ?? "",
    body: content.trim(),
  };
}
