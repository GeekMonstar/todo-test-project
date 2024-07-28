import { Router } from "express";
import { signin, signup } from "../controllers/users.controllers";

const authRouter = Router();

authRouter
  .post("/signup", signup)
  .post("/signin", signin)

export default authRouter;
