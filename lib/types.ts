/**
 * Course schema shared by sample lessons, imported JSON, and generated paths.
 *
 * A topic is a list of modules. A module is a list of short lessons.
 * A lesson is a sequence of blocks: an explanation, then an activity.
 * Every activity id is stable so spaced-repetition cards can point at it.
 */

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type TopicSource = "sample" | "generated" | "starter" | "custom";

export type ChoiceActivity = {
  id: string;
  type: "choice";
  prompt: string;
  options: string[];
  answerIndex: number;
  explain: string;
};

export type BlankActivity = {
  id: string;
  type: "blank";
  /** Sentence with ____ where the missing word sits. */
  prompt: string;
  answers: string[];
  explain: string;
};

export type MatchActivity = {
  id: string;
  type: "match";
  prompt: string;
  pairs: { left: string; right: string }[];
  explain: string;
};

export type ShortActivity = {
  id: string;
  type: "short";
  prompt: string;
  /** Phrases a good answer should touch. Used by the local checker. */
  rubric: string[];
  sample: string;
};

export type MapActivity = {
  id: string;
  type: "map";
  prompt: string;
  /** Correct order, top to bottom. The player sees these shuffled. */
  steps: string[];
  explain: string;
};

export type ScenarioActivity = {
  id: string;
  type: "scenario";
  setup: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explain: string;
};

export type TeachActivity = {
  id: string;
  type: "teach";
  prompt: string;
  keyPoints: string[];
};

export type ReflectActivity = {
  id: string;
  type: "reflect";
  /** Short name used on the copy sheet. */
  label: string;
  prompt: string;
  /** What the question is asking, shown before the person writes. */
  help: string;
};

export type Activity =
  | ChoiceActivity
  | BlankActivity
  | MatchActivity
  | ShortActivity
  | MapActivity
  | ScenarioActivity
  | TeachActivity
  | ReflectActivity;

export type ExplainBlock = {
  id: string;
  type: "explain";
  heading: string;
  body: string;
  example?: string;
  examples?: string[];
  analogy?: string;
};

export type ActivityBlock = {
  id: string;
  type: "activity";
  activity: Activity;
};

export type CopyBlock = {
  id: string;
  type: "copy";
  heading: string;
  intro: string;
};

export type Block = ExplainBlock | ActivityBlock | CopyBlock;

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  blocks: Block[];
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Topic = {
  slug: string;
  title: string;
  blurb: string;
  difficulty: Difficulty;
  /** Rough total, shown on the course card. */
  minutes: number;
  source: TopicSource;
  modules: Module[];
};

export type Grade = "again" | "hard" | "good" | "easy";

export type LessonStat = {
  completed: boolean;
  correct: number;
  attempts: number;
};

/**
 * One review card per activity.
 * ease and interval follow a small SM-2 schedule in lib/srs.ts.
 * due is a unix ms timestamp. A card is due when due <= now.
 */
export type CardState = {
  id: string;
  topicSlug: string;
  lessonId: string;
  activityId: string;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
  due: number;
  lastGrade?: Grade;
};

export type StudySession = {
  id: string;
  topicSlug: string;
  lessonId?: string;
  kind: "lesson" | "review" | "challenge";
  startedAt: number;
  minutes: number;
  xp: number;
};

export type BadgeId =
  | "first-lesson"
  | "quiz-ace"
  | "topic-master"
  | "teach-back"
  | "map-maker"
  | "reviewer"
  | "streak-3"
  | "streak-7"
  | "challenge";

export type ThemeChoice = "system" | "light" | "dark";
