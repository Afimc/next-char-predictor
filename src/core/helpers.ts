import { RANDOMISER } from "./config";
import type { Transitions, CharMap } from "./types";

function getRandomChar(transitions:Transitions): string {
  const keys = new Set<string>(Object.keys(transitions));

  for (const childMap of Object.values(transitions)) {
    for (const ch of Object.keys(childMap)) keys.add(ch);
  }

  if (keys.size === 0) return "";
  const arr = Array.from(keys);
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPick(nextMap: CharMap): string {
  const entries = Object.entries(nextMap);
  let total = 0;
  for (let i = 0; i < entries.length; i++) total += entries[i][1];
  if (total <= 0) return "";
  const r = Math.random() * total;
  let acc = 0;
  for (let i = 0; i < entries.length; i++) {
    const [ch, count] = entries[i];
    acc += count;
    if (r < acc) return ch;
  }
  return entries[entries.length - 1][0];
}

export function buildTransitions(input: string, min: number): Transitions {
  const charArray: string[] = Array.from(input);

  if (charArray.length < min) {
  throw new Error(`Need at least ${min} letters to train (currently ${charArray.length}).`);
  }

  const transitions: Transitions = {};
    for (let i = 0; i < charArray.length - 2; i++) {
      const a = charArray[i];
      const b = charArray[i + 1];
      const next = charArray[i + 2];
      const key = a + b; 

      if (!transitions[key]) transitions[key] = {};
      transitions[key][next] = (transitions[key][next] ?? 0) + 1;
  }
  return transitions;
}

export const predictFromLast = (value: string,transitions: Transitions) => {
 const chars = Array.from(value);
  if (chars.length < 1) return "";
  if (Math.random() < RANDOMISER) return getRandomChar(transitions);

  if (chars.length >= 2) {
    const key = chars.slice(-2).join("");
    const nextMap = transitions[key];
    if (nextMap) return weightedPick(nextMap);
  }
  
  return getRandomChar(transitions);
}

