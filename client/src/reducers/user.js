import { ADD_USER, FETCH_ALL_USERS } from "../constants/actionTypes";

// Define the initial state if needed
const initialState = [];

// Define the reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;
    case ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userReducer;