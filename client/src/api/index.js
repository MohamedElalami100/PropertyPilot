import axios from "axios";

const url = "http://localhost:5000/";

export const fetchProperties = () => axios.get(url + "properties");
export const addProperty = (property) => axios.post(url + "properties", property);
export const updateProperty = (id, property) => axios.put(url + "properties/" + id, property);
export const deleteProperty = (id) => axios.delete(url + "properties/" + id);

export const fetchAgents = () => axios.get(url + "agents");
export const addAgent = (agent) => axios.post(url + "agents", agent);
export const updateAgent = (id, agent) => axios.put(url + "agents/" + id, agent);
export const deleteAgent = (id) => axios.delete(url + "agents/" + id);

export const fetchUsers = () => axios.get(url + "users");
export const addUser = (user) => axios.post(url + "users", user);


