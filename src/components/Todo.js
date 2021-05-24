import React from 'react';
import { useDispatch } from "react-redux"

// set Todo function to the variables of text, todo, todos, and setTodos
/*
 * Todo: Renders todo item's text, complete and trash buttons.
 * Handles deleting/completing items when respective buttons clicked.
 */
const Todo = ( {todo}, {key} ) => {

    const dispatch = useDispatch();

    // deleteHandler: event function sets todos to all elements 
    // except those that match the current todo's id
    const deleteHandler = () => {

        //setTodos(todos.filter((element) => element.id !== todo.id));

        dispatch({
            type: 'DELETE_TODO',
            id:   todo.id
        });

    };
    
    // completeHandler: event function. if passed todo within todos
    // array, marks it as complete 
    const completeHandler = () => {
        
        /*
        // Set todos to what map's arrow function returns:
        setTodos(todos.map((item) => {

            // For all items within todos array:

            // If current item matches current todo's id:
            if (item.id === todo.id) {

                // return props of matching id, toggle completed flag
                return { 

                    ...item, // id, input text, other todo props
                    completed: !item.completed // toggle

                };

            }

            return item; // otherwise, just return item w/ no changes
            
        })
        );

        */

        dispatch({
            type: 'TOGGLE_COMPLETE_TODO',
            id:   todo.id
        });
    };
    
    //Render passed todo item with complete and delete buttons
    return(

        <div className="todo"> {/* $ means: If passed todo completed, 
            add the completed class (strikethrough). Else do nothing */}
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{todo.text}</li>
            
            {/* run completeHandler when complete button clicked */}
            <button onClick={completeHandler} className="complete-btn">                
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>

    );

};

export default Todo;