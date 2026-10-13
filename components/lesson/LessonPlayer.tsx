"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion, motion } from "motion/react";
import { ArrowLeft, Check } from "@phosphor-icons/react";
import { flatLessons } from "@/lib/catalog";
import { lessonHref, topicHref } from "@/lib/hrefs";
import { useGrove } from "@/lib/store";
import type { Lesson, Topic } from "@/lib/types";
import { levelFor } from "@/lib/xp";
import { primaryBtn, quietBtn } from "@/components/ui";
import { ActivityView, type Attempt } from "./ActivityView";

export function LessonPlayer({ topic, lesson }: { topic: Topic; lesson: Lesson }) {
  const recordAnswer = useGrove((state) => state.recordAnswer);
  const completeLesson = useGrove((state) => state.completeLesson);
  const upsertSession = useGrove((state) => state.upsertSession);
  const xp = useGrove((state) => state.xp);

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(lesson.blocks[0]?.type === "explain");
  const [toast, setToast] = useState<string | null>(null);
  const [finished, setFinished] = useState<{ xp: number; leveled: boolean } | null>(null);
  const startedXp = useRef(xp);
  const xpThis = useRef(0);
  const startedAt = useRef(Date.now());
  const saved = useRef(false);
  const finishing = useRef(false);
  const sessionId = useRef(`${topic.slug}:${lesson.id}:${startedAt.current}`);
  const [elapsed, setElapsed] = useState(0);
  const reduce = useReducedMotion();

  const block = lesson.blocks[index];
  const lessons = flatLessons(topic);
  const position = lessons.findIndex((item) => item.lesson.id === lesson.id);
  const upcoming = position >= 0 ? lessons[position + 1] : undefined;

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(Date.now() - startedAt.current), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter" || !ready || finished) return;
      if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) return;
      if (event.target instanceof HTMLButtonElement) return;
      event.preventDefault();
      goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function saveSession(force: boolean) {
    if (saved.current) return;
    const ms = Date.now() - startedAt.current;
    if (!force && ms < 15000) return;
    saved.current = true;
    upsertSession({
      id: sessionId.current,
      topicSlug: topic.slug,
      lessonId: lesson.id,
      kind: "lesson",
      startedAt: startedAt.current,
      minutes: Math.max(1, Math.round(ms / 60000)),
      xp: xpThis.current,
    });
  }

  useEffect(() => {
    const leave = () => saveSession(false);
    window.addEventListener("pagehide", leave);
    return () => {
      window.removeEventListener("pagehide", leave);
      saveSession(false);
    };
    // save once on leave; session id is stable for this mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onResult(attempt: Attempt) {
    const award = recordAnswer({
      topicSlug: topic.slug,
      lessonId: lesson.id,
      activityId: activityId(block),
      correct: attempt.correct,
      firstTry: attempt.firstTry,
      kind: attempt.kind,
    });
    xpThis.current += award.xpGained;
    setReady(true);
    setToast(award.xpGained ? `+${award.xpGained} XP` : attempt.correct ? "Got it" : null);
  }

  function goNext() {
    if (!ready || finishing.current) return;
    if (index < lesson.blocks.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setReady(lesson.blocks[nextIndex]?.type === "explain");
      setToast(null);
      return;
    }
    finishing.current = true;
    const award = completeLesson(topic.slug, lesson.id);
    xpThis.current += award.xpGained;
    setFinished({
      xp: xpThis.current,
      leveled: levelFor(startedXp.current + xpThis.current) > levelFor(startedXp.current),
    });
    saveSession(true);
  }

  const clock = `${Math.floor(elapsed / 60000)}:${String(Math.floor(elapsed / 1000) % 60).padStart(2, "0")}`;

  if (finished) {
    return (
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col justify-center gap-6 px-5 py-10">
        <div className="relative overflow-hidden rounded-[20px] bg-grove-deep px-5 py-6 text-on-grove">
          {!reduce && <Burst />}
          <p className="text-sm font-semibold text-on-grove/80">{finished.leveled ? "Level up" : "Lesson clear"}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          <p className="mt-3 text-lg leading-snug">{lesson.summary}</p>
          <p className="mt-2 text-on-grove/85">
            {finished.xp > 0 ? `You picked up ${finished.xp} XP.` : "You already had this one. The review cards are refreshed."}
          </p>
          {finished.leveled && <p className="mt-2 font-mono text-sm">New level. Keep the streak warm.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {upcoming ? (
            <Link href={lessonHref(topic, upcoming.lesson.id)} className={primaryBtn}>
              Next lesson
            </Link>
          ) : (
            <Link href="/review" className={primaryBtn}>
              Review the cards
            </Link>
          )}
          <Link href={topicHref(topic)} className={quietBtn}>
            Back to the path
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-5">
      <header className="flex items-center gap-3 py-4">
        <Link href={topicHref(topic)} aria-label="Back to the path" className="grid size-11 place-items-center rounded-full ring-1 ring-line">
          <ArrowLeft size={18} aria-hidden />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted">{topic.title}</p>
          <h1 className="truncate text-base font-semibold">{lesson.title}</h1>
        </div>
        <p className="font-mono text-sm text-muted" aria-label="Study timer">
          {clock}
        </p>
      </header>
      <div className="flex gap-1" aria-hidden>
        {lesson.blocks.map((item, pip) => (
          <span key={item.id} className={`h-1.5 flex-1 rounded-full ${pip <= index ? "bg-grove" : "bg-line"}`} />
        ))}
      </div>
      <div className="flex-1 py-6">
        {block?.type === "explain" ? <Explain block={block} /> : null}
        {block?.type === "activity" ? (
          <ActivityView key={block.id} activity={block.activity} onResult={onResult} />
        ) : null}
      </div>
      <footer className="sticky bottom-0 grid gap-2 bg-paper/95 py-4 backdrop-blur" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        {toast && (
          <p className="text-center font-mono text-sm text-grove" role="status">
            {toast}
          </p>
        )}
        <button type="button" className={primaryBtn} onClick={goNext} disabled={!ready}>
          {index === lesson.blocks.length - 1 ? "Finish lesson" : "Continue"}
        </button>
      </footer>
    </main>
  );
}

function TeachBody({ text }: { text: string }) {
  const chunks = text.trim().split(/\n\s*\n/);
  return (
    <div className="grid gap-3 text-[17px] leading-relaxed">
      {chunks.map((chunk) => {
        const lines = chunk
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const list = lines.length > 0 && lines.every((line) => line.startsWith("- "));
        if (list) {
          return (
            <ul key={chunk} className="grid list-disc gap-2 pl-5">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return <p key={chunk}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

function Explain({ block }: { block: Extract<Lesson["blocks"][number], { type: "explain" }> }) {
  return (
    <article className="grid gap-4">
      <h2 className="text-2xl font-semibold tracking-tight">{block.heading}</h2>
      <TeachBody text={block.body} />
      {block.analogy && (
        <p className="rounded-[20px] bg-soft px-4 py-4 leading-relaxed">
          <span className="font-semibold">Picture it. </span>
          {block.analogy}
        </p>
      )}
      {block.example && (
        <p className="rounded-[20px] bg-surface px-4 py-4 leading-relaxed ring-1 ring-line">
          <span className="font-semibold">For instance. </span>
          {block.example}
        </p>
      )}
    </article>
  );
}

function Burst() {
  const dots = [
    { x: "12%", y: "20%", d: 0 },
    { x: "78%", y: "18%", d: 0.05 },
    { x: "88%", y: "62%", d: 0.1 },
    { x: "8%", y: "70%", d: 0.08 },
    { x: "50%", y: "8%", d: 0.12 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((dot) => (
        <motion.span
          key={dot.x}
          className="absolute size-2 rounded-full bg-on-grove"
          style={{ left: dot.x, top: dot.y }}
          initial={{ opacity: 0, y: 8, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], y: -18, scale: 1 }}
          transition={{ duration: 0.9, delay: dot.d, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <Check className="absolute right-4 top-4" size={22} weight="bold" />
    </div>
  );
}

function activityId(block: Lesson["blocks"][number] | undefined) {
  if (!block || block.type !== "activity") return "read";
  return block.activity.id;
}
