"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexTodos = indexTodos;
exports.showTodo = showTodo;
exports.createTodo = createTodo;
exports.destroyTodo = destroyTodo;
exports.editTodo = editTodo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function indexTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield prisma.todo.findMany({
                include: {
                    project: true
                }
            });
            if (todos) {
                res.status(200).json(todos);
            }
            else {
                res.status(200).send("Aucun todo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function showTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { todoId } = req.params;
            const todo = yield prisma.todo.findUnique({
                where: {
                    id: parseInt(todoId)
                },
                include: {
                    project: true
                }
            });
            if (todo) {
                res.status(200).json(todo);
            }
            else {
                res.status(200).send("Aucun todo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description } = req.body;
            const { projectId } = req.params;
            console.log(req.params);
            const todo = yield prisma.todo.create({
                data: {
                    title: title,
                    description: description,
                    projectId: parseInt(projectId)
                }
            });
            if (todo) {
                res.status(200).json(todo);
            }
            else {
                res.status(200).send("Aucun todo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function destroyTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { todoId } = req.params;
            const todo = yield prisma.todo.delete({
                where: {
                    id: parseInt(todoId)
                }
            });
            if (todo) {
                res.status(200).json(todo);
            }
            else {
                res.status(404).send("Aucun todo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function editTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { todoId } = req.params;
            const { title, description, checked } = req.body;
            const todo = yield prisma.todo.findUnique({
                where: {
                    id: parseInt(todoId)
                }
            });
            if (todo) {
                if (title && title !== todo.title) {
                    todo.title = title;
                }
                if (description && description !== todo.description) {
                    todo.description = description;
                }
                if (checked && checked !== todo.checked) {
                    todo.checked = checked;
                }
                yield prisma.todo.update({
                    where: {
                        id: parseInt(todoId)
                    },
                    data: todo
                });
                res.status(200).json(todo);
            }
            else {
                res.status(200).send("Aucun todo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
