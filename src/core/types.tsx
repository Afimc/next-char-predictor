
export type Transitions = { [key: string]: { [key: string]: number } };

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

