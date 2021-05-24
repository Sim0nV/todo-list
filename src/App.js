import React, { useState, useEffect } from "react";
import "./App.css";

import { createStore } from 'redux';

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
  /*
  const [inputText, setInputText] = useState(""); // holds text that is within the input form
  const [todos, setTodos] = useState([]); // array of todo list items DEBUG rename to todoArray?
  const [status, setStatus] = useState('all'); // state of current filtering status (all, completed, or uncompleted) DEBUG rename to filterStatus?
  const [filteredTodos, setFilteredTodos] = useState([]); // array of filtered todo list items based on status
*/
  // initialize the initialState variable for todos array, filter status, and the filtered todos
  const initialState = {
    todoArray: [],
    filterStatus: 'all',
    filteredTodos: []
  };

  //Add reducer function for individual todos
  //ex. complete todo, add todo, trash todo
  
  //filterStatus reducer
  const filterStatus = (state = 'all', action) => {

    switch(action.type) {

      case 'SET_FILTER_STATUS':

        switch(action.filterStatus) {

          case 'all':
          case 'completed':
          case 'uncompleted':
            return action.filterStatus;

          default:
            return state;
        }
        
      default:
        return state;

    }

  }

  //Individual todo list items reducer
  const todoItem = (state, action) => {
    
    switch (action.type) {

      case 'ADD_TODO':

        return {
          id: action.id,
          text: action.text,
          completed: false
        }

      case 'TOGGLE_COMPLETE_TODO':

        if (state.id !== action.id) {
          return state;
        }

        return {
          ...state,
          completed: !state.completed
        };

      default:
        return state;

    }

  }

  //todoArray reducer function
  const todoArray = (state = [], action) => {

    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          todoItem(undefined, action)
        ];
      case 'TOGGLE_COMPLETE_TODO':
        return state.map(t =>
          todoItem(t, action)
        );
      case 'DELETE_TODO':
        //Filter out the passed action.id, return filtered list
        return state.filter((t) => t.id !== action.id);
      default:
        return state;

    }
    
  }

  /*
   * Filtered todos is called in 2 cases
   * - Filter status is changed (must change what ur filtering)
   *    - If filter status func is called: 
   *        - Call filteredTodos while passing:
   *            - Current todos array
   *            - New filter status
   * - To do is added/deleted (must update array)
   * - Basically: Must pass the current todos array + curr filter status Every time
   */

  //filteredTodos reducer function
  const filteredTodos = (state = [], action) => {
    
    /*
    console.log("filteredTodos currTodos: "); //debug print
    for (var i = 0; i < action.currTodos.length; i++) {
      console.log(action.currTodos[i].text); //debug print
    }
    */

    //console.log("filteredTodos currFilterStatus: "+action.currFilterStatus); //debug print

    //If filter status was changed by passed action, update currFilterStatus
    if (action.type === 'SET_FILTER_STATUS') {
      action.currFilterStatus = action.filterStatus;
    }

    //If todo added by passed action, update currTodos
    if (action.type === 'ADD_TODO') {
      action.currTodos.push({
        id: action.id,
        text: action.text,
        completed: false
      }
      )
    }

    //Update filtered todos when todo list or filter status is changed
    switch (action.type) {

      case 'ADD_TODO':
      case 'TOGGLE_COMPLETE_TODO':
      case 'DELETE_TODO':
      case 'SET_FILTER_STATUS':
        
        switch(action.currFilterStatus) {

          case 'all':
            return action.currTodos;

          case 'completed':
            return action.currTodos.filter(todo => todo.completed === true)

          case 'uncompleted':
            return action.currTodos.filter(todo => todo.completed === false)

          default:
            return state;

        }

      default:
        return state;
        
    }

  }

  const todoReducer = (state = {}, action) => {

    return {
      todoArray: todoArray(
        state.todoArray,
        action
      ),
      filterStatus: filterStatus(
        state.filterStatus,
        action
      ),
      filteredTodos: filteredTodos(
        state.filteredTodos,
        {
          ...action,
          currTodos: state.todoArray,
          currFilterStatus: state.filterStatus
        }
      )
    }

  }

  const store = createStore(
    todoReducer, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/*

  // Get any locally stored todo list items if they exist
  // (Runs only once when the App starts, since use effect not tracking any state)
  useEffect(() => {

    getLocalTodos();

  }, []);

*/

/*

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

/*

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

*/


  /*
   * getLocalTodos: Sets todos array to what is locally stored.
   * If nothing stored, set todos array to empty string
   */ 

/*

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

  */

  return (


    <div className="App">
      <header>
        <h1>Simon WIIIIIIINS</h1>
      </header>

      {/* Render input form followed by todo list */}
      {/* Pass required states into components */}


      <Form 
        store={store} 
        />

    </div>

  );

  /*


        <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos} 
      />
  */
}

export default App;
