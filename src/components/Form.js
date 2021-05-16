import React from 'react'

//use FUNCTIONAL components later
const Form = ({ setInputText, todos, setTodos, inputText, setStatus}) => {
    //write javascript code and function
    const inputTextHandler = (e) => {    
        console.log(e.target.value); //debug print
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) => {
        console.log("hey"); //debug print
        e.preventDefault(); //So event doesn't do its default behavior of refreshing

        // ...todos, -> Spread todos (if any todos already in the list, pass it)

        //ids: LATER install package for UNIQUE number rather than random!! DEBUG
        setTodos([
            ...todos, {text: inputText, completed: false, id: Math.random() * 1000}
        ]);
        setInputText(''); //Clear input text once todo submitted
    };
    const statusHandler = (e) => {
        setStatus(e.target.value);
    };
    return(
        <form>
        <input value ={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
        <button onClick={submitTodoHandler} className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
        </button>
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