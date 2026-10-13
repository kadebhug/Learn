import { NextResponse } from "next/server";
import { z } from "zod";
import { localFeedback } from "@/lib/feedback";
import { feedbackSchema } from "@/lib/schema";
import { feedbackResponseSchema, grokJson } from "@/lib/xai";

export const maxDuration = 30;

const requestSchema = z.object({
  prompt: z.string().min(1).max(800),
  answer: z.string().min(1).max(4000),
  keyPoints: z.array(z.string().min(1)).min(1).max(8),
});

const system = `You grade a learner who is explaining a concept back.
Return a score from 0 to 3, a short encouraging note, and the key points they missed.
0 is too thin to follow. 1 has a piece. 2 would land with a friend. 3 is clear and concrete.
Do not use em dash or en dash characters. Do not invent facts that contradict the key points.`;

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { prompt, answer, keyPoints } = parsed.data;
  const fallback = localFeedback(answer, keyPoints);
  const result = await grokJson(
    system,
    `Question: ${prompt}\nKey points: ${keyPoints.join(" | ")}\nLearner:\n${answer}`,
    feedbackResponseSchema,
    "grove_feedback",
  );

  if ("error" in result) {
    if (result.error === "no_key") {
      return NextResponse.json({ error: "no_key", feedback: fallback }, { status: 200 });
    }
    return NextResponse.json({ error: result.error, feedback: fallback }, { status: 200 });
  }

  const raw = result.json;
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ feedback: fallback, error: "fallback" });
  }
  const feedback = feedbackSchema.safeParse({
    ...raw,
    score: clampScore("score" in raw ? (raw as { score?: number }).score : undefined),
  });
  if (!feedback.success) {
    return NextResponse.json({ feedback: fallback, error: "fallback" });
  }
  return NextResponse.json({ feedback: feedback.data });
}

function clampScore(score: number | undefined) {
  if (typeof score !== "number" || Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(3, Math.round(score)));
}
