import type { Difficulty, Topic } from "./types";
import { nid, slugify, stripDashes } from "./text";

/** A playable outline when no model is available. Labeled as a starter, never as AI. */
export function makeStarter(title: string, difficulty: Difficulty, notes: string, taken: string[]): Topic {
  const cleanTitle = stripDashes(title.trim()) || "Untitled topic";
  const noteLine = notes.trim()
    ? ` You mentioned: ${stripDashes(notes.trim()).slice(0, 180)}`
    : "";
  const slug = uniqueSlug(slugify(cleanTitle), taken);

  const idea = lesson(`${slug}-idea`, "The idea in one sitting", cleanTitle, difficulty, noteLine);
  const pieces = lesson(`${slug}-pieces`, "Name the pieces", cleanTitle, difficulty, noteLine);
  const teach = teachLesson(`${slug}-teach`, cleanTitle);

  return {
    slug,
    title: cleanTitle,
    blurb: `Starter outline for ${cleanTitle}. Edit the lessons, or add an API key and generate a fuller course.`,
    difficulty,
    minutes: 12,
    source: "starter",
    modules: [
      {
        id: `${slug}-m1`,
        title: "The lay of the land",
        summary: `A first pass at ${cleanTitle}, short enough to finish.`,
        lessons: [idea],
      },
      {
        id: `${slug}-m2`,
        title: "The moving parts",
        summary: "Separate the pieces before you try to use them.",
        lessons: [pieces],
      },
      {
        id: `${slug}-m3`,
        title: "Say it back",
        summary: "If you can explain it, you are starting to own it.",
        lessons: [teach],
      },
    ],
  };
}

function uniqueSlug(base: string, taken: string[]) {
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

function lesson(id: string, title: string, topic: string, difficulty: Difficulty, noteLine: string) {
  const pace =
    difficulty === "beginner"
      ? "Start with one definition and one example."
      : difficulty === "intermediate"
        ? "Assume the basics and look for the tradeoff."
        : "Skip the tour. Name the hard part and one way people get it wrong.";

  return {
    id,
    title,
    minutes: 4,
    summary: `A starter lesson on ${topic}.`,
    blocks: [
      {
        id: `${id}-ex`,
        type: "explain" as const,
        heading: title,
        body: `${pace} This page is a starter, not a generated course. Replace this paragraph with the real explanation of ${topic}.${noteLine}`,
        example: `A concrete case of ${topic} belongs here: who is involved, what they do, and what changes.`,
        analogy: `Compare ${topic} to something the learner already does on an ordinary day.`,
      },
      {
        id: `${id}-act`,
        type: "activity" as const,
        activity: {
          id: `${id}-choice`,
          type: "choice" as const,
          prompt: `Which first session on ${topic} is worth your time?`,
          options: [
            "One clear idea, one example, and a question",
            "A long lecture with no check",
            "Memorizing names before you know what they do",
            "Skipping the example",
          ],
          answerIndex: 0,
          explain: "Short, checked, and tied to an example. That is the shape of a Grove lesson. Edit this question so it tests the real idea.",
        },
      },
    ],
  };
}

function teachLesson(id: string, topic: string) {
  return {
    id,
    title: "Teach it back",
    minutes: 4,
    summary: `Explain ${topic} without the notes in front of you.`,
    blocks: [
      {
        id: `${id}-ex`,
        type: "explain" as const,
        heading: "Close the notes",
        body: `Write as if a friend asked what ${topic} is and why anyone bothers. Use your own example. If this starter still has placeholder text, say what you already know and what you need to look up.`,
      },
      {
        id: `${id}-act`,
        type: "activity" as const,
        activity: {
          id: nid(`${id}-teach`),
          type: "teach" as const,
          prompt: `Explain ${topic} in a short paragraph a friend could repeat.`,
          keyPoints: [topic.toLowerCase(), "example", "why it matters"],
        },
      },
    ],
  };
}
