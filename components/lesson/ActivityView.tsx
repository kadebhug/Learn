"use client";

import { useEffect, useMemo, useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { localFeedback } from "@/lib/feedback";
import { apiUrl } from "@/lib/hrefs";
import type { Feedback } from "@/lib/schema";
import { hashString, norm, shuffle } from "@/lib/text";
import type { Activity } from "@/lib/types";
import { field, primaryBtn, quietBtn } from "@/components/ui";

export type Attempt = {
  correct: boolean;
  firstTry: boolean;
  kind: "teach" | "map" | "other";
};

export function ActivityView({
  activity,
  onResult,
  onNote,
}: {
  activity: Activity;
  onResult: (attempt: Attempt) => void;
  onNote?: (id: string, text: string) => void;
}) {
  switch (activity.type) {
    case "choice":
      return <ChoiceView prompt={activity.prompt} options={activity.options} answerIndex={activity.answerIndex} explain={activity.explain} onResult={onResult} />;
    case "scenario":
      return (
        <div className="grid gap-4">
          <p className="rounded-[20px] bg-soft px-4 py-4 leading-relaxed">{activity.setup}</p>
          <ChoiceView prompt={activity.prompt} options={activity.options} answerIndex={activity.answerIndex} explain={activity.explain} onResult={onResult} />
        </div>
      );
    case "blank":
      return <BlankView activity={activity} onResult={onResult} />;
    case "match":
      return <MatchView activity={activity} onResult={onResult} />;
    case "short":
      return <ShortView activity={activity} onResult={onResult} />;
    case "map":
      return <MapView activity={activity} onResult={onResult} />;
    case "teach":
      return <TeachView activity={activity} onResult={onResult} />;
    case "reflect":
      return <ReflectView activity={activity} onResult={onResult} onNote={onNote} />;
  }
}

function ChoiceView({
  prompt,
  options,
  answerIndex,
  explain,
  onResult,
}: {
  prompt: string;
  options: string[];
  answerIndex: number;
  explain: string;
  onResult: (attempt: Attempt) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (locked) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < options.length) {
        event.preventDefault();
        choose(index);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(index: number) {
    if (locked) return;
    const correct = index === answerIndex;
    setPicked(index);
    setLocked(true);
    setTries((count) => count + 1);
    onResult({ correct, firstTry: tries === 0, kind: "other" });
  }

  return (
    <div className="grid gap-3">
      <p className="text-lg font-semibold leading-snug">{prompt}</p>
      <div role="group" aria-label="Answers" className="grid gap-2">
        {options.map((option, index) => {
          const selected = picked === index;
          const correct = locked && index === answerIndex;
          const wrong = locked && selected && index !== answerIndex;
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(index)}
              disabled={locked}
              className={`flex min-h-14 w-full items-center gap-3 rounded-[14px] px-4 text-left text-[16px] ring-1 transition active:scale-[0.98] disabled:opacity-100 ${
                correct
                  ? "bg-soft text-grove-deep ring-grove"
                  : wrong
                    ? "bg-surface text-miss ring-miss"
                    : "bg-surface text-ink ring-line"
              }`}
            >
              <span className="font-mono text-sm text-muted">{index + 1}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {locked && (
        <FeedbackLine ok={picked === answerIndex} text={explain}>
          {picked !== answerIndex && (
            <button
              type="button"
              className={quietBtn}
              onClick={() => {
                setLocked(false);
                setPicked(null);
              }}
            >
              Try again
            </button>
          )}
        </FeedbackLine>
      )}
    </div>
  );
}

function BlankView({
  activity,
  onResult,
}: {
  activity: Extract<Activity, { type: "blank" }>;
  onResult: (attempt: Attempt) => void;
}) {
  const [value, setValue] = useState("");
  const [locked, setLocked] = useState(false);
  const [ok, setOk] = useState(false);
  const [tries, setTries] = useState(0);
  const accepted = activity.answers.map(norm);

  function check() {
    if (locked || !value.trim()) return;
    const correct = accepted.includes(norm(value));
    setOk(correct);
    setLocked(true);
    setTries((count) => count + 1);
    onResult({ correct, firstTry: tries === 0, kind: "other" });
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <label className="text-lg font-semibold leading-snug" htmlFor="blank-answer">
        {activity.prompt}
      </label>
      <input
        id="blank-answer"
        className={field}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={locked}
        placeholder="Type the missing word"
      />
      {!locked && (
        <button type="submit" className={primaryBtn} disabled={!value.trim()}>
          Check
        </button>
      )}
      {locked && (
        <FeedbackLine ok={ok} text={activity.explain}>
          {!ok && (
            <button
              type="button"
              className={quietBtn}
              onClick={() => {
                setLocked(false);
                setValue("");
              }}
            >
              Try again
            </button>
          )}
        </FeedbackLine>
      )}
    </form>
  );
}

function MatchView({
  activity,
  onResult,
}: {
  activity: Extract<Activity, { type: "match" }>;
  onResult: (attempt: Attempt) => void;
}) {
  const rights = useMemo(
    () => shuffle(activity.pairs.map((pair) => pair.right), hashString(activity.id + "r")),
    [activity],
  );
  const [left, setLeft] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, string>>({});
  const [misses, setMisses] = useState(0);
  const [shake, setShake] = useState(false);
  const [finished, setFinished] = useState(false);

  function pickRight(right: string) {
    if (!left || finished) return;
    const pair = activity.pairs.find((item) => item.left === left);
    if (pair?.right === right) {
      const next = { ...done, [left]: right };
      setDone(next);
      setLeft(null);
      if (Object.keys(next).length === activity.pairs.length) {
        setFinished(true);
        onResult({ correct: misses === 0, firstTry: misses === 0, kind: "other" });
      }
    } else {
      setMisses((count) => count + 1);
      setShake(true);
      window.setTimeout(() => {
        setShake(false);
        setLeft(null);
      }, 280);
    }
  }

  return (
    <div className="grid gap-3">
      <p className="text-lg font-semibold leading-snug">{activity.prompt}</p>
      <p className="text-sm text-muted">Tap a clue, then tap its match.</p>
      <div className={`grid gap-2 sm:grid-cols-2 ${shake ? "animate-pulse" : ""}`}>
        <div className="grid gap-2" role="group" aria-label="Clues">
          {activity.pairs.map((pair) => {
            const matched = Boolean(done[pair.left]);
            const selected = left === pair.left;
            return (
              <button
                key={pair.left}
                type="button"
                disabled={matched || finished}
                onClick={() => setLeft(pair.left)}
                className={`min-h-14 rounded-[14px] px-3 text-left font-medium ring-1 ${
                  matched ? "bg-soft text-grove-deep ring-grove" : selected ? "bg-ink text-paper ring-ink" : "bg-surface ring-line"
                }`}
              >
                {pair.left}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2" role="group" aria-label="Matches">
          {rights.map((right) => {
            const used = Object.values(done).includes(right);
            return (
              <button
                key={right}
                type="button"
                disabled={used || finished || !left}
                onClick={() => pickRight(right)}
                className={`min-h-14 rounded-[14px] px-3 text-left ring-1 ${
                  used ? "bg-soft text-grove-deep ring-grove" : "bg-surface ring-line disabled:opacity-50"
                }`}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>
      {finished && <FeedbackLine ok={misses === 0} text={activity.explain} />}
    </div>
  );
}

function ShortView({
  activity,
  onResult,
}: {
  activity: Extract<Activity, { type: "short" }>;
  onResult: (attempt: Attempt) => void;
}) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [tries, setTries] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  function checkLocal() {
    const result = localFeedback(value, activity.rubric);
    setFeedback(result);
    setTries((count) => count + 1);
    onResult({ correct: result.score >= 2, firstTry: tries === 0, kind: "other" });
  }

  async function askGrove() {
    setBusy(true);
    setNote(null);
    try {
      const response = await fetch(apiUrl("/api/feedback"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: activity.prompt, answer: value, keyPoints: activity.rubric }),
      });
      const body = (await response.json()) as { feedback?: Feedback; error?: string };
      if (!response.ok || !body.feedback || body.error) {
        setNote(body.error === "no_key" ? "No API key on the server. The note above is from the lesson checklist." : "Grove could not read that just now.");
        return;
      }
      setFeedback(body.feedback);
      setNote("Read by Grove.");
    } catch {
      setNote("Grove could not read that just now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label className="text-lg font-semibold leading-snug" htmlFor="short-answer">
        {activity.prompt}
      </label>
      <textarea id="short-answer" className={`${field} min-h-32 py-3`} value={value} onChange={(event) => setValue(event.target.value)} />
      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryBtn} onClick={checkLocal} disabled={value.trim().length < 8}>
          Check
        </button>
        {feedback && (
          <button type="button" className={quietBtn} onClick={askGrove} disabled={busy}>
            {busy ? "Reading..." : "Ask Grove"}
          </button>
        )}
      </div>
      {feedback && (
        <FeedbackLine ok={feedback.score >= 2} text={feedback.note}>
          {feedback.missing.length > 0 && (
            <ul className="grid gap-1 text-sm">
              {feedback.missing.map((item) => (
                <li key={item}>Still open: {item}</li>
              ))}
            </ul>
          )}
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">One way to say it. </span>
            {activity.sample}
          </p>
          {note && <p className="text-sm text-muted">{note}</p>}
        </FeedbackLine>
      )}
    </div>
  );
}

function MapView({
  activity,
  onResult,
}: {
  activity: Extract<Activity, { type: "map" }>;
  onResult: (attempt: Attempt) => void;
}) {
  const initial = useMemo(() => mixSteps(activity.steps, hashString(activity.id)), [activity]);
  const [order, setOrder] = useState(initial);
  const [drag, setDrag] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [ok, setOk] = useState(false);
  const [tries, setTries] = useState(0);

  function move(from: number, to: number) {
    if (locked || to < 0 || to >= order.length) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    setOrder(next);
  }

  function check() {
    const correct = order.every((step, index) => step === activity.steps[index]);
    setOk(correct);
    setLocked(true);
    setTries((count) => count + 1);
    onResult({ correct, firstTry: tries === 0, kind: "map" });
  }

  return (
    <div className="grid gap-3">
      <p className="text-lg font-semibold leading-snug">{activity.prompt}</p>
      <p className="text-sm text-muted">Drag a row, or use the arrows.</p>
      <ol className="grid gap-2">
        {order.map((step, index) => (
          <li
            key={step}
            draggable={!locked}
            onDragStart={() => setDrag(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (drag === null) return;
              move(drag, index);
              setDrag(null);
            }}
            className="flex min-h-14 items-center gap-2 rounded-[14px] bg-surface px-2 ring-1 ring-line"
          >
            <span className="w-7 text-center font-mono text-sm text-muted">{index + 1}</span>
            <span className="flex-1 font-medium">{step}</span>
            <button type="button" className="grid size-11 place-items-center rounded-full" aria-label={`Move ${step} up`} disabled={locked || index === 0} onClick={() => move(index, index - 1)}>
              <CaretUp size={18} aria-hidden />
            </button>
            <button type="button" className="grid size-11 place-items-center rounded-full" aria-label={`Move ${step} down`} disabled={locked || index === order.length - 1} onClick={() => move(index, index + 1)}>
              <CaretDown size={18} aria-hidden />
            </button>
          </li>
        ))}
      </ol>
      {!locked && (
        <button type="button" className={primaryBtn} onClick={check}>
          Check order
        </button>
      )}
      {locked && (
        <FeedbackLine ok={ok} text={activity.explain}>
          {!ok && (
            <button
              type="button"
              className={quietBtn}
              onClick={() => setLocked(false)}
            >
              Try again
            </button>
          )}
        </FeedbackLine>
      )}
    </div>
  );
}

function TeachView({
  activity,
  onResult,
}: {
  activity: Extract<Activity, { type: "teach" }>;
  onResult: (attempt: Attempt) => void;
}) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [source, setSource] = useState<"notes" | "grove" | null>(null);
  const [busy, setBusy] = useState(false);
  const [tries, setTries] = useState(0);

  async function submit() {
    setBusy(true);
    let result = localFeedback(value, activity.keyPoints);
    let from: "notes" | "grove" = "notes";
    try {
      const response = await fetch(apiUrl("/api/feedback"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: activity.prompt, answer: value, keyPoints: activity.keyPoints }),
      });
      const body = (await response.json()) as { feedback?: Feedback; error?: string };
      if (response.ok && body.feedback && !body.error) {
        result = body.feedback;
        from = "grove";
      }
    } catch {
      from = "notes";
    }
    setFeedback(result);
    setSource(from);
    setTries((count) => count + 1);
    onResult({ correct: result.score >= 2, firstTry: tries === 0, kind: "teach" });
    setBusy(false);
  }

  const landed = feedback ? ["A start", "Getting there", "That would land", "You taught it"][feedback.score] : "";

  return (
    <div className="grid gap-3">
      <label className="text-lg font-semibold leading-snug" htmlFor="teach-answer">
        {activity.prompt}
      </label>
      <textarea id="teach-answer" className={`${field} min-h-36 py-3`} value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="button" className={primaryBtn} onClick={submit} disabled={busy || value.trim().length < 12}>
        {busy ? "Reading..." : "See how it landed"}
      </button>
      {feedback && (
        <FeedbackLine ok={feedback.score >= 2} text={`${landed}. ${feedback.note}`}>
          {source === "notes" && <p className="text-sm text-muted">Checked against the lesson notes. Add an API key for a fuller read.</p>}
          {feedback.missing.length > 0 && (
            <ul className="grid gap-1 text-sm">
              {feedback.missing.map((item) => (
                <li key={item}>Missing: {item}</li>
              ))}
            </ul>
          )}
        </FeedbackLine>
      )}
    </div>
  );
}

function ReflectView({
  activity,
  onResult,
  onNote,
}: {
  activity: Extract<Activity, { type: "reflect" }>;
  onResult: (attempt: Attempt) => void;
  onNote?: (id: string, text: string) => void;
}) {
  const [value, setValue] = useState("");
  const [kept, setKept] = useState(false);

  function change(text: string) {
    setValue(text);
    if (kept) onNote?.(activity.id, text.trim());
  }

  function keep(text: string) {
    onNote?.(activity.id, text);
    if (!kept) {
      setKept(true);
      onResult({ correct: true, firstTry: true, kind: "other" });
    }
  }

  return (
    <div className="grid gap-3">
      <p className="rounded-[20px] bg-soft px-4 py-4 leading-relaxed">{activity.help}</p>
      <label className="text-lg font-semibold leading-snug" htmlFor={activity.id}>
        {activity.prompt}
      </label>
      <textarea
        id={activity.id}
        className={`${field} min-h-32 py-3`}
        value={value}
        onChange={(event) => change(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryBtn} onClick={() => keep(value.trim())} disabled={value.trim().length === 0}>
          {kept ? "Update this answer" : "Keep this answer"}
        </button>
        {!kept && (
          <button type="button" className={quietBtn} onClick={() => keep("")}>
            Leave this blank
          </button>
        )}
      </div>
      {kept && <p className="text-sm text-muted">Saved for the sheet at the end. You can still edit it.</p>}
    </div>
  );
}

function FeedbackLine({ ok, text, children }: { ok: boolean; text: string; children?: React.ReactNode }) {
  return (
    <div role="status" className={`grid gap-3 rounded-[20px] px-4 py-4 ${ok ? "bg-soft text-grove-deep" : "bg-surface text-miss ring-1 ring-miss/40"}`}>
      <p className="font-semibold">{ok ? "Nice." : "Not quite."}</p>
      <p className="leading-relaxed text-ink">{text}</p>
      {children}
    </div>
  );
}

function mixSteps(steps: string[], seed: number) {
  const mixed = shuffle(steps, seed);
  if (mixed.every((step, index) => step === steps[index])) {
    return [...mixed.slice(1), mixed[0]!];
  }
  return mixed;
}
