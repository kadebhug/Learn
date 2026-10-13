"use client";

import Link from "next/link";
import { allTopics, difficultyLabel, flatLessons, progressKey } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { card, primaryBtn } from "@/components/ui";

export default function PathsPage() {
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const lessons = useGrove((state) => state.lessons);
  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  const topics = allTopics(customTopics);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-5 px-5 pt-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Paths</h1>
          <p className="mt-1 text-sm text-muted">
            {topics.length === 2
              ? "Two courses are ready. Add your own whenever you want."
              : `${topics.length} courses are on your shelf.`}
          </p>
        </div>
        <Link href="/paths/new" className={primaryBtn}>
          New path
        </Link>
      </header>
      <ul className="grid gap-3">
        {topics.map((topic) => {
          const items = flatLessons(topic);
          const done = items.filter((item) => lessons[progressKey(topic.slug, item.lesson.id)]?.completed).length;
          const ratio = items.length === 0 ? 0 : done / items.length;
          return (
            <li key={topic.slug}>
              <Link href={`/paths/${topic.slug}`} className={`${card} block px-4 py-4`}>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">{topic.title}</h2>
                  <span className="shrink-0 rounded-full bg-soft px-2 py-1 text-xs font-semibold text-grove-deep">
                    {difficultyLabel(topic.difficulty)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{topic.blurb}</p>
                <p className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted">
                    {topic.minutes} min · {done}/{items.length} lessons
                    {topic.source === "starter" ? " · starter outline" : ""}
                    {topic.source === "generated" ? " · generated" : ""}
                  </span>
                </p>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                  <span className="block h-full bg-grove" style={{ width: `${Math.round(ratio * 100)}%` }} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
