import { FETCH_ALL, ADD_PROP, UPDATE_PROP, DELETE_PROP } from "../constants/actionTypes";
import * as api from "../api";

// Define the async action creator function
export const getProperties = () => async (dispatch) => {
  try {
    // Make the API call and get the response
    const response = await api.fetchProperties();

    // Extract the data from the response (assuming the data is in response.data)
    const data = response.data;

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error fetching properties:", error);
  }
};

export const addProperty = (property) => async (dispatch) => {
  console.log(property);
  try {
    // Make the API call and get the response
    const response = await api.addProperty(property);
    console.log(response.data);

    dispatch({ type: ADD_PROP, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error adding property:", error);
  }
};

export const updateProperty = (id, property) => async (dispatch) => {
  console.log(property);
  try {
    // Make the API call and get the response
    const response = await api.updateProperty(id, property);

    dispatch({ type: UPDATE_PROP, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error updating property:", error);
  }
};

export const deleteProperty = (id) => async (dispatch) => {
  try {
    // Make the API call and get the response
    const response = await api.deleteProperty(id);
    console.log(response.data.data);
    dispatch({ type: DELETE_PROP, payload: response.data.data });
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error deleting property:", error);
  }
};
