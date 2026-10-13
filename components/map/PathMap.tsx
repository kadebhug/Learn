"use client";

import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { flatLessons, progressKey } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import type { Topic } from "@/lib/types";

export function PathMap({ topic }: { topic: Topic }) {
  const lessons = useGrove((state) => state.lessons);
  const items = flatLessons(topic);
  const nextId = items.find((item) => !lessons[progressKey(topic.slug, item.lesson.id)]?.completed)?.lesson.id;

  return (
    <div className="grid gap-10">
      {topic.modules.map((module) => (
        <section key={module.id} className="md:grid md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{module.title}</h2>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">{module.summary}</p>
          </div>
          <ol className="mt-4 grid gap-3 md:mt-0">
            {module.lessons.map((lesson) => {
              const stat = lessons[progressKey(topic.slug, lesson.id)];
              const done = Boolean(stat?.completed);
              const suggested = lesson.id === nextId;
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/learn/${topic.slug}/${lesson.id}`}
                    className={`flex min-h-16 items-center gap-3 rounded-[20px] px-3 py-3 ring-1 ${
                      suggested ? "bg-grove-deep text-on-grove ring-grove-deep" : "bg-surface ring-line"
                    }`}
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full ${
                        done ? "bg-grove text-on-grove" : suggested ? "bg-on-grove text-grove-deep" : "bg-soft text-ink"
                      }`}
                      aria-hidden
                    >
                      {done ? <Check size={18} weight="bold" /> : <span className="size-2 rounded-full bg-current" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{lesson.title}</span>
                      <span className={`block text-sm ${suggested ? "text-on-grove/80" : "text-muted"}`}>
                        {lesson.minutes} min{suggested ? " · suggested next" : ""}
                        {done ? " · done" : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
