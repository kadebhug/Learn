"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { allTopics, difficultyLabel, findTopic } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { quietBtn } from "@/components/ui";
import { PathMap } from "@/components/map/PathMap";

export default function TopicPage() {
  const params = useParams<{ slug: string }>();
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const setActive = useGrove((state) => state.setActiveTopic);
  const topic = useMemo(() => findTopic(allTopics(customTopics), params.slug), [customTopics, params.slug]);

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;
  if (!topic) {
    return (
      <div className="px-5 py-10">
        <p>That path is not on this device.</p>
        <Link href="/paths" className={`${quietBtn} mt-4`}>
          All paths
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 px-5 pt-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-grove">{difficultyLabel(topic.difficulty)}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{topic.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{topic.blurb}</p>
          {topic.source === "starter" && (
            <p className="mt-2 text-sm text-streak">Starter outline. Edit it, or generate a course when an API key is set.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={quietBtn}
            onClick={() => {
              setActive(topic.slug);
              const blob = new Blob([JSON.stringify(topic, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${topic.slug}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </button>
          {topic.source !== "sample" && (
            <Link href={`/paths/${topic.slug}/edit`} className={quietBtn}>
              Edit
            </Link>
          )}
        </div>
      </header>
      <PathMap topic={topic} />
    </div>
  );
}
