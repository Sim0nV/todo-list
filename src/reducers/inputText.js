/*
 * inputText: Input text reducer
 * parameters: input text state, action
 * return value: new input text state based on
 * passed action's type and input text
 */
export const inputText = (state = "", action) => {
  switch (action.type) {
    case "SET_INPUT_TEXT":
      return action.inputText;

    default:
      return state;
  }
};
