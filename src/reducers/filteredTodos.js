/*
 * filteredTodos: Filtered todo items array reducer
 * parameters: Todo array state, action (with updated currTodos 
 * and currFilterStatus passed within)
 * return value: new filtered todos array state based on 
 * passed action's current filter status
 */
export const filteredTodos = (state = [], action) => {

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