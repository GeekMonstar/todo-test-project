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
exports.indexProjects = indexProjects;
exports.showProject = showProject;
exports.createProject = createProject;
exports.destroyProject = destroyProject;
exports.editProject = editProject;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function indexProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield prisma.project.findMany();
            if (projects) {
                res.status(200).json(projects);
            }
            else {
                res.status(200).send("Aucun project");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function showProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const project = yield prisma.project.findUnique({
                where: {
                    id: parseInt(projectId)
                }
            });
            if (project) {
                res.status(200).json(project);
            }
            else {
                res.status(200).send("Aucun project");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, ownerId } = req.body;
            const { authToken } = req.cookies;
            console.log(authToken);
            const project = yield prisma.project.create({
                data: {
                    name,
                    description,
                    ownerId
                }
            });
            if (project) {
                res.status(200).json(project);
            }
            else {
                res.status(200).send("Aucun project");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function destroyProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const project = yield prisma.project.delete({
                where: {
                    id: parseInt(projectId)
                }
            });
            if (project) {
                res.status(200).json(project);
            }
            else {
                res.status(200).send("Aucun project");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function editProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const { name, description } = req.body;
            const project = yield prisma.project.findUnique({
                where: {
                    id: parseInt(projectId)
                }
            });
            if (project) {
                if (name && name !== project.name) {
                    project.name = name;
                }
                if (description && description !== project.description) {
                    project.description = description;
                }
                yield prisma.project.update({
                    where: {
                        id: parseInt(projectId)
                    },
                    data: project
                });
                res.status(200).json(project);
            }
            else {
                res.status(200).send("Aucun project");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
