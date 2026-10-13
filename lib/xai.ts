import "server-only";

/**
 * Server-only call to Grok. The key stays in XAI_API_KEY and never reaches the browser.
 * Model id is the current flagship from https://docs.x.ai (grok-4.7).
 */

const MODEL = "grok-4.7";

export type GrokResult = { json: unknown } | { error: "no_key" } | { error: "upstream"; detail: string };

export async function grokJson(system: string, user: string, schema: object, name: string): Promise<GrokResult> {
  const key = process.env.XAI_API_KEY;
  if (!key) return { error: "no_key" };

  const strict = await complete(key, system, user, {
    type: "json_schema",
    json_schema: { name, strict: true, schema },
  });
  if (strict.ok) return strict;

  const loose = await complete(key, system, user, { type: "json_object" });
  return loose.ok ? loose : { error: "upstream", detail: loose.detail };
}

async function complete(
  key: string,
  system: string,
  user: string,
  responseFormat: object,
): Promise<{ ok: true; json: unknown } | { ok: false; error: "upstream"; detail: string }> {
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(50000),
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 7000,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: responseFormat,
      }),
    });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      return { ok: false, error: "upstream", detail };
    }
    const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const text = payload.choices?.[0]?.message?.content;
    if (!text) return { ok: false, error: "upstream", detail: "Empty model response." };
    return { ok: true, json: JSON.parse(text) };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Request failed.";
    return { ok: false, error: "upstream", detail };
  }
}

const stringField = { type: "string" };
const stringList = { type: "array", items: { type: "string" } };

export const courseResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "blurb", "modules"],
  properties: {
    title: stringField,
    blurb: stringField,
    modules: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "summary", "lessons"],
        properties: {
          title: stringField,
          summary: stringField,
          lessons: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "title",
                "minutes",
                "summary",
                "heading",
                "body",
                "example",
                "analogy",
                "checkType",
                "prompt",
                "setup",
                "options",
                "answerIndex",
                "answers",
                "pairs",
                "steps",
                "explain",
                "rubric",
                "sample",
                "keyPoints",
              ],
              properties: {
                title: stringField,
                minutes: { type: "integer" },
                summary: stringField,
                heading: stringField,
                body: stringField,
                example: stringField,
                analogy: stringField,
                checkType: {
                  type: "string",
                  enum: ["choice", "blank", "match", "short", "map", "scenario", "teach"],
                },
                prompt: stringField,
                setup: stringField,
                options: stringList,
                answerIndex: { type: "integer" },
                answers: stringList,
                pairs: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["left", "right"],
                    properties: { left: stringField, right: stringField },
                  },
                },
                steps: stringList,
                explain: stringField,
                rubric: stringList,
                sample: stringField,
                keyPoints: stringList,
              },
            },
          },
        },
      },
    },
  },
};

export const feedbackResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "note", "missing"],
  properties: {
    score: { type: "integer" },
    note: stringField,
    missing: stringList,
  },
};
