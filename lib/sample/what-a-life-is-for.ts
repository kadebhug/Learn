import type { Block, Lesson, Module, Topic } from "../types";

/**
 * What a Life Is For.
 * Education only. Nothing here assigns a calling, a diagnosis, or clinical advice.
 */

function explain(id: string, heading: string, body: string, extra?: { examples?: string[]; analogy?: string }): Block {
  return { id, type: "explain", heading, body, ...extra };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "choice", prompt, options, answerIndex, explain: explainText },
  };
}

function blank(id: string, prompt: string, answers: string[], explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "blank", prompt, answers, explain: explainText },
  };
}

function match(id: string, prompt: string, pairs: { left: string; right: string }[], explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "match", prompt, pairs, explain: explainText },
  };
}

function short(id: string, prompt: string, rubric: string[], sample: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "short", prompt, rubric, sample },
  };
}

function scenario(id: string, setup: string, prompt: string, options: string[], answerIndex: number, explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "scenario", setup, prompt, options, answerIndex, explain: explainText },
  };
}

function map(id: string, prompt: string, steps: string[], explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "map", prompt, steps, explain: explainText },
  };
}

function teach(id: string, prompt: string, keyPoints: string[]): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "teach", prompt, keyPoints },
  };
}

function reflect(id: string, label: string, prompt: string, help: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "reflect", label, prompt, help },
  };
}

function copySheet(id: string, heading: string, intro: string): Block {
  return { id, type: "copy", heading, intro };
}

function lesson(id: string, title: string, minutes: number, summary: string, blocks: Block[]): Lesson {
  return { id, title, minutes, summary, blocks };
}

const m1Split = lesson(
  "life-m1-split",
  "Two questions people mix",
  5,
  "A feeling of meaning and a standard for a good life are different questions.",
  [
    explain(
      "life-m1-split-ex",
      "One word is doing two jobs",
      `People use "purpose" for two questions.

- How does this feel? That is the experience question: what you notice, what you need, and what keeps effort going.
- What standard am I using, and do I accept it? That is the standard question, including on a day that feels flat.

A strong feeling can answer the wrong one. Later lessons hand you standards. This lesson only separates the questions.`,
      {
        examples: [
          "Family news looks right and feels hollow on the train home. The hollow feeling is about your experience. It does not yet say the news fails as a life.",
          "You feel on fire about a goal you would not defend once you look at it. The fire is a mood. The standard is still open.",
          "Work you still accept feels empty on a gray Tuesday. The emptiness is data. It is not yet a verdict on the life.",
        ],
        analogy: "A thermometer tells you the room is cold. Whether to put on a coat is a different decision.",
      },
    ),
    match(
      "life-m1-split-match",
      "Match each question to the field that owns it.",
      [
        { left: "How a life comes to feel worth living", right: "Experience question, the machinery of meaning" },
        { left: "What would make a life worth defending on a flat day", right: "Standard question, reasons that outlast a mood" },
        { left: "Which needs help a chosen direction continue", right: "Follow-through conditions, still the machinery side" },
        { left: "Which reasons count when comfort and duty conflict", right: "Rival goods, still the standards side" },
      ],
      "Feelings, needs, and follow-through are psychology's side. Standards and rival goods are philosophy's side. Purpose-talk usually mixes them.",
    ),
    choice(
      "life-m1-split-q1",
      "Psychology's question in this lesson is mainly:",
      ["How a life comes to feel worth living", "Which single life is the correct one for everyone", "How to stop having moods"],
      0,
      "The field describes the machinery of meaning. It does not crown one life.",
    ),
    choice(
      "life-m1-split-q2",
      "A strong feeling of purpose settles the philosophy question when:",
      ["The feeling is intense enough", "It does not. A feeling answers the experience question. The standard is still open.", "You tell a friend about the feeling"],
      1,
      "Intensity is data about your state. The standard you accept is a separate question.",
    ),
    choice(
      "life-m1-split-q3",
      "A friend asks, \"It feels exciting, but is it a good life?\" Which question did they open?",
      ["Only the mood question", "The standard question", "A medical question"],
      1,
      "\"Is it a good life?\" asks for a standard. Excitement already answered the mood.",
    ),
  ],
);

const m1Sentence = lesson(
  "life-m1-sentence",
  "A sentence you can revise",
  6,
  "Purpose is a working sentence with a test, not a hidden object.",
  [
    explain(
      "life-m1-sentence-ex",
      "You draft it. You do not dig it up.",
      `A usable purpose is a sentence you will live with for a stretch, plus a way to tell if it is holding. Name a standard, who the effort is for, and what would count as evidence. The month can support it or push a revision. A sentence you cannot imagine changing is usually a slogan.

This path will not assign you a calling. When distress is serious, a therapist, a clergy person you trust, or a mentor can sit with the weight.`,
      {
        examples: [
          "\"I will use careful explanations so new people can learn the system, because competence and fairness matter here.\" Check the month: did you explain things, and would you still respect the sentence if nobody thanked you?",
          "\"For this season I will use Sunday mornings to call my brother, because I accept that duty.\" The check is the calls, not whether you feel called.",
          "\"I was born to lead\" has no someone, no evidence, and no way to revise. That is a slogan.",
        ],
      },
    ),
    blank(
      "life-m1-sentence-blank",
      "A purpose you can revise when the month disagrees is a ____.",
      ["hypothesis", "a hypothesis"],
      "The sentence is a claim about how you will live. Evidence can support it or push a revision. It is a hypothesis, not a buried object.",
    ),
    choice(
      "life-m1-sentence-q1",
      "The job of this path is to:",
      ["Assign your true calling", "Help you draft a sentence and a way to test it", "Prove that one tradition is correct for every life"],
      1,
      "You determine the sentence. The path supplies standards, traps, and a month-long test.",
    ),
    choice(
      "life-m1-sentence-q2",
      "A purpose sentence you cannot imagine revising is often:",
      ["Proof you have found the hidden object", "A slogan", "Required by every philosophical standard"],
      1,
      "Revision is part of the tool. A sentence with no imaginable counter-evidence is hard to test.",
    ),
    choice(
      "life-m1-sentence-q3",
      "A usable purpose sentence includes:",
      ["A standard, who the effort is for, and what would count as evidence", "A mood you hope to feel every day", "A title other people will recognize"],
      0,
      "Without a someone and a check, you have a wish. The month is what makes it a hypothesis.",
    ),
  ],
);

const m2Goods = lesson(
  "life-m2-goods",
  "Pleasure is one good",
  5,
  "Feeling good and living in a way you can defend are different goods.",
  [
    explain(
      "life-m2-goods-ex",
      "Pleasant is a real good, and a partial one",
      `Feeling good is a real good, and a partial one: pleasure, comfort, and less pain. Pain matters. A theory that shrugs at misery has a hole in it.

A second standard looks at activity you take to matter, with other people, across time. A hard week can score well there and poorly on comfort. Feeling-good can bless a pleasant life you would not respect. The activity standard can turn harsh if it slights rest, luck, and people who are hurting.`,
      {
        examples: [
          "A Sunday on the couch can honor feeling-good after a hard week. A year of only that, with work you do not respect and no one you show up for, can pass the mood and fail the life you would defend.",
          "If you would refuse a machine of only pleasant experiences, with every real responsibility removed, pleasure is not your whole standard.",
          "A hard month of practice can feel bad and still fit activity you take to matter. One easy year is not the whole verdict either.",
        ],
      },
    ),
    choice(
      "life-m2-goods-try",
      "A year that felt easy, and that you would not defend to a friend, fits which reading?",
      [
        "It can pass the feeling-good standard and fail the standard you would defend",
        "Ease always means the life has failed",
        "A good feeling is the definition of a good life, so the year is settled",
      ],
      0,
      "Ease is a real report. It becomes the whole verdict only if feeling-good is the only standard you accept.",
    ),
    choice(
      "life-m2-goods-q1",
      "Flourishing, as this lesson uses it, is mainly:",
      ["A constant good mood", "Activity you take to matter, with other people, across a life", "Whatever is easiest this month"],
      1,
      "The standard is about the shape of activity over time. A mood is a separate report.",
    ),
    choice(
      "life-m2-goods-q2",
      "The machine of only pleasant experiences matters because:",
      [
        "Refusing it shows that pleasure is not your whole standard",
        "Everyone would plug in, which proves pleasure is the only good",
        "Machines settle philosophical questions by themselves",
      ],
      0,
      "If you want a real responsibility more than a pleasant simulation, feeling-good is partial.",
    ),
    choice(
      "life-m2-goods-q3",
      "Rest after a hard week:",
      [
        "Can honor the feeling-good standard without making comfort the whole life",
        "Always betrays a flourishing standard",
        "Is evidence you have no purpose",
      ],
      0,
      "Comfort has a place. A life made of only comfort is the case this lesson is worried about.",
    ),
  ],
);

const m2Mood = lesson(
  "life-m2-mood",
  "Mood is data",
  6,
  "Name what the mood reports, then which standard it actually speaks to.",
  [
    explain(
      "life-m2-mood-ex",
      "Read the mood, then ask the standard",
      `A mood reports your state. Flat, proud, ashamed, restless, and relieved all say something. A mood is a verdict on the life only when you can name the standard it speaks to.

Write two lines. Line one: what the mood is reporting. Line two: which standard, if any, it speaks to. No standard on line two means you are still in the feeling.`,
      {
        examples: [
          "Shame after a promise you still accept and broke. Line one: I broke it. Line two: the standard holds, so the next move is repair.",
          "Empty on a gray Tuesday during work you still think matters. Sleep, a stuck problem, or a week with no person can do that. The Tuesday is not yet \"I have the wrong life.\"",
          "A win feels like purpose for an afternoon. If your standard is about who you are for, the pleasant spike does not close the case.",
        ],
      },
    ),
    scenario(
      "life-m2-mood-scene",
      "You have felt flat for four days during a project you chose. Sleep has been decent, and you still think the project matters. A friend says the flatness proves you should quit and find your real purpose.",
      "What is the careful reading?",
      [
        "The mood reports these four days. It does not yet overturn a standard you still accept.",
        "Flatness always means the project fails as a life.",
        "A good life never feels flat, so the friend has settled it.",
      ],
      0,
      "Four flat days are data. Quitting is a standard-sized decision, and the standard has not been shown to fail.",
    ),
    choice(
      "life-m2-mood-q1",
      "Mood and standard agree in which case?",
      [
        "You feel ashamed about a promise you still accept and broke",
        "You feel bored for an hour on a Tuesday",
        "You feel proud because a post did well",
      ],
      0,
      "The shame points at a standard you already hold. The move is repair, not a new theory of life.",
    ),
    choice(
      "life-m2-mood-q2",
      "A pleasant win:",
      ["Closes the question of a good life", "Can be real and still leave the standard question open", "Should be ignored, because feelings carry nothing"],
      1,
      "Pleasure is information. It is a verdict only under the feeling-good standard, and only if you accept that standard as the whole one.",
    ),
    choice(
      "life-m2-mood-q3",
      "If you cannot name a standard on line two:",
      ["The philosophy question is closed", "You are still describing a feeling", "The mood must be a health emergency"],
      1,
      "No named standard means you have not reached the philosophy question yet. Most gray Tuesdays are in this spot.",
    ),
  ],
);

const m3Classic = lesson(
  "life-m3-classic",
  "Excellence, and what is up to you",
  5,
  "Flourishing looks at the shape of years. The Stoic move looks at today.",
  [
    explain(
      "life-m3-classic-ex",
      "Two old standards you can use this week",
      `Flourishing, in Aristotle's line, is excellent activity across a life: skill that matters, other people, and enough luck that the activity is possible. One strong week is a sample. The shape that counts is years.

The Stoic move is for today. Your judgment and your action are up to you in a way that health, money, and reputation are not. Those can still matter, and they can be taken. Grief can be fitting. Do the next thing you can actually do.`,
      {
        examples: [
          "You prepare a class carefully. A storm leaves the room half empty. Flourishing still counts the teaching. The Stoic move says the headcount was not yours to guarantee.",
          "A great training week is a sample of flourishing, not a verdict on the years.",
          "A lost client can sting. The next email is still yours. A version that bans grief is the crude one. This lesson does not ask for numbness.",
        ],
      },
    ),
    match(
      "life-m3-classic-match",
      "Match the move to the standard.",
      [
        { left: "Judge the shape of years, not one dramatic week", right: "Flourishing, activity across a whole life" },
        { left: "Friends and a community belong inside the account", right: "Flourishing, other people are part of living well" },
        { left: "Do the part that is actually yours today", right: "Stoic move, judgment and action you can still take" },
        { left: "A lost result can sting and still leave the work intact", right: "Stoic move, health and reputation can slip" },
      ],
      "Years and other people belong to flourishing. Today's action, with outcomes that can slip, belongs to the Stoic move.",
    ),
    choice(
      "life-m3-classic-q1",
      "A single great week, on the flourishing standard, is:",
      ["The whole verdict on a life", "A sample, not the whole account", "Irrelevant, because only moods count"],
      1,
      "Flourishing is about the shape across time. One week can illustrate it and cannot finish it.",
    ),
    choice(
      "life-m3-classic-q2",
      "The Stoic move asks you to:",
      [
        "Act on what is up to you, without treating every outcome as yours",
        "Care about nothing that can be taken away",
        "Feel nothing when a plan fails",
      ],
      0,
      "Externals can still matter. They are not the whole good, and grief can still be fitting.",
    ),
    choice(
      "life-m3-classic-q3",
      "A crude Stoic reading that bans grief:",
      ["Is the move this lesson recommends", "Is a cost of the crude version, not the move", "Is required before you can act"],
      1,
      "The usable move is about action and outcome. It does not require numbness.",
    ),
  ],
);

const m3Author = lesson(
  "life-m3-author",
  "Taken or received",
  6,
  "Authorship means you are already answering. A received duty still needs a week-shaped ask.",
  [
    explain(
      "life-m3-author-ex",
      "You already chose, or you were given a duty",
      `Authorship means you are already answering, including when you say you had no choice. Bad faith is the pretense on either side: the situation fully writes your life, or you are pure freedom with no facts and no obligations.

A received purpose is given: a promise, a role, a tradition, a faith, or a duty to someone who cannot repay you. This path does not assign one. The test is still concrete. What does it ask this week, and what would count as failing it?`,
      {
        examples: [
          "You did not choose a parent's illness. You can still choose this week: one visit, one bill, one honest talk. The visit is not optional merely because the mood is missing.",
          "\"Take over the shop, because that is what the family is for\" stays your uncle's sentence until you accept what it asks and the cost of failing it.",
          "\"Make them proud\" with no week-shaped ask is hard to fail, so it is hard to live. A real duty can be named.",
        ],
      },
    ),
    scenario(
      "life-m3-author-scene",
      "Your uncle says your purpose is to take over the shop, because that is what the family is for. You have not decided whether you accept that duty. You also have not named another standard.",
      "What keeps this from being a finished answer?",
      [
        "A received purpose still needs a week-shaped ask you accept, and a way to fail it",
        "Family duties never count, so the answer is automatic refusal",
        "Once a relative says it, the standard question is closed",
      ],
      0,
      "A family sentence can become a duty you accept. Until you can say what it asks and that you accept the cost, it is still their sentence.",
    ),
    choice(
      "life-m3-author-q1",
      "Bad faith, as this lesson uses it, means:",
      [
        "Pretending you had no hand in the answer, or pretending nothing constrains you",
        "Any promise you did not invent yourself",
        "Feeling unsure for more than a day",
      ],
      0,
      "Authorship sits between two pretenses: total constraint, and total freedom. Both hide the choice you are already making.",
    ),
    choice(
      "life-m3-author-q2",
      "A received purpose, on this path, can include:",
      [
        "A promise, a role, a tradition, or a religious response you accept",
        "Only goals you invented with no reference to other people",
        "Whatever a relative says, with no further test",
      ],
      0,
      "The path counts these as live standards. It does not assign one, and it still asks what the duty requires this week.",
    ),
    choice(
      "life-m3-author-q3",
      "The week test for a duty asks:",
      ["Whether you feel called", "What it requires now, and what would count as failing it", "Whether the duty photographs well"],
      1,
      "A duty you cannot fail is a slogan. A duty with a week-shaped ask can be lived and checked.",
    ),
  ],
);

const m4Needs = lesson(
  "life-m4-needs",
  "Three conditions, not a spark",
  5,
  "Autonomy, competence, and a real person make a chosen direction easier to keep.",
  [
    explain(
      "life-m4-needs-ex",
      "A direction sticks under three conditions",
      `Psychology cannot crown the right life. It can say when a direction you chose is easier to keep.

- Autonomy: you had a real say, not only a threat or a bribe.
- Competence: you can get better, and you can tell.
- Relatedness: a particular person is in it with you.

Say without skill is a wish. Skill without a say is a well-paid cage. People without a direction is belonging with nothing to belong for. Check the missing condition before you call the purpose dead.`,
      {
        examples: [
          "You are improving in a night class a friend chose for you, and you resent it. Picking the project topic may restore a say before you decide the subject is meaningless.",
          "You do the job well and feel caged, because every goal is assigned. The skill is real. The say is missing.",
          "Only the bonus gets the file opened. Pay can start a hard thing. As the only fuel, the say and the care are thin.",
        ],
      },
    ),
    match(
      "life-m4-needs-match",
      "Match the week to the condition that is loudest.",
      [
        { left: "You picked this project topic yourself", right: "Autonomy, the say was real" },
        { left: "A step works today that failed last month", right: "Competence, skill has a visible rung" },
        { left: "One person expects you and notices the work", right: "Relatedness, a particular human in the effort" },
        { left: "Only the bonus gets the file opened", right: "Thin fuel, praise or pay is doing all the work" },
      ],
      "A say, a visible improvement, and one person are the three conditions. A bonus as the only reason is a warning that the say and the care are thin.",
    ),
    choice(
      "life-m4-needs-q1",
      "Autonomy, competence, and relatedness:",
      [
        "Make a chosen direction easier to continue. They do not crown the right life.",
        "Prove which career is morally correct",
        "Replace the need to choose a standard",
      ],
      0,
      "This is maintenance from psychology. The philosophy question of which standard you accept is still yours.",
    ),
    choice(
      "life-m4-needs-q2",
      "Skill with no say often feels like:",
      ["Flourishing by definition", "A well-paid cage", "Proof you should wait for a calling"],
      1,
      "Competence without autonomy is a common way a fine skill turns hollow.",
    ),
    choice(
      "life-m4-needs-q3",
      "Before you call a purpose dead, check whether:",
      ["You have suffered enough to deserve clarity", "A say, a skill you can grow, or a person is missing", "The goal has been posted publicly"],
      1,
      "A missing condition is a repair. It is not yet evidence that every standard has failed.",
    ),
  ],
);

const m4Places = lesson(
  "life-m4-places",
  "A task, a person, or a stance",
  6,
  "Meaning shows up as work you own, someone you are for, or a stance toward what you cannot change.",
  [
    explain(
      "life-m4-places-ex",
      "Three places, and one misuse",
      `Meaning tends to show up in three places: a task you take on, a person you are for, or a stance toward a fact you cannot change. One is enough to start.

A stance fits what you cannot change. It is the wrong tool for a harm you are free to leave. Leaving, help, or a boundary comes first. An honest revision can change the emphasis and the next chapter. It cannot erase what happened.`,
      {
        examples: [
          "After a layoff, a careful search is a task, showing up for someone else who is scared is a person, and how you talk about a meeting you cannot rewind is a stance.",
          "The old bus route closed, so you stop rehearsing it and pick a new one. That stance fits. A cruel boss you can leave is not a stance problem.",
          "\"Those years taught a skill I now use for this person\" can be true. \"Those years were fine\" is a different move if they were not.",
        ],
      },
    ),
    short(
      "life-m4-places-short",
      "Name the three places meaning tends to show up. Use the words task, person, and stance, and give one life example of a stance that fits because you cannot change the fact.",
      ["task", "person", "stance", "cannot"],
      "Meaning shows up as a task I take on, a person I am for, or a stance toward a fact I cannot change. When the old bus route closed, the stance was to stop rehearsing it and pick a new one. A cruel boss I am free to leave is not a stance problem.",
    ),
    choice(
      "life-m4-places-q1",
      "The three places in this lesson are:",
      ["A task, a person, and a stance", "Status, comfort, and a feed", "A title, a mood, and a five-year plan"],
      0,
      "Work you own, someone you are for, or a stance toward what you cannot change. One is enough to start.",
    ),
    choice(
      "life-m4-places-q2",
      "A stance toward what hurts is the wrong tool when:",
      ["The fact is truly fixed", "You are free to leave the harm", "You can name the feeling"],
      1,
      "Leaving, help, or a boundary comes before a noble story about endurance.",
    ),
    choice(
      "life-m4-places-q3",
      "Revising the story of your past:",
      [
        "Can change the emphasis when the new emphasis is true",
        "Works best when it erases what happened",
        "Is the same as pretending the years were fine",
      ],
      0,
      "An honest revision keeps the record and changes what you do next. A flattering rewrite is a different move.",
    ),
  ],
);

const m5Protect = lesson(
  "life-m5-protect",
  "What you protect when tired",
  5,
  "A kept value is what survives a tired week, not what you say when you are rested.",
  [
    explain(
      "life-m5-protect-ex",
      "Watch the tired version of you",
      `A stated value is what you say when you are rested and being watched. A kept value is what you protect when you are tired, late, or slightly ashamed. The gap shows which sentence is currently in charge. It does not make you a fraud.

Watch one recent week. Whatever survived the squeeze is a candidate. Whatever vanished at the first inconvenience is not yet kept. Keep two candidates at most. Twelve values is a mood board.`,
      {
        examples: [
          "You say family comes first, then stay late to fix a bug nobody needed until Monday. Craft, or being the reliable one, took the hour.",
          "On a short night you skip the gym you talk about, answer your brother, and clarify a diagram nobody required. The brother and the diagram are kept so far. The gym is still stated.",
          "You protect a nightly text to your partner and drop the language app at the first late meeting. The text is a candidate. The app is a plan.",
        ],
      },
    ),
    scenario(
      "life-m5-protect-scene",
      "On a short night you skip the gym you talk about, answer your brother's message, and spend twenty minutes making a diagram clearer than anyone required.",
      "Which reading fits the lesson?",
      [
        "The kept candidates are the brother and the quality of the work. The gym is still only stated.",
        "The gym is the kept value because you feel guilty about missing it.",
        "Whatever you would say in a meeting is the kept value.",
      ],
      0,
      "Guilt points at a stated value. The hour you spent shows what you protected. Both can be named. Only the spent hour is kept so far.",
    ),
    choice(
      "life-m5-protect-q1",
      "A kept value is:",
      ["What you protect when you are tired or slightly ashamed", "The first word on a values poster", "The goal with the biggest audience"],
      0,
      "Protection under friction is the evidence. A rested speech is the stated version.",
    ),
    choice(
      "life-m5-protect-q2",
      "A list of twelve values is hard to live because:",
      ["Lists are always false", "You cannot pay for twelve with a real week. Two you have paid for are usable.", "Values only count if they are secret"],
      1,
      "A short list you have already spent time on can enter a sentence. A mood board cannot.",
    ),
    choice(
      "life-m5-protect-q3",
      "A gap between the poster and the week:",
      ["Proves you have no values", "Shows which sentence is currently in charge", "Must be hidden before you can draft a purpose"],
      1,
      "The gap is the lesson. Name the sentence the week actually served.",
    ),
  ],
);

const m5Tie = lesson(
  "life-m5-tie",
  "Direction, destination, sentence",
  6,
  "A value is a direction, a goal is a destination, and a purpose sentence ties them to someone.",
  [
    explain(
      "life-m5-tie-ex",
      "Keep the three words apart",
      `A value is a direction you do not finish: fairness, care, competence, courage. A goal is a destination you can miss or replace: ship the guide, visit on Sundays, pass the exam. A purpose sentence ties one or two values to who they are for, and points at a destination you could fail.

A title is a goal until you can name the value and the someone. No someone means you still have a goal, or a slogan. "The next person with this problem" counts.`,
      {
        examples: [
          "Care, Tuesday dinners, your housemates: \"I will use Tuesday dinners to make this house easier to live in, because care matters here.\" Missing the dinners is a real miss. Feeling unmotivated is a mood.",
          "\"I want the senior title\" is a destination. \"I will use clear writing so new hires can do the job without guessing, because competence and fairness matter here\" can survive a title change.",
          "\"Get better at running\" names no one. That can be a fine season. Call it a goal until a person or a duty shows up.",
        ],
      },
    ),
    map(
      "life-m5-tie-map",
      "Put the draft in the order this lesson uses, first move at the top.",
      [
        "Name what you protected when you were tired",
        "Name who that protection was for",
        "Name a destination you could miss",
        "Write one sentence that ties the value, the someone, and the destination",
        "Mark the sentence as a draft you can revise",
      ],
      "Start from a protection you have already paid for. Add a someone and a destination so the sentence can fail. The draft label keeps it from hardening into a slogan.",
    ),
    choice(
      "life-m5-tie-q1",
      "A value differs from a goal because:",
      ["A value is a direction you do not finish. A goal is a destination you can miss.", "They are two words for the same finish line.", "A value must be a number"],
      0,
      "Directions orient you. Destinations can be hit, missed, or replaced.",
    ),
    choice(
      "life-m5-tie-q2",
      "A job title becomes a purpose sentence when:",
      ["Other people recognize the title", "You can name the value and who the work is for", "You have wanted it for more than a year"],
      1,
      "The title is a destination. The sentence needs a direction and a someone.",
    ),
    choice(
      "life-m5-tie-q3",
      "A sentence with no someone:",
      ["Is already a complete purpose", "Is still a goal or a slogan until a person or a duty appears", "Fails only if the goal is small"],
      1,
      "\"The next person with this problem\" counts. A purely private upgrade does not yet answer who it is for.",
    ),
  ],
);

const m6Sketch = lesson(
  "life-m6-sketch",
  "Four circles, label peeled off",
  5,
  "The four-circle picture is a modern sketch. Use it, and skip the ancient costume.",
  [
    explain(
      "life-m6-sketch-ex",
      "A sketch is allowed to look ordinary",
      `Four circles can sketch a sentence: what you can already do, what you care about, what someone needs, and what can support the life. Use it in pencil. It is a modern sketch, not an ancient doctrine.

In the older plain sense, ikigai is a reason for getting up, often small and daily, not necessarily a career. Skip the costume. An empty circle means the sentence is unfinished. The empty someone is the usual hole.`,
      {
        examples: [
          "You explain tangled systems calmly, you care about fairness, and new teammates are the someone. The job already holds the work. That sketch can be tested. It is not a discovered essence.",
          "Watering the plants and walking a neighbor's dog can be a reason to get up. That can fit the plain sense of ikigai without being a career diagram.",
          "Strength, care, and pay are filled in, and the someone box says \"people.\" Name a person or a group, or the sketch is still a self-project.",
        ],
      },
    ),
    blank(
      "life-m6-sketch-blank",
      "The four overlapping circles are a modern ____. They are not an ancient doctrine.",
      ["sketch", "diagram"],
      "Call the picture a sketch or a diagram. It can help you check the sentence. It is not an old doctrine wearing a Japanese name.",
    ),
    choice(
      "life-m6-sketch-q1",
      "The four-circle picture is:",
      ["A modern sketch you may use", "An ancient Japanese diagram of the one correct career", "Proof that pay is the highest good"],
      0,
      "Use the four checks. Leave the costume claim behind.",
    ),
    choice(
      "life-m6-sketch-q2",
      "In the older plain sense, ikigai is closer to:",
      ["A four-circle career poster", "A reason for getting up, often small and daily", "A rank you earn in public"],
      1,
      "The older word is about a reason to rise, not a Venn diagram of the market.",
    ),
    choice(
      "life-m6-sketch-q3",
      "The circle people most often leave empty is:",
      ["A named someone", "A private mood", "A favorite color"],
      0,
      "Without a person or a group, the sketch is still a self-project.",
    ),
  ],
);

const m6Clap = lesson(
  "life-m6-clap",
  "If nobody clapped",
  6,
  "Respect the sentence without applause, and name one fact next month could show.",
  [
    explain(
      "life-m6-clap-ex",
      "Two tests, in a fixed order",
      `Use this order: sentence, rival, month, respect. If the respect test fails, rewrite before you spend the month.

The respect test: would you still take this as worth doing if nobody clapped, posted, or thanked you? If not, you may be holding a status goal.

The month names one observation: an action, a product, or another person's experience. Name the rival you are setting aside, so the draft does not pretend to be the only good life.`,
      {
        examples: [
          "Sunday calls so your grandmother has company. Rival: looking devoted online. Month: four calls she would recognize as conversations. You would still call if you never mentioned them.",
          "You would write the guide only if the director will see it. The respect test fails. The guide is a prop for status.",
          "\"Two new people used the notes\" can be checked. \"I will feel aligned\" cannot, especially on a bad day.",
        ],
      },
    ),
    map(
      "life-m6-clap-map",
      "Order the tests, first step at the top.",
      [
        "Write the purpose sentence in one breath",
        "Name the rival standard you are setting aside",
        "Name one observation next month could show",
        "Ask whether you would still respect it with no applause",
      ],
      "The sentence comes first so you have something to test. The rival makes the choice explicit. The month must be observable. The respect test can send you back to rewrite before you invest the month.",
    ),
    choice(
      "life-m6-clap-q1",
      "The respect test asks whether:",
      ["The sentence would still hold if nobody praised it", "Important people already agree with you", "The sentence sounds inspiring out loud"],
      0,
      "Applause is a clue about status. A purpose that requires an audience fails when the room is quiet.",
    ),
    choice(
      "life-m6-clap-q2",
      "A checkable month observation is:",
      ["An action, a product, or another person's experience", "A hope that you will feel aligned", "A promise to think about purpose more often"],
      0,
      "Future you on a bad day cannot audit a mood slogan. A guide, a visit, or a person's use of the work can be seen.",
    ),
    choice(
      "life-m6-clap-q3",
      "Naming a rival standard:",
      ["Makes the choice explicit. Your sentence is one good, not the only good.", "Is unnecessary once the sentence feels right", "Means you must attack that standard in public"],
      0,
      "The rival is what you looked at and set aside. It keeps the draft honest about the roads not taken.",
    ),
  ],
);

const m7Borrowed = lesson(
  "life-m7-borrowed",
  "Someone else's sentence",
  5,
  "A borrowed purpose is a sentence you defend as discovered while the week serves another audience.",
  [
    explain(
      "life-m7-borrowed-ex",
      "Inherited, performed, or delayed",
      `A borrowed purpose is someone else's sentence that you defend as a discovery while the week serves their audience. Learning a standard from a person is ordinary. Performing it as your own finding is the trap.

Three shapes: inherited ("people like us do this"), performed (it photographs well), and delayed (you will choose after you feel called). A calling can be a gift. It is a poor gate. A season is allowed if you say the stretch out loud.`,
      {
        examples: [
          "Your feed rewards projects you can announce. For eight weeks, finish one tool the team uses. A post does not count as the work.",
          "Two years of waiting to feel called, in a job you neither respect nor chose, is the delayed shape. Drop the feeling as a gate and write a season you can test.",
          "\"For this year I will use evenings to get the license, because competence matters for the work I want next.\" An honest season is easier to live than a forever claim you do not believe.",
        ],
      },
    ),
    scenario(
      "life-m7-borrowed-scene",
      "You have waited two years to feel a calling before you commit to any direction. Meanwhile you keep a job you neither respect nor chose, and you tell friends you are still finding your purpose.",
      "Which move fits the lesson?",
      [
        "Drop the calling as a gate. Write a season sentence you can test, and admit the job has been a borrowed default.",
        "Keep waiting. A real purpose arrives as a feeling before any action.",
        "Adopt the loudest family sentence so the wait is over.",
      ],
      0,
      "The feeling is not a gate. A season sentence can be tested. Taking a family sentence only to end the discomfort is another borrow.",
    ),
    choice(
      "life-m7-borrowed-q1",
      "A borrowed purpose becomes a problem when:",
      [
        "You treat someone else's sentence as a discovery your week does not support",
        "You once learned a standard from another person",
        "You revise a draft after a month",
      ],
      0,
      "Learning a standard from someone is ordinary. Performing it as your own discovery, against the week, is the trap.",
    ),
    choice(
      "life-m7-borrowed-q2",
      "Waiting to feel called:",
      ["Is the only honest start", "Treats a feeling as a gate. Good work often starts before the feeling.", "Proves you are in bad faith by definition"],
      1,
      "A calling can arrive. It is a gift, not a requirement you must feel before you draft.",
    ),
    choice(
      "life-m7-borrowed-q3",
      "A season sentence:",
      ["Names a stretch of time, and does not pretend to cover your whole life", "Is a failure of nerve", "Must last at least ten years to count"],
      0,
      "Say the season. A forever claim you do not believe is harder to live than an honest year.",
    ),
  ],
);

const m7Empty = lesson(
  "life-m7-empty",
  "When the question is the wrong tool",
  6,
  "Some emptiness is a drafting problem. Some is a health problem that needs a qualified person.",
  [
    explain(
      "life-m7-empty-ex",
      "Sort the emptiness before you theorize",
      `This is education, not a diagnosis.

A borrowed sentence, a missing person, no skill you can grow, or a values gap is a drafting problem. The tools on this path apply there.

Talk to someone qualified when hopelessness stays for weeks, ordinary tasks stop being possible, or you do not want to be alive: a doctor, a therapist, or a local crisis service. If you are in immediate danger, contact emergency services. Come back to the sentence when you have a floor to stand on.

Burnout is a long demand with too little recovery. Change the load. A grander purpose on no sleep does not fix it.`,
      {
        examples: [
          "Bored on Sunday, wondering if the job fits: a drafting problem. Ask which standard the week served.",
          "The poster and the calendar disagree: a values gap. Name the sentence the week actually served.",
          "For ten days you cannot answer mail, food tastes like nothing, and you keep thinking people would be better off without you. Tell someone qualified this week. The purpose sentence can wait.",
        ],
      },
    ),
    choice(
      "life-m7-empty-try",
      "Which situation calls for someone qualified before any more purpose drafting?",
      [
        "For weeks you cannot do ordinary tasks, and you do not want to be alive",
        "You feel bored on Sunday and wonder if the job is the right fit",
        "Your stated value and your calendar disagree",
      ],
      0,
      "A floor that has dropped out is a care problem. Boredom and a values gap are drafting problems this path can hold.",
    ),
    choice(
      "life-m7-empty-q1",
      "A borrowed sentence, a missing person, and a values gap are:",
      ["Always medical emergencies", "Places where this path's tools apply", "Proof you have found a calling"],
      1,
      "Those are drafting problems. The health line is different: weeks of hopelessness, ordinary tasks gone, or not wanting to be alive.",
    ),
    choice(
      "life-m7-empty-q2",
      "Burnout, in this lesson, is:",
      ["A sign you need a grander slogan", "A load and recovery problem. More purpose-talk on no sleep does not fix it.", "The same thing as a received duty"],
      1,
      "Change the load and talk to a person. Do not stack a bigger sentence on an empty recovery.",
    ),
    choice(
      "life-m7-empty-q3",
      "The limit of this lesson is:",
      [
        "It educates you, it does not diagnose you, and it names when to talk to someone qualified",
        "It can tell you which diagnosis you have",
        "It replaces a doctor when the ideas feel clear",
      ],
      0,
      "Education can sort a drafting problem from a care problem. It cannot diagnose, and it cannot be the care.",
    ),
  ],
);

const m8Draft = lesson(
  "life-m8-draft",
  "Write the working sentence",
  5,
  "Say the strength, the someone, the value, and what this month would show.",
  [
    explain(
      "life-m8-draft-ex",
      "Plain enough for a tired day",
      `Say it in a shape you can remember when you are tired: I will use [strength] for [someone], because [value]. Add the destination you could miss, the rival you are setting aside, and what this month would show.

Two sentences are plenty. A paragraph of identity language is usually for an audience. A duty, a faith, or a season can use the same shape. A draft that feels slightly too plain is often closer than one that feels inspiring.`,
      {
        examples: [
          "\"I will use patient explanations for the new people on my team, because fairness matters here. I am setting aside status. This month the notes exist, and two people have used them.\"",
          "\"I will use Tuesday evenings to sit with my father, because this is a duty I accept. I am setting aside the idea that only chosen projects count.\"",
          "\"I am a clarity-bringer on a journey of authentic impact\" needs a cut back to strength, someone, value, and month.",
        ],
      },
    ),
    short(
      "life-m8-draft-short",
      "Write your working draft in a few sentences. Use the words strength, someone, value, and month. Name the strength you will use, the someone it is for, the value underneath, and what this month would show.",
      ["strength", "someone", "value", "month"],
      "My strength is patient explanation. The someone is new teammates. The value is fairness. This month the notes exist and two people have used them. I am setting aside status.",
    ),
    choice(
      "life-m8-draft-q1",
      "A usable draft names:",
      ["A strength, someone it is for, a value, and a month you can observe", "A mood you want and a title you like", "Every value you have ever admired"],
      0,
      "Four parts are enough to test. A longer identity paragraph usually has an audience in mind.",
    ),
    choice(
      "life-m8-draft-q2",
      "A draft that needs a paragraph of identity language:",
      ["Is more serious than a short one", "Is often written for an audience. Cut it back to the four parts.", "Is required for a received duty"],
      1,
      "Tired-day length is the constraint. Strength, someone, value, month.",
    ),
    choice(
      "life-m8-draft-q3",
      "A duty or a season:",
      ["Cannot use this shape", "Can use the same shape if you say the duty or the time span in plain words", "Counts only after you feel inspired"],
      1,
      "Name the duty or the season inside the sentence. The month test still applies.",
    ),
  ],
);

const m8Board = lesson(
  "life-m8-board",
  "Across the path",
  8,
  "On a fresh case, name the standard in charge, the borrow, the someone, and the month.",
  [
    explain(
      "life-m8-board-ex",
      "Bring the path to one case",
      `Sam likes "I help people find clarity." The week is slides for a director, a feed of other careers, and a cousin Sam keeps meaning to call. A post that does well brings a spike. Sunday is flat. Sleep is okay, and Sam can still work, cook, and see friends. Sam's mother says the family purpose is a stable prestigious job. Sam has not accepted that duty. A respected colleague asked for a plain guide. Sam delayed it because it would not be visible.

The floor has not dropped out, so this is a drafting problem. Ask which standard the week served, what it protected, who the someone could be, what is borrowed, and what a month would show.`,
      {
        examples: [
          "One draft: \"I will use plain guides for the cousin and the colleague, because clarity matters here. I am setting aside the director's applause. This month the guide is finished and the cousin gets one real call.\"",
          "If the guide gets finished only when the director can see it, the respect test fails. Clarity is stated, not yet kept.",
          "The spike after a successful post reports applause. It is a weak standard if Sam would not respect the work in a quiet room.",
        ],
      },
    ),
    choice(
      "life-m8-board-q1",
      "Sam feels flat on Sunday. The first useful question is:",
      ["Which standard the week is actually serving", "How to remove every flat feeling", "Whether one flat Sunday means Sam has no purpose"],
      0,
      "From Two questions, and from Mood is data. A feeling is a report. It is not yet a verdict on the life.",
    ),
    choice(
      "life-m8-board-q2",
      "The spike of purpose when a post does well is:",
      [
        "Evidence about applause. It is a weak standard if Sam would not respect the work in a quiet room.",
        "Proof that the feed is Sam's flourishing",
        "Empty of information, because feelings never report anything",
      ],
      0,
      "From A good feeling and a good life. Pleasant and proud can be real and still fail the respect test.",
    ),
    choice(
      "life-m8-board-q3",
      "The mother's sentence is a finished received duty when:",
      ["Sam can say what it asks this month and accepts the cost of failing it", "A parent has said it out loud", "Sam feels guilty about the job"],
      0,
      "From Taken or received. A received purpose still needs a week-shaped ask that Sam accepts.",
    ),
    choice(
      "life-m8-board-q4",
      "The colleague's request for a plain guide offers Sam which opening?",
      [
        "A skill Sam can practice, and a particular person, if Sam chooses the work",
        "Proof that status is the right standard",
        "A reason to keep waiting for a calling",
      ],
      0,
      "From Three conditions. Competence and relatedness are on the table. Autonomy still requires Sam to choose.",
    ),
    choice(
      "life-m8-board-q5",
      "What did Sam's week actually protect?",
      ["Visible work for the director, more than the cousin or the guide", "The cousin, because Sam meant to call", "Clarity, because Sam likes that sentence"],
      0,
      "From Values you would keep. A kept value is what the week protected, not the sentence Sam enjoys saying.",
    ),
    choice(
      "life-m8-board-q6",
      "A fair month test for a revised sentence would be:",
      [
        "The guide is done and the cousin got a real call, even if nobody applauds",
        "Sam feels aligned on most days",
        "Sam posts more often about clarity",
      ],
      0,
      "From the hypothesis lessons and from Borrowed purpose. An observation beats a mood, and applause was the borrowed fuel.",
    ),
    teach(
      "life-m8-board-teach",
      "Explain Sam's week to a friend. Use the words standard, borrowed, month, and someone. Say which standard the week served, what was borrowed, who the someone could be, and what this month would show.",
      ["standard", "borrowed", "month", "someone"],
    ),
  ],
);

const m9Lines = lesson(
  "life-m9-lines",
  "Eight questions, then your lines",
  12,
  "Each question is explained before you answer. At the end, your lines are together to copy.",
  [
    explain(
      "life-m9-lines-ex",
      "A loop, not a verdict",
      `These questions do not assign a purpose. They collect what you already do, what you can sustain, and what you would revise. A promise, a role, or a faith can still be your answer. Write it in the same boxes.

The loop is short.

- Notice what gets your time when no one is watching.
- Try a match for a set period.
- Watch your energy, your relationships, and whether you would still respect the work.
- Adjust.

A framework can suggest a hypothesis. It does not replace what you write here. Each next screen explains the question, then asks for your line.`,
      {
        examples: [
          "\"I answer my brother before I open the feed\" names a real protection. \"I value connection\" is a poster.",
          "\"I lose the afternoon explaining a tangled system to a new person\" names a peak. \"I want to feel aligned\" is only a mood.",
          "\"For this year, the license. Then I look again\" names a stretch. \"This is my calling forever\" is hard to revise.",
        ],
      },
    ),
    reflect(
      "life-m9-values",
      "When no one is watching",
      "What do you actually treat as important when you are not performing for others?",
      "This is a values check, not a ranking exercise. People often find connection, competence, autonomy, novelty, fairness, beauty, understanding, security, status, play, or contribution. Write one or two you already spend time on. Status can be a goal. It is a shaky purpose if it dies when the room is quiet.",
    ),
    reflect(
      "life-m9-peak",
      "Most absorbed",
      "When have you felt most alive, absorbed, or satisfied?",
      "Name the activity or the relationship, not only the feeling. A peak is a clue about what you value. It does not settle which standard you accept.",
    ),
    reflect(
      "life-m9-trough",
      "Empty or resentful",
      "When have you felt empty or resentful?",
      "Same rule. The pattern can show a mismatch: no say, no one in it, or work you would not defend. A gray week is not yet the wrong life.",
    ),
    reflect(
      "life-m9-strength",
      "What you can do",
      "What are you relatively good at, and what do people seek you out for?",
      "A strength here is something another person can feel. A title does not count by itself. If you are unsure, name a small thing people already ask you to do.",
    ),
    reflect(
      "life-m9-limit",
      "What limits the options",
      "What limitation shapes a realistic option right now?",
      "Health, circumstances, or temperament. A purpose that ignores these tends to frustrate you. The limit is not the purpose. It is part of what a sentence has to fit.",
    ),
    reflect(
      "life-m9-reach",
      "Who it reaches",
      "Who, if anyone, is affected when this goes well?",
      "Many people stay with an effort that reaches someone else, or something larger than their own comfort. That pattern is common. It is not a rule that every season must serve a crowd. If you cannot name a person or a duty, say so, and call that line a goal until someone shows up.",
    ),
    reflect(
      "life-m9-span",
      "How long this holds",
      "Is this a short stretch, or a longer way of being?",
      "A project, a relationship, or a skill can be the true sentence for this season. A vocation or a way of being can be the longer one. Both can be legitimate. Some people need a larger story. Others do well with successive meaningful stretches. If this is a season, name it.",
    ),
    reflect(
      "life-m9-revise",
      "What would revise it",
      "What would make you change this answer later?",
      "Almost no one settles this once. What felt purposeful at 20 often shifts by 40. Name a fact that would push a revision: a month with no action, a duty you no longer accept, or a constraint that changed. Treating the answer as provisional takes the pressure off getting it right forever. A sentence you cannot imagine revising is usually a slogan.",
    ),
    copySheet(
      "life-m9-lines-copy",
      "Your lines",
      "These are your answers, in the order you wrote them. Copy them before you draft the working sentence. A blank line is a question you skipped. Then try the loop: notice, try a set period, watch what happens, and adjust.",
    ),
  ],
);

function courseModule(id: string, title: string, summary: string, lessons: Lesson[]): Module {
  return { id, title, summary, lessons };
}

export const whatALifeIsFor: Topic = {
  slug: "what-a-life-is-for",
  title: "What a Life Is For",
  blurb:
    "Tell how meaning feels apart from what would make a life good, then leave with a purpose sentence and a one-month test. This is education, not a diagnosis, a calling, or clinical advice.",
  difficulty: "beginner",
  minutes: 102,
  source: "sample",
  modules: [
    courseModule(
      "life-m1",
      "Two questions",
      "Goal: tell the psychology question apart from the philosophy question. Badge: Two Questions.",
      [m1Split, m1Sentence],
    ),
    courseModule(
      "life-m2",
      "A good feeling and a good life",
      "Goal: tell pleasure and ease apart from a life of activity that fits what you take to matter. Badge: Two Goods. Shared with Psychology Fundamentals: that path treats a feeling as a signal. This one asks whether the feeling is also a verdict on the life.",
      [m2Goods, m2Mood],
    ),
    courseModule(
      "life-m3",
      "Four answers people still use",
      "Goal: hold four classic answers as rival standards, each with a cost. Badge: Rival Standards.",
      [m3Classic, m3Author],
    ),
    courseModule(
      "life-m4",
      "What psychology can say",
      "Goal: name the conditions that make a chosen direction stick, and the places meaning shows up. Badge: Conditions. Shared with Psychology in Practice: that path catches an edit that protects a label. This one builds a story you can still revise honestly.",
      [m4Needs, m4Places],
    ),
    courseModule(
      "life-m5",
      "Values you would keep",
      "Goal: tell a stated value from what you protect when tired, then tie values into one sentence. Badge: Kept Values. Shared with Psychology in Practice: that path lets a value beat a label when the room is loud. This one finds which values you actually protect.",
      [m5Protect, m5Tie],
    ),
    courseModule(
      "life-m6",
      "A hypothesis, not a calling",
      "Goal: draft a purpose sentence and name the month-long observation that would support it or revise it. Badge: Hypothesis.",
      [m6Sketch, m6Clap],
    ),
    courseModule(
      "life-m7",
      "Borrowed purpose",
      "Goal: catch a purpose you inherited, a wait for a calling, and emptiness that needs care rather than a better theory. Badge: Own It. Education, not therapy. Constant hopelessness, or a wish not to be alive, needs someone qualified to help.",
      [m7Borrowed, m7Empty],
    ),
    courseModule(
      "life-m9",
      "Determining your own",
      "Goal: answer what you already protect, what you can sustain, and what would revise it, then copy your lines. Badge: Your Lines. A received duty can still be the answer. Write it in the same boxes.",
      [m9Lines],
    ),
    courseModule(
      "life-m8",
      "Your working statement",
      "Goal: leave with a purpose sentence, the rival you set aside, and the observation that would make you revise it. Badge: Working Draft.",
      [m8Draft, m8Board],
    ),
  ],
};
