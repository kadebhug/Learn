"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseTopic } from "@/lib/schema";
import { useGrove } from "@/lib/store";
import type { Difficulty, Topic } from "@/lib/types";
import { nid } from "@/lib/text";
import { useHydrated } from "@/lib/use-hydrated";
import { field, primaryBtn, quietBtn } from "@/components/ui";

export default function EditPathPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const hydrated = useHydrated();
  const customTopics = useGrove((state) => state.customTopics);
  const saveTopic = useGrove((state) => state.saveTopic);
  const removeTopic = useGrove((state) => state.removeTopic);
  const existing = customTopics.find((topic) => topic.slug === params.slug) ?? null;
  const [draft, setDraft] = useState<Topic | null>(null);
  const [raw, setRaw] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (existing && !draft) {
      setDraft(structuredClone(existing));
      setRaw(JSON.stringify(existing, null, 2));
    }
  }, [existing, draft]);

  if (!hydrated) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;
  if (!existing) {
    return (
      <div className="px-5 py-10">
        <p>Sample courses stay as they shipped. Export one and import a copy if you want to edit it.</p>
        <Link href="/paths" className={`${quietBtn} mt-4`}>
          All paths
        </Link>
      </div>
    );
  }
  if (!draft) return <p className="px-5 py-10 text-muted">Opening your grove...</p>;

  function update(mutator: (topic: Topic) => void) {
    setDraft((current) => {
      if (!current) return current;
      const next = structuredClone(current);
      mutator(next);
      setRaw(JSON.stringify(next, null, 2));
      return next;
    });
  }

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-5 px-5 pt-6 pb-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Edit path</h1>
        <p className="mt-1 text-sm text-muted">Change the words here, or replace the whole course from JSON.</p>
      </header>
      <label className="grid gap-2 text-sm font-semibold" htmlFor="edit-title">
        Title
        <input id="edit-title" className={field} value={draft.title} onChange={(event) => update((topic) => void (topic.title = event.target.value))} />
      </label>
      <label className="grid gap-2 text-sm font-semibold" htmlFor="edit-blurb">
        Short description
        <textarea id="edit-blurb" className={`${field} min-h-20 py-3`} value={draft.blurb} onChange={(event) => update((topic) => void (topic.blurb = event.target.value))} />
      </label>
      <label className="grid gap-2 text-sm font-semibold" htmlFor="edit-level">
        Difficulty
        <select
          id="edit-level"
          className={field}
          value={draft.difficulty}
          onChange={(event) => update((topic) => void (topic.difficulty = event.target.value as Difficulty))}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      {draft.modules.map((module, moduleIndex) => (
        <section key={module.id} className="grid gap-3 rounded-[20px] bg-surface p-4 ring-1 ring-line">
          <label className="grid gap-2 text-sm font-semibold" htmlFor={`mod-${module.id}`}>
            Module
            <input
              id={`mod-${module.id}`}
              className={field}
              value={module.title}
              onChange={(event) => update((topic) => void (topic.modules[moduleIndex]!.title = event.target.value))}
            />
          </label>
          {module.lessons.map((lesson, lessonIndex) => {
            const explain = lesson.blocks.find((block) => block.type === "explain");
            return (
              <div key={lesson.id} className="grid gap-2 border-t border-line pt-3">
                <label className="grid gap-2 text-sm font-semibold" htmlFor={`les-${lesson.id}`}>
                  Lesson
                  <input
                    id={`les-${lesson.id}`}
                    className={field}
                    value={lesson.title}
                    onChange={(event) =>
                      update((topic) => void (topic.modules[moduleIndex]!.lessons[lessonIndex]!.title = event.target.value))
                    }
                  />
                </label>
                {explain && (
                  <label className="grid gap-2 text-sm font-semibold" htmlFor={`body-${lesson.id}`}>
                    Explanation
                    <textarea
                      id={`body-${lesson.id}`}
                      className={`${field} min-h-28 py-3`}
                      value={explain.body}
                      onChange={(event) =>
                        update((topic) => {
                          const block = topic.modules[moduleIndex]!.lessons[lessonIndex]!.blocks.find((item) => item.type === "explain");
                          if (block && block.type === "explain") block.body = event.target.value;
                        })
                      }
                    />
                  </label>
                )}
                <button
                  type="button"
                  className="justify-self-start text-sm font-semibold text-miss"
                  onClick={() =>
                    update((topic) => {
                      const lessons = topic.modules[moduleIndex]!.lessons;
                      if (lessons.length === 1 && topic.modules.length === 1) return;
                      lessons.splice(lessonIndex, 1);
                      if (lessons.length === 0) topic.modules.splice(moduleIndex, 1);
                    })
                  }
                >
                  Remove lesson
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className={quietBtn}
            onClick={() =>
              update((topic) => {
                const id = nid("lesson");
                topic.modules[moduleIndex]!.lessons.push({
                  id,
                  title: "New lesson",
                  minutes: 4,
                  summary: "Added by hand.",
                  blocks: [
                    {
                      id: `${id}-ex`,
                      type: "explain",
                      heading: "New lesson",
                      body: "Write the explanation here.",
                    },
                    {
                      id: `${id}-q`,
                      type: "activity",
                      activity: {
                        id: `${id}-choice`,
                        type: "choice",
                        prompt: "Which check belongs in this lesson?",
                        options: ["A short question about the idea", "No question", "A trick with no answer"],
                        answerIndex: 0,
                        explain: "Replace this with a question that tests the paragraph above.",
                      },
                    },
                  ],
                });
              })
            }
          >
            Add lesson
          </button>
        </section>
      ))}
      <button
        type="button"
        className={quietBtn}
        onClick={() =>
          update((topic) => {
            const id = nid("module");
            const lessonId = nid("lesson");
            topic.modules.push({
              id,
              title: "New module",
              summary: "Added by hand.",
              lessons: [
                {
                  id: lessonId,
                  title: "New lesson",
                  minutes: 4,
                  summary: "Added by hand.",
                  blocks: [
                    { id: `${lessonId}-ex`, type: "explain", heading: "New lesson", body: "Write the explanation here." },
                    {
                      id: `${lessonId}-q`,
                      type: "activity",
                      activity: {
                        id: `${lessonId}-choice`,
                        type: "choice",
                        prompt: "What should someone remember from this lesson?",
                        options: ["The idea in the paragraph", "Nothing yet", "A fact from a different topic"],
                        answerIndex: 0,
                        explain: "Point this question at the explanation.",
                      },
                    },
                  ],
                },
              ],
            });
          })
        }
      >
        Add module
      </button>
      <details>
        <summary className="cursor-pointer text-sm font-semibold">Course JSON</summary>
        <textarea className={`${field} mt-2 min-h-48 py-3 font-mono text-xs`} value={raw} onChange={(event) => setRaw(event.target.value)} />
        <button
          type="button"
          className={`${quietBtn} mt-2`}
          onClick={() => {
            try {
              const parsed = parseTopic(JSON.parse(raw));
              parsed.slug = draft.slug;
              setDraft(parsed);
              setMessage("JSON applied. Save to keep it.");
            } catch {
              setMessage("That JSON does not match a Grove course.");
            }
          }}
        >
          Apply JSON
        </button>
      </details>
      {message && <p role="status" className="text-sm text-muted">{message}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={primaryBtn}
          onClick={() => {
            try {
              const parsed = parseTopic({ ...draft, source: draft.source === "sample" ? "custom" : draft.source });
              saveTopic(parsed);
              router.push(`/paths/${parsed.slug}`);
            } catch {
              setMessage("Fix the empty fields before saving.");
            }
          }}
        >
          Save
        </button>
        <button
          type="button"
          className={quietBtn}
          onClick={() => {
            if (!window.confirm("Remove this path from the device?")) return;
            removeTopic(draft.slug);
            router.push("/paths");
          }}
        >
          Delete path
        </button>
      </div>
    </div>
  );
}
