import type { Topic } from "./types";

/** Sample courses are pre-rendered. Courses saved on this device use a fixed page plus a query, so a static host can open them. */
export function topicHref(topic: Pick<Topic, "slug" | "source">) {
  if (topic.source === "sample") return `/paths/${topic.slug}`;
  return `/paths/open?slug=${encodeURIComponent(topic.slug)}`;
}

export function lessonHref(topic: Pick<Topic, "slug" | "source">, lessonId: string) {
  if (topic.source === "sample") return `/learn/${topic.slug}/${lessonId}`;
  return `/learn/open?slug=${encodeURIComponent(topic.slug)}&lesson=${encodeURIComponent(lessonId)}`;
}

export function editHref(slug: string) {
  return `/paths/edit?slug=${encodeURIComponent(slug)}`;
}

export function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

/** True for the GitHub Pages build, which has no API routes. */
export const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
