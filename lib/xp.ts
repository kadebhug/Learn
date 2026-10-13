import type { BadgeId } from "./types";

/** A level is a flat 120 XP. Predictable, easy to explain. */
export const XP_PER_LEVEL = 120;

export function levelFor(xp: number) {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;
}

export function levelProgress(xp: number) {
  return (Math.max(0, xp) % XP_PER_LEVEL) / XP_PER_LEVEL;
}

export function answerXp(correct: boolean, firstTry: boolean) {
  if (!correct) return 0;
  return firstTry ? 10 : 4;
}

export const LESSON_CLEAR_XP = 25;
export const CHALLENGE_XP = 40;
export const SPRINT_XP = 20;

export const BADGES: { id: BadgeId; title: string; detail: string }[] = [
  { id: "first-lesson", title: "First path", detail: "Finish a lesson." },
  { id: "quiz-ace", title: "Quiz ace", detail: "Ten correct answers in a row." },
  { id: "topic-master", title: "Topic master", detail: "Finish every lesson in a course." },
  { id: "teach-back", title: "Taught it back", detail: "Explain a concept in your own words." },
  { id: "map-maker", title: "Map maker", detail: "Put a concept map in the right order." },
  { id: "reviewer", title: "Came back", detail: "Review five cards." },
  { id: "streak-3", title: "3-day streak", detail: "Study three days in a row." },
  { id: "streak-7", title: "7-day streak", detail: "Study seven days in a row." },
  { id: "challenge", title: "Daily done", detail: "Finish a daily challenge." },
];
