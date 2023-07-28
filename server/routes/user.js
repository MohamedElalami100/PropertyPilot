import express from "express";
import { addUser, getUsers, getUserById } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);


export default userRouter;