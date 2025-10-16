import { RANDOMISER } from "./config";
import type { Transitions } from "./types";

function getRandomChar(transitions:Transitions): string {
  const keys = new Set<string>(Object.keys(transitions));

  for (const childMap of Object.values(transitions)) {
    for (const ch of Object.keys(childMap)) keys.add(ch);
  }

  if (keys.size === 0) return "";
  const arr = Array.from(keys);
  return arr[Math.floor(Math.random() * arr.length)];
}

function predictNextChar(letter: string, transitions: Transitions): string {
  if (Math.random() < RANDOMISER) return getRandomChar(transitions)

  const nextMap = transitions[letter];
  const entries = Object.entries(nextMap);
  let total = 0;

  for (let i = 0; i < entries.length; i++) {
    const count = entries[i][1];
    total += count;
  }
  if (total <= 0) return "";

  const r = Math.random() * total;
  let acc = 0;

  for (let i = 0; i < entries.length; i++) {
    const ch = entries[i][0];
    const count = entries[i][1];
    acc += count;
    if (r < acc) return ch;
  }
  return entries[entries.length - 1][0];
}

export function buildTransitions(input: string, min: number): Transitions {
  // const reworkedText: string = input.replace(/[^\p{L}]/gu, "").toLowerCase();
  
  const charArray: string[] = Array.from(input);

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

export const predictFromLast = (value: string,transitions: Transitions) => {
  const lastChar = value.slice(-1)
  if (!lastChar) return "";
  if (!transitions[lastChar]) return getRandomChar(transitions);
  return predictNextChar(lastChar, transitions);
}

