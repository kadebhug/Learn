import type { Activity, Lesson, Module, Topic } from "./types";
import { machineLearning } from "./sample/ml";
import { spanishSentences } from "./sample/spanish";

export const sampleTopics: Topic[] = [machineLearning, spanishSentences];

export function allTopics(custom: Topic[]): Topic[] {
  const seen = new Set(sampleTopics.map((topic) => topic.slug));
  const extra = custom.filter((topic) => {
    if (seen.has(topic.slug)) return false;
    seen.add(topic.slug);
    return true;
  });
  return [...sampleTopics, ...extra];
}

export function findTopic(topics: Topic[], slug: string) {
  return topics.find((topic) => topic.slug === slug) ?? null;
}

export function flatLessons(topic: Topic): { module: Module; lesson: Lesson }[] {
  return topic.modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
}

export function findLesson(topic: Topic, lessonId: string) {
  for (const mod of topic.modules) {
    const lesson = mod.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return null;
}

export function nextLesson(topic: Topic, completed: (lessonId: string) => boolean) {
  const lessons = flatLessons(topic);
  return lessons.find((item) => !completed(item.lesson.id)) ?? null;
}

export function lessonActivities(lesson: Lesson): Activity[] {
  return lesson.blocks.flatMap((block) => (block.type === "activity" ? [block.activity] : []));
}

export function topicActivities(topic: Topic): { lesson: Lesson; activity: Activity }[] {
  return flatLessons(topic).flatMap(({ lesson }) =>
    lessonActivities(lesson).map((activity) => ({ lesson, activity })),
  );
}

export function progressKey(topicSlug: string, lessonId: string) {
  return `${topicSlug}:${lessonId}`;
}

export function cardId(topicSlug: string, lessonId: string, activityId: string) {
  return `${topicSlug}:${lessonId}:${activityId}`;
}

export function difficultyLabel(value: Topic["difficulty"]) {
  if (value === "beginner") return "Beginner";
  if (value === "intermediate") return "Intermediate";
  return "Advanced";
}

export function nextDifficulty(value: Topic["difficulty"]): Topic["difficulty"] | null {
  if (value === "beginner") return "intermediate";
  if (value === "intermediate") return "advanced";
  return null;
}
