import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import propertyRouter from "./routes/property.js";
import agentRouter from "./routes/agent.js";
import userRouter from "./routes/user.js"

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/properties", propertyRouter);
app.use("/agents", agentRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 5000; 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }))
  .catch(err => console.error('Connection failed…'));
