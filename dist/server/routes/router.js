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
exports.router = void 0;
const express_1 = require("express");
const registerUser_1 = require("../../controller/register/registerUser");
const messageUser_1 = require("../../controller/message/messageUser");
const getMessage_1 = require("../../model/userDao/getMessage");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/v1/limpean/chat/register', function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataBody = request.body;
        const statusRegister = yield (0, registerUser_1.registerUser)(dataBody);
        response.status(statusRegister.status).json(statusRegister);
    });
});
router.post('/v1/limpean/chat/message', function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataBody = request.body;
        const statusRegisterMessage = yield (0, messageUser_1.registerMessage)(dataBody);
        response.status(statusRegisterMessage.status).json(statusRegisterMessage);
        //const { serviceMysqlId, senderId, recipientId } = dataBody
        //io.to(`client-${senderId}`).emit('message', statusRegisterMessage);
        //io.to(`diarist-${recipientId}`).emit('newMessage', statusRegisterMessage)
    });
});
router.get('/v1/limpean/chat/message', function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.query.id;
        const getMessage = yield (0, getMessage_1.dbGetAllMessageByService)(Number(id));
        response.send(getMessage);
        //Emite a mensagem para o cliente
        //io.to(`client`).emit('newMessage', getMessage)
    });
});
