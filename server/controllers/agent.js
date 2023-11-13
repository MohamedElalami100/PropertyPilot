import mongoose from "mongoose";
import Agent from "../models/agent.js";

export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch agent." });
    }
  }
  export const addAgent = async (req, res) => {
    console.log(1);
    try {
        let agent = new Agent(req.body);
        agent = await agent.save(); 
        res.status(201).json({ success: true, data: agent }); 
    } catch (error) {
        res.status(500).json({ error: "Failed to add agent." }); 
    }
};
export const updateAgent = async (req, res) => {
    try {
      const agentId = req.params.id; 

      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(agentId)) {
        return res.status(400).json({ error: "Invalid agent ID." });
      }
      // Update the properties with the new values from the request body
      const result = await Agent.findOneAndUpdate(
        { _id: agentId }, 
        { $set: req.body }, 
        { new: true }
      ).lean();


      if (!result) {
        return res.status(404).json({ error: 'agent not found.' });
      }

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: "Failed to update agent." });
    }
  };

  export const deleteAgent = async (req, res) => {
    try {
      const agentId = req.params.id; 
      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(agentId)) {
        return res.status(400).json({ error: "Invalid agent ID." });
      }

      // Update the properties with the new values from the request body
      const result = await Agent.deleteOne(
        { _id: agentId }, 
      );

      if (!result) {
        return res.status(404).json({ error: 'agent not found.' });
      }
  
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: "Failed to update agent." });
    }
  };
  



