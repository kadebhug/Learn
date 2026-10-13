import assert from "node:assert/strict";
import { sampleTopics } from "./catalog";
import { parseTopic } from "./schema";
import { freshCard, schedule } from "./srs";
import { nextStreak } from "./text";
import type { Activity } from "./types";

const ids = new Set<string>();

function claim(id: string) {
  assert.equal(ids.has(id), false, `duplicate id ${id}`);
  ids.add(id);
}

function assertActivity(activity: Activity) {
  if (activity.type === "choice" || activity.type === "scenario") {
    assert.ok(activity.answerIndex >= 0 && activity.answerIndex < activity.options.length, activity.id);
    assert.equal(new Set(activity.options).size, activity.options.length, activity.id);
  }
  if (activity.type === "match") {
    assert.ok(activity.pairs.length >= 2 && activity.pairs.length <= 6, activity.id);
    assert.equal(new Set(activity.pairs.map((pair) => pair.left)).size, activity.pairs.length, activity.id);
    assert.equal(new Set(activity.pairs.map((pair) => pair.right)).size, activity.pairs.length, activity.id);
  }
  if (activity.type === "map") {
    assert.ok(activity.steps.length >= 3 && activity.steps.length <= 6, activity.id);
    assert.equal(new Set(activity.steps).size, activity.steps.length, activity.id);
  }
  if (activity.type === "short" || activity.type === "teach") {
    const points = activity.type === "short" ? activity.rubric : activity.keyPoints;
    for (const point of points) {
      const tokens = point.toLowerCase().split(/\s+/).filter((word) => word.length > 3);
      assert.ok(tokens.length > 0, `${activity.id} point "${point}" has no checkable word`);
    }
  }
}

for (const topic of sampleTopics) {
  const parsed = parseTopic(topic);
  assert.equal(parsed.slug, topic.slug);
  claim(topic.slug);
  const minutes = topic.modules.reduce(
    (sum, mod) => sum + mod.lessons.reduce((inner, lesson) => inner + lesson.minutes, 0),
    0,
  );
  assert.equal(parsed.minutes, minutes);
  for (const mod of parsed.modules) {
    claim(`${topic.slug}:${mod.id}`);
    assert.ok(mod.lessons.length > 0);
    for (const lesson of mod.lessons) {
      claim(`${topic.slug}:${lesson.id}`);
      assert.equal(lesson.blocks[0]?.type, "explain", lesson.id);
      assert.ok(lesson.blocks.some((block) => block.type === "activity"), lesson.id);
      for (const block of lesson.blocks) {
        claim(`${topic.slug}:${block.id}`);
        if (block.type !== "activity") continue;
        claim(`${topic.slug}:${block.activity.id}`);
        assertActivity(block.activity);
      }
    }
  }
}

const psychology = sampleTopics.find((topic) => topic.slug === "psychology-fundamentals");
const critical = sampleTopics.find((topic) => topic.slug === "critical-thinking");
assert.ok(psychology);
assert.ok(critical);
assert.equal(psychology.modules.length, 8);
assert.equal(critical.modules.length, 8);
assert.equal(
  psychology.modules.reduce((count, mod) => count + mod.lessons.length, 0),
  16,
);
assert.equal(
  critical.modules.reduce((count, mod) => count + mod.lessons.length, 0),
  16,
);
assert.match(psychology.blurb, /not a diagnosis/i);
assert.match(psychology.modules.find((mod) => mod.id === "psych-a7")?.summary ?? "", /not therapy/i);

const practice = sampleTopics.find((topic) => topic.slug === "psychology-in-practice");
assert.ok(practice);
assert.equal(practice.difficulty, "intermediate");
assert.equal(practice.minutes, 90);
assert.equal(practice.modules.length, 8);
assert.equal(
  practice.modules.reduce((count, mod) => count + mod.lessons.length, 0),
  16,
);
assert.match(practice.blurb, /not a diagnosis/i);
assert.match(practice.modules.find((mod) => mod.id === "psych-i5")?.summary ?? "", /not therapy/i);
const practiceText = JSON.stringify(practice);
assert.equal(practiceText.includes("\u2014"), false, "em dash");
assert.equal(practiceText.includes("\u2013"), false, "en dash");

const now = Date.UTC(2026, 3, 2);
const card = freshCard({
  id: "t:l:a",
  topicSlug: "t",
  lessonId: "l",
  activityId: "a",
  now,
});

const again = schedule(card, "again", now);
assert.equal(again.due, now);
assert.equal(again.reps, 0);
assert.equal(again.lapses, 1);

const good = schedule(card, "good", now);
assert.equal(good.interval, 1);
assert.equal(good.reps, 1);
assert.equal(good.due, now + 24 * 60 * 60 * 1000);

const second = schedule(good, "good", good.due);
assert.equal(second.interval, 3);

const easy = schedule(card, "easy", now);
assert.ok(easy.interval >= 2);
assert.ok(easy.ease > card.ease);

assert.equal(nextStreak(null, 0, new Date(2026, 3, 2)), 1);
assert.equal(nextStreak("2026-04-02", 1, new Date(2026, 3, 2)), 1);
assert.equal(nextStreak("2026-04-01", 1, new Date(2026, 3, 2)), 2);
assert.equal(nextStreak("2026-03-01", 4, new Date(2026, 3, 2)), 1);

console.log("srs ok");
