"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subtodos_controller_1 = require("../controllers/subtodos.controller");
const subtodosRouter = (0, express_1.Router)();
subtodosRouter
    .get("/", subtodos_controller_1.indexSubtodos)
    .get("/:subtodoId", subtodos_controller_1.showSubtodo)
    .post("/", subtodos_controller_1.createSubtodo)
    .patch("/:subtodoId", subtodos_controller_1.editSubtodo)
    .delete("/:subtodoId", subtodos_controller_1.destroySubtodo);
exports.default = subtodosRouter;
