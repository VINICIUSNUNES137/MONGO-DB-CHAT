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
exports.dbRegisterUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbRegisterUser = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // as é usado para falar o tipo  
            const count = yield prisma.registerUser.count({
                where: {
                    typeUser: data.typeUser.toUpperCase(),
                    userMysqlId: data.userMysqlId,
                },
            });
            if (count > 0) {
                return false;
            }
            switch (data.typeUser.toUpperCase()) {
                case client_1.TypeUser.CLIENT:
                    const client = yield prisma.registerUser.create({
                        data: {
                            typeUser: client_1.TypeUser.CLIENT,
                            userMysqlId: data.userMysqlId,
                            name: data.name,
                            photoUrl: data.photoUrl,
                        },
                    });
                    return client;
                case client_1.TypeUser.DIARIST:
                    const diarist = yield prisma.registerUser.create({
                        data: {
                            typeUser: client_1.TypeUser.DIARIST,
                            userMysqlId: data.userMysqlId,
                            name: data.name,
                            photoUrl: data.photoUrl,
                        },
                    });
                    return diarist;
                default:
                    throw new Error("Invalid typeUser");
            }
        }
        catch (error) {
            return false;
        }
    });
};
exports.dbRegisterUser = dbRegisterUser;
