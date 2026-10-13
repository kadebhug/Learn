"use client";

import { useState } from "react";
import { allTopics } from "@/lib/catalog";
import { recommendation } from "@/lib/recommend";
import { isDue } from "@/lib/srs";
import { useGrove } from "@/lib/store";
import type { ThemeChoice } from "@/lib/types";
import { useHydrated } from "@/lib/use-hydrated";
import { BADGES, levelFor, levelProgress } from "@/lib/xp";
import { card, field, primaryBtn, quietBtn } from "@/components/ui";

const themes: { id: ThemeChoice; label: string }[] = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export default function YouPage() {
  const hydrated = useHydrated();
  const name = useGrove((state) => state.name);
  const setName = useGrove((state) => state.setName);
  const theme = useGrove((state) => state.theme);
  const setTheme = useGrove((state) => state.setTheme);
  const xp = useGrove((state) => state.xp);
  const streak = useGrove((state) => state.streak);
  const longest = useGrove((state) => state.longestStreak);
  const badges = useGrove((state) => state.badges);
  const sessions = useGrove((state) => state.sessions);
  const lessons = useGrove((state) => state.lessons);
  const cards = useGrove((state) => state.cards);
  const customTopics = useGrove((state) => state.customTopics);
  const resetProgress = useGrove((state) => state.resetProgress);
  const [draft, setDraft] = useState<string | null>(null);
  if (hydrated && draft === null) setDraft(name);

  if (!hydrated || draft === null) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  const topics = allTopics(customTopics);
  const due = Object.values(cards).filter((cardState) => isDue(cardState)).length;
  const advice = recommendation(topics, lessons, due);
  const level = levelFor(xp);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 px-5 pt-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">You</h1>
        <p className="mt-1 text-sm text-muted">
          Level {level} · {xp} XP · {Math.round(levelProgress(xp) * 100)}% to the next one
        </p>
      </header>

      <section className={`${card} grid gap-3 p-4`}>
        <label className="grid gap-2 text-sm font-semibold" htmlFor="display-name">
          What should Grove call you?
          <input id="display-name" className={field} value={draft} onChange={(event) => setDraft(event.target.value)} />
        </label>
        <button type="button" className={primaryBtn} onClick={() => setName(draft)}>
          Save name
        </button>
      </section>

      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">Theme</h2>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Theme">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={theme === item.id}
              onClick={() => setTheme(item.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ring-1 ${
                theme === item.id ? "bg-grove-deep text-on-grove ring-grove-deep" : "bg-surface ring-line"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <p className={`${card} px-4 py-4`}>
          <span className="block font-mono text-2xl text-streak">{streak}</span>
          <span className="text-sm text-muted">day streak</span>
        </p>
        <p className={`${card} px-4 py-4`}>
          <span className="block font-mono text-2xl">{longest}</span>
          <span className="text-sm text-muted">longest streak</span>
        </p>
      </section>

      {advice && <p className={`${card} px-4 py-4 text-sm leading-relaxed`}>{advice.text}</p>}

      <section>
        <h2 className="text-lg font-semibold">Badges</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {BADGES.map((badge) => {
            const earned = badges.includes(badge.id);
            return (
              <li key={badge.id} className={`${card} px-4 py-3 ${earned ? "" : "opacity-50"}`}>
                <p className="font-semibold">{badge.title}</p>
                <p className="text-sm text-muted">{earned ? "Earned" : badge.detail}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Sessions</h2>
        {sessions.length === 0 ? (
          <p className="mt-2 text-sm text-muted">A session shows up after you spend a moment in a lesson.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {sessions.slice(0, 8).map((session) => (
              <li key={session.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  {session.kind} · {session.topicSlug}
                </span>
                <span className="font-mono text-muted">
                  {session.minutes} min · {session.xp} XP
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        className={quietBtn}
        onClick={() => {
          if (!window.confirm("Erase XP, streaks, and lesson progress on this device? Your name and theme stay.")) return;
          resetProgress();
          setDraft(name);
        }}
      >
        Reset progress
      </button>
    </div>
  );
}
