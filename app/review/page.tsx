"use client";

import Link from "next/link";
import { useState } from "react";
import { allTopics, findLesson, findTopic } from "@/lib/catalog";
import { isDue } from "@/lib/srs";
import { useGrove } from "@/lib/store";
import type { CardState, Grade } from "@/lib/types";
import { useHydrated } from "@/lib/use-hydrated";
import { ActivityView } from "@/components/lesson/ActivityView";
import { primaryBtn, quietBtn } from "@/components/ui";

const grades: { id: Grade; label: string; hint: string }[] = [
  { id: "again", label: "Again", hint: "Show it now" },
  { id: "hard", label: "Hard", hint: "Tomorrow, barely" },
  { id: "good", label: "Good", hint: "A normal gap" },
  { id: "easy", label: "Easy", hint: "Push it out" },
];

export default function ReviewPage() {
  const hydrated = useHydrated();
  const cards = useGrove((state) => state.cards);
  const customTopics = useGrove((state) => state.customTopics);
  const gradeCard = useGrove((state) => state.gradeCard);
  const [ids, setIds] = useState<string[] | null>(null);
  const [cursor, setCursor] = useState(0);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const topics = allTopics(customTopics);
  const dueCount = Object.values(cards).filter((card) => isDue(card) && lookup(topics, card)).length;
  const anyCount = Object.values(cards).filter((card) => lookup(topics, card)).length;

  if (hydrated && ids === null) {
    setIds(queueIds(cards, false));
  }

  if (!hydrated || ids === null) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  const currentId = ids[cursor];
  const currentCard = currentId ? cards[currentId] : undefined;
  const current = currentCard ? lookup(topics, currentCard) : null;
  if (currentId && !current && cursor < ids.length) {
    setCursor(cursor + 1);
    setReady(false);
  }

  if (!current || !currentCard) {
    return (
      <div className="mx-auto grid w-full max-w-xl gap-4 px-5 pt-8">
        <h1 className="text-3xl font-semibold tracking-tight">Review</h1>
        <p className="leading-relaxed text-muted">
          {anyCount === 0
            ? "Finish a lesson and the checks land here, due right away."
            : cursor > 0
              ? "That's the stack. Come back when the next gap is up."
              : "Nothing is due. You can still practice ahead, which moves the schedule."}
        </p>
        {anyCount > 0 && dueCount === 0 && cursor === 0 && (
          <button
            type="button"
            className={primaryBtn}
            onClick={() => {
              setIds(queueIds(cards, true));
              setCursor(0);
              setReady(false);
            }}
          >
            Review ahead
          </button>
        )}
        <Link href="/paths" className={quietBtn}>
          Go to a lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-5 px-5 pt-6">
      <header>
        <p className="text-sm text-muted">
          {cursor + 1} of {ids.length}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{current.lesson.title}</h1>
      </header>
      <ActivityView
        key={currentCard.id + cursor}
        activity={current.activity}
        onResult={() => setReady(true)}
      />
      {ready && (
        <div className="grid gap-2">
          <p className="text-sm font-semibold">How soon should this return?</p>
          <div className="grid grid-cols-2 gap-2">
            {grades.map((grade) => (
              <button
                key={grade.id}
                type="button"
                className={grade.id === "good" ? primaryBtn : quietBtn}
                onClick={() => {
                  const award = gradeCard(currentCard.id, grade.id);
                  setToast(award.xpGained ? `+${award.xpGained} XP` : "See you sooner");
                  setReady(false);
                  setCursor((value) => value + 1);
                }}
              >
                <span className="block">{grade.label}</span>
                <span className="block text-xs font-medium opacity-80">{grade.hint}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {toast && (
        <p className="text-center font-mono text-sm text-grove" role="status">
          {toast}
        </p>
      )}
    </div>
  );
}

function queueIds(cards: Record<string, CardState>, ahead: boolean) {
  return Object.values(cards)
    .filter((card) => ahead || isDue(card))
    .sort((a, b) => a.due - b.due)
    .map((card) => card.id);
}

function lookup(topics: ReturnType<typeof allTopics>, card: CardState) {
  const topic = findTopic(topics, card.topicSlug);
  if (!topic) return null;
  const found = findLesson(topic, card.lessonId);
  if (!found) return null;
  const activity = found.lesson.blocks.find((block) => block.type === "activity" && block.activity.id === card.activityId);
  if (!activity || activity.type !== "activity") return null;
  return { lesson: found.lesson, activity: activity.activity };
}
