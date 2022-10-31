import create from "zustand";


export const useStore = create((set) => ({
    todosArray: [],
    filterStatus: "all",
    setTodosArray: (todosArray) => set(() => ({todosArray: todosArray})),
    setFilterStatus: (filterStatus) => set(() => ({filterStatus: filterStatus}))
}));
