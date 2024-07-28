import { Router } from "express";
import { destroyUser, indexUsers, showUser } from "../controllers/users.controllers";

const usersRouter = Router();

usersRouter
  .get("/", indexUsers)
  .get("/:userId", showUser)
  .delete("/:userId", destroyUser)
  // .post("/", create)

export default usersRouter;
