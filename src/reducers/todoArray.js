/*
 * todoArray: Todo items array reducer,
 * calls todoItem reducer depending on action
 * parameters: Todo array state, action
 * return value: new todo array state based on 
 * passed action's type 
 */
export const todoArray = (state = [], action) => {

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
 * todoItem: Individual todo item reducer
 * parameters: individual todo item, action
 * return value: new individual todo item state based on 
 * passed action's type and id/text
 */
export const todoItem = (state, action) => {
  
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