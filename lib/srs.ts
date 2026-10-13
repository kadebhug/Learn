import type { CardState, Grade } from "./types";

/**
 * Spaced repetition, SM-2 trimmed to four buttons.
 *
 * Again: show it again now, and make the next gap harder to earn.
 * Hard: about a day, ease slips a little.
 * Good: 1 day, then 3, then interval * ease.
 * Easy: the Good gap, stretched by 1.3, ease rises.
 *
 * The first time a card is created (during a lesson) it is due immediately,
 * so Review has something to do. The schedule below starts at the first grade.
 */

const DAY = 24 * 60 * 60 * 1000;

export function freshCard(input: {
  id: string;
  topicSlug: string;
  lessonId: string;
  activityId: string;
  now?: number;
}): CardState {
  return {
    ...input,
    ease: 2.5,
    interval: 0,
    reps: 0,
    lapses: 0,
    due: input.now ?? Date.now(),
  };
}

export function schedule(card: CardState, grade: Grade, now = Date.now()): CardState {
  const { ease, interval, reps, lapses } = card;

  if (grade === "again") {
    return {
      ...card,
      ease: Math.max(1.3, round2(ease - 0.2)),
      interval: 0,
      reps: 0,
      lapses: lapses + 1,
      due: now,
      lastGrade: grade,
    };
  }

  if (grade === "hard") {
    const next = interval < 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
    return {
      ...card,
      ease: Math.max(1.3, round2(ease - 0.15)),
      interval: next,
      reps: reps + 1,
      due: now + next * DAY,
      lastGrade: grade,
    };
  }

  let nextInterval: number;
  if (reps <= 0) nextInterval = 1;
  else if (reps === 1) nextInterval = 3;
  else nextInterval = Math.max(1, Math.round((interval || 1) * ease));

  const nextEase = grade === "easy" ? round2(ease + 0.15) : ease;
  if (grade === "easy") {
    nextInterval = Math.max(nextInterval + 1, Math.round(nextInterval * 1.3));
  }

  return {
    ...card,
    ease: nextEase,
    interval: nextInterval,
    reps: reps + 1,
    due: now + nextInterval * DAY,
    lastGrade: grade,
  };
}

export function isDue(card: CardState, now = Date.now()) {
  return card.due <= now;
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function reviewXp(grade: Grade) {
  if (grade === "good" || grade === "easy") return 8;
  if (grade === "hard") return 4;
  return 0;
}
