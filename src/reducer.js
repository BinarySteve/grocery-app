export const initialState = {
  user: null,
  total: 0,
  modal: false,

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
    case "ADD_TO_TOTAL":
      return {
        ...state,
        total: action.total
      };

    default:
      return state;
  }
};

export default reducer;
