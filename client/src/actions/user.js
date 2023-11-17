import { FETCH_ALL_USERS, ADD_USER } from "../constants/actionTypes";
import * as api from "../api";


// Define the async action creator function for fetching all agents
export const getUsers = () => async (dispatch) => {
  try {
    // Make the API call and get the response
    const response = await api.fetchUsers();

    // Extract the data from the response (assuming the data is in response.data)
    const data = response.data;
    console.log(data)

    dispatch({ type: FETCH_ALL_USERS, payload: data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error fetching users:", error);
  }
};

// Define the async action creator function for adding an agent
export const addUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({ type: ADD_USER, payload: user});
  } catch (error) {
    // Handle any errors that might occur 
    console.error("Error adding agent:", error);
  }
};
