"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controllers_1 = require("../controllers/projects.controllers");
const todos_controllers_1 = require("../controllers/todos.controllers");
const subtodos_controller_1 = require("../controllers/subtodos.controller");
const projectsRouter = (0, express_1.Router)();
projectsRouter
    .get("/", projects_controllers_1.indexProjects)
    .get("/:projectId", projects_controllers_1.showProject)
    .post("/", projects_controllers_1.createProject)
    .delete("/:projectId", projects_controllers_1.destroyProject)
    .patch("/:projectId", projects_controllers_1.editProject)
    .get("/:projectId/todos", todos_controllers_1.indexTodos)
    .get("/:projectId/todos/:todoId", todos_controllers_1.showTodo)
    .post("/:projectId/todos", todos_controllers_1.createTodo)
    .patch("/:projectId/todos/:todoId", todos_controllers_1.editTodo)
    .delete("/:projectId/todos/:todoId", todos_controllers_1.destroyTodo)
    .get("/:projectId/todos", subtodos_controller_1.indexSubtodos)
    .get("/:projectId/todos/:todoId/subtodos/:subtodoId", subtodos_controller_1.showSubtodo)
    .post("/:projectId/todos/:todoId/subtodos", subtodos_controller_1.createSubtodo)
    .patch("/:projectId/todos/:todoId/subtodos/:subtodoId", subtodos_controller_1.editSubtodo)
    .delete("/:projectId/todos/:todoId/subtodos/:subtodoId", subtodos_controller_1.destroySubtodo);
exports.default = projectsRouter;
