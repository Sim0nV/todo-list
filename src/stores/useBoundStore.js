import create from "zustand";
import { persist } from "zustand/middleware";
import { createTodoSlice } from "./todoSlice";
import { createFilterSlice } from "./filterSlice";

export const useBoundStore = create(
  persist(
    (...set) => ({
      ...createTodoSlice(...set),
      ...createFilterSlice(...set)
    }),
    {
      name: "todosStore",
      getStorage: () => localStorage,
      partialize: (state) => ({ todosArray: state.todosArray })
    }
  )
);
