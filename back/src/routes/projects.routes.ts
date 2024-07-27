import {Router} from "express";
import { create, index, show } from "../controllers/projects.controllers";


const projectsRouter = Router()

projectsRouter
  .get("/", index)
  .get("/:projectId", show)
  .post("/", create)
  .get("/:projectId/todos/:todoId", [])
  .get("/:projectId/todos/:todoId/subtodos/:subtodoId", [])

export default projectsRouter;
