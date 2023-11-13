import { FETCH_ALL_AGENTS, ADD_AGENT, UPDATE_AGENT, DELETE_AGENT } from "../constants/actionTypes";
import * as api from "../api";


// Define the async action creator function for fetching all agents
export const getAgents = () => async (dispatch) => {
  try {
    // Make the API call and get the response
    const response = await api.fetchAgents();
    console.log(response)

    // Extract the data from the response (assuming the data is in response.data)
    const data = response.data;
    console.log(response)

    dispatch({ type: FETCH_ALL_AGENTS, payload: data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error fetching agents:", error);
  }
};

// Define the async action creator function for adding an agent
export const addAgent = (agent) => async (dispatch) => {
  console.log(agent);
  try {
    // Make the API call and get the response
    const response = await api.addAgent(agent);
    console.log(response.data);

    dispatch({ type: ADD_AGENT, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error adding agent:", error);
  }
};

// Define the async action creator function for updating an agent
export const updateAgent = (id, agent) => async (dispatch) => {
  console.log(agent);
  try {
    // Make the API call and get the response
    const response = await api.updateAgent(id, agent);

    dispatch({ type: UPDATE_AGENT, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error updating agent:", error);
  }
};

// Define the async action creator function for deleting an agent
export const deleteAgent = (id) => async (dispatch) => {
  try {
    // Make the API call and get the response
    const response = await api.deleteAgent(id);
    console.log(response.data.data);
    dispatch({ type: DELETE_AGENT, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error deleting agent:", error);
  }
};
