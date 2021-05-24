import "./App.css";

//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

/*
 * App: Renders/initializes input form + todo list components
 */
function App() {
  
  return (

    <div className="App">
      <header>
        <h1>Simon WIIIIIIINS</h1>
      </header>

      {/* Render input form followed by todo list */}
      {/* Pass required states into components */}


      <Form />
      <TodoList />

    </div>

  );

}

export default App;
