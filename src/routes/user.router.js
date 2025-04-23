import { Router } from "express";
import { getUser, getUsers, createUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", (req, res) => res.send("Update user by id"));
userRouter.delete("/:id", (req, res) => res.send("Delete user by id"));

export default userRouter;
