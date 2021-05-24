import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getLocalTodos, saveLocalTodos } from './localStorage.js';

// inputText reducer
const inputText = (state = "", action) => {

  switch(action.type) {
    
    case 'SET_INPUT_TEXT':

      //console.log("action.inputText: "+ action.inputText); //debug print
      return action.inputText;

    default:
      return state; 

  }

} 
  
// filterStatus reducer
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

// Individual todo list items reducer
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

// todoArray reducer function
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

      // Filter out the passed action.id, return filtered list
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

// filteredTodos reducer function
const filteredTodos = (state = [], action) => {
  
  /*
  console.log("filteredTodos currTodos: "); //debug print
  for (var i = 0; i < action.currTodos.length; i++) {
    console.log(action.currTodos[i].text); //debug print
  }
  */

  //console.log("filteredTodos currFilterStatus: "+action.currFilterStatus); //debug print

  // If filter status was changed by passed action, update currFilterStatus

  // If todo added by passed action, update currTodos

  // Update currTodos/currFilterStatus when todo list or filter status is changed
  switch (action.type) {

    case 'ADD_TODO':

      action.currTodos.push({
        id: action.id,
        text: action.text,
        completed: false
      });

      break;

    case 'TOGGLE_COMPLETE_TODO':

      action.currTodos.map( function(todo) {

        //console.log("todo id: "+todo.id); //debug print
        //console.log("action id: "+todo.id); //debug print
 
        if (todo.id === action.id) {
          //console.log("completed: "+todo.completed); //debug prdebug print
          todo.completed = !todo.completed;
          //console.log("after flipping: "+todo.completed); //debug print
        }

        return todo;

      });

      break;

    case 'DELETE_TODO':

      action.currTodos = action.currTodos.filter((t) => t.id !== action.id);

      /*
      console.log("filteredTodos currTodos: "); //debug print
      for (var i = 0; i < action.currTodos.length; i++) {
        console.log(action.currTodos[i].text); //debug print
      }*/

      break;

    case 'SET_FILTER_STATUS':
      action.currFilterStatus = action.filterStatus;
      break;

    default:
      return state;
      
  }

  // Update filtered todos array when todo list or filter status is changed
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

}

// Main reducer: calls other reducer functions
const todoReducer = (state = {}, action) => {

  return {
    todoArray: todoArray(
      state.todoArray,
      action
    ),
    inputText: inputText(
      state.inputText,
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

const persistedState = getLocalTodos(); // get locally stored todos if any

// Create store using main reducer + initial state
// 3rd parameter for Redux Dev Tools extension usage
const store = createStore(
  todoReducer, 
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// When store changes, save todo arrays locally
store.subscribe(() => {
  saveLocalTodos({
    todoArray: store.getState().todoArray,
    filteredTodos: store.getState().todoArray,
  });
});

// Wrap components with Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
