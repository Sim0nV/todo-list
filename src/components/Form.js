import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // for unique ID
import { useStore } from "../stores/useStore";

// useSelector: to get states from store, useDispatch: to get the ability to dispatch

/*
 * Form: Component returns JSX input field and filtering dropdown.
 * Also updates inputText and todo array states based on user input
 * return value: JSX elements for input field and filtering dropdown
 */
const Form = () => {
  const [inputText, setInputText] = useState(""); // state holds text inside input field
  const addTodo = useStore((state) => state.addTodo);
  const setFilterStatus = useStore((state) => state.setFilterStatus);
  // const dispatch = useDispatch(); // to dispatch to the Redux store

  /*
   * inputTextHandler: Event function dispatches the passed event's
   * target's value (input field's text) to the input text state.
   * Should be called if any changes to input field
   * parameters: Input field event
   */
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  /*
   * submitTodoHandler: Event function adds submitted todo to
   * todo array state, then clears the inputText state
   * Should be called if todo submitted
   * parameters: todo submission event
   */
  const submitTodoHandler = (e) => {
    e.preventDefault(); // Prevent event from doing its default behavior of refreshing

    let newTodo = {
      text: inputText,
      completed: false,
      id: uuidv4()
    };

    // Add todo to todos array
    addTodo(newTodo);
    setInputText("");
  };

  /*
   * statusHandler: Event function dispatches new filter status
   * to filter status state. Should be called if filter state changed
   * parameters: Filter status change event
   */
  const statusHandler = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <form data-testid="form">
      {/* sets the input value in the form while having an onChange to the input text handler */}
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
      />

      {/* onClick button is set to the submit handler */}
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        {/* Icon for font awesome image */}
        <i className="fas fa-plus-square"></i>
      </button>

      {/* div section for select which includes the values for... */}
      {/* onChange(status handler), and filter options all, completed, and uncompleted */}
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
