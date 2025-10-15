import { create } from "zustand";
import type { Istore } from "./core/types";

export const store = create<Istore>()((set) => ({
    inputText: "",
    userInput: "",
    nextChar: "",
    transitions: {},

    setInputText: (text) => set({ inputText: text }),
    setUserInput: (text) => set({ userInput: text }),
    setNextChar: (char) => set({ nextChar: char }),
    setTransitions: (transitions) => set({ transitions }),
}));