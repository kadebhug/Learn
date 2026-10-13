"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cardId, flatLessons, progressKey, sampleTopics } from "./catalog";
import { freshCard, reviewXp, schedule } from "./srs";
import type { BadgeId, CardState, Grade, LessonStat, StudySession, ThemeChoice, Topic } from "./types";
import { answerXp, CHALLENGE_XP, LESSON_CLEAR_XP, levelFor, SPRINT_XP } from "./xp";
import { nextStreak, todayKey } from "./text";

/**
 * All progress lives in localStorage under grove-progress.
 * Sample courses are not stored here. They ship with the app.
 * Custom, starter, and generated courses are stored on customTopics.
 */

type Award = { xpGained: number; leveledUp: boolean; badges: BadgeId[] };

type GroveState = {
  name: string;
  theme: ThemeChoice;
  xp: number;
  lastActiveDate: string | null;
  streak: number;
  longestStreak: number;
  correctStreak: number;
  lessons: Record<string, LessonStat>;
  cards: Record<string, CardState>;
  badges: BadgeId[];
  sessions: StudySession[];
  customTopics: Topic[];
  challengeDate: string | null;
  sprintDate: string | null;
  activeTopicSlug: string | null;
  reviewCount: number;
  setName: (name: string) => void;
  setTheme: (theme: ThemeChoice) => void;
  setActiveTopic: (slug: string) => void;
  recordAnswer: (input: {
    topicSlug: string;
    lessonId: string;
    activityId: string;
    correct: boolean;
    firstTry: boolean;
    kind?: "teach" | "map" | "other";
  }) => Award;
  completeLesson: (topicSlug: string, lessonId: string) => Award;
  gradeCard: (id: string, grade: Grade) => Award;
  saveTopic: (topic: Topic) => void;
  removeTopic: (slug: string) => void;
  markChallenge: () => Award;
  markSprint: () => Award;
  upsertSession: (session: StudySession) => void;
  resetProgress: () => void;
};

const empty = {
  name: "Friend",
  theme: "system" as ThemeChoice,
  xp: 0,
  lastActiveDate: null as string | null,
  streak: 0,
  longestStreak: 0,
  correctStreak: 0,
  lessons: {} as Record<string, LessonStat>,
  cards: {} as Record<string, CardState>,
  badges: [] as BadgeId[],
  sessions: [] as StudySession[],
  customTopics: [] as Topic[],
  challengeDate: null as string | null,
  sprintDate: null as string | null,
  activeTopicSlug: null as string | null,
  reviewCount: 0,
};

export const useGrove = create<GroveState>()(
  persist(
    (set, get) => ({
      ...empty,

      setName: (name) => set({ name: name.trim().slice(0, 32) || "Friend" }),
      setTheme: (theme) => set({ theme }),
      setActiveTopic: (slug) => set({ activeTopicSlug: slug }),

      recordAnswer: ({ topicSlug, lessonId, activityId, correct, firstTry, kind = "other" }) => {
        const state = get();
        const xpGained = answerXp(correct, firstTry);
        const key = progressKey(topicSlug, lessonId);
        const prev = state.lessons[key] ?? { completed: false, correct: 0, attempts: 0 };
        const lessons = {
          ...state.lessons,
          [key]: {
            completed: prev.completed,
            correct: prev.correct + (correct ? 1 : 0),
            attempts: prev.attempts + 1,
          },
        };
        const id = cardId(topicSlug, lessonId, activityId);
        const cards = { ...state.cards };
        if (!cards[id]) {
          cards[id] = freshCard({ id, topicSlug, lessonId, activityId });
        }
        if (!correct) {
          cards[id] = schedule(cards[id], "again");
        }
        const correctStreak = correct ? state.correctStreak + 1 : 0;
        const streakPatch = touch(state);
        const badges = collectBadges(state.badges, {
          correctStreak,
          streak: streakPatch.streak,
          kind: correct && kind === "teach" ? "teach" : correct && kind === "map" ? "map" : null,
        });
        const xp = state.xp + xpGained;
        set({
          lessons,
          cards,
          correctStreak,
          xp,
          badges: mergeBadges(state.badges, badges),
          ...streakPatch,
        });
        return { xpGained, leveledUp: levelFor(xp) > levelFor(state.xp), badges };
      },

      completeLesson: (topicSlug, lessonId) => {
        const state = get();
        const key = progressKey(topicSlug, lessonId);
        const prev = state.lessons[key] ?? { completed: false, correct: 0, attempts: 0 };
        const already = prev.completed;
        const lessons = { ...state.lessons, [key]: { ...prev, completed: true } };
        const xpGained = already ? 0 : LESSON_CLEAR_XP;
        const xp = state.xp + xpGained;
        const streakPatch = touch(state);
        const badges = collectBadges(state.badges, {
          correctStreak: state.correctStreak,
          streak: streakPatch.streak,
          kind: null,
          finishedFirst: !already,
          mastered: !already && topicMastered(topicSlug, lessons, state.customTopics),
        });
        set({
          lessons,
          xp,
          badges: mergeBadges(state.badges, badges),
          activeTopicSlug: topicSlug,
          ...streakPatch,
        });
        return { xpGained, leveledUp: levelFor(xp) > levelFor(state.xp), badges };
      },

      gradeCard: (id, grade) => {
        const state = get();
        const card = state.cards[id];
        if (!card) return { xpGained: 0, leveledUp: false, badges: [] };
        const cards = { ...state.cards, [id]: schedule(card, grade) };
        const xpGained = reviewXp(grade);
        const xp = state.xp + xpGained;
        const reviewCount = state.reviewCount + 1;
        const streakPatch = touch(state);
        const badges = collectBadges(state.badges, {
          correctStreak: state.correctStreak,
          streak: streakPatch.streak,
          kind: null,
          reviewCount,
        });
        set({
          cards,
          xp,
          reviewCount,
          badges: mergeBadges(state.badges, badges),
          ...streakPatch,
        });
        return { xpGained, leveledUp: levelFor(xp) > levelFor(state.xp), badges };
      },

      saveTopic: (topic) => {
        const others = get().customTopics.filter((item) => item.slug !== topic.slug);
        set({ customTopics: [...others, topic], activeTopicSlug: topic.slug });
      },

      removeTopic: (slug) => {
        const state = get();
        const lessons = Object.fromEntries(Object.entries(state.lessons).filter(([key]) => !key.startsWith(`${slug}:`)));
        const cards = Object.fromEntries(Object.entries(state.cards).filter(([, card]) => card.topicSlug !== slug));
        set({
          customTopics: state.customTopics.filter((topic) => topic.slug !== slug),
          lessons,
          cards,
          activeTopicSlug: state.activeTopicSlug === slug ? null : state.activeTopicSlug,
        });
      },

      markChallenge: () => {
        const state = get();
        const today = todayKey();
        if (state.challengeDate === today) return { xpGained: 0, leveledUp: false, badges: [] };
        const xp = state.xp + CHALLENGE_XP;
        const streakPatch = touch(state);
        const badges = collectBadges(state.badges, {
          correctStreak: state.correctStreak,
          streak: streakPatch.streak,
          kind: null,
          challenge: true,
        });
        set({
          challengeDate: today,
          xp,
          badges: mergeBadges(state.badges, badges),
          ...streakPatch,
        });
        return { xpGained: CHALLENGE_XP, leveledUp: levelFor(xp) > levelFor(state.xp), badges };
      },

      markSprint: () => {
        const state = get();
        const today = todayKey();
        if (state.sprintDate === today) return { xpGained: 0, leveledUp: false, badges: [] };
        const xp = state.xp + SPRINT_XP;
        set({ sprintDate: today, xp, ...touch(state) });
        return { xpGained: SPRINT_XP, leveledUp: levelFor(xp) > levelFor(state.xp), badges: [] };
      },

      upsertSession: (session) => {
        const sessions = get().sessions.filter((item) => item.id !== session.id);
        set({ sessions: [session, ...sessions].slice(0, 40) });
      },

      resetProgress: () => set({ ...empty, name: get().name, theme: get().theme }),
    }),
    {
      name: "grove-progress",
      version: 1,
    },
  ),
);

function touch(state: GroveState) {
  const streak = state.lastActiveDate ? nextStreak(state.lastActiveDate, state.streak) : 1;
  const today = todayKey();
  if (state.lastActiveDate === today) {
    return { streak: state.streak, longestStreak: state.longestStreak, lastActiveDate: today };
  }
  return {
    streak,
    longestStreak: Math.max(state.longestStreak, streak),
    lastActiveDate: today,
  };
}

function mergeBadges(have: BadgeId[], earned: BadgeId[]) {
  const next = new Set(have);
  for (const badge of earned) next.add(badge);
  return [...next];
}

function collectBadges(
  have: BadgeId[],
  input: {
    correctStreak: number;
    streak: number;
    kind: "teach" | "map" | null;
    finishedFirst?: boolean;
    mastered?: boolean;
    reviewCount?: number;
    challenge?: boolean;
  },
): BadgeId[] {
  const earned: BadgeId[] = [];
  const grant = (id: BadgeId) => {
    if (!have.includes(id) && !earned.includes(id)) earned.push(id);
  };
  if (input.finishedFirst) grant("first-lesson");
  if (input.correctStreak >= 10) grant("quiz-ace");
  if (input.mastered) grant("topic-master");
  if (input.kind === "teach") grant("teach-back");
  if (input.kind === "map") grant("map-maker");
  if ((input.reviewCount ?? 0) >= 5) grant("reviewer");
  if (input.streak >= 3) grant("streak-3");
  if (input.streak >= 7) grant("streak-7");
  if (input.challenge) grant("challenge");
  return earned;
}

function topicMastered(slug: string, lessons: Record<string, LessonStat>, custom: Topic[]) {
  const topic = [...sampleTopics, ...custom].find((item) => item.slug === slug);
  if (!topic) return false;
  return flatLessons(topic).every((item) => lessons[progressKey(slug, item.lesson.id)]?.completed);
}
