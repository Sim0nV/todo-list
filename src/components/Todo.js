import React from "react";
import { useBoundStore } from "../stores/useBoundStore";

/**
 * Todo: Renders todo item's text, complete and trash buttons.
 * Handles deleting/completing items when respective buttons clicked
 * by dispatching to update state
 * parameters: todo to render, key of todo (to avoid unique keys error)
 * return value: JSX elements for todo item, complete button, and trash button
 */
const Todo = ({ todo, id }) => {
  const toggleCompleteTodo = useBoundStore((state) => state.toggleCompleteTodo);
  const deleteTodo = useBoundStore((state) => state.deleteTodo);

  /**
   * deleteHandler: Event function dispatches to todo array state
   * to delete current todo from array.
   * Should be called if delete button clicked.
   */
  const deleteHandler = () => {
    deleteTodo(todo);
  };

  /**
   * completeHandler: Event function dispatches to todo array state
   * to toggle current todo's complete flag
   * Should be called if complete button clicked.
   */
  const completeHandler = () => {
    toggleCompleteTodo(todo);
  };

  //Render passed todo item with complete and delete buttons
  return (
    <div className="todo" data-testid={"todo-" + todo.id}>
      {" "}
      {/* $ means: If passed todo completed, 
            add the completed class (strikethrough). Else do nothing */}
      <li
        className={`todo-item ${todo.completed ? "completed" : ""}`}
        data-testid={"todo-text-" + todo.id}
      >
        {todo.text}
      </li>
      {/* run completeHandler when complete button clicked */}
      <button
        onClick={completeHandler}
        className="complete-btn"
        data-testid={"todo-complete-" + todo.id}
      >
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
