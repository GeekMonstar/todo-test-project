"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controllers_1 = require("../controllers/projects.controllers");
const projectsRouter = (0, express_1.Router)();
projectsRouter
    .get("/", projects_controllers_1.index)
    .get("/:projectId", projects_controllers_1.show)
    .post("/", projects_controllers_1.create)
    .get("/:projectId/todos/:todoId", [])
    .get("/:projectId/todos/:todoId/subtodos/:subtodoId", []);
exports.default = projectsRouter;
