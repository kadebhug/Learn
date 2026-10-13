import type { Block, Lesson, Module, Topic } from "../types";

/**
 * Psychology Fundamentals, from the starter outline.
 * Education only. Nothing here is a diagnosis or clinical advice.
 */

function explain(id: string, heading: string, body: string, extra?: { example?: string; analogy?: string }): Block {
  return { id, type: "explain", heading, body, ...extra };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "choice", prompt, options, answerIndex, explain: explainText },
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

function lesson(id: string, title: string, minutes: number, summary: string, blocks: Block[]): Lesson {
  return { id, title, minutes, summary, blocks };
}

const a1Systems = lesson(
  "psych-a1-systems",
  "Three systems you already use",
  5,
  "Fast systems react; slower systems update.",
  [
    explain(
      "psych-a1-systems-ex",
      "Three systems, not one thinking blob",
      `Your brain is not one decision-maker. Several systems run at once, and they do not always agree.

- The prefrontal cortex, behind your forehead, handles planning, inhibition, and “wait, is this a good idea?” It is powerful, and also easily tired, hungry, or overwhelmed.
- The amygdala flags possible threat and relevance fast. A sudden noise can spike your heart before you have a story about what happened.
- The hippocampus helps form new memories and place them in context: what happened, where, and in what order.

A useful picture: the amygdala raises a hand, the hippocampus files the scene, and the prefrontal cortex decides what to do next, when it has the bandwidth.

Plasticity means these systems change with use. Practice does not rewire everything. It makes some pathways easier to travel.`,
      {
        analogy: "The amygdala raises a hand, the hippocampus files the scene, and the prefrontal cortex decides the next move when it has the bandwidth.",
      },
    ),
    match(
      "psych-a1-systems-match",
      "Match each moment to the system doing the loudest job.",
      [
        { left: "You flinch at a car horn before you look up", right: "Amygdala — flags a sudden threat" },
        { left: "You remember where you parked", right: "Hippocampus — stores place and order" },
        { left: "You stop yourself from sending an angry text", right: "Prefrontal cortex — holds an impulse" },
        { left: "You feel the layout of a new café after one visit", right: "Hippocampus — files a new scene" },
        { left: "Your heart races in a tense meeting", right: "Amygdala — raises a body alarm" },
        { left: "You make a grocery list in aisle order", right: "Prefrontal cortex — plans a sequence" },
      ],
      "Flinch and heart rate are the amygdala. Place and layout are the hippocampus. Stopping the text and ordering the list are prefrontal work.",
    ),
    choice(
      "psych-a1-systems-q1",
      "Which system is most involved in stopping an impulse?",
      ["Amygdala", "Hippocampus", "Prefrontal cortex"],
      2,
      "Holding back and planning are prefrontal jobs. The amygdala reacts. The hippocampus files.",
    ),
    choice(
      "psych-a1-systems-q2",
      "You can describe a conversation from yesterday in order. Which system is doing the most memory work?",
      ["Amygdala", "Hippocampus", "Only the prefrontal cortex"],
      1,
      "The hippocampus supports new episodic memories and their sequence.",
    ),
    choice(
      "psych-a1-systems-q3",
      "Plasticity means:",
      [
        "The brain is finished changing after childhood",
        "Experience can make some pathways easier to use",
        "Every skill rewires the whole brain equally",
      ],
      1,
      "Change is real and specific, not a total rewrite.",
    ),
  ],
);

const a1Spike = lesson(
  "psych-a1-spike",
  "Fast feelings, slow stories",
  6,
  "A spike is not yet a story.",
  [
    explain(
      "psych-a1-spike-ex",
      "The spike lands before the story",
      `A lot of mental life is a race. Fast systems answer first: safe or not, familiar or new, approach or avoid. Slower systems build a story afterward. That story can be accurate, or it can be a guess you then believe.

This is not a flaw. Fast responses kept ancestors alive. The skill is noticing the gap between the spike and the story, then updating.`,
      {
        example:
          "Your phone buzzes during dinner. Fast system: possible urgency. Body: slight tension. A second later: it is a news alert, not a person. If the slow system is busy, you may stay tense anyway.",
      },
    ),
    match(
      "psych-a1-spike-match",
      "Tag each beat as a spike or a story.",
      [
        { left: "Shoulders jump when a door slams", right: "Spike — the body moves first" },
        { left: "They slammed it because they are angry at me", right: "Story — a motive you added" },
        { left: "You remember the hinge is loose", right: "Story — a fact you recalled" },
        { left: "Stomach drop before you have words", right: "Spike — alarm before an explanation" },
      ],
      "A spike is the fast body or relevance hit. A story is the interpretation, whether or not it is backed by a fact.",
    ),
    choice(
      "psych-a1-spike-q1",
      "A fast body reaction happening before a clear explanation is best described as:",
      ["A spike that the slower system has not updated yet", "Proof the danger is real", "A memory error"],
      0,
      "Speed is not the same as accuracy.",
    ),
    choice(
      "psych-a1-spike-q2",
      "Why is a fast threat response not irrational by default?",
      [
        "It is always correct",
        "It trades accuracy for speed in situations that used to be dangerous",
        "The prefrontal cortex cannot override it",
      ],
      1,
      "The tradeoff is speed versus precision. Override is possible, not guaranteed.",
    ),
    choice(
      "psych-a1-spike-q3",
      "The useful skill in this lesson is:",
      ["Never feeling a spike", "Trusting the first story", "Noticing the gap and updating the story with evidence"],
      2,
      "The gap is where a more careful look starts.",
    ),
  ],
);

const a2Rebuild = lesson(
  "psych-a2-rebuild",
  "Memory is a rebuild, not a video",
  5,
  "If you never encoded it, you did not forget it.",
  [
    explain(
      "psych-a2-rebuild-ex",
      "You rebuild the room from notes",
      `Remembering is closer to rebuilding a room from notes than replaying a tape. You store cues, meaning, and a few vivid details. At recall, you fill gaps. That fill can be influenced by what you believe now, by leading questions, and by later information.

- Encoding means getting something in. Attention is the gate. If you were scrolling, you did not forget. You never stored it.
- Storage means keeping a trace. Sleep and spacing help more than one long cram.
- Retrieval means pulling it back. Retrieval itself strengthens the memory. Testing is studying.

Forgetting is often a retrieval problem, not a deletion. A cue, such as a place, a first letter, or a question, can bring back what felt gone.`,
      {
        analogy: "Remembering is rebuilding a room from a few notes, not pressing play on a tape.",
      },
    ),
    match(
      "psych-a2-rebuild-match",
      "Which stage failed?",
      [
        { left: "You read a page while thinking about lunch", right: "Encoding — attention never opened the gate" },
        { left: "The cue “starts with B” brings last week’s idea back", right: "Retrieval — the trace was still there" },
        { left: "One review, then nothing for a month, and the trace is faint", right: "Storage — the trace was not kept" },
      ],
      "No attention means it was never encoded. A cue that unlocks it means retrieval was the stuck point. A long gap with no review lets storage fade.",
    ),
    choice(
      "psych-a2-rebuild-q1",
      "Memory is best described as:",
      ["A perfect recording", "A reconstruction from cues, meaning, and details", "A list that never changes once stored"],
      1,
      "Gaps get filled. That is why confidence and accuracy can split.",
    ),
    choice(
      "psych-a2-rebuild-q2",
      "If you cannot recall a name until someone says the first syllable, the failure was mainly:",
      ["Encoding", "Storage only", "Retrieval"],
      2,
      "The trace was there. The cue unlocked it.",
    ),
    choice(
      "psych-a2-rebuild-q3",
      "Why is a quiz a form of studying?",
      ["Retrieval strengthens the memory", "Quizzes only measure, they never change memory", "Recognition is always better than recall"],
      0,
      "The act of pulling information out is practice, not just a test.",
    ),
  ],
);

const a2Spacing = lesson(
  "psych-a2-spacing",
  "Spacing beats cramming",
  6,
  "Recall on a delay beats rereading tonight.",
  [
    explain(
      "psych-a2-spacing-ex",
      "Review near the edge of forgetting",
      `Cramming can pass a test tomorrow and fade by next week. Spaced repetition reviews an item just as it is about to slip. Each successful recall pushes the next review further out. One day, three days, seven days, sixteen days is a simple ladder. Exact numbers matter less than the pattern: effortful recall, then a longer gap.

Interleaving means mixing related topics instead of blocking one topic for an hour. It feels harder and usually sticks better, because you practice choosing which idea applies.

In this app, a card you miss returns sooner. A card you nail waits longer. That is the ladder, automated.`,
      {
        example: "You learn encoding, retrieval, spacing, and interleaving today. Tomorrow you recall all four with no notes. In three days you explain spacing in two sentences. In a week you take a mixed quiz.",
      },
    ),
    map(
      "psych-a2-spacing-map",
      "Put this spacing ladder in order, soonest review first.",
      [
        "Tomorrow: recall all four ideas in one minute, no notes",
        "In three days: explain spacing in two sentences",
        "In a week: answer a mixed quiz that also includes other ideas",
      ],
      "The gap grows after each successful recall. Tomorrow is the short rung. A week is the long one.",
    ),
    choice(
      "psych-a2-spacing-q1",
      "The main advantage of spacing over one long cram is:",
      [
        "It feels easier in the moment",
        "Reviews land near the edge of forgetting, which strengthens long-term recall",
        "You spend more total hours by definition",
      ],
      1,
      "Timing, not just duration, drives retention.",
    ),
    choice(
      "psych-a2-spacing-q2",
      "Interleaving helps because you practice:",
      ["Staying in one comfortable topic", "Choosing which idea fits the problem", "Rereading until it feels fluent"],
      1,
      "Fluency from rereading is a poor signal of later recall.",
    ),
    choice(
      "psych-a2-spacing-q3",
      "A card you get wrong in this app should:",
      ["Disappear so you are not discouraged", "Return sooner than a card you got right", "Wait the longest gap"],
      1,
      "Short gaps repair weak traces. Long gaps are for solid recall.",
    ),
  ],
);

const a3Confirm = lesson(
  "psych-a3-confirm",
  "Confirmation and availability",
  5,
  "Ask what you would see if you were wrong.",
  [
    explain(
      "psych-a3-confirm-ex",
      "Two shortcuts that feel like being informed",
      `Confirmation bias: you notice, seek, and remember evidence that fits what you already think, and you skate past the rest. It feels like being informed. It is often selective exposure.

Availability: you judge how common or likely something is by how easily examples come to mind. Vivid, recent, or emotional examples crowd out quiet statistics. A dramatic news story can outweigh a year’s worth of ordinary outcomes.

Neither bias means you are foolish. Both are shortcuts. The fix is a small ritual: “What would I expect to see if I were wrong?” and “Is this easy to imagine, or actually frequent?”

This module is the psychology of the shortcuts. The Critical Thinking path trains the reasoning move on the same four biases.`,
    ),
    match(
      "psych-a3-confirm-match",
      "Name the shortcut.",
      [
        { left: "You only follow commentators who already agree with you, then feel sure", right: "Confirmation — you filtered for agreement" },
        { left: "After one friend’s flight-delay story, flying feels usually late", right: "Availability — one vivid case stands in for the rate" },
        { left: "You remember every time you had a feeling and forget the misses", right: "Both — the hits are vivid and they fit the belief" },
      ],
      "Selective sources are confirmation. One dramatic story standing in for a rate is availability. Remembering only the hits is both.",
    ),
    choice(
      "psych-a3-confirm-q1",
      "Confirmation bias is mainly:",
      ["Wanting to be right out loud in an argument", "Favoring information that supports an existing belief", "Forgetting names"],
      1,
      "The bias is in search, attention, and memory, not only in debate.",
    ),
    choice(
      "psych-a3-confirm-q2",
      "Availability makes rare events feel common when they are:",
      ["Boring and frequent", "Easy to recall because they are vivid or recent", "Written in small print"],
      1,
      "Ease of recall is a bad proxy for frequency.",
    ),
    choice(
      "psych-a3-confirm-q3",
      "A practical counter-question for confirmation bias is:",
      ["How can I prove I’m right faster?", "What would I expect to see if I were wrong?", "Who agrees with me?"],
      1,
      "You go looking for disconfirming evidence on purpose.",
    ),
  ],
);

const a3Anchor = lesson(
  "psych-a3-anchor",
  "Anchoring and the Dunning–Kruger pattern",
  6,
  "Set your number before you hear theirs.",
  [
    explain(
      "psych-a3-anchor-ex",
      "The first number sticks",
      `Anchoring: the first number or frame you meet pulls later judgments toward it, even when the anchor is arbitrary. A “was $80, now $50” tag makes $50 feel like a deal before you ask what the thing is worth.

Use the Dunning–Kruger pattern carefully. People with little skill in a domain often cannot see the gaps, so confidence is high. As skill grows, they see the complexity and confidence can drop. Experts are often confident again, but their confidence tracks real feedback. The slogan “unskilled people think they’re smart” is too crude. The useful point is that low skill makes self-assessment unreliable, so outside feedback matters early.`,
      {
        example: "A freelancer says most people charge around $2,000. You had been thinking $600. Notice the pull. Write your own range from comparable work before you answer.",
      },
    ),
    scenario(
      "psych-a3-anchor-scene",
      "A freelancer says, “Most people charge around $2,000 for this.” You had been thinking $600. You can feel the first number pulling your range up.",
      "What is the useful move before you answer?",
      [
        "Accept $2,000 so you do not seem difficult",
        "Write your own range from comparable work, then answer",
        "Double their number to look serious",
      ],
      1,
      "The first number is a suggestion, not a fact. An independent range is the anti-anchor.",
    ),
    choice(
      "psych-a3-anchor-q1",
      "Anchoring happens when:",
      ["An early number or frame pulls later estimates toward it", "You refuse all numbers", "You only trust statistics"],
      0,
      "The first frame is sticky even if it was arbitrary.",
    ),
    choice(
      "psych-a3-anchor-q2",
      "A careful reading of the Dunning–Kruger pattern is:",
      [
        "Beginners are always arrogant and experts are always humble",
        "Beginners often lack the skill to see what they do not know, so feedback matters",
        "Confidence always falls as you learn",
      ],
      1,
      "The issue is calibration, not a personality insult.",
    ),
    choice(
      "psych-a3-anchor-q3",
      "Before negotiating, a good anti-anchor move is:",
      ["Accept the first number to be polite", "Set your own range from evidence before you hear theirs", "Double whatever they say"],
      1,
      "You need an independent reference point.",
    ),
  ],
);

const a4Signal = lesson(
  "psych-a4-signal",
  "Emotions are data, not orders",
  5,
  "Name the feeling, then pick the next step.",
  [
    explain(
      "psych-a4-signal-ex",
      "A signal you can interpret",
      `An emotion is a fast summary: something matters, and the body is already preparing. Anger often signals a blocked goal or a crossed line. Anxiety often signals uncertainty plus a valued outcome. Sadness often signals a loss. These are tendencies, not a code that is always right.

You do not have to obey the first action urge. Name it, note the body, then choose a response. Naming is not suppression. Suppression, “I must not feel this,” often makes the signal louder later.

A simple sequence: Notice, Name, Need, Next step.`,
      {
        example: "Irritation in a meeting. Notice the heat. Name: anger. Need: to be heard, or a boundary. Next step: one clear sentence, not a speech.",
      },
    ),
    short(
      "psych-a4-signal-short",
      "You refresh your messages and feel a drop when there is no reply. Run Notice, Name, Need, Next step. There is no single correct feeling label. Use all four words: notice, name, need, and a next step.",
      ["notice", "name", "need", "next"],
      "I notice a hollow stomach and the urge to refresh. I name it anxiety. The need is reassurance or a plan. Next I send one message with a time, or I close the app for twenty minutes.",
    ),
    choice(
      "psych-a4-signal-q1",
      "A useful view of emotion is:",
      ["A command you must follow", "Noise to ignore", "A fast signal that something matters, which you can interpret"],
      2,
      "Signals can be early, loud, or mismatched to the facts.",
    ),
    choice(
      "psych-a4-signal-q2",
      "Naming an emotion tends to:",
      ["Erase it", "Make it easier to choose a response instead of only reacting", "Prove the story behind it is true"],
      1,
      "A label creates a little space. It does not verify the story.",
    ),
    choice(
      "psych-a4-signal-q3",
      "Notice, Name, Need, Next step starts with Notice because:",
      ["You cannot work with a signal you have not registered", "The body is always wrong", "Needs should be guessed first"],
      0,
      "Awareness is the entry point.",
    ),
  ],
);

const a4Fuel = lesson(
  "psych-a4-fuel",
  "What actually keeps you going",
  6,
  "Points are a nudge. The idea is the point.",
  [
    explain(
      "psych-a4-fuel-ex",
      "Inside the activity, or outside it",
      `Intrinsic motivation: the activity is rewarding in itself. Curiosity, craft, belonging, play.

Extrinsic motivation: the reward or punishment sits outside. Grades, money, likes, fear of looking bad.

Both are normal. Extrinsic rewards can start a hard habit. If they crowd out an activity you used to enjoy, the activity can start to feel like a chore. That is overjustification, and it is not destiny. Meaning and autonomy can bring interest back.

For learning, three supports show up again and again:

- Autonomy: a real choice, even a small one.
- Competence: tasks at the edge of your skill, with feedback.
- Relatedness: someone or some standard you care about.

This app uses XP as an extrinsic nudge. The path stays interesting when the ideas themselves pay off. If a module feels empty, skip the badge chase and ask what question you actually want answered.`,
    ),
    match(
      "psych-a4-fuel-match",
      "Sort the fuel.",
      [
        { left: "I want to know why I procrastinate", right: "Intrinsic — the question is the reward" },
        { left: "I want the streak number", right: "Extrinsic — the points sit outside the idea" },
        { left: "I like the click of getting a question right", right: "Mixed — competence plus a small reward" },
        { left: "I will feel behind if I miss a day", right: "Extrinsic — avoidance of looking behind" },
      ],
      "Curiosity is intrinsic. Streaks and fear of falling behind are extrinsic. The click of a correct answer mixes competence with a small reward.",
    ),
    choice(
      "psych-a4-fuel-q1",
      "Intrinsic motivation means the reward is:",
      ["Money paid later", "In the activity itself", "Other people’s approval only"],
      1,
      "Curiosity and craft count even when nobody is watching.",
    ),
    choice(
      "psych-a4-fuel-q2",
      "Autonomy, competence, and relatedness matter because they:",
      ["Replace the need for any practice", "Support lasting engagement, not only a short push", "Only apply to children"],
      1,
      "They are conditions under which effort feels worth it.",
    ),
    choice(
      "psych-a4-fuel-q3",
      "An XP system is most helpful when it:",
      ["Becomes the only reason to open the app", "Nudges practice while the ideas remain the real payoff", "Punishes a missed day harshly"],
      1,
      "Points are a scaffold, not the subject.",
    ),
  ],
);

const a5Conform = lesson(
  "psych-a5-conform",
  "Conformity and the quiet cost of disagreeing",
  5,
  "One ally breaks a unanimous squeeze.",
  [
    explain(
      "psych-a5-conform-ex",
      "Matching the group",
      `People often match a group even when the group looks wrong. Classic line-judgment studies found that a noticeable minority of answers copied an obviously incorrect majority. Many participants knew the group was wrong and went along to avoid sticking out. Others actually doubted their own eyes.

Two forces:

- Normative influence: you want acceptance.
- Informational influence: you think the group knows something you do not.

Conformity rises when the group is unanimous, when you like them, and when the answer feels public. One ally who disagrees drops the pressure sharply. A single dissenting voice matters more than its vote count.`,
    ),
    scenario(
      "psych-a5-conform-scene",
      "Two lines are on the screen. The top one is clearly longer. Then you see that 4 of 5 learners picked the bottom line. You feel a pull to switch so you are not the only one.",
      "If you switch mainly to avoid sticking out, which force did you feel?",
      [
        "Normative influence: you wanted to be accepted",
        "Informational influence: you thought they saw something you missed",
        "A memory error: you forgot which line was longer",
      ],
      0,
      "Wanting acceptance is normative influence. “Maybe they see something” is informational. Holding is easier when you can say a reason out loud, or when one other person disagrees.",
    ),
    choice(
      "psych-a5-conform-q1",
      "Normative influence is about:",
      ["Wanting to be accepted", "Genuinely thinking the group has better information", "Memory loss"],
      0,
      "Informational influence is the “they might know” path. Normative influence is the social cost.",
    ),
    choice(
      "psych-a5-conform-q2",
      "Conformity pressure usually drops when:",
      ["The group gets larger without limit", "Even one other person disagrees with the majority", "The answer is made more public"],
      1,
      "Unanimity is a big part of the squeeze. A single ally breaks it.",
    ),
    choice(
      "psych-a5-conform-q3",
      "Going along while privately disagreeing is still conformity because:",
      ["Only private belief counts", "Public behavior changed to match the group", "It only counts if you change your mind forever"],
      1,
      "The studies measured the answer people gave, not only their secret view.",
    ),
  ],
);

const a5Bystander = lesson(
  "psych-a5-bystander",
  "Obedience, roles, and bystanders",
  6,
  "Name a person if you want help to happen.",
  [
    explain(
      "psych-a5-bystander-ex",
      "Small steps and unnamed responsibility",
      `People also obey authority and role cues more than they predict they will. Obedience studies asked participants to deliver what they believed were escalating shocks when an experimenter insisted they continue. Many went far. The point is not that people are uniquely cruel. Gradual steps, a legitimate-looking authority, and responsibility shifted upward can carry someone past their own discomfort.

The bystander effect: when many people could help, each person feels less personal responsibility, and everyone uses the others’ inaction as information. “Maybe it’s fine.” Help becomes more likely when one person is singled out.

Use these ideas defensively. Notice gradual asks, name who owns the decision, and assign help to a specific person instead of “someone.”`,
      {
        example: "A group chat watches someone get piled on. “Someone should say something” still leaves the job diffuse. Naming Alex, and naming your own note, raises responsibility.",
      },
    ),
    choice(
      "psych-a5-bystander-try",
      "A group chat watches someone get piled on. Nobody replies. Which move raises responsibility?",
      [
        "Someone should say something.",
        "Alex, can you check on them tonight? I’ll post a short note that this crossed a line.",
        "Wait. If it were serious, more people would already have replied.",
      ],
      1,
      "“Someone” leaves the job unnamed. Naming a person and an action cuts through diffusion. Other people’s silence is a weak signal, not proof that things are fine.",
    ),
    choice(
      "psych-a5-bystander-q1",
      "A central lesson of obedience research is that harmful compliance is made easier by:",
      [
        "One giant leap and no authority",
        "Small steps, a legitimate-looking authority, and shifted responsibility",
        "Purely private decisions with no social cue",
      ],
      1,
      "The situation is built so each next step feels small.",
    ),
    choice(
      "psych-a5-bystander-q2",
      "The bystander effect grows when:",
      [
        "You are the only person present",
        "Responsibility feels shared and others’ inaction looks like a signal",
        "Someone points at you and gives a clear task",
      ],
      1,
      "Diffusion plus social proof. A direct ask cuts through both.",
    ),
    choice(
      "psych-a5-bystander-q3",
      "“Someone should help” is a weak prompt because it:",
      ["Leaves responsibility unnamed", "Is too emotional", "Only works in small groups"],
      0,
      "Name a person and an action.",
    ),
  ],
);

const a6Traits = lesson(
  "psych-a6-traits",
  "Five tendencies, not a type",
  5,
  "Tendencies are not tattoos.",
  [
    explain(
      "psych-a6-traits-ex",
      "A map, not a costume",
      `The Big Five is a research description of broad tendencies, not a horoscope and not a diagnosis.

- Openness: curiosity, imagination, comfort with new ideas.
- Conscientiousness: organization, follow-through, care about standards.
- Extraversion: energy from stimulation and social approach. Introversion is not shyness by definition. It is a lower need for that stimulation.
- Agreeableness: cooperation, trust, concern for others’ needs.
- Neuroticism: a tendency toward negative emotion and stress reactivity. The other pole is sometimes called emotional stability.

People are not “an extravert” as a species label. They are relatively higher or lower, and behavior still depends on the room, the stakes, and the habit. Traits describe what is easier, not what is allowed.

This app should never output “You are X.” A fair line is: “In this reflection you leaned toward wanting more structure. That is a conscientiousness-flavored preference, not an identity.”`,
    ),
    short(
      "psych-a6-traits-short",
      "Pick one recent choice, such as staying home or going out. Write: “In that situation I leaned ___ because ___. That does not mean I always ___.” Use the words leaned, situation, and always.",
      ["leaned", "situation", "always"],
      "In that situation I leaned toward staying home because I was tired. That does not mean I always stay home.",
    ),
    choice(
      "psych-a6-traits-q1",
      "The Big Five is best used as:",
      ["A permanent identity badge", "A map of broad tendencies that still flex with the situation", "A clinical diagnosis"],
      1,
      "Traits are distributions and contexts, not costumes.",
    ),
    choice(
      "psych-a6-traits-q2",
      "Introversion, in this model, mainly means:",
      ["Fear of people", "A lower preference for high stimulation and social approach", "Low agreeableness"],
      1,
      "Shyness is social anxiety. Introversion is about stimulation and reward.",
    ),
    choice(
      "psych-a6-traits-q3",
      "Why should the app avoid “You are a ___” labels?",
      ["Traits are fake", "A label overclaims from a short reflection and invites a fixed self-story", "Only experts may use words"],
      1,
      "The product should teach nuance, not sort people into boxes.",
    ),
  ],
);

const a6Mindset = lesson(
  "psych-a6-mindset",
  "Fixed stories and growth stories",
  6,
  "Swap “I am bad at this” for a strategy.",
  [
    explain(
      "psych-a6-mindset-ex",
      "A verdict, or a next move",
      `A fixed mindset treats ability as a trait you either have or lack: “I’m not a math person.” A growth mindset treats ability as built through strategy, practice, and feedback: “I haven’t learned this yet.”

This is not positive thinking. People have real constraints. The useful shift is from a global verdict (“I fail because of who I am”) to a specific next move (“the retrieval step was too big; I’ll shrink it”).

Praise that only says “you’re smart” can push people to protect the label and avoid hard tasks. Praise that names the strategy (“you spaced the reviews”) teaches what to repeat.`,
      {
        example: "Fixed: “I always lose arguments. I’m just bad at thinking.” Growth: “I missed the conclusion in that argument. Next time I’ll underline the claim before I react.”",
      },
    ),
    short(
      "psych-a6-mindset-short",
      "Rewrite a fixed verdict so it names a strategy. You can start from “I always lose arguments. I’m just bad at thinking.” Use the words next, claim, and strategy.",
      ["next", "claim", "strategy"],
      "I missed the conclusion in that argument. Next time I will underline the claim before I react. That is a strategy, not a personality.",
    ),
    choice(
      "psych-a6-mindset-q1",
      "A growth framing sounds like:",
      ["I’ll succeed at everything if I believe", "I can improve this skill with a specific kind of practice", "Talent doesn’t exist"],
      1,
      "It is about strategy and effort aimed at a skill, not magic.",
    ),
    choice(
      "psych-a6-mindset-q2",
      "Praising only innate smartness can backfire because people then:",
      ["Avoid challenges that might threaten the label", "Seek harder feedback", "Practice more retrieval"],
      0,
      "The label becomes something to defend.",
    ),
    choice(
      "psych-a6-mindset-q3",
      "“I’m not a numbers person” is risky because it:",
      ["Is always factually false", "Turns a current gap into a permanent identity", "Motivates careful practice"],
      1,
      "Identity language hides the next practice step.",
    ),
  ],
);

const a7Stress = lesson(
  "psych-a7-stress",
  "What the stress response is for",
  5,
  "At high arousal, downshift the body first.",
  [
    explain(
      "psych-a7-stress-ex",
      "Mobilized for a demand",
      `Stress is the body mobilizing for a demand. Heart rate, breathing, and attention shift so you can act. That is useful for a deadline, a hard conversation, or a near miss in traffic. It is costly when the alarm stays on for days with no action that can finish the loop.

This lesson is education, not therapy. If stress is constant, unsafe, or tied to hopelessness, talk with someone qualified to help.

A common simple account is fight, flight, or freeze. Fight: push back. Flight: leave or avoid. Freeze: stall when neither seems possible. People also fawn, or appease, under social threat. These are descriptions of urges, not instructions.

- Bottom-up: change the body signal slightly. Longer exhales, a short walk, unclenching the jaw, water, food, sleep. You turn the volume down before you think your way out.
- Top-down: change the appraisal. “This is hard and time-limited.” “I need a plan for the next ten minutes.” “This feeling is activation, not proof.”

If the body is at a 9 out of 10, start bottom-up. If you are ruminating at a 4, a reappraisal or a tiny plan may be enough.`,
    ),
    match(
      "psych-a7-stress-match",
      "Pick the better first lever.",
      [
        { left: "Heart racing, and you cannot read the screen", right: "Bottom-up — a longer exhale before any plan" },
        { left: "Mild dread about a task you already understand", right: "Top-down — define the next ten-minute action" },
        { left: "Tired, hungry, and snapping at people", right: "Bottom-up — food, water, and a pause" },
      ],
      "Very high arousal and basic needs get a body lever first. Mild dread about a known task can take a small plan.",
    ),
    choice(
      "psych-a7-stress-q1",
      "The stress response is primarily:",
      ["A character flaw", "Mobilization to meet a demand", "Proof that the demand is dangerous"],
      1,
      "Activation is information about demand, not a verdict on the facts.",
    ),
    choice(
      "psych-a7-stress-q2",
      "When arousal is very high, a good first move is often:",
      ["A short body-based downshift, then thinking", "A long analysis of childhood", "More caffeine and faster work"],
      0,
      "Extremely high arousal makes prefrontal planning worse. Lower the volume, then plan.",
    ),
    choice(
      "psych-a7-stress-q3",
      "Freeze is best understood as:",
      ["Laziness", "A protective stall when action doesn’t feel available", "A moral failure"],
      1,
      "Naming it as a response reduces shame and opens a smaller next step.",
    ),
  ],
);

const a7Recover = lesson(
  "psych-a7-recover",
  "Resilience is recovery, not toughness theater",
  6,
  "If-then beats “I’ll try harder.”",
  [
    explain(
      "psych-a7-recover-ex",
      "Coming back toward baseline",
      `Resilience is how you return toward baseline after a demand, not how little you feel. People who “never get stressed” are often under-challenged, disconnected from signals, or hiding the cost.

None of these replace care when life is acutely unsafe or mood stays very low:

- Complete the loop: a short bout of movement so the mobilized body has somewhere to go.
- Sleep regularity: the same wind-down window more nights than not.
- One supportive contact: a specific person, not “people.”
- Implementation intentions: “If it is 9pm, then I put the phone in the other room.”
- Shrink the problem: the next visible action, not the whole future.

Worry is often an unfinished plan pretending to be productivity. Write the next action or schedule a time to plan, then stop rehearsing.`,
    ),
    short(
      "psych-a7-recover-short",
      "Write one implementation intention for this week: If [a cue you will meet], then I will [an action under two minutes]. Use the words then, will, and action.",
      ["then", "will", "action"],
      "If I notice jaw tension at my desk, then I will exhale for four longer breaths before I answer. The action stays under two minutes.",
    ),
    choice(
      "psych-a7-recover-q1",
      "Resilience means:",
      ["Never feeling stress", "Being able to come back toward baseline after demand", "Handling everything alone"],
      1,
      "Recovery and support count. Numbness is not the goal.",
    ),
    choice(
      "psych-a7-recover-q2",
      "An implementation intention works because it:",
      ["Relies on motivation in the moment", "Ties a cue you will actually meet to a tiny action", "Replaces sleep"],
      1,
      "The cue triggers the action so you do not renegotiate every time.",
    ),
    choice(
      "psych-a7-recover-q3",
      "Rehearsing a worry without a next action usually:",
      ["Finishes the stress cycle", "Feels like work while leaving the loop open", "Is the same as planning"],
      1,
      "Planning ends in a decision or a scheduled step. Rumination loops.",
    ),
  ],
);

const a8Tools = lesson(
  "psych-a8-tools",
  "Match the tool to the snag",
  5,
  "Three tools you will use beat ten you saved.",
  [
    explain(
      "psych-a8-tools-ex",
      "A named idea meets a real snag",
      `Psychology is useful when a named idea meets a real snag.

- You read and immediately forget: retrieval after a gap, not more rereading.
- You only see evidence you like: ask what you would see if you were wrong.
- You react, then regret the text: Notice, Name, Need, Next step.
- You do it for the streak and feel empty: one autonomy choice. Pick the question you care about.
- Everyone agrees and you doubt yourself: write your answer privately first.
- “I’m just bad at this”: rewrite it as a strategy gap.
- Body at a 9, mind spinning: longer exhales, then one ten-minute action.

Mastery is not owning every tool. It is picking one when the snag appears. A short list is what you will remember under load. The streak snag belongs with motivation: if the points are the only reason you opened the app, choose one question you actually want answered.`,
    ),
    match(
      "psych-a8-tools-match",
      "Match the snag to the move. Keep three of these, not the whole drawer.",
      [
        { left: "I read and immediately forget", right: "Retrieval after a gap, not more rereading" },
        { left: "I only see evidence I like", right: "Ask what I would see if I were wrong" },
        { left: "I react, then regret the text", right: "Notice, name the feeling, name the need, then one step" },
        { left: "Everyone agrees and I doubt myself", right: "Write the answer privately before I look" },
        { left: "I’m just bad at this", right: "Rewrite the gap as a strategy" },
        { left: "Body at a 9 and the mind is spinning", right: "Longer exhales, then one small action" },
      ],
      "Each snag already has a move from an earlier module. Three tools you will use beat a drawer full of names.",
    ),
    choice(
      "psych-a8-tools-q1",
      "The point of a toolkit is:",
      ["To memorize every study mentioned", "To pair a situation you recognize with a move small enough to do", "To never feel bias again"],
      1,
      "Use beats collection.",
    ),
    choice(
      "psych-a8-tools-q2",
      "Why limit the final set to three tools?",
      ["The other tools are wrong", "A short list is what you will actually remember under load", "The app cannot store more"],
      1,
      "Choice overload kills follow-through.",
    ),
    choice(
      "psych-a8-tools-q3",
      "A good toolkit line includes:",
      ["A cue and an action", "A personality label", "A promise to be perfect"],
      0,
      "“When X, I will Y” is the same shape as an implementation intention.",
    ),
  ],
);

const a8Teach = lesson(
  "psych-a8-teach",
  "Teach it back",
  6,
  "If you can teach it plainly, you have it.",
  [
    explain(
      "psych-a8-teach-ex",
      "Plain language is a test",
      `Explaining an idea in plain language is a retrieval test plus a clarity test. If you need jargon to sound right, you may not have the idea yet.

Score yourself on three checks, not on style: you name the idea, you give a life example, and you give one counter-move.

When this path is done, Critical Thinking starts from the same biases and turns them into argument skills.`,
      {
        example:
          "Confirmation bias, said plainly: “It’s when I pay extra attention to stuff that agrees with me and barely notice the rest. It feels like I’m being reasonable. A fix is to ask what I’d expect if I were wrong, and actually look.”",
      },
    ),
    teach(
      "psych-a8-teach-back",
      "Explain confirmation bias to a skeptical friend. Name what happens when evidence agrees with you, what you would expect if you were wrong, and one life example.",
      ["agrees", "wrong", "expect"],
    ),
    choice(
      "psych-a8-teach-q1",
      "You crammed and feel fluent. The risk is:",
      ["Fluency means you will remember it next month", "Fluency from rereading is a weak signal of later recall", "Spacing always feels easier"],
      1,
      "From the memory module. Ease is not the same as a durable trace.",
    ),
    choice(
      "psych-a8-teach-q2",
      "Four friends are silent while someone is harassed on a platform. The strongest help prompt is:",
      ["People are awful.", "Someone do something.", "Sam, please message them now. I’ll report the post."],
      2,
      "From the bystander lesson. Name owners.",
    ),
    choice(
      "psych-a8-teach-q3",
      "Your first price anchor in a negotiation should be treated as:",
      ["The true value", "A frame that will pull you unless you set your own range first", "Irrelevant only if it is very large"],
      1,
      "From the anchoring lesson. Anchors work even when they are arbitrary.",
    ),
  ],
);

function courseModule(id: string, title: string, summary: string, lessons: Lesson[]): Module {
  return { id, title, summary, lessons };
}

export const psychologyFundamentals: Topic = {
  slug: "psychology-fundamentals",
  title: "Psychology Fundamentals",
  blurb: "Understand why people, including you, think, feel, and act the way they do. This is education, not a diagnosis or clinical advice.",
  difficulty: "beginner",
  minutes: 88,
  source: "sample",
  modules: [
    courseModule("psych-a1", "How your brain works", "Goal: a working picture of the brain as systems, not one thinking blob. Badge: Cartographer.", [a1Systems, a1Spike]),
    courseModule("psych-a2", "Memory and learning", "Goal: see memory as reconstruction, and use spacing on purpose. Badge: Archivist.", [a2Rebuild, a2Spacing]),
    courseModule(
      "psych-a3",
      "Cognitive biases",
      "Goal: name four biases and catch them in ordinary choices. Badge: Bias Spotter. Shared with Critical Thinking: this module teaches the psychology. The other path trains the reasoning move.",
      [a3Confirm, a3Anchor],
    ),
    courseModule("psych-a4", "Emotions and motivation", "Goal: treat emotions as information, and tell inner motives from outer rewards. Badge: Signal Reader.", [a4Signal, a4Fuel]),
    courseModule("psych-a5", "Social psychology", "Goal: see how other people bend judgment, including yours. Badge: Field Observer.", [a5Conform, a5Bystander]),
    courseModule("psych-a6", "Personality and differences", "Goal: use traits as tendencies, not cages. Badge: Nuance.", [a6Traits, a6Mindset]),
    courseModule(
      "psych-a7",
      "Stress and resilience",
      "Goal: understand the stress response and pick a coping move that matches the moment. Badge: Steady. Education, not therapy. Constant, unsafe, or hopeless stress needs someone qualified to help.",
      [a7Stress, a7Recover],
    ),
    courseModule("psych-a8", "Your toolkit", "Goal: leave with three techniques you actually chose, tied to situations you recognize. Badge: Toolkit.", [a8Tools, a8Teach]),
  ],
};
