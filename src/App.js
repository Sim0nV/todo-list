import React, { useState, useEffect } from "react";
import "./App.css";
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

//DEBUG: Add function headers?

function App() {
  //State Stuff
  //[actual value, function to change value]
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]); //DEBUG rename to todoArray?
  const [status, setStatus] = useState('all'); //DEBUG rename to filterStatus?
  const [filteredTodos, setFilteredTodos] = useState([])


  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  //USE EFFECT
  useEffect(() => {
    switch(status) {
      case 'completed':
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
    //Pushing whatever we have in our state
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, status]);

  //Get if anything exists in local storage
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List</h1>
      </header>
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
