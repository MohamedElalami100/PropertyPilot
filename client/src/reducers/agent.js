import { ADD_AGENT, DELETE_AGENT, FETCH_ALL_AGENTS, UPDATE_AGENT } from "../constants/actionTypes";

// Define the initial state if needed
const initialState = [];

// Define the reducer function
const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_AGENTS:
      return action.payload;
    case ADD_AGENT:
      return [...state, action.payload];
    case UPDATE_AGENT:
      return state.map((agent) =>
        agent._id === action.payload._id ? action.payload : agent
      );
    case DELETE_AGENT:
      return state.filter((agent) => agent._id !== action.payload._id);
    default:
      return state;
  }
};

export default agentReducer;
