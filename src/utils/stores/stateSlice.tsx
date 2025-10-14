import type { StateCreator } from "zustand";
import type { IStore, IstateSlice } from "../types";

export const createStateSlice: StateCreator<IStore,[],[],IstateSlice> = (set) => ({
    inputText: "",
    userInput: "",
    nextChar: "",
    isInputTextUpdated: false,
    minInputTextLength: 50,
    transitions: {},

    setInputText: (text) => set({ inputText: text, isInputTextUpdated: true }),
    setUserInput: (text) => set({ userInput: text }),
    setNextChar: (char) => set({ nextChar: char }),
    setTransitions: (transitions) => set({ transitions }),
    setIsInputTextUpdated: (updated) => set({ isInputTextUpdated: updated }),
});