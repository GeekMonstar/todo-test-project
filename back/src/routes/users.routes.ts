import { Router } from "express";
import { create, index, show } from "../controllers/users.controllers";

const usersRouter = Router();

usersRouter
  .get("/", index)
  .get("/:userId", show)
  .post("/", create)

export default usersRouter;
