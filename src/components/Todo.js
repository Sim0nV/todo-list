import React from 'react';

const Todo = ({ text, todo, todos, setTodos }) => {
    //Events
    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    };
    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id) {
                return { //return props of whatever id + toggle completed
                    ...item, 
                    completed: !item.completed
                };
            }
            return item; //If no matches, just return item w/ no changes
        })
        );
    };
    return(
        <div className="todo">
            <li className='todo-item'>{text}</li>
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