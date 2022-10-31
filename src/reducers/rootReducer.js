import { todoArray } from "./todoArray.js";
import { filteredTodos } from "./filteredTodos.js";
import { filterStatus } from "./filterStatus.js";
import { inputText } from "./inputText.js";

/*
 * rootReducer: Root reducer for todo list website
 * parameters: Redux store state, action
 * return value: new Redux store state based on passed action
 */
export const rootReducer = (state = {}, action) => {
  // Get new state of todoArray and filterStatus first, to run
  // filteredTodos reducer with updated values later
  const todoArrayState = todoArray(state.todoArray, action);
  const filterStatusState = filterStatus(state.filterStatus, action);

  return {
    todoArray: todoArrayState,
    filterStatus: filterStatusState,
    inputText: inputText(state.inputText, action),
    filteredTodos: filteredTodos(state.filteredTodos, {
      ...action,
      currTodos: todoArrayState,
      currFilterStatus: filterStatusState,
    }),
  };
};
