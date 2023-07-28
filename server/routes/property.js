import express from "express";
import { addProperty, deleteProperty, getPropertys, updateProperty } from "../controllers/property.js";

const propertyRouter = express.Router();

propertyRouter.get("/", getPropertys);
propertyRouter.post("/", addProperty);
propertyRouter.put("/:id", updateProperty );
propertyRouter.delete("/:id", deleteProperty);


export default propertyRouter;
