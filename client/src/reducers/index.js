import { combineReducers } from "redux";
import property from "./property.js";
import userReducer from "./user.js"; 

export default combineReducers({
  property,
  users: userReducer,
});
