import { Router } from 'express';
import { registerUser } from '../../controller/register/registerUser';
import { registerMessage } from '../../controller/message/messageUser';
import { dbGetAllMessageByService } from '../../model/userDao/getMessage';

const router = Router();

router.post('/v1/limpean/chat/register', async function(request, response) {
  const dataBody = request.body;
  const statusRegister = await registerUser(dataBody);

  response.status(statusRegister.status).json(statusRegister);
});

router.post('/v1/limpean/chat/message', async function(request, response) {
  const dataBody = request.body;
  const statusRegisterMessage = await registerMessage(dataBody);
  
  response.status(statusRegisterMessage.status).json(statusRegisterMessage);

  //const { serviceMysqlId, senderId, recipientId } = dataBody

  //io.to(`client-${senderId}`).emit('message', statusRegisterMessage);
  //io.to(`diarist-${recipientId}`).emit('newMessage', statusRegisterMessage)
});

router.get('/v1/limpean/chat/message', async function(request, response) {
  const getMessage = await dbGetAllMessageByService(1);
  response.send(getMessage);

  //Emite a mensagem para o cliente
  //io.to(`client`).emit('newMessage', getMessage)

});


export { router };