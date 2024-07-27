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
exports.index = index;
exports.show = show;
exports.create = create;
const client_1 = require("@prisma/client");
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const users = yield prisma.user.findMany();
            if (users) {
                res.status(200).json(users);
            }
            else {
                res.status(200).send("Aucun utilisateur.");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { userId } = req.params;
            const user = yield prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            });
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).send("Cet utilisateur n'existe pas ou plus.");
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { fullname, nickname, email, password, role } = req.body;
            const user = yield prisma.user.create({
                data: {
                    fullname: fullname,
                    nickname: nickname,
                    email: email,
                    password: password
                }
            });
            console.log(user);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(400).json(user);
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
