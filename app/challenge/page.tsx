"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { allTopics, topicActivities } from "@/lib/catalog";
import { useGrove } from "@/lib/store";
import { hashString, shuffle, todayKey } from "@/lib/text";
import type { Activity } from "@/lib/types";
import { useHydrated } from "@/lib/use-hydrated";
import { ActivityView } from "@/components/lesson/ActivityView";
import { primaryBtn, quietBtn } from "@/components/ui";

type Prompt = { id: string; activity: Activity };
type Pair = { left: string; right: string };

export default function ChallengePage() {
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const markChallenge = useGrove((state) => state.markChallenge);
  const markSprint = useGrove((state) => state.markSprint);
  const challengeDate = useGrove((state) => state.challengeDate);
  const topics = allTopics(customTopics);
  const prompts = useMemo(() => dailyPrompts(topics), [topics]);
  const pairs = useMemo(() => matchPairs(topics), [topics]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [phase, setPhase] = useState<"quiz" | "done" | "sprint" | "sprint-done">("quiz");
  const [awarded, setAwarded] = useState(0);
  const [sprintScore, setSprintScore] = useState(0);
  const counted = useRef(false);

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  const todayDone = challengeDate === todayKey();
  const prompt = prompts[index];

  return (
    <div className="mx-auto grid w-full max-w-xl gap-5 px-5 pt-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Daily challenge</h1>
        <p className="mt-1 text-sm text-muted">
          {todayDone && phase === "quiz"
            ? "You already cleared today's set. Playing again will not add XP."
            : "Five checks from your paths, then a one-minute match."}
        </p>
      </header>

      {phase === "quiz" && prompt && (
        <>
          <p className="font-mono text-sm text-muted">
            {index + 1} / {prompts.length}
          </p>
          <ActivityView
            key={prompt.id}
            activity={prompt.activity}
            onResult={(attempt) => {
              if (counted.current) return;
              counted.current = true;
              if (attempt.correct && attempt.firstTry) setCorrect((value) => value + 1);
              setReady(true);
            }}
          />
          {ready && (
            <button
              type="button"
              className={primaryBtn}
              onClick={() => {
                counted.current = false;
                if (index + 1 >= prompts.length) {
                  const award = markChallenge();
                  setAwarded(award.xpGained);
                  setPhase("done");
                } else {
                  setIndex((value) => value + 1);
                  setReady(false);
                }
              }}
            >
              {index + 1 >= prompts.length ? "See the score" : "Next"}
            </button>
          )}
        </>
      )}

      {phase === "done" && (
        <section className="grid gap-3 rounded-[20px] bg-grove-deep p-5 text-on-grove">
          <h2 className="text-2xl font-semibold">
            {correct} of {prompts.length} on the first try
          </h2>
          <p className="text-on-grove/80">
            {awarded ? `+${awarded} XP for showing up today.` : "XP for this set was already counted today."}
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-on-grove px-5 font-semibold text-grove-deep"
            onClick={() => setPhase("sprint")}
          >
            Match sprint
          </button>
        </section>
      )}

      {phase === "sprint" && (
        <Sprint
          pairs={pairs}
          onDone={(score) => {
            markSprint();
            setSprintScore(score);
            setPhase("sprint-done");
          }}
        />
      )}

      {phase === "sprint-done" && (
        <section className="grid gap-3">
          <h2 className="text-2xl font-semibold">{sprintScore} matches</h2>
          <p className="text-muted">A minute goes faster than it looks. The set tomorrow will be a different mix.</p>
          <Link href="/" className={quietBtn}>
            Home
          </Link>
        </section>
      )}
    </div>
  );
}

function Sprint({ pairs, onDone }: { pairs: Pair[]; onDone: (score: number) => void }) {
  const deck = useMemo(() => buildSprint(pairs), [pairs]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(60);
  const [locked, setLocked] = useState(false);
  const scoreRef = useRef(0);
  const finished = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      const remain = Math.max(0, 60 - Math.floor((Date.now() - started) / 1000));
      setLeft(remain);
      if (remain <= 0 && !finished.current) {
        finished.current = true;
        window.clearInterval(timer);
        onDoneRef.current(scoreRef.current);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  const card = deck[index % Math.max(deck.length, 1)];
  if (!card) return null;

  return (
    <section className="grid gap-3">
      <p className="flex justify-between font-mono text-sm">
        <span>{left}s</span>
        <span>{score} right</span>
      </p>
      <h2 className="text-xl font-semibold">{card.left}</h2>
      <div className="grid gap-2" role="group" aria-label="Match">
        {card.options.map((option) => (
          <button
            key={option}
            type="button"
            className={quietBtn}
            disabled={locked || left <= 0}
            onClick={() => {
              if (locked) return;
              setLocked(true);
              if (option === card.right) {
                scoreRef.current += 1;
                setScore(scoreRef.current);
              }
              window.setTimeout(() => {
                setLocked(false);
                setIndex((value) => value + 1);
              }, 160);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

function dailyPrompts(topics: ReturnType<typeof allTopics>): Prompt[] {
  const pool: Prompt[] = [];
  for (const topic of topics) {
    for (const { activity } of topicActivities(topic)) {
      if (activity.type === "choice" || activity.type === "blank" || activity.type === "scenario") {
        pool.push({ id: `${topic.slug}:${activity.id}`, activity });
      }
    }
  }
  return shuffle(pool, hashString(todayKey())).slice(0, 5);
}

function matchPairs(topics: ReturnType<typeof allTopics>): Pair[] {
  const pairs: Pair[] = [];
  for (const topic of topics) {
    for (const { activity } of topicActivities(topic)) {
      if (activity.type === "match") pairs.push(...activity.pairs);
    }
  }
  return pairs;
}

function buildSprint(pairs: Pair[]) {
  const source =
    pairs.length >= 4
      ? pairs
      : [
          { left: "yo", right: "hablo" },
          { left: "label", right: "the answer to predict" },
          { left: "estar", right: "a state or a place" },
          { left: "loss", right: "how wrong the guess is" },
        ];
  const rights = [...new Set(source.map((pair) => pair.right))];
  return shuffle(source, hashString(`${todayKey()}-sprint`)).map((pair, index) => {
    const distractors = shuffle(
      rights.filter((right) => right !== pair.right),
      hashString(`${pair.left}:${index}`),
    ).slice(0, 2);
    return {
      ...pair,
      options: shuffle([pair.right, ...distractors], hashString(`${pair.right}:${index}`)),
    };
  });
}
