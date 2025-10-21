import { RANDOMISER } from "./config";
import type { Transitions, CharMap, LastStats } from "./types";

function getRandomChar(transitions: Transitions): string {
  console.log("getRandomChar");
  const chars = new Set<string>();
  for (const childMap of Object.values(transitions)) {
    for (const ch of Object.keys(childMap)) {
      if (ch.length === 1) chars.add(ch);
    }
  }
  if (chars.size === 0) return "";
  const arr = Array.from(chars);
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildTop(nextMap: CharMap, topN = 5) {
  let total = 0;
  const items: Array<{ char: string; count: number }> = [];
  for (const [char, count] of Object.entries(nextMap)) {
    if (count > 0) {
      total += count;
      items.push({ char, count });
    }
  }
  if (total === 0 || items.length === 0) return [];
  return items
    .sort((a, b) => (b.count - a.count) || a.char.localeCompare(b.char))
    .slice(0, topN)
    .map(({ char, count }) => ({ char, count, probability: count / total }));
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
  const charArray = Array.from(input);
  if (charArray.length < min) {
    throw new Error(`Need at least ${min} letters to train (currently ${charArray.length}).`);
  }
  const transitions: Transitions = {};

  const inc = (key: string, next: string) => {
    const bucket = transitions[key] ?? (transitions[key] = {});
    bucket[next] = (bucket[next] ?? 0) + 1;
  };

  const L = charArray.length;
  for (let i = 0; i < L; i++) {
    if (i + 1 < L) inc(charArray[i], charArray[i + 1]);
    if (i + 2 < L) inc(charArray[i] + charArray[i + 1], charArray[i + 2]);
    if (i + 3 < L) inc(charArray[i] + charArray[i + 1] + charArray[i + 2], charArray[i + 3]);
  }
  return transitions;
}

export const predictFromLast = (value: string, transitions: Transitions): {char: string; stats: LastStats}=> {
  const chars = Array.from(value);
  const L = chars.length;
  const maxOrder = 3;

  if (L === 0) return { char: "", stats: null };
  if (Math.random() < RANDOMISER) return { char: getRandomChar(transitions), stats: { contextOrder: 0, contextKey: '', top: [], isRandomized: true }};

  for (let order = Math.min(maxOrder, L); order >= 1; order--) {
    const key = chars.slice(-order).join("");
    const nextMap = transitions[key];
    if (!nextMap) continue;

    const chosen = weightedPick(nextMap);
    const top = buildTop(nextMap, 5);
    return { char: chosen, stats: { contextOrder: order, contextKey: key, top, isRandomized: false } };
  }

  return { char: getRandomChar(transitions), stats: { contextOrder: 0, contextKey: '', top: [], isRandomized: true }};
};
