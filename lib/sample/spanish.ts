import type { Topic } from "../types";

/** Beginner Spanish you can say out loud. Accents are accepted with or without marks. */
export const spanishSentences: Topic = {
  slug: "spanish-sentences",
  title: "Spanish in real sentences",
  blurb: "Ser, estar, and regular present-tense verbs, practiced in lines you might actually say.",
  difficulty: "beginner",
  minutes: 20,
  source: "sample",
  modules: [
    {
      id: "es-ser",
      title: "Ser and estar",
      summary: "Two verbs that both show up as 'is', with different jobs.",
      lessons: [
        {
          id: "es-split",
          title: "Two ways to say is",
          minutes: 5,
          summary: "Ser for what something is. Estar for a state or a place.",
          blocks: [
            {
              id: "es-split-ex",
              type: "explain",
              heading: "Name tag, or mood and map pin",
              body: "Spanish splits the English verb 'to be'. Ser covers what something is: identity, job, lasting traits, where an event happens. Estar covers how something is right now, and where a person or object is located. If you can swap in 'right now' or point at a spot on a map, you usually want estar.",
              analogy: "Ser is the name tag. Estar is the mood ring and the map pin.",
              example: "Ella es médica. Ella está cansada. El café está en la esquina.",
            },
            {
              id: "es-split-choice",
              type: "activity",
              activity: {
                id: "es-split-q",
                type: "choice",
                prompt: "Why does 'La sopa está caliente' use estar?",
                options: [
                  "Because hot is how the soup is right now",
                  "Because soup is always a profession",
                  "Because estar is the only verb for food",
                  "Because caliente is a place",
                ],
                answerIndex: 0,
                explain: "Temperature here is a state, not the soup's identity. Once it cools, the sentence changes. That is estar.",
              },
            },
            {
              id: "es-split-blank",
              type: "activity",
              activity: {
                id: "es-soy",
                type: "blank",
                prompt: "Yo ____ estudiante de español.",
                answers: ["soy"],
                explain: "Being a student is identity, so this is ser. Yo soy. Estoy would say you are temporarily in a student-like state, which is not the usual line.",
              },
            },
          ],
        },
        {
          id: "es-cafe",
          title: "At the cafe",
          minutes: 5,
          summary: "Pick ser or estar while someone is talking to you.",
          blocks: [
            {
              id: "es-cafe-ex",
              type: "explain",
              heading: "Order, location, and how the coffee is",
              body: "In a cafe you need both verbs. The cafe's identity uses ser: es un café pequeño. Where it sits uses estar: está en la esquina. How the coffee is doing right now uses estar: está rico, está frío. Your job, if you mention it, uses ser: soy camarero, or soy cliente.",
              example: "El café está rico. La taza está en la mesa. Marta es la dueña.",
            },
            {
              id: "es-cafe-scene",
              type: "activity",
              activity: {
                id: "es-cafe-scenario",
                type: "scenario",
                setup: "You take a sip and the waiter asks how the coffee is. You want to say it is cold.",
                prompt: "Which line fits?",
                options: [
                  "El café es frío.",
                  "El café está frío.",
                  "El café soy frío.",
                  "El café estás frío.",
                ],
                answerIndex: 1,
                explain: "Cold is the coffee's state right now, so estar: está. 'Es frío' would treat cold as its personality. Soy and estás are the wrong person.",
              },
            },
            {
              id: "es-cafe-choice",
              type: "activity",
              activity: {
                id: "es-madrid",
                type: "choice",
                prompt: "You want to say Madrid is in Spain. Which sentence is the usual one?",
                options: [
                  "Madrid está en España.",
                  "Madrid es en España.",
                  "Madrid soy en España.",
                  "Madrid estás España.",
                ],
                answerIndex: 0,
                explain: "Location of a place uses estar. Madrid está en España. Ser shows up for where an event is held, which is a different sentence.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "es-present",
      title: "Present tense regulars",
      summary: "The ending tells you who is doing it.",
      lessons: [
        {
          id: "es-endings",
          title: "The ending carries the person",
          minutes: 5,
          summary: "Drop the infinitive ending, add the present ending.",
          blocks: [
            {
              id: "es-endings-ex",
              type: "explain",
              heading: "Who is hiding in the last letters",
              body: "A regular present verb keeps its stem and swaps the ending. Hablar (to speak) loses -ar. Yo hablo, tú hablas, ella habla, nosotros hablamos, ellos hablan. Comer and vivir do the same job with -er and -ir endings. The pronoun is often optional because the ending already names the person.",
              example: "Yo hablo inglés. Nosotros comemos a las dos. Ellos viven aquí.",
            },
            {
              id: "es-endings-match",
              type: "activity",
              activity: {
                id: "es-endings-pairs",
                type: "match",
                prompt: "Match the person to the form of hablar.",
                pairs: [
                  { left: "yo", right: "hablo" },
                  { left: "tú", right: "hablas" },
                  { left: "nosotros", right: "hablamos" },
                  { left: "ellos", right: "hablan" },
                ],
                explain: "-o is yo, -as is tú, -amos is nosotros, -an is ellos or ellas. The stem habl- stays put.",
              },
            },
            {
              id: "es-endings-blank",
              type: "activity",
              activity: {
                id: "es-comemos",
                type: "blank",
                prompt: "Nosotros ____ (comer) a las dos.",
                answers: ["comemos"],
                explain: "Comer is an -er verb. Nosotros takes -emos: comemos. The stem is com-.",
              },
            },
          ],
        },
        {
          id: "es-say",
          title: "Say it back",
          minutes: 5,
          summary: "Use a regular present verb, then explain the ending.",
          blocks: [
            {
              id: "es-say-ex",
              type: "explain",
              heading: "Habits live in the present",
              body: "The simple present covers what you do as a habit and what you are doing these days. Trabajo los lunes. Vivimos en esta calle. You do not need a separate word for 'am working' in ordinary speech. Pick the person, keep the stem, attach the ending.",
              example: "Ella vive cerca. Tú comes demasiado rápido. Yo hablo con mi hermana.",
            },
            {
              id: "es-say-choice",
              type: "activity",
              activity: {
                id: "es-viven",
                type: "choice",
                prompt: "Ellos ____ en Madrid. The verb is vivir.",
                options: ["viven", "vivo", "vives", "vivimos"],
                answerIndex: 0,
                explain: "Ellos takes the -en ending on an -ir verb: viven. Vivo is yo, vives is tú, vivimos is nosotros.",
              },
            },
            {
              id: "es-say-teach",
              type: "activity",
              activity: {
                id: "es-teach-ending",
                type: "teach",
                prompt: "Explain to a friend why Spanish verb endings change, using hablar as the example.",
                keyPoints: [
                  "the ending shows the person",
                  "yo hablo",
                  "stem stays the same",
                  "pronoun can be dropped",
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
