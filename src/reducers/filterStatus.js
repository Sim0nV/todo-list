/*
 * filterStatus: Filter status reducer
 * parameters: filter status state, action
 * return value: new filter status state based on
 * passed action's type and filter status
 */
export const filterStatus = (state = "all", action) => {
  switch (action.type) {
    case "SET_FILTER_STATUS":
      switch (action.filterStatus) {
        case "all":
        case "completed":
        case "uncompleted":
          return action.filterStatus;

        default:
          return state;
      }

    default:
      return state;
  }
};
