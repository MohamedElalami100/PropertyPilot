import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    allAgents:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Agent" }],
});

const User = mongoose.model("User", UserSchema);

export default User;