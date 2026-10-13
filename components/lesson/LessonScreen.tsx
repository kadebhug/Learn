"use client";

import Link from "next/link";
import { useMemo } from "react";
import { allTopics, findLesson, findTopic } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { quietBtn } from "@/components/ui";
import { LessonPlayer } from "./LessonPlayer";

export function LessonScreen({ slug, lessonId }: { slug: string; lessonId: string }) {
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const topic = useMemo(() => findTopic(allTopics(customTopics), slug), [customTopics, slug]);
  const found = topic ? findLesson(topic, lessonId) : null;

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;
  if (!topic || !found) {
    return (
      <div className="px-5 py-10">
        <p>That lesson is not on this device.</p>
        <Link href="/paths" className={`${quietBtn} mt-4`}>
          All paths
        </Link>
      </div>
    );
  }

  return <LessonPlayer key={found.lesson.id} topic={topic} lesson={found.lesson} />;
}
