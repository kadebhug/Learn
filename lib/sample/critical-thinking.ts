import type { Block, Lesson, Module, Topic } from "../types";

/**
 * Critical Thinking and Logic, from the starter outline.
 * Naming a fallacy is not the same as winning. Say what would make the claim stronger.
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

function map(id: string, prompt: string, steps: string[], explainText: string): Block {
  return {
    id: `${id}-b`,
    type: "activity",
    activity: { id, type: "map", prompt, steps, explain: explainText },
  };
}

function lesson(id: string, title: string, minutes: number, summary: string, blocks: Block[]): Lesson {
  return { id, title, minutes, summary, blocks };
}

const c1Critical = lesson(
  "crit-c1-critical",
  "Critical is not cynical",
  5,
  "Critical can end in “this holds.”",
  [
    explain(
      "crit-c1-critical-ex",
      "Testing claims, not a personality",
      `Critical thinking is a set of moves: clarify the claim, find the reasons, check whether the reasons connect, and ask what evidence would change your mind. It is not a personality of constant objection.

Cynical thinking assumes bad faith and stops looking. Gullible thinking accepts tone, status, or vibe. Critical thinking can land on “this is well supported” just as easily as “this doesn’t follow.”

Three standards to carry:

- Clarity: what exactly is being said?
- Relevance: do these reasons bear on that claim?
- Accuracy: are the reasons true, and how do we know?

A person can be kind and still ask “how do you know?” Those are not opposites.

House rule for the whole path: naming a fallacy is not the same as winning. You still have to say what would make the claim stronger.`,
    ),
    match(
      "crit-c1-critical-match",
      "Sort the stance.",
      [
        { left: "Everything online is a lie, so I believe nothing", right: "Cynical — the conclusion was assumed" },
        { left: "They said it confidently, so it is true", right: "Gullible — tone did the work" },
        { left: "The claim is X. The only reason is Y, and Y does not speak to X", right: "Critical — the link was tested" },
        { left: "The claim is X. Two studies point the same way, with a clear limit", right: "Critical — and the claim holds" },
      ],
      "Dismissal is not analysis. Confidence is not evidence. A critical stance can reject a weak link or accept a supported claim.",
    ),
    choice(
      "crit-c1-critical-q1",
      "Critical thinking is best defined as:",
      ["Disagreeing by default", "Clarifying claims and testing whether reasons support them", "Trusting only yourself"],
      1,
      "The skill includes fairly accepting strong claims.",
    ),
    choice(
      "crit-c1-critical-q2",
      "A cynical stance fails because it:",
      ["Asks too many questions", "Stops investigating and assumes the conclusion", "Cares about evidence quality"],
      1,
      "Dismissal is not analysis.",
    ),
    choice(
      "crit-c1-critical-q3",
      "Which question best fits the clarity standard?",
      ["Do I like this person?", "What, exactly, is being claimed?", "Is this popular?"],
      1,
      "You cannot test a claim you have not stated.",
    ),
  ],
);

const c1Claims = lesson(
  "crit-c1-claims",
  "Claims, opinions, and taste",
  6,
  "Taste, fact, and advice are different jobs.",
  [
    explain(
      "crit-c1-claims-ex",
      "Not every sentence is up for proof",
      `Not every sentence is trying to be a testable claim.

- Taste: “I love bitter coffee.” The truth-maker is the speaker’s preference. You can still ask what they mean. You cannot disprove the liking.
- A factual claim or prediction: “This café’s espresso is less bitter than that one’s.” That can be checked.
- A recommendation: “You should switch cafés.” That hides values, such as bitterness, price, or distance, plus facts.

Arguments get stuck when one person states a taste and the other treats it as a fact, or when a recommendation smuggles a value nobody named.`,
    ),
    match(
      "crit-c1-claims-match",
      "Tag the sentence.",
      [
        { left: "Rain is miserable", right: "Taste — a preference, unless they mean a measured mood claim" },
        { left: "It rained 18 days last month", right: "Factual claim — it can be checked" },
        { left: "We should move the picnic", right: "Recommendation — it needs a goal, such as staying dry" },
      ],
      "The type of sentence decides what kind of evidence is even relevant.",
    ),
    choice(
      "crit-c1-claims-q1",
      "“I prefer mornings” is mainly:",
      ["A preference report", "A scientific law", "A fallacy"],
      0,
      "The speaker is the authority on their own liking. It can still be incomplete: prefer mornings for what?",
    ),
    choice(
      "crit-c1-claims-q2",
      "Recommendations are tricky because they:",
      ["Are always fallacies", "Combine values and facts, and the values are often unspoken", "Cannot be discussed"],
      1,
      "Make the value explicit, then the facts can be checked.",
    ),
    choice(
      "crit-c1-claims-q3",
      "Before you argue, ask:",
      ["How do I win?", "Is this taste, a factual claim, or a recommendation?", "Who has more followers?"],
      1,
      "The type of sentence decides what kind of evidence is even relevant.",
    ),
  ],
);

const c2Skeleton = lesson(
  "crit-c2-skeleton",
  "Premises and conclusions",
  5,
  "Find the conclusion before you swing.",
  [
    explain(
      "crit-c2-skeleton-ex",
      "What you are being asked to accept",
      `An argument is a set of premises offered as reasons for a conclusion. Indicator words help, and they are not magic.

- Conclusion cues: therefore, so, hence, which means.
- Premise cues: because, since, given that.

The conclusion is the thing you are being asked to accept. Everything else is supposed to support it. Order in the paragraph is unreliable. People often lead with the conclusion or bury it.

Test: cover the last sentence. What are you being sold? That is usually the conclusion. Seeing the skeleton lets you press on the weak joint instead of the vibe.`,
      {
        example:
          "“The bus was late three times this week, so the route is unreliable, because the city never staffs it.” Premises: late three times; the city never staffs it. Conclusion: the route is unreliable. “Three times” may be a small sample. “Never staffs” needs its own support.",
      },
    ),
    match(
      "crit-c2-skeleton-match",
      "Passage: “You should study with retrieval practice. People remember more when they quiz themselves than when they only reread, and you have a test on Friday.” Match each piece to its role.",
      [
        { left: "You should study with retrieval practice", right: "Conclusion — the claim you are asked to accept" },
        { left: "People remember more when they quiz themselves than when they reread", right: "Premise — a reason about memory" },
        { left: "You have a test on Friday", right: "Premise — relevant only if that test is the goal" },
      ],
      "Role matters, not position. The Friday test supports the advice only if passing that test is the goal.",
    ),
    choice(
      "crit-c2-skeleton-q1",
      "In an argument, the conclusion is:",
      ["Always the first sentence", "The claim the other statements are meant to support", "The most emotional sentence"],
      1,
      "Role matters, not position or heat.",
    ),
    choice(
      "crit-c2-skeleton-q2",
      "“Because” usually introduces:",
      ["A premise", "A conclusion", "A fallacy"],
      0,
      "It marks a reason. “Therefore” marks the conclusion. Cue words can be misused, so check the role.",
    ),
    choice(
      "crit-c2-skeleton-q3",
      "Why pull the skeleton out before you react?",
      ["To sound formal", "So you can see which joint is actually weak", "To avoid all disagreement"],
      1,
      "You might accept one premise and reject the link, or the reverse.",
    ),
  ],
);

const c2Hidden = lesson(
  "crit-c2-hidden",
  "Hidden assumptions",
  6,
  "Say the hidden “only if.”",
  [
    explain(
      "crit-c2-hidden-ex",
      "The premise that stayed offstage",
      `Most everyday arguments leave a premise unsaid. “She’s late, so she doesn’t respect you.” The hidden bridge: lateness, in this case, is caused by disrespect rather than by traffic, error, or a different norm.

A hidden assumption is fair game when the argument needs it to reach the conclusion. Charitable reading means filling the gap with the strongest plausible version, then asking whether that version is true.

Template: “This only works if we also assume ___.”`,
      {
        example:
          "“Don’t take the job. The commute is 50 minutes.” Strong bridge: a 50-minute commute outweighs this job’s other benefits for you. That bridge might be true. It is not stated. Pay, the work, and the person’s tolerance are missing.",
      },
    ),
    short(
      "crit-c2-hidden-short",
      "“Don’t take the job. The commute is 50 minutes.” Name the bridge in one sentence. Use the words commute, outweigh, and benefits.",
      ["commute", "outweigh", "benefits"],
      "This only works if a 50-minute commute outweighs the job’s other benefits for you. Pay, the work, and your tolerance are still missing.",
    ),
    choice(
      "crit-c2-hidden-q1",
      "A hidden assumption is:",
      ["A lie", "An unstated premise the conclusion needs", "The conclusion itself"],
      1,
      "It is doing logical work while staying offstage.",
    ),
    choice(
      "crit-c2-hidden-q2",
      "Charitable reading means:",
      ["Agreeing", "Supplying the strongest plausible version of the missing premise, then testing it", "Ignoring gaps"],
      1,
      "You steelman the bridge. You do not pretend there is no bridge.",
    ),
    choice(
      "crit-c2-hidden-q3",
      "“He’s quiet in meetings, so he has no ideas.” The hidden assumption is closest to:",
      ["Meetings exist", "If someone has ideas, they will speak them in this kind of meeting", "Quiet people are rude"],
      1,
      "Without that bridge, quiet does not entail “no ideas.”",
    ),
  ],
);

const c3Person = lesson(
  "crit-c3-person",
  "Ad hominem and straw man",
  5,
  "Beat the claim, not a doll of the claim.",
  [
    explain(
      "crit-c3-person-ex",
      "The person, or a louder doll",
      `Ad hominem: attacking the person instead of the claim. “You dropped out of college, so your budget idea is worthless.” The speaker’s biography can matter when the claim is “trust me, I saw the books.” It does not settle a budget that can be checked on paper.

Straw man: replacing the other view with a weaker, louder version, then beating that. “You want bike lanes, so you want to ban cars and trap people at home.” The real claim was narrower. Respond to the narrow claim.

A steel man is the opposite habit: state the other view so well they would accept your summary, then disagree if you still do.

After every catch, say what a stronger version of the argument would need.`,
      {
        example:
          "“Of course you defend remote work. You’re lazy and you want to abolish offices.” Lazy is the personal attack. Abolish offices is the doll, if the person only said two remote days help focus.",
      },
    ),
    short(
      "crit-c3-person-short",
      "Repair this quote: “Of course you defend remote work. You’re lazy and you want to abolish offices.” Assume they only argued for two remote days. Use the words claim, strongest, and objection.",
      ["claim", "strongest", "objection"],
      "The claim I think you’re making is that two remote days help focus. The strongest version is a narrow schedule claim, not abolishing offices. My objection needs evidence about focus and teamwork, not a comment about laziness.",
    ),
    choice(
      "crit-c3-person-q1",
      "Ad hominem is a problem when:",
      [
        "Character is directly relevant to whether they witnessed an event",
        "A personal attack substitutes for reasons against the claim",
        "You ask someone for their sources",
      ],
      1,
      "Relevance decides it. Insults are not reasons. Sometimes credibility is a reason.",
    ),
    choice(
      "crit-c3-person-q2",
      "A straw man is:",
      ["A distorted, easier version of someone’s view", "A charitable summary", "A hidden premise you agree with"],
      0,
      "You beat the doll, not the position.",
    ),
    choice(
      "crit-c3-person-q3",
      "After naming a fallacy, the next critical move is:",
      ["Declare victory", "Say what evidence or distinction would actually bear on the claim", "Insult them back more precisely"],
      1,
      "Fallacy labels are tools, not points on a scoreboard.",
    ),
  ],
);

const c3Options = lesson(
  "crit-c3-options",
  "False dichotomy and appeal to emotion",
  6,
  "Offer the third option.",
  [
    explain(
      "crit-c3-options-ex",
      "Two doors, and a feeling used as proof",
      `False dichotomy: “You’re either with the plan or you don’t care about the team.” Real options are usually more than two. The fix is to name a third: “I care about the team and I think this plan misses the deadline risk.”

Appeal to emotion: emotion is used as if it were sufficient evidence. A photo, a fear, or loyalty language can be relevant to what matters and still not establish a factual claim. “Think of the children” tells you the stakes. It does not tell you whether the proposed policy works.

Emotions are allowed in reasoning. They are not a substitute for the factual half.`,
      {
        example: "“Either we ship Friday or we don’t respect customers.” A third option: ship a smaller Friday slice, or move the date and say why.",
      },
    ),
    short(
      "crit-c3-options-short",
      "“Either we ship Friday or we don’t respect customers.” Write a third option a reasonable person could choose. Use the words third, option, and respect.",
      ["third", "option", "respect"],
      "A third option is to ship a smaller slice on Friday, or move the date and explain the risk. That still respects customers.",
    ),
    choice(
      "crit-c3-options-q1",
      "A false dichotomy forces a choice by:",
      ["Listing every real option", "Pretending there are only two, usually extreme, options", "Defining terms clearly"],
      1,
      "The squeeze is in the missing middle.",
    ),
    choice(
      "crit-c3-options-q2",
      "An appeal to emotion misleads when:",
      ["Anyone feels anything", "Feeling is treated as enough to settle a factual or causal claim", "Stakes are mentioned at all"],
      1,
      "Stakes can be real. They still do not prove the mechanism.",
    ),
    choice(
      "crit-c3-options-q3",
      "Which reply best opens a false dichotomy?",
      ["You’re manipulative.", "I reject the pair of options. Here’s a third.", "Whatever."],
      1,
      "Name the third option. Do not only name the fallacy.",
    ),
  ],
);

const c4Slope = lesson(
  "crit-c4-slope",
  "Slippery slope and bandwagon",
  5,
  "Demand the middle steps, not the scary ending.",
  [
    explain(
      "crit-c4-slope-ex",
      "Mechanism, or momentum",
      `Slippery slope: “If we allow A, Z will follow,” with no mechanism for the steps in between. Some slopes are real. One missed invoice really can trigger a fee schedule. The fallacy is the unsupported slide. Ask what the actual next step is, and what stops it.

Bandwagon: “Everyone is switching, so it is true, or you should too.” Popularity is evidence about popularity. It is weak evidence about truth, and only sometimes evidence about coordination, as in “drive on the right because everyone here does.”

Do not reverse the fallacy into “popular things are always wrong.”`,
    ),
    match(
      "crit-c4-slope-match",
      "Mechanism or momentum?",
      [
        { left: "If students retake one quiz, soon grades will mean nothing", right: "Slippery slope — the steps in between were skipped" },
        { left: "Every team uses this tool, so the tool’s security claims are true", right: "Bandwagon — adoption is not an audit" },
      ],
      "A retake policy can have a cap. The slope skipped it. Headcount does not audit a security claim.",
    ),
    choice(
      "crit-c4-slope-q1",
      "A slippery-slope claim is reasonable only if:",
      ["The end state is scary", "The intermediate steps are specified and plausible", "Someone says “inevitably”"],
      1,
      "Fear of the end is not a mechanism.",
    ),
    choice(
      "crit-c4-slope-q2",
      "Bandwagon reasoning confuses:",
      ["“Many people do or believe this” with “this is true”", "A sample with a population in a fair way", "Authority with anonymity"],
      0,
      "Headcount is a different question from truth. Coordination cases are the exception, and they should be named as coordination.",
    ),
    choice(
      "crit-c4-slope-q3",
      "“Everyone believes it” should usually be answered with:",
      ["Then it is settled.", "What is the evidence, apart from the headcount?", "Then it is false."],
      1,
      "Do not reverse the fallacy into “popular things are always wrong.”",
    ),
  ],
);

const c4Scope = lesson(
  "crit-c4-scope",
  "Weak authority and hasty generalization",
  6,
  "Narrow the sample. Check the expert’s domain.",
  [
    explain(
      "crit-c4-scope-ex",
      "Whose expertise, and how wide a net",
      `Appeal to authority is not always a fallacy. A relevant expert, in their domain, summarizing a field, is a legitimate shortcut. It becomes weak when the person is expert in a different domain, the field itself is split and you only heard one side, the claim is “because they are famous,” or you cannot find what the expert actually said.

Hasty generalization: a tiny or biased sample is treated as the pattern. “Two freelancers ghosted me, so freelancers are unreliable.” The fix is scope: “two people I found this way ghosted me.”`,
      {
        example: "“All meetings are a waste. Ours ran long today and yesterday.” Better: the last two status meetings ran long and did not produce decisions. That does not cover all meetings.",
      },
    ),
    short(
      "crit-c4-scope-short",
      "Rewrite “All meetings are a waste. Ours ran long today and yesterday.” Narrow the scope. Use the words meetings, decisions, and scope.",
      ["meetings", "decisions", "scope"],
      "The last two of our status meetings ran long and did not produce decisions. I do not know about all meetings. That is the honest scope.",
    ),
    choice(
      "crit-c4-scope-q1",
      "Citing an expert is weakest when:",
      [
        "They work in that field and you can check the claim",
        "Their fame or a different field is doing all the work",
        "They state a limit on their own knowledge",
      ],
      1,
      "Relevance and checkability make authority useful.",
    ),
    choice(
      "crit-c4-scope-q2",
      "Hasty generalization means:",
      ["Drawing a wide conclusion from too little or too biased a sample", "Any use of an example", "Refusing to generalize ever"],
      0,
      "Examples are allowed. Overreach is the error.",
    ),
    choice(
      "crit-c4-scope-q3",
      "A repaired generalization usually:",
      ["Says “always” more loudly", "Narrows the scope to the cases actually observed", "Switches to an ad hominem"],
      1,
      "Scope is the repair.",
    ),
  ],
);

const c5Ladder = lesson(
  "crit-c5-ladder",
  "A ladder of evidence",
  5,
  "A true story can still be weak evidence.",
  [
    explain(
      "crit-c5-ladder-ex",
      "Rungs, from anecdote to method",
      `Not all support is equal. A practical ladder, from weaker to stronger for everyday claims:

- A vivid anecdote.
- A stack of similar anecdotes, still selected.
- A single comparison without controls. “Sales rose after the redesign” — after is not because.
- A comparison with a baseline and a rival explanation considered.
- Repeated findings, a clear method, and stated limits.

You will rarely hold a perfect study in a chat argument. You can still refuse to treat the bottom rung as if it were the top. Ask: comparison to what, how many cases, who was left out, what else changed at the same time?`,
    ),
    map(
      "crit-c5-ladder-map",
      "Rank these supports for “cold showers improve mood,” strongest first.",
      [
        "A small trial found a modest mood difference versus a control, and the authors state a limit",
        "The whole team swears by cold showers",
        "One person felt amazing after a single shower",
      ],
      "The trial is a comparison with a stated limit. It is still not gospel. The team is a stack of anecdotes. One amazing shower is the bottom rung. A true story can still be weak evidence for “in general.”",
    ),
    short(
      "crit-c5-ladder-limit",
      "The trial is the strongest of the three, and it is still not gospel. Name one limit, such as its size or who enrolled. Use the words small and limit.",
      ["small", "limit"],
      "The trial is small, and the authors already state a limit on who it applies to. A modest difference is not a universal result.",
    ),
    choice(
      "crit-c5-ladder-q1",
      "An anecdote is weak evidence for a general claim because:",
      ["Stories are always false", "One case cannot show the pattern, the rate, or what would have happened otherwise", "Only laboratories count"],
      1,
      "Stories can be true and still be poor evidence for “in general.”",
    ),
    choice(
      "crit-c5-ladder-q2",
      "“After we changed X, Y happened” does not by itself show:",
      ["That Y happened", "That X caused Y", "That anyone noticed Y"],
      1,
      "Other things changed too. You need a comparison.",
    ),
    choice(
      "crit-c5-ladder-q3",
      "Stronger evidence usually includes:",
      ["More confidence and fewer details", "A comparison, a method you can describe, and a stated limit", "A famous name only"],
      1,
      "Method plus humility beats volume.",
    ),
  ],
);

const c5Cause = lesson(
  "crit-c5-cause",
  "Correlation, causation, and base rates",
  6,
  "Together is not caused-by.",
  [
    explain(
      "crit-c5-cause-ex",
      "Three rivals, and the background rate",
      `Correlation: two things move together. Causation: one changes the other. Ice cream sales and swimming accidents rise together because heat drives both. The correlation is real. The ice cream is not the cause.

Three rivals whenever A and B move together:

- A causes B.
- B causes A.
- C causes both.

Base rate: how common the thing is before the new clue. A rare event can produce a scary test result that is still usually a false alarm. You do not need a formula here. You need the question: out of everyone, how often is this true before I add this one story?

A base rate is availability’s numerical cousin. Without the background rate, one vivid case hijacks the estimate.`,
      {
        example:
          "People who own running shoes report better cardiovascular health, so the shoes cause the health. Rivals: healthier people buy shoes. Income or free time causes both. The shoes might do nothing.",
      },
    ),
    short(
      "crit-c5-cause-short",
      "“People who own running shoes report better health, so the shoes cause the health.” Name a rival story. Use the words healthier, income, and cause.",
      ["healthier", "income", "cause"],
      "Healthier people may buy the shoes, so the health could cause the purchase. Income or free time could cause both. The shoes might not be the cause.",
    ),
    choice(
      "crit-c5-cause-q1",
      "Correlation means:",
      ["One thing must cause the other", "Two things vary together", "The relationship is a coincidence by definition"],
      1,
      "Cause is a further claim.",
    ),
    choice(
      "crit-c5-cause-q2",
      "When A and B correlate, a complete first pass considers:",
      ["Only “A causes B”", "A causes B, B causes A, and a third factor", "Only anecdotes"],
      1,
      "The three-rival check stops the first story from sticking.",
    ),
    choice(
      "crit-c5-cause-q3",
      "A base rate matters because:",
      ["A new clue is interpreted against how common the thing already is", "Rare things never happen", "Stories override numbers by rules of logic"],
      0,
      "Without the background rate, one vivid case hijacks the estimate.",
    ),
  ],
);

const c6Audit = lesson(
  "crit-c6-audit",
  "The four-question audit",
  5,
  "Audit yourself before you lock it in.",
  [
    explain(
      "crit-c6-audit-ex",
      "Before you commit",
      `Use this before you commit, not as a way to shame yourself after.

- Confirmation: what did I avoid reading?
- Availability: am I moved by a vivid case more than by the dull numbers?
- Anchoring: what number or option showed up first, and did I generate my own before that?
- Overconfidence from thin skill: have I done this enough times to trust my feel, or do I need a checklist or a second person?

You will not clear every bias. You will catch the one most likely to swing this decision. The same four shortcuts are taught as psychology on the other path. Here they are a checklist.

“N/A” is allowed only with a reason. “No number was involved, so the anchor is N/A.”`,
    ),
    short(
      "crit-c6-audit-short",
      "State one opinion you held this week. Answer all four in one line each, and use the words confirmation, availability, anchor, and feedback. If a question truly does not apply, say why.",
      ["confirmation", "availability", "anchor", "feedback"],
      "I thought the new tool was a waste. Confirmation: I skipped the team’s usage notes. Availability: one bad demo was louder than the quiet weeks it worked. Anchor: the first price was high, and I never wrote my own range. Feedback: I have used it twice, so I should ask someone who uses it daily.",
    ),
    choice(
      "crit-c6-audit-q1",
      "The audit is meant to be used:",
      ["Only to criticize other people", "Before you lock a decision", "As proof you have no biases left"],
      1,
      "Timing is the point. Afterward, people defend.",
    ),
    choice(
      "crit-c6-audit-q2",
      "“I remember a horror story, so the risk is high” should trigger:",
      ["Anchoring only", "Availability, and a request for the base rate", "Nothing, stories are best"],
      1,
      "Ease of recall is not a rate.",
    ),
    choice(
      "crit-c6-audit-q3",
      "If you have done a task twice, your confidence should lean on:",
      ["Your feel alone", "A checklist or outside feedback, because self-assessment is still thin", "A personality label"],
      1,
      "Early feel is a poor instrument. That is the careful reading of the Dunning–Kruger pattern.",
    ),
  ],
);

const c6Steel = lesson(
  "crit-c6-steel",
  "Steelmanning on purpose",
  6,
  "Write the other side so they would sign it.",
  [
    explain(
      "crit-c6-steel-ex",
      "A version they would recognize",
      `Write the best version of the view you do not hold, in terms a calm supporter would accept. Then say what evidence would make you move. If you cannot describe your own change-condition, you are collecting armor, not thinking.

- Their claim, fairly.
- Best reason.
- What would change my mind.
- My current lean, and the single weakest point in it.

The topic is a vehicle. Grade the four lines, not the politics. A fair claim that contains a sneer fails the spirit of the exercise.`,
    ),
    short(
      "crit-c6-steel-short",
      "Write four lines on a view you do not hold. If you are stuck, use “remote work is net harmful,” “zoos should close,” or “AI tutors replace practice.” Use the words claim, reason, change, and weakest. Line one cannot be a sneer.",
      ["claim", "reason", "change", "weakest"],
      "Their claim, fairly: some people do worse at home because the boundary between work and the rest of the day collapses. Best reason: a few teams measured slower decisions after going fully remote. What would change my mind: a comparison that holds the work constant and still finds a lasting loss. My lean is that hybrid works for me, and the weakest point is that I mostly have anecdotes.",
    ),
    choice(
      "crit-c6-steel-q1",
      "A steelman is:",
      ["Agreeing with the other view", "The strongest fair version of a view, stated so a supporter would recognize it", "A straw man with polite wording"],
      1,
      "Recognition by a supporter is the test.",
    ),
    choice(
      "crit-c6-steel-q2",
      "“Nothing could change my mind” is a sign that:",
      ["The view is certainly true", "The view is being protected rather than tested", "You have finished critical thinking"],
      1,
      "Untouchable views are not in the game of evidence.",
    ),
    choice(
      "crit-c6-steel-q3",
      "Naming your own weakest point helps because:",
      ["It shows where new evidence should be aimed", "It ends the discussion", "It replaces the need for premises"],
      0,
      "Attention goes to the joint that might actually break.",
    ),
  ],
);

const c7Criteria = lesson(
  "crit-c7-criteria",
  "Criteria first",
  5,
  "Criteria first, options second.",
  [
    explain(
      "crit-c7-criteria-ex",
      "Write the rules before the favorite talks",
      `A decision gets captured by the option you happen to see first, or by the one that feels like you. Write criteria while the options are still behind a curtain.

- State the decision in one sentence.
- List three to five criteria that matter: cost, time, reversibility, values you actually hold.
- Mark must-haves versus nice-to-haves.
- Only then score options.
- Check the score against your gut. If they disagree, do not automatically obey either. Find the missing criterion or the bias.

Reversibility matters. Easy-to-undo choices can be made faster. Hard-to-undo choices deserve the audit from the bias checklist. The app should not declare a universal winner. It should check that criteria existed before scores.`,
    ),
    short(
      "crit-c7-criteria-short",
      "Pick how to practice this path next week: 10 minutes daily, 40 minutes twice a week, or weekend only. Write criteria before you score. Include a must-have you can keep on a bad day. Use the words criteria, must, and score.",
      ["criteria", "must", "score"],
      "Criteria first: it must still happen on a bad day, it has to fit a normal week, and I can reverse it next Monday. Then I score ten minutes daily highest, because the must-have survives a tired evening.",
    ),
    choice(
      "crit-c7-criteria-q1",
      "Criteria should be written:",
      ["Before you fall in love with an option", "After you know which option you want, so the criteria fit", "Only for irreversible life choices"],
      0,
      "Otherwise you reverse-engineer reasons.",
    ),
    choice(
      "crit-c7-criteria-q2",
      "If your gut and your scored criteria clash, you should:",
      ["Always trust the gut", "Always trust the score", "Look for a missing criterion or a bias before you pick a side"],
      2,
      "The clash is information.",
    ),
    choice(
      "crit-c7-criteria-q3",
      "Easy-to-undo decisions can be made faster because:",
      ["They don’t have consequences", "The cost of a wrong pick is limited and you can update", "Biases do not apply"],
      1,
      "Reversibility changes how much process you need, not whether reasons exist.",
    ),
  ],
);

const c7Second = lesson(
  "crit-c7-second",
  "Second-order effects",
  6,
  "Ask “and then what?”",
  [
    explain(
      "crit-c7-second-ex",
      "The result, and what the result causes",
      `First-order: the immediate result. Second-order: what that result causes next, including how your own behavior changes.

Ask once: “And then what?” Ask twice for big or sticky choices. You will not predict everything. You will catch the obvious rebound.

The design lesson in the quiz example is low shame plus the effective method, not comfort instead of the method.`,
      {
        example:
          "“I’ll keep every notification on so I never miss a task.” First-order: faster awareness. Second-order: fractured attention, more anxiety, worse work, more notifications. “I’ll make the quiz optional so learning stays fun.” First-order: less pressure. Second-order: less retrieval, weaker memory, more illusion of fluency from rereading.",
      },
    ),
    short(
      "crit-c7-second-short",
      "Write one first-order win and one plausible later cost for a choice in your week, or for making quizzes optional. Use the words first, later, and because.",
      ["first", "later", "because"],
      "First, optional quizzes feel lighter. Later, people skip retrieval and remember less, because the easy reread felt like learning.",
    ),
    choice(
      "crit-c7-second-q1",
      "A second-order effect is:",
      ["The immediate benefit", "A later consequence of that first result", "A logical fallacy name"],
      1,
      "“And then what?” reaches it.",
    ),
    choice(
      "crit-c7-second-q2",
      "Why ask the question more than once for a sticky choice?",
      ["To delay forever", "The first consequence often creates another", "One question is a fallacy"],
      1,
      "Chains, not a single hop.",
    ),
    choice(
      "crit-c7-second-q3",
      "Making quizzes optional can backfire if:",
      [
        "The thing that feels lighter also removes retrieval, which was helping memory",
        "All practice must be painful to work",
        "Fun and learning cannot coexist",
      ],
      0,
      "The design lesson is low shame plus the effective method, not comfort instead of the method.",
    ),
  ],
);

const c8Protocol = lesson(
  "crit-c8-protocol",
  "Argument autopsy protocol",
  6,
  "Name the weak joint, then say how to strengthen it.",
  [
    explain(
      "crit-c8-protocol-ex",
      "A fixed order, before “fallacy!”",
      `For any short passage, run this fixed order. Do not skip ahead to the label.

- Type: taste, factual claim, or recommendation?
- Conclusion in one clause.
- Premises, including one hidden assumption if needed.
- Strongest fair version, in one sentence.
- Weak joint: fallacy, evidence rung, or missing comparison.
- What would strengthen it.

This module mixes every move. Missed labels are worth another look on a later day, the same way a missed card comes back sooner.

Worked pass on: “This diet is the only responsible choice. My cousin lost 8 kilos, every influencer is on it, and if you don’t start now you’ll never be healthy.”

- Type: a recommendation, with factual decorations.
- Conclusion: you should adopt this diet now.
- Premises: the cousin’s result, influencer adoption, and the claim that delay means permanent failure. Hidden: the cousin’s result will be yours, and adoption shows health rather than marketing.
- Fair version: some structured diets help some people lose weight, and an early start can matter if the alternative is no plan.
- Weak joints: a false “only,” a slippery health slope, a bandwagon, and one cousin treated as the pattern.
- Strengthen it with a comparison, base rates, who the diet fails, and a reversible trial.`,
    ),
    map(
      "crit-c8-protocol-map",
      "Put the autopsy steps in the order you should run them.",
      [
        "Type the sentence: taste, factual claim, or recommendation",
        "State the conclusion in one clause",
        "List the premises, including a hidden assumption if needed",
        "Write the strongest fair version in one sentence",
        "Name the weak joint",
        "Say what would strengthen it",
      ],
      "Type, then conclusion, then premises, then the fair version, then the weak joint, then the repair. The label comes late on purpose.",
    ),
  ],
);

const c8Board = lesson(
  "crit-c8-board",
  "Mixed board",
  8,
  "Name the weak joint, then say how to strengthen it.",
  [
    explain(
      "crit-c8-board-ex",
      "Eight fresh items",
      `Each item is one label. The explanation names the repair. After the board, run the six-step autopsy on a claim you actually heard, or on the diet passage.

The module is in good shape when you can name the weak joint and say how to strengthen it. If you also finished the cognitive-biases module on the psychology path, you can explain the shortcut and interrupt it.`,
    ),
    choice(
      "crit-c8-board-q1",
      "“You’re either serious about this course or you’re wasting my time.” Best label?",
      ["False dichotomy", "Bandwagon", "Weak authority", "Hasty generalization"],
      0,
      "Name a third option, such as a smaller weekly goal. The squeeze is the missing middle.",
    ),
    choice(
      "crit-c8-board-q2",
      "“I reread the notes twice and they felt familiar, so I’ll remember them on Friday.” Best label?",
      ["Slippery slope", "Fluency is not retrieval", "Anchoring", "After is not because"],
      1,
      "Familiarity from rereading is a weak signal of later recall. Repair: one closed-book recall tomorrow.",
    ),
    choice(
      "crit-c8-board-q3",
      "“We launched the feature and signups rose, so the feature caused the rise.” Best label?",
      ["Bandwagon", "False dichotomy", "After is not because", "Weak authority"],
      2,
      "Ask what else changed and what the baseline was. After is not because.",
    ),
    choice(
      "crit-c8-board-q4",
      "“Professor Kim, a famous architect, says this vitamin cures colds.” Best label?",
      ["Hasty generalization", "Anchoring", "Slippery slope", "Weak authority"],
      3,
      "Fame in a different domain is doing the work. Look for relevant evidence, not a bigger celebrity.",
    ),
    choice(
      "crit-c8-board-q5",
      "“Everyone in the thread agrees the study is fake, so it is fake.” Best label?",
      ["Bandwagon", "False dichotomy", "Fluency is not retrieval", "Anchoring"],
      0,
      "Ask what the study shows and what the criticism’s evidence is. Agreement is not the finding.",
    ),
    choice(
      "crit-c8-board-q6",
      "“Two late buses mean the whole transit system is broken.” Best label?",
      ["Weak authority", "Hasty generalization", "Slippery slope", "After is not because"],
      1,
      "Narrow the scope, then ask for on-time rates.",
    ),
    choice(
      "crit-c8-board-q7",
      "“If we allow one remote day, no one will ever come to the office again.” Best label?",
      ["Anchoring", "Bandwagon", "Slippery slope", "Fluency is not retrieval"],
      2,
      "Name the next step and what policy stops the slide. A scary ending is not a mechanism.",
    ),
    choice(
      "crit-c8-board-q8",
      "You are about to take the first price a contractor quotes. Best label?",
      ["False dichotomy", "Hasty generalization", "Weak authority", "Anchoring"],
      3,
      "Write your own range from comparable work before you respond. The first number is a frame.",
    ),
    short(
      "crit-c8-board-autopsy",
      "Paste or write a claim you heard this month, or use the diet passage. Fill six lines and use these words: type, conclusion, premise, fair, weak, strengthen. The fair line cannot be a sneer. The last line must strengthen the claim, not dunk on it.",
      ["type", "conclusion", "premise", "fair", "weak", "strengthen"],
      "Type: a recommendation. Conclusion: I should start this diet now. Premise: one cousin’s result, plus a hidden assumption that it will be mine. Fair version: some structured diets help some people, and a start can matter. Weak joint: one case and a false “only / never.” Strengthen it with a comparison and a reversible two-week trial.",
    ),
  ],
);

function courseModule(id: string, title: string, summary: string, lessons: Lesson[]): Module {
  return { id, title, summary, lessons };
}

export const criticalThinking: Topic = {
  slug: "critical-thinking",
  title: "Critical Thinking and Logic",
  blurb: "See what a claim is actually saying, test the reasons, and decide on purpose. Naming a fallacy is not winning. Say what would make the claim stronger.",
  difficulty: "beginner",
  minutes: 91,
  source: "sample",
  modules: [
    courseModule("crit-c1", "What critical thinking is", "Goal: define the skill as testing claims, not as being negative. Badge: Clear Eye.", [c1Critical, c1Claims]),
    courseModule("crit-c2", "Arguments and claims", "Goal: pull premises and conclusions apart, including hidden ones. Badge: Unpacker.", [c2Skeleton, c2Hidden]),
    courseModule(
      "crit-c3",
      "Fallacies, part 1",
      "Goal: catch four fallacies that attack the person, the position, the options, or the feelings. Badge: Fallacy Hunter I. After every catch, say what a stronger version would need.",
      [c3Person, c3Options],
    ),
    courseModule(
      "crit-c4",
      "Fallacies, part 2",
      "Goal: catch slippery slopes, bandwagons, weak authority, and hasty generalizations. Badge: Fallacy Hunter II.",
      [c4Slope, c4Scope],
    ),
    courseModule("crit-c5", "Evaluating evidence", "Goal: rank evidence and separate correlation from causation. Badge: Weigher.", [c5Ladder, c5Cause]),
    courseModule(
      "crit-c6",
      "Biases in your own reasoning",
      "Goal: turn bias knowledge into a pre-decision checklist. Badge: Self-Auditor. Shared with Psychology Fundamentals: that path teaches the shortcuts. This one interrupts them.",
      [c6Audit, c6Steel],
    ),
    courseModule("crit-c7", "Decisions", "Goal: choose with criteria written before the favorite option talks you into them. Badge: Decider.", [c7Criteria, c7Second]),
    courseModule(
      "crit-c8",
      "Practice lab",
      "Goal: mix every move on fresh items. Badge: Autopsy. Name the weak joint, then say how to strengthen it.",
      [c8Protocol, c8Board],
    ),
  ],
};
