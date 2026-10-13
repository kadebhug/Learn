import { z } from "zod";
import type { Activity, Block, Lesson, Module, Topic, TopicSource } from "./types";

const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

const choiceSchema = z.object({
  id: z.string().min(1),
  type: z.literal("choice"),
  prompt: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(4),
  answerIndex: z.number().int().nonnegative(),
  explain: z.string().min(1),
});

const blankSchema = z.object({
  id: z.string().min(1),
  type: z.literal("blank"),
  prompt: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1),
  explain: z.string().min(1),
});

const matchSchema = z.object({
  id: z.string().min(1),
  type: z.literal("match"),
  prompt: z.string().min(1),
  pairs: z.array(z.object({ left: z.string().min(1), right: z.string().min(1) })).min(2).max(6),
  explain: z.string().min(1),
});

const shortSchema = z.object({
  id: z.string().min(1),
  type: z.literal("short"),
  prompt: z.string().min(1),
  rubric: z.array(z.string().min(1)).min(1),
  sample: z.string().min(1),
});

const mapSchema = z.object({
  id: z.string().min(1),
  type: z.literal("map"),
  prompt: z.string().min(1),
  steps: z.array(z.string().min(1)).min(3).max(6),
  explain: z.string().min(1),
});

const scenarioSchema = z.object({
  id: z.string().min(1),
  type: z.literal("scenario"),
  setup: z.string().min(1),
  prompt: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(4),
  answerIndex: z.number().int().nonnegative(),
  explain: z.string().min(1),
});

const teachSchema = z.object({
  id: z.string().min(1),
  type: z.literal("teach"),
  prompt: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
});

const activitySchema = z.discriminatedUnion("type", [
  choiceSchema,
  blankSchema,
  matchSchema,
  shortSchema,
  mapSchema,
  scenarioSchema,
  teachSchema,
]);

const blockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().min(1),
    type: z.literal("explain"),
    heading: z.string().min(1),
    body: z.string().min(1),
    example: z.string().optional(),
    analogy: z.string().optional(),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("activity"),
    activity: activitySchema,
  }),
]);

export const topicSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  difficulty: difficultySchema,
  minutes: z.number().int().positive(),
  source: z.enum(["sample", "generated", "starter", "custom"]),
  modules: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      summary: z.string().min(1),
      lessons: z.array(
        z.object({
          id: z.string().min(1),
          title: z.string().min(1),
          minutes: z.number().int().positive(),
          summary: z.string().min(1),
          blocks: z.array(blockSchema).min(1),
        }),
      ).min(1),
    }),
  ).min(1),
});

export function parseTopic(input: unknown, sourceOverride?: TopicSource): Topic {
  const topic = topicSchema.parse(input) as Topic;
  for (const mod of topic.modules) {
    for (const lesson of mod.lessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "activity") continue;
        assertActivity(block.activity);
      }
    }
  }
  if (sourceOverride) topic.source = sourceOverride;
  topic.minutes = topic.modules.reduce(
    (sum, mod) => sum + mod.lessons.reduce((inner, lesson) => inner + lesson.minutes, 0),
    0,
  );
  return topic;
}

function assertActivity(activity: Activity) {
  if ((activity.type === "choice" || activity.type === "scenario") && activity.answerIndex >= activity.options.length) {
    throw new Error("Answer index is outside the options.");
  }
}

/**
 * Shape we ask Grok for. Every field is always present so the model
 * does not have to pick among nested unions. The mapper drops empties.
 */
export const generatedCourseSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  modules: z.array(
    z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      lessons: z.array(
        z.object({
          title: z.string().min(1),
          minutes: z.number().int().min(2).max(12),
          summary: z.string().min(1),
          heading: z.string().min(1),
          body: z.string().min(1),
          example: z.string(),
          analogy: z.string(),
          checkType: z.enum(["choice", "blank", "match", "short", "map", "scenario", "teach"]),
          prompt: z.string().min(1),
          setup: z.string(),
          options: z.array(z.string()),
          answerIndex: z.number().int().nonnegative(),
          answers: z.array(z.string()),
          pairs: z.array(z.object({ left: z.string(), right: z.string() })),
          steps: z.array(z.string()),
          explain: z.string(),
          rubric: z.array(z.string()),
          sample: z.string(),
          keyPoints: z.array(z.string()),
        }),
      ).min(1).max(3),
    }),
  ).min(1).max(4),
});

export type GeneratedCourse = z.infer<typeof generatedCourseSchema>;

export const feedbackSchema = z.object({
  score: z.number().int().min(0).max(3),
  note: z.string().min(1),
  missing: z.array(z.string()),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export function blocksOf(lesson: Lesson): Block[] {
  return lesson.blocks;
}

export function modulesOf(topic: Topic): Module[] {
  return topic.modules;
}
