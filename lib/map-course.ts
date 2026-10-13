import type { GeneratedCourse } from "./schema";
import type { Activity, Difficulty, Lesson, Topic } from "./types";
import { slugify, stripDashes } from "./text";

/** Turn the flat course Grok returns into the app's lesson schema. */
export function mapGeneratedCourse(
  course: GeneratedCourse,
  difficulty: Difficulty,
  taken: string[],
): Topic {
  const title = stripDashes(course.title.trim());
  const slug = uniqueSlug(slugify(title), taken);
  const modules = course.modules.map((module, moduleIndex) => {
    const moduleId = `${slug}-m${moduleIndex + 1}`;
    const lessons: Lesson[] = module.lessons.map((lesson, lessonIndex) => {
      const lessonId = `${moduleId}-l${lessonIndex + 1}`;
      const activity = toActivity(lesson, `${lessonId}-check`);
      return {
        id: lessonId,
        title: stripDashes(lesson.title),
        minutes: lesson.minutes,
        summary: stripDashes(lesson.summary),
        blocks: [
          {
            id: `${lessonId}-read`,
            type: "explain",
            heading: stripDashes(lesson.heading),
            body: stripDashes(lesson.body),
            ...(lesson.example.trim() ? { example: stripDashes(lesson.example) } : {}),
            ...(lesson.analogy.trim() ? { analogy: stripDashes(lesson.analogy) } : {}),
          },
          {
            id: `${lessonId}-do`,
            type: "activity",
            activity,
          },
        ],
      };
    });
    return {
      id: moduleId,
      title: stripDashes(module.title),
      summary: stripDashes(module.summary),
      lessons,
    };
  });

  const minutes = modules.reduce(
    (sum, module) => sum + module.lessons.reduce((inner, lesson) => inner + lesson.minutes, 0),
    0,
  );

  return {
    slug,
    title,
    blurb: stripDashes(course.blurb),
    difficulty,
    minutes,
    source: "generated",
    modules,
  };
}

type GeneratedLesson = GeneratedCourse["modules"][number]["lessons"][number];

function toActivity(lesson: GeneratedLesson, id: string): Activity {
  const prompt = stripDashes(lesson.prompt);
  const explain = stripDashes(lesson.explain || "That is the idea this lesson was aiming at.");
  const options = lesson.options.map(stripDashes).filter(Boolean).slice(0, 4);

  switch (lesson.checkType) {
    case "blank": {
      const answers = lesson.answers.map(stripDashes).filter(Boolean);
      if (answers.length === 0) break;
      return { id, type: "blank", prompt, answers, explain };
    }
    case "match": {
      const pairs = lesson.pairs
        .map((pair) => ({ left: stripDashes(pair.left), right: stripDashes(pair.right) }))
        .filter((pair) => pair.left && pair.right)
        .slice(0, 5);
      if (pairs.length >= 2) return { id, type: "match", prompt, pairs, explain };
      break;
    }
    case "short": {
      const rubric = lesson.rubric.map(stripDashes).filter(Boolean);
      if (rubric.length > 0 && lesson.sample.trim()) {
        return { id, type: "short", prompt, rubric, sample: stripDashes(lesson.sample) };
      }
      break;
    }
    case "map": {
      const steps = lesson.steps.map(stripDashes).filter(Boolean).slice(0, 6);
      if (steps.length >= 3) return { id, type: "map", prompt, steps, explain };
      break;
    }
    case "scenario": {
      if (options.length >= 2 && lesson.setup.trim()) {
        return {
          id,
          type: "scenario",
          setup: stripDashes(lesson.setup),
          prompt,
          options,
          answerIndex: clampIndex(lesson.answerIndex, options.length),
          explain,
        };
      }
      break;
    }
    case "teach": {
      const keyPoints = lesson.keyPoints.map(stripDashes).filter(Boolean);
      if (keyPoints.length > 0) return { id, type: "teach", prompt, keyPoints };
      break;
    }
    case "choice":
    default:
      break;
  }

  const safeOptions = options.length >= 2 ? options : ["The careful answer", "A guess with no example", "Skip the check"];
  return {
    id,
    type: "choice",
    prompt,
    options: safeOptions,
    answerIndex: clampIndex(lesson.answerIndex, safeOptions.length),
    explain,
  };
}

function clampIndex(index: number, length: number) {
  if (!Number.isFinite(index) || index < 0 || index >= length) return 0;
  return Math.floor(index);
}

function uniqueSlug(base: string, taken: string[]) {
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
