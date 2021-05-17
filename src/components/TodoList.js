import React from 'react';

import Todo from './Todo';

/*
 * TodoList: Renders a todo component for each todo in the
 * passed filteredTodos array
 */
const TodoList = ({ todos, setTodos, filteredTodos }) => {

    return(

        <div className="todo-container">
            <ul className="todo-list"> 
                {filteredTodos.map((todo) => ( //Map: Cycles through each element of array (filteredTodos array)
                    //Render a Todo component for each element of array
                    <Todo 
                        setTodos={setTodos} 
                        todos={todos} 
                        key={todo.id} 
                        todo={todo}
                        text={todo.text} 
                    />
                ))}
            </ul>
        </div>
        
    );

};

export default TodoList;

