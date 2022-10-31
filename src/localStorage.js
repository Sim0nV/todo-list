/*
 * getLocalTodos: Returns local todos from local storage if available
 */
export const getLocalTodos = () => {
  try {
    const todoArray = localStorage.getItem("state");
    if (todoArray === null) {
      return undefined;
    }
    return JSON.parse(todoArray);
  } catch (err) {
    return undefined;
  }
};

/*
 * saveLocalTodos: Saves local todos from passed state if valid
 */
export const saveLocalTodos = (state) => {
  try {
    const todoArray = JSON.stringify(state);
    localStorage.setItem("state", todoArray);
  } catch {}
};
