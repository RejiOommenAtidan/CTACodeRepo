// Users Reducer

const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.user
      ];
    // case 'REMOVE_EXPENSE':
    //   return state.filter(({ id }) => id !== action.id);
    // case 'EDIT_EXPENSE':
    //   return state.map((expense) => {
    //     if (expense.id === action.id) {
    //       return {
    //         ...expense,
    //         ...action.updates
    //       };
    //     } else {
    //       return expense;
    //     };
    //   });
    // case 'SET_EXPENSES':
    //   return action.expenses;
    default:
      return state;
  }
};
