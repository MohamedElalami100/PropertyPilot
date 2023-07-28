import { combineReducers } from "redux";
import property from "./property.js";
import agentReducer from "./agent.js"; 

export default combineReducers({
  property,
  agents: agentReducer,
});
