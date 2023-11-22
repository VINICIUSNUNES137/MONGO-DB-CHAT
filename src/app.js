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
/**
 * npx prisma db push -> Sincroniza o esquema prisma com o banco de dados mongo
 * npx prisma migrate dev -> Sincroniza e gerencia as migrações mas não é suportado no mongo
 *
 */
const server_1 = require("./server/server");
const getMessage_1 = require("./model/userDao/getMessage");
const messageUser_1 = require("./controller/message/messageUser");
const port = process.env.PORT || 8080;
server_1.server.listen(port, () => {
    console.log(`Servidor aguardando requisições na porta ${port}`);
});
server_1.io.on('connect', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Novo usuário conectado com o id ${socket.id}`);
    socket.on('class', (message) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(`service-${message.serviceMysqlId}`);
        const mensagens = yield (0, getMessage_1.dbGetAllMessageByService)(message.serviceMysqlId);
        server_1.io.to(`service-${message.serviceMysqlId}`).emit("push", {
            mensagens
        });
    }));
    socket.on('new-message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(message);
        const statusRegisterMessage = yield (0, messageUser_1.registerMessage)(message);
        console.log(statusRegisterMessage);
        const mensagens = yield (0, getMessage_1.dbGetAllMessageByService)(message.serviceMysqlId);
        if (statusRegisterMessage.status === 200) {
            // Emita a mensagem apenas para a sala correspondente ao serviço
            server_1.io.to(`service-${message.serviceMysqlId}`).emit("push", {
                mensagens
            });
        }
    }));
}));
