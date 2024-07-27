"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const usersRouter = (0, express_1.Router)();
usersRouter
    .get("/", users_controllers_1.index)
    .get("/:userId", users_controllers_1.show)
    .post("/", users_controllers_1.create);
exports.default = usersRouter;
