import type { KeyboardEvent } from "react";
import type { StateCreator } from "zustand";
import type { IStore, IhandlerSlice } from "../types";
import { buildTransitions, predictFromLast } from "../functions";

export const createHandlerSlice: StateCreator<IStore, [], [], IhandlerSlice> = (_set,get) => ({

  handleTrain: () => {
    const { inputText, minInputTextLength, setTransitions, setIsInputTextUpdated } = get();
    try {
      const builtTransitions = buildTransitions(inputText,minInputTextLength);
      setTransitions(builtTransitions);
      setIsInputTextUpdated(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Недостатъчен текст.";
      console.warn(msg);
    }
  },

  handleType: (value: string) => {
    const { transitions, setUserInput, setNextChar } = get();
    setUserInput(value);
    predictFromLast(value, transitions, setNextChar); // { deterministic: true } if you want to always predict the most likely next char
  },

  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
    const { userInput, nextChar, transitions, setUserInput, setNextChar } = get();

    if ((e.key === "Tab" || e.key === "ArrowRight") && nextChar) {
      e.preventDefault();
      const accepted = userInput + nextChar;
      setUserInput(accepted);
      predictFromLast(accepted, transitions, setNextChar); // { deterministic: true } if you want to always predict the most likely next char
    }
  },
  
});
