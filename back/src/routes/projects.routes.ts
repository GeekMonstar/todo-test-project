import {Router} from "express";
import { createProject, destroyProject, editProject, indexProjects, showProject } from "../controllers/projects.controllers";
import { indexTodos, showTodo, createTodo, editTodo, destroyTodo } from "../controllers/todos.controllers";
import { createSubtodo, destroySubtodo, editSubtodo, indexSubtodos, showSubtodo } from "../controllers/subtodos.controller";


const projectsRouter = Router()

projectsRouter
  .get("/", indexProjects)
  .get("/:projectId", showProject)
  .post("/", createProject)
  .delete("/:projectId", destroyProject)
  .patch("/:projectId", editProject)
  .get("/:projectId/todos", indexTodos)
  .get("/:projectId/todos/:todoId", showTodo)
  .post("/:projectId/todos", createTodo)
  .patch("/:projectId/todos/:todoId", editTodo)
  .delete("/:projectId/todos/:todoId", destroyTodo)
  .get("/:projectId/todos", indexSubtodos)
  .get("/:projectId/todos/:todoId/subtodos/:subtodoId", showSubtodo)
  .post("/:projectId/todos/:todoId/subtodos", createSubtodo)
  .patch("/:projectId/todos/:todoId/subtodos/:subtodoId", editSubtodo)
  .delete("/:projectId/todos/:todoId/subtodos/:subtodoId", destroySubtodo)

export default projectsRouter;
