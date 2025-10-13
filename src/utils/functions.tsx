import type { Transitions } from "./types";

export function buildTransitions(input: string): Transitions {
  const reworkedText: string = input.replace(/[^\p{L}]/gu, "").toLowerCase();
  const charArray: string[] = Array.from(reworkedText);
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

function getRandomChar(): string {
  const alphabet = "абвгдежзийклмнопрстуфхцчшщъьюя";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function isLetter(char: string): boolean {
  return /^[\p{L}]$/u.test(char);
}

export const predictFromLast = (value: string, transitions: Transitions, setNextChar: any) => {
  const lastChar = value.slice(-1).toLowerCase();
  if (lastChar && isLetter(lastChar)) {
    if (transitions[lastChar]) {
      const predictedChar = findMostLikelyNextChar(lastChar, transitions);
      setNextChar(predictedChar);
    } else {
      setNextChar(getRandomChar());
    }
  } else {
    setNextChar("");
  }
};