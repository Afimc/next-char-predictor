import type { StateCreator } from "zustand";
import type { IStore, IstateSlice } from "../types";

export const createStateSlice: StateCreator<IStore,[],[],IstateSlice> = (set) => ({
    inputText: "",
    userInput: "",
    nextChar: "",
    transitions: {},

    setInputText: (text) => set({ inputText: text }),
    setUserInput: (text) => set({ userInput: text }),
    setNextChar: (char) => set({ nextChar: char }),
    setTransitions: (transitions) => set({ transitions }),
});