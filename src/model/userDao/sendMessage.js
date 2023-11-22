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
exports.dbRegisterMessage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbRegisterMessage = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let statusRegister = true;
            const verifySender = yield prisma.registerUser.findFirst({
                where: {
                    typeUser: data.typeSender.toUpperCase(),
                    userMysqlId: data.senderId
                }
            });
            const verifyRecipient = yield prisma.registerUser.findFirst({
                where: {
                    typeUser: data.typeRecipient.toUpperCase(),
                    userMysqlId: data.recipientId
                }
            });
            if (verifySender && verifyRecipient) {
                yield prisma.chat.create({
                    data: {
                        serviceMysqlId: data.serviceMysqlId,
                        typeSender: data.typeSender.toUpperCase(),
                        senderId: data.senderId,
                        typeRecipient: data.typeRecipient.toUpperCase(),
                        recipientId: data.recipientId,
                        message: data.message,
                        date: `${data.date.replace(/\//g, '-')}T${data.hour}:00.000+00:00`
                    }
                });
                statusRegister = true;
            }
            else {
                statusRegister = false;
            }
            return statusRegister;
        }
        catch (error) {
            return false;
        }
    });
};
exports.dbRegisterMessage = dbRegisterMessage;
