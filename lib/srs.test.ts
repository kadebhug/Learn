import assert from "node:assert/strict";
import { sampleTopics } from "./catalog";
import { parseTopic } from "./schema";
import { freshCard, schedule } from "./srs";
import { nextStreak } from "./text";

for (const topic of sampleTopics) {
  const parsed = parseTopic(topic);
  assert.equal(parsed.modules.length > 0, true);
  for (const mod of parsed.modules) {
    for (const lesson of mod.lessons) {
      assert.ok(lesson.blocks.some((block) => block.type === "activity"));
    }
  }
}

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
