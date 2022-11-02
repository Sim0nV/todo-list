import Todo from "./Todo";
import { useStore } from "../stores/useStore";

/*
 * TodoList: Returns a todo element for each todo in the
 * passed filteredTodos array state
 * return value: JSX elements for todo list and each todo
 */
const TodoList = () => {
  const todosArray = useStore((state) => state.todosArray);
  const filterStatus = useStore((state) => state.filterStatus);

  const filteredTodos = todosArray.filter((todo) => {
    return (
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.completed) ||
      (filterStatus === "uncompleted" && !todo.completed)
    );
  });

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
