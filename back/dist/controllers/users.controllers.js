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
exports.indexUsers = indexUsers;
exports.showUser = showUser;
exports.destroyUser = destroyUser;
exports.signup = signup;
exports.signin = signin;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
function indexUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const users = yield prisma.user.findMany({
                include: {
                    Projects: true
                }
            });
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
function showUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { userId } = req.params;
            const user = yield prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                },
                include: {
                    Projects: true
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
function destroyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { userId } = req.params;
            const user = yield prisma.user.delete({
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
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { fullname, nickname, email, password, role } = req.body;
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            const user = yield prisma.user.create({
                data: {
                    fullname: fullname,
                    nickname: nickname,
                    email: email,
                    password: hashedPassword
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
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const { email, password } = req.body;
            const user = yield prisma.user.findUnique({
                where: {
                    email: email
                },
                include: {
                    Projects: true
                }
            });
            console.log(req.path, { depth: null });
            if (user && (yield (0, bcrypt_1.compare)(password, user.password))) {
                const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, `${process.env.SECRET_KEY}`, { expiresIn: 36000 * 24 });
                res.cookie("authToken", token, { maxAge: 36000 * 24, httpOnly: true, secure: true }).json(user);
            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
            prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
}
