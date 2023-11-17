import axios from "axios";

const url = "http://localhost:5000/";

export const fetchProperties = () => axios.get(url + "properties");
export const addProperty = (property) => axios.post(url + "properties", property);
export const updateProperty = (id, property) => axios.put(url + "properties/" + id, property);
export const deleteProperty = (id) => axios.delete(url + "properties/" + id);

export const fetchUsers = () => axios.get(url + "users");
export const addUser = (user) => axios.post(url + "users", user);


