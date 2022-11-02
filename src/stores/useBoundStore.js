import create from "zustand";
import { createTodoSlice } from "./todoSlice";
import { createFilterSlice } from "./filterSlice";

export const useBoundStore = create((...set) => ({
  ...createTodoSlice(...set),
  ...createFilterSlice(...set)
}));
