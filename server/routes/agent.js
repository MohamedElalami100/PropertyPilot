import express from "express";
import { addAgent, deleteAgent, getAgents, updateAgent } from "../controllers/agent.js";

const agentRouter = express.Router();

agentRouter.get("/", getAgents);
agentRouter.post("/", addAgent);
agentRouter.put("/:id", updateAgent );
agentRouter.delete("/:id", deleteAgent);


export default agentRouter;
