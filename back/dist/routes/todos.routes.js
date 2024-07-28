"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controllers_1 = require("../controllers/todos.controllers");
const subtodos_routes_1 = __importDefault(require("./subtodos.routes"));
const todosRouter = (0, express_1.Router)();
todosRouter
    .get("/", todos_controllers_1.indexTodos)
    .get("/:todoId", todos_controllers_1.showTodo)
    .post("/", todos_controllers_1.createTodo)
    .patch("/:todoId", todos_controllers_1.editTodo)
    .delete("/:todoId", todos_controllers_1.destroyTodo)
    .use("/:todoId/subtodos", subtodos_routes_1.default);
exports.default = todosRouter;
