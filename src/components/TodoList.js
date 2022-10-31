import Todo from "./Todo";
import { useSelector } from "react-redux";

/*
 * TodoList: Returns a todo element for each todo in the
 * passed filteredTodos array state
 * return value: JSX elements for todo list and each todo
 */
const TodoList = () => {
  // filtered todos array state
  const filteredTodos = useSelector((store) => store.filteredTodos);

  return (
    <div className="todo-container" data-testid="todolist">
      <ul className="todo-list">
        {filteredTodos.map(
          (
            todo // Map: Cycles through each element of array (filteredTodos array)
          ) => (
            // Render a Todo component for each element of array
            // key passed to avoid unique keys error
            <Todo todo={todo} key={todo.id} />
          )
        )}
      </ul>
    </div>
  );
};

export default TodoList;
