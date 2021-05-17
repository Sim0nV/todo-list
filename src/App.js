import React, { useState, useEffect } from "react";
import "./App.css";

//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

//DEBUG: Add function headers?
//DEBUG convert to non-arrow? So looks like "functional" considered

/*
 * App: Initializes states, defines use effects for todos and status,
 * handles local storage, and renders/initializes input form + todo list
 */
function App() {

  //States
  const [inputText, setInputText] = useState(""); // holds text that is within the input form
  const [todos, setTodos] = useState([]); // array of todo list items DEBUG rename to todoArray?
  const [status, setStatus] = useState('all'); // state of current filtering status (all, completed, or uncompleted) DEBUG rename to filterStatus?
  const [filteredTodos, setFilteredTodos] = useState([]); // array of filtered todo list items based on status


  // Get any locally stored todo list items if they exist
  // (Runs only once when the App starts, since use effect not tracking any state)
  useEffect(() => {

    getLocalTodos();

  }, []);

  //Use effect for todos and status:
  useEffect(() => {

    //Update filtered todos array when status updated or todo added/deleted
    switch(status) {
      case 'completed':

        /*

        DEBUG Predefined function descriptor

        .filter: 
          - Called on an array
          - Returns a filtered array with items that only meet the passed condition
            - Condition in the form of an arrow function
            - Name of the parameter in arrow function is arbitrary
              - Just an indexing term like i in a for loop

        */

        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;    
      default:
        setFilteredTodos(todos);
        break;
    }

    //Save local todos
    //Push whatever is within todos state
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos, status]);

  /*
   * getLocalTodos: Sets todos array to what is locally stored.
   * If nothing stored, set todos array to empty string
   */ 
  const getLocalTodos = () => {

    //If no todos stored, store empty string in todos key
    if (localStorage.getItem("todos") === null) 
    {
      localStorage.setItem("todos", JSON.stringify([]));

    } else {

      //If todos stored, set todos to locally stored todos

      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      
      setTodos(todoLocal);

    }

  };

  return (

    <div className="App">
      <header>
        <h1>Simon WIIIIIIINS</h1>
      </header>

      {/* Render input form followed by todo list */}
      {/* Pass required states into components */}

      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText} 
        setStatus = {setStatus} 
      />

      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos} 
      />

    </div>

  );

}

export default App;
