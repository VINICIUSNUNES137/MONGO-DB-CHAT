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


// io.on('connection', async (socket) => {
//   console.log('Novo usuário conectado');

//   socket.on('service_id', async (roomId) => {
//     console.log(roomId);
    
//     const mensagens = await dbGetAllMessageByService(roomId.id)
//     console.log(mensagens);
    
//     socket.emit("messages", mensagens)
//   })

//   // Quando um novo usuário postar uma mensagem, emita essa mensagem para todos os usuários
//   socket.on('new-message', async (message) => {
//     console.log(message);
    
//     const statusRegisterMessage = await registerMessage(message);
//     console.log(statusRegisterMessage);
//     const mensagens = await dbGetAllMessageByService(message.serviceMysqlId)

    
    
//     if (statusRegisterMessage.status === 200) {
//       // Emita a mensagem para todos os clientes conectados
//       //io.emit("message", [message]);

//       // Emita um evento de push para todos os clientes conectados
//       io.emit("push", {
//         mensagens
//       });
//     }
//   });
// });

io.on('connection', async (socket) => {
  console.log('Novo usuário conectado');

  socket.on('service_id', async (serviceMysqlId) => {
    console.log(serviceMysqlId);
    // Junte o socket a uma sala com base no `serviceMysqlId`
    socket.join(serviceMysqlId.id);
    
    const mensagens = await dbGetAllMessageByService(serviceMysqlId.id);
    console.log(mensagens);
    
    // Emita as mensagens para o socket atual
    socket.emit("messages", mensagens);
  });

  // Quando um novo usuário postar uma mensagem, emita essa mensagem para a sala correspondente
  socket.on('new-message', async (message) => {
    console.log(message);
    
    const statusRegisterMessage = await registerMessage(message);
    console.log(statusRegisterMessage);

    if (statusRegisterMessage.status === 200) {
      // Emita a mensagem para a sala correspondente (com base no serviceMysqlId)
      io.to(message.serviceMysqlId).emit("push", {
        mensagens: await dbGetAllMessageByService(message.serviceMysqlId)
      });
    }
  });
});