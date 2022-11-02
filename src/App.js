import "./App.css";

// Components
import Form from "./components/Form"; // Input field + Filtering Dropdown
import TodoList from "./components/TodoList"; // Todo list with complete/delete buttons

/**
 * App: Renders header, input form, todo list
 */
function App() {
  return (
    <div className="App">
      <header>
        <h1>Simon's Todo List!</h1>
      </header>
      <Form />
      <TodoList />
    </div>
  );
}

export default App;
