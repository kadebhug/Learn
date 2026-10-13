"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { allTopics } from "@/lib/catalog";
import { parseTopic } from "@/lib/schema";
import { makeStarter } from "@/lib/starter";
import { useGrove } from "@/lib/store";
import type { Difficulty, Topic } from "@/lib/types";
import { useHydrated } from "@/lib/use-hydrated";
import { field, primaryBtn, quietBtn } from "@/components/ui";

const levels: { id: Difficulty; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export default function NewPathPage() {
  return (
    <Suspense fallback={<p className="px-5 py-10 text-muted">Opening your grove...</p>}>
      <NewPathForm />
    </Suspense>
  );
}

function NewPathForm() {
  const router = useRouter();
  const params = useSearchParams();
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const saveTopic = useGrove((state) => state.saveTopic);
  const [title, setTitle] = useState(params.get("topic") ?? "");
  const requested = params.get("difficulty");
  const initialLevel: Difficulty = requested === "intermediate" || requested === "advanced" ? requested : "beginner";
  const [difficulty, setDifficulty] = useState<Difficulty>(initialLevel);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [raw, setRaw] = useState("");
  const taken = useMemo(() => allTopics(customTopics).map((topic) => topic.slug), [customTopics]);

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  function keep(topic: Topic, note: string) {
    saveTopic(topic);
    setMessage(note);
    router.push(`/paths/${topic.slug}`);
  }

  async function generate() {
    if (title.trim().length < 2) {
      setMessage("Name the topic first.");
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), difficulty, notes, taken }),
      });
      const body = (await response.json()) as { topic?: Topic; error?: string };
      if (response.status === 503 || body.error === "no_key") {
        keep(
          makeStarter(title, difficulty, notes, taken),
          "No API key on the server, so this is a starter outline. You can edit every lesson.",
        );
        return;
      }
      if (!response.ok || !body.topic) {
        setMessage("Grove could not build that course. Try again, or start from an outline.");
        return;
      }
      const topic = parseTopic(body.topic, "generated");
      keep(topic, "");
    } catch {
      setMessage("Grove could not build that course. You can still start from an outline.");
    } finally {
      setBusy(false);
    }
  }

  function importJson() {
    try {
      const parsed = parseTopic(JSON.parse(raw), "custom");
      if (taken.includes(parsed.slug)) parsed.slug = `${parsed.slug}-import`;
      keep(parsed, "");
    } catch {
      setMessage("That JSON does not match a Grove course.");
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6 px-5 pt-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">New path</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Name any topic. With an API key, Grove writes the lessons. Without one, you get an honest starter you can edit.
        </p>
      </header>
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void generate();
        }}
      >
        <label className="grid gap-2 text-sm font-semibold" htmlFor="topic-title">
          Topic
          <input id="topic-title" className={field} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Quantum computing" />
        </label>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-semibold">Difficulty</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {levels.map((level) => (
              <button
                key={level.id}
                type="button"
                role="radio"
                aria-checked={difficulty === level.id}
                onClick={() => setDifficulty(level.id)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ring-1 ${
                  difficulty === level.id ? "bg-grove-deep text-on-grove ring-grove-deep" : "bg-surface ring-line"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2 text-sm font-semibold" htmlFor="topic-notes">
          Notes for the course
          <textarea
            id="topic-notes"
            className={`${field} min-h-24 py-3`}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional. What you already know, or what to skip."
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className={primaryBtn} disabled={busy}>
            {busy ? "Building..." : "Build this path"}
          </button>
          <button
            type="button"
            className={quietBtn}
            onClick={() => {
              if (title.trim().length < 2) {
                setMessage("Name the topic first.");
                return;
              }
              keep(makeStarter(title, difficulty, notes, taken), "Starter outline. Edit the lessons so they teach the real idea.");
            }}
          >
            I will write it
          </button>
        </div>
      </form>
      {message && (
        <p className="text-sm text-muted" role="status">
          {message}
        </p>
      )}
      {busy && <div className="h-24 animate-pulse rounded-[20px] bg-soft" aria-hidden />}
      <details className="rounded-[20px] bg-surface p-4 ring-1 ring-line">
        <summary className="cursor-pointer font-semibold">Import a course JSON</summary>
        <label className="mt-3 grid gap-2 text-sm" htmlFor="import-json">
          Paste a Grove course
          <textarea id="import-json" className={`${field} min-h-32 py-3 font-mono text-xs`} value={raw} onChange={(event) => setRaw(event.target.value)} />
        </label>
        <button type="button" className={`${quietBtn} mt-3`} onClick={importJson}>
          Import
        </button>
      </details>
      <Link href="/paths" className="text-sm font-semibold text-grove">
        Back to paths
      </Link>
    </div>
  );
}
