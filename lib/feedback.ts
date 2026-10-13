import type { Feedback } from "./schema";
import { norm } from "./text";

/**
 * Local stand-in for the model. It checks whether the learner's words
 * overlap the lesson's key points. It says so, and does not pretend to be a tutor.
 */
export function localFeedback(answer: string, keyPoints: string[]): Feedback {
  const text = norm(answer);
  const words = text.split(" ").filter((word) => word.length > 3);
  if (words.length < 4) {
    return {
      score: 0,
      note: "Give it a few more sentences. A friend should be able to picture the idea.",
      missing: keyPoints,
    };
  }

  const hits = keyPoints.filter((point) => pointHits(text, point));
  const missing = keyPoints.filter((point) => !hits.includes(point));
  const ratio = hits.length / keyPoints.length;
  const score = ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : ratio >= 0.25 ? 1 : 0;

  const note =
    score >= 2
      ? "That would land with a friend. The core of it is there."
      : score === 1
        ? "You have a piece of it. One more concrete detail would help."
        : "The shape is still fuzzy. Use one of the ideas below and try once more.";

  return { score, note: `${note} Checked against the lesson notes.`, missing };
}

function pointHits(text: string, point: string) {
  const tokens = norm(point)
    .split(" ")
    .filter((word) => word.length > 3);
  if (tokens.length === 0) return text.includes(norm(point));
  const found = tokens.filter((token) => text.includes(token));
  return found.length >= Math.min(2, tokens.length) && found.length / tokens.length >= 0.4;
}
