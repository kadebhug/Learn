import type { Topic } from "../types";

/** Beginner machine learning, written so the demo works with no API key. */
export const machineLearning: Topic = {
  slug: "machine-learning",
  title: "Machine learning, without the fog",
  blurb: "What a model is, how it learns from examples, and how it can fool you.",
  difficulty: "beginner",
  minutes: 28,
  source: "sample",
  modules: [
    {
      id: "ml-model",
      title: "What a model actually is",
      summary: "A model finds a reusable pattern. It does not understand the job.",
      lessons: [
        {
          id: "ml-patterns",
          title: "Patterns, not magic",
          minutes: 4,
          summary: "A model is a rule fitted to examples.",
          blocks: [
            {
              id: "ml-patterns-ex",
              type: "explain",
              heading: "It repeats a pattern. It does not get the joke.",
              body: "A machine learning model is a pattern finder. You show it examples, and it builds a rule that would have worked on those examples. Then you point that rule at something new. The model does not know your goal. It only knows the pattern it was paid to match.",
              analogy: "A recipe card is not a chef. The card can repeat the steps. It cannot taste the soup and decide the salt is wrong.",
              example: "A spam filter that learned 'you won' plus a weird link is matching a pattern. It has not formed an opinion about fraud.",
            },
            {
              id: "ml-patterns-q",
              type: "activity",
              activity: {
                id: "ml-patterns-choice",
                type: "choice",
                prompt: "Which of these is a model doing its job?",
                options: [
                  "Memorizing one email and refusing to look at any other",
                  "Learning that prize language plus odd links often means spam",
                  "Reading the sender's mind",
                  "Deleting every email that arrives after 6pm",
                ],
                answerIndex: 1,
                explain: "The useful model found a pattern it can try on new mail. Memorizing one email, or a rule you typed by hand, is not that.",
              },
            },
          ],
        },
        {
          id: "ml-features",
          title: "Features and labels",
          minutes: 5,
          summary: "Features are the clues. The label is the answer on the practice set.",
          blocks: [
            {
              id: "ml-features-ex",
              type: "explain",
              heading: "You choose the clues. The label is the answer key.",
              body: "Features are what you hand the model: size, neighborhood, words in a review. The label is the answer on the training examples, such as the sale price or 'spam'. The model never sees the label for a new case. It has to guess from the features alone.",
              example: "To guess a house price you might pass square footage, bedrooms, and neighborhood. The label, while training, is the price it actually sold for.",
            },
            {
              id: "ml-features-match",
              type: "activity",
              activity: {
                id: "ml-features-pairs",
                type: "match",
                prompt: "Match each training setup to the label, the thing the model is learning to predict.",
                pairs: [
                  { left: "House size and neighborhood", right: "Sale price" },
                  { left: "Words in an email", right: "Spam or not" },
                  { left: "Photo of a leaf", right: "Plant species" },
                  { left: "Hours studied and sleep", right: "Exam score" },
                ],
                explain: "The label is the answer column. Everything you feed in beside it is a feature.",
              },
            },
            {
              id: "ml-features-blank",
              type: "activity",
              activity: {
                id: "ml-features-fill",
                type: "blank",
                prompt: "The answer you want the model to predict is called the ____.",
                answers: ["label", "the label"],
                explain: "Features are the inputs. The label is the answer the model is learning to predict.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "ml-learn",
      title: "How learning happens",
      summary: "Loss is the scoreboard. Training is a loop that tries to lower it.",
      lessons: [
        {
          id: "ml-loss",
          title: "Loss is a scoreboard",
          minutes: 4,
          summary: "Training nudges the model so the next guess is less wrong.",
          blocks: [
            {
              id: "ml-loss-ex",
              type: "explain",
              heading: "Wrongness you can measure",
              body: "Loss is a number for how wrong the current guesses are. A price model that misses by a lot has high loss. Training adjusts the model's inner knobs so the next pass scores a little better. Lower loss means closer to the answers it was shown. It does not, by itself, mean the model will work on new cases.",
              analogy: "Darts. You do not move the board. You change the next throw based on where the last one landed.",
            },
            {
              id: "ml-loss-choice",
              type: "activity",
              activity: {
                id: "ml-loss-q",
                type: "choice",
                prompt: "Training drives loss down. What did you actually buy?",
                options: [
                  "The model agrees more with the examples it practiced on",
                  "The model now understands the real world",
                  "The model will be perfect on new data",
                  "The features stopped mattering",
                ],
                answerIndex: 0,
                explain: "Lower training loss means a better fit to the practice set. New data is a separate question, which is why the next module exists.",
              },
            },
            {
              id: "ml-loss-scene",
              type: "activity",
              activity: {
                id: "ml-loss-scenario",
                type: "scenario",
                setup: "A classmate trains a model until the loss on the practice set is almost zero, then announces the model is ready for customers.",
                prompt: "What is the careful response?",
                options: [
                  "Celebrate. A loss near zero means it will work on new customers.",
                  "Ask how it does on examples it did not train on.",
                  "Add more features until the loss is exactly zero.",
                  "Turn the model off. Low loss means it is broken.",
                ],
                answerIndex: 1,
                explain: "A tiny practice loss can mean the model memorized. The honest test is data it has not seen.",
              },
            },
          ],
        },
        {
          id: "ml-loop",
          title: "The learning loop",
          minutes: 5,
          summary: "Data, guess, score, nudge. Then do it again.",
          blocks: [
            {
              id: "ml-loop-ex",
              type: "explain",
              heading: "Five beats, over and over",
              body: "Take a batch of examples. The model makes a prediction from the features. Compare that prediction with the label and call the gap the loss. Nudge the model in the direction that would have made the gap smaller. Repeat. That loop is the whole trick. There is no moment where the model 'gets it' in the human sense.",
              example: "Guess a price, see you were high by 40,000, nudge the 'size matters this much' knob down a hair, guess again.",
            },
            {
              id: "ml-loop-map",
              type: "activity",
              activity: {
                id: "ml-loop-order",
                type: "map",
                prompt: "Put the learning loop in order, from the start of one pass to the nudge.",
                steps: ["Data", "Model", "Prediction", "Loss", "Update"],
                explain: "Examples go in, the model guesses, the loss scores the miss, and the update nudges the model. Then the next batch starts at data again.",
              },
            },
            {
              id: "ml-loop-short",
              type: "activity",
              activity: {
                id: "ml-loop-write",
                type: "short",
                prompt: "In two or three sentences, describe one pass of the learning loop to someone who has never trained a model.",
                rubric: ["prediction from features", "compare to the label", "loss", "update or nudge the model"],
                sample: "The model looks at the features and makes a guess. Loss measures how far that guess is from the real label. The update nudges the model so the next guess is a bit closer.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "ml-honest",
      title: "Using a model honestly",
      summary: "Hold out an exam. Watch for memorization.",
      lessons: [
        {
          id: "ml-split",
          title: "The exam it has not seen",
          minutes: 5,
          summary: "Train on one pile. Judge the model on another.",
          blocks: [
            {
              id: "ml-split-ex",
              type: "explain",
              heading: "Practice worksheets are not the final",
              body: "Split the examples before you train. The training set is the worksheet. The test set is the exam, and the model does not study it. If you score the model on the same rows it trained on, you are grading the practice sheet. A good test score means the pattern survived contact with new rows.",
              analogy: "Studying last year's quiz, then sitting a new one. Quoting last year's answer key is not the same skill.",
            },
            {
              id: "ml-split-choice",
              type: "activity",
              activity: {
                id: "ml-split-q",
                type: "choice",
                prompt: "Why keep a test set out of training?",
                options: [
                  "So you can see whether the pattern works on new examples",
                  "So the model has less to learn and finishes faster",
                  "Because labels are only legal on the test set",
                  "So the loss can stay high",
                ],
                answerIndex: 0,
                explain: "The test set is a clean read on generalization. Once you peek and tune against it, it stops being clean.",
              },
            },
            {
              id: "ml-split-scene",
              type: "activity",
              activity: {
                id: "ml-split-scenario",
                type: "scenario",
                setup: "A friend says their photo model is 99% accurate. You ask, and they scored it on the same photos they trained on.",
                prompt: "What do you tell them?",
                options: [
                  "99% is the number to put on the box.",
                  "That number is a practice score. Try photos the model never trained on.",
                  "Accuracy above 90% always means the model memorized, so throw it out.",
                  "Add the test photos into training so the score can go higher.",
                ],
                answerIndex: 1,
                explain: "A high score on the training photos is allowed to look great. The claim that matters uses held-out photos.",
              },
            },
          ],
        },
        {
          id: "ml-overfit",
          title: "When it memorizes",
          minutes: 5,
          summary: "Overfitting is a model that learned the examples, not the pattern.",
          blocks: [
            {
              id: "ml-overfit-ex",
              type: "explain",
              heading: "Great on the homework. Lost on the new question.",
              body: "Overfitting is what you call it when the model hugs the training examples too tightly. It may remember noise: a quirk of those photos, a typo that happened to line up with the label. Training loss looks wonderful. Performance on new examples gets worse. The cure is usually less flexibility, more data, or an earlier stop.",
              analogy: "A student who memorizes the exact wording of three practice problems and freezes when the numbers change.",
            },
            {
              id: "ml-overfit-choice",
              type: "activity",
              activity: {
                id: "ml-overfit-q",
                type: "choice",
                prompt: "Which pattern is overfitting?",
                options: [
                  "Training score and test score are both decent and close",
                  "Training score is excellent and the test score is poor",
                  "Both scores are poor",
                  "The test score is higher than the training score by a little",
                ],
                answerIndex: 1,
                explain: "A wide gap, with training looking much better than the test, is the usual fingerprint of memorization.",
              },
            },
            {
              id: "ml-overfit-teach",
              type: "activity",
              activity: {
                id: "ml-overfit-back",
                type: "teach",
                prompt: "A friend says the model 'gets it' because it scored perfectly on the practice data. Explain overfitting to them in plain sentences.",
                keyPoints: [
                  "perfect on the practice or training examples",
                  "new examples or a test set",
                  "memorized noise or the specific rows",
                  "the pattern did not travel",
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
