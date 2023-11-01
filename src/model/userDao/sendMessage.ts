import { PrismaClient, TypeUser } from "@prisma/client"
import { Chat } from "../../controller/message/interface/interfaceChat"

const prisma = new PrismaClient()

const dbRegisterMessage = async function(data: Chat) {
    try {
        let statusSend = false;

            const sendMessage = await prisma.chat.create({
                data: {
                    serviceMysqlId: data.serviceMysqlId,
                    typeSender: data.typeSender.toUpperCase() as TypeUser,
                    senderId: data.senderId,
                    typeRecipient: data.typeRecipient.toUpperCase() as TypeUser,
                    recipientId: data.recipientId,
                    message: data.message, // Insert the actual message
                    date: `${data.date}T${data.hour}:00.000+00:00`
                }
            });

            statusSend = true;

        return statusSend;
    } catch (error) {
        console.log(error);
        return false;
    }
};


export{
    dbRegisterMessage
}