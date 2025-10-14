import type { Transitions } from "./types";

export function buildTransitions(input: string, min: number): Transitions {
  const reworkedText: string = input.replace(/[^\p{L}]/gu, "").toLowerCase();
  const charArray: string[] = Array.from(reworkedText);

  if (charArray.length < min) {
  throw new Error(`Need at least ${min} letters to train (currently ${charArray.length}).`);
  }

  const transitions: Transitions = {};
  for (let i = 0; i < charArray.length - 1; i++) {
    const currentChar = charArray[i];
    const nextChar = charArray[i + 1];
    if (!transitions[currentChar]) {
      transitions[currentChar] = {};
    }
    if (!transitions[currentChar][nextChar]) {
      transitions[currentChar][nextChar] = 0;
    }
    transitions[currentChar][nextChar]++;
  }
  return transitions;
}

 export function sampleNextChar(letter: string, transitions: Transitions, rng: () => number = Math.random): string {
  const next = transitions[letter.toLowerCase()];
  if (!next) return "";

  const entries = Object.entries(next);
  let total = 0;
  for (const [, c] of entries) total += c;
  if (total <= 0) return "";


  const r = rng() * total;
  let acc = 0;
  for (const [ch, c] of entries) {
    acc += c;
    if (r < acc) return ch;
  }
  return entries[entries.length - 1][0];
}

export function findMostLikelyNextChar(Pletter: string, transitions: Transitions): string {
  const letter = Pletter.toLowerCase();
  const nextLettersObj = transitions[letter];

  if (!nextLettersObj) return "";
  const nextLetters = Object.keys(nextLettersObj);
  let mostPosibleNextChar = "";
  let highestCount = 0;

  for (let i = 0; i < nextLetters.length; i++) {
    const nextChar = nextLetters[i];
    const count = nextLettersObj[nextChar];
    if (count > highestCount) {
      highestCount = count;
      mostPosibleNextChar = nextChar;
    }
  }
  return mostPosibleNextChar;
}

function getRandomChar(transitions:Transitions): string {
    const keys = new Set<string>(Object.keys(transitions));
  for (const childMap of Object.values(transitions)) {
    for (const ch of Object.keys(childMap)) keys.add(ch);
  }
  if (keys.size === 0) return "";
  const arr = Array.from(keys);
  return arr[Math.floor(Math.random() * arr.length)];
}

function isLetter(char: string): boolean {
  return /^[\p{L}]$/u.test(char);
}


export const predictFromLast = (
  value: string,
  transitions: Transitions,
  setNextChar: (c: string) => void,
  opts?: {
    deterministic?: boolean;
    rng?: () => number;
    epsilon?: number;
  }
) => {
  const rng = opts?.rng ?? Math.random;
  const epsilon = Math.max(0, Math.min(1, opts?.epsilon ?? 0.05));

  const lastChar = value.slice(-1).toLowerCase();
  if (!lastChar || !isLetter(lastChar)) {
    setNextChar("");
    return;
  }

  if (!transitions[lastChar]) {
    setNextChar(getRandomChar(transitions));
    return;
  }

  if (!opts?.deterministic && rng() < epsilon) {
    setNextChar(getRandomChar(transitions));
    return;
  }

  if (opts?.deterministic) {
    setNextChar(findMostLikelyNextChar(lastChar, transitions));
  } else {
    setNextChar(sampleNextChar(lastChar, transitions, rng));
  }
};

