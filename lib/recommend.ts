import { flatLessons, nextDifficulty, progressKey } from "./catalog";
import { lessonHref } from "./hrefs";
import type { LessonStat, Topic } from "./types";

export type Recommendation = {
  text: string;
  href: string;
  label: string;
};

/**
 * One suggestion. Weak modules win, then a nudge to the next difficulty,
 * then a quiet prompt to review. Null when there is nothing honest to say.
 */
export function recommendation(
  topics: Topic[],
  lessons: Record<string, LessonStat>,
  dueCount: number,
): Recommendation | null {
  let weakest: { topic: Topic; title: string; accuracy: number; href: string } | null = null;

  for (const topic of topics) {
    for (const mod of topic.modules) {
      let correct = 0;
      let attempts = 0;
      for (const lesson of mod.lessons) {
        const stat = lessons[progressKey(topic.slug, lesson.id)];
        if (!stat) continue;
        correct += stat.correct;
        attempts += stat.attempts;
      }
      if (attempts < 2) continue;
      const accuracy = correct / attempts;
      if (accuracy >= 0.7) continue;
      if (!weakest || accuracy < weakest.accuracy) {
        weakest = {
          topic,
          title: mod.title,
          accuracy,
          href: lessonHref(topic, mod.lessons[0]!.id),
        };
      }
    }
  }

  if (weakest) {
    return {
      text: `Review ${weakest.title}. That part of ${weakest.topic.title} is still shaky.`,
      href: weakest.href,
      label: "Review this module",
    };
  }

  for (const topic of topics) {
    const lessonsInTopic = flatLessons(topic);
    const done = lessonsInTopic.every((item) => lessons[progressKey(topic.slug, item.lesson.id)]?.completed);
    if (!done) continue;
    let correct = 0;
    let attempts = 0;
    for (const item of lessonsInTopic) {
      const stat = lessons[progressKey(topic.slug, item.lesson.id)];
      if (!stat) continue;
      correct += stat.correct;
      attempts += stat.attempts;
    }
    const accuracy = attempts === 0 ? 0 : correct / attempts;
    const harder = nextDifficulty(topic.difficulty);
    if (harder && accuracy >= 0.8) {
      if (topic.slug === "psychology-fundamentals") {
        return {
          text: "You're ready for Psychology in Practice.",
          href: "/paths/psychology-in-practice",
          label: "Start the next path",
        };
      }
      return {
        text: `You're ready for the next level of ${topic.title}.`,
        href: `/paths/new?topic=${encodeURIComponent(topic.title)}&difficulty=${harder}`,
        label: "Build the next level",
      };
    }
  }

  if (dueCount > 0) {
    return {
      text: dueCount === 1 ? "One card is due for review." : `${dueCount} cards are due for review.`,
      href: "/review",
      label: "Review",
    };
  }

  return null;
}
