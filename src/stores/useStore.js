import create from "zustand";

export const useStore = create((set) => ({
  todosArray: [],
  filterStatus: "all",
  setTodosArray: (todosArray) => set(() => ({ todosArray: todosArray })),
  setFilterStatus: (filterStatus) =>
    set(() => ({ filterStatus: filterStatus })),
  addTodo: (todo) =>
    set((state) => ({ todosArray: state.todosArray.concat(todo) })),
  deleteTodo: (todo) =>
    set((state) => ({
      todosArray: state.todosArray.filter((currTodo) => currTodo !== todo),
    })),
  toggleCompleteTodo: (todo) =>
    set((state) => {
      let newTodos = state.todosArray.slice();
      newTodos.splice(newTodos.indexOf(todo), 1, {
        ...todo,
        completed: !todo.completed,
      });
      return {
        todosArray: newTodos,
      };
    })
}));
