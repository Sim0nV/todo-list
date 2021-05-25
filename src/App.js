import "./App.css";
import { Provider } from 'react-redux'; // Provide components access to the store (for store to act like a state)
import { getLocalTodos, saveLocalTodos } from './localStorage.js'; // Local storage functions for getting/saving todos
import { configureStore } from '@reduxjs/toolkit' // To create Redux store

// Import Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";


/*
 * inputText: Input text reducer
 * parameters: input text state, action
 * return value: new input text state based on 
 * passed action's type and input text
 */
const inputText = (state = "", action) => {

  switch(action.type) {
    
    case 'SET_INPUT_TEXT':
      return action.inputText;

    default:
      return state; 

  }

} 

/*
 * filterStatus: Filter status reducer
 * parameters: filter status state, action
 * return value: new filter status state based on 
 * passed action's type and filter status
 */
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


/*
 * todoItem: Individual todo item reducer
 * parameters: individual todo item, action
 * return value: new individual todo item state based on 
 * passed action's type and id/text
 */
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

/*
 * todoArray: Todo items array reducer,
 * calls todoItem reducer depending on action
 * parameters: Todo array state, action
 * return value: new todo array state based on 
 * passed action's type 
 */
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
 * filteredTodos: Filtered todo items array reducer
 * parameters: Todo array state, action (with updated currTodos 
 * and currFilterStatus passed within)
 * return value: new filtered todos array state based on 
 * passed action's current filter status
 */
const filteredTodos = (state = [], action) => {

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

/*
 * rootReducer: Root reducer for todo list website
 * parameters: Redux store state, action
 * return value: new Redux store state based on passed action
 */
const rootReducer = (state = {}, action) => {

  // Get new state of todoArray and filterStatus first, to run
  // filteredTodos reducer with updated values later
  const todoArrayState = todoArray(state.todoArray, action);
  const filterStatusState = filterStatus(state.filterStatus, action);

  return {
    todoArray: todoArrayState,
    filterStatus: filterStatusState,
    inputText: inputText(
      state.inputText,
      action
    ),
    filteredTodos: filteredTodos(
      state.filteredTodos,
      {
        ...action,
        currTodos: todoArrayState,
        currFilterStatus: filterStatusState
      }
    )
  }

}

const persistedState = getLocalTodos(); // Get locally stored todos if any

// Create store using root reducer + initial state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  devTools: true, // devTools enabled for Redux Dev Tool extension usage
});


// When store changes, save todo arrays locally
store.subscribe(() => {
  saveLocalTodos({
    todoArray: store.getState().todoArray,
    filteredTodos: store.getState().todoArray,
  });
});

/*
 * App: Renders/initializes input form + todo list components
 * whilst wrapping them with Provider
 */
function App() {
  
  return (


    <div className="App">
      <header>
        <h1>Simon's Todo List!</h1>
      </header>

      {/* Render input form followed by todo list */}
      {/* Wrap components with Provider */}
      <Provider store = {store}>
        <Form />
        <TodoList />
      </Provider>

    </div>

  );

}

export default App;
