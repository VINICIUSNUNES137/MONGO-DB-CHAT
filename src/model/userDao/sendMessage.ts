import { PrismaClient, TypeUser } from "@prisma/client"
import { Chat } from "../../controller/message/interface/interfaceChat"

const prisma = new PrismaClient()

const dbRegisterMessage = async function(data: Chat) {    
    try {        

        let statusRegister = true

            const verifySender = await prisma.registerUser.findFirst({
                where: {
                    typeUser: data.typeSender.toUpperCase() as TypeUser,
                    userMysqlId: data.senderId
                }
            })

            const verifyRecipient = await prisma.registerUser.findFirst({
                where: {
                    typeUser: data.typeRecipient.toUpperCase() as TypeUser,
                    userMysqlId: data.recipientId
                }
            })


            if(verifySender && verifyRecipient){
                await prisma.chat.create({
                    data: {
                        serviceMysqlId: data.serviceMysqlId,
                        typeSender: data.typeSender.toUpperCase() as TypeUser,
                        senderId: data.senderId,
                        typeRecipient: data.typeRecipient.toUpperCase() as TypeUser,
                        recipientId: data.recipientId,
                        message: data.message,
                        date: `${data.date.replace(/\//g, '-')}T${data.hour}:00.000+00:00`
                    }
                })

                statusRegister = true
            }else{
                statusRegister = false
            }

        return statusRegister
    } catch (error) {                
        return false;
    }
}


export{
    dbRegisterMessage
}