"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const authRouter = (0, express_1.Router)();
authRouter
    .post("/signup", users_controllers_1.signup)
    .post("/signin", users_controllers_1.signin);
exports.default = authRouter;
