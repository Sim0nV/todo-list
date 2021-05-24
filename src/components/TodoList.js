import Todo from './Todo';
import { useSelector } from "react-redux"

/*
 * TodoList: Renders a todo component for each todo in the
 * passed filteredTodos array
 */
const TodoList = () => {

    // filtered todos array state
    const filteredTodos = useSelector(store => store.filteredTodos); 

    return(

        <div className="todo-container">
            <ul className="todo-list"> 
                {filteredTodos.map((todo) => ( // Map: Cycles through each element of array (filteredTodos array)
                    // Render a Todo component for each element of array
                    <Todo todo={todo} key={todo.id} />
                ))}
            </ul>
        </div> 
        
    );

};

export default TodoList;

