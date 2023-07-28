import { ADD_PROP, DELETE_PROP, FETCH_ALL, UPDATE_PROP } from "../constants/actionTypes";

// Define the initial state if needed
const initialState = [];

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case ADD_PROP:
      return [...state, action.payload];
    case UPDATE_PROP:
      return state.map((prop) =>
        prop._id === action.payload._id ? action.payload : prop
      );
    case DELETE_PROP:
      return state.filter((prop) => prop._id !== action.payload._id);
    default:
      return state;
  }
};

export default reducer;
