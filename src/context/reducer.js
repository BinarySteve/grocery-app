export const initialState = {
  user: null,
  total: 0,
  modal: false,
  navToggle: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "TOGGLE":
      return {
        ...state,
        modal: !state.modal,
      };
    case "NAV_TOGGLE":
      return {
        ...state,
        navToggle: !state.navToggle,
      };
    case "ADD":
      return [...state, { task: action.task, completed: false }];

    default:
      return state;
  }
};

export default reducer;
