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
exports.indexSubtodos = indexSubtodos;
exports.showSubtodo = showSubtodo;
exports.createSubtodo = createSubtodo;
exports.destroySubtodo = destroySubtodo;
exports.editSubtodo = editSubtodo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function indexSubtodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subtodos = yield prisma.subtodo.findMany({
                include: {
                    todo: true
                }
            });
            if (subtodos) {
                res.status(200).json(subtodos);
            }
            else {
                res.status(200).send("Aucun subtodo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function showSubtodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { subtodoId } = req.params;
            const subtodo = yield prisma.subtodo.findUnique({
                where: {
                    id: parseInt(subtodoId)
                },
                include: {
                    todo: true
                }
            });
            if (subtodo) {
                res.status(200).json(subtodo);
            }
            else {
                res.status(200).send("Aucun subtodo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function createSubtodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description } = req.body;
            const { todoId } = req.params;
            const subtodo = yield prisma.subtodo.create({
                data: {
                    title: name,
                    description: description,
                    todoId: parseInt(todoId)
                }
            });
            if (subtodo) {
                res.status(200).json(subtodo);
            }
            else {
                res.status(200).send("Aucun subtodo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function destroySubtodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { subtodoId } = req.params;
            const subtodo = yield prisma.subtodo.delete({
                where: {
                    id: parseInt(subtodoId)
                }
            });
            if (subtodo) {
                res.status(200).json(subtodo);
            }
            else {
                res.status(404).send("Aucun subtodo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function editSubtodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { subtodoId } = req.params;
            const { title, description, checked } = req.body;
            const subtodo = yield prisma.subtodo.findUnique({
                where: {
                    id: parseInt(subtodoId)
                }
            });
            if (subtodo) {
                if (title && title !== subtodo.title) {
                    subtodo.title = title;
                }
                if (description && description !== subtodo.description) {
                    subtodo.description = description;
                }
                if (checked && checked !== subtodo.checked) {
                    subtodo.checked = checked;
                }
                yield prisma.subtodo.update({
                    where: {
                        id: parseInt(subtodoId)
                    },
                    data: subtodo
                });
                res.status(200).json(subtodo);
            }
            else {
                res.status(200).send("Aucun subtodo");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
