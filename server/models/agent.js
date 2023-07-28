import mongoose from "mongoose";

// Define the Agent schema
const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String, 
    required: false, 
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

// Create the Agent model
const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
