export type Lang = "en" | "bg";
export type CharMap = { [key: string]: number };
export type Transitions = { [key: string]: CharMap };

export type TopItem = { char: string; count: number; probability: number };
export type LastStats = {
  contextOrder: number;
  contextKey: string;
  top: TopItem[];
  isRandomized: boolean;
} | null;

export interface Istore {
  inputText: string;
  userInput: string;
  nextChar: string;
  transitions: Transitions;
  lastStats: LastStats;
  
  setInputText: (text: string) => void;
  setUserInput: (text: string) => void;
  setNextChar: (char: string) => void;
  setTransitions: (transitions: Transitions) => void;
  setLastStats: (stats: LastStats) => void;
}

