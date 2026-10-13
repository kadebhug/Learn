"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { allTopics, findLesson, findTopic } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { quietBtn } from "@/components/ui";

export default function LessonPage() {
  const params = useParams<{ slug: string; lessonId: string }>();
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const topic = useMemo(() => findTopic(allTopics(customTopics), params.slug), [customTopics, params.slug]);
  const found = topic ? findLesson(topic, params.lessonId) : null;

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
