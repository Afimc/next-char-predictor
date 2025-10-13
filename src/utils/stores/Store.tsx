import { create } from "zustand";
import type { IStore } from "../types";
import { createStateSlice } from "./stateSlice";
import { createHandlerSlice } from "./handlerSlice";

export const store = create<IStore>()((...a) => ({
  ...createStateSlice(...a),
  ...createHandlerSlice(...a),
}));