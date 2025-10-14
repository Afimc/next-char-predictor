
export type Transitions = { [key: string]: { [key: string]: number } };

export interface IstateSlice {
  inputText: string;
  userInput: string;
  nextChar: string;
  isInputTextUpdated: boolean;
  minInputTextLength: number;
  transitions: Transitions;
  
  setInputText: (text: string) => void;
  setUserInput: (text: string) => void;
  setNextChar: (char: string) => void;
  setTransitions: (transitions: Transitions) => void;
  setIsInputTextUpdated: (updated: boolean) => void;
}

export interface IhandlerSlice  {
  handleTrain: () => void;
  handleType: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IStore extends IstateSlice, IhandlerSlice {}