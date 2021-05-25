import "./App.css";
import { Provider } from 'react-redux'; // Provide components access to the store (for store to act like a state)
import { getLocalTodos, saveLocalTodos } from './localStorage.js'; // Local storage functions for getting/saving todos
import { configureStore } from '@reduxjs/toolkit'; // To create Redux store
import { rootReducer } from './reducers/rootReducer.js'; // Root reducer func for Redux store

// Components
import Form from "./components/Form"; // Input field + Filtering Dropdown
import TodoList from "./components/TodoList"; // Todo list with complete/delete buttons

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
