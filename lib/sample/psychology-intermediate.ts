import type { Block, Lesson, Module, Topic } from "../types";

/**
 * Psychology in Practice, the intermediate path after Psychology Fundamentals.
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

const i1Select = lesson(
  "psych-i1-select",
  "You see what you are set to see",
  5,
  "A tight set finishes the task and misses the doorway.",
  [
    explain(
      "psych-i1-select-ex",
      "A set catches its target and drops the rest",
      `Attention is a selection you are already running, not a lamp you can widen at will. Your name gets through a noisy room because it is on the list. The kettle, while you are inside a paragraph, often does not, because it is not.

That miss is the price of finishing. A person who registers every sound does not finish the paragraph. A person who finishes the paragraph can boil the kettle dry.

The fast spike and the slow story are already familiar. This lesson is about the set that decides which spikes get a slot. Name the set before you start: "For this stretch I am set for the draft, and I will miss the room." Then decide whether the room is allowed to be missed. If a person may walk in with something you must catch, add one glance on a timer. That is a second set, used on purpose. It is not a claim that both streams fit in the budget at once.`,
      {
        analogy: "A bouncer with a short list. People on the list get in. Everyone else can knock.",
        example:
          "You are editing a paragraph and someone asks a question from the doorway. You answer a second later. The draft was the set. The question had no slot until your set broke.",
      },
    ),
    match(
      "psych-i1-select-match",
      "What got through the set, and what did not?",
      [
        { left: "You hear your name across a loud cafe", right: "Selected. Your name was already the target the set was guarding" },
        { left: "You finish a paragraph and miss a question from the doorway", right: "Missed. The draft was the set, so the question never got a slot" },
        { left: "A timer ends, you look up, and you catch the kettle", right: "Selected. You put the kettle on the list with one designed glance" },
        { left: "You catch a typo and never notice someone sat down beside you", right: "Missed. A tight set finishes the page and drops the room" },
      ],
      "A prepared target gets in. Everything else needs a slot you deliberately opened. The timer glance is a second set, not proof you were watching both.",
    ),
    choice(
      "psych-i1-select-q1",
      "A tight attentional set is useful because it:",
      ["Lets the target through so the task can finish", "Notices every sound equally", "Removes the need to decide what matters"],
      0,
      "The set is how the paragraph gets done. Equal notice is a different, more scattered budget.",
    ),
    choice(
      "psych-i1-select-q2",
      "You miss the kettle mainly because:",
      ["Hearing shuts off during reading", "The kettle was not part of the set you were using", "A spike always arrives with a finished story"],
      1,
      "The click can reach the ear. It does not get a slot unless the set includes it.",
    ),
    choice(
      "psych-i1-select-q3",
      "Someone may need you during a deep block. The fitting move is:",
      ["Trust that you will notice them while you write", "A designed glance on a timer, then back to the draft", "Leave every notification on so the set stays wide"],
      1,
      "One set at a time, alternating on purpose. A wide set is how the draft loses.",
    ),
  ],
);

const i1Switch = lesson(
  "psych-i1-switch",
  "Switching spends the budget",
  6,
  "Finish one cue before you open the next.",
  [
    explain(
      "psych-i1-switch-ex",
      "Two tasks means residue, then a switch",
      `Two thinking tasks "at once" are usually a fast series of switches. Each switch leaves residue: a scrap of the first task still occupying the budget. The sentence you return to feels colder. A chat ping in the middle of a calculation costs more than the glance.

A split screen looks like coverage. Coverage of two streams of thought is the thing the budget cannot give you.

Some situations do require monitoring. A child in the next room, a pot on the stove, a platform announcement. The honest shape is a designed check: a short stretch of work, then a look you planned. That is one set, then the other. It is not reading and listening as a single stream. Ignoring the child to "protect focus" spends the wrong budget. Pretending you can track both fully spends a budget you do not have.`,
      {
        example:
          "The report is due at noon. Your child calls from the next room about every ten minutes. You work for one short stretch, look up, then start the next stretch. The report moves. The check is real.",
      },
    ),
    scenario(
      "psych-i1-switch-scene",
      "The report is due at noon. Your child is playing in the next room and checks in about every ten minutes. You can feel the pull to keep both in mind the whole time.",
      "Which plan spends the budget honestly?",
      [
        "Hold the report and the doorway in mind together, so you miss nothing.",
        "Work in short stretches, then look up on purpose. One set at a time.",
        "Shut the door until noon. Monitoring means the focus has already failed.",
      ],
      1,
      "A designed check alternates two sets. Parallel coverage overclaims the budget. Ignoring the child protects the wrong target.",
    ),
    choice(
      "psych-i1-switch-q1",
      "The main cost of switching tasks is:",
      ["The two seconds it takes to look", "Residue from the first task still occupying the budget", "A permanent drop in ability"],
      1,
      "The scrap of the first task is why the return feels expensive.",
    ),
    choice(
      "psych-i1-switch-q2",
      "A split screen feels like coverage. It is usually:",
      ["Two streams handled as one", "Rapid switching with residue each way", "Proof the budget can widen on demand"],
      1,
      "The screen can show both. The set still takes one target, then the other.",
    ),
    choice(
      "psych-i1-switch-q3",
      "A designed check is the right shape when:",
      ["The situation needs monitoring and full parallel attention is unavailable", "Any glance means you lack discipline", "You only have one task and no one else is home"],
      0,
      "Monitoring is real. The move is an alternation you planned, not a wider set.",
    ),
  ],
);

const i2Cue = lesson(
  "psych-i2-cue",
  "The context is doing the work",
  5,
  "Change the cue if you want a different loop.",
  [
    explain(
      "psych-i2-cue-ex",
      "The loop starts before the want",
      `A repeated action often starts before you have a want you could argue with. The kitchen is the cue. Standing at the shelf is the routine. The reward is often relief: tightness drops, the moment gets a small ending. By the time you notice the want, the loop is already running.

Wanting it less is a real motive, and it arrives late. The earlier move is to change what the context fires.

- Keep the cue, and the routine keeps its job.
- Move the cue, the snack off the counter or the phone charging in another room, and the routine loses its starter.
- Leave the whole context, a different desk or a week away, and the loop may vanish, which tells you the room was doing the work.

A streak that only exists in one kitchen is a cue you have not met yet in the other room. It is not a new self.`,
      {
        example:
          "You open the fridge after work without deciding to. The leftover is in your hand before the argument starts. Tomorrow the leftover lives in a box you have to unpack, and the loop has to wait for a decision.",
      },
    ),
    match(
      "psych-i2-cue-match",
      "Name the part of the loop.",
      [
        { left: "You open the fridge the moment you get home", right: "Cue. The kitchen started the loop before you chose" },
        { left: "You eat the leftover standing at the shelf", right: "Routine. The action the cue launched" },
        { left: "The tightness eases as soon as you start eating", right: "Reward. Relief, more than a reasoned goal" },
        { left: "On a week away from that kitchen, the snack barely happens", right: "Swapped context. The cue never fired, so the loop had no starter" },
      ],
      "The cue starts it, the routine is the act, the reward is often relief, and a new room can reveal that the context was the engine.",
    ),
    choice(
      "psych-i2-cue-q1",
      "In a stubborn loop, the reward is often:",
      ["A carefully chosen goal", "Relief that arrives as the routine runs", "Proof the habit is now part of your identity"],
      1,
      "The easing is what teaches the cue to fire again. The goal speech comes later, if it comes.",
    ),
    choice(
      "psych-i2-cue-q2",
      "\"I will want it less\" arrives late because:",
      ["Wants are fake", "The cue has often started the routine before the want is available to argue with", "Relief only works for children"],
      1,
      "The argument meets a loop that is already in motion. Move the cue if you want the argument to have a chance.",
    ),
    choice(
      "psych-i2-cue-q3",
      "A loop that vanishes on vacation mostly tells you:",
      ["The tendency is gone for good", "The cue lived in the old context", "Rewards no longer matter"],
      1,
      "The other room never fired the starter. Expect the old cue when you get back, and plan for it.",
    ),
  ],
);

const i2IfThen = lesson(
  "psych-i2-ifthen",
  "Choose the move before the cue",
  6,
  "One cue, plus a fallback when that cue never comes.",
  [
    explain(
      "psych-i2-ifthen-ex",
      "Pick the move while you are calm",
      `"I will eat in a way I respect" is a wish. "When I open the fridge after work, I will pour water before I look at the shelves" is a move tied to a cue you actually meet. The if-then does the choosing ahead of time, so the tired version of you does not have to invent a plan at the cue.

One cue is brittle. If you work late and never open that fridge at the usual time, the plan never fires, and the miss can feel like a verdict. Add one fallback cue you will meet anyway: "If that evening context does not happen, when I plug my phone in I will set out tomorrow's breakfast."

Nothing here locks in after a set number of days. The test is whether the cue arrived and the move was small enough to do.`,
      {
        example:
          "When I sit down at my desk, I will write one sentence before I open messages. If I am out and that desk context never happens, the fallback is the same sentence when I plug my phone in.",
      },
    ),
    short(
      "psych-i2-ifthen-short",
      "Write an if-then for a loop you want to change, and a fallback for the day the first cue never comes. Use the words when, fallback, and context.",
      ["when", "fallback", "context"],
      "When I sit down at my desk, I will write one sentence before I open messages. If that context never happens because I am out, the fallback is the same sentence when I plug my phone in.",
    ),
    choice(
      "psych-i2-ifthen-q1",
      "An if-then beats a vague intention because:",
      ["The choice is already made when the cue arrives", "It guarantees the result on a fixed calendar", "It removes the need for any cue"],
      0,
      "The tired moment only has to run a move you already picked.",
    ),
    choice(
      "psych-i2-ifthen-q2",
      "A plan with only one cue fails when:",
      ["You write it down", "That cue never arrives, so the move has nowhere to start", "You add a second, smaller move"],
      1,
      "The fallback exists for the day the first context does not show up.",
    ),
    choice(
      "psych-i2-ifthen-q3",
      "This lesson refuses a fixed number of days because:",
      ["Repetition is irrelevant", "The cue has to arrive, and no calendar law can promise that", "A fallback makes practice unnecessary"],
      1,
      "Count the days the cue fired and the move was small enough. Do not count a magic span.",
    ),
  ],
);

const i3Block = lesson(
  "psych-i3-block",
  "Old and new get in each other's way",
  5,
  "Name which block it is before you add more review.",
  [
    explain(
      "psych-i3-block-ex",
      "Three different ways to go blank",
      `You can review honestly and still go blank. That blank is not always a spacing failure. Three accounts need three fixes.

- Old learning blocks the new. You keep typing last year's password. Practice the new one against that old cue, on purpose.
- New learning blocks the old. After the new password sticks, last year's is gone when a form still asks for it. Retrieve the one you still need. More drilling of the winner will not bring the loser back.
- The trace is fine and the cue is wrong. You could say it in the app, with the title on screen, and you go blank when a person asks in a meeting. Practice with the cue you will actually get: the question, the room, no title on screen.

Another reread is the wrong fix for all three. Spacing still matters. It is not the name of this blank.`,
      {
        example:
          "You knew the figure beside the lesson title. In the hallway your colleague asks with no title in sight, and the figure is gone. The trace was built for a different cue.",
      },
    ),
    match(
      "psych-i3-block-match",
      "Which account is this blank?",
      [
        { left: "You keep typing last year's password on the new form", right: "Old learning is blocking the new response at the old cue" },
        { left: "The new password has stuck, and last year's will not come back", right: "New learning is blocking the old response you still sometimes need" },
        { left: "You knew the figure in the app and went blank when a colleague asked", right: "The trace was there. The meeting did not supply the cue you practiced with" },
      ],
      "Same feeling, three fixes. Drill the collision, retrieve the one you still need, or practice under the cue you will actually get.",
    ),
    choice(
      "psych-i3-block-q1",
      "A clean recall in the app, then a blank in the meeting, is often:",
      ["Proof the trace was never stored", "A cue problem: the meeting did not offer the prompt you practiced", "A reason to add a harder, unrelated chapter"],
      1,
      "The title on the screen was part of the cue. The colleague's question is a different one.",
    ),
    choice(
      "psych-i3-block-q2",
      "Old learning blocking the new looks like:",
      ["The old response keeps winning when the old cue appears", "A brand-new skill with no past to collide with", "Perfect recall of both passwords on the first try"],
      0,
      "The cue still belongs to the old response until you practice the collision.",
    ),
    choice(
      "psych-i3-block-q3",
      "The fitting first question after a blank is:",
      ["How many more pages should I reread tonight?", "Which of the three accounts is this?", "How do I make this skill transfer to every other craft?"],
      1,
      "The account picks the fix. A longer reread does not.",
    ),
  ],
);

const i3Transfer = lesson(
  "psych-i3-transfer",
  "Practice for the room you need",
  6,
  "Near transfer is the win you can practice for.",
  [
    explain(
      "psych-i3-transfer-ex",
      "Same skill, the surface you will meet",
      `Transfer is using a skill on a surface where you did not learn it. Near transfer keeps the skill and changes the surface: you practiced naming a cue in these lessons, and you name one at your own desk. That is a realistic target, and you can practice it.

Far transfer, the hope that a puzzle skill will make you wiser at an unrelated craft, is rare. Practice the craft you want. Do not count on this path to deliver it from the side.

Difficulty helps when you still have a foothold. Retrieving with the title hidden, or mixing two ideas that are easy to confuse, makes the trace work. A page of new jargon with no example is a stall. If you went blank in the meeting, the next session is the same idea, prompted the way the meeting prompts it.`,
      {
        example:
          "You can define a cue while looking at this screen. The practice that transfers is naming today's cue with the screen locked, in the room where the loop actually starts.",
      },
    ),
    scenario(
      "psych-i3-transfer-scene",
      "You blanked when a colleague asked you to explain spacing with no lesson open. A friend says to jump to a harder topic so your brain stretches.",
      "What should the next practice be?",
      [
        "A harder chapter, because any difficulty is useful.",
        "The same idea, prompted by the colleague's question, with no title on screen.",
        "Another reread of the original page until it feels fluent.",
      ],
      1,
      "The blank was a cue and a surface. Meet that surface again while you can still reach the idea. Harder jargon and another fluent reread both miss it.",
    ),
    choice(
      "psych-i3-transfer-q1",
      "Near transfer means:",
      ["The same skill on a new surface", "A puzzle skill improving every unrelated craft", "Recall that only works beside the lesson title"],
      0,
      "Keep the skill. Change the room, the wording, or the cue. That is the practice.",
    ),
    choice(
      "psych-i3-transfer-q2",
      "Far transfer is a poor thing to count on because:",
      ["Practice never leaves the original room", "A skill rarely leaps to an unrelated craft on its own", "Near transfer is impossible"],
      1,
      "If you want the other craft, practice that craft. This path will not smuggle it in.",
    ),
    choice(
      "psych-i3-transfer-q3",
      "Difficulty helps when:",
      ["You have no foothold and no example", "You can still succeed, as in retrieval or mixing confusable ideas", "The page feels fluent after a reread"],
      1,
      "A stall is not a desirable difficulty. The learner still needs a way through.",
    ),
  ],
);

const i4Base = lesson(
  "psych-i4-base",
  "Resemblance pulls harder than the pool",
  5,
  "Ask how common the pattern is here, then look at the person.",
  [
    explain(
      "psych-i4-base-ex",
      "The pool comes before the resemblance",
      `A person reminds you of the last collaborator who worked out. The likeness is vivid, and it feels like evidence. It skips the pool. In this stack of people, how common is "reminds me of Sam"? If several would, the likeness barely moves the odds. If almost nobody would, it deserves a closer look, and it is still one draw, not a verdict.

A vivid case standing in for a rate is already a familiar shortcut. This cut is the next one. Even a fair description can carry the wrong weight when you ignore how many people in this pool match it.

Trusting the resemblance throws out the pool. Ignoring the individual throws out real information because you are afraid of the first error. Name the pool, ask how common the pattern is in it, then look at this person.`,
      {
        example:
          "Jordan reminds you of Sam, who was excellent. So do two other people in the same small group. The likeness is cheap here. Jordan's actual work is the part that can still separate them.",
      },
    ),
    scenario(
      "psych-i4-base-scene",
      "You are picking a collaborator for a weekend project. Jordan reminds you of Sam, who was excellent last time. Two other people in the small group also remind you of Sam a bit.",
      "What is the fitting move?",
      [
        "Pick Jordan. The resemblance is the best evidence you have.",
        "Refuse Jordan, because resemblance is always a trick.",
        "Ask how common that likeness is in this group, then look at Jordan's actual work.",
      ],
      2,
      "The likeness is common in this pool, so it is a weak weight. The work is still worth seeing. Neither blind trust nor a blanket refusal uses the pool.",
    ),
    choice(
      "psych-i4-base-q1",
      "A resemblance pulls harder than it should when:",
      ["You ask how common it is in this pool", "You skip the pool and treat the likeness as the rate", "You look at the person's actual work afterward"],
      1,
      "Vivid likeness feels like evidence. The pool tells you whether it is rare enough to matter.",
    ),
    choice(
      "psych-i4-base-q2",
      "Ignoring the individual is the matching error on the other side because:",
      ["People never differ", "You throw out real information to avoid being fooled by likeness", "The pool is always a trick"],
      1,
      "Use the pool as a weight, then look. A ban on looking is not caution.",
    ),
    choice(
      "psych-i4-base-q3",
      "The useful order is:",
      ["Fall for the likeness, then invent a pool that supports it", "Name the pool, weigh how common the pattern is, then look at this person", "Skip both the pool and the person and wait for a feeling"],
      1,
      "Pool first, so the likeness has a weight. The person second, so a real difference can still count.",
    ),
  ],
);

const i4Regress = lesson(
  "psych-i4-regress",
  "A spike slides toward the usual",
  6,
  "A spike is not the new self.",
  [
    explain(
      "psych-i4-regress-ex",
      "Extremes slide back toward the usual",
      `A brilliant first week on a new routine, and a disastrous week, are both extremes. Extremes move back toward whatever is typical for that person in that situation. Part of the spike was luck, timing, or a quiet week. Part of the slump was the same kind of luck in the other direction.

Treat the great week as the new standard, and an ordinary week arrives dressed as a failure. Treat the bad week as the true self, and you throw out the ordinary weeks that were fine.

A strong feeling makes this worse. After a scare, a rare mishap feels frequent. After a win, the next win feels promised. The feeling tells you something mattered. It is a bad rate. Judge from the next few ordinary weeks, not from the spike alone.`,
      {
        example:
          "Your teammate's first week was outstanding. You praise the work, and you do not announce that this is their new permanent level. The next weeks will sit closer to their usual, and that slide is not a betrayal.",
      },
    ),
    scenario(
      "psych-i4-regress-scene",
      "Your teammate's first week was outstanding. You want a sentence that sets the right expectation for both of you.",
      "What does the slide back imply?",
      [
        "Praise the work, and expect later weeks to sit closer to their usual level.",
        "The first week revealed their true level, so anything less is a flaw in character.",
        "Ignore the week. Extremes carry nothing you can use.",
      ],
      0,
      "The spike is real and partly luck. Praise it. The usual level is where later weeks tend to sit. Silence throws out a real week.",
    ),
    choice(
      "psych-i4-regress-q1",
      "Sliding back toward the usual applies to:",
      ["Only bad weeks, because good weeks are permanent", "Both brilliant weeks and bad ones", "Only people who lack talent"],
      1,
      "Both extremes are unstable guides. The ordinary run is the better baseline.",
    ),
    choice(
      "psych-i4-regress-q2",
      "After a scare, a rare mishap feels frequent. That feeling is:",
      ["A reliable rate", "A bad rate wearing the intensity of the feeling", "Proof the event will now happen every week"],
      1,
      "The feeling marks importance. Ease and dread are poor stand-ins for how often something happens.",
    ),
    choice(
      "psych-i4-regress-q3",
      "The fair window for a judgment is:",
      ["The single extreme week", "The next few ordinary weeks, with the spike kept in proportion", "Whatever you feel in the hour after the spike"],
      1,
      "Keep the spike as one data point. Let ordinary weeks tell you the level.",
    ),
  ],
);

const i5Levers = lesson(
  "psych-i5-levers",
  "Start further upstream",
  5,
  "Change the setup before you wrestle the feeling.",
  [
    explain(
      "psych-i5-levers-ex",
      "Use the earliest lever you can reach",
      `Naming a feeling creates a little space. It does not tell you where to act. There is an order, from upstream to downstream. Use the earliest lever you can actually reach.

- Choose or avoid the situation, while you still can.
- Change something inside the situation you are already in.
- Move your attention while you stay.
- Change the meaning, when another meaning is honest.
- Change the response: what your face, voice, and body do.

You do not reframe a harm you are free to leave. A dull meeting might call for a meaning change: this is twenty minutes, then I can ask my question. A meeting where someone is being humiliated calls for leaving, interrupting, or getting help, not a prettier story.

This is education, not therapy. If distress is constant, unsafe, or tied to hopelessness, talk with someone qualified to help.`,
      {
        example:
          "The afternoon meeting drains you and you can still decline it. Declining is upstream of a breathing exercise you would need if you stayed.",
      },
    ),
    map(
      "psych-i5-levers-map",
      "Put the levers in order, earliest first.",
      [
        "Choose or avoid the situation while you still can",
        "Change something in the situation you are already in",
        "Move your attention while you stay",
        "Change the meaning when another meaning is honest",
        "Change the response your face and body make",
      ],
      "Start as far upstream as you can actually reach. A prettier meaning is downstream of leaving a harm you are free to leave.",
    ),
    choice(
      "psych-i5-levers-q1",
      "You use the earliest lever because:",
      ["Later levers are always dishonest", "It is available, so you do not have to wrestle a feeling the setup is still creating", "Naming a feeling replaces every other move"],
      1,
      "If you can change the situation, do that before you train yourself to endure it.",
    ),
    choice(
      "psych-i5-levers-q2",
      "Reframing is a poor first move when:",
      ["The meeting is merely dull and time-limited", "You can leave a real harm and you reach for a prettier story instead", "You have already left and you are deciding what to do tonight"],
      1,
      "An honest second meaning is a real lever. It is the wrong lever when leaving is still open.",
    ),
    choice(
      "psych-i5-levers-q3",
      "Naming the feeling, which you already practice, fits here as:",
      ["The whole intervention", "A way to get enough space to pick a lever", "Proof you no longer need another person's help"],
      1,
      "The name opens a choice. The lever is the choice. Constant, unsafe, or hopeless distress still needs someone qualified.",
    ),
  ],
);

const i5Cost = lesson(
  "psych-i5-cost",
  "A held face is still a load",
  6,
  "Suppression hides the signal and keeps the cost.",
  [
    explain(
      "psych-i5-cost-ex",
      "Holding the face does not clear the load",
      `Suppression changes the response and leaves the meaning untouched: polite face, still body, the load still running. It can be the right ten seconds in a hallway. As a standing policy it is expensive, and other people often still feel the weather.

Reappraisal changes the meaning when a second meaning is honest. "This email is rude, and it is also a request I can answer in four lines." That differs from "this does not bother me," which is suppression wearing a slogan.

Replay splits the same way. Rumination circles the scene and does not end in a decision. Reflection ends in one next step.

A genuinely bad situation is not a meaning problem. Leaving, escalating, or asking for help sits upstream of both a held face and a clever reframe.

This lesson does not replace qualified help. If the load is constant, unsafe, or tied to hopelessness, talk with someone qualified.`,
      {
        example:
          "You draft one reply that names the change you will make, send it, and stop rereading the rude line. The reply is the step. Another hour in the inbox is rumination.",
      },
    ),
    scenario(
      "psych-i5-cost-scene",
      "A coworker sends a rude email about your draft. You can reply, you can talk to them, and you are not in danger.",
      "Which move matches the idea?",
      [
        "Smile in the hallway and bury it so the feeling dies.",
        "Name what it threatens, then answer once with the change you will make or the limit you need.",
        "Rewrite the story until the email seems kind.",
      ],
      1,
      "One honest reply is reflection with a step. A buried smile is suppression. Pretending the email was kind is a meaning you do not believe.",
    ),
    choice(
      "psych-i5-cost-q1",
      "Suppression mainly:",
      ["Erases the feeling at the source", "Keeps the expression down and leaves the cost in place", "Is the earliest lever whenever a situation is bad"],
      1,
      "The face can be quiet while the load keeps running. Use it for a short passage, not as the whole policy.",
    ),
    choice(
      "psych-i5-cost-q2",
      "Reappraisal is honest when:",
      ["A second meaning is actually available", "You need the feeling to disappear in order to look fine", "Any new story counts, including one you know is false"],
      0,
      "\"Rude, and answerable in four lines\" can be true. \"This does not bother me\" may be a held face.",
    ),
    choice(
      "psych-i5-cost-q3",
      "These levers are education. Qualified help still matters when:",
      ["You named one feeling in a single afternoon", "Distress is constant, unsafe, or tied to hopelessness", "You preferred a reply over a buried smile"],
      1,
      "From Where you meet a feeling. A skill for ordinary load is not a substitute for care when the load does not end.",
    ),
  ],
);

const i6Gap = lesson(
  "psych-i6-gap",
  "You get a situation. They get a trait.",
  5,
  "Your snap gets a context. Theirs gets a character.",
  [
    explain(
      "psych-i6-gap-ex",
      "Same act, two different causes",
      `When you snap, you can list the inputs: short sleep, a stacked afternoon, a vague request. When they snap, the list collapses into a trait: rude, careless, dramatic. The gap runs in a predictable direction, and it is still unfair.

Success bends the same way. Your win feels like skill. Your miss feels like the situation. Their win is easier to call luck. Their miss is easier to call character.

One instance is a moment. A repeated pattern is a clue. Three late handoffs are not an identity, and they are not three accidents you must ignore. A pattern is a reason to change the setup or to ask for something specific. It is not a diagnosis.`,
      {
        example:
          "You were short with a teammate after four hours of sleep, and you know that. They were short on Tuesday, and the story in your head is that they are a short person. Hold the single Tuesday as a moment until the pattern earns a conversation.",
      },
    ),
    match(
      "psych-i6-gap-match",
      "What kind of story is this?",
      [
        { left: "I snapped because I had slept four hours", right: "Actor account. Your own act gets a situation" },
        { left: "They snapped because they are rude", right: "Observer account. Their act gets a trait" },
        { left: "The launch went well because I am good at this", right: "Self-serving credit. Your success leans toward skill" },
        { left: "They missed the last three handoffs, not only today", right: "A pattern worth naming. A clue for a conversation, not a diagnosis" },
      ],
      "Situation for you, trait for them, skill for your wins. A repeat is a clue. One afternoon is not a character.",
    ),
    choice(
      "psych-i6-gap-q1",
      "The actor-observer gap sounds like:",
      ["Your act gets a situation, and theirs gets a trait", "Both acts get the same careful context", "Traits are the only real causes"],
      0,
      "You can see your inputs. Theirs collapse into a label unless you slow down.",
    ),
    choice(
      "psych-i6-gap-q2",
      "Self-serving credit shows up when:",
      ["Your success leans toward skill and your miss leans toward the situation", "You give other people more credit than you keep", "Every outcome is called luck, including your own"],
      0,
      "The bend favors the self. Naming it is how you give their win a fairer cause.",
    ),
    choice(
      "psych-i6-gap-q3",
      "Three late handoffs are:",
      ["An identity you may now announce", "Nothing, because each one might have a private reason", "A pattern worth a specific conversation, still not a diagnosis"],
      2,
      "One instance stays a moment. A repeat is a clue. The clue does not license a character verdict.",
    ),
  ],
);

const i6Repair = lesson(
  "psych-i6-repair",
  "Behavior, effect, request",
  6,
  "A repair names a behavior, not a character.",
  [
    explain(
      "psych-i6-repair-ex",
      "Say the act, the effect, and one request",
      `"You are inconsiderate" is a trait verdict. It invites a defense of the self. A repair that can be used names three things: the behavior, the effect on you, and one request.

"When the notes arrived after the meeting, I had already guessed, and I guessed wrong. Next time please send them the night before." They can do the request. They cannot undo a character label in one conversation.

Favors have two edges. Returning a favor keeps a relationship even. A favor that arrives with an unspoken bill builds a debt you did not agree to. "I covered for you, so you owe me this" is the debt. You can thank them for the cover and still decline the bill.`,
      {
        example:
          "The behavior was sending the notes after the meeting. The effect was that I guessed wrong. The request is the night before. No sentence about the kind of person they are.",
      },
    ),
    short(
      "psych-i6-repair-short",
      "Rewrite a complaint as a repair. You can start from \"You are inconsiderate about notes.\" Use the words behavior, effect, and request.",
      ["behavior", "effect", "request"],
      "The behavior was sending the notes after the meeting. The effect was that I guessed and guessed wrong. My request is that you send them the night before.",
    ),
    choice(
      "psych-i6-repair-q1",
      "A trait word is a weak repair because:",
      ["It invites a defense of the self, and there is no specific act to change", "People enjoy being described", "A request is always rude"],
      0,
      "\"Inconsiderate\" has no next action. A behavior plus a request does.",
    ),
    choice(
      "psych-i6-repair-q2",
      "A usable repair includes:",
      ["A character label and a punishment", "The behavior, the effect on you, and one request", "Only the effect, so they have to guess the act"],
      1,
      "Three parts. Leave any one out and they are defending a self or guessing the job.",
    ),
    choice(
      "psych-i6-repair-q3",
      "A favor with an unspoken bill is:",
      ["Ordinary reciprocity you are required to pay in whatever form they choose", "A debt you did not agree to, which you can decline while still thanking them", "Proof you should never accept help"],
      1,
      "Even exchange is one edge. An unnamed bill is the other. Thanks and a refusal can travel together.",
    ),
  ],
);

const i7Dissonance = lesson(
  "psych-i7-dissonance",
  "The story moves to fit the act",
  5,
  "Notice which side you are about to edit.",
  [
    explain(
      "psych-i7-dissonance-ex",
      "The act is done, so the story moves",
      `You said you would do a short practice session. You did not. Two things now conflict: the act, and the story that you follow through. The act is already done. The story is cheaper to edit, so the story moves. "It did not matter." "I work better in bursts." "Sessions are arbitrary."

Sometimes the edit is honest. Sometimes it appears only to dissolve the conflict. The skill is catching it while it still feels like a realization, then choosing which side should move next time. You can change the cue. You can also keep the story and let the miss stand, without turning it into a global verdict.

Swapping "I am bad at this" for a strategy is already in your kit. This lesson is the moment before that swap, when the slogan arrives dressed as insight.`,
      {
        example:
          "The session did not happen because the cue was a note you left at home. \"It did not matter\" would erase the miss. Resetting the cue keeps the story and gives the next session a starter.",
      },
    ),
    scenario(
      "psych-i7-dissonance-scene",
      "You skipped the session you had planned. A sentence is already forming about how it did not matter.",
      "Which response notices the edit instead of disappearing into it?",
      [
        "It did not matter. I was never that committed.",
        "I am lazy. That is the kind of person I am.",
        "I am about to edit the story. The cue was missing. I will reset the cue, and the miss stands.",
      ],
      2,
      "The first edit dissolves the conflict. The second is a global verdict. The third names the edit, keeps the miss, and changes the cue.",
    ),
    choice(
      "psych-i7-dissonance-q1",
      "The story often moves because:",
      ["Stories are more accurate than acts", "The act is already done, so editing the story is cheaper", "A missed session always reveals your true values"],
      1,
      "The past act will not change. The sentence about it will, unless you notice the edit.",
    ),
    choice(
      "psych-i7-dissonance-q2",
      "\"I am lazy\" after one missed session:",
      ["Hides the cue inside a global verdict", "Is the specific strategy to repeat", "Means the value was never real"],
      0,
      "A verdict has no next move. A missing cue does.",
    ),
    choice(
      "psych-i7-dissonance-q3",
      "An honest edit is one you would:",
      ["Drop as soon as the guilt fades", "Still accept tomorrow, because it names a specific cause", "Use only because it makes the miss disappear"],
      1,
      "\"The cue was at home\" still makes sense in the morning. \"It did not matter\" often does not.",
    ),
  ],
);

const i7Values = lesson(
  "psych-i7-values",
  "A strong situation swamps a tendency",
  6,
  "Let a value break the tie when the room is loud.",
  [
    explain(
      "psych-i7-values-ex",
      "The room can overpower the tendency",
      `A tendency is what you do more often than not, in ordinary rooms. A strong situation is a room with a role, an audience, or a deadline that pulls harder than the tendency. Quiet people speak in a fire drill. Careful people rush when a room is waiting. The tendency did not vanish. The situation won this round.

When two tendencies both fit, a value is the tie-break you pick before the room gets loud. "In a meeting with my boss watching, I will still name the risk, because candor outranks comfort here." The situation is named. The value is named. The tendency is not treated as a law.

One quiet meeting does not delete a tendency to speak, and one blunt meeting does not install a new personality.`,
      {
        example:
          "The situation was a meeting with your boss watching. Your tendency is to keep the peace. The value that should win is candor, so the risk gets said out loud before the room moves on.",
      },
    ),
    short(
      "psych-i7-values-short",
      "Describe a strong situation from this week, or use a meeting where you stayed quiet. Use the words situation, value, and tendency.",
      ["situation", "value", "tendency"],
      "The situation was a meeting with my boss watching. My tendency is to keep the peace. The value that should win is candor, so next time I name the risk out loud.",
    ),
    choice(
      "psych-i7-values-q1",
      "A strong situation can:",
      ["Erase a tendency forever", "Overpower a tendency for that round without deleting it", "Only affect people with no values"],
      1,
      "The room won this round. The tendency is still the ordinary pattern.",
    ),
    choice(
      "psych-i7-values-q2",
      "A value, in this lesson, is:",
      ["A second personality label", "A tie-break you choose when two tendencies both fit", "Whatever you felt in the loudest moment"],
      1,
      "Pick it before the room gets loud, then let it beat the softer tendency on purpose.",
    ),
    choice(
      "psych-i7-values-q3",
      "One quiet meeting means:",
      ["The tendency to speak is gone", "The situation was strong enough to win this round", "You now have a new fixed trait"],
      1,
      "From The story you would rather edit, a single act is a poor place to hang an identity. Name the room.",
    ),
  ],
);

const i8Protocol = lesson(
  "psych-i8-protocol",
  "Five lines before the tool",
  5,
  "Name the force, the tradeoff, and what would change your mind.",
  [
    explain(
      "psych-i8-protocol-ex",
      "Five lines, then the tool",
      `A short kit matches a snag to a move. Under load, the first familiar name wins, even when a different force is the one in the room. Five lines slow that grab.

- Say the situation in one sentence, with who is there and what is at stake.
- Name the beginner idea you would grab first. Naming it keeps you from pretending the problem is new.
- Name the tradeoff this path adds. What does that first idea miss?
- Pick one move you can do today. If you cannot do it today, it is a wish.
- Name the observation that would show you are wrong. A local habit, a role, or a norm can flip a textbook tendency. If you cannot say what would change your mind, you are collecting labels.`,
      {
        example:
          "Situation: I went blank in the hallway. Beginner idea: I failed to space the review. Tradeoff: the cue changed, so more spacing on the same screen may not help. Move: practice the colleague's question with the screen locked. I would be wrong if the blank also happens with the title in front of me.",
      },
    ),
    map(
      "psych-i8-protocol-map",
      "Put the five lines in the order you should run them.",
      [
        "Say the situation in one sentence",
        "Name the beginner idea you would grab first",
        "Name the tradeoff this path adds",
        "Pick one move you can do today",
        "Name the observation that would show you are wrong",
      ],
      "Situation, familiar idea, tradeoff, a move for today, then the observation that would change your mind. Skip the last line and the label cannot be corrected.",
    ),
    choice(
      "psych-i8-protocol-q1",
      "You name the beginner idea first so that:",
      ["You can see what that familiar account misses", "The tradeoff becomes unnecessary", "The situation can stay vague"],
      0,
      "The familiar name is a hypothesis. The tradeoff line is what it failed to include.",
    ),
    choice(
      "psych-i8-protocol-q2",
      "The last line matters because:",
      ["A textbook tendency is immune to local norms", "A role, a habit, or a local norm can flip the tendency you named", "Observations are less useful than labels"],
      1,
      "If nothing you could see would change the label, you have stopped practicing.",
    ),
    choice(
      "psych-i8-protocol-q3",
      "A move fails the fourth line when:",
      ["It is small", "You cannot do it today", "It names a cue"],
      1,
      "Today is the filter. A move for someday is the wish you already know how to write.",
    ),
  ],
);

const i8Board = lesson(
  "psych-i8-board",
  "A week with the labels off",
  8,
  "Name the force that is winning, then the move.",
  [
    explain(
      "psych-i8-board-ex",
      "The labels come off",
      `The questions below do not announce their module. Run the five lines if you need them: situation, familiar idea, tradeoff, one move, and what would show you are wrong.

Each explanation names the module afterward, so a miss still teaches the map. Then teach one situation back to a friend, with the force, the tradeoff, the move, and the observation that would change your mind.`,
    ),
    choice(
      "psych-i8-board-q1",
      "You are writing and you miss a person asking a question from the doorway. The best account is:",
      ["Your set was the draft, so the question had no slot", "You have a standing character flaw", "A fast spike always arrives with a finished story"],
      0,
      "From Attention is a budget. The set did its job and dropped the doorway. A designed glance is the move if the doorway matters.",
    ),
    choice(
      "psych-i8-board-q2",
      "You snack every time you enter that kitchen, then decide you will simply want it less. The better move is:",
      ["Wait until motivation feels strong", "Move the cue, and write an if-then with a fallback context", "Count a fixed span of days and expect the loop to lock"],
      1,
      "From The cue fires first. The want arrives late. Change the starter, and give the plan a second cue for the day the first one never comes.",
    ),
    choice(
      "psych-i8-board-q3",
      "You recalled a name easily in the app and went blank when a colleague asked. The fitting account is:",
      ["The cue changed, so practice with the colleague's question", "Spacing failed, so cram the page tonight", "App practice should have transferred to every hallway on its own"],
      0,
      "From Memory under interference. This blank is a missing cue, not a failed gap and not far transfer.",
    ),
    choice(
      "psych-i8-board-q4",
      "Three people in the pile also resemble your last great hire. The fitting move is:",
      ["Treat the resemblance as enough", "Weigh how common the likeness is in this pile, then look at the work", "Ignore everyone who resembles anyone"],
      1,
      "From A case is not a rate. A common likeness is a weak weight. The work can still separate one person.",
    ),
    choice(
      "psych-i8-board-q5",
      "The email is rude, you can reply safely, and you are tempted to hold a polite face all week. The fitting move is:",
      ["Bury it so the load has to fade", "Answer once after you decide what it threatens", "Use the technique in place of help if the distress becomes constant and hopeless"],
      1,
      "From Where you meet a feeling. One honest reply beats a held face. Constant, unsafe, or hopeless distress still needs someone qualified. This is education, not therapy.",
    ),
    choice(
      "psych-i8-board-q6",
      "You explain your own snap by lack of sleep and theirs by rudeness. You are looking at:",
      ["A situation for you and a trait for them", "Two equally careful situational accounts", "Proof that sleep is never relevant"],
      0,
      "From Two stories about the same act. Slow the second story down to the inputs you allowed yourself.",
    ),
    choice(
      "psych-i8-board-q7",
      "You skipped a session and hear yourself think \"it did not matter anyway.\" What is happening?",
      ["You have discovered that you were never committed", "The story is moving to fit an act that is already done", "One miss deletes the tendency"],
      1,
      "From The story you would rather edit. Notice the edit. Reset the cue if the cue failed, and let the miss stand.",
    ),
    choice(
      "psych-i8-board-q8",
      "You decided a teammate's silence is a trait. What belongs on the last line of the protocol?",
      [
        "I would be wrong if the silence flips in a one-to-one, or if this room is what shuts them up",
        "I would be wrong only if a textbook disagrees",
        "Nothing. The label is enough",
      ],
      0,
      "From Which force is winning. A local role can flip the tendency. If no observation could change your mind, the label is stuck.",
    ),
    teach(
      "psych-i8-board-teach",
      "Explain one situation from this week to a friend. Use the words force, tradeoff, move, and wrong.",
      ["force", "tradeoff", "move", "wrong"],
    ),
  ],
);

function courseModule(id: string, title: string, summary: string, lessons: Lesson[]): Module {
  return { id, title, summary, lessons };
}

export const psychologyIntermediate: Topic = {
  slug: "psychology-in-practice",
  title: "Psychology in Practice",
  blurb:
    "Use the ideas from Psychology Fundamentals when two forces conflict. Name the tradeoff, pick one move for this week, and say what you would observe if you were wrong. This is education, not a diagnosis or clinical advice.",
  difficulty: "intermediate",
  minutes: 90,
  source: "sample",
  modules: [
    courseModule(
      "psych-i1",
      "Attention is a budget",
      "Goal: treat attention as a limited selection with a switching cost. Badge: Budget Keeper. Shared with Psychology Fundamentals: that path names the fast and slow systems. This one spends the budget they compete for.",
      [i1Select, i1Switch],
    ),
    courseModule(
      "psych-i2",
      "The cue fires first",
      "Goal: change a repeated action by changing the cue and the context. Badge: Cue Setter. Shared with Psychology Fundamentals: that path separates inner fuel from points. This one works when the want arrives too late.",
      [i2Cue, i2IfThen],
    ),
    courseModule(
      "psych-i3",
      "Memory under interference",
      "Goal: tell a missing cue from interference, and practice in the room where the skill has to show up. Badge: Transfer. Shared with Psychology Fundamentals: that path teaches spacing and reconstruction. This one explains blanking after an honest review.",
      [i3Block, i3Transfer],
    ),
    courseModule(
      "psych-i4",
      "A case is not a rate",
      "Goal: separate a vivid resemblance from a base rate, and expect an extreme week to slide back. Badge: Base Rater. Shared with Critical Thinking: that path ranks evidence and separates correlation from cause. This module is why one case feels like the rate.",
      [i4Base, i4Regress],
    ),
    courseModule(
      "psych-i5",
      "Where you meet a feeling",
      "Goal: pick the earliest lever you can actually use, and know the cost of holding the feeling in. Badge: Regulator. Shared with Psychology Fundamentals: that path treats the feeling as a signal and names it. This one chooses where to intervene. Education, not therapy. Constant, unsafe, or hopeless distress needs someone qualified to help.",
      [i5Levers, i5Cost],
    ),
    courseModule(
      "psych-i6",
      "Two stories about the same act",
      "Goal: catch the gap between a situational reason and a character verdict, then repair with a specific request. Badge: Story Splitter. Shared with Psychology Fundamentals: that path shows how groups bend a public answer. This one is about the story you tell afterward.",
      [i6Gap, i6Repair],
    ),
    courseModule(
      "psych-i7",
      "The story you would rather edit",
      "Goal: notice whether you are about to change the behavior or the self-story, and let a value beat a label when the situation is strong. Badge: Revising. Shared with Psychology Fundamentals: that path keeps traits as tendencies and swaps a verdict for a strategy. This one catches the edit as it happens.",
      [i7Dissonance, i7Values],
    ),
    courseModule(
      "psych-i8",
      "Which force is winning",
      "Goal: on a fresh situation, name the dominant force, the tradeoff, and one move, plus the observation that would change your mind. Badge: Field Note.",
      [i8Protocol, i8Board],
    ),
  ],
};
