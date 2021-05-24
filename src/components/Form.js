import { useSelector, useDispatch } from "react-redux"

/*
 * Form: Component renders input field and filtering dropdown.
 * Also updates inputText and todo array states based on user input
 */
const Form = () => {
    
    const inputText = useSelector(store => store.inputText); // state holds text inside input field
    const dispatch = useDispatch(); // to dispatch to the Redux store

    // inputTextHandler: Event function sets input text state to
    // the passed event's target's value (input field's text)
    const inputTextHandler = (e) => {    
        //setInputText(e.target.value);
        
        //console.log("e.target.value: "+e.target.value); //debug print

        dispatch({
            type: 'SET_INPUT_TEXT',
            inputText: e.target.value,
        });    
    
    };

    // submitTodoHandler: Event function adds contents of inputText state
    // to the todos array, then clears the inputText state
    const submitTodoHandler = (e) => {

        e.preventDefault(); // So event doesn't do its default behavior of refreshing

        // ids: LATER install package for UNIQUE number rather than random!! DEBUG
        /*
        setTodos([
            ...todos, {text: inputText, completed: false, id: Math.random() * 1000}
        ]);*/
        
        
        //Add todo to todos array

        dispatch({
            type: 'ADD_TODO',
            text: inputText,
            completed: false,
            id: Math.random() * 1000
        });

        //setInputText(''); //Clear input text once todo submitted

        dispatch({
            type: 'SET_INPUT_TEXT',
            inputText: '',
        });  
        
    };

    // statusHandler: event function sets status state
    // to the passed event's target's value
    const statusHandler = (e) => {

        //setStatus(e.target.value);

        //console.log("Filter status target "+e.target.value); //debug print

        dispatch({
            type: 'SET_FILTER_STATUS',
            filterStatus: e.target.value
        })

    };

    return(
              
        <form>
        {/* sets the input value in the form while having an onChange to the input text handler */}
        <input value ={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
        
         {/* onClick button is set to the submit handler */}        
        <button onClick={submitTodoHandler} className="todo-button" type="submit">
            
            {/* Icon for font awesome image */}            
            <i className="fas fa-plus-square"></i>
        </button>
        
        {/* div section for select which includes the values for... */}                
        {/* onChange(status handler), and filter options all, completed, and uncompleted */}      
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