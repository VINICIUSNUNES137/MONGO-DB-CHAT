/**
 * npx prisma db push -> Sincroniza o esquema prisma com o banco de dados mongo
 * npx prisma migrate dev -> Sincroniza e gerencia as migrações mas não é suportado no mongo
 * 
 */
import { server, io } from './server/server'
import { dbGetAllMessageByService } from './model/userDao/getMessage';
import { registerMessage } from './controller/message/messageUser';

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Servidor aguardando requisições na porta ${port}`);
});

io.on('connect', async (socket) => {
  console.log(`Novo usuário conectado com o id ${socket.id}`);
  
  socket.on('class', async (message) => {
        
    socket.join(`service-${message.serviceMysqlId}`);
    const mensagens = await dbGetAllMessageByService(message.serviceMysqlId);

    io.to(`service-${message.serviceMysqlId}`).emit("push", {
      mensagens
    });
  });

  socket.on('new-message', async (message) => {
    
    console.log(message);
  
    const statusRegisterMessage = await registerMessage(message);
    console.log(statusRegisterMessage);
    const mensagens = await dbGetAllMessageByService(message.serviceMysqlId);
  
    if (statusRegisterMessage.status === 200) {
      // Emita a mensagem apenas para a sala correspondente ao serviço
      io.to(`service-${message.serviceMysqlId}`).emit("push", {
        mensagens
      });
    }
  });
});

//aaaa
//aa