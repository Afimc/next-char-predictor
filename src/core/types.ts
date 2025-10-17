export type Lang = "en" | "bg";
export type CharMap = { [key: string]: number };
export type Transitions = { [key: string]: CharMap };

export interface Istore {
  inputText: string;
  userInput: string;
  nextChar: string;
  transitions: Transitions;
  
  setInputText: (text: string) => void;
  setUserInput: (text: string) => void;
  setNextChar: (char: string) => void;
  setTransitions: (transitions: Transitions) => void;
}

