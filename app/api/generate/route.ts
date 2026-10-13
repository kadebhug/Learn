import { NextResponse } from "next/server";
import { z } from "zod";
import { mapGeneratedCourse } from "@/lib/map-course";
import { generatedCourseSchema, parseTopic } from "@/lib/schema";
import { courseResponseSchema, grokJson } from "@/lib/xai";

export const maxDuration = 60;

const requestSchema = z.object({
  title: z.string().min(2).max(120),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  notes: z.string().max(600).optional(),
  taken: z.array(z.string()).max(40).optional(),
});

const system = `You write a short Grove course: 3 modules, 2 lessons each.
Each lesson teaches one idea in plain language, with an example and an analogy, then one check.
Across the six lessons use these checkType values in this order: choice, blank, match, scenario, map, teach.
Rules:
- Accurate. Say so if a field is uncertain rather than inventing a precise number.
- Friendly, concrete, short. A lesson body is 2 to 4 sentences.
- No em dash and no en dash characters. Use periods, commas, or hyphens.
- choice: 4 options, one correct answerIndex.
- blank: the prompt contains ____ and answers lists the accepted words.
- match: 4 pairs.
- scenario: setup is a situation, options are responses, answerIndex picks the careful one.
- map: steps are the correct order, 4 items.
- teach: keyPoints are 4 phrases a good explanation must touch.
- Fill every field. Use an empty string or empty array when the check type does not need it.
- Do not mention being a model.`;

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { title, difficulty, notes, taken } = parsed.data;
  const result = await grokJson(
    system,
    `Topic: ${title}\nDifficulty: ${difficulty}\nNotes: ${notes?.trim() || "none"}`,
    courseResponseSchema,
    "grove_course",
  );

  if ("error" in result) {
    const status = result.error === "no_key" ? 503 : 502;
    return NextResponse.json({ error: result.error }, { status });
  }

  const course = generatedCourseSchema.safeParse(result.json);
  if (!course.success) {
    return NextResponse.json({ error: "invalid_course" }, { status: 422 });
  }

  try {
    const topic = parseTopic(mapGeneratedCourse(course.data, difficulty, taken ?? []), "generated");
    return NextResponse.json({ topic });
  } catch {
    return NextResponse.json({ error: "invalid_course" }, { status: 422 });
  }
}
