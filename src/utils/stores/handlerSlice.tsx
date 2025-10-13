import type { KeyboardEvent } from "react";
import type { StateCreator } from "zustand";
import type { IStore, IhandlerSlice } from "../types";
import { buildTransitions, predictFromLast } from "../functions";

export const createHandlerSlice: StateCreator<IStore, [], [], IhandlerSlice> = (_set,get) => ({

  handleTrain: () => {
    const { inputText, setTransitions } = get();
    const builtTransitions = buildTransitions(inputText);
    setTransitions(builtTransitions);
  },

  handleType: (value: string) => {
    const { transitions, setUserInput, setNextChar } = get();
    setUserInput(value);
    predictFromLast(value, transitions, setNextChar);
  },

  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
    const { userInput, nextChar, transitions, setUserInput, setNextChar } =
      get();

    if ((e.key === "Tab" || e.key === "ArrowRight") && nextChar) {
      e.preventDefault();
      const accepted = userInput + nextChar;
      setUserInput(accepted);
      predictFromLast(accepted, transitions, setNextChar);
    }
  },
  
});
