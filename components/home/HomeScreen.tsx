"use client";

import Link from "next/link";
import { Flame } from "@phosphor-icons/react";
import { allTopics, flatLessons, nextLesson, progressKey } from "@/lib/catalog";
import { lessonHref, topicHref } from "@/lib/hrefs";
import { recommendation } from "@/lib/recommend";
import { isDue } from "@/lib/srs";
import { useGrove } from "@/lib/store";
import { greeting, todayKey } from "@/lib/text";
import { useHydrated } from "@/lib/use-hydrated";
import { levelFor, levelProgress } from "@/lib/xp";
import { card } from "@/components/ui";

export function HomeScreen() {
  const hydrated = useHydrated();
  const name = useGrove((state) => state.name);
  const xp = useGrove((state) => state.xp);
  const streak = useGrove((state) => state.streak);
  const lessons = useGrove((state) => state.lessons);
  const cards = useGrove((state) => state.cards);
  const customTopics = useGrove((state) => state.customTopics);
  const active = useGrove((state) => state.activeTopicSlug);
  const challengeDate = useGrove((state) => state.challengeDate);

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  const topics = allTopics(customTopics);
  const ordered = active ? [topics.find((topic) => topic.slug === active), ...topics.filter((topic) => topic.slug !== active)].filter((topic) => topic != null) : topics;
  let current: { href: string; kicker: string; title: string; detail: string } | null = null;
  for (const topic of ordered) {
    const step = nextLesson(topic, (id) => Boolean(lessons[progressKey(topic.slug, id)]?.completed));
    if (step) {
      current = {
        href: lessonHref(topic, step.lesson.id),
        kicker: topic.title,
        title: step.lesson.title,
        detail: `${step.lesson.minutes} min · ${step.module.title}`,
      };
      break;
    }
  }
  if (!current && topics[0]) {
    const first = flatLessons(topics[0])[0];
    current = first
      ? {
          href: topicHref(topics[0]),
          kicker: "Paths clear",
          title: "Pick a review, or start another topic",
          detail: topics[0].title,
        }
      : null;
  }

  const due = Object.values(cards).filter((item) => isDue(item)).length;
  const advice = recommendation(topics, lessons, due);
  const challengeDone = challengeDate === todayKey();
  const level = levelFor(xp);
  const progress = levelProgress(xp);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 px-5 pt-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{greeting()}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1 font-mono text-sm text-streak">
            <Flame size={16} weight="fill" aria-hidden />
            <span>
              {streak} day{streak === 1 ? "" : "s"}
            </span>
          </p>
          <LevelMark level={level} progress={progress} />
        </div>
      </header>

      {current && (
        <section className="rounded-[20px] bg-grove-deep p-5 text-on-grove">
          <p className="text-sm text-on-grove/75">{current.kicker}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{current.title}</h2>
          <p className="mt-1 text-sm text-on-grove/75">{current.detail}</p>
          <Link href={current.href} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-on-grove px-5 text-[15px] font-semibold text-grove-deep active:scale-[0.98]">
            Continue
          </Link>
        </section>
      )}

      <div className="grid gap-3">
        {due > 0 && (
          <Link href="/review" className={`${card} flex min-h-16 items-center justify-between px-4 py-3`}>
            <span>
              <span className="block font-semibold">{due === 1 ? "1 card is due" : `${due} cards are due`}</span>
              <span className="text-sm text-muted">A short review keeps yesterday.</span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-grove">Review</span>
          </Link>
        )}
        <Link href="/challenge" className={`${card} flex min-h-16 items-center justify-between px-4 py-3`}>
          <span>
            <span className="block font-semibold">Daily challenge</span>
            <span className="text-sm text-muted">{challengeDone ? "Done for today. The sprint can still be replayed." : "Five questions, then a one-minute match."}</span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-grove">{challengeDone ? "See it" : "Play"}</span>
        </Link>
        {advice && advice.href !== "/review" && (
          <Link href={advice.href} className={`${card} flex min-h-16 items-center justify-between gap-4 px-4 py-3`}>
            <span>
              <span className="block font-semibold">{advice.label}</span>
              <span className="text-sm text-muted">{advice.text}</span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function LevelMark({ level, progress }: { level: number; progress: number }) {
  const radius = 16;
  const circ = 2 * Math.PI * radius;
  return (
    <div className="relative grid size-12 place-items-center text-grove" aria-label={`Level ${level}`}>
      <svg viewBox="0 0 40 40" className="absolute inset-0 size-12" aria-hidden>
        <circle cx="20" cy="20" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="font-mono text-xs text-ink">{level}</span>
    </div>
  );
}
